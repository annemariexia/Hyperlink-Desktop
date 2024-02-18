import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Text } from "../../types/Text"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ipcRenderer } from "electron"
import imgInvalid from "../../../../images/icon-red-cross.svg"
import imgValid from "../../../../images/icon-green-tick.svg"
import DotFlashing from "../../components/DotFlashing"
import imgArrowRight from "./../../../../images/arrow-right.svg"
import imgClose from "./../../../../images/close.svg"
import imgSign from "./../../../../images/sign_red.png"
import { stopEventPropagation } from "../../elements/EventListeners"
import SignUpImg from "./../../../../images/SignUpImage.png"

type Props = {
  email: string
  onSuccess: (msg: string) => void
  onPasswordChanged: (password: string) => void
  onGoBack: () => void
}

const MIN_PASSWORD_LENGTH = 8

/*
   SectionCreateAccount is defined as a functional component using the FC (FunctionComponent) type from React. 
   It receives the Props as its destructured props and returns a React element.
   State variables are initialized using the useState hook from React. 
   These variables include password, error, isLoading, and multiple passwordValidate flags, each representing a specific validation check for the password.   
*/
export const SectionCreateAccount: FC<Props> = ({ email, onSuccess, onPasswordChanged, onGoBack }): ReactElement => {
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [passwordValidateStrength, setPasswordValidateStrength] = useState<boolean>(false)
  const [passwordValidateNameOrEmail, setPasswordValidateNameOrEmail] = useState<boolean>(false)
  const [passwordValidateAtLeaset8, setPasswordValidateAtLeaset8] = useState<boolean>(false)
  const [passwordValidateNumberOrSymbol, setPasswordValidateNumberOrSymbol] = useState<boolean>(false)
  const onKeyDownRef = useRef<any>(null)
  const [showPassword, setShowPassword] = useState(false)

  const clickRedirectTermOfService = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/terms-of-service"
    })
  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  /* handles the onInput event of the password input field
     updates the password state, performs various password validations, 
     and updates the corresponding passwordValidate flags accordingly.*/
  const onPasswordUpdated = (event) => {
    const pass = event.currentTarget.value.toString()
    setPassword(pass)
    setError(null)
    const formatNumber = /[0-9]/
    const validateAtLeaset8 = pass.length >= 8
    const validateNameOrEmail = !pass.includes(email.toString())
    const validateNumber = formatNumber.test(pass)

    setPasswordValidateAtLeaset8(validateAtLeaset8)
    setPasswordValidateNumberOrSymbol(validateNumber)
    setPasswordValidateNameOrEmail(validateNameOrEmail)
    setPasswordValidateStrength(validateAtLeaset8 && validateNameOrEmail && validateNumber)
  }

  /* validates the form before submission,
     checks if password is defined and meets the minimum length requirement. 
     returns a validation error message or null if there is no error.*/
  const getFormValidationError = (): string | null => {
    if (!Text.isDefined(password)) return "You need to specify password"
    if (password.length < MIN_PASSWORD_LENGTH) {
      // return `Password needs to have at least ${MIN_PASSWORD_LENGTH} characters`
      return `You need to specify password`
    }
    return null
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    // Run client-side validation
    const formError = getFormValidationError()
    if (formError) {
      setError(formError)
      return
    }
    setIsLoading(true)
    onPasswordChanged(password)
    ipcRenderer.send(ApiCommand.SignUp, { email, password })
  }

  /* listens for the ApiMessage.SignUpResult event from ipcRenderer
     updates the success/error message based on loading state
     runs only once when the component mounts */
  useEffect(() => {
    ipcRenderer.on(ApiMessage.SignUpResult, (event, signUpResult) => {
      if (signUpResult.success) {
        onSuccess("Your account was created successfuly! Please check your email, to verify it.")
      } else {
        setError(signUpResult.msg)
      }

      setIsLoading(false)
    })

    return () => {
      ipcRenderer.removeAllListeners(ApiMessage.SignUpResult)
    }
  }, [])

  /* adds an event listener for the "keydown" event,
     removes previously attached event listeners,
     listens for the Enter key press and calls the onSubmit function when triggered
     effect depends on the email and password state values */
  useEffect(() => {
    document.removeEventListener("keydown", onKeyDownRef.current)

    onKeyDownRef.current = (event) => {
      const ENTER_KEYCODE = 13 // Enter key
      if (event.keyCode === ENTER_KEYCODE) {
        if (onSubmit) onSubmit(event)
      }
    }

    document.addEventListener("keydown", onKeyDownRef.current)
  }, [email, password])

  /* removes the event listener when the component is unmounted,
     cleans up any remaining event listeners to avoid memory leaks */
  useEffect(() => {
    // On component unmounted
    return () => {
      document.removeEventListener("keydown", onKeyDownRef.current)
    }
  }, [])
  const isContinue = passwordValidateStrength && passwordValidateNameOrEmail && passwordValidateAtLeaset8 && passwordValidateNumberOrSymbol
  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="card">
          <img className="cardImage" src={SignUpImg} />
        </div>
        <div className="bottomText" style={{ lineHeight: "28px", letterSpacing: "-0.7px", fontWeight: "500", fontSize: "28px" }}>
          Multiply your <br />
          earnings 100x <br />
          by sharing links
        </div>
      </div>
      <div className="divider"></div>
      <div className="rightPanel">
        <div className="top" style={{ height: "24px" }}>
          <img className="closeButton" src={imgClose} onClick={onGoBack} />
        </div>
        <Hr />
        <Content>
          <Name>Create account</Name>
          <Description>Create a strong password with a mix of letters, numbers and symbols.</Description>
          <PasswordTitle>Create a password</PasswordTitle>
          <PasswordInputContainer error={!!error}>
            <PasswordInput name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onInput={onPasswordUpdated} autoFocus />
            {password != "" && <ShowHideButton onClick={toggleShowPassword}> {showPassword ? "Hide" : "Show"}</ShowHideButton>}
          </PasswordInputContainer>
          {error && <ErrorDescription>{error}</ErrorDescription>}
          <ContinueButton noInput={!password} onClick={onSubmit} disabled={!isContinue} data-testid="register-button">
            {isLoading ? <DotFlashing /> : <ContinueButtonLabel> Sign Up </ContinueButtonLabel>}
          </ContinueButton>
          <Info>
            By clicking Sign Up, you are agreeing to Hyperlink’s{" "}
            <div className="term-text" onClick={clickRedirectTermOfService}>
              Terms of Service
            </div>
          </Info>
        </Content>
      </div>
    </Form>
  )
}

