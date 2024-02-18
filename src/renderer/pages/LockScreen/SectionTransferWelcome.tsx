import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { UserBasicInfo } from "../../../main/api/ApiClient"
import isEmail from "../../../../node_modules/validator/lib/isEmail"
import styled from "styled-components"
import DotFlashing from "../../components/DotFlashing"
import { ipcRenderer } from "electron"
import { ApiMessage } from "../../elements/system/System"
import imgExclamation from "./../../../../images/icon-black-exclamation.svg"
import imgSign from "./../../../../images/sign.png"
import imgArrowRight from "./../../../../images/arrow-right.svg"
import imgClose from "./../../../../images/close.svg"
import imgEmail from "./../../../../images/email.svg"
import { stopEventPropagation } from "../../elements/EventListeners"

import imgRedo from "./../../../../images/redo.svg"
import imgBank from "./../../../../images/bank.svg"
import imgMenuCard from "./../../../../images/card.svg"
import imgMenuActiveCard from "./../../../../images/card-active.svg"
import imgRewards from "./../../../../images/rewards.svg"
import imgRewardsActive from "./../../../../images/rewards-active.svg"
import imgRedoActive from "./../../../../images/redo-active.svg"
import imgBankActive from "./../../../../images/bank-active.svg"
import imgArrowRightActive from "./../../../../images/arrow-right-active.svg"
import imgCard from "./../../../../images/card.png"

type Props = {
  email: string
  photoUrl: string
  userInfo: UserBasicInfo | null
  isCheckingUser: boolean
  successMsg: string
  onEmailChanged: (email: string) => void
  onOpenSignIn: () => void
  onOpenCreateAccount: () => void
  onGoBack: () => void
  activeTab?: string | "transfer"
}

const menu = [
  { id: "transfer", text: "Transfer", icon: imgArrowRight, activeIcon: imgArrowRightActive },
  { id: "history", text: "Transfer History", icon: imgRedo, activeIcon: imgRedoActive },
  { id: "card", text: "Card", icon: imgMenuCard, activeIcon: imgMenuActiveCard },
  { id: "reward", text: "Rewards", icon: imgRewards, activeIcon: imgRewardsActive }
]

export const getWelcomeTitle = (userInfo: UserBasicInfo | null) => {
  if (!userInfo) return "Claim your earnings!"
  if (!!userInfo?.firstName && userInfo?.firstName.length > 0) return `Welcome back, ${userInfo.firstName}!`
  return "Claim your earnings!"
}

