import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import { UserDetails, ProfileManager, DeviceDetails } from "./system/ProfileManager"

type Props = {
  profile: UserDetails
  devices: DeviceDetails[]
  isProcessRunning: boolean
  showInCenter?: boolean
  scale: number
}

const TOP = 120
const LEFT = 180
const SCALE = 1.1
const INCREASE_EVERY_MS = 10
const CPU_ESTIMATE_EARNING_YRLY = 586
const GPU_ESTIMATE_EARNING_YRLY = 3650

let intervalIncreaseEarnings

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const LiveBalancePanelForToturial: FC<Props> = ({ profile, devices, isProcessRunning }): ReactElement => {
  const earningsExpectedUsdRef = useRef<number>(0)
  const [earningsExpectedUsd, setEarningsExpectedUsd] = useState<number>(0)
  const [startDateMs] = useState<number>(new Date().getTime())
  const [detecting, setDetecting] = useState(true)

  // get cpu and gpu details from the device list
  const deviceDetailsList = devices.map((device) => device.details)
  let cores = 0
  let ramSize = 0
  for (const deviceDetails of deviceDetailsList) {
    const singleMatch = deviceDetails.match(/single core/)
    const coresMatch = deviceDetails.match(/(\d+) cores/)
    if (singleMatch) {
      cores = 1 + cores
    } else if (coresMatch) {
      cores = cores + parseInt(coresMatch[1])
    }
    const ramMatch = deviceDetails.match(/GPUVram: (\d+)/)
    if (ramMatch) {
      ramSize = ramSize + parseInt(ramMatch[1])
    }
  }

  // calculate potential and estimated earnings
  //   const estimatedEarningsYrly = cores * CPU_ESTIMATE_EARNING_YRLY + ramSize * GPU_ESTIMATE_EARNING_YRLY
  //   const estimatedEarningsPerMs = estimatedEarningsYrly / (365 * 60 * 60 * 24 * 1000)

  // calculate live earnings
  //   const increaseEarnings = async () => {
  //     console.log("increaseEarnings")
  //     const nowMs = new Date().getTime()
  //     const offlineTime = await ProfileManager.getOfflineTime()
  //     const isOnline = offlineTime == null
  //     earningsExpectedUsdRef.current = (nowMs - startDateMs) * estimatedEarningsPerMs
  //     setEarningsExpectedUsd(isOnline ? earningsExpectedUsdRef.current : 0)
  //   }

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setDetecting(false)
  //     }, 4500)
  //   }, [])

  //   useEffect(() => {
  //     // continue if estimatedEarningsPerMs is 0
  //     if (estimatedEarningsPerMs === 0) {
  //       console.log("estimatedEarningsPerMs is 0")
  //       return
  //     }
  //     // if the process is running, start the interval
  //     if (isProcessRunning) {
  //       intervalIncreaseEarnings = setInterval(increaseEarnings, INCREASE_EVERY_MS)
  //     } else {
  //       // else stop the interval and show yearly potential earnings
  //       console.log("clear interval line 87")
  //       clearInterval(intervalIncreaseEarnings)
  //     }
  //   }, [isProcessRunning, estimatedEarningsPerMs])

  // Update the earnings ticker when the profile changes
  //   useEffect(() => {
  //     if (!!profile) {
  //       earningsExpectedUsdRef.current = profile.earningsExpectedUsd
  //     } else {
  //       earningsExpectedUsdRef.current = 0
  //     }
  //   }, [profile])

  //   useEffect(() => {
  //     return () => {
  //       // On element unmount
  //       clearInterval(intervalIncreaseEarnings)
  //       console.log("clear interval line 97")
  //     }
  //   }, [])

  const formatMoney = (amountUsd: number, fractionDigits = 2): string => (amountUsd / 100).toLocaleString("en-US", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })

  // update the earnings amount based on the view selected
  const currTextMoney = (profile?.earningsUsd ?? 0) + earningsExpectedUsd
  const currTextMoneyRounded = formatMoney(currTextMoney, 8)

  return (
    <>
      <Positioner top={TOP} left={LEFT} scale={SCALE}>
        <Ecllipse></Ecllipse>
        <LiveBalanceContainer>
          <DataWell>
            <LiveBalanceLabel>Live Balance</LiveBalanceLabel>
            {<ValueText>${currTextMoneyRounded}</ValueText>}
            <SublabelText>Estimate to date</SublabelText>
          </DataWell>
          <TransferBttn>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.56567 0.234232C6.71565 0.384255 6.7999 0.587704 6.7999 0.799838C6.7999 1.01197 6.71565 1.21542 6.56567 1.36544L5.53126 2.39985H6.80007C10.5217 2.39985 13.6001 5.47829 13.6001 9.19993C13.6001 12.9216 10.5217 16 6.80007 16C3.07843 16 0 12.9216 0 9.19993C0 8.98775 0.0842865 8.78427 0.234317 8.63424C0.384348 8.48421 0.587833 8.39992 0.800009 8.39992C1.01218 8.39992 1.21567 8.48421 1.3657 8.63424C1.51573 8.78427 1.60002 8.98775 1.60002 9.19993C1.60002 12.0384 3.96164 14.4 6.80007 14.4C9.6385 14.4 12.0001 12.0384 12.0001 9.19993C12.0001 6.3615 9.6385 3.99987 6.80007 3.99987H5.53126L6.56567 5.03428C6.7114 5.18517 6.79203 5.38725 6.79021 5.59701C6.78839 5.80677 6.70425 6.00742 6.55592 6.15575C6.4076 6.30408 6.20694 6.38821 5.99718 6.39004C5.78742 6.39186 5.58534 6.31122 5.43446 6.16549L3.03443 3.76547C2.88445 3.61545 2.8002 3.412 2.8002 3.19986C2.8002 2.98773 2.88445 2.78428 3.03443 2.63426L5.43446 0.234232C5.58448 0.0842531 5.78793 0 6.00006 0C6.2122 0 6.41565 0.0842531 6.56567 0.234232Z"
                fill="#F2F2F2"
              />
            </svg>
            <TransferText>Transfer</TransferText>
          </TransferBttn>
          <RewardsBttn>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.1676 4.576C10.5836 4.34358 10.9777 4.06232 11.3145 3.72547C12.2611 2.77895 12.3705 1.35411 11.5587 0.544C11.1933 0.178526 10.7048 0 10.1912 0C9.56295 0 8.89768 0.267789 8.37558 0.788211C7.59916 1.56463 7.12926 2.63747 6.84295 3.58232C6.55663 2.63579 6.08505 1.56295 5.31032 0.788211C4.7899 0.267789 4.12463 0 3.49474 0C2.98105 0 2.49263 0.178526 2.12716 0.544C1.31537 1.35579 1.42484 2.77895 2.37137 3.72547C2.70821 4.06232 3.104 4.34358 3.51832 4.576H0V8.73095H0.554105V16H13.1352V8.73095H13.6893V4.576H10.1676ZM3.2 2.90021C2.94232 2.64253 2.78232 2.31411 2.75705 1.99411C2.74526 1.84589 2.75705 1.568 2.95579 1.36926C3.12253 1.20253 3.34147 1.16884 3.49642 1.16884C3.84168 1.16884 4.20211 1.33221 4.48505 1.61516C5.03411 2.16421 5.48716 3.04 5.79368 4.14484C5.80211 4.17516 5.81053 4.20379 5.81726 4.23411C5.78695 4.22568 5.75832 4.21895 5.728 4.21053C4.62316 3.904 3.74905 3.45095 3.19832 2.90189H3.2V2.90021ZM6.23158 14.9608H1.59326V8.72926H6.23158V14.9608ZM6.23158 7.69179H1.03916V5.61516H6.23158V7.69179ZM7.89558 4.14316C8.20211 3.03832 8.65516 2.16253 9.20421 1.61347C9.48716 1.33053 9.84758 1.16716 10.1928 1.16716C10.3478 1.16716 10.5684 1.20253 10.7335 1.36758C10.9322 1.56632 10.9423 1.84421 10.9305 1.99242C10.9053 2.31074 10.7453 2.64084 10.4876 2.89853C9.93853 3.44758 9.06274 3.90063 7.9579 4.20716C7.92758 4.21558 7.89895 4.224 7.86863 4.23074C7.87705 4.20211 7.88379 4.17179 7.89221 4.14147H7.89558V4.14316ZM12.0977 14.9625H7.45937V8.73095H12.0977V14.9625ZM12.6518 7.69347H7.45937V5.61684H12.6518V7.69347Z"
                fill="white"
              />
            </svg>
            <RewardsText>Rewards & Card</RewardsText>
          </RewardsBttn>
        </LiveBalanceContainer>
      </Positioner>
    </>
  )
}

