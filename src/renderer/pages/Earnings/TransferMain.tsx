import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import styled from 'styled-components'
import { ipcRenderer } from "electron"
import imgClose from "/images/close.svg"
import imgArrowDown from "/images/arrow-down.svg"
import imgPlus from "/images/icon-placeholder.svg"
import imgPencil from "/images/icon-pencil.svg"
import { TransferMain, Input, CustomImageButton, TransferInputContainer } from "../../styles/Earnings"

type Props = {
  openTransferScreen?: Dispatch<SetStateAction<boolean>>
  goAddPayout: any
  goTransferConfirm: any
  setTransferInfo: any
  transinfo: any
  closeModal: () => void
}

export const TransferMainPanel: FC<Props> = ({ openTransferScreen, setTransferInfo, goAddPayout, goTransferConfirm, transinfo, closeModal }): ReactElement => {
  const [inputAmount, setInputAmount] = useState("")
  const [isPanelHover, setIsPanelHover] = useState(false)

  const setAmount = (amount) => {
    if (isNaN(amount)) amount = 0
    if (amount == Infinity) amount = transinfo.from

    setTransferInfo({ ...transinfo, amount: amount == -1 ? transinfo.from : amount * 100 })
  }

  const onClickAmountButton = (amount) => {
    setInputAmount(amount.toFixed(0))
    setAmount(parseFloat(amount))
  }

  const isInValidTransfer = () => {
    return transinfo.to == "" || transinfo.amount == 0 || transinfo.amount > transinfo.from || transinfo.from == 0
  }

  const isInValidAmount = (amt) => {
    if (amt == -1) {
      return transinfo.to == "" || transinfo.from == 0 ? true : false
    } else {
      return transinfo.to == "" || amt * 100 > transinfo.from
    }
  }

  const isValidFixedNumber = (amt) => {
    if (amt == "") return true
    // const pattern = /^-?(?:\d{0,9}(?:\.\d{1,2})?|\d{1,9}(?:\.\d{0,2})?)$/
    const pattern = /^-?\d+$/
    return pattern.test(amt)
  }

  const onHandleEnterAmount = (event) => {
    const value = event.target.value

    if (isValidFixedNumber(value) && value.length <= 9) {
      setInputAmount(value)
      setAmount(parseFloat(value))
    }
  }

  const AddButton = () => {
    return (
      <CustomImageButton width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="icon-placeholder">
          <path
            id="icon"
            d="M16.5 11H11V16.5C11 16.7761 10.7761 17 10.5 17H9.5C9.22386 17 9 16.7761 9 16.5V11H3.5C3.22386 11 3 10.7761 3 10.5V9.5C3 9.22386 3.22386 9 3.5 9H9V3.5C9 3.22386 9.22386 3 9.5 3H10.5C10.7761 3 11 3.22386 11 3.5V9H16.5C16.7761 9 17 9.22386 17 9.5V10.5C17 10.7761 16.7761 11 16.5 11Z"
            fill="#F2F2F2"
          />
        </g>
      </CustomImageButton>
    )
  }

  const EditButton = () => {
    return (
      <CustomImageButton width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="pencil">
          <path
            id="icon"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2128 2.78638C12.7068 2.28038 12.0334 2.00171 11.3161 2.00171C10.6002 2.00171 9.92544 2.28038 9.41876 2.78771L2.47947 9.72704C2.3941 9.81238 2.33348 9.91904 2.3041 10.0364L1.97003 13.6676C1.96816 13.6879 1.96816 13.7083 1.97003 13.7286C1.98688 13.9119 2.14915 14.0469 2.3325 14.03L5.96482 13.6964C6.08144 13.6677 6.18878 13.6064 6.27415 13.521L13.2134 6.58171C13.7201 6.07504 13.9988 5.40038 13.9988 4.68438C13.9988 3.96771 13.7201 3.29304 13.2128 2.78638ZM11.7595 6.15006L12.2706 5.6389C12.5268 5.3828 12.6655 5.04749 12.6655 4.68438C12.6655 4.32068 12.5268 3.9857 12.27 3.72918C12.0141 3.4733 11.68 3.33504 11.3161 3.33504C10.9531 3.33504 10.6181 3.4737 10.3616 3.73052L9.85081 4.24135L11.7595 6.15006ZM3.51739 10.5747L3.33331 12.6667L5.42617 12.4834L10.8166 7.09287L8.90794 5.18416L3.51739 10.5747Z"
            fill="#F2F2F2"
          />
        </g>
      </CustomImageButton>
    )
  }

  const openTermsOfService = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/terms-of-service"
    })
  }

  return (
    <TransferMain>
      <div className="transfer">
        <div className="top">
          <div className="title">Transfer</div>
          <img src={imgClose} className="closeButton" onClick={closeModal}/>
        </div>
        <div className="content">
          <div className="subTitle">
            Transfer your earnings to your PayPal. See our{" "}
            <HoverLink className="link" onClick={openTermsOfService}>
              Terms of Service
            </HoverLink>
            .
          </div>
          <div className="middlePanel">
            <div className="panelFrom">
              <div className="text">From</div>
              <div className="earningsTag">
                <div className="title">$ {(transinfo.from / 100).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className="subtitle">Earnings Arrived</div>
              </div>
            </div>
            <div className="dividerPanel">
              <div className="divider"></div>
              <div className="dividerImg">
                <img src={imgArrowDown} />
              </div>
              <div className="divider"></div>
            </div>
          <div className="panelTo" style={{ cursor: "pointer" }} onClick={goAddPayout}
              onMouseEnter={() => {
                setIsPanelHover(true)
              }}
              onMouseLeave={() => {
                setIsPanelHover(false)
              }}
            >
              <div className="panelLeft">
                <div className="text">To</div>
                <div className="paymentMethodBlock">
                  <div className="title">{transinfo.to ? transinfo.to : "Add your payout method"}</div>
                  <div className="subtitle">{transinfo.to ? "PayPal account" : "No account is linked"}</div>
                </div>
              </div>
              <div className="panelRight">
                <div className="panelDivider" />
                <div className="panelRightTag">
                  {
                    isPanelHover && transinfo.to && (
                      <div className="hoverText">Edit</div>
                    )
                  }
                  {transinfo.to ? <EditButton /> : <AddButton />}
                </div>
              </div>
            </div>
          </div>
          <div className="amountPanel" >
            <div className={transinfo.to ? "text" : "text disabled"} >Enter Amount ($10 minimum)</div>
            <TransferInputContainer disabled={!transinfo.to}>
              {
                transinfo.to ? (
                <>
                  <span style={{ display: "flex", fontSize: "32px", marginRight: "8px", lineHeight: "40px", fontWeight: 300 }}>$</span>
                  <Input
                    value={inputAmount}
                    type="text"
                    placeholder="0"
                    disabled={isInValidAmount(-1) || !transinfo.to}
                    onChange={onHandleEnterAmount}
                  />
                </>
              ) : (
                  <></>
              )
            }
              
            </TransferInputContainer>
            <div className="buttonGroup">
              <button className="button" style={{ border: "none" }} onClick={(e) => onClickAmountButton(10)} disabled={isInValidAmount(10)}>
                $10
              </button>
              <button className="button" style={{ border: "none" }} onClick={(e) => onClickAmountButton(50)} disabled={isInValidAmount(50)}>
                $50
              </button>
              <button className="button" style={{ border: "none" }} onClick={(e) => onClickAmountButton(100)} disabled={isInValidAmount(100)}>
                $100
              </button>
              <button className="button" style={{ border: "none" }} onClick={(e) => onClickAmountButton(200)} disabled={isInValidAmount(200)}>
                $200
              </button>
              <button className="button" style={{ border: "none" }} onClick={(e) => onClickAmountButton(transinfo.from / 100)} disabled={isInValidAmount(-1)}>
                All
              </button>
            </div>
          </div>
          <button className="transferButton" onClick={goTransferConfirm} disabled={isInValidTransfer() || !transinfo.to || transinfo.amount < 1000}>
            Transfer
          </button>
        </div>
      </div>
    </TransferMain>
  )
}

const HoverLink = styled.span`
  &:hover {
    color: var(--cybergreen-400, #33FFDA) !important;
  }
`

const PanelButtonText = styled.div`
  color: var(--primary-500, #00EFC3);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 166.667% */
  display: flex;
  width: 23px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
`

const PanelButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
`