import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import iconSuccess from "/images/success-btn.svg"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import iconPaypal from "/images/icon-paypal.svg"
import * as Components from "./AccountSettingComponents"
import { ipcRenderer } from "electron"
import { ApiCommand } from "../../elements/system/System"
import { PayoutType } from "../../types/Payments"

type Props = {
  profile: UserDetails
  onClose(): void
  onSetPage(page: string): void
  setProfile
}

export const PaymentEdit: FC<Props> = ({ profile, onClose, onSetPage, setProfile }): ReactElement => {
  const [paymentEmail, setPaymentEmail] = useState(profile.payoutEmail)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const isActionButtonDisabled = !paymentEmail || paymentEmail.length === 0 || isLoading == true || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(paymentEmail)

  const onSubmit = () => {
    setIsLoading(false)
    setIsSaved(true)
  }

  const setPayoutEmail = (email: string) => {
    ipcRenderer.send(ApiCommand.RequestPayout, {
      method: PayoutType.PayPal,
      email: paymentEmail,
      amountCents: 0
    })
  }

  useEffect(() => {
    ipcRenderer.on("RequestPayoutResult", (e, response) => {
      setProfile({ ...profile, payoutEmail: paymentEmail })
      onSetPage('PaymentMain')
    })

    return (() => {
      ipcRenderer.removeAllListeners("RequestPayoutResult")
    })
  })

  const removePayoutEmail = () => {
    ipcRenderer.send(ApiCommand.RequestPayout, {
      method: PayoutType.PayPal,
      email: null,
      amountCents: 0
    })
  }

  useEffect(() => {
    ipcRenderer.on("RequestPayoutResult", (e, response) => {
      setProfile({ ...profile, payoutEmail: paymentEmail })
      onSetPage('PaymentMain')
    })

    return (() => {
      ipcRenderer.removeAllListeners("RequestPayoutResult")
    })
  })


  return (
    <AccountScreen>
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('PaymentMain')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText>Edit Paypal Information</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} className="closeButton" alt="Close button" onClick={onClose} />      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>
          Edit your Paypal payment details.
        </Components.Text>
        <Components.SectionNoBorder>
          <Components.SectionTitle>Paypal</Components.SectionTitle>
          <Components.SectionContent>
            <Components.CustomInputContainer error={false}>
              <img src={iconPaypal} />
              <Components.CustomInput
                type="text"
                placeholder="Paypal email"
                value={paymentEmail}
                onChange={(event) => {
                  setPaymentEmail(event.target.value)
                }}
              />
            </Components.CustomInputContainer>
          </Components.SectionContent>
          <Components.ButtonAlign>
            <Components.Button style = {{ marginTop: 0 }} onClick={() => isActionButtonDisabled ? undefined : setPayoutEmail(paymentEmail)} disabled={isActionButtonDisabled}> Save Changes</Components.Button>
            <Components.CancelButton onClick={() => removePayoutEmail()}>Remove Account</Components.CancelButton>
          </Components.ButtonAlign>
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}

const ModalHeader = styled.div`
  display: flex;
  padding: 24px 24px 24px 12px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`