import React, { Dispatch, FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import ShareLinkIcon from "../../../../images/icons/sharelink.svg"
import AddDeviceIcon from "../../../../images/icons/adddevice.svg"
import InvitePeopleIcon from "../../../../images/icons/invitepeople.svg"
import KeepUptimeIcon from "../../../../images/icons/keepuptime.svg"
import ShareLinkActiveIcon from "../../../../images/icons/sharelink_active.svg"
import AddDeviceActiveIcon from "../../../../images/icons/adddevice_active.svg"
import InvitePeopleActiveIcon from "../../../../images/icons/invitepeople_active.svg"
import KeepUptimeActiveIcon from "../../../../images/icons/keepuptime_active.svg"
import { UserDetails } from "../../elements/system/ProfileManager"
import { stopEventPropagation } from "../../elements/EventListeners"

import { ShareLink } from "./ShareLink"
import { AddDevice } from "./AddDevice"
import { InviteFriend } from "./InviteFriend"
import { KeepUptime } from "./KeepUptime"

export enum ModalType {
  Profile = "Profile",
  CpuLogs = "CpuLogs",
  GpuLogs = "GpuLogs",
  CashOut = "CashOut",
  SignupLogin = "SignupLogin",
  EarnMore = "EarnMore",
  SettingAccount = "AccountMain",
  SettingPrivacy = "PrivacyMain",
  SettingPayments = "PaymentMain",
  SettingSystem = "SystemMain",
  Earning = "Earning",
  Device = "Device",
  BoostEarnings = "BoostEarnings"
}

type Props = {
  profile: UserDetails | null
  activeTab: string
  onClose: () => void
  setActiveModal: (modal: ModalType) => void
  setIsPopupOpen: (string) => void
  openSignupLoginModal?: () => void
}

const menu = [
  {
    id: "sharelink",
    text: "Share link",
    icon: ShareLinkIcon,
    activeIcon: ShareLinkActiveIcon
  },
  {
    id: "adddevice",
    text: "Add devices",
    icon: AddDeviceIcon,
    activeIcon: AddDeviceActiveIcon
  },
  {
    id: "invitefriend",
    text: "Invite friends",
    icon: InvitePeopleIcon,
    activeIcon: InvitePeopleActiveIcon
  },
  {
    id: "keepuptime",
    text: "Keep uptime",
    icon: KeepUptimeIcon,
    activeIcon: KeepUptimeActiveIcon
  }
]

export const BoostEarnings: FC<Props> = ({ profile, activeTab, onClose, setActiveModal, setIsPopupOpen }): ReactElement => {
  const [activeMenu, setActiveMenu] = useState(activeTab)

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="title">Boost Earnings</div>
        <div className="menuPanel">
          {menu.map((item, index) => {
            return (
              <div
                key={index}
                className={`menu ${item.id === activeMenu ? "active" : ""}`}
                onClick={() => {
                  setActiveMenu(item.id)
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
        {activeMenu == menu[0].id && <ShareLink profile={profile} onClose={onClose} onSetModal={setActiveModal} setIsPopupOpen={setIsPopupOpen}></ShareLink>}
        {activeMenu == menu[1].id && <AddDevice profile={profile} onClose={onClose} onSetModal={setActiveModal}></AddDevice>}
        {activeMenu == menu[2].id && <InviteFriend profile={profile} onClose={onClose} onSetModal={setActiveModal} setIsPopupOpen={setIsPopupOpen}></InviteFriend>}
        {activeMenu == menu[3].id && <KeepUptime profile={profile} onClose={onClose} onSetModal={setActiveModal} setIsPopupOpen={setIsPopupOpen}></KeepUptime>}
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
