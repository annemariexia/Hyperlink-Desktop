import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { UserBasicInfo } from "../../../main/api/ApiClient"
import styled from "styled-components"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ipcRenderer } from "electron"
import { Credentials, DeviceDetails, MARTA_EMAIL, ProfileManager, UserDetails } from "../../elements/system/ProfileManager"
import imgMartaProfilePhoto from "../../../../images/marta-square.png"
import DotFlashing from "../../components/DotFlashing"
import imgExclamation from "./../../../../images/icon-black-exclamation.svg"
import imgArrowRight from "./../../../../images/arrow-right.svg"
import imgClose from "./../../../../images/close.svg"
import imgSign from "./../../../../images/LogInimage.png"
import { stopEventPropagation } from "../../elements/EventListeners"

type Props = {
  email: string
  photoUrl: string
  userInfo: UserBasicInfo
  onSuccess: (user: UserDetails, devices: DeviceDetails[]) => void
  onOpenForgotPassword: () => void
  onVerificationCode: () => void
  onClose: () => void
  onGoBack: () => void
}

const RETRY_NUMBER = 15
const ONE_SEC = 1000

export const getWelcomeTitle = (userInfo: UserBasicInfo | null) => {
  if (!userInfo) return "Welcome back!"
  if (!!userInfo?.firstName && userInfo?.firstName.length > 0) return `Welcome back, ${userInfo.firstName}!`
  return "Welcome back!"
}

