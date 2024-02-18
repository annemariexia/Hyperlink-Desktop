import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { BtnLeaf } from "../BtnLeaf"
import { Icon } from "../Icon"
import { Panel } from "../Panel"
import { UserDetails, ProfileManager, DeviceDetails } from "../system/ProfileManager"
import { TextMoney } from "../TextMoney"
import imgEarn from "./../../../../images/icons/earn-w.svg"

import { keyframes } from 'styled-components';
import { ipcRenderer } from "electron"
import { Message } from "../system/System"
import { ApiCommand } from "../system/System"

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;


enum View {
  Yearly,
  Monthly,
  RealTime,
  Detecting
}

type Props = {
  profile: UserDetails
  devices: DeviceDetails[]
  isProcessRunning: boolean
  showInCenter?: boolean
  scale: number
}

const WIDTH = 282
const HEIGHT = 138
const INCREASE_EVERY_MS = 10
const MONTHS_IN_YEAR = 12
const MARGIN_LEFT_IN_ZOOM = 155
const MARGIN_PX_MAX_SCALE = 160 + MARGIN_LEFT_IN_ZOOM
const SHOW_BG_DELAY_MS = 10
const HIDE_BG_DELAY_MS = 500
const SPACE_BTWN_ICON_AND_TEXT = 11

const doNothing = () => { }

// Used for phase 2 yearly and monthly 'earnings potential' calculations
const CPU_POTENTIAL_EARNING_YRLY = 108624
const GPU_POTENTIAL_EARNING_YRLY = 43800

// Used for live earnings ticker calculations 
const CPU_ESTIMATE_EARNING_YRLY = 586
const GPU_ESTIMATE_EARNING_YRLY = 3650

let intervalIncreaseEarnings
let showBgTimeout
let hideBgTimeout

