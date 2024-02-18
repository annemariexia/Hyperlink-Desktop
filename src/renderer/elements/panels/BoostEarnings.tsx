/** Function name: BoostEarningsPanel 

0- Yes / No — do we need this code?
Yes, we need this code as it defines a React component that represents the Boost Earnings panel in a UI.

1- Why? — Why do we need this code?
We need this code to display the Boost Earnings panel in the UI, which allows users to perform various actions related to boosting their earnings.

2- How? — How does this code work?
The BoostEarningsPanel component is a functional component written in React.
It receives two props: "onSelectButton" and "isEnableAllButtons."
When rendering, the component displays a BoostEarningsContainer with an image (ChartArrowUpIcon) and the text "Boost Earnings."
The panel contains four clickable buttons imported from "BtnBoostEarnings.tsx," with corresponding labels and SVG icons.
Clicking on these buttons triggers the "onSelectButton" callback, depending on the "isEnableAllButtons" prop.

3- What? — What are the important key variables?
"Props" interface defines the type for the component props, including "onSelectButton" and "isEnableAllButtons."

4- Who? — Who does this code serve?
This code serves users of the application who need to interact with the Boost Earnings panel.

5- Where? — Where does this code connect to?
This code is likely part of a larger React application and may be used within different components or pages.

6- When? — When does this code get used?
This code gets used whenever the Boost Earnings panel needs to be displayed on the user interface, and the actions associated with the buttons are needed to be executed.
*/

import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import ChartArrowUpIcon from "./../../../../images/ChartArrowUp.png"
import Cardthree from "../../elements/TutorialCards/Cardthree"

type Props = {
  onStateChange?: (newValue: any) => void
  myState?: boolean
  onSelectButton?: (pageType: string) => void
  isEnableAllButtons: boolean
}

