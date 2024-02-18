import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import imgClose from "/images/close.svg"
import imgBack from "/images/icon-caret-left.svg"
import iconConfirmed from "/images/icon-confirmed.svg"
import iconRejected from "/images/icon-rejected.svg"
import { ImageButton, TransferConfirmContainer } from "../../styles/Earnings"
import moment from "moment"

type Props = {
  openTransferScreen?: Dispatch<SetStateAction<boolean>>
  goHome: () => void
  payoutResult: any
  closeModal: () => void
  openChatDrawer?: () => void
  goHistory()
}


export const TransferConfirmPanel: FC<Props> = ({ openTransferScreen, openChatDrawer, goHome, payoutResult, closeModal, goHistory }): ReactElement => {
  const getProceedDate = () => {
    return moment().format("MMM D, YYYY")
  }

  const getProceedTime = () => {
    return moment().format("LT")
  }



  return (
    <TransferConfirmContainer>
      <div className="top">
        <div className="title">Confirmation</div>
        <img src={imgClose} className="closeButton" onClick={closeModal}/>
      </div>
      <div className="content">
        {payoutResult.confirmed ? (
          <div className="confirm-box">
            <img src={iconConfirmed} />
            <div className="confirm-status">Transfer Confirmed</div>
            <div className="confirm-comment">Funds will become available after this transaction is verified. Please, allow 1-3 business days.</div>
          </div>
        ) : (
          <div className="confirm-box rejected">
            {/* <img src={iconConfirmed} /> */}
            <img src={iconRejected} />
            <div className="confirm-status">Transfer Declined</div>
            <div className="confirm-comment" style = {{marginTop: "4px"}}>Your funds remain in your Hyperlink Account. Please, verify the information you entered and try again. </div>
          </div>
        )}

        <div className="content-total">
          <div className="label">Transfer Amount</div>
          {payoutResult.confirmed && <div className="dollar">${(payoutResult.amount / 100.00).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>}
          {payoutResult.confirmed && <span className="currency">USD</span>}
          {!payoutResult.confirmed && <div className="cancel-text">cancelled</div>}
        </div>

        <div className="content-divider"></div>
        <div className="detail-row">
          <div className="detail-label">Payout Method</div>
          <div className="detail-value">PayPal</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Reference</div>
          <div className="detail-value" style = {{letterSpacing: "-0.64px"}}>{payoutResult.confirmed ? payoutResult.payoutId : "N.A."}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Payout Account</div>
          <div className="detail-value">{payoutResult.to}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Date</div>
          <div className="detail-value">{getProceedDate()}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Time</div>
          <div className="detail-value">{getProceedTime()}</div>
        </div>

        <div className="content-divider" style={{ marginTop: "20px" }}></div>

        <div className="confirm-desc">
          Email with confirmation was sent to {payoutResult.to} <br />
          If you have any questions, please <span className="link" onClick={() => {
            closeModal()
            openChatDrawer()
          }}>Contact Support</span>.
        </div>

        <div className="actions">
          <button className="submit" style={{ width: "100%" }} onClick={payoutResult.confirmed ? goHistory : goHome}>
            {payoutResult.confirmed ? "See Transfer History" : "Back Home"}
          </button>
          <button className="btn-cancel" style={{ width: "100%" }} onClick={closeModal}>
            Close this window
          </button>
        </div>
      </div>
    </TransferConfirmContainer>
  )
}
