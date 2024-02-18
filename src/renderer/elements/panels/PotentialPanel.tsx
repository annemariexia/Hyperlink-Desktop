import React, { FC, ReactElement, useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { TabBtn } from "../TabBtn"
import { DeviceDetails } from "../system/ProfileManager"
import { CPU_POTENTIAL_EARNING_YRLY, GPU_POTENTIAL_EARNING_YRLY, CPU_ESTIMATE_EARNING_YRLY, GPU_ESTIMATE_EARNING_YRLY, MONTHS_IN_YEAR, LIFETIME_YEAR } from "../../common/Constants"
import BarGraphIcon from "./../../../../images/BarGraph.png"
import Cardtwo from "../../elements/TutorialCards/Cardtwo"

enum View {
  Yearly,
  Monthly,
  Lifetime
}

type Props = {
  onStateChange?: (newValue: any) => void
  myState?: boolean
  devices: DeviceDetails[]
  setIsEnableAllButtons: (enable: boolean) => void
}

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const PotentialPanel: React.FC<Props> = ({ onStateChange, myState, devices, setIsEnableAllButtons }): ReactElement => {
  const [view, setView] = useState<View>(View.Yearly)
  const [isYearlyView, setIsYearlyView] = useState(true)
  const [isMonthlyView, setIsMonthlyView] = useState(false)
  const [isLifetimeView, setIsLifetimeView] = useState(false)

  const [currTextMoney, setCurrTextMoney] = useState<number>(0)
  const [yearlyEstimate, setYearlyEstimate] = useState<number>(0)
  const [yearlyPotential, setYearlyPotential] = useState<number>(0)
  const [monthlyEstimate, setMonthlyEstimate] = useState<number>(0)
  const [lifetimeEstimate, setLifetimeEstimate] = useState<number>(0)
  const [detecting, setDetecting] = useState(true)
  const [periodText, setPeriodText] = useState("/yr")
  const [isInfoCardShown, setIsInfoCardShown] = useState(false)

  let timer = null

  useEffect(() => {
    if (myState === false) {
      setIsInfoCardShown(false)
    }
  }, [myState])

  const InfoButton: React.FC = () => {
    //handleClick to show the info card
    //given the props from BoostEarnings,so that when BoostEarning Info shown, Potential Info would not shown,vice versa.
    const handleClick = () => {
      setIsInfoCardShown(true)
      onStateChange(true)
    }

    //set the delay for info card for 10s
    useEffect(() => {
      timer = setTimeout(() => {
        setIsInfoCardShown(false)
        onStateChange(false)
      }, 10000)
      return () => clearTimeout(timer)
    }, [isInfoCardShown])

    return (
      <Info onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", top: 24, right: 16 }}>
          <path d="M8 12.1C8.3797 12.1 8.6875 11.7922 8.6875 11.4125L8.6875 7.8C8.6875 7.42031 8.3797 7.1 8 7.1C7.6203 7.1 7.3125 7.42031 7.3125 7.8L7.3125 11.4125C7.3125 11.7922 7.6203 12.1 8 12.1Z" fill="#8D93A5" />
          <path d="M8 5.9C8.54124 5.9 8.98 5.44124 8.98 4.9C8.98 4.35876 8.54124 3.9 8 3.9C7.45876 3.9 7.02 4.35876 7.02 4.9C7.02 5.44124 7.45876 5.9 8 5.9Z" fill="#8D93A5" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 3.13124e-07 8 6.99382e-07C3.58172 1.08564e-06 -1.08564e-06 3.58172 -6.99382e-07 8C-3.13124e-07 12.4183 3.58172 16 8 16ZM14.625 8C14.625 11.6589 11.6589 14.625 8 14.625C4.34111 14.625 1.375 11.6589 1.375 8C1.375 4.34111 4.34111 1.375 8 1.375C11.6589 1.375 14.625 4.34111 14.625 8Z"
            fill="#8D93A5"
          />
        </svg>
        {isInfoCardShown && <Cardtwo />}
      </Info>
    )
  }

  useEffect(() => {
    // Fetch device details, and calcualte earnings potential
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

    const potentialEarningsYrly = cores * CPU_POTENTIAL_EARNING_YRLY + ramSize * GPU_POTENTIAL_EARNING_YRLY
    const estimatedEarningsYrly = cores * CPU_ESTIMATE_EARNING_YRLY + ramSize * GPU_ESTIMATE_EARNING_YRLY
    const lifeEarnings = potentialEarningsYrly * LIFETIME_YEAR

    const updatedDevices = (device: DeviceDetails) => {
      device.lifetimeEarningsCents = lifeEarnings
    }

    for (const device of devices) {
      updatedDevices(device)
    }

    // Set the initial value of currTextMoney
    if (view == View.Lifetime) {
      setCurrTextMoney(lifeEarnings)
    } else if (view == View.Yearly) {
      setCurrTextMoney(potentialEarningsYrly)
    } else if (view == View.Monthly) {
      setCurrTextMoney(potentialEarningsYrly / MONTHS_IN_YEAR)
    }
    setYearlyPotential(potentialEarningsYrly)
    setYearlyEstimate(estimatedEarningsYrly)
    setLifetimeEstimate(lifeEarnings)
  }, [devices]) // Run the effect when devices change

  useEffect(() => {
    setTimeout(() => {
      setDetecting(false)
      setIsEnableAllButtons(true)
    }, 4500)
  }, [])

  const selectYearlyView = () => {
    setView(View.Yearly)
    setIsYearlyView(true)
    setIsMonthlyView(false)
    setIsLifetimeView(false)
    setCurrTextMoney(yearlyPotential)
    setPeriodText("/yr")
  }

  const selectMonthlyView = () => {
    setView(View.Monthly)
    setIsMonthlyView(true)
    setIsYearlyView(false)
    setIsLifetimeView(false)
    setCurrTextMoney(yearlyPotential / MONTHS_IN_YEAR)
    setPeriodText("/mo")
  }

  const selectLifetimeView = () => {
    setView(View.Lifetime)
    setIsLifetimeView(true)
    setIsYearlyView(false)
    setIsMonthlyView(false)
    setCurrTextMoney(lifetimeEstimate)
    setPeriodText("/6yrs")
  }

  useEffect(() => {
    selectYearlyView()
    setIsYearlyView(true)
    setCurrTextMoney(yearlyPotential)
  }, [])

  return (
    <>
      <PotentialPanelContainer>
        <PotentialHeader>
        <IconContainer>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.14323 15.8405V21.2694H3V15.8405H6.14323ZM12.4297 9.36914V21.2694H9.28646V9.36914H12.4297ZM18.7161 12.0633V21.2694H15.5729V12.0633H18.7161Z" fill="#C6C9D2"/>
          <path d="M25.0007 21.2683V6.67383H21.8574V21.2683H25.0007Z" fill="white"/>
        </svg>
        </IconContainer>
          <PotentialEarningsText>Potential Earnings</PotentialEarningsText>
          <InfoButton />
        </PotentialHeader>
        {detecting ? (
          <Detecting>Detecting...</Detecting>
        ) : (
          <PotentialValeContainer>
              <PotentialEarningsNum>
                <a style={{ fontSize: "28px", fontWeight: 400 }}>$</a>
                {currTextMoney.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </PotentialEarningsNum>
            <PeriodText>{periodText}</PeriodText>
          </PotentialValeContainer>
        )}
        <Tab>
          <TabBtn BtnLeft={4} BtnWidth={82} BttnLabel="Per Year" LabelLeft={0} TextWidth={0} isActive={isYearlyView} onClick={!detecting ? selectYearlyView : () => { }}></TabBtn>
          <TabBtn BtnLeft={90} BtnWidth={82} BttnLabel="Per Month" LabelLeft={0} TextWidth={0} isActive={isMonthlyView} onClick={!detecting ? selectMonthlyView : () => { }}></TabBtn>
          <TabBtn BtnLeft={176} BtnWidth={82} BttnLabel="Lifetime" LabelLeft={0} TextWidth={0} isActive={isLifetimeView} onClick={!detecting ? selectLifetimeView : () => { }}></TabBtn>
        </Tab>
      </PotentialPanelContainer>
      {isInfoCardShown && <BlurBackGround />}
    </>
  )
}

const PotentialHeader = styled.div`
  display: flex;
  width: 252px;
  justify-content: space-between;
  align-items: center;
`

const PeriodText = styled.div`
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.16px;
  margin-left: 4px;
`

const PotentialValeContainer = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 16px;
  top: 72px;
`

const Img = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background: rgba(51, 51, 51, 0.6);
  border: 0px;
`

const PotentialPanelContainer = styled.div`
  position: absolute;
  left: 48px;
  top: 595px;
  width: 252px;
  height: 141px;
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  /* hyperblur */
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const PotentialEarningsText = styled.div`
  width: 140px;
  height: 20px;
  top: 22px;
  left: 56px;
  position: absolute;
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
`

const PotentialEarningsNum = styled.div`
  height: 40px;
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
  letter-spacing: -1.92px;
  animation: ${fadeIn} 0.3s ease-in-out;
`

const Detecting = styled.div`
  position: absolute;
  height: 40px;
  left: 16px;
  top: 72px;
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 114.286% */
  letter-spacing: -1.92px;
  animation: ${fadeInOut} 1.5s ease-in-out infinite;;
`

const Tab = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  width: 248px;
  height: 24px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  background: rgba(51, 51, 51, 0.25);
`
const Info = styled.div`
  &:hover {
    cursor: pointer;
    svg path {
      fill: var(--coldgrey-50);
    }
  }
`

const BlurBackGround = styled.div`
  position: absolute;
  left: 48px;
  top: 425px;
  width: 286px;
  height: 162px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(25px);
  z-index: -1;
  box-sizing: border-box;
`
const IconContainer = styled.div`
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(44, 48, 58, 0.50);
`