const Info = styled.div`
  margin-top: 24px;
  color: #ccc;
  font-size: 14px;
  font-family: Manrope;
  line-height: 18px;
  letter-spacing: 0.14px;
  display: flex;
  flex-direction: column;
  align-self: stretch;

  .term-text {
    color: var(--primary-200, #99ffec);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.14px;
    cursor: pointer;

    &:hover {
      color: var(--primary-500, #00efc3);
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.14px;
    }
  }
`

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
  font-size: 23px;
  font-family: Manrope;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.14px;
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
  // width: 376px;
  width: 344px;
  padding: 16px;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  border: 2px solid var(--primary-400, #33ffda);
  background: var(--basegrey-950, #0d0d0d);
  ${({ error }) =>
    error &&
    `color: red; 
    border: 2px solid red;`}
`

const PasswordInput = styled.input`
  // width: 344px;
  // display: flex;
  // padding: 16px;
  // align-items: center;
  // gap: 10px;
  // align-self: stretch;
  // border-radius: 3px;
  // border: 1px solid var(--cybergreen-400, #33ffda);
  // background: var(--basegrey-950, #0d0d0d);
  // color: var(--white, #fff);
  // font-size: 14px;

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

const PasswordTitle = styled.div`
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

const ErrorDescription = styled.div`
  width: 344px;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: #f6a2a5;
  font-weight: 600;
  font-size: 16px;
  font-family: Manrope;
  line-height: 24px;
  letter-spacing: 0.16px;
  margin-top: 8px;
`

const ContinueButton = styled.div<{ disabled: boolean; noInput: boolean }>`
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
    `background: var(--cybergreen-500, #00EFC3);
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
  margin-top: 81px;
`