export const EstimatedEarningsPanel: FC<Props> = ({ profile, devices, isProcessRunning, showInCenter, scale }): ReactElement => {
  const [view, setView] = useState<View>(View.Yearly)
  const [showBg, setShowBg] = useState<boolean>(false)
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0)
  const earningsExpectedUsdRef = useRef<number>(0)
  const backgroundOpacityRef = useRef<number>(1)
  const [earningsExpectedUsd, setEarningsExpectedUsd] = useState<number>(0)
  const [startDateMs] = useState<number>(new Date().getTime())
  const [isOnline, setOnline] = useState(true)
  const positionerRef = useRef<HTMLDivElement>(null)

  const isYearlyView = view === View.Yearly
  const isMonthlyView = view === View.Monthly
  const isRealTimeView = view === View.RealTime

  const selectYearlyView = () => setView(View.Yearly)
  const selectMonthlyView = () => setView(View.Monthly)
  const selectRealTimeView = () => setView(View.RealTime)
  const [detecting, setDetecting] = useState(true);

  // get cpu and gpu details from the device list 
  const deviceDetailsList = devices.map(device => device.details)
  let cores = 0
  let ramSize = 0
  for (const deviceDetails of deviceDetailsList) {
    const singleMatch = deviceDetails.match(/single core/)
    const coresMatch = deviceDetails.match(/(\d+) cores/)
    if (singleMatch) {
      cores = 1 + cores
    } else if (coresMatch) {
      cores = cores + parseInt(coresMatch[1]);
    }
    const ramMatch = deviceDetails.match(/GPUVram: (\d+)/)
    if (ramMatch) {
      ramSize = ramSize + parseInt(ramMatch[1])
    }
  }

  // calculate potential and estimated earnings
  const potentialEarningsYrly = cores * CPU_POTENTIAL_EARNING_YRLY + ramSize * GPU_POTENTIAL_EARNING_YRLY
  const estimatedEarningsYrly = cores * CPU_ESTIMATE_EARNING_YRLY + ramSize * GPU_ESTIMATE_EARNING_YRLY
  const estimatedEarningsPerMs = estimatedEarningsYrly/(365*60*60*24*1000)

  // Send potential earnings to the backend
  ipcRenderer.send(ApiCommand.UpdatePotentialEarnings, {earnings: potentialEarningsYrly})

  // calculate live earnings
  const increaseEarnings = async () => {
    const nowMs = new Date().getTime()    
    earningsExpectedUsdRef.current = (nowMs - startDateMs) * estimatedEarningsPerMs
    setEarningsExpectedUsd(isOnline? earningsExpectedUsdRef.current : 0)
  }

  useEffect(() => {
    clearTimeout(showBgTimeout)
    clearTimeout(hideBgTimeout)

    if (showInCenter) {
      setBackgroundOpacity(0)
      setShowBg(true)
      showBgTimeout = setTimeout(() => {
        setBackgroundOpacity(1)
      }, SHOW_BG_DELAY_MS)
    } else {
      setBackgroundOpacity(0)
      hideBgTimeout = setTimeout(() => {
        setShowBg(false)
      }, HIDE_BG_DELAY_MS)
    }
    // setShowBg
    backgroundOpacityRef.current = showInCenter ? 1 : 0
  }, [showInCenter])

  useEffect(() => {
    setTimeout(() => {
      setDetecting(false);
    }, 4500); // Adjust this delay as needed, this simulates the time it takes to detect
  }, []);

  useEffect(() => {
    selectYearlyView()
    setTimeout(() => {
      selectRealTimeView()
    }, 4000)
  }, [detecting])


  // Maniuplate the earnings ticker based on the process state
  useEffect(() => {
    // continue if estimatedEarningsPerMs is 0
    if (estimatedEarningsPerMs === 0) return
    // if the process is running, start the interval
    if (isProcessRunning) {
      selectRealTimeView()
      intervalIncreaseEarnings = setInterval(increaseEarnings, INCREASE_EVERY_MS)
    } else {    // else stop the interval and show yearly potential earnings
      selectYearlyView()
      clearInterval(intervalIncreaseEarnings)
      intervalIncreaseEarnings = null
    }

    ipcRenderer.on(Message.NetworkConnectionInfo, (event, result) => {
      // setPercentage(result.availability>1 ? 100 : result.availability * 100)
      setOnline(result.isOnline)
    })

    return (() => { 
      if (intervalIncreaseEarnings) {
        clearInterval(intervalIncreaseEarnings)
      }
    })
  }, [isProcessRunning, estimatedEarningsPerMs])

  // Update the earnings ticker when the profile changes
  useEffect(() => {
    if (!!profile) {
      selectRealTimeView()
      earningsExpectedUsdRef.current = profile.earningsExpectedUsd
    } else {
      earningsExpectedUsdRef.current = 0
    }
  }, [profile])

  // update the earnings amount based on the view selected
  let currTextMoney = potentialEarningsYrly
  if (isMonthlyView) {
    currTextMoney = Math.round(potentialEarningsYrly / MONTHS_IN_YEAR)
  } else if (isRealTimeView) {
    currTextMoney = (profile?.earningsUsd ?? 0) + earningsExpectedUsd
  }

  let maxScale = 1
  let topCenter = 0
  let leftCenter = 0

  if (showInCenter) {
    maxScale = (window.innerWidth / scale - MARGIN_PX_MAX_SCALE) / WIDTH
    if (!!positionerRef.current) {
      const positionerRect = positionerRef.current.getBoundingClientRect()
      const MIDDLE = 2
      leftCenter = MARGIN_LEFT_IN_ZOOM / MIDDLE + Math.round(window.innerWidth / scale / MIDDLE - positionerRect.left - WIDTH / MIDDLE)
      topCenter = Math.round(window.innerHeight / scale / MIDDLE - positionerRect.top - HEIGHT / MIDDLE)
    }
  }

  const fractionalDigits = isRealTimeView ? 8 : 2
  const earningsType = isRealTimeView ? "estimate" : "potential"
  return (
    <>
      {showBg && <Background opacity={backgroundOpacity} />}
      <Positioner width={WIDTH} height={HEIGHT} ref={positionerRef}>
        <AnimationPositioner bigger={showInCenter} maxScale={maxScale} top={topCenter} left={leftCenter}>
          <Panel width={WIDTH + "px"} height={HEIGHT + "px"} borderRadius="8px">
            <PanelSections>
              <PanelContentTop lower={showInCenter}>
                {/* <Icon iconUrl={imgEarn} height={20} padding="0" margin="auto 10px auto 42px" /> */}
                <Icon iconUrl={imgEarn} height={20}/>
                <Title>
                  Potential 
                </Title>

                {/* <TextMoney amountUsd={currTextMoney} sizePx={60} fractionDigits={fractionalDigits}/> */}

                {detecting ? (
                  <Detecting>Detecting...</Detecting>
                ) : (
                  <TextMoney amountUsd={currTextMoney} sizePx={60} fractionDigits={fractionalDigits}/>
                )}

              </PanelContentTop>
              <TabButtons show={!showInCenter}>
                <BtnLeaf selected={isYearlyView} zIndex={1} onClick={showInCenter ? doNothing : selectYearlyView} isInBetween={isMonthlyView}>
                  Yearly
                </BtnLeaf>
                <BtnLeaf selected={isMonthlyView} zIndex={2} onClick={showInCenter ? doNothing : selectMonthlyView} isInBetween={!isMonthlyView}>
                  Monthly
                </BtnLeaf>
                <BtnLeaf selected={isRealTimeView} zIndex={3} onClick={showInCenter ? doNothing : selectRealTimeView} isInBetween={isMonthlyView} isInCorner>
                  Live
                </BtnLeaf>
              </TabButtons>
            </PanelSections>
          </Panel>
        </AnimationPositioner>
      </Positioner>
    </>
  )
}

const Background = styled.div<{ opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000040;
  backdrop-filter: blur(10px);
  z-index: 10;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 500ms ease-in;
`

const Positioner = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 50px;
`

const AnimationPositioner = styled.div<{ bigger: boolean; maxScale: number; top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 11;
  scale: ${({ bigger, maxScale }) => (bigger ? maxScale : "1")};
  transition: all 500ms ease-in;
`

const Title = styled.div`

font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 20px;
margin: 5px;
/* identical to box height, or 125% */

letter-spacing: 0.01em;
font-feature-settings: 'tnum' on, 'lnum' on, 'liga' off;

color: #FFFFFF;
  // font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  // font-size: 20px;
  // color: white;
  transition: all 500ms ease-in;
`

const Subtitle = styled.span`
  opacity: 0.5;
`

const TabButtons = styled.div<{ show: boolean }>`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

position: absolute;
width: 255px;
height: 32px;
left: 13px;
top: 96px;

background: rgba(77, 77, 77, 0.25);
border-radius: 8px;

  // opacity: ${({ show }) => (show ? "1" : "0")};
  // transition: all 500ms ease-in;

  // button {
  //   ${({ show }) => !show && "cursor: default;"};
  // }
`

const PanelSections = styled.div`
  flex: 1 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position:relative;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 8px;
  transition: all 500ms ease-in;
`

const PanelContentTop = styled.div<{ lower: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
  // flex: 1 0;
  // width: 100%;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
`
const Detecting = styled.div`
  font-size: 60px;
  color: white;
  text-shadow: 0 0 40px #ffffff78;
  animation: ${fadeInOut} 1.5s ease-in-out infinite;
`;
