import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ipcRenderer } from "electron"
import DotFlashing from "../../components/DotFlashing"
import SocialButton from "../../components/SocialButton"
import { DeviceDetails, ProfileManager, UserDetails } from "../../../renderer/elements/system/ProfileManager"
import imgArrowRight from "./../../../../images/arrow-right.svg"
import imgClose from "./../../../../images/close.svg"
import imgSign from "./../../../../images/sign.png"
import imgSignup from "./../../../../images/HearthSignUp.png"

import { stopEventPropagation } from "../../elements/EventListeners"

type Props = {
  email: string
  onClose: () => void
  onVerificationCode: () => void
  onSuccess: (user: UserDetails, devices: DeviceDetails[]) => void
  onGoBack: () => void
}

const VERIFY_CODE_LENGTH = 4
const ONE_CODE_LENGTH = 1

export const SectionVerifyEmail: FC<Props> = ({ email, onClose, onVerificationCode, onSuccess, onGoBack }): ReactElement => {
  const inputCodeRef = []
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string>("")
  const [isResend, setIsResend] = useState<boolean>(false)
  const [verificationCode1, setVerificationCode1] = useState<string>("")
  const [verificationCode2, setVerificationCode2] = useState<string>("")
  const [verificationCode3, setVerificationCode3] = useState<string>("")
  const [verificationCode4, setVerificationCode4] = useState<string>("")
  const [seconds, setSeconds] = useState(300)
  const [hasBeenFocused, setHasBeenFocused] = useState([false, false, false, false])
  const [isSuccess, setIsSuccess] = useState(false)

  //create first focuse when verifiy failed
  const firstInputRef = useRef(null)

  const checkVerificationCode = async (code) => {
    if (code.length == VERIFY_CODE_LENGTH) {
      setIsLoading(true)
      const guestUser = await ProfileManager.loadGuestCredentials()
      ipcRenderer.send(ApiCommand.LoginWithVerificationCode, { email, code, guestUsername: guestUser?.email })
    }
  }

  const resentVerificationCode = async () => {
    ipcRenderer.send(ApiCommand.RemindPassword, { email })
    setIsResend(false)
    setSeconds(300)
  }

  const onInputVerificationCodeIndividual = async (code, setCode, index) => {
    if (code.length == ONE_CODE_LENGTH) {
      setCode(code)
      if (index != VERIFY_CODE_LENGTH - 1) {
        inputCodeRef[index + 1].focus()
      }
    }
  }

  useEffect(() => {
    if (verificationCode1 && verificationCode2 && verificationCode3 && verificationCode4) {
      checkVerificationCode(`${verificationCode1}${verificationCode2}${verificationCode3}${verificationCode4}`)
    }
  }, [verificationCode1, verificationCode2, verificationCode3, verificationCode4])

  useEffect(() => {
    ipcRenderer.on(ApiMessage.SendVerificationCodeResult, () => {
      setIsLoading(false)
      setInfo("Check your inbox, spam or bin folder")
    })
    ipcRenderer.on(ApiMessage.LogInResult, async (event, logInResult) => {
      if (logInResult.success) {
        const { user } = logInResult
        const userDetails = { email: user.email, firstName: user.firstName, photoUrl: user.photoUrl }
        ProfileManager.saveCredentials(logInResult.email, logInResult.password, userDetails)
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setHasBeenFocused([false, false, false, false])
          onSuccess(logInResult.user, logInResult.devices)
        }, 500)
      } else {
        setVerificationCode1("")
        setVerificationCode2("")
        setVerificationCode3("")
        setVerificationCode4("")
        setError(logInResult.msg)
        if (firstInputRef.current) {
          firstInputRef.current.focus()
        }
        setHasBeenFocused([true, false, false, false])
      }

      setIsLoading(false)
    })

    return () => {
      ipcRenderer.removeAllListeners(ApiMessage.SendVerificationCodeResult)
      ipcRenderer.removeAllListeners(ApiMessage.LogInResult)
    }
  }, [isLoading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResend(true)
    }, 300000)
    return () => clearTimeout(timer)
  }, [isResend])

  //create a counter component to count the 5 minutes time
  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)

      // clear setInterval when second come to 0
      return () => clearInterval(intervalId)
    }
  }, [seconds])

  //calcute the remaining minutes and seconds
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="card">
          <img className="cardImage" src={imgSignup} />
        </div>
        <div className="bottomText">
          Get amazing <br />
          rewards with <br />
          your earnings
        </div>
      </div>
      <div className="rightPanel">
        <div className="top" style={{ marginTop: "24px", marginBottom: "24px" }}>
          <img className="closeButton" src={imgClose} onClick={onGoBack} />
        </div>
        <Content>
          <Name>Verify your email</Name>
          <Description>
            Confirm it is you by entering in the code sent to <EmailDescription>{email}.</EmailDescription>
          </Description>
          <Hr />
          <CodeTitle>Enter 4-digit code</CodeTitle>
          <DigitContent>
            <DigitContainer error={!!error} hasBeenFocused={hasBeenFocused[0]} success={isSuccess}>
              <DigitInput
                ref={(input) => {
                  firstInputRef.current = input
                  inputCodeRef[0] = input
                }}
                onFocus={() => {
                  let updatedFocusState = [...hasBeenFocused]
                  updatedFocusState[0] = true // 0 is for the first DigitInput
                  setHasBeenFocused(updatedFocusState)
                }}
                name="verificationCode"
                type="text"
                value={verificationCode1}
                filled={!!verificationCode1}
                onInput={(event) => {
                  onInputVerificationCodeIndividual(event.currentTarget.value, setVerificationCode1, 0)
                  setError(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && verificationCode1) {
                    setVerificationCode1("")
                  }
                }}
                autoFocus
              />
            </DigitContainer>
            <DigitContainer error={!!error} hasBeenFocused={hasBeenFocused[1]} success={isSuccess}>
              <DigitInput
                ref={(input) => {
                  inputCodeRef[1] = input
                }}
                onFocus={() => {
                  let updatedFocusState = [...hasBeenFocused]
                  updatedFocusState[1] = true // 1 is for the second DigitInput
                  setHasBeenFocused(updatedFocusState)
                }}
                name="verificationCode"
                type="text"
                value={verificationCode2}
                filled={!!verificationCode2}
                onInput={(event) => {
                  onInputVerificationCodeIndividual(event.currentTarget.value, setVerificationCode2, 1)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault()
                    setVerificationCode2("")
                    if (inputCodeRef[0]) {
                      inputCodeRef[0].focus()
                      let updatedFocusState = [...hasBeenFocused]
                      updatedFocusState[1] = false
                      setHasBeenFocused(updatedFocusState)
                    }
                  }
                }}
              />
            </DigitContainer>
            <DigitContainer error={!!error} hasBeenFocused={hasBeenFocused[2]} success={isSuccess}>
              <DigitInput
                ref={(input) => {
                  inputCodeRef[2] = input
                }}
                onFocus={() => {
                  let updatedFocusState = [...hasBeenFocused]
                  updatedFocusState[2] = true // 2 is for the third DigitInput
                  setHasBeenFocused(updatedFocusState)
                }}
                name="verificationCode"
                type="text"
                value={verificationCode3}
                filled={!!verificationCode3}
                onInput={(event) => {
                  onInputVerificationCodeIndividual(event.currentTarget.value, setVerificationCode3, 2)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    setVerificationCode3("")
                    inputCodeRef[1].focus()

                    let updatedFocusState = [...hasBeenFocused]
                    updatedFocusState[2] = false
                    setHasBeenFocused(updatedFocusState)
                  }
                }}
              />
            </DigitContainer>
            <DigitContainer error={!!error} hasBeenFocused={hasBeenFocused[3]} success={isSuccess}>
              <DigitInput
                ref={(input) => {
                  inputCodeRef[3] = input
                }}
                onFocus={() => {
                  let updatedFocusState = [...hasBeenFocused]
                  updatedFocusState[3] = true // 3 is for the fourth DigitInput
                  setHasBeenFocused(updatedFocusState)
                }}
                name="verificationCode"
                type="text"
                value={verificationCode4}
                filled={!!verificationCode4}
                onInput={(event) => {
                  onInputVerificationCodeIndividual(event.currentTarget.value, setVerificationCode4, 3)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    setVerificationCode4("")
                    inputCodeRef[2].focus()

                    let updatedFocusState = [...hasBeenFocused]
                    updatedFocusState[3] = false
                    setHasBeenFocused(updatedFocusState)
                  }
                }}
              />
            </DigitContainer>
          </DigitContent>
          {error && (
            <>
              <ErrorDescription>{error}</ErrorDescription>
              <ErrorDivider />
              <ResendContainer>
                <ResendParagraph>The code expires in 5 minutes. </ResendParagraph>
                {isResend ? (
                  <VerifyButton onClick={resentVerificationCode}> {isLoading ? <DotFlashing /> : "Click to Resend"}</VerifyButton>
                ) : (
                  <Countdown>
                    Resend available in {minutes}:{remainingSeconds.toString().padStart(2, "0")}
                  </Countdown>
                )}
              </ResendContainer>
              <ErrorDivider />
              <BottomDescription>Can’t find the email? Check your spam or bin folder.</BottomDescription>
            </>
          )}
          {error == null && (
            <>
              {isSuccess && <CorrectDescription>Successfully verified</CorrectDescription>}
              <ResendContainer>
                <ResendParagraph>The code expires in 5 minutes. </ResendParagraph>
                {isResend ? (
                  <VerifyButton onClick={resentVerificationCode}> {isLoading ? <DotFlashing /> : "Click to Resend"}</VerifyButton>
                ) : (
                  <Countdown>
                    Resend available in {minutes}:{remainingSeconds.toString().padStart(2, "0")}
                  </Countdown>
                )}
              </ResendContainer>
              {/* <Hr /> */}
              <Divider />
              <SocialButton email={email} />
              <BottomDescription>Can’t find the email? Check your spam or bin folder.</BottomDescription>
            </>
          )}
        </Content>
      </div>
    </Form>
  )
}

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
  /* Heading/Small */
  font-size: 24px;
  font-family: Manrope;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.24px;
  margin-bottom: 24px;

  color: var(--basegrey-50, #f2f2f2);

  /* Heading/Small */
  font-style: normal;
  line-height: 32px; /* 133.333% */
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
  font-weight: 400;

  line-height: 18px; /* 128.571% */
`
const EmailDescription = styled.span`
  color: var(--primary-500, #00efc3);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.14px;
`

const BottomDescription = styled.div`
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.14px;
  margin-top: 24px;
  margin-bottom: 24px;
`

const CodeTitle = styled.div`
  display: flex;
  margin-top: 48px;
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
const Hr = styled.div`
  width: 100%;
  border-bottom: 3px solid #0000001a;
  opacity: 1;
`

const Content = styled.div`
  margin-left: 92px;
  margin-right: 92px;
  margin-top: 35.5px;
  margin-bottom: 107.5px;
`

const VerifyButton = styled.span`
  color: var(--primary-500, #00efc3);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.14px;
  cursor: pointer;
`

const DigitContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  margin-bottom: 16px;
`
const DigitContainer = styled.div<{ error: boolean; hasBeenFocused: boolean; success: boolean }>`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 3px;
  background: var(--basegrey-950, #0d0d0d);
  border: 2px solid var(--basegrey-800, #333);
  ${({ hasBeenFocused }) =>
    hasBeenFocused &&
    `
        border: 2px solid var(--primary-400, #33ffda);
    `}
  &:focus-within {
    border: 2px solid var(--primary-400, #33ffda);
  }
  /* On error, style the first child only */
  ${({ error }) =>
    error &&
    `
    &:first-child {
      color: #EC464B;
      border: 2px solid #EC464B !important;
    }
  `}

  ${({ success }) =>
    success &&
    `
    border: 2px solid var(--primary-400, #33ffda) !important;
  `}
`
const DigitInput = styled.input<{ filled: boolean }>`
  width: 50px;
  height: 18px;
  background: var(--basegrey-950, #0d0d0d);
  opacity: 1;
  text-align: center;

  border: transparent;

  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 64.286% */

  &::placeholder {
    color: var(--primary-400, #33ffda);
    border: transparent;
  }
  &:focus-visible {
    outline: none;
    border: transparent;
  }
  &:focus {
    border: transparent;
  }
  ${({ filled }) => filled && `border: transparent;`}
`

const ErrorDescription = styled.div`
  width: 376px;
  color: var(--danger-200, #f6a2a5);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.14px;
  margin-top: 8px;
`

const CorrectDescription = styled.div`
  color: var(--primary-500, #00efc3);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.14px;
  align-self: stretch;
  margin-top: 16px;
  margin-bottom: 16px;
`

const ResendContainer = styled.div``
const ResendParagraph = styled.span`
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.14px;
`
const Countdown = styled.span`
  color: var(--coldgrey-500, #70788f);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.14px;
`
const Divider = styled.div`
  width: 376px;
  margin-top: 24px;
  margin-bottom: 24px;
  height: 1px;
  flex: 1 0 0;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
`

const ErrorDivider = styled.div`
  width: 376px;
  margin-top: 16px;
  margin-bottom: 16px;
  height: 1px;
  flex: 1 0 0;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
`