export const SectionTransferWelcome: FC<Props> = ({ activeTab, email, photoUrl, userInfo, isCheckingUser, successMsg, onEmailChanged, onOpenSignIn, onOpenCreateAccount, onGoBack }): ReactElement => {
  const title = getWelcomeTitle(userInfo)
  const onKeyDownRef = useRef<any>(null)
  const [error, setError] = useState()
  const [activeMenu, setActiveMenu] = useState(activeTab)

  const onEmailInputChanged = (event) => onEmailChanged(event.currentTarget.value)

  const isActionButtonDisabled = isCheckingUser || !email || !isEmail(email)
  let onActionButtonClicked = undefined
  if (!isActionButtonDisabled) {
    if (userInfo) onActionButtonClicked = onOpenSignIn
    else onActionButtonClicked = onOpenCreateAccount
  }

  useEffect(() => {
    document.removeEventListener("keydown", onKeyDownRef.current)

    onKeyDownRef.current = (event) => {
      const ENTER_KEYCODE = 13
      if (event.keyCode === ENTER_KEYCODE) {
        event.preventDefault()
        if (onActionButtonClicked) onActionButtonClicked()
      }
    }

    document.addEventListener("keydown", onKeyDownRef.current)
  }, [email, isCheckingUser])

  useEffect(() => {
    ipcRenderer.on(ApiMessage.SocialLogInResult, (event, logInResult) => {
      if (!logInResult.success) {
        setError(logInResult.msg)
      }
    })
    // On component unmounted
    return () => {
      document.removeEventListener("keydown", onKeyDownRef.current)
      ipcRenderer.removeAllListeners(ApiMessage.SocialLogInResult)
    }
  }, [])

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="title">Earnings</div>
        <div className="menuPanel">
          {menu.map((item, index) => {
            return (
              <div key={index} className={`menu ${item.id === activeMenu ? "active" : ""}`} onClick={() => setActiveMenu(item.id)}>
                <div className="icon" style={{ width: 18, height: 18 }}>
                  <img src={item.id === activeMenu ? item.activeIcon : item.icon} style={{ width: 18, height: 18 }} />
                </div>
                <div className="menuText">{item.text}</div>
              </div>
            )
          })}
        </div>
        <div className="menuDivider"></div>
        <div className="card">
          <img className="cardImage" src={imgCard} />
        </div>
        <div className="bottomText">Hyperlink Card is coming soon</div>
      </div>
      <div className="divider"></div>
      <div className="rightPanel">
        <div className="top" style={{ height: "24px" }}>
          <TransferContainer>
            <TransferText>Transfer</TransferText>
            <img className="closeButton" src={imgClose} onClick={onGoBack} />
          </TransferContainer>
        </div>
        <Hr />
        <Content>
          <Name>{title}</Name>
          <Description>Claim your earnings by signing up. Don’t lose your earnings! Everything you earned is saved to your User ID.</Description>
          <EmailTitle>Enter your email</EmailTitle>
          <EmailInputContainer>
            <img src={imgEmail} style={{ width: 18, height: 18 }}></img>
            <EmailInput name="email" type="email" placeholder="Email" value={email} onInput={onEmailInputChanged} autoFocus />
          </EmailInputContainer>
          <ContinueButton onClick={isActionButtonDisabled ? undefined : onActionButtonClicked} disabled={isActionButtonDisabled} data-testid="login-button">
            {isCheckingUser ? <DotFlashing /> : <ContinueButtonLabel>Continue {">"}</ContinueButtonLabel>}
          </ContinueButton>
        </Content>
        {error && (
          <LoginFailed>
            <Exclamation src={imgExclamation} />
            <LoginFailedContent>
              <LoginFailedMainText>Social login failed</LoginFailedMainText>
              <LoginFailedSubText>{error}</LoginFailedSubText>
            </LoginFailedContent>
          </LoginFailed>
        )}
      </div>
    </Form>
  )
}

const ContinueButtonLabel = styled.div`
  color: var(--basegrey-950, #0d0d0d);
  text-align: center;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
`

const Form = styled.div`
  width: 844px;
  height: var(--FormHeight);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  .divider {
    width: 1px;
    height: var(--FormHeight);
    background: rgba(255, 255, 255, 0.15);
  }
  .leftPanel {
    width: 284px;
    height: var(--FormHeight);
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    .title {
      margin-left: 36px;
      margin-top: 24px;
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
    }
    .menuPanel {
      margin-top: 40px;
      margin-left: 10px;
      margin-right: 10px;
      .menu {
        &.active {
          background: rgba(255, 255, 255, 0.1);
          .menuText {
            display: flex;
            width: 192px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-family: Manrope;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: 0.21px;
          }
        }
        cursor: pointer;
        display: flex;
        padding: 6px 12px 6px 24px;
        align-items: center;
        gap: 16px;
        align-self: stretch;
        border-radius: 8px;
        .menuText {
          display: flex;
          width: 192px;
          height: 36px;
          flex-direction: column;
          justify-content: center;
          color: var(--basegrey-50, #f2f2f2);
          font-size: 14px;
          font-family: Manrope;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.21px;
        }
        &:not(.active):hover {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
    .menuDivider {
      margin-top: 100px;
      margin-bottom: 16px;
      margin-left: 14px;
      border-radius: 1px;
      background: rgba(255, 255, 255, 0.15);
      width: 256px;
      height: 1px;
      flex-shrink: 0;
    }
    .card {
      margin-left: 18px;
    }
    .cardImage {
      width: 248px;
      border-radius: 8px;
      background: var(--dark-black, #0e0d17);
    }
    .bottomText {
      margin-left: 18px;
      margin-top: 18px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-self: stretch;
      color: #fff;
      font-size: 24px;
      font-family: Space Grotesk;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.6px;
    }
    .learnMore {
      display: flex;
      align-items: center;
      gap: 8px;
      a {
        margin-left: 18px;
        color: var(--cybergreen-400, #33ffda);
        font-size: 14px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0.21px;
      }
      img {
        margin-left: 8px;
      }
    }
  }
  .rightPanel {
    width: 560px;
    padding: 0px 0px 38px 0px;
    align-items: flex-start;
    border-radius: 0px 12px 12px 0px;
    background: #0a0a0a;
  }
  .top {
    display: relative;
    padding: 24px 24px 24px 48px;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    text-align: right;
  }
  .closeButton {
    width: 24px
    height: 24px;
    position: relative;
    float: right;
    cursor: pointer;
  }
`

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--white, #fff);
  /* Heading/Small */
  font-size: 24px;
  font-family: Manrope;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.24px;
  margin-bottom: 24px;
