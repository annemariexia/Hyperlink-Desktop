import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { DeviceDetails, Role, UserDetails } from "../system/ProfileManager"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "../system/System"
import DollarIcon from "./../../../../images/Dollar.png"

type Props = {
  isRunning: boolean
  devices: DeviceDetails[]
  setIsPopupOpen: (isOpen: string) => void
  progressPercent: number | null
  isEnableAllButtons: boolean
  refers?: any
  profile?: UserDetails
  openSignupLoginModal?: () => void
}

export const StatsPanel: React.FC<Props> = ({ isRunning, devices, setIsPopupOpen, progressPercent, isEnableAllButtons, refers, profile, openSignupLoginModal }): ReactElement => {
  const [isOnline, setOnline] = useState(true)

  useEffect(() => {
    ipcRenderer.on("NetworkConnectionInfo", (event, result) => {
      setOnline(result.isOnline)
    })

    return () => {
      ipcRenderer.removeAllListeners("NetworkConnectionInfo")
    }
  }, [])

  const handleManageSummaryClick = () => {
    if (!isEnableAllButtons) return

    const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

    if (isGuestOrNoProfile) {
      openSignupLoginModal()
    } else {
      setIsPopupOpen("summary")
    }
  }

  const handleManageDevicesClick = () => {
    if (!isEnableAllButtons) return

    const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

    if (isGuestOrNoProfile) {
      openSignupLoginModal()
    } else {
      setIsPopupOpen("devices")
    }
  }

  const handleManageReferClick = () => {
    if (!isEnableAllButtons) return

    const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

    if (isGuestOrNoProfile) {
      openSignupLoginModal()
    } else {
      setIsPopupOpen("referrals")
    }
  }

  return (
    <StatsContainer>
      <StatsHeader>
        <IconContainer>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.1673 3.5V6.65H12.834V3.5H15.1673ZM12.834 24.5V21.35H15.1673V24.5H12.834Z" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9993 7.81673C11.7913 7.81673 10.4993 9.18406 10.4993 10.3251C10.4993 10.8361 10.7542 11.3008 11.4158 11.7586C12.1007 12.2326 13.1014 12.6022 14.2554 12.8618C15.4917 13.1401 16.8196 13.5933 17.8671 14.3108C18.9276 15.0373 19.8327 16.1391 19.8327 17.6751C19.8327 20.5933 16.9459 22.5168 13.9993 22.5168C11.0528 22.5168 8.16602 20.5933 8.16602 17.6751H10.4993C10.4993 18.8161 11.7913 20.1835 13.9993 20.1835C16.2074 20.1835 17.4993 18.8161 17.4993 17.6751C17.4993 17.1814 17.2378 16.7082 16.5483 16.2358C15.8457 15.7544 14.8403 15.3851 13.7433 15.1383C12.4597 14.8495 11.127 14.3963 10.0881 13.6774C9.02576 12.9423 8.16602 11.8437 8.16602 10.3251C8.16602 7.40678 11.0528 5.4834 13.9993 5.4834C16.9459 5.4834 19.8327 7.40678 19.8327 10.3251H17.4993C17.4993 9.18406 16.2074 7.81673 13.9993 7.81673Z"
              fill="#C6C9D2"
            />
          </svg>
        </IconContainer>
        <NumDevicesText> Income Sources </NumDevicesText>
        <StatusTag onClick={handleManageSummaryClick}>
          <StatusText> Manage </StatusText>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M10.8779 8.20493L7.29825 4.62222C7.13544 4.45926 6.87145 4.45926 6.70863 4.62222L6.12211 5.20924C5.95946 5.37204 5.95927 5.63594 6.1217 5.79896L8.8129 8.5L6.1217 11.201C5.95927 11.3641 5.95946 11.628 6.12211 11.7908L6.70863 12.3778C6.87145 12.5407 7.13544 12.5407 7.29825 12.3778L10.8779 8.79506C11.0407 8.6321 11.0407 8.36789 10.8779 8.20493Z"
              fill="#F2F2F2"
            />
          </svg>
        </StatusTag>
      </StatsHeader>
      <StatsItemContainer>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", position: "absolute", bottom: 16, left: 16 }}>
          <StatsItem onClick={handleManageDevicesClick}>
            <StatsItemText> MY DEVICES </StatsItemText>
            <StatsItemNumber> {devices?.length} </StatsItemNumber>
          </StatsItem>
          <StatsItem onClick={handleManageReferClick}>
            <StatsItemText> REFERRALS </StatsItemText>
            <StatsItemNumber> {refers?.length} </StatsItemNumber>
          </StatsItem>
        </div>
      </StatsItemContainer>
    </StatsContainer>
  )
}

const StatsItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const StatsItemNumber = styled.div`
  display: flex;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.96px;
  padding-bottom: 12px;
`

const StatsItemText = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.96px;
  text-transform: uppercase;
  padding-top: 12px;
  padding-bottom: -8px;
  align-self: stretch;
`

const StatsItem = styled.div`
  display: flex;
  width: 98px;
  height: 60px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(51, 51, 51, 0.25);
  cursor: pointer;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  cursor: pointer;

  &:hover {
    background: rgba(241, 241, 244, 0.25);
    div {
      color: #fff;
    }
  }
`

const StatsHeader = styled.div`
  display: flex;
  width: 252px;
  justify-content: space-between;
  align-items: center;
`

const Img = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
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

const StatsContainer = styled.div`
  position: absolute;
  left: 948px;
  top: 595px;
  width: 252px;
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

const Button = styled.div<{ top: number; left: number }>`
  width: 122px;
  height: 68px;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background: rgba(77, 77, 77, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    svg path {
      fill: rgba(0, 0, 0, 0.5);
    }
  }
`

const Label = styled.div<{ left: number; top: number; size: number }>`
  width: 78px;
  height: 20px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  position: absolute;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: ${({ size }) => size}px;
  line-height: 24px;
  letter-spacing: 0.01em;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: #ffffff;
  flex: none;
  order: 1;
  flex-grow: 0;

  ${Button}:hover & {
    color: #000000;
  }
`

export const FullScreenBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1728px;
  height: 1080px;
  backdrop-filter: blur(4px);
  z-index: 9998; /* Adjust the z-index as needed to ensure it covers other elements */
`

const NumDevicesText = styled.div`
  width: 123px;
  height: 20px;
  top: 20px;
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
  order: 0;
  flex-grow: 0;
`

const StatusTag = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  height: 24px;
  padding: 3px 2px 4px 8px;
  align-items: center;
  border-radius: 99px;
  background: rgba(102, 102, 102, 0.25);
  width: 64px;
  height: 17px;
  cursor: pointer;

  &:hover {
    background: rgba(241, 241, 244, 0.3);
  }
`

const StatusText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500; // intentionally size down to match the figma file, permission from Tai
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
`

const ManageDevicesBttn = styled.div`
  position: absolute;
  width: 148px;
  height: 32px;
  top: 96px;
  left: 15px;
  background: rgba(77, 77, 77, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    svg path {
      fill: rgba(0, 0, 0, 0.5);
    }
  }
`

const MangeDevicesText = styled.div`
  position: absolute;
  width: 101px;
  height: 20px;
  top: 6px;
  left: 30px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: rgba(255, 255, 255, 0.95);
  flex: none;
  order: 1;
  flex-grow: 0;
  display: flex;
  cursor: pointer;

  ${ManageDevicesBttn}:hover & {
    color: #000000;
  }
`

const UptimeText = styled.div`
  postion: absolute;
  width: 160px;
  height: 20px;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #87888c;
  flex: none;
  order: 0;
  flex-grow: 0;
`
const IconContainer = styled.div`
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(44, 48, 58, 0.5);
`
