import React, { FC, ReactElement, useState } from "react"
import styled from 'styled-components'
import { ipcRenderer } from "electron"
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import * as Components from "./AccountSettingComponents"

type Props = {
  onClose(): void
  onSetPage(page: string): void
}

export const PrivacyManageAccount: FC<Props> = ({ onClose, onSetPage }): ReactElement => {
  const [isAutoStart, setIsAutoStart] = useState(true)

  const onChangeCheckbox = () => {
    setIsAutoStart(!isAutoStart)
  }

  const openPrivacy = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/privacy"
    })
  }

  return (
    <AccountScreen>
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('PrivacyMain')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText> Manage my account </Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>
          Manage your account privacy settings. See our <a onClick={openPrivacy} style={{ color: "var(--primary-200)", marginLeft: 5 }}>Privacy Policy</a>.
        </Components.Text>
        <Components.Section>
          <Components.SectionTitle className="bigMargin">Share app performance data</Components.SectionTitle>
          <Components.TextContainer style = {{paddingRight: 16}}>
              <Components.Text> Share app performance with Hyperlink to help us improve your exprience</Components.Text>
            <Components.ToogleButton buttonType={isAutoStart} onClick={() => onChangeCheckbox()}>
              <Components.ToogleButtonRadio buttonType={isAutoStart}/>
            </Components.ToogleButton>
            <Components.ToggleText style = {{width: 17}}>
              {isAutoStart ? "On" : "Off"}
            </Components.ToggleText>
          </Components.TextContainer>
        </Components.Section>
        <Components.Section>
          <Components.SectionTitle className="bigMargin">Delete my account</Components.SectionTitle>
          <Components.TextContainer>
            <Components.Text> Delete my account and all personal information </Components.Text>
            <Components.LinkButton className="delete-link-btn" onClick={() => { onSetPage('PrivacyDeleteAccount') }}>Delete</Components.LinkButton>
          </Components.TextContainer>
        </Components.Section>
      </Components.ModalContent>
    </AccountScreen>
  )
}
