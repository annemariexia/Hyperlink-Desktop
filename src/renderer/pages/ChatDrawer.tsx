import React, { FC, ReactElement } from "react"
import { SlackChat } from "../elements/slack-chat/SlackChat"
import styled from "styled-components"
import { UserDetails } from "../elements/system/ProfileManager"

type Props = {
  profile: UserDetails
  onClose: () => void
}

export const ChatDrawer: FC<Props> = ({ profile, onClose }): ReactElement => {
  return (
    <SlackChat
      botName={`${profile.email}`} // using email instead of username to identify users
      channel="support"
      workspaceId="hyperlink-chat-support"
      defaultMessage="Welcome to our chat! 👋 Let us know how we can improve the Hypervisor."
      onClose={onClose}
    />
  )
}
