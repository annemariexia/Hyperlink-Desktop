import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import styled from 'styled-components'
import { ipcRenderer } from "electron"
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import * as Components from "./AccountSettingComponents"
import imgPencil from '/images/icon-pencil.svg'

type Props = {
  onClose: () => void
  onSetPage: (page: string) => void
  profile: any
  setActiveModal: (modal: string) => void
}

export const Privacy: FC<Props> = ({ onClose, onSetPage, profile, setActiveModal }): ReactElement => {

  const openPrivacy = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/privacy"
    })
  }

  return (
    <AccountScreen>
      <Components.ModalHeader className = "withoutBackBtn">
        <Components.ModalHeaderText>Privacy</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} className="closeButton" alt="Close button" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>
          Edit your security details. See our <HoverLink className="link" onClick={openPrivacy}>
            Privacy Policy
          </HoverLink>
          .
        </Components.Text>
        {
          (profile && profile.role != "Guest") ? (
            <>
              <Components.SectionNoBorder>
                <Components.SectionTitle>Password</Components.SectionTitle>
                <Components.SectionContent>
                  <Components.CustomInputContainer error={false}  onClick={() => onSetPage('PrivacyVerifyPassword')}>
                    <Components.CustomInput className="non-editable"
                      type="password"
                      style={{ color: 'var(--basegrey-700)' }}
                      value="********"
                    />
                    <Components.CustomInputButton>
                      <Components.LinkButton onClick={() => onSetPage("AccountDetail")}>
                        <img src={imgPencil} />
                        <Components.LinkbuttonText>Change</Components.LinkbuttonText>
                      </Components.LinkButton>
                    </Components.CustomInputButton>
                  </Components.CustomInputContainer>
                </Components.SectionContent>
              </Components.SectionNoBorder>
              <Components.Section>
                <Components.SectionTitle>Account management</Components.SectionTitle>
                <Components.TextContainer>
                  <Components.Text> Manage my account and personal information </Components.Text>
                  <Components.LinkButton onClick={() => onSetPage('PrivacyManageAccount')}>
                    <Components.LinkbuttonText>Manage</Components.LinkbuttonText>
                  </Components.LinkButton>
                </Components.TextContainer>
              </Components.Section>
            </>
          ): (
            <Components.Section>
              <Components.SectionTitle>Sign in</Components.SectionTitle>
              <Components.TextContainer>
                <Components.Text className="secondary">Sign in to get access to transfer your earnings, account personalization, earning boosts and much more</Components.Text>
                  <Components.LinkButton onClick={() => {
                    setActiveModal("SignupLogin")
                  }}>
                  <Components.LinkbuttonText>Sign in</Components.LinkbuttonText>
                </Components.LinkButton>
              </Components.TextContainer>
            </Components.Section>
          ) 
        }
      </Components.ModalContent>
    </AccountScreen>
  )
}

const HoverLink = styled.a`
  color: #ccfff6;
  cursor: pointer;
  &:hover {
      color: var(--cybergreen-400, #33FFDA) !important;
  }
`