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
import { isEmailValid } from "src/renderer/types/Email"

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
}

export const getWelcomeTitle = (userInfo: UserBasicInfo | null) => {
  if (!userInfo) return "Claim your earnings!"
  if (!!userInfo?.firstName && userInfo?.firstName.length > 0) return `Welcome back, ${userInfo.firstName}!`
  return "Claim your earnings!"
}

export const SectionWelcome: FC<Props> = ({ email, photoUrl, userInfo, isCheckingUser, successMsg, onEmailChanged, onOpenSignIn, onOpenCreateAccount, onGoBack }): ReactElement => {
  const title = getWelcomeTitle(userInfo)
  const onKeyDownRef = useRef<any>(null)
  const [error, setError] = useState()
  const [IsemailValid, SetisemailValid] = useState(false)

  const onEmailInputChanged = (event) => onEmailChanged(event.currentTarget.value)

  const isActionButtonDisabled = isCheckingUser || !email || !isEmail(email)
  let onActionButtonClicked = undefined
  if (!isActionButtonDisabled) {
    if (userInfo) onActionButtonClicked = onOpenSignIn
    else onActionButtonClicked = onOpenCreateAccount
  }

  useEffect(() => {
    let j = 0
    for (let i = 0; i < email.length; i++) {
      if (email.charAt(i) === "@") {
        j = i
      } else {
        SetisemailValid(false)
      }
    }
    for (let checkI = j; checkI < email.length; checkI++) {
      if (email.charAt(checkI) === ".") {
        SetisemailValid(true)
      }
    }
  }, [email])

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
        <div className="card">
          <img className="cardImage" src={imgSign} />
        </div>
        <div className="bottomText" style={{ letterSpacing: "-0.7px", lineHeight: "28px", fontSize: "28px" }}>
          Earn 2x or more <br />
          by adding more computers to
          <br />
          your account
        </div>
      </div>
      <div className="divider"></div>
      <div className="rightPanel">
        <div className="top" style={{ height: "24px" }}>
          <img className="closeButton" src={imgClose} onClick={onGoBack} />
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
          <ContinueButton noInput={!email} onClick={isActionButtonDisabled ? undefined : onActionButtonClicked} disabled={isActionButtonDisabled} isEmailValid={IsemailValid} data-testid="login-button">
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
  height: 660px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  .divider {
    width: 1px;
    height: 660px;
    background: rgba(255, 255, 255, 0.15);
  }
  .leftPanel {
    width: 284px;
    height: 660px;
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
    .title {
      margin-left: 36px;
      margin-top: 24px;
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
    }
    .menuDivider {
      margin-top: 147px;
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
      margin-top: 24px;
      width: 248px;
      height: 360px;
      border-radius: 8px;
      background: var(--dark-black, #0E0D17);
    }
    .bottomText {
      margin-left: 18px;
      margin-top: 32px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-self: stretch;
      color: #fff;
      font-size: 30px;
      font-family: Space Grotesk;
      font-weight: 500;
      line-height: 30px;
      letter-spacing: -0.6px;
    }
    .learnMore {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 36px;
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
    background: #0A0A0A;
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

const ContinueButton = styled.div<{ disabled: boolean; noInput: boolean; isEmailValid: boolean }>`
  display: flex;
  padding: 12px 12px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch; /* 133.333% */
  border-radius: 4px;
  background: var(--primary-500, #00efc3);
  margin-top: 24px;
  border: 2px solid var(--primary-500, #00efc3);
  div {
    color: var(--basegrey-800, #333);
  }
  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
    }`}
  ${({ disabled }) =>
    !disabled &&
    `cursor: pointer; 
    background: var(--cybergreen-500, #00EFC3);
    color: var(--dark-black, #0E0D17);
    &:hover {
      border-radius: 4px;
      border: 2px solid var(--primary-500, #00efc3);
      background: #0a0a0a;
      div {
        color: var(--primary-500, #00efc3);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: "liga" off;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
    }`}
  ${({ isEmailValid }) =>
    !isEmailValid &&
    `border-radius: 4px;
    border-color:transparent;
    background: var(--coldgrey-900, #16181D);
    pointer-events: none;
      div {
        color: var(--basegrey-800, #333);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
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
  margin-top: 111px;
`

const EmailInputContainer = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 3px;
  border: 2px solid var(--cybergreen-400, #33ffda);
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
