import React, { FC, ReactElement, useEffect, useState } from "react"
import styled from "styled-components"
import { DeviceDetails, UserDetails } from "../elements/system/ProfileManager"
import { ProcessStatus, SysInfo } from "../elements/system/System"
import { DeviceInfoDrawer } from "./DeviceInfoDrawer"
import { DevicesDrawer } from "./DevicesDrawer/DevicesDrawer"
import { LanguagesDrawer } from "./LanguagesDrawer"
import { SettingsDrawer } from "./SettingsDrawer"
import imgCloseB from "./../../../images/icons/close-b.svg"
import { AppInfoDrawer } from "./AppInfoDrawer"
import { Log } from "../types/Log"
import { RemoteDeviceInfoDrawer } from "./RemoteDeviceInfoDrawer"
import { ChatDrawer } from "./ChatDrawer"

export enum DrawerType {
  AppInfo = "AppInfo",
  Languages = "Languages",
  Settings = "Settings",
  Info = "Info",
  Devices = "Devices",
  RemoteDeviceInfo = "RemoteDeviceInfo",
  Chat = "Chat"
}

const NORMAL_DRAWER_WIDTH = "400px"
const FULL_DRAWER_WIDTH = "100%"

type Props = {
  drawerType?: DrawerType
  closeDrawer: () => void
  logIn: () => void
  logOut: () => void
  openGpuLogsModal: () => void
  openCpuLogsModal: () => void
  openProfileModal: () => void
  openAppInfoDrawer: () => void
  isRunning: boolean
  onToggleProcess: () => void
  profile: UserDetails | null
  sysInfo: SysInfo
  country: string
  setCountry: (country: string) => void
  language: string
  setLanguage: (language: string) => void
  openDeviceInfoDrawer: () => void
  processStatus: ProcessStatus
  gpuLogs: Log[]
  cpuLogs: Log[]
  isWhiteTheme: boolean
  remoteDevice: DeviceDetails | null
  devices: DeviceDetails[]
  openRemoteDeviceInfoDrawer: (device: DeviceDetails) => () => void
  openEarnMoreModal: () => void
}

const HIDE_DRAWER_MS = 1500
let timeoutHideDrawer: any

export const DrawersCtrl: FC<Props> = ({
  country,
  setCountry,
  drawerType,
  closeDrawer,
  logIn,
  logOut,
  openDeviceInfoDrawer,
  openGpuLogsModal,
  openCpuLogsModal,
  openProfileModal,
  openAppInfoDrawer,
  isRunning,
  onToggleProcess,
  profile,
  sysInfo,
  language,
  setLanguage,
  processStatus,
  gpuLogs,
  cpuLogs,
  isWhiteTheme,
  remoteDevice,
  devices,
  openRemoteDeviceInfoDrawer,
  openEarnMoreModal
}): ReactElement => {
  const [currentDrawer, setCurrentDrawer] = useState<DrawerType | null>(null)
  const onClose: (event) => void = closeDrawer
  const show = !!drawerType
  const isMac = sysInfo?.platform === "darwin"

  useEffect(() => {
    clearTimeout(timeoutHideDrawer)
    if (drawerType !== null) {
      setCurrentDrawer(drawerType)
    } else {
      // Keep drawer visible for animation purposes
      timeoutHideDrawer = setTimeout(() => {
        setCurrentDrawer(null)
      }, HIDE_DRAWER_MS)
    }
  }, [drawerType])

  const getDrawerWidth = (drawerType: DrawerType) => {
    if (drawerType === DrawerType.Chat || drawerType === DrawerType.Devices) {
      return FULL_DRAWER_WIDTH
    }
    return NORMAL_DRAWER_WIDTH
  }

  const drawerWidth = getDrawerWidth(drawerType)
  return (
    <Overlay show={show} isWhiteTheme={true} onClick={closeDrawer}>
      <Drawer show={show} isWhiteTheme={true} width={drawerWidth}>
        {currentDrawer === DrawerType.AppInfo && <AppInfoDrawer processStatus={processStatus} sysInfo={sysInfo} openGpuLogsModal={openGpuLogsModal} openCpuLogsModal={openCpuLogsModal} />}
        {currentDrawer === DrawerType.Languages && <LanguagesDrawer country={country} setCountry={setCountry} language={language} setLanguage={setLanguage} />}
        {currentDrawer === DrawerType.Settings && <SettingsDrawer profile={profile} openProfileModal={openProfileModal} openAppInfoDrawer={openAppInfoDrawer} onLogOut={logOut} onLogIn={logIn} onClose={closeDrawer} />}
        {currentDrawer === DrawerType.Info && <DeviceInfoDrawer sysInfo={sysInfo} />}
        {currentDrawer === DrawerType.Devices && (
          <DevicesDrawer processStatus={processStatus} sysInfo={sysInfo} devices={devices} openDeviceInfoDrawer={openDeviceInfoDrawer} openRemoteDeviceInfoDrawer={openRemoteDeviceInfoDrawer} openEarnMoreModal={openEarnMoreModal} />
        )}
        {currentDrawer === DrawerType.RemoteDeviceInfo && !!remoteDevice && <RemoteDeviceInfoDrawer device={remoteDevice} />}
        {currentDrawer === DrawerType.Chat && <ChatDrawer profile={profile} onClose={closeDrawer} />}
      </Drawer>
    </Overlay>
  )
}

const TopRow = styled.div<{ isMac: boolean }>`
  display: flex;
  padding: 5px 30px 5px 5px;
  margin-bottom: 50px;
  justify-content: ${({ isMac }) => (isMac ? "flex-end" : "flex-end")};
  ${({ isMac }) => isMac && "margin-left: -25px;"};
`

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgb(255 255 255 / 0%);
  border-radius: 20px;
  cursor: pointer;
  transition: background 1500ms ease-in;

  &:hover {
    background: rgb(255 255 255 / 7%);
  }

  &:active {
    background: rgb(255 255 255 / 12%);
  }
`

const CloseButtonImg = styled.img`
  width: 32px;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 1500ms ease-in;
  &:hover {
    opacity: 1;
  }
`

const Drawer = styled.div<{ show: boolean; width: string; isWhiteTheme: boolean }>`
  width: ${({ width }) => width};
  height: 100%;
  position fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: ${({ show, width }) => (show ? "0" : `-${width}`)};
  background: ${({ isWhiteTheme }) => (isWhiteTheme ? "rgb(0 0 0 / 5%)" : "rgb(255 255 255 / 10%)")};
  padding: 25px 0 40px 40px;
  box-sizing: border-box;
  opacity: 1;
  transition: opacity ${HIDE_DRAWER_MS}ms ease-in;
`

const Overlay = styled.div<{ show: boolean; isWhiteTheme: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  backdrop-filter: ${({ isWhiteTheme }) => (isWhiteTheme ? "brightness(60%) contrast(140%) blur(50px)" : "brightness(100%) contrast(120%) blur(50px)")};
  z-index: 15;
  ${({ show }) => !show && "pointer-events: none;"}
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 300ms ease-in;
`
