import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import styled, { keyframes } from "styled-components"
import { wasIMentioned, decodeHtml, getNewMessages, hasEmoji, hasAttachment, isSystemMessage } from "./components/ChatFunctions"
import imgSend from "./../../../../images/icons/send-w.svg"
import imgStar from "./../../../../images/icons/star-w.svg"
import { isHookMessage, execHooksIfFound } from "./components/ChatHooks"
import { getCachedChannelMap, saveChannelMap } from "./components/CachedChannelMap"
import { SlackChatApi } from "./components/SlackChatApi"
import { Icon } from "../Icon"
import { usePrevious } from "../react/usePrevious"
import { Arrays } from "./../../../renderer/types/Arrays"
import Store from "electron-store"
import { BarMsg } from "../BarMsgDisplay"
import iconChatLogo from "/images/icon-chat.svg"
import closeBtn from "/images/close.svg"
import { stopEventPropagation } from "../EventListeners"
import { isNull } from "util"

type Props = {
  botName: string
  channel: string
  workspaceId: string // We only need it to avoid issues with caching on workspace change
  defaultMessage?: string
  onClose: () => void
}

const REFRESH_TIME_MS = 2000
const KEY_MESSAGES = "slackChatMessages-"
const messageFormatter = {
  emoji: false
}

const store = new Store()
const getNowSeconds = () => Date.now() / 1000

