import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { SectionWelcome } from "./SectionWelcome"
import isEmail from "validator/lib/isEmail"
import styled, { keyframes } from "styled-components"
import { SectionSignIn } from "./SectionSignIn"
import { SectionCreateAccount } from "./SectionCreateAccount"
import { SectionForgotPassword } from "./SectionForgotPassword"
import { SectionCreatePassword } from "./SectionCreatePassword"
import { BackArrow } from "./BackArrow"
import { UserBasicInfo } from "../../../main/api/ApiClient"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ipcRenderer } from "electron"
import imgAvatarPlaceholder from "../../../../images/avatar-placeholder.svg"
import imgMartaProfilePhoto from "../../../../images/marta-square.png"
import { DeviceDetails, MARTA_EMAIL, ProfileManager, Role, UserDetails } from "../../elements/system/ProfileManager"
import { SectionVerifyEmail } from "./SectionVerifyEmail"

enum Step {
  Welcome,
  SignIn,
  CreateAccount,
  ForgotPassword,
  VerifyYourEmail,
  CreatePassword
}

type Props = {
  setProfile: (profile: UserDetails) => void
  setDevices: (devices: DeviceDetails[]) => void
  onClose: () => void
  profile: UserDetails
  setIsShowTutorial: (isShow: boolean) => void
}

const fadeInOut = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 0; }`

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }`

const CHECK_USER_DELAY_MS = 300
const FADE_BACKGROUND_DELAY_MS = 0
const FADE_BACKGROUND_DURATION_MS = 300

