/* LoginButton 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to render login buttons based on the user's email domain, allowing them to log in using their social media accounts (e.g., Google, Yahoo, Outlook, iCloud).

2- How? — How does this code work?
The code takes the user's email as input and extracts the domain part. Based on the domain, it determines the email service provider (e.g., Google, Yahoo) and displays the corresponding login button. When the user clicks on a login button, the onSocialLogin function is invoked, which sends an authentication request to the respective email service using ipcRenderer.

3- What? — What are the important key variables?
emailType: Holds the domain part of the user's email.
emailImg: Stores the logo image URL for the corresponding email service provider.
emailText: Contains the name of the email service provider (e.g., Google, Yahoo).

4- Who? — Who does this code serve?
This code serves users who want to log in to the application using their social media accounts associated with specific email service providers.

5- Where? — Where does this code connect to?
This code connects to the ipcRenderer to send authentication requests to the email service providers (Google, Yahoo, iCloud, Outlook).

6- When? — When does this code get used?
This code is used when the user views the login page and enters their email address. It then dynamically displays the relevant login button based on the email domain, allowing the user to log in using their social media account.
*/

import React, { FC, ReactElement, useEffect, useState } from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"

import imgLogoGoogle from "./../../../images/icon-google.svg"
import imgLogoApple from "./../../../images/icon-apple.svg"
import imgLogoYahoo from "./../../../images/icon-yahoo.svg"
import imgLogoOutlook from "./../../../images/icon-outlook.svg"
import { ApiCommand } from "../elements/system/System"
import { ProfileManager } from "../elements/system/ProfileManager"
import { elementType } from "prop-types"

type Props = {
  email: string
}

const LoginButton = ({ email }): ReactElement => {
  const [emailType, setEmailType] = useState("")
  const [emailImg, setEmailImg] = useState("")
  const [emailText, setEmailText] = useState("")

  useEffect(() => {
    const eType = email.split("@")[1]
    setEmailType(eType)
    if (eType == "yahoo.com") {
      setEmailImg(imgLogoYahoo)
      setEmailText("Yahoo Mail")
    } else if (eType == "outlook.com" || eType == "hotmail.com" || eType == "live.com" || eType == "msn.com") {
      setEmailImg(imgLogoOutlook)
      setEmailText("Outlook")
    } else if (eType == "apple.com" || eType == "mac.com" || eType == "me.com") {
      setEmailImg(imgLogoApple)
      setEmailText("iCloud Mail")
    } else {
      setEmailImg(imgLogoGoogle)
      setEmailText("Gmail")
    }
  })

  const onSocialLogin = async () => {
    const guestUser = await ProfileManager.loadGuestCredentials()
    if (emailType == "gmail.com") ipcRenderer.send(ApiCommand.AuthStartGoogle, { guestUsername: guestUser?.email })
    else if (emailType == "yahoo.com") ipcRenderer.send(ApiCommand.AuthStartYahoo, { guestUsername: guestUser?.email })
    else if (emailType == "apple.com") ipcRenderer.send(ApiCommand.AuthStartApple, { guestUsername: guestUser?.email })
    else if (emailType == "outlook.com") ipcRenderer.send(ApiCommand.AuthStartOutlook, { guestUsername: guestUser?.email })
  }

  return (
    <Container>
      {emailType && (
        <>
          <BottomDescription>Shortcut to your email:</BottomDescription>
          <Button onClick={onSocialLogin} className="social">
            <Img src={emailImg} />
            <Description>{emailText}</Description>
          </Button>
        </>
      )}
    </Container>
  )
}

export default LoginButton

const Container = styled.div``
const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 336px;
  display: flex;
  height: 24px;
  padding: 12px 20px;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--coldgrey-800, #2d3039);
  &:hover {
    cursor: pointer;
    background-color: var(--coldgrey-700, #3e414c);
  }
`

const Description = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
`

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
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
