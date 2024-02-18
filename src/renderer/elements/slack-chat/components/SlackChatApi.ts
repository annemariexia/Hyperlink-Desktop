import { ipcRenderer } from "electron"
import { SlackCommand, SlackMessage } from "./../../system/System"

export class SlackChatApi {
  public static getChannels = ({ channelFilter = [], defaultChannel }) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(SlackCommand.ConversationsList)

      ipcRenderer.on(SlackMessage.ConversationsList, (event, payload) => {
        // get the channels we need
        const channels = []
        let activeChannel = ""

        payload.channels.map((channel) => {
          channelFilter.forEach((channelObject) => {
            // If this channel is exactly as requested
            if (channelObject.name === channel.name || channelObject.id === channel.id) {
              if (defaultChannel === channel.name) {
                activeChannel = channelObject
              }
              channel.icon = channelObject.icon // Add on the icon property to the channel list
              channels.push(channel)
            }
          })
        })
        resolve({ channels, activeChannel })
      })
    })
  }

  public static getMessages = ({ channelId, ts }) => {
    if (!ts) {
      // single user mode but no thread info provided, return empty
      // this must be the initial state of app
      return {
        messages: []
      }
    }

    ipcRenderer.send(SlackCommand.ConversationsReplies, {
      channel: channelId,
      ts
    })
  }

  public static listenForMessagesChange = (onNewMessages: (messages: any[]) => void) => {
    ipcRenderer.on(SlackMessage.ConversationsReplies, (event, { messages }) => {
      if (!onNewMessages) return
      onNewMessages(JSON.parse(JSON.stringify(messages)).reverse())
    })
  }

  public static stopListeningForMessagesChange = (onNewMessages: (messages: any[]) => void) => {
    ipcRenderer.off(SlackMessage.ConversationsReplies, onNewMessages)
  }

  public static listenForMessages = (channelId, ts, onNewMsg: (msg) => void) => {
    if (!channelId || !ts) {
      return
    }

    return new Promise((resolve, reject) => {
      ipcRenderer.send(SlackCommand.ListenForMessages, {
        channel: channelId,
        thread_ts: ts
      })

      ipcRenderer.on(SlackMessage.NewMessage, (event, message) => {
        onNewMsg(message)
      })
    })
  }

  public static postMessage = ({ bot, text, ts, channel, username }: any) => {
    if (!text) return Promise.reject("Empty text is not permitted.")

    return new Promise((resolve, reject) => {
      const postMessageArgs = {
        channel,
        text,
        username
      }
      if (ts) {
        ipcRenderer.send(SlackCommand.PostMessage, {
          ...postMessageArgs,
          thread_ts: ts
        })
      } else {
        ipcRenderer.send(SlackCommand.PostMessage, postMessageArgs)
      }

      ipcRenderer.on(SlackMessage.PostMessage, (event, payload) => {
        resolve(payload)
      })
    })
  }
}