export const SignupLogin: FC<Props> = ({ setProfile, setDevices, onClose, profile, setIsShowTutorial }): ReactElement => {
  const [step, setStep] = useState<Step>(Step.Welcome)
  const [showBackgroundFade, setShowBackgroundFade] = useState(false)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserBasicInfo | null>(null)
  const [modalStyle, setModalStyle] = useState(fadeIn)
  const [isSignedUp, setIsSignedUp] = useState(false)
  const timeoutCheckUser = useRef<any>(null)
  const onKeyDownRef = useRef<any>(null)


  const onEmailChanged = (newEmail: string) => {
    setEmail(newEmail)
  }

  const onPasswordChanged = (newPassword: string) => {
    setPassword(newPassword)
  }

  const getPhotoUrl = () => {
    if (!!userInfo && !!userInfo.photoUrl && userInfo.photoUrl.length > 0) {
      return userInfo.photoUrl
    }
    if (userInfo?.email === MARTA_EMAIL) return imgMartaProfilePhoto
    return imgAvatarPlaceholder
  }

  const photoUrl = getPhotoUrl()
  const onOpenSignIn = () => setStep(Step.SignIn)
  const onOpenCreateAccount = () => setStep(Step.CreateAccount)
  const onOpenForgotPassword = () => setStep(Step.ForgotPassword)
  const onOpenWelcomeScreen = () => setStep(Step.Welcome)

  const checkIfUserExists = async () => {
    setIsCheckingUser(true)
    ipcRenderer.send(ApiCommand.CheckIfUserExists, { email })
  }

  const onSuccess = (user: UserDetails, devices: DeviceDetails[]) => {
    setStep(Step.Welcome)
    setSuccessMsg("Success") // Update the success message here
  }

  const onVerifyCodeSuccess = async (email) => {
    setEmail(email)
    setStep(Step.CreatePassword)
  }

  useEffect(() => {
    if (step !== Step.Welcome) {
      setSuccessMsg(null)
    } else {
      checkIfUserExists()
    }
  }, [step])

  useEffect(() => {
    clearTimeout(timeoutCheckUser.current)
    setIsCheckingUser(true)
    timeoutCheckUser.current = setTimeout(checkIfUserExists, CHECK_USER_DELAY_MS)
  }, [email])

  useEffect(() => {
    document.removeEventListener("keydown", onKeyDownRef.current)

    onKeyDownRef.current = (event) => {
      const ESC_KEYCODE = 27

      // Go back to welcome screen on ESC
      if (event.keyCode === ESC_KEYCODE) {
        if (step === Step.Welcome) {
          onClose()
        } else {
          setStep(Step.Welcome)
        }
      }
    }

    document.addEventListener("keydown", onKeyDownRef.current)
  }, [step])

  useEffect(() => {
    // if (profile && profile.verified === false) {
    //   setEmail(profile.email)
    //   setStep(Step.VerifyYourEmail)
    //   return
    // }

    ipcRenderer.on(ApiMessage.CheckIfUserExistsResult, (event, userCheckResult) => {
      if (userCheckResult.exists) {
        setUserInfo(userCheckResult.user)
      } else {
        setUserInfo(null)
      }
      setIsCheckingUser(false)
    })

    const logInIfCredentialsAreStored = async () => {
      // Automatically log in, if we store credentials
      const credentials = await ProfileManager.loadCredentials()
      if (!credentials) return
      if (!credentials.password) return
      setUserInfo(credentials.userInfo)
      setEmail(credentials.email)
      onOpenSignIn()
    }
    // logInIfCredentialsAreStored()
    // On component unmounted
    return () => {
      clearTimeout(timeoutCheckUser.current)
      document.removeEventListener("keydown", onKeyDownRef.current)
      ipcRenderer.removeAllListeners(ApiMessage.CheckIfUserExistsResult)
    }
  }, [])

  const onLogIn = (userDetails: UserDetails, devices: DeviceDetails[]) => {
    setProfile(userDetails)
    setDevices(devices ?? [])
    if (isSignedUp == true) {
      setIsShowTutorial(true)
    }
    if (userDetails.isFirstUse == true) {
      setIsShowTutorial(true)
      ipcRenderer.send(ApiCommand.MarkAsSecondTimeUser, { email })
    }
    if (step !== Step.SignIn) onClose()
  }

  const onSendVerificationCode = (email: string) => {
    ipcRenderer.send(ApiCommand.SendVerificationCode, { email })
  }

  const onGoBack = () => {
    onClose()
  }

  useEffect(() => {
    // Start the fade background timer after 5 seconds
    const fadeBackgroundTimer = setTimeout(() => {
      setShowBackgroundFade(true)
    }, FADE_BACKGROUND_DELAY_MS)

    // Clear the timer when the component unmounts
    return () => clearTimeout(fadeBackgroundTimer)
  }, [])


  const close = () => {
    setModalStyle(fadeInOut)
  }

  useEffect(() => {
    if (modalStyle == fadeInOut) {
      setTimeout(onGoBack, 0)
    }
  }, [modalStyle])

  return (
    <>
      {/* <ModalOverlay fade={modalStyle} onClick={close}> */}
      <Background showBackgroundFade={showBackgroundFade} onClick={close} />
      <Container data-testid="screen-login">
        {(step === Step.Welcome || !step) && (
          <SectionWelcome
            email={email}
            photoUrl={photoUrl}
            userInfo={userInfo}
            isCheckingUser={isCheckingUser}
            successMsg={successMsg}
            onEmailChanged={onEmailChanged}
            onOpenSignIn={onOpenSignIn}
            onOpenCreateAccount={onOpenCreateAccount}
            onGoBack={onGoBack}
          />
        )}
        {step === Step.SignIn && (
          <SectionSignIn
            email={email}
            photoUrl={photoUrl}
            userInfo={userInfo}
            onSuccess={onLogIn}
            onClose={onClose}
            onOpenForgotPassword={onOpenForgotPassword}
            onVerificationCode={() => {
              setStep(Step.VerifyYourEmail)
            }}
            onGoBack={onGoBack}
          />
        )}
        {step === Step.CreateAccount && (
          <SectionCreateAccount
            email={email}
            onPasswordChanged={onPasswordChanged}
            onSuccess={() => {
              setIsSignedUp(true)
              setStep(Step.VerifyYourEmail)
            }}
            onGoBack={onGoBack}
          />
        )}
        {step === Step.ForgotPassword && <SectionForgotPassword onClose={onClose} email={email} onVerificationCode={() => onSendVerificationCode(email)} onSuccess={onVerifyCodeSuccess} onGoBack={onGoBack} />}
        {step === Step.VerifyYourEmail && (
          <SectionVerifyEmail
            email={email}
            onVerificationCode={() => onSendVerificationCode(email)}
            onSuccess={onLogIn}
            onClose={function (): void {
              throw new Error("Function not implemented.")
            }}
            onGoBack={onGoBack}
          />
        )}
        {step === Step.CreatePassword && (
          <SectionCreatePassword
            email={email}
            photoUrl={photoUrl}
            userInfo={userInfo}
            onSuccess={onLogIn}
            onClose={onClose}
            onOpenForgotPassword={onOpenForgotPassword}
            onVerificationCode={() => {
              setStep(Step.VerifyYourEmail)
            }}
            onGoBack={onGoBack}
          />
        )}
      </Container>
      {/* </ModalOverlay> */}
    </>
  )
}

const Background = styled.div<{ showBackgroundFade: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: ${(props) => (props.showBackgroundFade ? 1 : 0)};
  z-index: 999;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`
const ModalOverlay = styled.div<{ fade: any }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: ${({ fade }) => fade} 1.5s ease-in-out;
`

export default SignupLogin
