/**
 * Description: This component represents the main page of the application.
 * It contains the main content and layout for the entire application.
 *
 * Usage:
 *    import { PageMain } from "./pages/PageMain"
 *    <PageMain />
 */
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import { Command, isProduction, Message, SysInfo, ProcessStatus, ApiCommand, ApiMessage } from "../elements/system/System"
import { DeviceDetails, ProfileManager, Role, UserDetails } from "../elements/system/ProfileManager"
import { LiveBalancePanel } from "../elements/panels/LiveBalancePanel"
import { BoostEarningsPanel } from "../elements/panels/BoostEarnings"
import DebugPanel from "../elements/panels/DebugPanel"
import { StatsPanel, FullScreenBlur } from "../elements/panels/StatsPanel"
import { PotentialPanel } from "../elements/panels/PotentialPanel"
import { Main, Video, Toolbar, TopPanel, BottomPanel, LogoHyperlink, Version, AccountContainer, ScreenWrapper, PotentialInfoButton, BoostEarningsInfoButton, TutorialInfoButton } from "../styles/PageMain"
import { ModalsCtrl, ModalType } from "./ModalsCtrl"
import { DrawersCtrl, DrawerType } from "./DrawersCtrl"
import { Log, LogType } from "../types/Log"
import { COUNTRY_US, LANG_ENGLISH } from "./LanguagesDrawer"
import { FadeInForeground } from "../elements/FadeInForeground"
import vidBackground from "./../../../images/electric.mp4"
import vidBackgroundDark from "./../../../images/electric.mp4"
import DebugInstance from "../common/DebugInstance"
import { SignupButtonPanel } from "../elements/panels/SignupButtonPanel"
import { InfoIconPanel } from "../elements/panels/InfoIcon"
import { UserIconPanel } from "../elements/panels/userIconPanel"
import Tutorial from "../elements/Tutorial"
import { UptimePanel } from "../elements/panels/UpTimePanel"
import { CPU_ESTIMATE_EARNING_YRLY, CPU_POTENTIAL_EARNING_YRLY, GPU_ESTIMATE_EARNING_YRLY, GPU_POTENTIAL_EARNING_YRLY, MONTHS_IN_YEAR, LIFETIME_YEAR } from "../common/Constants"

const MAX_LOGS = 1000 // Max log count
const isProd = isProduction() // Flag if the app is running in Production or development

const debugInstance = DebugInstance.getInstance()

const DEFAULT_PROCESS_STATUS = {
  // Default workload process status
  isGpuRunning: false,
  gpuStatus: "Not started yet",
  isCpuRunning: false,
  cpuStatus: "Not started yet"
}

// Limit log count
const limitLogsLength = (logs: Log[]) => {
  if (logs.length > MAX_LOGS) {
    const trimmedLogs = logs.slice(logs.length - MAX_LOGS, logs.length)
    trimmedLogs.unshift({
      content: "--- Previous logs were archived ---",
      type: LogType.Info
    })
    return trimmedLogs
  }
  return logs
}

