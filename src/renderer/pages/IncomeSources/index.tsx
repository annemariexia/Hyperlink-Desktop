import React, { Dispatch, FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { ipcRenderer } from "electron"
import { ApiCommand, ApiMessage } from "src/renderer/elements/system/System"
import IncomeSummary from "../../../../images/icons/income-summary.svg"
import IncomeSummaryActive from "../../../../images/icons/income-summary-active.svg"
import IncomeDevice from "../../../../images/icons/income-device.svg"
import IncomeDeviceActive from "../../../../images/icons/income-device-active.svg"
import IncomeReferral from "../../../../images/icons/income-referral.svg"
import IncomeReferralActive from "../../../../images/icons/income-referral-active.svg"
import { CPU_POTENTIAL_EARNING_YRLY, GPU_POTENTIAL_EARNING_YRLY } from "../../common/Constants"

import { UserDetails } from "../../elements/system/ProfileManager"
import { stopEventPropagation } from "../../elements/EventListeners"

import { Summary } from "./Summary"
import { Devices } from "./Devices"
import { Referrals } from "./Referrals"
import { DeviceDetails } from "./DeviceDetails"

type Props = {
  activeTab: string
  profile: UserDetails
  devices: any
  refers: any
  onClose: () => void
  macAddress: string
  setIsBoostEarning(boost: string)
}

const menu = [
  {
    id: "summary",
    text: "Summary",
    icon: IncomeSummary,
    activeIcon: IncomeSummaryActive
  },
  {
    id: "devices",
    text: "My devices",
    icon: IncomeDevice,
    activeIcon: IncomeDeviceActive
  },
  {
    id: "referrals",
    text: "Referrals",
    icon: IncomeReferral,
    activeIcon: IncomeReferralActive
  }
]

const pages = {
  summary: "summary",
  devices: "devices",
  devicedetails: "devicedetails",
  referrals: "referrals"
}

export const IncomeSources: FC<Props> = ({ activeTab, profile, devices, refers, onClose, macAddress, setIsBoostEarning }): ReactElement => {
  const [activeMenu, setActiveMenu] = useState(activeTab)
  const [activePage, setActivePage] = useState(activeTab)
  const [totalEarnings, setTotalEarnings] = useState(null)
  const [deviceEarnings, setDeviceEarnings] = useState(null)
  const [referEarnings, setReferEarnings] = useState(0)
  const [deviceListDetails, setDeviceListDetails] = useState([])
  const [currentDevice, setCurrentDevice] = useState(null)

  const getDeviceDetail = (device) => {

    let cores = 0
    let ramSize = 0

    const singleMatch = device.details.match(/single core/)
    const coresMatch = device.details.match(/(\d+) cores/)
    if (singleMatch) {
      cores = 1 + cores
    } else if (coresMatch) {
      cores = cores + parseInt(coresMatch[1])
    }
    const ramMatch = device.details.match(/GPUVram: (\d+)/)
    if (ramMatch) {
      ramSize = ramSize + parseInt(ramMatch[1])
    }

    const potentialEarningsYrly = cores * CPU_POTENTIAL_EARNING_YRLY + ramSize * GPU_POTENTIAL_EARNING_YRLY
    const lifeEarnings = potentialEarningsYrly * 6.5

    const cpuDetailMatch = device.details.match(/CPUs:\s(.*?)(?:\sCPU\s@\s\d+\.\d+GHz)?,/)
    const gpuDetailMatches = device.details.match(/GPU\s(.*?)(?=\s*\n|$)/g)
    const cpuDetail = cpuDetailMatch && cpuDetailMatch[1].trim();
    const gpuDetail = gpuDetailMatches && gpuDetailMatches.map((gpu) => gpu.replace("GPU", "").trim());

    const computer = (device.details.includes("Intel")) ? "windows" : "apple"
    const version = device.details.match(/Ver\. \d+\.\d+\.\d+/)
    const totalRam = device.details.match(/RAM: (\d+Gb)/)

    return {
      device: device,
      lifeEarnings: lifeEarnings,
      potentialEarningsYrly: potentialEarningsYrly,
      uptime: 0,
      uptimeTotal: 123123,
      os: "windows 11",
      version: "Hypervisor " + (version ? version[0] : ""),
      computer: computer,
      cores: cores,
      rams: ramSize,
      totalRam: totalRam ? totalRam[0] : "",
      cpuDetail: cpuDetail,
      gpuDetail: gpuDetail
    }
  }

  useEffect(() => {
    const deviceList = []
    devices.map((device) => {
      const deviceDetail = getDeviceDetail(device)
      deviceList.push(deviceDetail)
      setDeviceListDetails(deviceList)
    })
  }, [devices])

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="title">Income Sources</div>
        <div className="menuPanel">
          {menu.map((item, index) => {
            return (
              <div
                key={index}
                className={`menu ${item.id === activeMenu ? "active" : ""}`}
                onClick={() => {
                  setActiveMenu(item.id)
                  setActivePage(item.id)
                }}
              >
                <div className="icon">
                  <img src={(item.id === activeMenu) ? item.activeIcon : item.icon} style={{ width: 20, height: 20 }}></img>
                </div>
                <div className="menuText">{item.text}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="divider"></div>
      <div className="rightPanel" style={{
        width: "728px",
        background: "#0A0A0A"
      }}>
        {(!pages || activePage == pages.summary) && <Summary profile={profile} onClose={onClose} devices={deviceListDetails} deviceEarnings={deviceEarnings} refers={refers} referEarnings={referEarnings} totalEarnings={totalEarnings} setActiveMenu={setActiveMenu} setActivePage={setActivePage} setIsBoostEarning={setIsBoostEarning}></Summary>}
        {(!pages || activePage == pages.devices) && <Devices profile={profile} onClose={onClose} devices={deviceListDetails} deviceEarnings={deviceEarnings} setActivePage={setActivePage} setCurrentDevice={setCurrentDevice} macAddress={macAddress} setIsBoostEarning={setIsBoostEarning}></Devices>}
        {(!pages || activePage == pages.referrals) && <Referrals profile={profile} onClose={onClose} refers={refers} referEarnings={referEarnings} setIsBoostEarning={setIsBoostEarning}></Referrals>}
        {(!pages || activePage == pages.devicedetails) && <DeviceDetails profile={profile} onClose={onClose} device={currentDevice} setActivePage={setActivePage} macAddress={macAddress}></DeviceDetails>}
      </div>
    </Form>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(25px);
  z-index: 15;
`

const Form = styled.div`
  width: 844px;
  height: var(--FormHeight);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  .divider {
    width: 1px;
    height: var(--FormHeight);
    background: rgba(255, 255, 255, 0.15);
  }
  .leftPanel {
    width: 283px;
    height: var(--FormHeight);
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
    .title {
      margin-left: 36px;
      margin-top: 24px;
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
    }
    .menuPanel {
      margin-top: 40px;
      margin-left: 10px;
      margin-right: 10px;
      .menu {
        &.active {
          background: rgba(255, 255, 255, 0.1);
          .menuText {
            display: flex;
            width: 192px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-family: Manrope;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: 0.21px;
          }
        }
        cursor: pointer;
        display: flex;
        padding: 6px 12px 6px 24px;
        align-items: center;
        gap: 16px;
        align-self: stretch;
        border-radius: 8px;
        .menuText {
          display: flex;
          width: 192px;
          height: 36px;
          flex-direction: column;
          justify-content: center;
          color: var(--basegrey-50, #f2f2f2);
          font-size: 14px;
          font-family: Manrope;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.21px;
        }
        &:not(.active):hover {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
    .menuDivider {
      margin-top: 100px;
      margin-bottom: 16px;
      margin-left: 14px;
      border-radius: 1px;
      background: rgba(255, 255, 255, 0.15);
      width: 340px;
      height: 1px;
      flex-shrink: 0;
    }
    .card {
      margin-left: 18px;
    }
    .cardImage {
      margin-top: 24px;
      width: 335px;
      border-radius: 8px;
      background: var(--dark-black, #0E0D17);
    }
    .bottomText {
      margin-left: 18px;
      margin-top: 18px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-self: stretch;
      color: #fff;
      font-size: 24px;
      font-family: Space Grotesk;
      font-weight: 500;
      line-height: 35px;
      letter-spacing: -0.6px;
    }
    .learnMore {
      display: flex;
      align-items: center;
      a {
        margin-left: 18px;
        color: var(--cybergreen-400, #33ffda);
        font-size: 16px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0.21px;
      }
      img {
        margin-left: 8px;
      }
    }
  }
  .rightPanel {
    width: 560px;
    padding: 0px 0px 38px 0px;
    align-items: flex-start;
    border-radius: 0px 12px 12px 0px;
    background: #0a0a0a;
  }
`
