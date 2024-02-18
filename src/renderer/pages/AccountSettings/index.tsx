import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import styled from "styled-components"
import imgUser from "./../../../../images/icon-user.svg"
import imgLock from "./../../../../images/icon-lock.svg"
import imgCard from "./../../../../images/icon-payments.svg"
import imgSystem from "./../../../../images/icon-system.svg"
import imgSecurity from "./../../../../images/icon-security.png"
import imgSecurityInActive from "./../../../../images/icon-security-inActive.png"
import imgUserActive from "./../../../../images/icon-user-active.svg"
import imgLockActive from "./../../../../images/icon-lock-active.svg"
import imgCardActive from "./../../../../images/icon-payments-active.svg"
import imgSystemActive from "./../../../../images/icon-system-active.svg"
import imgAntivirus from "./../../../../images/icon-antivirus.svg"
import imgAntivirusActive from "./../../../../images/icon-antivirus-active.svg"
import { Account } from "./Account"
import { AccountEdit } from "./AccountEdit"
import { Privacy } from "./Privacy"
import { PrivacyVerifyPassword } from "./PrivacyVerifyPassword"
import { PrivacyEditPassword } from "./PrivacyEditPassword"
import { PrivacyEditPhoneNumber } from "./PrivacyEditPhoneNumber"
import { PrivacyManageAccount } from "./PrivacyManageAccount"
import { PrivacyDeleteAccount } from "./PrivacyDeleteAccount"
import { Payment } from "./Payment"
import { PaymentEdit } from "./PaymentEdit"
import { System } from "./System"
import { AntiVirus } from "./AntiVirus"
import { UserDetails } from "../../elements/system/ProfileManager"
import { stopEventPropagation } from "../../elements/EventListeners"

type Props = {
  profile: UserDetails | null
  onClose
  logout: () => void
  type: string
  setActiveModal: (modal: string) => void
  setProfile
}

const menu = [
  { id: "AccountMain", text: "Account", icon: imgUser, activeIcon: imgUserActive },
  { id: "PrivacyMain", text: "Privacy", icon: imgLock, activeIcon: imgLockActive },
  { id: "PaymentMain", text: "Payments", icon: imgCard, activeIcon: imgCardActive },
  { id: "SystemMain", text: "System", icon: imgSystem, activeIcon: imgSystemActive },
  // { id: "AntiVirus", text: "Antivirus", icon: imgAntivirus, activeIcon: imgAntivirusActive },
]

const pageType = {
  AccountMain: "AccountMain",
  AccountDetail: "AccountDetail",
  PrivacyMain: "PrivacyMain",
  PrivacyEditPassword: "PrivacyEditPassword",
  PrivacyDeleteAccount: "PrivacyDeleteAccount",
  PrivacyEditPhoneNumber: "PrivacyEditPhoneNumber",
  PrivacyManageAccount: "PrivacyManageAccount",
  PrivacyVerifyPassword: "PrivacyVerifyPassword",
  PaymentMain: "PaymentMain",
  PaymentEdit: "PaymentEdit",
  SystemMain: "SystemMain",
  AntiVirus: "AntiVirus"
};

export const SettingsScreen: FC<Props> = ({ profile, onClose, logout, type, setActiveModal, setProfile }): ReactElement => {
  const [activeMenu, setActiveMenu] = useState(type)
  const [activePage, setActivePage] = useState(type)
  const [userName, setUserName] = useState(profile?.username)
  const [isCloseButtonHover, setIsCloseButtonHover] = useState(false)

  const setUserFullName = (name: string) => {
    setUserName(name)
  }

  const signOut = () => {
    logout()
  }
  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="title">Settings</div>
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
                  <img src={item.id === activeMenu ? item.activeIcon : item.icon} style={{ width: 20, height: 20 }} />
                </div>
                <div className="menuText">{item.text}</div>
              </div>
            )
          })}
        </div>
        <div
          className="signOut"
          onMouseEnter={() => {
            setIsCloseButtonHover(true)
          }}
          onMouseLeave={() => {
            setIsCloseButtonHover(false)
          }}
          onClick={() => signOut()}
        >
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20, justifyContent: "center", display: "flex" }}>
              <path
                d="M9.27963 4.99254C9.44235 5.15526 9.44235 5.41908 9.27963 5.5818L5.69448 9.16695H17.0826C17.3127 9.16695 17.4993 9.3535 17.4993 9.58362V10.4169C17.4993 10.6471 17.3127 10.8336 17.0826 10.8336H5.6926L9.27963 14.4206C9.44235 14.5834 9.44235 14.8472 9.27963 15.0099L8.69037 15.5992C8.52765 15.7619 8.26383 15.7619 8.10112 15.5992L2.79782 10.2958C2.6351 10.1331 2.6351 9.86931 2.79782 9.70659L8.10112 4.40329C8.26384 4.24057 8.52766 4.24057 8.69038 4.40329L9.27963 4.99254Z"
                fill={"#F2F2F2"}
              />
            </svg>
          </div>
          <div className="signOutText">Logout</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="rightPanel">
        {(!pageType || activePage == pageType.AccountMain) && <Account profile={profile} fullname={userName} onClose={onClose} onSetPage={setActivePage} setActiveModal={setActiveModal} />}
        {(!pageType || activePage == pageType.AccountDetail) && <AccountEdit profile={profile} fullname={userName} setName={setUserFullName} onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PrivacyMain) && <Privacy onClose={onClose} onSetPage={setActivePage} profile={profile} setActiveModal={setActiveModal} />}
        {(!pageType || activePage == pageType.PrivacyVerifyPassword) && <PrivacyVerifyPassword profile={profile} onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PrivacyEditPassword) && <PrivacyEditPassword profile={profile} onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PrivacyEditPhoneNumber) && <PrivacyEditPhoneNumber onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PrivacyManageAccount) && <PrivacyManageAccount onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PrivacyDeleteAccount) && <PrivacyDeleteAccount profile={profile} onClose={onClose} onSetPage={setActivePage} />}
        {(!pageType || activePage == pageType.PaymentMain) && <Payment profile={profile} onClose={onClose} onSetPage={setActivePage} setActiveModal={setActiveModal} />}
        {(!pageType || activePage == pageType.PaymentEdit) && <PaymentEdit profile={profile} onClose={onClose} onSetPage={setActivePage} setProfile={setProfile} />}
        {(!pageType || activePage == pageType.SystemMain) && <System onClose={onClose} profile={profile} setActiveModal={setActiveModal} />}
        {(!pageType || activePage == pageType.AntiVirus) && <AntiVirus onClose={onClose} profile={profile} setActiveModal={setActiveModal} />}
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
  width: var(--FormWidth);
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
    width: var(--LeftPanelWidth);
    height: var(--FormHeight);
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
    .title {
      padding: 24px 24px 24px 36px;
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
    }
    .menuPanel {
      padding: 16px 10px 0px 10px;
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
        height: 48px;
        padding: 0px 12px 0px 24px;
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
    width: var(--RightPanelWidth);
    padding: 0px 0px 38px 0px;
    align-items: flex-start;
    border-radius: 0px 12px 12px 0px;
    background: #0a0a0a;
  }
  .signOut {
    margin: 410px 10px 24px 10px;
    cursor: pointer;
    display: inline-flex;
    padding: 0px 12px 0px 24px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-radius: 8px;

      .signOutText {
        color: var(--basegrey-50, #F2F2F2);
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
        letter-spacing: 0.21px;
        display: flex;
        width: 192px;
        height: 48px;
        flex-direction: column;
        justify-content: center;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`
