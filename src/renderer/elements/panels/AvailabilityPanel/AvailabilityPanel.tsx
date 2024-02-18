/* AvailabilityPanel 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to display the availability status and progress of a system. It provides real-time updates on system availability and visualizes the progress using a progress bar.

2- How? — How does this code work?
The AvailabilityPanel component receives the progressPercent prop, which indicates the progress percentage of the system. It uses useState and useEffect hooks to manage state and handle updates. The component listens for IPC messages to get availability data and network connection information. It calculates the percentage, determines the system's status message based on the progress, and displays the information using styled components.

3- What? — What are the important key variables?
progressPercent: Prop that represents the progress percentage of the system. It can be null if the progress is not available.

4- Who? — Who does this code serve?
This code serves users who need to display the availability status and progress of a system, along with a corresponding message.

5- Where? — Where does this code connect to?
This code connects to the IPC renderer process to receive availability and network connection information.

6- When? — When does this code get used?
This code gets used whenever system availability and progress need to be visualized and monitored, typically in a dashboard or system status panel.
*/


import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ProgressBar } from "./ProgressBar"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage, Message } from "../../../elements/system/System"

type Props = {
  progressPercent: number | null
}

const DECIMAL_PLACES = 1
const REFRESH_MS = 5000
let checkAvailabilityInterval: any = null

const updateAvailability = async () => {
  ipcRenderer.send(ApiCommand.GetAvailability, {})
}

export const AvailabilityPanel: FC<Props> = ({ progressPercent }): ReactElement => {
  const [percentage, setPercentage] = useState(progressPercent ?? 0)
  const [isOnline, setOnline] = useState(true)

  useEffect(() => {
    ipcRenderer.on(ApiMessage.GetAvailabilityResult, (event, result) => {
      setPercentage(result.availability > 1 ? 100 : result.availability * 100)
    })
    ipcRenderer.on("NetworkConnectionInfo", (event, result) => {
      setOnline(result.isOnline)
    })
    checkAvailabilityInterval = setInterval(updateAvailability, REFRESH_MS)
    updateAvailability()
    return () => {
      ipcRenderer.removeAllListeners(ApiMessage.GetAvailabilityResult)
      ipcRenderer.removeAllListeners("NetworkConnectionInfo")
      if (checkAvailabilityInterval) {
        clearInterval(checkAvailabilityInterval)
        checkAvailabilityInterval = null
      }
    }
  }, [])

  let message = ""

  if (!isOnline) {
    message = "You are offline"
  } else if (progressPercent !== null) {
    if (percentage < 10) {
      message = "Just starting? Aim higher! "
    } else if (percentage < 20) {
      message = "Progressing! Keep it up!"
    } else if (percentage < 30) {
      message = "Nice! Aim for more!"
    } else if (percentage < 40) {
      message = "On your way! Boost up!"
    } else if (percentage < 50) {
      message = "Halfway! Keep going!"
    } else if (percentage < 60) {
      message = "Awesome! Connect more!"
    } else if (percentage < 70) {
      message = "Fantastic! Aim high!"
    } else if (percentage < 80) {
      message = "Great! Stay online"
    } else if (percentage < 90) {
      message = "Impressive! Almost there!"
    } else {
      message = "Great! Keep system online"
    }
  }

  const availabilityValue = progressPercent === null ? "---" : percentage.toFixed(DECIMAL_PLACES) + "%"

  return (
    <Container>
      <ProgressBar percent={percentage} />
      <Content>
        <Left>{message}</Left>
        <Right>Availability: {availabilityValue}</Right>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: start;
  width: 865px;
  margin-right: 160px;
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 26px;
  font-size: 25px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
`

const Left = styled.div`
  flex: 1 0 0;
  text-align: left;
`

const Right = styled.div`
  flex: 1 0 0;
  text-align: right;
`