export const BoostEarningsPanel: FC<Props> = ({ onStateChange, myState, onSelectButton, isEnableAllButtons }): ReactElement => {
  const [isHover1, setIsHover1] = useState(false)
  const [isHover2, setIsHover2] = useState(false)
  const [isHover3, setIsHover3] = useState(false)
  const [isHover4, setIsHover4] = useState(false)
  const [isCardShown, setIsCardShown] = useState(false)
  let timer = null

  useEffect(() => {
    if (myState === false) {
      setIsCardShown(false)
    }
  }, [myState])

  const InfoButtonForBoost: React.FC = () => {
    
    const handleClick = () => {
      setIsCardShown(true)
      onStateChange(true)
    }

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
        {isCardShown && <Cardthree />}
      </Info>
    )
  }

  return (
    <>
      <BoostEarningsContainer>
        <BoostEarningHeader>
          <IconContainer>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.1674 15.8501L23.6758 7.3418L25.3257 8.99171L15.1674 19.15L10.5007 14.4834L4.32569 20.6584L2.67578 19.0084L10.5007 11.1835L15.1674 15.8501Z" fill="#C6C9D2"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M23.334 9.33333H19.834V7H25.6673V12.8333H23.334V9.33333Z" fill="white"/>
            </svg>
          </IconContainer>
          <BoostEarningsText>Boost Earnings</BoostEarningsText>
          <InfoButtonForBoost />
        </BoostEarningHeader>
        {/* 4 Buttons in the panel import from root button in 'BtnBoostEarnings.tsx'*/}
        <div
          style={{
            display: "inline-flex",
            alignItems: "flex-start",
            gap: "8px"
          }}
        >
          <div
            onClick={() => {
              isEnableAllButtons ? onSelectButton("sharelink") : () => { }
            }}
          >
            <BtnBoostEarning
              onMouseEnter={() => {
                setIsHover1(true)
              }}
              onMouseLeave={() => {
                setIsHover1(false)
              }}
              style={{ position: "absolute", bottom: 16, left: 16 }}
            >
              {!isHover1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M25.3333 12C25.3333 12.7364 25.9303 13.3333 26.6667 13.3333C27.4031 13.3333 28 12.7364 28 12V6.66667C28 5.19391 26.8061 4 25.3333 4H20C19.2636 4 18.6667 4.59696 18.6667 5.33333C18.6667 6.06971 19.2636 6.66667 20 6.66667H23.4477L15.0572 15.0572C14.5365 15.5779 14.5365 16.4221 15.0572 16.9428C15.5779 17.4635 16.4221 17.4635 16.9428 16.9428L25.3333 8.55228V12Z"
                    fill="#E2E4E9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 8C4 5.79087 5.79087 4 8 4H14.6667C15.4031 4 16 4.59696 16 5.33333C16 6.06971 15.4031 6.66667 14.6667 6.66667H8C7.26363 6.66667 6.66667 7.26363 6.66667 8V24C6.66667 24.7364 7.26363 25.3333 8 25.3333H24C24.7364 25.3333 25.3333 24.7364 25.3333 24V17.3333C25.3333 16.5969 25.9303 16 26.6667 16C27.4031 16 28 16.5969 28 17.3333V24C28 26.2092 26.2092 28 24 28H8C5.79087 28 4 26.2092 4 24V8Z"
                    fill="#666666"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M25.3333 12C25.3333 12.7364 25.9303 13.3333 26.6667 13.3333C27.4031 13.3333 28 12.7364 28 12V6.66667C28 5.19391 26.8061 4 25.3333 4H20C19.2636 4 18.6667 4.59696 18.6667 5.33333C18.6667 6.06971 19.2636 6.66667 20 6.66667H23.4477L15.0572 15.0572C14.5365 15.5779 14.5365 16.4221 15.0572 16.9428C15.5779 17.4635 16.4221 17.4635 16.9428 16.9428L25.3333 8.55228V12Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 8C4 5.79087 5.79087 4 8 4H14.6667C15.4031 4 16 4.59696 16 5.33333C16 6.06971 15.4031 6.66667 14.6667 6.66667H8C7.26363 6.66667 6.66667 7.26363 6.66667 8V24C6.66667 24.7364 7.26363 25.3333 8 25.3333H24C24.7364 25.3333 25.3333 24.7364 25.3333 24V17.3333C25.3333 16.5969 25.9303 16 26.6667 16C27.4031 16 28 16.5969 28 17.3333V24C28 26.2092 26.2092 28 24 28H8C5.79087 28 4 26.2092 4 24V8Z"
                    fill="#B3B3B3"
                  />
                </svg>
              )}
              <BtnBoostEarningLabel>Share link</BtnBoostEarningLabel>
            </BtnBoostEarning>
          </div>
          <div
            onClick={() => {
              isEnableAllButtons ? onSelectButton("adddevice") : () => { }
            }}
          >
            <BtnBoostEarning
              onMouseEnter={() => {
                setIsHover2(true)
              }}
              onMouseLeave={() => {
                setIsHover2(false)
              }}
              style={{ position: "absolute", bottom: 16, left: 156 }}
            >
              {!isHover2 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6.66667 5.3H25.3333C26.8245 5.3 28.0333 6.50883 28.0333 8V20C28.0333 21.4912 26.8245 22.7 25.3333 22.7H6.66667C5.1755 22.7 3.96667 21.4912 3.96667 20V8C3.96667 6.50883 5.1755 5.3 6.66667 5.3Z"
                    fill="#666666"
                    stroke="#E2E4E9"
                    strokeWidth="2.6"
                  />
                  <rect x="8.61539" y="25.8462" width="14.7692" height="2.46154" rx="1.23077" fill="#E2E4E9" />
                  <rect x="17.2308" y="22.1538" width="6.15385" height="2.46154" rx="1.23077" transform="rotate(90 17.2308 22.1538)" fill="#E2E4E9" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6.66667 5.3H25.3333C26.8245 5.3 28.0333 6.50883 28.0333 8V20C28.0333 21.4912 26.8245 22.7 25.3333 22.7H6.66667C5.1755 22.7 3.96667 21.4912 3.96667 20V8C3.96667 6.50883 5.1755 5.3 6.66667 5.3Z"
                    fill="#B3B3B3"
                    stroke="white"
                    strokeWidth="2.6"
                  />
                  <rect x="8.61539" y="25.8461" width="14.7692" height="2.46154" rx="1.23077" fill="white" />
                  <rect x="17.2308" y="22.1539" width="6.15385" height="2.46154" rx="1.23077" transform="rotate(90 17.2308 22.1539)" fill="white" />
                </svg>
              )}
              <BtnBoostEarningLabel>Add devices</BtnBoostEarningLabel>
            </BtnBoostEarning>
          </div>
          <div
            onClick={() => {
              isEnableAllButtons ? onSelectButton("invitefriend") : () => { }
            }}
          >
            <BtnBoostEarning
              onMouseEnter={() => {
                setIsHover3(true)
              }}
              onMouseLeave={() => {
                setIsHover3(false)
              }}
              style={{ position: "absolute", bottom: 16, left: 296 }}
            >
              {!isHover3 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M18.6667 14.6667C21.6122 14.6667 24 12.2789 24 9.33333C24 6.38781 21.6122 4 18.6667 4C15.7212 4 13.3333 6.38781 13.3333 9.33333C13.3333 12.2789 15.7212 14.6667 18.6667 14.6667Z" fill="#666666" />
                  <path d="M16 17.3333C11.5817 17.3333 8 20.9151 8 25.3333C8 26.8061 9.19391 28 10.6667 28H26.6667C28.1395 28 29.3333 26.8061 29.3333 25.3333V24C29.3333 20.3181 26.3485 17.3333 22.6667 17.3333H16Z" fill="#666666" />
                  <path d="M9.33332 17.3333C5.65143 17.3333 2.66666 20.3181 2.66666 24V25.3333C2.66666 26.8061 3.86056 28 5.33332 28H21.3333C22.8061 28 24 26.8061 24 25.3333V24C24 20.3181 21.0152 17.3333 17.3333 17.3333H9.33332Z" fill="#E2E4E9" />
                  <path d="M13.3333 14.6667C16.2789 14.6667 18.6667 12.2789 18.6667 9.33333C18.6667 6.38781 16.2789 4 13.3333 4C10.3878 4 8 6.38781 8 9.33333C8 12.2789 10.3878 14.6667 13.3333 14.6667Z" fill="#E2E4E9" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M18.6667 14.6667C21.6122 14.6667 24 12.2789 24 9.33333C24 6.38781 21.6122 4 18.6667 4C15.7212 4 13.3333 6.38781 13.3333 9.33333C13.3333 12.2789 15.7212 14.6667 18.6667 14.6667Z" fill="#B3B3B3" />
                  <path d="M16 17.3333C11.5817 17.3333 8 20.915 8 25.3333C8 26.8061 9.19391 28 10.6667 28H26.6667C28.1395 28 29.3333 26.8061 29.3333 25.3333V24C29.3333 20.3181 26.3485 17.3333 22.6667 17.3333H16Z" fill="#B3B3B3" />
                  <path d="M9.33332 17.3333C5.65143 17.3333 2.66666 20.3181 2.66666 24V25.3333C2.66666 26.8061 3.86056 28 5.33332 28H21.3333C22.8061 28 24 26.8061 24 25.3333V24C24 20.3181 21.0152 17.3333 17.3333 17.3333H9.33332Z" fill="white" />
                  <path d="M13.3333 14.6667C16.2789 14.6667 18.6667 12.2789 18.6667 9.33333C18.6667 6.38781 16.2789 4 13.3333 4C10.3878 4 8 6.38781 8 9.33333C8 12.2789 10.3878 14.6667 13.3333 14.6667Z" fill="white" />
                </svg>
              )}
              <BtnBoostEarningLabel>Invite friends</BtnBoostEarningLabel>
            </BtnBoostEarning>
          </div>
          <div
            onClick={() => {
              isEnableAllButtons ? onSelectButton("keepuptime") : () => { }
            }}
          >
            <BtnBoostEarning
              onMouseEnter={() => {
                setIsHover4(true)
              }}
              onMouseLeave={() => {
                setIsHover4(false)
              }}
              style={{ position: "absolute", bottom: 16, left: 436 }}
            >
              {!isHover4 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 26.8562C20 27.5983 20.9624 27.8897 21.374 27.2723L29.8893 14.4993C30.2216 14.0009 29.8643 13.3333 29.2653 13.3333H22.6667V5.14374C22.6667 4.40169 21.7042 4.11029 21.2926 4.72771L12.7774 17.5006C12.4451 17.999 12.8024 18.6667 13.4014 18.6667H20V26.8562Z"
                    fill="#E2E4E9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.00001 8.16666C4.00001 7.33823 4.67158 6.66666 5.50001 6.66666H13.1667C13.9951 6.66666 14.6667 7.33823 14.6667 8.16666V9.16666C14.6667 9.99508 13.9951 10.6667 13.1667 10.6667H5.50001C4.67158 10.6667 4.00001 9.99508 4.00001 9.16666V8.16666ZM4.00001 24.1667C4.00001 23.3382 4.67158 22.6667 5.50001 22.6667H13.1667C13.9951 22.6667 14.6667 23.3382 14.6667 24.1667V25.1667C14.6667 25.9951 13.9951 26.6667 13.1667 26.6667H5.50001C4.67158 26.6667 4.00001 25.9951 4.00001 25.1667V24.1667ZM2.83334 14.6667C2.00492 14.6667 1.33334 15.3382 1.33334 16.1667V17.1667C1.33334 17.9951 2.00492 18.6667 2.83334 18.6667H9.16668C9.9951 18.6667 10.6667 17.9951 10.6667 17.1667V16.1667C10.6667 15.3382 9.99511 14.6667 9.16668 14.6667H2.83334Z"
                    fill="#666666"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 26.8563C20 27.5983 20.9624 27.8897 21.374 27.2723L29.8893 14.4994C30.2216 14.001 29.8643 13.3334 29.2653 13.3334H22.6667V5.14377C22.6667 4.40172 21.7042 4.11032 21.2926 4.72774L12.7774 17.5007C12.4451 17.9991 12.8024 18.6667 13.4014 18.6667H20V26.8563Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.00001 8.16669C4.00001 7.33826 4.67158 6.66669 5.50001 6.66669H13.1667C13.9951 6.66669 14.6667 7.33826 14.6667 8.16669V9.16669C14.6667 9.99511 13.9951 10.6667 13.1667 10.6667H5.50001C4.67158 10.6667 4.00001 9.99511 4.00001 9.16669V8.16669ZM4.00001 24.1667C4.00001 23.3383 4.67158 22.6667 5.50001 22.6667H13.1667C13.9951 22.6667 14.6667 23.3383 14.6667 24.1667V25.1667C14.6667 25.9951 13.9951 26.6667 13.1667 26.6667H5.50001C4.67158 26.6667 4.00001 25.9951 4.00001 25.1667V24.1667ZM2.83334 14.6667C2.00492 14.6667 1.33334 15.3383 1.33334 16.1667V17.1667C1.33334 17.9951 2.00492 18.6667 2.83334 18.6667H9.16668C9.9951 18.6667 10.6667 17.9951 10.6667 17.1667V16.1667C10.6667 15.3383 9.99511 14.6667 9.16668 14.6667H2.83334Z"
                    fill="#B3B3B3"
                  />
                </svg>
              )}
              <BtnBoostEarningLabel>Keep uptime</BtnBoostEarningLabel>
            </BtnBoostEarning>
          </div>
        </div>
      </BoostEarningsContainer>
      {isCardShown && <BlurBackGround />}
    </>
  )
}

const BtnBoostEarningLabel = styled.span`
  color: var(--basegrey-50, #F2F2F2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;

  /* Label/Small (Strong) */
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.21px;
`

const BtnBoostEarning = styled.div`
  display: flex;
  width: 116px;
  height: 60px;
  padding: 12px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: rgba(102, 102, 102, 0.25);
  cursor: pointer;
  color: var(--basegrey-50, #f2f2f2);

  &:hover {
    background: rgba(241, 241, 244, 0.3);
    div {
      color: #fff;
    }
  }
  .BoostEarning1:hover {
    div {
      color: red;
    }
  }
`

const BoostEarningHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 381px;
`

const Img = styled.img`
  position: absolute;
  top: 18px;
  left: 18px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(51, 51, 51, 0.6);
  border: 0px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
`

const BoostEarningsContainer = styled.div`
  position: absolute;
  left: 348px;
  top: 595px;
  width: 552px;
  height: 141px;
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const BoostEarningsText = styled.div`
  width: 117px;
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
  left: 650px;
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