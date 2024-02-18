/*
This file contains the "root/parent" bars for the Device Management Popup Panel's device display.
It takes device name, specifications, status, uptime, and earnings estimate to create display bar for each device
a user has.
*/

/* DisplayRow Component */

/*
0- Yes / No — do we need this code?
Yes, we need this code. It represents a row for displaying device information in the Device Management Popup Panel.

1- Why? — Why do we need this code?
We need this code to create rows that display device information, including name, specifications, status, uptime, and earnings estimate.

2- How? — How does this code work?
The component takes in various props, including the position of the row, an SVG element, device details, and progress percentage.
It calculates the device's life earnings based on its CPU cores and GPU RAM size.
The component shows whether the device is online or offline based on the isCpuRunning property.
It updates the device availability and status periodically using ipcRenderer.

3- What? — What are the important key variables?
RowTop: The top position of the row.
svg: The SVG element representing the device's icon.
device: An object containing device details such as name, specifications, and status.
progressPercent: The progress percentage (optional) of the device.

4- Who? — Who does this code serve?
This code serves developers who want to display device information in a row format for use in the Device Management Popup Panel.

5- Where? — Where does this code connect to?
This code connects to the Device Management Popup Panel or similar components that display device-related information.

6- When? — When does this code get used?
This code gets used when the Device Management Popup Panel is open and the user has devices to display.
*/


import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react"
import styled from "styled-components"
import { DeviceDetails } from "./system/ProfileManager"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "./system/System"
import { CPU_POTENTIAL_EARNING_YRLY, GPU_POTENTIAL_EARNING_YRLY, CPU_ESTIMATE_EARNING_YRLY, GPU_ESTIMATE_EARNING_YRLY } from "../common/Constants"

type Props = {
  RowTop: number
  svg: ReactElement
  device: DeviceDetails
  children?: ReactNode;
  progressPercent: number | null
}

export const DisplayRow: FC<Props> = ({ RowTop, svg, device, progressPercent }): ReactElement => {
  const DECIMAL_PLACES = 1
  const REFRESH_MS = 5000
  let checkAvailabilityInterval: any = null

  const updateAvailability = async () => {
    ipcRenderer.send(ApiCommand.GetDeviceAvailability, { macAddress: device.macAddress })
  }

  const [percentage, setPercentage] = useState(progressPercent ?? 0)
  const [isOnline, setOnline] = useState(true)

  useEffect(() => {
    ipcRenderer.on(ApiMessage.GetDeviceAvailabilityResult, (event, result) => {
      if (result.macAddress == device.macAddress) {
        setPercentage(result.data.availability > 1 ? Math.floor(Math.random() * 100) : result.data.availability * 100)
      }
    })
    ipcRenderer.on("NetworkConnectionInfo", (event, result) => {
      setOnline(result.isOnline)
    })
    updateAvailability()
    return () => {
      ipcRenderer.removeAllListeners(ApiMessage.GetDeviceAvailabilityResult)
      ipcRenderer.removeAllListeners("NetworkConnectionInfo")
    }
  }, [])

  const deviceWithPercentage = (device) => {
    let percentageStr

    if (percentage > 0) {
      percentageStr = Number.isInteger(percentage)
        ? percentage.toString()
        : percentage.toFixed(DECIMAL_PLACES) + "%"
    } else
      percentageStr = "---"

    return {
      ...device,
      percentageStr
    }
  }

  const updatedDevice = deviceWithPercentage(device)
  const { percentageStr } = updatedDevice

  const getLifeEarnings = (device) => {
    let cores = 0
    let ramSize = 0

    const singleMatch = device.details.match(/single core/)
    const coresMatch = device.details.match(/(\d+) cores/)

    if (singleMatch) {
      cores = 1 + cores
    } else if (coresMatch) {
      cores = cores + parseInt(coresMatch[1])
    }
    const ramMatch = device.details.match(/GPUVram: (\d+)/)
    if (ramMatch) {
      ramSize = ramSize + parseInt(ramMatch[1])
    }

    const potentialEarningsYrly = cores * CPU_POTENTIAL_EARNING_YRLY + ramSize * GPU_POTENTIAL_EARNING_YRLY
    const lifeEarnings = potentialEarningsYrly * 6.5

    return {
      lifeEarnings: lifeEarnings,
      cores: cores,
      rams: ramSize
    }
  }

  let details = getLifeEarnings(device)

  return (
    <DisplayBar top={RowTop}>
      {svg}
      <DeviceDisplayText left={50} width={200}> {device.name} </DeviceDisplayText>
      <DeviceDisplayText left={294} width={152} style={{ overflow: "auto" }}> {device.details} </DeviceDisplayText>
      {device.isCpuRunning ? (
        <StatusTag>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 8, left: 8 }}>
            <circle cx="4" cy="4" r="4" fill="#1EFF96" />
          </svg>
          <StatusText> {'Running'} </StatusText>
        </StatusTag>
      ) : (
        <StatusTag>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 8, left: 8 }}>
            <circle cx="4" cy="4" r="4" fill="#E92329" />
          </svg>
          <StatusText> {'Offline'} </StatusText>
        </StatusTag>
      )}
      <DeviceDisplayText left={630} width={50}> {percentageStr} </DeviceDisplayText>
      <DeviceDisplayText left={740} width={134}>
        {details.lifeEarnings}
      </DeviceDisplayText>
    </DisplayBar>
  )
}

const DisplayBar = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 890px;
  height: 92px;
  background: #16181D;
  border-radius: 3px;
  flex: none;
  order: 0;
  flex-grow: 0;
`


const DeviceDisplayText = styled.div<{ left: number, width: number }>`
  position: absolute;
  top: 30px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 43px;
  font-family: 'Manrope', sans-serif;;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.015em;
  font-feature-settings: 'tnum' on, 'lnum' on, 'liga' off;
  color: #FFFFFF;
  flex: none;
  order: 1;
  flex-grow: 0;
`

const StatusTag = styled.div`
  position: absolute;
  width: 95px;
  height: 28px;
  left: 515px;
  top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  border: none;
`

const StatusText = styled.div`
  position: absolute;
  width: 57px;
  height: 16px;
  top: 6px;
  left: 22px;
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on, 'liga' off;
  color: #E2E4E9;
`
