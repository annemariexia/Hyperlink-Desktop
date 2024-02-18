import React, { useState } from "react"
import styled from "styled-components"
import profileIcon from "./../../../../images/profile_circled.png"
import { Role, UserDetails } from "../system/ProfileManager"
import { ipcRenderer } from "electron"

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
  SettingSecurity = "AntiVirus",
  Earning = "Earning",
  Device = "Device",
  BoostEarnings = "BoostEarnings"
}

interface UserPanelProps {
  profile: UserDetails | null
  isEnableAllButtons?: boolean | false
  openProfileModal?: (type: ModalType) => void
  onOpenProfile?: () => void
  onLogout?: () => void
  onShowMenu?: (show: boolean) => void
  isShowMenu?: boolean | false
}

export const UserIconPanel: React.FC<UserPanelProps> = ({ profile, isEnableAllButtons, openProfileModal, onOpenProfile, onLogout, onShowMenu, isShowMenu }) => {
  let name = "Welcome, Guest"
  if (profile && profile.role != Role.Guest) {
    if (profile.username != "") {
      name = "Welcome" + (profile?.username == "" ? "" : ", " + profile.username)
      if (name.trim().length === 0) name = "Welcome" + (profile?.username == "" ? "" : ", " + profile.username) || "User"
    } else {
      const email = profile.email.split("@")[0]
      name = "Welcome, " + email
    }
  }

  const openPrivacy = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/privacy"
    })
  }

  const openTermsOfService = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org/terms-of-service"
    })
  }

  return (
    <ProfileContianer>
      <ProfileHeader
        onClick={() => {
          if (!isEnableAllButtons) return
          if (!profile || (profile && profile.role === Role.Guest)) {
            // openProfileModal(ModalType.SettingAccount)
            onOpenProfile()
            return
          }
          onShowMenu(!isShowMenu)
        }}
      >
        <IconContainer>
          {profile && profile.role != Role.Guest && profile.username != "" ? (
            <>
              <AvatarContainer>{profile.username.charAt(0).toUpperCase() + profile.username.charAt(1).toUpperCase()}</AvatarContainer>
            </>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="15" fill="#2C303A"/>
              <path d="M15 18C18.3137 18 21 15.3137 21 12C21 8.68629 18.3137 6 15 6C11.6863 6 9 8.68629 9 12C9 15.3137 11.6863 18 15 18Z" fill="#C6C9D2"/>
              <path d="M4 26.4983C5.66611 22.7026 9.96255 20 15 20C20.0375 20 24.3339 22.7026 26 26.4983C23.0555 28.6794 19.2088 30 15 30C10.7913 30 6.94466 28.6794 4 26.4983Z" fill="#C6C9D2"/>
            </svg>
          )}
        </IconContainer>
        <Text>{name.length > 50 ? name.substring(50, 0) + "..." : name}!</Text>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.6464 15.0564L7.35354 10.7635C7.15828 10.5683 7.15828 10.2517 7.35354 10.0564L8.05692 9.35305C8.25199 9.15798 8.5682 9.15776 8.76354 9.35256L12 12.58L15.2364 9.35256C15.4318 9.15776 15.748 9.15798 15.943 9.35305L16.6464 10.0564C16.8417 10.2517 16.8417 10.5683 16.6464 10.7635L12.3535 15.0564C12.1583 15.2517 11.8417 15.2517 11.6464 15.0564Z"
            fill="white"
          />
        </svg>
      </ProfileHeader>
      <ProfileContent isShow={isShowMenu}>
        <MenuList>
          <Menu
            onClick={() => {
              onShowMenu(false)
              openProfileModal(ModalType.SettingAccount)
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.66665 6.66665C6.66665 8.50497 8.1616 9.99998 9.99998 9.99998C11.8384 9.99998 13.3333 8.50497 13.3333 6.66665C13.3333 4.82832 11.8384 3.33331 9.99998 3.33331C8.1616 3.33331 6.66665 4.82832 6.66665 6.66665ZM8.33331 6.66665C8.33331 5.74664 9.08079 4.99998 9.99998 4.99998C10.9192 4.99998 11.6666 5.74664 11.6666 6.66665C11.6666 7.58581 10.9192 8.33331 9.99998 8.33331C9.08079 8.33331 8.33331 7.58581 8.33331 6.66665Z"
                  fill="#F2F2F2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.74998 16.6666C3.51988 16.6666 3.33331 16.4801 3.33331 16.25V15.8333C3.33331 12.8892 6.07501 10.8333 9.99998 10.8333C13.9249 10.8333 16.6666 12.8892 16.6666 15.8333V16.25C16.6666 16.4801 16.4801 16.6666 16.25 16.6666H3.74998ZM14.8683 15H5.13253C5.63088 13.4933 7.49418 12.5 10.0009 12.5C12.5075 12.5 14.37 13.4933 14.8683 15Z"
                  fill="#F2F2F2"
                />
              </svg>
              <MenuText>Account</MenuText>
            </div>
          </Menu>
          <Menu
            onClick={() => {
              onShowMenu(false)
              openProfileModal(ModalType.SettingPrivacy)
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 14.1671C10.69 14.1671 11.25 13.6071 11.25 12.9171C11.25 12.2271 10.69 11.6671 10 11.6671C9.31002 11.6671 8.75002 12.2271 8.75002 12.9171C8.75002 13.6071 9.31002 14.1671 10 14.1671Z" fill="#F2F2F2" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1667 8.33376V6.66709C14.1667 4.36963 12.2975 2.50043 10 2.50043C7.70256 2.50043 5.83335 4.36963 5.83335 6.66709V8.33376H5.00002C4.53982 8.33376 4.16669 8.70689 4.16669 9.16709V16.6667C4.16669 17.1269 4.53982 17.5 5.00002 17.5L15 17.5004C15.4602 17.5004 15.8334 17.1274 15.8334 16.6671V9.16709C15.8334 8.70689 15.4602 8.33376 15 8.33376H14.1667ZM5.83335 10.0004V15.8338H14.1675L14.1667 10.0004H5.83335ZM7.50002 6.66709C7.50002 5.28872 8.62164 4.16709 10 4.16709C11.3784 4.16709 12.5 5.28872 12.5 6.66709V8.33376H7.50002V6.66709Z"
                  fill="#F2F2F2"
                />
              </svg>
              <MenuText>Privacy</MenuText>
            </div>
          </Menu>
          <Menu
            onClick={() => {
              onShowMenu(false)
              openProfileModal(ModalType.SettingPayments)
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.66669 4.99998C1.66669 4.0795 2.41288 3.33331 3.33335 3.33331H16.6667C17.5872 3.33331 18.3334 4.0795 18.3334 4.99998V15C18.3334 15.9137 17.599 16.6666 16.6719 16.6666H3.33068C2.40671 16.6666 1.66669 15.917 1.66669 15V4.99998ZM16.6667 4.99998H3.33335V15H16.6667V4.99998Z"
                  fill="#F2F2F2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16667 6.66665V5.83331H10.8333V6.66665H12.5V8.33331H9.16667V9.16665H11.5833C12.0896 9.16665 12.5 9.57706 12.5 10.0833V12.4166C12.5 12.9229 12.0896 13.3333 11.5833 13.3333H10.8333V14.1666H9.16667V13.3333H7.5V11.6666H10.8333V10.8333H8.41667C7.91041 10.8333 7.5 10.4229 7.5 9.91665V7.58331C7.5 7.07705 7.91041 6.66665 8.41667 6.66665H9.16667Z"
                  fill="#F2F2F2"
                />
              </svg>
              <MenuText>Payments</MenuText>
            </div>
          </Menu>
          <Menu
            onClick={() => {
              onShowMenu(false)
              openProfileModal(ModalType.SettingSystem)
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.33335 10C3.33335 9.68579 3.35512 9.37675 3.39714 9.07412L1.89486 8.20671C1.69558 8.09165 1.62722 7.83683 1.74227 7.63755L3.8256 4.02915C3.94076 3.82987 4.19558 3.76152 4.39486 3.87667L5.89795 4.74449C6.38287 4.36536 6.92161 4.05194 7.50083 3.81757V2.08335C7.50083 1.85325 7.6874 1.66669 7.9175 1.66669H12.0842C12.3143 1.66669 12.5008 1.85325 12.5008 2.08335V3.81828C13.0798 4.05265 13.6182 4.36607 14.1028 4.745L15.6069 3.87667C15.8062 3.76152 16.061 3.82987 16.1761 4.02915L18.2594 7.63755C18.3745 7.83683 18.3062 8.09165 18.1069 8.20671L16.603 9.07503C16.645 9.37736 16.6667 9.6861 16.6667 10C16.6667 10.3139 16.645 10.6227 16.603 10.925L18.1069 11.7933C18.3062 11.9084 18.3745 12.1632 18.2594 12.3625L16.1761 15.9709C16.061 16.1702 15.8062 16.2385 15.6069 16.1234L14.1028 15.255C13.6182 15.634 13.0798 15.9474 12.5008 16.1818V17.9167C12.5008 18.1468 12.3143 18.3334 12.0842 18.3334H7.9175C7.6874 18.3334 7.50083 18.1468 7.50083 17.9167V16.1825C6.92161 15.9481 6.38287 15.6347 5.89795 15.2556L4.39486 16.1234C4.19558 16.2385 3.94076 16.1702 3.8256 15.9709L1.74227 12.3625C1.62722 12.1632 1.69558 11.9084 1.89486 11.7933L3.39714 10.9259C3.35512 10.6233 3.33335 10.3142 3.33335 10ZM10.8334 3.33335H9.16669V5.06919C7.95829 5.27183 6.89689 5.90802 6.14779 6.81226L4.64439 5.94423L3.81106 7.38761L5.31303 8.25482C5.1106 8.79814 5.00002 9.38621 5.00002 10C5.00002 10.6133 5.11039 11.2008 5.31242 11.7437L3.81024 12.6109L4.64357 14.0543L6.14667 13.1865C6.89587 14.0914 7.95768 14.7281 9.16669 14.9308V16.6667H10.8334V14.9308C12.0426 14.728 13.1046 14.0911 13.8538 13.1859L15.3581 14.0543L16.1914 12.6109L14.6878 11.7429C14.8896 11.2002 15 10.613 15 10C15 9.38641 14.8894 8.79875 14.6873 8.25564L16.1906 7.38761L15.3573 5.94423L13.8528 6.81287C13.1036 5.90833 12.042 5.27193 10.8334 5.06919V3.33335ZM6.66669 10C6.66669 11.8409 8.1591 13.3334 10 13.3334C11.8409 13.3334 13.3334 11.8409 13.3334 10C13.3334 8.1591 11.8409 6.66669 10 6.66669C8.1591 6.66669 6.66669 8.1591 6.66669 10ZM10 11.6667C10.9205 11.6667 11.6667 10.9205 11.6667 10C11.6667 9.07955 10.9205 8.33335 10 8.33335C9.07953 8.33335 8.33333 9.07955 8.33333 10C8.33333 10.9205 9.07953 11.6667 10 11.6667Z"
                  fill="#F2F2F2"
                />
              </svg>
              <MenuText>System</MenuText>
            </div>
          </Menu>
          {/* <Menu
            onClick={() => {
              onShowMenu(false)
              openProfileModal(ModalType.SettingSecurity)
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.99967 3.33335V12.5401L9.99967 16.6026L14.9997 12.5401V3.33335H4.99967ZM4.16634 1.66669C3.70611 1.66669 3.33301 2.03979 3.33301 2.50002V12.9367C3.33301 13.1877 3.44609 13.4253 3.64085 13.5834L9.47417 18.323C9.78034 18.5719 10.219 18.5719 10.5252 18.323L16.3585 13.5834C16.5533 13.4253 16.6663 13.1877 16.6663 12.9367V2.50002C16.6663 2.03979 16.2933 1.66669 15.833 1.66669H4.16634Z"
                  fill="#F2F2F2"
                />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.3102 7.28328L9.19006 11.9379L6.13281 9.39016L7.19979 8.10982L9.14248 9.72874L13.1891 6.05005L14.3102 7.28328Z" fill="#F2F2F2" />
              </svg>
              <MenuText>Antivirus</MenuText>
            </div>
          </Menu> */}
          {/* <Menu onClick={() => {
            onShowMenu(false)
            onLogout()
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.28061 4.99254C9.44333 5.15526 9.44333 5.41908 9.28061 5.5818L5.69546 9.16695H17.0836C17.3137 9.16695 17.5002 9.3535 17.5002 9.58362V10.4169C17.5002 10.6471 17.3137 10.8336 17.0836 10.8336H5.69358L9.2806 14.4206C9.44332 14.5834 9.44332 14.8472 9.2806 15.0099L8.69135 15.5992C8.52863 15.7619 8.26481 15.7619 8.10209 15.5992L2.7988 10.2958C2.63608 10.1331 2.63608 9.86931 2.7988 9.70659L8.1021 4.40329C8.26482 4.24057 8.52864 4.24057 8.69135 4.40329L9.28061 4.99254Z" fill="#F2F2F2" />
              </svg>
              <MenuText>Logout</MenuText>
            </div>
          </Menu> */}
        </MenuList>
        <Divider />
        <Footer>
          <FooterHeader>
            <FooterText>HYPERLINK</FooterText>
          </FooterHeader>
          <div style={{ height: "8px", alignSelf: "stretch" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FooterLinkUnderline className="link" onClick={openTermsOfService}> Terms of use </FooterLinkUnderline>
            <FooterLink> · </FooterLink>
            <FooterLinkUnderline className="link" onClick={openPrivacy}> Privacy policy </FooterLinkUnderline>
          </div>
        </Footer>
      </ProfileContent>
    </ProfileContianer>
  )
}

const AvatarContainer = styled.span`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary-200, #99ffec);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px; /* 366.667% */
  letter-spacing: 0.48px;
  border: 2px solid var(--primary-200, #99ffec);
  background: #181818;
  border-radius: 50%;
`

const FooterLink = styled.span`
  color: var(--primary-200, #99ffec);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.3px;
`

const FooterLinkUnderline = styled.span`
  color: var(--primary-200, #99ffec);
  font-family: Space Grotesk;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  text-decoration-line: underline;
  cursor: pointer;
  &:hover {
    color: var(--primary-500, #00efc3);
    font-family: Space Grotesk;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    text-decoration-line: underline;
  }
`

const FooterText = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 1.44px;
  text-transform: uppercase;
`

const FooterHeader = styled.div`
  display: flex;
  padding: 4px 12px 4px 0px;
  align-items: flex-start;
  gap: 10px;
`

const Footer = styled.div`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  height: 1px;
  align-self: stretch;
  background: var(--basegrey-900, #1a1a1a);
`

const MenuText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.21px;
`

const Menu = styled.div`
  display: flex;
  padding: 8px 0px 8px 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  cursor: pointer;

  &:hover {
    background: rgba(241, 241, 244, 0.05);
  }
`

const MenuList = styled.div`
  display: flex;
  padding: 8px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: 2px;
`

const ProfileContianer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`
const ProfileContent = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  width: 200px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  background: #0a0a0a;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08), 0px 2px 6px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(25px);
  z-index: 100;
`
const ProfileHeader = styled.div`
  display: flex;
  padding: 4px 8px 4px 4px;
  align-items: center;
  gap: 8px;
  border-radius: 96px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  /* hyperblur */
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(241, 241, 244, 0.2);
    div {
      color: #fff;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "liga" off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: 0.16px;
    }
  }
`

const Text = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.16px;
`
const IconContainer = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`