export const SectionSignIn: FC<Props> = ({ email, userInfo, onSuccess, onOpenForgotPassword, onVerificationCode, onClose, onGoBack }): ReactElement => {
  const [prevCredentials, setPrevCredentials] = useState<Credentials | undefined>()
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [retry, setRetry] = useState<number>(0)
  const [tooManyRequest, setTooManyRequest] = useState<boolean>(false)
  const [countDown, setCountDown] = useState<string>("")
  const [nextRequestTime, setNextRequestTime] = useState<Date>()
  const title = getWelcomeTitle(userInfo)
  const onKeyDownRef = useRef<any>(null)
  const [showPassword, setShowPassword] = useState(false)

  //function for Show/Hide button
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const onPasswordChanged = (event) => {
    setPassword(event.currentTarget.value)
    setError(null)
  }

  const logIn = async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)
    const guestCredentials = await ProfileManager.loadGuestCredentials()
    let guestUsername = ""
    if (guestCredentials && email !== guestCredentials.email) {
      guestUsername = guestCredentials.email
    }
    ipcRenderer.send(ApiCommand.LogIn, { email, password, guestUsername })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    logIn(email, password)
  }
  // useEffect(() => {
  //   if (!prevCredentials) return
  //   logIn(prevCredentials.email, prevCredentials.password)
  // }, [prevCredentials])

  useEffect(() => {
    if (error) {
      if (retry < RETRY_NUMBER) {
        setRetry(retry + 1)
      } else {
        const curDate = new Date()
        curDate.setMinutes(curDate.getMinutes() + RETRY_NUMBER)
        setNextRequestTime(curDate)
        ProfileManager.setLastAttemptAt()
        setTooManyRequest(true)
      }
    }
  }, [error])

  useEffect(() => {
    const getLastAttempt = async () => {
      const lastAttemptAt = await ProfileManager.getLastAttemptAt()
      if (lastAttemptAt) {
        const x = new Date(lastAttemptAt)
        const y = new Date()
        const diff = Math.floor(x.getTime() - y.getTime()) / ONE_SEC
        if (diff > 0) {
          setNextRequestTime(x)
          setTooManyRequest(true)
        }
      }
    }
    getLastAttempt()
  }, [])

  useEffect(() => {
    ipcRenderer.on(ApiMessage.LogInResult, async (event, logInResult) => {
      if (logInResult.success) {
        if (email === MARTA_EMAIL) {
          logInResult.user.photoUrl = imgMartaProfilePhoto
        }

        ProfileManager.saveCredentials(logInResult.email, logInResult.password, userInfo)
        onSuccess(logInResult.user, logInResult.devices)
        onClose()
      } else {
        if (logInResult.user && !logInResult.user.verified) {
          onVerificationCode()
        } else {
          ProfileManager.removeCreadentials()
          // setPrevCredentials(undefined)
          setError(logInResult.msg)
        }
      }
      setIsLoading(false)
    })

    const logInIfCredentialsAreStored = async () => {
      // Automatically log in, if we store credentials
      const credentials = await ProfileManager.loadCredentials()
      if (!credentials) return
      setPrevCredentials(credentials)
      setPassword(credentials.password)
      logIn(credentials.email, credentials.password)
    }
    // logInIfCredentialsAreStored()

    // On component unmounted
    return () => {
      document.removeEventListener("keydown", onKeyDownRef.current)
      ipcRenderer.removeAllListeners(ApiMessage.LogInResult)
    }
  }, [isLoading])

  const isActionButtonDisabled = !password || password.length === 0 || tooManyRequest
  useEffect(() => {
    document.removeEventListener("keydown", onKeyDownRef.current)

    onKeyDownRef.current = (event) => {
      const ENTER_KEYCODE = 13
      if (event.keyCode === ENTER_KEYCODE) {
        if (onSubmit) onSubmit(event)
      }
    }

    document.addEventListener("keydown", onKeyDownRef.current)
  }, [email, password])

  const getCountDownText = (x: Date, y: Date) => {
    const seconds = Math.floor(x.getTime() - y.getTime()) / ONE_SEC
    if (seconds <= 0) {
      setTooManyRequest(false)
      setRetry(0)

      return ""
    }
    let min = Math.floor(seconds / 60).toFixed(0)
    let second = (seconds - parseInt(min) * 60).toFixed(0)
    if (min.length == 1) {
      min = "0" + min
    }
    if (second.length == 1) {
      second = "0" + second
    }
    return `${min} : ${second}`
  }

  useEffect(() => {
    let timer: any = null
    if (tooManyRequest) {
      timer = setInterval(() => {
        setCountDown(getCountDownText(nextRequestTime, new Date()))
      }, ONE_SEC)
    } else {
      clearInterval(timer)
      timer = null
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [tooManyRequest])

  const onForgotPassword = async (event) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)
    ipcRenderer.send(ApiCommand.RemindPassword, { email })
  }

  useEffect(() => {
    ipcRenderer.on(ApiMessage.RemindPasswordResult, (event, remindPasswordResult) => {
      setIsLoading(false)
      if (remindPasswordResult.success) {
        onOpenForgotPassword()
        setError("We just sent you an email with a link to reset your password")
      } else {
        setError(remindPasswordResult.msg)
      }
    })

    return () => {
      ipcRenderer.removeAllListeners(ApiMessage.RemindPasswordResult)
    }
  }, [])

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="card">
          <img className="cardImage" src={imgSign} />
        </div>
        <div className="bottomText" style={{ lineHeight: "28px", fontSize: "28px", letterSpacing: "-0.7px" }}>
          Multiply your <br />
          earnings 100x <br />
          by inviting friends
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
          <Description>Claim your earnings by logging into your account.</Description>
          <PasswordTitle>Enter your password</PasswordTitle>
          <PasswordInputContainer error={!!error}>
            <PasswordInput name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onInput={onPasswordChanged} autoFocus error={!!error} />
            {password != "" && <ShowHideButton onClick={toggleShowPassword}> {showPassword ? "Hide" : "Show"}</ShowHideButton>}
          </PasswordInputContainer>
          {error && <ErrorDescription>{error}</ErrorDescription>}
          <ContinueButton noInput={!password} onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled}>
            {isLoading ? <DotFlashing /> : <ContinueButtonLabel> Sign In </ContinueButtonLabel>}
          </ContinueButton>
          <ForgotPassword isVisible={!!userInfo} onClick={onForgotPassword} data-testid="remind-button">
            Forgot Password?
          </ForgotPassword>
        </Content>
        {tooManyRequest && (
          <TryAgain>
            <Exclamation src={imgExclamation} />
            <TryAgainContent>
              <TryAgainMainText>Too many attempts</TryAgainMainText>
              <TryAgainSubText>Try again in {countDown}</TryAgainSubText>
            </TryAgainContent>
          </TryAgain>
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

const ForgotPassword = styled.div<{ isVisible: boolean }>`
  margin-top: 24px;
  outline: none;
  cursor: ${({ isVisible }) => (isVisible ? "pointer" : "default")};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  color: var(--primary-200, #99ffec);
  text-align: center;
  font-size: 14px;
  font-family: Manrope;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.14px;
  &:hover {
    color: var(--primary-500);
  }
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

const PasswordInputContainer = styled.div<{ error: boolean }>`
  display: flex;
  width: 344px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  border: 2px solid var(--primary-400, #33ffda);
  background: var(--basegrey-950, #0d0d0d);
  ${({ error }) =>
    error &&
    `color: #F6A2A5; 
    border: 2px solid #EC464B;`}
`

const PasswordInput = styled.input<{ error: boolean }>`
  flex: 1 0 0;
  color: var(--basegrey-50, #f2f2f2);
  align-self: stretch;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 225% */
  // letter-spacing: 4px;
  background: var(--basegrey-950, #0d0d0d);
  color: var(--white, #fff);
  border: transparent;

  &::placeholder {
    color: var(--basegrey-600, #666);
  }
  &:focus-visible {
    outline: none;
    color: var(--white, #fff);
  }
`

const ShowHideButton = styled.button`
  color: #fff;
  text-align: right;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 125% */
  text-decoration-line: underline;
  background: transparent;
  border: transparent;
  &:hover {
    cursor: pointer;
  }
`

const TryAgain = styled.div`
  width: 500px;
  height: 146px;
  border-radius: 38px;
  opacity: 1;
  display: flex;
  align-items: center;
  left: 50px;
  top: 295px;
`
const Exclamation = styled.img`
  width: 60px;
  height: 60px;
  filter: invert(100%);
  margin-left: 30px;
`
const TryAgainContent = styled.div`
  margin-left: 30px;
`
const TryAgainMainText = styled.div`
  text-align: left;
  font: normal normal 600 26px Alliance;
  letter-spacing: 0px;
  color: #ffffff;
`
const TryAgainSubText = styled.div`
  text-align: left;
  font: normal normal 600 18px Alliance;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
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
  font-weight: 400;
  font-family: Manrope;
  font-style: normal;
  line-height: 18px;
  letter-spacing: 0.14px;
  margin-bottom: 48px;
`

const PasswordTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--coldgrey-50, #f1f1f4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  /* Paragraph/Medium */
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.16px;
  margin-bottom: 8px;
`

const ErrorDescription = styled.div`
  color: var(--danger-200, #f6a2a5);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.14px;
  width: 376px;
  margin-top: 8px;
`

const ContinueButton = styled.div<{ disabled: boolean; noInput: boolean }>`
  display: flex;
  padding: 12px 12px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 352px;
  align-self: stretch; /* 133.333% */
  border-radius: 4px;
  background: var(--primary-500, #00efc3);
  margin-top: 24px;
  cursor: pointer;
  border: 2px solid var(--primary-500, #00efc3);
  ${({ noInput }) =>
    !noInput &&
    `&:hover {
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
    }
  }`}
  ${({ disabled }) =>
    !disabled &&
    `cursor: pointer; 
    background: var(--cybergreen-500, #00EFC3);
    color: var(--dark-black, #0E0D17);
    &:hover {
      opacity: 0.75;
    }`}
  ${({ noInput }) =>
    noInput &&
    `border-radius: 4px;
    border-color:transparent;
    background: var(--coldgrey-900, #16181D);
    pointer-events: none;
      div {
        color: var(--coldgrey-200, #C6C9D2);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
      }
    `}
`

const Hr = styled.div`
  width: 100%;
  border-bottom: 3px solid #0000001a;
  opacity: 1;
`

const Content = styled.div`
  margin-left: 92px;
  margin-right: 92px;
  margin-top: 99px;
`