export const SlackChat: FC<Props> = ({ botName, channel, workspaceId, defaultMessage, onClose }): ReactElement => {
  const [failed, setFailed] = useState<boolean>(false)
  const [messages, setMessages] = useState<Array<any>>((store.get(KEY_MESSAGES + workspaceId) as any) ?? [])
  const [postMyMessageContent, setPostMyMessageContent] = useState<string>("")
  const [chatInitiatedTs, setChatInitiatedTs] = useState<number>(getNowSeconds())
  const [activeChannel, setActiveChannel] = useState<any>({})
  const messagesRef = useRef<any[]>(messages)
  const onNewMessagesRef = useRef<((messages: any[]) => void) | null>(null)

  const prevMessages = usePrevious(messages)
  const [tsMap, setTsMap] = useState<any>(
    getCachedChannelMap(workspaceId, {
      channels: [
        {
          name: channel
        }
      ]
    })
  )
  const [chatbox, setChatbox] = useState<any>({
    chatActiveView: true
  })

  const activeChannelInterval = useRef<any>(null)

  const fileUploadTitle = `Posted by ${botName}`

  // Bind Slack Message functions
  // Single user mode, TS (Thread) map

  const displayFormattedMessage = (message) => {
    // decode formatting from messages text to html text
    let messageText = decodeHtml(message.text)
    // who's message is this?
    // const myMessage = wasIMentioned(message, botName)
    const myMessage = message.username === botName

    // Check to see if this is a Slack System message?
    if (isSystemMessage(message)) {
      // message.text is a system message
      // try to see if it has an attachment in it
      const attachmentFound = hasAttachment(message.text)
      if (attachmentFound && attachmentFound[0]) {
        // An attachment is found
        // Point to file available for download
        if (attachmentFound[1]) {
          // image file found
          const didIPostIt = message.text.indexOf(fileUploadTitle) > -1
          const fileNameFromUrl = attachmentFound[1].split("/")
          return (
            <div className={classNames("chat__msgRow", didIPostIt ? "mine" : "notMine")} key={message.ts}>
              <div className={classNames("chat__message", didIPostIt ? "mine" : "notMine")}>
                <strong>Sent an Attachment: </strong>
                <span>{fileNameFromUrl[fileNameFromUrl.length - 1]}</span>
                <hr />
                <a href={attachmentFound[1]} target="_blank">
                  <span>Click to Download</span>
                </a>
              </div>
            </div>
          )
        }
      }
      // else we display a system message that doesn't belong to
      // anyone
      return (
        <div className="chat__msgRow" key={message.ts}>
          <div className={classNames("chat__message", "system__message")} dangerouslySetInnerHTML={{ __html: messageText }} />
        </div>
      )
    }
    // Check to see if this is a hookMessage
    // If yes, we do not display it
    if (isHookMessage(messageText)) {
      return null
    }
    // check if user was mentioned by anyone else remotely
    const mentioned = wasIMentioned(message, botName)

    const textHasEmoji = hasEmoji(messageText)
    // check if emoji library is enabled
    if (messageFormatter.emoji && textHasEmoji) {
    }
    return (
      <div className={classNames("chat__msgRow", myMessage ? "mine" : "notMine")} key={message.ts}>
        {textHasEmoji ? (
          // dangerouslySetInnerHTML only if text has Emoji
          <div className={classNames("chat__message", mentioned ? "mentioned" : "")} dangerouslySetInnerHTML={{ __html: messageText }} />
        ) : (
          // else display it normally
          <div className={classNames("chat__message", mentioned ? "mentioned" : "")}>{messageText}</div>
        )}
      </div>
    )
  }

  const postMyMessage = () => {
    return SlackChatApi.postMessage({
      text: postMyMessageContent,
      ts: tsMap[activeChannel.name || activeChannel.name],
      channel: activeChannel.id,
      username: botName
    }).then((data: any) => {
      // single user and no ts thread info stored
      if (!tsMap[activeChannel.name || activeChannel.id]) {
        tsMap[activeChannel.name || activeChannel.id] = data.message.thread_ts || data.ts
        // update cache map
        saveChannelMap(workspaceId, { TS_MAP: tsMap })
        setTsMap(tsMap)

        SlackChatApi.listenForMessages(activeChannel.id, tsMap[activeChannel.name || activeChannel.id], onNewMsg)
      }
      setPostMyMessageContent("")

      const newMessages = [...messagesRef.current, data.message]
      messagesRef.current = newMessages
      setMessages(newMessages)
    }).catch((err) => {
      if (err) {
        console.error("failed to post. Err:", err)
      }
      return null
    })
  }

  const loadMessages = (channel) => {
    if (!chatInitiatedTs) {
      setChatInitiatedTs(getNowSeconds)
    }

    // define loadMessages function
    const getMessagesFromSlack = () => {
      SlackChatApi.getMessages({
        channelId: channel.id,
        ts: tsMap[channel.name || channel.id]
      })
    }

    getMessagesFromSlack()
    activeChannelInterval.current = setInterval(getMessagesFromSlack, REFRESH_TIME_MS)
  }

  const scrollToTheLastMsg = () => {
    const chatMessages = document.getElementById("widget-reactSlakChatMessages")
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  const removeMessageDuplicates = () => {
    // Remove duplicates if any
    const messagesIds = messages.map((msg) => msg.ts)
    const messagesWithoutDuplicates = messages.filter((msg, index) => messagesIds.indexOf(msg.ts) === index)
    if (!Arrays.areSame(messages, messagesWithoutDuplicates)) {
      setMessages(messagesWithoutDuplicates)
    }
  }

  useEffect(() => {
    if (messages?.length > 0) {
      clearInterval(activeChannelInterval.current)
    }
    if (messages?.length > prevMessages?.length) {
      scrollToTheLastMsg()
    }

    removeMessageDuplicates()

    store.set(KEY_MESSAGES + workspaceId, messages)

    return (() => {
      if (activeChannelInterval.current) {
        clearInterval(activeChannelInterval.current)
      }
    })
  }, [messages])

  const handleChange = (e) => {
    setPostMyMessageContent(e.target.value)
    return
  }

  const onNewMsg = (msg: any) => {
    const existsAlready = messagesRef.current.findIndex((entry) => entry.ts === msg.ts) >= 0
    if (existsAlready) return

    const newMessages = [...messagesRef.current, msg]
    messagesRef.current = newMessages
    setMessages(newMessages)
  }

  const goToChatView = (event, channel) => {
    // stop propagation so we can prevent any other click events from firing
    event?.stopPropagation()

    // Close Chat box only if not already open
    setActiveChannel(channel)
    setChatbox({
      chatActiveView: true
    })
    SlackChatApi.listenForMessages(channel.id, tsMap[channel.name || channel.id], onNewMsg)

    // Focus input box
    const inputTextBox = document.getElementById("chat__input__text")
    inputTextBox.focus()

    loadMessages(channel)
  }

  const addDefaultMessage = (messagesData) => {
    if (!defaultMessage) return

    // add timestamp so list item will have unique key
    messagesData.unshift({
      text: defaultMessage,
      ts: chatInitiatedTs
    })

    return messagesData
  }

  useEffect(() => {
    onNewMessagesRef.current = (messagesData: any[]) => {
      try {
        if (!!Arrays.areSame(messages, messagesData.reverse())) {
          if (messages.length === 0) {
            const newMessages = addDefaultMessage([])
            messagesRef.current = newMessages
            setMessages(newMessages)
          }
          return
        }

        // Got new messages
        // We dont wish to execute action hooks if user opens chat for the first time
        if (messages.length !== 0) {
          // Execute action hooks only if they are really new messages
          // We know they are really new messages by checking to see if we already have messages in the state
          // Only if we atleast have some messages in the state
          // Grab new messages
          const newMessages = getNewMessages(messages, messagesData, botName)

          // Iterate over the new messages and exec any action hooks if found
          newMessages
            ? newMessages.map((message) =>
              execHooksIfFound({
                message,
                username: botName,
                channel: activeChannel.id
              })
            )
            : null
        }

        addDefaultMessage(messagesData)

        messagesRef.current = messagesData
        setMessages(messagesData)
      } catch (error) {
        console.error(`There was an error on loading new messages for ${activeChannel.name} channel.`, error)
        setFailed(true)
      }
    }

    scrollToTheLastMsg()

    const connectBot = async () => {
      // Connect bot
      try {
        const channelData: any = await SlackChatApi.getChannels({
          channelFilter: [
            {
              name: channel
            }
          ],
          defaultChannel: channel
        })

        setActiveChannel(channelData.activeChannel)
        goToChatView(null, channelData.channels[0])

        SlackChatApi.listenForMessagesChange(onNewMessagesRef.current)
      } catch (error) {
        console.error("could not intialize slack bot", error)
        setFailed(true)
      }
    }
    connectBot()

    return () => {
      SlackChatApi.stopListeningForMessagesChange(onNewMessagesRef.current)
    }
  }, [])

  // If Slack communications have failed or errored out
  // do not render anything
  if (failed) {
    return null
  }

  // Looks like nothing failed, let's start to render our chatbox
  return (
    <ChatBox className={classNames(chatbox.chatActiveView ? "chatActive" : "")} >
      <LeftPanel onClick={stopEventPropagation}>
        <Title>Messages</Title>
        <BarWrapper>
          <SupportLogo>
            <img src={iconChatLogo} style={{ position: 'absolute', top: '12px', left: '16px', width: 48, height: 48 }} />
            <Hyperlink>Hyperlink</Hyperlink>
            <Support>Support</Support>
          </SupportLogo>
          <BarMsg Header="Features" Question="What features would you like to see in the hypervisor?" ></BarMsg>
          <BarMsg Header="Quality" Question="What features would you like to improve?" ></BarMsg>
          <BarMsg Header="Ease-of-Use" Question="What challenges did you experience?" ></BarMsg>
          <BarMsg Header="Ask us a question!" Question="What would you like to learn more about?" ></BarMsg>
          <BarMsg Header="Satisfaction" Question="Are you satisfied with your experience? Why or why not?" ></BarMsg>
          <BarMsg Header="Score" Question="What would you rate the overall product quality from 1 to 10?" ></BarMsg>
        </BarWrapper>
      </LeftPanel>
      <img
        src={closeBtn}
        style={{
          width: "24px",
          height: "24px",
          cursor: "pointer",
          position: "absolute",
          top: '24px',
          right: '24px',
          padding: '4px',
          background: "rgba(217, 217, 217, 0.10)",
          borderRadius: '100px',
          flexShrink: '0',
        }}
        onClick={() => { onClose }}
      />
      <div className="chat__messages" id="widget-reactSlakChatMessages" onClick={stopEventPropagation}>
        {messages.map((message) => displayFormattedMessage(message))}
      </div>
      <MsgContainer onClick={stopEventPropagation}>
        <InputContainer>
          <TextInput id="chat__input__text" className="chat__input" value={postMyMessageContent} placeholder="Send a message" onKeyPress={(event) => (event.key === "Enter" ? postMyMessage() : null)} onChange={(event) => handleChange(event)} />
        </InputContainer>
        <IconContainer>
          <Icon iconUrl={imgSend}
            height={16}
            width={26}
            flex_shrink={0}
            position="absolute"
            right={16.4}
            top={8}
            onClick={postMyMessage} />
        </IconContainer>
      </MsgContainer>
    </ChatBox>
  )
}

const ChatBox = styled.div`
  width: 856px;
  height: 740px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(to left, #0A0A0A 564px, transparent 564px, transparent 100%);
  to right, transparent calc(100% - 500px), black calc(100% - 500px), black 100%
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 64px;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0.20) 0%, rgba(217, 217, 217, 0.00) 100%);
    backdrop-filter: blur(5px);
    border-radius: 0px 32px 0px 0px;
    width: 564px;
  }

  .chat__messages {
    flex: 1 0;
    padding-right: 10px;
    padding-left: 10px;
    overflow-y: scroll;
    position: absolute;
    right: 0;
    top: 64px;
    bottom: 96px;
    width: 564px;
    height: 580px;
    display: flex;
    flex-direction: column;
  }

  
  .chat__messages::-webkit-scrollbar-thumb {
    background: var(--basegrey-800, #333);
    border-radius: 100px;
    width: 8px;
    height: 452px;
    flex-shrink: 0;
  }
  
    .chat__msgRow {
      margin-left: 40px;
      margin-bottom: 0;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      &.mine {
        text-align: right;
        right: 24px;
      }
      &.notMine {
        text-align: left;
        left: 24px;
        .chat__message.mentioned {
          background: #43b2f3 ${imgStar} no-repeat -2px -2px !important;
          color: white !important;
        }    
      }
    }
    .chat__message {
      display: inline-block;
      position: aboslute;
      max-width: 226px;
      word-wrap: break-word;
      margin-right: 10px;
      padding: 1rem;
      text-align: left;
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 125%;
      margin-top: 8px;
    }

    .system__message {
      max-width: 18.75vw;
      color: rgba(255, 255, 255, 1);
      top: 0;
      left: 24px;
    }

  .mine .chat__message {
    color: rgba(255, 255, 255, 1);
    border: none;
    right: 24px;
    border-radius: 12px 12px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    color: #FFF;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 17.5px */
    gap: 10px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;  
    
  }
  .notMine .chat__message {
    border: none;
    left: 24px;
    color: #FFF;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 17.5px */
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 12px 12px 12px 0px;
    background: rgba(255, 255, 255, 0.125);
  }
`
const LeftPanel = styled.div`
  width: 292px;
  height: 740px;
  border-radius: 32px 0px 0px 32px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.10); ! important
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Title = styled.div`
  display: flex;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--coldgrey-50, #F1F1F4);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px;
  letter-spacing: -0.24px;
  position: absolute;
  top: 32px;
  left: 16px;
`
const SupportLogo = styled.div`
  width: 260px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
`

const Hyperlink = styled.div`
  display: flex;
  width: 80px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 80px;
  top: 20px;
  color: #FFF;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
  letter-spacing: -0.35px;
`

const Support = styled.div`
  display: flex;
  width: 80px;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 80px;
  top: 40px;
  color: rgba(255, 255, 255, 0.50);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
  letter-spacing: -0.3px;
`
const MsgContainer = styled.div`
  width: 564px;
  height: 96px;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-top: 32px;
`

const InputContainer = styled.div`
  display: block;
  width: 512px;
  height: 32px;
  border-radius: 100px;
  left: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.05);
  margin-top: 32px;
  margin-bottom: 32px;
  margin-left: 24px;
  margin-right: 10px;
  outline: none;
  border: 0px;

 
`;


const TextInput = styled.textarea`
  display: block;
  width: 464px;
  height: 24px;
  color: rgba(255, 255, 255, 0.50);
  border-radius: 100px;
  background: transparent;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  left: 24px;
  right: 24px;
  margin-top: 32px;
  margin-bottom: 32px;
  margin-right: 10px;
  outline: none;
  border: 0px;
  resize: none; 
  max-width: 375px;
  overflow-x: auto;
  white-space: nowrap;
  overflow: hidden;
  text-aligh: right;
  padding-left: 16px;
  padding-right: 56px;
  padding-top: 8px;

  
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:focus-visible {
    outline: none;
    border: 0px;
    color: white;
  }
  &:focus {
    outline: none;
    border: 0px;
    color: white;
  }
  z-index: 9999;
`;


const IconContainer = styled.div`
  width: 56px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 100px;
  background: rgba(217, 217, 217, 0.80);
  position: absolute;
  top: 32px;
  right: 24px;
  cursor: pointer;
`

const BarWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
