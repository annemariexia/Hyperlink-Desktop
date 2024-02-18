import React, { FC, ReactElement, useEffect, useState } from "react"
import styled from "styled-components"
import { DeviceDetails } from "../system/ProfileManager"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "../system/System"

type Props = {
  isRunning: boolean
  devices: DeviceDetails[]
  progressPercent: number | null
  uptime?: any | null
  isEnableAllButtons?: any | null
}

const DECIMAL_PLACES = 1
const REFRESH_MS = 5000
let checkAvailabilityInterval: any = null

const updateAvailability = async () => {
  ipcRenderer.send(ApiCommand.GetAvailability, {})
}

export const UptimePanel: React.FC<Props> = ({ isRunning, devices, progressPercent, uptime, isEnableAllButtons }): ReactElement => {
  const [percentage, setPercentage] = useState(progressPercent ?? 0)
  const [isOnline, setOnline] = useState(true)
  const [isHover, setIsHover] = useState(false)
  const [uptimePercentage, setUptimePercentage] = useState(0)
  const [uptimeTotal, setUptimeTotal] = useState("")
  const [uptimeDescription, setUptimeDescription] = useState("72 hrs left to unlock")
  const [isExistVirus, setIsExistVirus] = useState(true)

  const percentageStr = () => {
    let percent
    if (Number.isInteger(percentage)) percent = percentage.toString()
    else percent = percentage.toFixed(DECIMAL_PLACES)
    if (parseInt(percent) < 0) {
      return "0"
    } else {
      return percent
    }
  }

  const RunningStatusIndicator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="4" fill="var(--primary-400, #33FFDA)" />
    </svg>
  )

  const OfflineStatusIndicator = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="4" fill="#E92249" />
    </svg>
  )

  const OnlineProgressBar = (percent: number) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="224" height="4" viewBox="0 0 224 4" fill="none">
        <rect width="224" height="4" rx="2" fill="#2D3039" />
        <rect width={224 * percent / 100} height="4" rx="2" fill="var(--primary-400, #33FFDA)" />
      </svg>
    )
  }

  const OfflineProgressBar = (percent: number) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="224" height="4" viewBox="0 0 224 4" fill="none">
        <rect width="224" height="4" rx="2" fill="#2D3039" />
        <rect width={224 * percent / 100} height="4" rx="2" fill="#8D93A5" />
      </svg>
    )
  }

  const HoverProgressBar = (percent: number) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="20" viewBox="0 0 240 20" fill="none">
        <rect x="8" y="8" width="240" height="4" rx="2" fill="#2D3039" />
        <g filter="url(#filter0_d_149_3971)">
          <rect x="8" y="8" width={224 * percent / 100} height="4" rx="2" fill="#CCFFF6" />
        </g>
        <defs>
          <filter id="filter0_d_149_3971" x="0" y="0" width="240" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.818627 0 0 0 0.9 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_149_3971" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_149_3971" result="shape" />
          </filter>
        </defs>
      </svg>
    )
  }

  useEffect(() => {
    ipcRenderer.on(ApiMessage.GetAvailabilityResult, (event, result) => {
      setPercentage(result.availability > 1 ? 100 : result.availability * 100)
      ipcRenderer.send(ApiCommand.UpdateStatus, {})
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

  useEffect(() => {
    const uptimeHrs = uptime ? uptime?.totalOnlineTime / 1000 / 60 / 60 : 0;

    setUptimeTotal((uptimeHrs).toFixed(0))
    if (uptimeHrs < 72) {
      console.log()
      setUptimeDescription(`${(72 - uptimeHrs).toFixed(0)} hrs left to unlock Tier 3`)
      setUptimePercentage(uptimeHrs / 72 * 100)
    } else if (uptimeHrs >= 72 && uptimeHrs < 272) {
      setUptimeDescription(`${(272 - uptimeHrs).toFixed(0)} hrs left to unlock Tier 2`)
      setUptimePercentage(uptimeHrs / 272 * 100)
    } else if (uptimeHrs >= 272 && uptimeHrs < 672) {
      setUptimeDescription(`${(672 - uptimeHrs).toFixed(0)} hrs left to unlock Tier 1`)
      setUptimePercentage(uptimeHrs / 672 * 100)
    } else if (uptimeHrs >= 672) {
      setUptimePercentage(100)
      setUptimeDescription(`Unlocked Tier 1`)
    }
  }, [uptime])

  const onClickUpdateButton = () => {
    if (!isEnableAllButtons)
      return
    ipcRenderer.send("DownloadFile")
    setIsExistVirus(false)
  }

  const onClickUnlockButton = () => {
    if (!isEnableAllButtons)
      return
    ipcRenderer.send("OpenBrowser", {
      link: "https://support.salad.com/category/30-anti-virus?sort=popularity"
    })
    setIsExistVirus(false)
  }

  return (
    <UptimePanelContainer>
      <DeviceRow>
        <DeviceRowContainer>
          <DeviceName>This Device</DeviceName>
          {isRunning ? (
            <StatusTag isRunning={isRunning}>
              <RunningStatusIndicator />
              <StatusText> {"Online"} </StatusText>
            </StatusTag>
          ) : (
            <StatusTag isRunning={isRunning}>
              <OfflineStatusIndicator />
              <StatusText> {"Offline"} </StatusText>
            </StatusTag>
          )}
        </DeviceRowContainer>
      </DeviceRow>
      <Divider></Divider>
      {/* {
        !isRunning ? (
          <>
            <AntiVirusPanel>
              <AntiVirusHeader>
                <AntiVirusTitle>Antivirus</AntiVirusTitle>
                <AntiVirusDescription>
                  Your Antivirus might be blocking <br></br>Hyperlink from running
                </AntiVirusDescription>
              </AntiVirusHeader>
              <AntiVirusAction>
                <UnBlockButton onClick={onClickUnlockButton}>Unblock & Start Earning {`>`}</UnBlockButton>
                <UpdateButton onClick={onClickUpdateButton}>I have already whitelisted</UpdateButton>
              </AntiVirusAction>
            </AntiVirusPanel>
          </>
        ): ( */}
          <>
            <UptimeScoreContainer>
              <UptimeScoreHeader>
                <UptimeScoreTitle>Uptime Score</UptimeScoreTitle>
                <UptimeScoreValue>
                  <span>{percentageStr()}</span>
                  <span>%</span>
                </UptimeScoreValue>
              </UptimeScoreHeader>
              {
                isRunning ? !isHover ? OnlineProgressBar(percentage) : HoverProgressBar(percentage) : OfflineProgressBar(percentage)
              }
            </UptimeScoreContainer>
            <UptimeContainer>
              <UptimeScoreHeader>
                <UptimeScoreTitle>Total uptime</UptimeScoreTitle>
                <UptimeScoreValue>
                  <span>{ uptimeTotal}</span>
                  <span>hrs</span>
                </UptimeScoreValue>
              </UptimeScoreHeader>
                {
            isRunning ? !isHover ? OnlineProgressBar(uptimePercentage) : HoverProgressBar(uptimePercentage) : OfflineProgressBar(uptimePercentage)
                }
              <UptimeFooter>
                {uptimeDescription }
              </UptimeFooter>
            </UptimeContainer>
          </> 
        {/* )
      } */}
    </UptimePanelContainer>
  )
}

const UpdateButton = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  border: 2px solid var(--basegrey-100, #E6E6E6);
  color: var(--basegrey-50, #F2F2F2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
  cursor: pointer;

  &:hover {
    color: var(--basegrey-950, #0D0D0D);
    background: var(--basegrey-50, #F2F2F2);
  }
`

const UnBlockButton = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--primary-500, #00EFC3);
  color: var(--basegrey-950, #0D0D0D);
  border: 2px solid var(--primary-500, #00EFC3);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: var(--primary-500, #00EFC3);
    border: 2px solid var(--primary-500, #00EFC3);
  }
`

const AntiVirusAction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const AntiVirusDescription = styled.div`
  color: var(--coldgrey-300, #A9AEBC);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.14px;
`

const AntiVirusTitle = styled.div`
  color: var(--coldgrey-50, #F1F1F4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: 1.12px;
  text-transform: uppercase;
`

const AntiVirusHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const AntiVirusPanel = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const UptimeFooter = styled.div`
  color: var(--coldgrey-300, #A9AEBC);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const UptimeContainer = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const UptimeScoreValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  span {
    color: var(--basegrey-50, #F2F2F2);
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 133.333% */
    letter-spacing: -1.08px;
  }
`

const UptimeScoreTitle = styled.div`
  color: var(--coldgrey-50, #F1F1F4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: 1.12px;
  text-transform: uppercase;
`

const UptimeScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  align-self: stretch;
`

const UptimeScoreContainer = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const Divider = styled.div`
  height: 1px;
  align-self: stretch;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
`

const DeviceRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const DeviceName = styled.div`
  color: var(--basegrey-50, #F2F2F2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
`

const StatusTag = styled.div<{ isRunning: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ isRunning }) => (isRunning ? "rgba(51, 51, 51, 0.3)" : "rgba(51, 51, 51, 0.7)")};
  border-radius: 100px;
  padding-left: 4px;
`

const StatusText = styled.div`
  color: var(--basegrey-50, #F2F2F2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.3px;
  padding: 4px 8px 4px 4px;
`

const DeviceRow = styled.div`
  display: flex;
  padding: 4px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const UptimePanelContainer = styled.div`
  display: flex;
  width: 224px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  position: absolute;
  top: 235px;
  left: 994px;
`
