import React, { FC, ReactElement } from "react"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import { profile } from "console"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import iconPaypal from "/images/icon-paypal.svg"
import { ipcRenderer } from "electron"
import imgPencil from '/images/icon-pencil.svg'
import * as Components from "./AccountSettingComponents"

type Props = {
  profile: UserDetails
  onClose(): void
  onSetPage(page: string): void
  setActiveModal: (modal: string) => void
}

export const Payment: FC<Props> = ({ profile, onClose, onSetPage, setActiveModal }): ReactElement => {

  const openPrivacy = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/privacy"
    })
  }

  return (
    <AccountScreen>
      <Components.ModalHeader className = "withoutBackBtn">
        <Components.ModalHeaderText>Payments</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} className="closeButton" alt="Close button" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>
          Edit your payment details. See our <HoverLink className="link" onClick={openPrivacy}>
            Privacy Policy
          </HoverLink>.
        </Components.Text>
        {
          (profile && profile.role != "Guest") ? (
            <>
              <Components.SectionNoBorder>
                <Components.SectionTitle>Paypal</Components.SectionTitle>
                <Components.SectionContent>
                  <Components.CustomInputContainer error={false}  onClick={() => onSetPage('PaymentEdit')}>
                    <img src={iconPaypal} />
                    <Components.CustomInput className="non-editable"
                      type="text"
                      placeholder="Paypal email"
                      value={profile.payoutEmail}
                      disabled
                    />
                    <Components.LinkButton>
                      <img src={imgPencil} />
                      <Components.LinkbuttonText>Change</Components.LinkbuttonText>
                    </Components.LinkButton>
                  </Components.CustomInputContainer>
                </Components.SectionContent>
              </Components.SectionNoBorder>
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

const HoverLink = styled.span`
  color: #ccfff6;
  cursor: pointer;
  &:hover {
      color: var(--cybergreen-400, #33FFDA) !important;
  }
`