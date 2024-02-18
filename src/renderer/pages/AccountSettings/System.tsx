import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useEffect } from "react"
import styled from "styled-components"
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import * as Components from "./AccountSettingComponents"

type Props = {
  onClose()
  profile
  setActiveModal: (modal: string) => void
}

export const System: FC<Props> = ({ onClose, profile, setActiveModal }): ReactElement => {
  // const [isAutoStart, setIsAutoStart] = useState(true)

  const [isAutoStart, setIsAutoStart] = useState(() => {
    const savedValue = localStorage.getItem('isAutoStart')
    return savedValue !== null ? JSON.parse(savedValue) : true
  })

  const onChangeCheckbox = () => {
    setIsAutoStart(!isAutoStart)
  }

  useEffect(() => {
    localStorage.setItem('isAutoStart', JSON.stringify(isAutoStart))
  }, [isAutoStart])

  return (
    <AccountScreen>
      <Components.ModalHeader className="withoutBackBtn">
        <Components.ModalHeaderText>System</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>Edit your system preferences here.</Components.Text>
        <Components.Section>
          <Components.SectionTitle>Auto-start</Components.SectionTitle>
          <Components.TextContainer style = {{paddingRight: 16}}>
            <Components.Text> To earn more, run Hypervisor when computer starts </Components.Text>
            <Components.ToogleButton buttonType={isAutoStart} onClick={() => onChangeCheckbox()}>
              <Components.ToogleButtonRadio buttonType={isAutoStart}></Components.ToogleButtonRadio>
            </Components.ToogleButton>
              <Components.ToggleText style = {{width: 17}}>
              {isAutoStart ? "On" : "Off"}
              </Components.ToggleText>
          </Components.TextContainer>
        </Components.Section>
        {
          (!profile || profile.role == "Guest") && (
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
