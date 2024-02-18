import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
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

// PrivacyEditPassword component definition
export const PrivacyEditPassword: FC<Props> = ({ profile, onClose, onSetPage }): ReactElement => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Determine if the show and hide action button should be disabled
  const isActionButtonDisabled = !password || password.length === 0 || !confirmPassword || confirmPassword.length === 0 || isLoading === true

  // Set new password
  const onChangePassword = (value) => {
    setPassword(value)
    setError(null)
  }

  // Set confirm password
  const onChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
    setError(null)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    // Check if the password and confirmPassword match
    if (confirmPassword !== password) {
      setError("Passwords don’t match — Please try again.")
      return
    }

    setError(null)
    setIsLoading(true)

    // Retrieve the email from the profile and send a request to reset the password
    const email = profile.email
    ipcRenderer.send(ApiCommand.ResetPasswordPrivacy, { email, password })
  }

  const doesPasswordMatch = () => {
    return password == confirmPassword && password.length > 0
  }

  useEffect(() => {
    const handleResetPasswordResult = (event, ResetResult) => {
      if (ResetResult.success) {
        onSetPage("PrivacyMain")
      } else {
        setError("Something went wrong, please try again later!")
      }

      setIsLoading(false)
    }

    ipcRenderer.on(ApiMessage.ResetPasswordResult, handleResetPasswordResult)

    return () => {
      ipcRenderer.off(ApiMessage.ResetPasswordResult, handleResetPasswordResult)
    }
  }, [])

  // Render the component
  return (
    <AccountScreen>
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage("PrivacyVerifyPassword")} style={{ cursor: "pointer" }}>
          <path
            d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
        <Components.ModalHeaderText>Change Password</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text> Create a strong password with a mix of letters, numbers, and symbols. </Components.Text>
        <Components.SectionNoBorder>
          <Components.SectionTitle>Create a new password</Components.SectionTitle>
          <Components.SectionContent style={{ marginBottom: 0 }}>
            <CustomInputContainer error={error ? true : false} sucess={password == confirmPassword && password.length > 0}>
              <Components.CustomInput
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(event) => {
                  onChangePassword(event.target.value)
                }}
              />
              <Components.ShowHideButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</Components.ShowHideButton>
            </CustomInputContainer>
          </Components.SectionContent>
        </Components.SectionNoBorder>
        <Components.SectionNoBorder>
          <Components.SectionTitle>Confirm</Components.SectionTitle>
          <Components.SectionContent style={{ flexDirection: "column" }}>
            <CustomInputContainer error={error ? true : false} sucess={password == confirmPassword && password.length > 0}>
              <Components.CustomInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(event) => {
                  onChangeConfirmPassword(event.target.value)
                }}
              />
              <Components.ShowHideButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"}</Components.ShowHideButton>
            </CustomInputContainer>
            {password == confirmPassword && password.length > 0 && <SucessMessage>Passwords match!</SucessMessage>}
            {error && <Components.ErrorDescription>{error}</Components.ErrorDescription>}
          </Components.SectionContent>
          <Components.ButtonAlign>
            <Components.Button style={{ marginTop: 0 }} onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled}>
              Save Changes
            </Components.Button>
            <Components.CancelButton onClick={() => onSetPage("PrivacyMain")}>Cancel</Components.CancelButton>
          </Components.ButtonAlign>
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}

const SucessMessage = styled.div`
  align-self: stretch;
  color: var(--primary-500, #00efc3);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: 0.16px;
  margin-top: 8px;
`
export const CustomInputContainer = styled.div<{ error: boolean; sucess: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 4px;
  gap: 10px;
  background: linear-gradient(0deg, var(--basegrey-950), var(--basegrey-950));
  linear-gradient(0deg, var(--basegrey-950), var(--basegrey-950));
  border: 2px solid var(--basegrey-800);
  display: flex;
  align-self: stretch;
  &:focus-within{
    border: 2px solid var(--primary-400, #33FFDA);
    background: var(--basegrey-950, #0D0D0D);
  }
  ${({ error }) => error && `border: 2px solid var(--danger-400);`}
  ${({ sucess }) => sucess && `border: 2px solid var(--primary-500, #00EFC3);`}
  

`