const Ecllipse = styled.div`
  position: absolute;
  width: 497px;
  height: 499px;
  background: linear-gradient(47.47deg, #02aab0 5.98%, #00cdac 85.82%);
  opacity: 0.3;
  filter: blur(200px);
`

const Positioner = styled.div<{ top: number; left: number; scale: number }>`
  position: relative;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: ${({ scale }) => `scale(${scale})`};
`

const LiveBalanceContainer = styled.div`
  position: absolute;
  width: 326px;
  height: 184px;
  background: linear-gradient(177.23deg, #000000 -13.49%, #101010 109.75%);
  border-radius: 20px;
`

const DataWell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  position: absolute;
  width: 222px;
  height: 80px;
  left: 32px;
  top: 22px;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

const LiveBalanceLabel = styled.div`
  width: 190px;
  height: 16px;
  left: 32px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: rgba(255, 255, 255, 0.7);
  flex: none;
  order: 0;
  flex-grow: 0;
`

const ValueText = styled.div`
  width: 222px;
  height: 44px;
  top: 20px;
  left: 32px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 44px;
  letter-spacing: -0.025em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(255, 255, 255, 0.95);
  flex: none;
  order: 1;
  flex-grow: 0;
  animation: ${fadeIn} 0.3s ease-in-out;
`
const Detecting = styled.div`
  width: 222px;
  height: 44px;
  top: 20px;
  left: 32px;
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 44px;
  letter-spacing: -0.025em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(255, 255, 255, 0.95);
  flex: none;
  order: 1;
  flex-grow: 0;
  text-shadow: 0 0 40px #ffffff78;
  animation: ${fadeInOut} 1.5s ease-in-out infinite;
`

const SublabelText = styled.div`
  width: 250px;
  height: 16px;
  top: 64px;
  left: 32px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.7);
  flex: none;
  order: 1;
  flex-grow: 0;
`

const TransferBttn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 6px;
  gap: 4px;
  position: absolute;
  width: 80px;
  height: 32px;
  left: 32px;
  top: 136px;
  background: #1a1a1a;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    svg path {
      fill: rgba(0, 0, 0, 0.5);
    }
  }
`

const RewardsBttn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 10px;
  gap: 8px;
  position: absolute;
  width: 138px;
  height: 32px;
  left: 135px;
  top: 136px;
  background: #1a1a1a;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    svg path {
      fill: rgba(0, 0, 0, 0.5);
    }
  }
`

const TransferText = styled.div`
  width: 57px;
  height: 20px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: #f2f2f2;
  flex: none;
  order: 1;
  flex-grow: 0;

  ${TransferBttn}:hover & {
    color: #000000;
  }
`

const RewardsText = styled.div`
  width: 114px;
  height: 20px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: #cccccc;
  flex: none;
  order: 1;
  flex-grow: 0;

  ${RewardsBttn}:hover & {
    color: #000000;
  }
`
