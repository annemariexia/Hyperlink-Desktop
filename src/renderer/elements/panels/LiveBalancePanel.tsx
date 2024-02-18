import React, { Dispatch, FC, ReactElement, SetStateAction, useEffect, useRef, useState } from "react"
import { ipcRenderer } from "electron"
import { Command, isProduction, Message, SysInfo, ProcessStatus, ApiCommand, ApiMessage } from "../../elements/system/System"
import styled, { keyframes } from "styled-components"
import { UserDetails, ProfileManager, DeviceDetails, Role } from "../system/ProfileManager"

type Props = {
  profile?: UserDetails
  devices?: DeviceDetails[]
  isProcessRunning?: boolean
  showInCenter?: boolean
  scale?: number
  openTransferScreen?: Dispatch<SetStateAction<string>>
  openTransferModel?: () => void
  isEnableAllButtons?: boolean
  openSignupLoginModal?: () => void
}

const TOP = 90
const LEFT = 48
const SCALE = 1.35
const INCREASE_EVERY_MS = 10
const CPU_ESTIMATE_EARNING_YRLY = 586
const GPU_ESTIMATE_EARNING_YRLY = 3650

let intervalIncreaseEarnings

export const LiveBalancePanel: FC<Props> = ({ profile, devices, isProcessRunning, openTransferScreen, isEnableAllButtons, openSignupLoginModal }): ReactElement => {
  const earningsExpectedUsdRef = useRef<number>(0)
  const [earningsExpectedUsd, setEarningsExpectedUsd] = useState<number>(0)
  const [startDateMs] = useState<number>(new Date().getTime())
  const [countTime, setCountTime] = useState(0)

  // get cpu and gpu details from the device list
  const runningDevices = devices.filter((device) => device.isCpuRunning)
  const deviceDetailsList = runningDevices.map((device) => device.details)
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
  const estimatedEarningsYrly = cores * CPU_ESTIMATE_EARNING_YRLY + ramSize * GPU_ESTIMATE_EARNING_YRLY
  const estimatedEarningsPerMs = estimatedEarningsYrly / (365 * 60 * 60 * 24 * 1000)

  // calculate live earnings
  const increaseEarnings = async () => {
    const nowMs = new Date().getTime()
    const offlineTime = await ProfileManager.getOfflineTime()
    const isOnline = offlineTime == null
    earningsExpectedUsdRef.current = (nowMs - startDateMs) * estimatedEarningsPerMs
    setEarningsExpectedUsd(isOnline ? earningsExpectedUsdRef.current : 0)
  }

  useEffect(() => {
    if (estimatedEarningsPerMs === 0) return

    if (isProcessRunning) intervalIncreaseEarnings = setInterval(increaseEarnings, INCREASE_EVERY_MS)
    else clearInterval(intervalIncreaseEarnings)

    return () => {
      clearInterval(intervalIncreaseEarnings)
    }
  }, [isProcessRunning, estimatedEarningsPerMs])

  // Update the earnings ticker when the profile changes
  useEffect(() => {
    if (profile) {
      earningsExpectedUsdRef.current = profile.earningsExpectedUsd
    } else {
      earningsExpectedUsdRef.current = 0
    }
  }, [profile])

  // update the earnings amount based on the view selected
  const currTextMoney = (profile?.earningsUsd ?? 0) + earningsExpectedUsd

  const getBalanceData = (amount) => {
    const realBalance = (amount / 100).toString()
    const digitNumber = realBalance.split(".")[0].length
    let displayBalance = ""

    if (digitNumber <= 5) {
      displayBalance = (amount / 100).toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 })

      return {
        integerNumber: displayBalance.split(".")[0],
        pointNumber: displayBalance.split(".")[1],
        integerNumberSize: 40,
        pointNumberSize: 40 - 4 * (digitNumber - 1),
        pointNumberLetterSpacing: -2.4 + 0.24 * (digitNumber - 1)
      }
    } else if (digitNumber > 5) {
      displayBalance = (amount / 100).toLocaleString("en-US", { minimumFractionDigits: 8 - 2 * (digitNumber - 5), maximumFractionDigits: 8 - 2 * (digitNumber - 5) })

      return {
        integerNumber: displayBalance.split(".")[0],
        pointNumber: displayBalance.split(".")[1],
        pointNumberSize: 20,
        pointNumberLetterSpacing: -1.2
      }
    }
  }

  const curBalanceData = getBalanceData(currTextMoney)

  useEffect(() => {
    // setCountTime(countTime + 10)
    // if (profile && profile.role != Role.Guest && countTime % 5000 == 0) {
    //   ipcRenderer.send(ApiCommand.SaveLiveBalance, { balance: currTextMoney, userId: profile.id })
    // }
  }, [currTextMoney])

  return (
    <>
      <Positioner top={TOP} left={LEFT} scale={SCALE}>
        <LiveBalanceContainer>
          <DataWell>
            <LiveBalanceLabel>Live Balance</LiveBalanceLabel>
            <BalanceTextContainer>
              <Currency style={{ marginRight: 6 }}>$</Currency>
              <BigNumber>{curBalanceData.integerNumber}.</BigNumber>
              <SmallNumber size={curBalanceData.pointNumberSize} letterSpacing = {curBalanceData.pointNumberLetterSpacing} style={{ marginRight: 6 }}>
                {curBalanceData.pointNumber}
              </SmallNumber>
            </BalanceTextContainer>
            <SublabelText>Estimate to date</SublabelText>
          </DataWell>
          <ActionWell>
            <TransferBttn
              onClick={() => {
                if (!isEnableAllButtons) return
                if (!profile || (profile && profile.role === Role.Guest)) { 
                  openSignupLoginModal()
                  return
                }
                openTransferScreen("transfer")
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4.31395 14.805C4.23259 14.7236 4.23259 14.5917 4.31395 14.5104L12.9916 5.83268H7.7083C7.59324 5.83268 7.49997 5.73941 7.49997 5.62435V4.37435C7.49997 4.25929 7.59324 4.16602 7.7083 4.16602H15.4166C15.6468 4.16602 15.8333 4.35256 15.8333 4.58268V12.291C15.8333 12.4061 15.74 12.4993 15.625 12.4993H14.375C14.2599 12.4993 14.1666 12.4061 14.1666 12.291V7.00768L5.48895 15.6854C5.40759 15.7667 5.27568 15.7667 5.19432 15.6854L4.31395 14.805Z"
                  fill="#F2F2F2"
                />
              </svg>
              <TransferText>Transfer</TransferText>
            </TransferBttn>
            <RewardsBttn
              onClick={() => {
                if (!isEnableAllButtons) return
                openTransferScreen("reward")
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 16" fill="none">
                <path
                  d="M10.1676 4.576C10.5836 4.34358 10.9777 4.06232 11.3145 3.72547C12.2611 2.77895 12.3705 1.35411 11.5587 0.544C11.1933 0.178526 10.7048 0 10.1912 0C9.56295 0 8.89768 0.267789 8.37558 0.788211C7.59916 1.56463 7.12926 2.63747 6.84295 3.58232C6.55663 2.63579 6.08505 1.56295 5.31032 0.788211C4.7899 0.267789 4.12463 0 3.49474 0C2.98105 0 2.49263 0.178526 2.12716 0.544C1.31537 1.35579 1.42484 2.77895 2.37137 3.72547C2.70821 4.06232 3.104 4.34358 3.51832 4.576H0V8.73095H0.554105V16H13.1352V8.73095H13.6893V4.576H10.1676ZM3.2 2.90021C2.94232 2.64253 2.78232 2.31411 2.75705 1.99411C2.74526 1.84589 2.75705 1.568 2.95579 1.36926C3.12253 1.20253 3.34147 1.16884 3.49642 1.16884C3.84168 1.16884 4.20211 1.33221 4.48505 1.61516C5.03411 2.16421 5.48716 3.04 5.79368 4.14484C5.80211 4.17516 5.81053 4.20379 5.81726 4.23411C5.78695 4.22568 5.75832 4.21895 5.728 4.21053C4.62316 3.904 3.74905 3.45095 3.19832 2.90189H3.2V2.90021ZM6.23158 14.9608H1.59326V8.72926H6.23158V14.9608ZM6.23158 7.69179H1.03916V5.61516H6.23158V7.69179ZM7.89558 4.14316C8.20211 3.03832 8.65516 2.16253 9.20421 1.61347C9.48716 1.33053 9.84758 1.16716 10.1928 1.16716C10.3478 1.16716 10.5684 1.20253 10.7335 1.36758C10.9322 1.56632 10.9423 1.84421 10.9305 1.99242C10.9053 2.31074 10.7453 2.64084 10.4876 2.89853C9.93853 3.44758 9.06274 3.90063 7.9579 4.20716C7.92758 4.21558 7.89895 4.224 7.86863 4.23074C7.87705 4.20211 7.88379 4.17179 7.89221 4.14147H7.89558V4.14316ZM12.0977 14.9625H7.45937V8.73095H12.0977V14.9625ZM12.6518 7.69347H7.45937V5.61684H12.6518V7.69347Z"
                  fill="white"
                />
              </svg>
              <RewardsText>Rewards</RewardsText>
            </RewardsBttn>
            <CardBttn
              onClick={() => {
                if (!isEnableAllButtons) return
                openTransferScreen("card")
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.3333 2.5H1.66665C1.20639 2.5 0.833313 2.87313 0.833313 3.33333V16.6667C0.833313 17.1269 1.20639 17.5 1.66665 17.5H18.3333C18.7936 17.5 19.1666 17.1269 19.1666 16.6667V3.33333C19.1666 2.87313 18.7936 2.5 18.3333 2.5ZM17.5 4.16667H2.49998V15.8333H17.5V4.16667Z"
                  fill="white"
                />
                <rect x="2" y="7" width="16" height="2.4" fill="white" />
              </svg>
              <CardText>Card</CardText>
            </CardBttn>
          </ActionWell>
        </LiveBalanceContainer>
      </Positioner>
    </>
  )
}

const CurrencyText = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: 1.12px;
  text-transform: uppercase;
`

const BalanceTextContainer = styled.div`
  display: flex;
  align-items: baseline;
`

const Positioner = styled.div<{ top: number; left: number; scale: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`

const LiveBalanceContainer = styled.div`
  display: flex;
  width: 380px;
  height: 240px;
  box-sizing: border-box;
  padding: 28px 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.56) 0%, rgba(13, 13, 13, 0.56) 100%);

  /* hyperblur */
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);

  &:hover {
    border-radius: 24px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.78) 0%, rgba(13, 13, 13, 0.78) 100%);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
  }
`

const DataWell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  margin-bottom: 64px;
`
const ActionWell = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  bottom: 28px;
`

const LiveBalanceLabel = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  letter-spacing: 1.12px;
  text-transform: uppercase;
`

const Currency = styled.span`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: -1.26px;
`

const BigNumber = styled.span`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -2.4px;
`

const SmallNumber = styled.span<{ size: number, letterSpacing: number}>`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: ${({ size }) => size}px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: ${({ letterSpacing }) => letterSpacing}px
`

const SublabelText = styled.div`
  color: var(--coldgrey-300, #a9aebc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.24px;
`

const TransferBttn = styled.div`
  display: flex;
  padding: 8px 10px 8px 6px;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 2px solid var(--basegrey-100, #e6e6e6);
  color: var(--basegrey-50, #f2f2f2);
  cursor: pointer;
  &:hover {
    background: var(--primary-500, #00efc3);
    border: 2px solid var(--basegrey-100, #00efc3);
    svg path {
      fill: var(--basegrey-950, #0d0d0d);
    }
    div {
      color: var(--basegrey-950, #0d0d0d);
    }
  }
`
const TransferText = styled.div`
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`
const RewardsBttn = styled.div`
  display: flex;
  height: 32px;
  padding: 4px 12px 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    border-radius: 4px;
    background: var(--basegrey-50, #f2f2f2);
    svg path {
      fill: var(--basegrey-950, #0d0d0d);
    }
    svg rect {
      fill: var(--basegrey-950, #0d0d0d);
    }
    div {
      color: var(--basegrey-950, #0d0d0d);
    }
  }
`
const RewardsText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const CardBttn = styled.div`
  display: flex;
  height: 32px;
  padding: 4px 12px 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;

  &:hover {
    border-radius: 4px;
    background: var(--basegrey-50, #f2f2f2);
    svg path {
      fill: var(--basegrey-950, #0d0d0d);
    }
    svg rect {
      fill: var(--basegrey-950, #0d0d0d);
    }
    div {
      color: var(--basegrey-950, #0d0d0d);
    }
  }
  cursor: pointer;
`
const CardText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`