`
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-size: 14px;
  font-family: Manrope;
  line-height: 18px;
  letter-spacing: 0.14px;
  margin-bottom: 48px;
`
const EmailTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--white, #fff);
  /* Paragraph/Medium */
  font-size: 16px;
  font-family: Manrope;
  line-height: 24px;
  letter-spacing: 0.16px;
  margin-bottom: 8px;
`

const ContinueButton = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 12px 12px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch; /* 133.333% */
  border-radius: 4px;
  background: var(--primary-500, #00efc3);
  margin-top: 24px;
  cursor: pointer; 
  border: 2px solid var(--primary-500, #00EFC3);
  &:hover {
    border-radius: 4px;
    border: 2px solid var(--primary-500, #00EFC3);
    background: #0A0A0A;
    div {
      color: var(--primary-500, #00EFC3);
      text-align: center;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 133.333% */
    }
  }
  ${({ disabled }) =>
    !disabled &&
    `cursor: pointer; 
    background: var(--cybergreen-500, #00EFC3);
    color: var(--dark-black, #0E0D17);
    &:hover {
      opacity: 0.75;
    }`}
`

const Hr = styled.div`
  width: 100%;
  border-bottom: 3px solid #0000001a;
  opacity: 1;
`

const Content = styled.div`
  margin-left: 92px;
  margin-right: 92px;
  margin-top: 161px;
`

const EmailInputContainer = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 3px;
  border: 1px solid var(--cybergreen-400, #33ffda);
  background: var(--basegrey-950, #0d0d0d);
`

const EmailInput = styled.input`
  width: 468px;
  display: flex;
  padding: 0px 0px 0px 10px;
  align-items: center;
  color: var(--white, #fff);
  gap: 10px;
  align-self: stretch;
  background: var(--basegrey-950, #0d0d0d);
  border: none;
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  &::placeholder {
    color: var(--basegrey-600, #666);
  }
  &:focus-visible {
    outline: none;
    color: var(--white, #fff);
  }
`

const LoginFailed = styled.div`
  width: 480px;
  height: 146px;
  background: #00000050 0% 0% no-repeat padding-box;
  border-radius: 38px;
  opacity: 1;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  display: flex;
  align-items: center;
  position: absolute;
  left: 670px;
  top: 260px;
`
const Exclamation = styled.img`
  width: 60px;
  height: 60px;
  filter: invert(100%);
  margin-left: 30px;
`
const LoginFailedContent = styled.div`
  margin-left: 30px;
`
const LoginFailedMainText = styled.div`
  text-align: left;
  font: normal normal 600 26px Alliance;
  letter-spacing: 0px;
  color: #ffffff;
`
const LoginFailedSubText = styled.div`
  text-align: left;
  font: normal normal 600 18px Alliance;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`

const TransferText = styled.div`
  color: var(--white, #fff);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 24px */
  padding-right: 368px;
`

const TransferContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
`
