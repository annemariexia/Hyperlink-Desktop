import React, { FC, ReactElement, useEffect, useState } from "react"
import axios from "axios"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import iconRejected from "/images/icon-rejected.svg"
import * as Components from "./AccountSettingComponents"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ProfileManager, UserDetails } from "../../elements/system/ProfileManager"
import { Const } from "../../../main/Const"

type Props = {
  profile: UserDetails | null
  onClose(): void
  onSetPage(page: string): void
}

export const PrivacyDeleteAccount: FC<Props> = ({ profile, onClose, onSetPage }): ReactElement => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isActionButtonDisabled = !password || password.length === 0 || isLoading == true

  const logIn = async (email: string, password: string) => {
    setError(null)
    ipcRenderer.send(ApiCommand.LogIn, { email, password })
  }

  const onSubmit = () => {
    event.preventDefault()
    logIn(profile.email, password)
    setIsLoading(true)
  }

  useEffect(() => {
    ipcRenderer.on(ApiMessage.LogInResult, async (event, logInResult) => {
      if (logInResult.success) {
        setIsLoading(false)
        try {
          ProfileManager.removeCreadentials()
          onClose()
          onSetPage("PageMain")
          ipcRenderer.send(ApiCommand.LogOut)
        } catch (error) {
          return error
        }
      }
       else {
        setIsLoading(false)
        setError("Incorrect password")
      }
    })
  })

  const sendMail = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "mailto:hello@hyperlink.org"
    })
  }

  return (
    <AccountScreen>
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('PrivacyManageAccount')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText> Please confirm deletion </Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text> We are sad to see you leave ;( </Components.Text>
          <Components.SectionContent style = {{width : 448}}>
            <div className="confirm-box rejected" style={{ width: "448px" }}>
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1747_10468)">
                  <mask id="mask0_1747_10468" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
                    <path d="M96 0H0V96H96V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1747_10468)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M96 88L48 8L0 88H96ZM81.8704 80L48 23.5492L14.1295 80H81.8704Z" fill="#2E0506" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M52 60V40H44V60H52ZM52 72V66H44V72H52Z" fill="#E92329" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1747_10468">
                    <rect width="96" height="96" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="confirm-status" style = {{margin: "8px 0px 12px 0px"}}>You are about to delete your account</div>
              <div className="confirm-comment">This cannot be undone. You will lose your ability to transfer money. All your earnings will be saved and connected to your User ID.</div>
            </div>
          </Components.SectionContent>
          <Components.Section>
          <Components.SectionTitle>Enter your password to proceed</Components.SectionTitle>
            <Components.SectionContent style={{ flexDirection: "column" }}>
              <Components.CustomInputContainer className="editableWhiteBorder" error={error ? true : false} >
                <Components.CustomInput
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
              </Components.CustomInputContainer>
              {error && (
                <Components.ErrorDescription>{error}</Components.ErrorDescription>
              )}
            </Components.SectionContent>
          </Components.Section>
        <Components.SectionNoBorder>
          <Components.SectionContent style={{ flexDirection: "column" }}>
            <Components.Text>How can we make it right? If you have any questions about Hyperlink,
            please <a style={{ color: "var(--primary-200)"}} onClick={sendMail}>Contact Support</a>.</Components.Text>
          </Components.SectionContent>
        </Components.SectionNoBorder>
        <Components.SectionNoBorder>
          <Components.SectionContent style={{ flexDirection: "column", alignItems: "center" }}>
            <DeleteButton onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled}> Delete my account </DeleteButton>
            <Components.CancelButton style = {{width: "100%", boxSizing: "border-box"}} onClick={() => {onSetPage("PrivacyMain")}}>Cancel</Components.CancelButton>
          </Components.SectionContent>
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}
export const DeleteButton = styled.span<{ disabled: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 20px;
  border: 2px solid var(--basegrey-900);
  border-radius: 4px;
  background: var(--basegrey-900);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
  color: #0A0A0A;
  cursor: pointer;
  margin-top: 8px;
  text-align: center;

${({ disabled }) =>
    !disabled &&
    `cursor: pointer; 
    background: var(--danger-500);
    color: var(--basegrey-950, #0D0D0D);
    border: 2px solid var(--danger-500);
    &:hover {
      background:#0A0A0A;
      color: var(--danger-500);
    }`}
  
`