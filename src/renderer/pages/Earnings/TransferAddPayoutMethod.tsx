import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect, useState } from "react"
import { ipcRenderer } from "electron"
import { ApiCommand } from "../../elements/system/System"
import { PayoutType } from "../../types/Payments"
import styled from "styled-components"
import imgClose from "/images/close.svg"
import imgBack from "/images/icon-caret-left.svg"
import iconPaypal from "/images/icon-paypal.svg"
import iconSuccess from "/images/success-btn.svg"
import { Form, Input, ImageButton, TransferAddPayout } from "../../styles/Earnings"

type Props = {
  openTransferScreen?: Dispatch<SetStateAction<boolean>>
  setPayoutEmail: Dispatch<SetStateAction<string>>
  transInfo?: any
  goHome: any
  closeModal: () => void
}

export const TransferAddPayoutMethod: FC<Props> = ({ openTransferScreen, setPayoutEmail, goHome, transInfo, closeModal }): ReactElement => {
  const [email, setPayment] = useState("")
  const [isUpdate, setUpdateStatus] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isEmailChanged, setIsEmailChanged] = useState(false)

  const handleChangeEmail = (e) => {
    setIsEmailChanged(true)
    setPayment(e.target.value)
  }

  const handleSubmit = () => {
    setPayoutEmail(email)
    ipcRenderer.send(ApiCommand.RequestPayout, {
      method: PayoutType.PayPal,
      email: email,
      amountCents: 0
    })
  }

  const handleRemove = () => {
    setPayoutEmail("")
    ipcRenderer.send(ApiCommand.RequestPayout, {
      method: PayoutType.PayPal,
      email: "",
      amountCents: 0
    })
  }

  useEffect(() => {
    if (transInfo.to) {
      setUpdateStatus(true)
      setPayment(transInfo.to)
    }
  }, [])

  useEffect(() => {
    ipcRenderer.on("RequestPayoutResult", (e, response) => {
      setIsSaved(true)
      goHome()
    })

    return (() => {
      ipcRenderer.removeAllListeners("RequestPayoutResult")
    })
  })

  const openTermsOfService = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/terms-of-service"
    })
  }

  const openPrivacyPolicy = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/privacy"
    })
  }

  return (
    <Form>
      <TransferAddPayout>
        <div className="top">
          <div className="button" onClick={goHome}>
            <img src={imgBack} />
          </div>
          <div className="title">{isUpdate ? "Edit payout method" : "Add payout method"}</div>
          <img src={imgClose} className="closeButton" onClick={closeModal}/>
        </div>
        <div className="content">
          <div className="subTitle">
            Add your PayPal details to receive transfers. See our{" "}
            <HoverLink className="link" onClick={openPrivacyPolicy}>
              Privacy Policy
            </HoverLink>
          </div>
          <div className="inputCard">
            <div>
              <div className="panelFrom" style={{ marginBottom: "8px" }}>
                Paypal
              </div>
              <div className="input-group">
                <input className="email" value={email} onChange={(e) => { handleChangeEmail(e) }} placeholder="Enter your PayPal associated email" />
                  <img src={iconPaypal} />
              </div>
            </div>
          </div>
          <div className="actions">
            {!isSaved ? (
              !isEmailChanged ? (
                <button className="submit-disabled" onClick={handleSubmit} disabled>Save Changes</button>
              ): (
                  <button className="submit" onClick={ handleSubmit }>Save Changes</button>
              )
            ) : (
              <button className="btn-success">
                <img src={iconSuccess} style={{ width: 26, height: 26 }} />
                Changes Saved
              </button>
            )}
            {(isUpdate && !isSaved) && (<button className="btn-danger" onClick={handleRemove}>Remove Account</button>)}
          </div>
        </div>
      </TransferAddPayout>
    </Form>
  )
}

const HoverLink = styled.span`
  &:hover {
      color: var(--cybergreen-400, #33FFDA) !important;
  }
`