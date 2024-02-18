import { LogLevel, WebClient } from "@slack/web-api"
import { SocketModeClient } from "@slack/socket-mode"

import { Const } from "../Const"
import { BrowserWindow, ipcMain } from "electron"

export class ApiSlackBot {
  private slackBot: WebClient
  private socketModeClient: SocketModeClient
  private mainWindow: BrowserWindow | null = null

  constructor() {
    this.slackBot = new WebClient(Const.SLACK_BOT_TOKEN)
    this.socketModeClient = new SocketModeClient({
      appToken: Const.SLACK_APP_TOKEN
    })
  }

  setMainWindow = (mainWindow: BrowserWindow) => {
    this.mainWindow = mainWindow
  }

  public setup = async () => {
    ipcMain.on("ListenForMessages", async (event, args) => {
      if (!args.channel || !args.thread_ts) return
      if (this.socketModeClient.isActive()) return

      this.socketModeClient.on("message", async (event: any) => {
        if (
          event.event.channel_type === "channel" &&
          event.event.type === "message" &&
          (event.event.subtype === "message_changed" || event.event.subtype === "message_deleted") &&
          event.event.channel === args.channel &&
          event.event.previous_message.thread_ts === args.thread_ts
        ) {
          // Update thread messages
          const resultReplies = await this.slackBot.conversations.replies({
            channel: event.event.channel,
            ts: event.event.previous_message.thread_ts
          })
          this.mainWindow?.webContents?.send("ConversationsReplies", resultReplies)
        }

        if (event.event.channel_type === "channel" && event.event.type === "message" && event.event.channel === args.channel && event.event.thread_ts === args.thread_ts) {
          this.mainWindow?.webContents?.send("NewMessage", event.event)
        }
      })

      await this.socketModeClient.start()
    })

    // Setup API calls
    ipcMain.on("ConversationsList", async (event, args) => {
      try {
        const result = await this.slackBot.conversations.list(args)
        this.mainWindow?.webContents?.send("ConversationsList", result)
      } catch (error) {
        console.error("ConversationsList error", error)
      }
    })

    ipcMain.on("ConversationsReplies", async (event, args) => {
      const result = await this.slackBot.conversations.replies(args)
      this.mainWindow?.webContents?.send("ConversationsReplies", result)
    })

    ipcMain.on("ConversationsHistory", async (event, args) => {
      const result = await this.slackBot.conversations.history(args)
      this.mainWindow?.webContents?.send("ConversationsHistory", result)
    })

    ipcMain.on("PostMessage", async (event, args) => {
      const result = await this.slackBot.chat.postMessage(args)
      this.mainWindow?.webContents?.send("PostMessage", result)
    })
  }
}
