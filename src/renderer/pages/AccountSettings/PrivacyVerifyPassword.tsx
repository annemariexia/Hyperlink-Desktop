import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import * as Components from "./AccountSettingComponents"

type Props = {
  profile: UserDetails | null
  onClose(): void
  onSetPage(page: string): void
}

export const PrivacyVerifyPassword: FC<Props> = ({ profile, onClose, onSetPage }): ReactElement => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [countFailedAttempts, setCountFailedAttempts] = useState(0)

  const maxAttempts = 10

  const isActionButtonDisabled = !password || password.length === 0 || isLoading || countFailedAttempts >= maxAttempts

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
        onSetPage('PrivacyEditPassword')
      } else {
        
        if(countFailedAttempts >= maxAttempts-1) {
          setError("Timeout for 1 hour. Too many failed attempts (10).")
        } else {
          setError("Incorrect password. Try again or click reset password.")
        }
        setCountFailedAttempts(countFailedAttempts+1)
        setIsLoading(false)
      }
    })
  })


  return (
    <AccountScreen>
      <Components.ModalHeader className = "withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('PrivacyMain')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText>
          Let's make sure it's you
        </Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text> To make sure this is you, confirm your current password. </Components.Text>
        <Components.SectionNoBorder>
          <Components.SectionTitle >Your current password</Components.SectionTitle>
          <Components.SectionContent style = {{ flexDirection: "column" }}>
            <Components.CustomInputContainer className="passwordEditable" error={error ? true: false}>
              <Components.CustomInput
                type = {showPassword ? "text" : "password"}
                value= {password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <Components.ShowHideButton onClick={() => setShowPassword(!showPassword)}>
                {(showPassword ? "Hide" : "Show")} </Components.ShowHideButton>
            </Components.CustomInputContainer>
            {error && (
              <Components.ErrorDescription>{error}</Components.ErrorDescription>
            )}
          </Components.SectionContent>
          <Components.ButtonAlign>
            <Components.Button style = {{ marginTop: 0 }} onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled}> Continue </Components.Button>
            <Components.CancelButton onClick={() => onSetPage('PrivacyMain')}>Cancel</Components.CancelButton>
          </Components.ButtonAlign>
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}