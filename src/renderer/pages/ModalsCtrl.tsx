import React, { FC, ReactElement, SetStateAction, Dispatch, useState, useEffect } from "react"
import styled from "styled-components"
import { CashOutModal } from "./CashOutModal"
import { ProfileModal } from "./ProfileModal"
import { DeviceDetails, UserDetails } from "../elements/system/ProfileManager"
import { stopEventPropagation } from "../elements/EventListeners"
import { LogsScreen } from "./LogsScreen"
import { Log } from "../types/Log"
import { SignupLogin } from "./LockScreen/SignupLogin"
import { TransferLogin } from "./LockScreen/TransferLogin"
import { EarnMoreModal } from "./EarnMoreModal"
import { SettingsScreen } from "./AccountSettings"
import { TransferScreen } from "../pages/Earnings"
import { IncomeSources } from "./IncomeSources"
import { BoostEarnings } from "../pages/BoostEarnings"
import { SecurityWarning } from "./SecurityWarning"
import { WelcomeScreen } from "./WelcomeScreen"

export enum ModalType {
  MinerLoading = "MinerLoading",
  Profile = "Profile",
  CpuLogs = "CpuLogs",
  GpuLogs = "GpuLogs",
  CashOut = "CashOut",
  SignupLogin = "SignupLogin",
  TransferLogin = "TransferLogin",
  EarnMore = "EarnMore",
  SettingAccount = "AccountMain",
  SettingPrivacy = "PrivacyMain",
  SettingPayments = "PaymentMain",
  SettingSystem = "SystemMain",
  SettingSecurity = "AntiVirus",
  SecurityWarning = "SecurityWarning",
  Earning = "Earning",
  Device = "Device",
  BoostEarnings = "BoostEarnings",
  WelcomeScreen = "WelcomeScreen"
}

type Props = {
  profile: UserDetails | null
  logOut: () => void
  modalType?: ModalType
  closeModal: () => void
  onReferalClick: () => void
  setProfile: (profile: UserDetails) => void
  setDevices: (devices: DeviceDetails[]) => void
  gpuLogs: Log[]
  cpuLogs: Log[]
  isWhiteTheme: boolean
  openTransferScreen?: Dispatch<SetStateAction<string>>
  isPopupOpen?: string
  setIsPopupOpen?: (isOpen: string) => void
  devices?: DeviceDetails[]
  progressPercent?: number | null
  activeBoostEarningTab?: string | "sharelink"
  setIsShowTutorial?: (isShow: boolean) => void
  activeIncomeSourceTab?: string | "summary"
  refers?: any | []
  macAddress: string | ""
  transferActiveTab?: string | "transfer"
  openChatDrawer()
  setIsBoostEarning(boost: string)
  onOpenProfile?: () => void
}

export const ModalsCtrl: FC<Props> = ({
  profile,
  logOut,
  modalType,
  closeModal,
  onReferalClick,
  setProfile,
  setDevices,
  gpuLogs,
  cpuLogs,
  isWhiteTheme,
  openTransferScreen,
  isPopupOpen,
  setIsPopupOpen,
  progressPercent,
  devices,
  activeBoostEarningTab,
  setIsShowTutorial,
  activeIncomeSourceTab,
  refers,
  macAddress,
  transferActiveTab,
  openChatDrawer,
  setIsBoostEarning,
  onOpenProfile,
}): ReactElement => {
  let onClose: (event) => void = closeModal

  if (modalType === ModalType.SignupLogin) onClose = stopEventPropagation
  if (modalType === ModalType.TransferLogin) onClose = stopEventPropagation

  const [activeModal, setActiveModal] = useState("")

  useEffect(() => {
    setActiveModal(modalType)
  }, [modalType])

  return (
    <ModalOverlay show={!!modalType} isWhiteTheme={isWhiteTheme} onClick={onClose}>
      {activeModal == ModalType.Profile && <ProfileModal profile={profile} onLogOut={logOut} onClose={closeModal} />}
      {activeModal == ModalType.CashOut && <CashOutModal profile={profile} onClose={closeModal} />}
      {activeModal == ModalType.SignupLogin && <SignupLogin profile={profile} onClose={closeModal} setProfile={setProfile} setDevices={setDevices} setIsShowTutorial={setIsShowTutorial} />}
      {activeModal == ModalType.TransferLogin && <TransferLogin profile={profile} onClose={closeModal} setProfile={setProfile} setDevices={setDevices} setIsShowTutorial={setIsShowTutorial} />}
      {activeModal == ModalType.GpuLogs && <LogsScreen logs={gpuLogs} />}
      {activeModal == ModalType.CpuLogs && <LogsScreen logs={cpuLogs} />}
      {activeModal == ModalType.EarnMore && <EarnMoreModal onClose={closeModal} />}
      {activeModal == ModalType.SettingAccount && <SettingsScreen profile={profile} onClose={closeModal} logout={logOut} type={modalType} setActiveModal={setActiveModal} setProfile={setProfile} />}
      {activeModal == ModalType.SettingPrivacy && <SettingsScreen profile={profile} onClose={closeModal} logout={logOut} type={modalType} setActiveModal={setActiveModal} setProfile={setProfile} />}
      {activeModal == ModalType.SettingPayments && <SettingsScreen profile={profile} onClose={closeModal} logout={logOut} type={modalType} setActiveModal={setActiveModal} setProfile={setProfile} />}
      {activeModal == ModalType.SettingSecurity && <SettingsScreen profile={profile} onClose={closeModal} logout={logOut} type={modalType} setActiveModal={setActiveModal} setProfile={setProfile} />}
      {activeModal == ModalType.SettingSystem && <SettingsScreen profile={profile} onClose={closeModal} logout={logOut} type={modalType} setActiveModal={setActiveModal} setProfile={setProfile} />}
      {activeModal == ModalType.Earning && (
        <TransferScreen
          activeTab={transferActiveTab}
          refers={refers}
          openTransferScreen={openTransferScreen}
          profile={profile}
          closeModal={closeModal}
          onReferalClick={onReferalClick}
          openChatDrawer={openChatDrawer}
          setActiveModal={setActiveModal}
          setProfile={setProfile}
        />
      )}
      {activeModal == ModalType.Device && <IncomeSources activeTab={isPopupOpen} profile={profile} devices={devices} refers={refers} onClose={closeModal} macAddress={macAddress} setIsBoostEarning={setIsBoostEarning} />}
      {activeModal == ModalType.BoostEarnings && <BoostEarnings activeTab={activeBoostEarningTab} profile={profile} onClose={closeModal} setActiveModal={setActiveModal} setIsPopupOpen={setIsPopupOpen} />}
      {activeModal == ModalType.SecurityWarning && <SecurityWarning onClose={closeModal} />}
      {activeModal == ModalType.WelcomeScreen && <WelcomeScreen onClose={closeModal} onOpenProfile={onOpenProfile} />}
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div<{ show: boolean; isWhiteTheme: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  backdrop-filter: ${({ isWhiteTheme }) => (isWhiteTheme ? "brightness(60%) contrast(140%) blur(4px)" : "brightness(100%) contrast(120%) blur(4px)")};
  z-index: 15;
  ${({ show }) => !show && "pointer-events: none;"}
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 500ms ease-in;
`
