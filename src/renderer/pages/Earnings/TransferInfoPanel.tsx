import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect } from "react"
import { ipcRenderer } from "electron"
import imgClose from "/images/close.svg"
import imgBack from "/images/icon-caret-left.svg"
import iconPaypal from "/images/icon-paypal.svg"
import { ImageButton, TransferInfoContainer } from "../../styles/Earnings"
import { ApiCommand } from "../../elements/system/System"
import { PayoutType } from "../../types/Payments"

type Props = {
  openTransferScreen?: Dispatch<SetStateAction<boolean>>
  transinfo: any
  goHome: any
  goConfirm: any
  closeModal: () => void
}

export const TransferInfoPanel: FC<Props> = ({ openTransferScreen, transinfo, goHome, goConfirm, closeModal }): ReactElement => {
  const onHandleConfirmTransfer = (bConfirmed) => {
    if (bConfirmed) {
      ipcRenderer.send(ApiCommand.RequestPayout, {
        method: PayoutType.PayPal,
        email: transinfo.to,
        amountCents: transinfo.amount
      })
    } else {
      goHome()
    }
  }

  useEffect(() => {
    ipcRenderer.on("RequestPayoutResult", (e, response) => {
      if (response.success) {
        goConfirm(true, response.payoutId)
      } else {
        goConfirm(false, null)
      }
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

  return (
    <TransferInfoContainer>
      <div className="top">
        <div className="button" onClick={goHome}>
          <img src={imgBack} />
        </div>
        <div className="title">Please Confirm Transfer</div>
        <img src={imgClose} className="closeButton" onClick={closeModal}/>
      </div>
      <div className="content">
        <div className="subTitle">
          Confirm your transfer to yourself. You are about to transfer money. <br /> By clicking <b>Transfer</b>, you are agreeing to Hyperlink’s 
          <span className="link" onClick={openTermsOfService}> Terms of Service</span>.
        </div>
        <div className="from-groups">
          <div className="from-group">
            <div className="from-label">From</div>
            <div className="from-content">
              <div className="earnings">
                <div className="earnings-arrived">Earnings Arrived</div>
                <div className="earnings-value">${(transinfo.from / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="from-comment">Balance after transfer: ${((transinfo.from - transinfo.amount) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>
          <div className="from-group">
            <div className="from-label">To</div>
            <div className="from-content">
              <div className="payment-method">
                <img src={iconPaypal} />
                <div className="payment-email">{transinfo.to}</div>
              </div>
              <div className="from-comment">PayPal</div>
            </div>
          </div>
        </div>
        <div className="form-divider"></div>
        <div className="form-rows">
          <div className="form-row">
            <div className="detail-label">Transfer Amount</div>
            <div className="detail-value">${(transinfo.amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="form-row">
            <div className="detail-label">Commission</div>
            <div className="detail-value">Free always</div>
          </div>
        </div>
        <div className="form-divider"></div>
        <div className="total-row">
          <div className="total-label">Confirm Transfer?</div>
          <div className="total-dollar">${(transinfo.amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="total-currency">USD</div>
        </div>
        <div className="actions">
          <button className="submit" onClick={() => onHandleConfirmTransfer(true)}>
            Confirm Transfer
          </button>
          <button className="btn-cancel" onClick={() => onHandleConfirmTransfer(false)}>
            Cancel
          </button>
        </div>
      </div>
    </TransferInfoContainer>
  )
}