export const PageMain: FC = (): ReactElement => {
  const profileRef = useRef<UserDetails | null>(null)
  const cpuLogsRef = useRef<Log[]>([])
  const gpuLogsRef = useRef<Log[]>([])

  const [profile, setProfile] = useState<UserDetails | null>(null)
  const [devices, setDevices] = useState<DeviceDetails[]>([])
  const [refers, setRefers] = useState<any>([])
  const [availabilityPercentage, setAvailabilityPercentage] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [cpuLogs, setCpuLogs] = useState<Log[]>([])
  const [gpuLogs, setGpuLogs] = useState<Log[]>([])
  const [processStatus, setProcessStatus] = useState<ProcessStatus>(DEFAULT_PROCESS_STATUS)
  const [isWhiteTheme, setIsWhiteTheme] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1)
  const [language, setLanguage] = useState<string>(LANG_ENGLISH)
  const [country, setCountry] = useState<string>(COUNTRY_US)
  const [remoteDevice, setRemoteDevice] = useState<DeviceDetails | null>(null)
  const [showModalType, setShowModalType] = useState<ModalType | null>(null)
  const [showDrawerType, setShowDrawerType] = useState<DrawerType | null>(null)
  const [sysInfo, setSysInfo] = useState<SysInfo>({})
  const [enableGuestLogin, setEnableGuestLogin] = useState<boolean>(true)
  const [version, setVersion] = useState<string>("")
  const [debugStats, setDebugInfo] = useState<DebugInstance>(debugInstance)
  const [isPopupOpen, setIsPopupOpen] = useState<string | null>("")
  const [isOnline, setOnline] = useState(true)
  const [isTransferScreen, setIsTransferScreen] = useState<string | null>("")
  const [isBoostEarning, setIsBoostEarning] = useState("")
  const [isEnableAllButtons, setIsEnableAllButtons] = useState(false)
  const [isShowTutorial, setIsShowTutorial] = useState(false)
  const [isShowAccountMenu, setIsShowAccountMenu] = useState(false)
  const [isCardShown, setIsCardShown] = useState(false)
  const [isInfoCardShown, setIsInfoCardShown] = useState(false)
  const [totalUptime, setTotalUptime] = useState<any>(undefined)

  // Add state for debug panel visibility
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const closeDebugPanel = () => {
    setShowDebugPanel(false)
  }

  // Initialize ipcRenderer channel listeners
  const initLinsteners = () => {
    ipcRenderer.on(Message.SysInfo, (event, args) => {
      setSysInfo(args)

      if (!isProd) {
        debugInstance.cpu_core = args.cpus.length
        debugInstance.ram_Gb = (args.ramKb / 1048576).toFixed(2)
        debugInstance.cpuEarningsYrly = args.cpus.length * CPU_POTENTIAL_EARNING_YRLY
        debugInstance.gpuEarningsYrly = (args.ramKb / 1048576) * GPU_POTENTIAL_EARNING_YRLY
        debugInstance.potential_earningyrly = args.cpus.length * CPU_POTENTIAL_EARNING_YRLY + (args.ramKb / 1048576) * GPU_POTENTIAL_EARNING_YRLY
        debugInstance.estimated_earningyrly = args.cpus.length * CPU_ESTIMATE_EARNING_YRLY + (args.ramKb / 1048576) * GPU_ESTIMATE_EARNING_YRLY
        debugInstance.monthlyPotential = (args.cpus.length * CPU_POTENTIAL_EARNING_YRLY + (args.ramKb / 1048576) * GPU_POTENTIAL_EARNING_YRLY) / MONTHS_IN_YEAR
        debugInstance.lifetimePotential = (args.cpus.length * CPU_POTENTIAL_EARNING_YRLY + (args.ramKb / 1048576) * GPU_POTENTIAL_EARNING_YRLY) * LIFETIME_YEAR

        setDebugInfo(debugInstance)
      }
    })

    ipcRenderer.on(Message.GpuLog, (event, args) => {
      gpuLogsRef.current = [...gpuLogsRef.current, args]
      gpuLogsRef.current = limitLogsLength(gpuLogsRef.current)

      setGpuLogs(gpuLogsRef.current)
    })

    ipcRenderer.on(Message.CpuLog, (event, args) => {
      cpuLogsRef.current = [...cpuLogsRef.current, args]
      cpuLogsRef.current = limitLogsLength(cpuLogsRef.current)

      setCpuLogs(cpuLogsRef.current)
    })

    ipcRenderer.on(Message.ProcessStatus, (event, args) => {
      setIsRunning((args?.isGpuRunning || args?.isCpuRunning) ?? false)
      setProcessStatus(args)

      if (!isProd) {
        debugInstance.gpu = args?.isGpuRunning ? "online" : "offline"
        debugInstance.cpu = args?.isCpuRunning ? "online" : "offline"
        debugInstance.IP = args?.ip ? args.ip : "<NULL>"
        setDebugInfo(debugInstance)
      }
    })

    ipcRenderer.on(ApiMessage.UpdateDevices, (event, args) => {
      setDevices(args ?? [])

      if (!isProd) {
        debugInstance.availability = args?.availabilityPercentage ? args?.availabilityPercentage : "<NULL>"
        setDebugInfo(debugInstance)
      }
    })

    ipcRenderer.on(ApiMessage.UpdateReferral, (event, args) => {
      setRefers(args.refers ?? [])
    })

    ipcRenderer.on(Message.ConsoleLog, (event, args) => {
      console.info(args?.text, args?.data)
    })

    ipcRenderer.on(Message.UpdateUserInfo, (event, args) => {
      if (!args) return
      if (profile) {
        setProfile({
          ...profileRef.current,
          ...args
        })
      }
    })

    ipcRenderer.on(ApiMessage.SocialLogInResult, (event, { logInResult, token }) => {
      if (logInResult.success) {
        const { user, devices, deviceId, userId } = logInResult
        const userDetails = { email: user.email, firstName: user.firstName, photoUrl: user.photoUrl }
        ProfileManager.saveCredentials(user.email, token, userDetails)
        setProfile(user)
        setDevices(devices ?? [])
        closeModal()

        // set debug info
        if (!isProd) {
          debugInstance.name = user.firstName || "<NULL>"
          debugInstance.email = user.email || "<NULL>"
          debugInstance.device_id = deviceId || "<NULL>"
          debugInstance.user_id = userId || "<NULL>"
          debugInstance.balance = user.earningsUsd || "0"
          debugInstance.signedup = new Date(user.created) || undefined
          debugInstance.pcs = devices.length

          // get payout page data
          const [params, setParams] = useState<any>({})

          const loadPayoutData = async (id: any) => {
            // const data = await ApiClient.getPayoutDetails(userId);
            // setParams(data);
          }

          useEffect(() => {
            if (userId) loadPayoutData(userId)
          }, [userId])

          const { payout } = params
          debugInstance.isPaid = payout.isPaid ? "true" : "false"
          debugInstance.paidOn = new Date(payout.paidOn) || undefined

          setDebugInfo(debugInstance)
        }
      } else {
        ProfileManager.removeCreadentials()
      }
    })

    ipcRenderer.on(ApiMessage.GuestLogInResult, async (event, logInResult) => {
      if (logInResult.success) {
        const { user, devices, deviceId, userId } = logInResult
        const userDetails = { email: user.username, firstName: user.username, photoUrl: user.photoUrl }
        ProfileManager.saveCredentials(user.username, user.username, userDetails)
        ProfileManager.saveGuestCredentials(user.username, user.username, userDetails)
        setProfile(user)
        setDevices(devices ?? [])
        closeModal()

        // set debug info
        if (!isProd) {
          debugInstance.name = user.firstName || "<NULL>"
          debugInstance.email = logInResult.email || "<NULL>"
          debugInstance.device_id = deviceId || "<NULL>"
          debugInstance.user_id = userId || "<NULL>"
          debugInstance.balance = user.earningsUsd || "0"
          debugInstance.signedup = new Date(user.created) || undefined
          debugInstance.pcs = devices.length

          setDebugInfo(debugInstance)
        }
      } else {
        ProfileManager.removeCreadentials()
      }
    })

    ipcRenderer.on(ApiMessage.LogInResult, async (event, logInResult) => {
      if (logInResult.success && !showModalType) {
        const { user, devices, deviceId, userId } = logInResult
        setProfile(user)
        setDevices(devices ?? [])

        // set debug info
        if (!isProd) {
          debugInstance.name = user.firstName || "<NULL>"
          debugInstance.email = logInResult.email || "<NULL>"
          debugInstance.device_id = deviceId || "<NULL>"
          debugInstance.user_id = userId || "<NULL>"
          debugInstance.balance = user.earningsUsd || "0"
          debugInstance.signedup = new Date(user.created) || undefined
          debugInstance.pcs = devices.length

          setDebugInfo(debugInstance)
        }
      } else if (!logInResult.success && logInResult.msg.includes(Role.Guest)) {
        ProfileManager.removeCreadentials()
        // Create the guest user only once on each device.
        ipcRenderer.send(ApiCommand.CreateGuestUser)
      }
    })

    ipcRenderer.on(ApiMessage.UpdateUsernameResult, (event, updateUserNameResult) => {
      if (profile) {
        setProfile({
          ...profileRef.current,
          ...{
            username: updateUserNameResult.username
          }
        })
      }
    })

    ipcRenderer.on(Message.Version, async (event, version) => {
      if (version) {
        setVersion(version)
      }
    })

    ipcRenderer.on("RequestPayoutResult", (event, result) => {
      if (!isProd) {
        debugInstance.account_no = result.accountNumber
        debugInstance.address = result.address

        setDebugInfo(debugInstance)
      }
    })

    ipcRenderer.on("GetPayoutMethods", (event, result) => {
      if (!isProd) {
        debugInstance.payout_method = result
        setDebugInfo(debugInstance)
      }
    })

    ipcRenderer.on(Message.NetworkConnectionInfo, (event, result) => {
      // if (result.isOnline && result.isOnline != isOnline) {
      //   if (profile && profile.role != Role.Guest) {
      //     ipcRenderer.send(Command.StartProcess)
      //   }
      // }

      setOnline(result.isOnline)
    })
  }

  // Remove all the listeners when refresh
  const removeAllListeners = () => {
    ipcRenderer.removeAllListeners(Message.SysInfo)
    ipcRenderer.removeAllListeners(Message.GpuLog)
    ipcRenderer.removeAllListeners(Message.CpuLog)
    ipcRenderer.removeAllListeners(Message.ProcessStatus)
    ipcRenderer.removeAllListeners(Message.ConsoleLog)
    ipcRenderer.removeAllListeners(Message.UpdateUserInfo)
    ipcRenderer.removeAllListeners(Message.Version)

    ipcRenderer.removeAllListeners(ApiMessage.UpdateDevices)
    ipcRenderer.removeAllListeners(ApiMessage.SocialLogInResult)
    ipcRenderer.removeAllListeners(ApiMessage.GuestLogInResult)
    ipcRenderer.removeAllListeners(ApiMessage.LogInResult)
    ipcRenderer.removeAllListeners(ApiMessage.UpdateUsernameResult)

    ipcRenderer.removeAllListeners("RequestPayoutResult")
    ipcRenderer.removeAllListeners("GetPayoutMethods")
  }

  // open profile modal
  const openProfileModal = () => {
    if (!profile || profile.role == Role.Guest) return
    setShowModalType(ModalType.SettingAccount)
  }

  // open profile modal by page type
  const openProfileModalByType = (type: ModalType) => {
    // if (!profile || profile.role == Role.Guest) return
    setShowModalType(type)
  }

  // open gpu logs modal
  const openGpuLogsModal = () => setShowModalType(ModalType.GpuLogs)

  // open cpu logs modal
  const openCpuLogsModal = () => setShowModalType(ModalType.CpuLogs)

  // open cashout modal
  // const openCashOutModal = () => setShowModalType(ModalType.CashOut)
  const openCashOutModal = () => {
    setShowModalType(ModalType.CashOut)

    debugInstance.payout_requested = "Yes"
    debugInstance.payout_request_time = new Date().toLocaleString()

    setDebugInfo(debugInstance)
  }

  // open login/signup modal
  const openSignupLoginModal = () => setShowModalType(ModalType.SignupLogin)

  // open Transfer/Login modal
  const openTransferLoginModal = () => setShowModalType(ModalType.TransferLogin)

  // open Earn more modal
  const openEarnMoreModal = () => setShowModalType(ModalType.EarnMore)

  const openAccountSetting = () => setShowModalType(ModalType.SettingAccount)
  // close modal
  const closeModal = () => {
    setShowModalType(null)
    setIsTransferScreen("")
    setIsPopupOpen("")
    setIsBoostEarning("")
    debugInstance.payout_requested = "No"
    debugInstance.payout_request_time = undefined
    if (!profile?.verified) setEnableGuestLogin(true)
  }

  const onReferalClick = () => {
    closeModal()
    setIsBoostEarning("sharelink")
  }

  // refresh drawer
  const closeDrawer = () => setShowDrawerType(null)

  // Open app info panel
  const openAppInfoDrawer = () => setShowDrawerType(DrawerType.AppInfo)

  // Open Info panel
  const openDeviceInfoDrawer = () => setShowDrawerType(DrawerType.Info)

  // Open Settings panel
  const openSettingsDrawer = () => setShowDrawerType(DrawerType.Settings)

  // Open Devices panel
  const openDevicesDrawer = () => {
    if (profile) {
      // Update devices list
      ipcRenderer.send(ApiCommand.SendHeartBeat)
      setShowDrawerType(DrawerType.Devices)
    } else {
      openSignupLoginModal()
    }
  }

  // Open feedback panel
  const openChatDrawer = async () => {
    if (!profile) {
      openSignupLoginModal()
    } else if (profile && profile.role === Role.Guest) {
      ProfileManager.removeCreadentials()
      setProfile(null)
      openSignupLoginModal()
    } else {
      setShowDrawerType(DrawerType.Chat)
    }
  }

  // Opoen remote device info panel
  const openRemoteDeviceInfoDrawer = (device: DeviceDetails) => () => {
    setRemoteDevice(device)
    setShowDrawerType(DrawerType.RemoteDeviceInfo)
  }

  // open user profile panel - if user is Guest, redirect to SignIn
  const onOpenProfile = async () => {
    if (!profile) {
      openSignupLoginModal()
    } else if (profile && profile.role === Role.Guest) {
      ProfileManager.removeCreadentials()
      setProfile(null)
      openSignupLoginModal()
    } else {
      openProfileModal()
    }
  }

  //open TranferScreen - if user is Guest , redirect to SignIn
  const onOpenTransfer = async () => {
    if (!profile) {
      openTransferLoginModal()
    } else if (profile && profile.role === Role.Guest) {
      ProfileManager.removeCreadentials()
      setProfile(null)
      openTransferLoginModal()
    } else {
      openProfileModal()
    }
  }

  // Open Chashout panel
  const onOpenCashOut = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    if (profile) {
      if (profile.verified) {
        openCashOutModal()
      } else if (profile.role !== Role.Guest) {
        openSignupLoginModal()
      }
    } else {
      openSignupLoginModal()
    }
  }

  // Open settings panel
  const onOpenSettings = (event: any) => {
    // no need to open settings page when user is guest | profile == null ? guest
    event.preventDefault()
    event.stopPropagation()
    if (profile) {
      if (profile.verified) {
        openAccountSetting()
      } else if (profile.role !== Role.Guest) {
        openSignupLoginModal()
      }
    } else {
      openSignupLoginModal()
    }
  }

  // go to login
  const logIn = () => {
    closeDrawer()
    openSignupLoginModal()
  }

  // log out current user
  const logOut = async () => {
    try {
      ProfileManager.removeCreadentials()
      setProfile(null)
      if (showModalType) closeModal()
      closeDrawer()
      ipcRenderer.send(ApiCommand.LogOut)
    } catch (error) {
      console.error("Error on logging out", error)
    }
  }

  // Toggle Start/Stop main process - workload
  const onToggleProcess = () => {
    // // Toggle process
    // if (isRunning) {
    //   ipcRenderer.send(Command.StopProcess)
    // } else {
    //   ipcRenderer.send(Command.StartProcess)
    // }

    closeDrawer()
  }

  // Try to login with stored credentials
  const logInIfCredentialsAreStored = async () => {
    // Automatically log in, if we store credentials
    const guestCredentials = await ProfileManager.loadGuestCredentials()
    const credentials = await ProfileManager.loadCredentials()

    if (credentials && !profileRef.current) {
      ipcRenderer.send(ApiCommand.LogIn, { email: credentials.email, password: credentials.password })
    } else {
      if (guestCredentials) {
        if (enableGuestLogin) {
          await ProfileManager.saveCredentials(guestCredentials.email, guestCredentials.password, guestCredentials.userInfo)
          ipcRenderer.send(ApiCommand.LogIn, { email: guestCredentials.email, password: guestCredentials.password })
        }
      } else {
        // Create the guest user only once on each device.
        ipcRenderer.send(ApiCommand.CreateGuestUser)
      }
    }
  }

  // Set debug panel to 'visible' if "ctrl" is pressed and in dev mode
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && !isProd) {
      setShowDebugPanel(true)
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress) // Add event listener for key press
    return () => {
      window.removeEventListener("keypress", handleKeyPress) // Remove event listener on component unmount
    }
  }, [])

  ipcRenderer.on("RequestPayoutResult", (event, result) => {
    if (!isProd) {
      debugInstance.account_no = result.AccountNumber

      setDebugInfo(debugInstance)
    }
  })

  ipcRenderer.on("GetPayoutMethods", (event, result) => {
    if (!isProd) {
      debugInstance.payout_method = result
      setDebugInfo(debugInstance)
    }
  })

  useEffect(() => {
    initLinsteners()

    // Send application information to the server
    ipcRenderer.send(Message.Version)
    ipcRenderer.send(Command.GetSysInfo)
    ipcRenderer.send(Command.GetProcessStatus)

    // Get current device and initilize availability panel
    const thisDevice = devices.find((device) => device.macAddress === sysInfo?.macAddress)
    if (thisDevice) {
      setAvailabilityPercentage(thisDevice.availabilityPercentage)
      setTotalUptime(thisDevice.uptime)

      if (!isProd) {
        debugInstance.device_id = thisDevice.id ? thisDevice.id : "<NULL>"
        debugInstance.mac_address = sysInfo.macAddress ? sysInfo.macAddress : "<NULL>"
        debugInstance.gpu_vram = sysInfo.gpuVram ? sysInfo.gpuVram : "<NULL>"

        setDebugInfo(debugInstance)
      }
    } else {
      setAvailabilityPercentage(null)
      setTotalUptime(null)
    }

    // Set user profile
    profileRef.current = profile
    if (!profile && !showModalType && enableGuestLogin) {
      logInIfCredentialsAreStored()
    }

    if (showModalType) closeDrawer()

    return () => {
      removeAllListeners()
    }
  }, [showModalType, profile, enableGuestLogin, devices])

  useEffect(() => {
    // Add resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      // Calculate and set scale
      const diagonalPx = Math.sqrt(Math.pow(document.body.clientWidth, 2) + Math.pow(document.body.clientHeight, 2))
      const baseDiagonalPx = 1509
      const currentScale = diagonalPx / baseDiagonalPx
      setScale(currentScale)
    })
    resizeObserver.observe(document.body)

    // Set scaling of the application
    const rootElement: any = document.getElementById("root")
    if (rootElement) {
      rootElement.style.zoom = scale
    }
  }, [scale])

  useEffect(() => {
    if (isEnableAllButtons) {
      setTimeout(() => {
        if (!profile || (profile && profile.role === Role.Guest))
          setShowModalType(ModalType.WelcomeScreen)
      }, 500)
    }

    ipcRenderer.on("DownloadFileResult", (event, result) => {
      if (result.status == "success") {
        ipcRenderer.send(Command.StopProcess)
        ipcRenderer.send(Command.StartProcess)
      }
    })

    return () => {
      ipcRenderer.removeAllListeners("DownloadFileResult")
    }
  }, [isEnableAllButtons])

  useEffect(() => {
    ipcRenderer.send(Command.StartProcess)
  }, [])

  useEffect(() => {
    if (isTransferScreen != "") setShowModalType(ModalType.Earning)
    if (isPopupOpen != "") setShowModalType(ModalType.Device)
    if (isBoostEarning != "") setShowModalType(ModalType.BoostEarnings)
  }, [isTransferScreen, isPopupOpen, isBoostEarning])

  const TutorialButton = () => {
    const [isTutorialShown, setTutorialShown] = useState(false)
    const handleClick = () => {
      setTutorialShown(true)
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setTutorialShown(false)
      }, 48000)
      return () => clearTimeout(timer)
    }, [isTutorialShown])

    return (
      <TutorialInfoButton onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="#fff" />
          <circle cx="32" cy="32" r="26" fill="#000" />
          <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="36" fill="#fff" fontFamily="Arial, sans-serif">
            ?
          </text>
        </svg>
        {isTutorialShown && <Tutorial />}
      </TutorialInfoButton>
    )
  }

  //call back function from BoostEarning and send state value as prop to Potential.
  const handleStateChangeForBoost = (newValue) => {
    if (newValue) {
      setIsInfoCardShown(false)
    }
    setIsCardShown(newValue)
  }

  //call back function from PotentialPanel and send state value as prop to BoostEarning.
  const handleStateChangeForPotential = (newValue) => {
    if (newValue) {
      setIsCardShown(false)
    }
    setIsInfoCardShown(newValue)
  }

  const OpenProfileCheck = () => {
    onOpenProfile()
  }

  return (
    <ScreenWrapper
      onClick={() => {
        if (isShowAccountMenu) setIsShowAccountMenu(false)
        if (isCardShown) setIsCardShown(false)
        if (isInfoCardShown) setIsInfoCardShown(false)
      }}
    >
      {isWhiteTheme && (
        <Video loop autoPlay muted data-testid="video-player" style={{ width: "100%" }}>
          <source src={vidBackground} type="video/mp4"></source>
        </Video>
      )}
      {!isWhiteTheme && (
        <Video loop autoPlay muted brighten data-testid="video-player">
          <source src={vidBackgroundDark} type="video/mp4"></source>
        </Video>
      )}
      <ModalsCtrl
        profile={profile}
        logOut={logOut}
        modalType={showModalType}
        closeModal={closeModal}
        onReferalClick={onReferalClick}
        setProfile={setProfile}
        setDevices={setDevices}
        gpuLogs={gpuLogs}
        cpuLogs={cpuLogs}
        isWhiteTheme={isWhiteTheme}
        openTransferScreen={setIsTransferScreen}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        devices={devices}
        progressPercent={availabilityPercentage}
        activeBoostEarningTab={isBoostEarning}
        setIsShowTutorial={setIsShowTutorial}
        refers={refers}
        macAddress={sysInfo?.macAddress}
        transferActiveTab={isTransferScreen}
        openChatDrawer={openChatDrawer}
        setIsBoostEarning={setIsBoostEarning}
        onOpenProfile={OpenProfileCheck}
      />
      <DrawersCtrl
        drawerType={showDrawerType}
        closeDrawer={closeDrawer}
        openProfileModal={openProfileModal}
        openAppInfoDrawer={openAppInfoDrawer}
        openGpuLogsModal={openGpuLogsModal}
        openCpuLogsModal={openCpuLogsModal}
        isRunning={isRunning}
        profile={profile}
        country={country}
        setCountry={setCountry}
        language={language}
        sysInfo={sysInfo}
        setLanguage={setLanguage}
        onToggleProcess={onToggleProcess}
        logIn={logIn}
        logOut={logOut}
        openDeviceInfoDrawer={openDeviceInfoDrawer}
        processStatus={processStatus}
        gpuLogs={gpuLogs}
        cpuLogs={cpuLogs}
        isWhiteTheme={isWhiteTheme}
        remoteDevice={remoteDevice}
        devices={devices}
        openRemoteDeviceInfoDrawer={openRemoteDeviceInfoDrawer}
        openEarnMoreModal={openEarnMoreModal}
      />
      {isShowTutorial && <Tutorial></Tutorial>}
      <Main>
        <BlurRectTopLeft></BlurRectTopLeft>
        <BlurRectBottomRight></BlurRectBottomRight>
        <LogoHyperlink>
          <span style={{ color: "var(--primary-500, #00EFC3)" }}>/</span>&nbsp;hyperlink{" "}
        </LogoHyperlink>
        <TopPanel>
          <LiveBalancePanel profile={profile} devices={devices} scale={scale} isProcessRunning={isRunning} openTransferScreen={setIsTransferScreen} isEnableAllButtons={isEnableAllButtons} openSignupLoginModal={openSignupLoginModal} />
          <AccountContainer>
            <InfoIconPanel onClick={isEnableAllButtons ? openChatDrawer : () => {}} />
            {(!profile || profile.role == Role.Guest) && <SignupButtonPanel onClick={isEnableAllButtons ? onOpenProfile : () => {}} />}
            <UserIconPanel profile={profile} isEnableAllButtons={isEnableAllButtons} openProfileModal={openProfileModalByType} onOpenProfile={onOpenProfile} onLogout={logOut} onShowMenu={setIsShowAccountMenu} isShowMenu={isShowAccountMenu} />
            {/* <TutorialButton /> */}
          </AccountContainer>
        </TopPanel>
        <BottomPanel>
          <UptimePanel isRunning={isRunning} devices={devices} progressPercent={availabilityPercentage} uptime={totalUptime} isEnableAllButtons={isEnableAllButtons} />
          <PotentialPanel onStateChange={handleStateChangeForPotential} myState={isInfoCardShown} devices={devices} setIsEnableAllButtons={setIsEnableAllButtons} />
          {showDebugPanel && <DebugPanel debugInfo={debugStats} onClose={closeDebugPanel} />}
          <BoostEarningsPanel onStateChange={handleStateChangeForBoost} myState={isCardShown} onSelectButton={setIsBoostEarning} isEnableAllButtons={isEnableAllButtons} />
          <StatsPanel
            isRunning={isRunning}
            devices={devices}
            setIsPopupOpen={setIsPopupOpen}
            progressPercent={availabilityPercentage}
            isEnableAllButtons={isEnableAllButtons}
            refers={refers}
            profile={profile}
            openSignupLoginModal={openSignupLoginModal}
          />
        </BottomPanel>
      </Main>
      <FadeInForeground />
      <Version>v-{version}</Version>
    </ScreenWrapper>
  )
}

const BlurRectTopLeft = styled.div`
  width: 497px;
  height: 499px;
  flex-shrink: 0;
  border-radius: 499px;
  opacity: 0.4;
  background: var(--primary-gradient, linear-gradient(47deg, #02aab0 0%, #00cdac 100%));
  filter: blur(200px);
  position: fixed;
  left: 0;
  top: 0;
`

const BlurRectBottomRight = styled.div`
  width: 392px;
  height: 392px;
  flex-shrink: 0;
  border-radius: 392px;
  opacity: 0.15;
  background: #fff;
  filter: blur(200px);
  position: fixed;
  right: 0;
  bottom: 0;
`