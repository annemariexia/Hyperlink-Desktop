import React, { FC, ReactElement, useState } from "react"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import iconSuccess from "/images/success-btn.svg"
import * as Components from "./AccountSettingComponents"

type Props = {
  onClose(): void
  onSetPage(page: string): void
}

export const PrivacyEditPhoneNumber: FC<Props> = ({ onClose, onSetPage }): ReactElement => {
  const [phoneNumber, setPhoneNumber] = useState("+1")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const isActionButtonDisabled = !phoneNumber || phoneNumber.length === 0 || isLoading == true

  const onSubmit = () => {
    setIsLoading(false)
    setIsSaved(true)
  }

  return (
    <AccountScreen >
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('PrivacyMain')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText>
          Change phone number
        </Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
          <Components.Text style = {{ marginBottom : 32 }}> For VIP support, let us know your phone number. Please include your country code so we can easily reach you.</Components.Text>
        <Components.SectionNoBorder>
          <Components.SectionTitle>Enter your phone number</Components.SectionTitle>
          <Components.SectionContent>
            <Components.CustomInputContainer error = {false} className="editable">
              <Components.CustomInput
                type="text"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value)
                }}
              />
            </Components.CustomInputContainer>
          </Components.SectionContent>
          {!isSaved ? (
            <Components.Button onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled}> Save Changes </Components.Button>
          ) : (
            <Components.ButtonSuccess>
              <img src={iconSuccess} style={{ width: 26, height: 26 }} />
              Changes Saved
            </Components.ButtonSuccess>
          )}
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}


