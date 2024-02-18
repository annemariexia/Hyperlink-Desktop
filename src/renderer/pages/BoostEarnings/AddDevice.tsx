import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"
import { ipcRenderer } from "electron"
import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails, Role } from "../../elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import AtHomeIcon from "/images/boost/AtHome.svg"
import AtWorkIcon from "/images/boost/AtWork.svg"
import AtCampusIcon from "/images/boost/AtCampus.svg"
import ServerFarmIcon from "/images/boost/ServerFarm.svg"
import DeviceSVG from "/images/boost_new/devices.svg"
import { CreateAccountContainer } from "./ShareLink"

type Props = {
  profile: UserDetails
  onClose()
  onSetModal: (modal: string) => void
}

export const AddDevice: FC<Props> = ({ profile, onClose, onSetModal}): ReactElement => {
  

  const OpenLink = () => {
    ipcRenderer.send("OpenBrowser", {
      link: "https://www.hyperlink.org"
    })
  }
  const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>Add devices</ModalHeaderText>
        <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Section>
          <Description>
            <div style={{ width: "244px" }}>
              <DescriptionTopTitle style={{ marginBottom: 8 }}>Build your network</DescriptionTopTitle>
              <DescriptionTitle style={{ marginBottom: 16 }}>Multiply earnings by connecting more computers</DescriptionTitle>
              <DescriptionContent>
                <a style={{ fontWeight: 600, color: "var(--info-500, #1EE5FF)" }}>2x</a> <a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>your earnings</a> by connecting <br></br><a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>another computer.</a> Earn up to <br></br> $86,000/year by connecting <br></br> 10 computers.
              </DescriptionContent>
            </div>
            <img src={DeviceSVG}></img>
          </Description>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>01</SectionNumber>
            <SectionTitle>Find another device</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <PlaceItemContainer>
              <PlaceItem>
                <ItemIcon src={AtHomeIcon}></ItemIcon>
                <ItemLabel>At home</ItemLabel>
              </PlaceItem>
              <PlaceItem>
                <ItemIcon src={AtWorkIcon}></ItemIcon>
                <ItemLabel>At work</ItemLabel>
              </PlaceItem>
              <PlaceItem>
                <ItemIcon src={AtCampusIcon}></ItemIcon>
                <ItemLabel>At campus</ItemLabel>
              </PlaceItem>
              <PlaceItem>
                <ItemIcon src={ServerFarmIcon}></ItemIcon>
                <ItemLabel>Server farm</ItemLabel>
              </PlaceItem>
            </PlaceItemContainer>
          </SectionContent>
          <Divider></Divider>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>02</SectionNumber>
            <SectionTitle>Download Hyperlink</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <CopyContainer onClick={() => {
              OpenLink()
            }} style={{ cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#C6C9D2" />
              </svg>
              <LinkCopier>
                www.hyperlink.org
              </LinkCopier>
            </CopyContainer>
          </SectionContent>
          <Divider></Divider>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>03</SectionNumber>
            <SectionTitle>Log into your account</SectionTitle>
          </SectionHeader>
          {isGuestOrNoProfile ? 
          <SectionContent>
            <CreateAccountContainer onClick={() => onSetModal("SignupLogin")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 3H15.75C16.1642 3 16.5 3.33577 16.5 3.75V14.25C16.5 14.6642 16.1642 15 15.75 15H2.25C1.83582 15 1.5 14.6642 1.5 14.25V3.75C1.5 3.33577 1.83582 3 2.25 3ZM13.9394 4.5H4.06064L9 9.43936L13.9394 4.5ZM3 5.56064V13.5H15V5.56064L9.26514 11.2955C9.11874 11.442 8.88126 11.442 8.73486 11.2955L3 5.56064Z" fill="#0B0C0E"/>
              </svg>
              {"Create Your Account ->"}
            </CreateAccountContainer>
          </SectionContent>
          :
          <SectionContent>
            <CopyContainer>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 3H15.75C16.1642 3 16.5 3.33577 16.5 3.75V14.25C16.5 14.6642 16.1642 15 15.75 15H2.25C1.83582 15 1.5 14.6642 1.5 14.25V3.75C1.5 3.33577 1.83582 3 2.25 3ZM13.9394 4.5H4.06064L9 9.43936L13.9394 4.5ZM3 5.56064V13.5H15V5.56064L9.26514 11.2955C9.11874 11.442 8.88126 11.442 8.73486 11.2955L3 5.56064Z" fill="#CCCCCC" />
              </svg>
              <LinkCopier>
                {profile?.email}
              </LinkCopier>
            </CopyContainer>
          </SectionContent>}
          <Divider></Divider>
        </Section>
        <Section>
          <SectionContent>
            <DownloadContainer>
              <DownloadTitle>Mass downloader</DownloadTitle>
              <DownloadDescription>
                For downloading on hundreds or thousands computers on your network at a time.
              </DownloadDescription>
              <DownloadButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.8333 2.91667V10.4883L12.4496 8.87213C12.6123 8.70941 12.8761 8.70941 13.0388 8.87213L13.6279 9.46121C13.7906 9.62392 13.7906 9.88774 13.6279 10.0505L10.2946 13.3837C10.1319 13.5464 9.8681 13.5464 9.70539 13.3837L6.37214 10.0505C6.20942 9.88774 6.20942 9.62392 6.37214 9.46121L6.96122 8.87213C7.12394 8.70941 7.38776 8.70941 7.55047 8.87213L9.16668 10.4883V2.91667C9.16668 2.68655 9.35323 2.5 9.58335 2.5H10.4167C10.6468 2.5 10.8333 2.68655 10.8333 2.91667Z" fill="#F2F2F2"/>
                <path d="M2.91667 12.5C2.68655 12.5 2.5 12.6865 2.5 12.9167V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V12.9167C17.5 12.6865 17.3135 12.5 17.0833 12.5H16.25C16.0199 12.5 15.8333 12.6865 15.8333 12.9167V15.8333H4.16667V12.9167C4.16667 12.6865 3.98012 12.5 3.75 12.5H2.91667Z" fill="#F2F2F2"/>
              </svg>
                <DownloadButtonLabel>Request download</DownloadButtonLabel>
              </DownloadButton>
              <svg width="172" height="138" viewBox="0 0 172 138" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "57%", marginTop: "-44%" }}>
                <g clipPath="url(#clip0_2640_15467)">
                  <rect width="172" height="138" rx="8" fill="#0E0D17" />
                  <mask id="mask0_2640_15467" maskUnits="userSpaceOnUse" x="0" y="-83" width="375" height="304">
                    <rect y="-83" width="375" height="304" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_2640_15467)">
                    <g filter="url(#filter0_f_2640_15467)">
                      <ellipse cx="407.629" cy="-83.6353" rx="285.971" ry="218.963" transform="rotate(-90 407.629 -83.6353)" fill="url(#paint0_angular_2640_15467)" />
                    </g>
                    <g filter="url(#filter1_f_2640_15467)">
                      <ellipse cx="281.981" cy="224.079" rx="281.981" ry="224.079" transform="matrix(0.200978 -0.979596 0.943874 0.330307 -229.636 597.422)" fill="url(#paint1_angular_2640_15467)" />
                    </g>
                  </g>
                  <g filter="url(#filter2_f_2640_15467)">
                    <path d="M71.375 99.375H70.25V92.625C70.25 91.7299 69.8944 90.8715 69.2615 90.2385C68.6286 89.6056 67.7701 89.25 66.875 89.25H55.625C54.7299 89.25 53.8714 89.6056 53.2385 90.2385C52.6056 90.8715 52.25 91.7299 52.25 92.625V99.375H51.125C50.8266 99.375 50.5405 99.4935 50.3295 99.7045C50.1185 99.9155 50 100.202 50 100.5V101.625C50 102.52 50.3556 103.379 50.9885 104.011C51.6214 104.644 52.4799 105 53.375 105H69.125C70.0201 105 70.8786 104.644 71.5115 104.011C72.1444 103.379 72.5 102.52 72.5 101.625V100.5C72.5 100.202 72.3815 99.9155 72.1705 99.7045C71.9595 99.4935 71.6734 99.375 71.375 99.375ZM54.5 92.625C54.5 92.3266 54.6185 92.0405 54.8295 91.8295C55.0405 91.6185 55.3266 91.5 55.625 91.5H66.875C67.1734 91.5 67.4595 91.6185 67.6705 91.8295C67.8815 92.0405 68 92.3266 68 92.625V99.375H54.5V92.625ZM69.125 102.75H53.375C53.0766 102.75 52.7905 102.631 52.5795 102.42C52.3685 102.21 52.25 101.923 52.25 101.625H70.25C70.25 101.923 70.1315 102.21 69.9205 102.42C69.7095 102.631 69.4234 102.75 69.125 102.75Z" fill="#99FFEC" />
                    <path d="M96.125 99.375H95V92.625C95 91.7299 94.6444 90.8715 94.0115 90.2385C93.3785 89.6056 92.5201 89.25 91.625 89.25H80.375C79.4799 89.25 78.6214 89.6056 77.9885 90.2385C77.3556 90.8715 77 91.7299 77 92.625V99.375H75.875C75.5766 99.375 75.2905 99.4935 75.0795 99.7045C74.8685 99.9155 74.75 100.202 74.75 100.5V101.625C74.75 102.52 75.1056 103.379 75.7385 104.011C76.3714 104.644 77.2299 105 78.125 105H93.875C94.7701 105 95.6285 104.644 96.2615 104.011C96.8944 103.379 97.25 102.52 97.25 101.625V100.5C97.25 100.202 97.1315 99.9155 96.9205 99.7045C96.7095 99.4935 96.4234 99.375 96.125 99.375ZM79.25 92.625C79.25 92.3266 79.3685 92.0405 79.5795 91.8295C79.7905 91.6185 80.0766 91.5 80.375 91.5H91.625C91.9234 91.5 92.2095 91.6185 92.4205 91.8295C92.6315 92.0405 92.75 92.3266 92.75 92.625V99.375H79.25V92.625ZM93.875 102.75H78.125C77.8266 102.75 77.5405 102.631 77.3295 102.42C77.1185 102.21 77 101.923 77 101.625H95C95 101.923 94.8815 102.21 94.6705 102.42C94.4595 102.631 94.1734 102.75 93.875 102.75Z" fill="#99FFEC" />
                    <path d="M120.875 99.375H119.75V92.625C119.75 91.7299 119.394 90.8715 118.761 90.2385C118.129 89.6056 117.27 89.25 116.375 89.25H105.125C104.23 89.25 103.371 89.6056 102.739 90.2385C102.106 90.8715 101.75 91.7299 101.75 92.625V99.375H100.625C100.327 99.375 100.04 99.4935 99.8295 99.7045C99.6185 99.9155 99.5 100.202 99.5 100.5V101.625C99.5 102.52 99.8556 103.379 100.489 104.011C101.121 104.644 101.98 105 102.875 105H118.625C119.52 105 120.379 104.644 121.011 104.011C121.644 103.379 122 102.52 122 101.625V100.5C122 100.202 121.881 99.9155 121.67 99.7045C121.46 99.4935 121.173 99.375 120.875 99.375ZM104 92.625C104 92.3266 104.119 92.0405 104.33 91.8295C104.54 91.6185 104.827 91.5 105.125 91.5H116.375C116.673 91.5 116.96 91.6185 117.17 91.8295C117.381 92.0405 117.5 92.3266 117.5 92.625V99.375H104V92.625ZM118.625 102.75H102.875C102.577 102.75 102.29 102.631 102.08 102.42C101.869 102.21 101.75 101.923 101.75 101.625H119.75C119.75 101.923 119.631 102.21 119.42 102.42C119.21 102.631 118.923 102.75 118.625 102.75Z" fill="#99FFEC" />
                    <path d="M60.125 87C60.4234 87 60.7095 86.8815 60.9205 86.6705C61.1315 86.4595 61.25 86.1734 61.25 85.875V79.125H82.832C83.0001 79.5955 83.2705 80.0229 83.6238 80.3762C83.9771 80.7295 84.4045 80.9999 84.875 81.168V85.875C84.875 86.1734 84.9935 86.4595 85.2045 86.6705C85.4155 86.8815 85.7016 87 86 87C86.2984 87 86.5845 86.8815 86.7955 86.6705C87.0065 86.4595 87.125 86.1734 87.125 85.875V81.168C87.5955 80.9999 88.0229 80.7295 88.3762 80.3762C88.7295 80.0229 88.9999 79.5955 89.168 79.125H110.75V85.875C110.75 86.1734 110.869 86.4595 111.08 86.6705C111.29 86.8815 111.577 87 111.875 87C112.173 87 112.46 86.8815 112.67 86.6705C112.881 86.4595 113 86.1734 113 85.875V78C113 77.7016 112.881 77.4155 112.67 77.2045C112.46 76.9935 112.173 76.875 111.875 76.875H89.168C88.9974 76.3981 88.7216 75.9657 88.3611 75.6099C88.0006 75.2541 87.5647 74.984 87.0856 74.8196C87.1051 74.7562 87.1183 74.691 87.125 74.625V69H100.625C101.52 69 102.379 68.6444 103.011 68.0115C103.644 67.3786 104 66.5201 104 65.625V61.125C103.997 60.4295 103.779 59.7518 103.377 59.1847C102.974 58.6176 102.406 58.1888 101.75 57.957V56.418C102.406 56.1862 102.974 55.7574 103.377 55.1903C103.779 54.6232 103.997 53.9455 104 53.25V48.75C103.997 48.0545 103.779 47.3768 103.377 46.8097C102.974 46.2426 102.406 45.8138 101.75 45.582V44.043C102.406 43.8112 102.974 43.3824 103.377 42.8153C103.779 42.2482 103.997 41.5705 104 40.875V36.375C104 35.4799 103.644 34.6214 103.011 33.9885C102.379 33.3556 101.52 33 100.625 33H71.375C70.4799 33 69.6214 33.3556 68.9885 33.9885C68.3556 34.6214 68 35.4799 68 36.375V40.875C68.0029 41.5705 68.2206 42.2482 68.6234 42.8153C69.0261 43.3824 69.5942 43.8112 70.25 44.043V45.582C69.5942 45.8138 69.0261 46.2426 68.6234 46.8097C68.2206 47.3768 68.0029 48.0545 68 48.75V53.25C68.0029 53.9455 68.2206 54.6232 68.6234 55.1903C69.0261 55.7574 69.5942 56.1862 70.25 56.418V57.957C69.5942 58.1888 69.0261 58.6176 68.6234 59.1847C68.2206 59.7518 68.0029 60.4295 68 61.125V65.625C68 66.5201 68.3556 67.3786 68.9885 68.0115C69.6214 68.6444 70.4799 69 71.375 69H84.875V74.625C84.8817 74.691 84.8949 74.7562 84.9144 74.8196C84.4353 74.984 83.9994 75.2541 83.6389 75.6099C83.2784 75.9657 83.0026 76.3981 82.832 76.875H60.125C59.8266 76.875 59.5405 76.9935 59.3295 77.2045C59.1185 77.4155 59 77.7016 59 78V85.875C59 86.1734 59.1185 86.4595 59.3295 86.6705C59.5405 86.8815 59.8266 87 60.125 87ZM77 57.75V56.625H95V57.75H77ZM72.5 56.625H74.75V57.75H72.5V56.625ZM97.25 56.625H99.5V57.75H97.25V56.625ZM77 45.375V44.25H95V45.375H77ZM72.5 44.25H74.75V45.375H72.5V44.25ZM97.25 44.25H99.5V45.375H97.25V44.25ZM70.25 36.375C70.25 36.0766 70.3685 35.7905 70.5795 35.5795C70.7905 35.3685 71.0766 35.25 71.375 35.25H100.625C100.923 35.25 101.21 35.3685 101.42 35.5795C101.631 35.7905 101.75 36.0766 101.75 36.375V40.875C101.75 41.1734 101.631 41.4595 101.42 41.6705C101.21 41.8815 100.923 42 100.625 42H71.375C71.0766 42 70.7905 41.8815 70.5795 41.6705C70.3685 41.4595 70.25 41.1734 70.25 40.875V36.375ZM70.25 48.75C70.25 48.4516 70.3685 48.1655 70.5795 47.9545C70.7905 47.7435 71.0766 47.625 71.375 47.625H100.625C100.923 47.625 101.21 47.7435 101.42 47.9545C101.631 48.1655 101.75 48.4516 101.75 48.75V53.25C101.75 53.5484 101.631 53.8345 101.42 54.0455C101.21 54.2565 100.923 54.375 100.625 54.375H71.375C71.0766 54.375 70.7905 54.2565 70.5795 54.0455C70.3685 53.8345 70.25 53.5484 70.25 53.25V48.75ZM70.25 65.625V61.125C70.25 60.8266 70.3685 60.5405 70.5795 60.3295C70.7905 60.1185 71.0766 60 71.375 60H100.625C100.923 60 101.21 60.1185 101.42 60.3295C101.631 60.5405 101.75 60.8266 101.75 61.125V65.625C101.75 65.9234 101.631 66.2095 101.42 66.4205C101.21 66.6315 100.923 66.75 100.625 66.75H71.375C71.0766 66.75 70.7905 66.6315 70.5795 66.4205C70.3685 66.2095 70.25 65.9234 70.25 65.625ZM86 76.875C86.2225 76.875 86.44 76.941 86.625 77.0646C86.81 77.1882 86.9542 77.3639 87.0394 77.5695C87.1245 77.775 87.1468 78.0012 87.1034 78.2195C87.06 78.4377 86.9528 78.6382 86.7955 78.7955C86.6382 78.9528 86.4377 79.06 86.2195 79.1034C86.0012 79.1468 85.775 79.1245 85.5695 79.0394C85.3639 78.9542 85.1882 78.81 85.0646 78.625C84.941 78.44 84.875 78.2225 84.875 78C84.875 77.7016 84.9935 77.4155 85.2045 77.2045C85.4155 76.9935 85.7016 76.875 86 76.875Z" fill="#99FFEC" />
                    <path d="M99.5 38.625C100.121 38.625 100.625 38.1213 100.625 37.5C100.625 36.8787 100.121 36.375 99.5 36.375C98.8787 36.375 98.375 36.8787 98.375 37.5C98.375 38.1213 98.8787 38.625 99.5 38.625Z" fill="#99FFEC" />
                    <path d="M96.125 38.625C96.7463 38.625 97.25 38.1213 97.25 37.5C97.25 36.8787 96.7463 36.375 96.125 36.375C95.5037 36.375 95 36.8787 95 37.5C95 38.1213 95.5037 38.625 96.125 38.625Z" fill="#99FFEC" />
                    <path d="M92.75 38.625C93.3713 38.625 93.875 38.1213 93.875 37.5C93.875 36.8787 93.3713 36.375 92.75 36.375C92.1287 36.375 91.625 36.8787 91.625 37.5C91.625 38.1213 92.1287 38.625 92.75 38.625Z" fill="#99FFEC" />
                    <path d="M99.5 51C100.121 51 100.625 50.4963 100.625 49.875C100.625 49.2537 100.121 48.75 99.5 48.75C98.8787 48.75 98.375 49.2537 98.375 49.875C98.375 50.4963 98.8787 51 99.5 51Z" fill="#99FFEC" />
                    <path d="M96.125 51C96.7463 51 97.25 50.4963 97.25 49.875C97.25 49.2537 96.7463 48.75 96.125 48.75C95.5037 48.75 95 49.2537 95 49.875C95 50.4963 95.5037 51 96.125 51Z" fill="#99FFEC" />
                    <path d="M92.75 51C93.3713 51 93.875 50.4963 93.875 49.875C93.875 49.2537 93.3713 48.75 92.75 48.75C92.1287 48.75 91.625 49.2537 91.625 49.875C91.625 50.4963 92.1287 51 92.75 51Z" fill="#99FFEC" />
                    <path d="M99.5 63.375C100.121 63.375 100.625 62.8713 100.625 62.25C100.625 61.6287 100.121 61.125 99.5 61.125C98.8787 61.125 98.375 61.6287 98.375 62.25C98.375 62.8713 98.8787 63.375 99.5 63.375Z" fill="#99FFEC" />
                    <path d="M96.125 63.375C96.7463 63.375 97.25 62.8713 97.25 62.25C97.25 61.6287 96.7463 61.125 96.125 61.125C95.5037 61.125 95 61.6287 95 62.25C95 62.8713 95.5037 63.375 96.125 63.375Z" fill="#99FFEC" />
                    <path d="M92.75 63.375C93.3713 63.375 93.875 62.8713 93.875 62.25C93.875 61.6287 93.3713 61.125 92.75 61.125C92.1287 61.125 91.625 61.6287 91.625 62.25C91.625 62.8713 92.1287 63.375 92.75 63.375Z" fill="#99FFEC" />
                  </g>
                  <path d="M71.375 99.375H70.25V92.625C70.25 91.7299 69.8944 90.8715 69.2615 90.2385C68.6286 89.6056 67.7701 89.25 66.875 89.25H55.625C54.7299 89.25 53.8714 89.6056 53.2385 90.2385C52.6056 90.8715 52.25 91.7299 52.25 92.625V99.375H51.125C50.8266 99.375 50.5405 99.4935 50.3295 99.7045C50.1185 99.9155 50 100.202 50 100.5V101.625C50 102.52 50.3556 103.379 50.9885 104.011C51.6214 104.644 52.4799 105 53.375 105H69.125C70.0201 105 70.8786 104.644 71.5115 104.011C72.1444 103.379 72.5 102.52 72.5 101.625V100.5C72.5 100.202 72.3815 99.9155 72.1705 99.7045C71.9595 99.4935 71.6734 99.375 71.375 99.375ZM54.5 92.625C54.5 92.3266 54.6185 92.0405 54.8295 91.8295C55.0405 91.6185 55.3266 91.5 55.625 91.5H66.875C67.1734 91.5 67.4595 91.6185 67.6705 91.8295C67.8815 92.0405 68 92.3266 68 92.625V99.375H54.5V92.625ZM69.125 102.75H53.375C53.0766 102.75 52.7905 102.631 52.5795 102.42C52.3685 102.21 52.25 101.923 52.25 101.625H70.25C70.25 101.923 70.1315 102.21 69.9205 102.42C69.7095 102.631 69.4234 102.75 69.125 102.75Z" fill="#E5FFFA" />
                  <path d="M96.125 99.375H95V92.625C95 91.7299 94.6444 90.8715 94.0115 90.2385C93.3785 89.6056 92.5201 89.25 91.625 89.25H80.375C79.4799 89.25 78.6214 89.6056 77.9885 90.2385C77.3556 90.8715 77 91.7299 77 92.625V99.375H75.875C75.5766 99.375 75.2905 99.4935 75.0795 99.7045C74.8685 99.9155 74.75 100.202 74.75 100.5V101.625C74.75 102.52 75.1056 103.379 75.7385 104.011C76.3714 104.644 77.2299 105 78.125 105H93.875C94.7701 105 95.6285 104.644 96.2615 104.011C96.8944 103.379 97.25 102.52 97.25 101.625V100.5C97.25 100.202 97.1315 99.9155 96.9205 99.7045C96.7095 99.4935 96.4234 99.375 96.125 99.375ZM79.25 92.625C79.25 92.3266 79.3685 92.0405 79.5795 91.8295C79.7905 91.6185 80.0766 91.5 80.375 91.5H91.625C91.9234 91.5 92.2095 91.6185 92.4205 91.8295C92.6315 92.0405 92.75 92.3266 92.75 92.625V99.375H79.25V92.625ZM93.875 102.75H78.125C77.8266 102.75 77.5405 102.631 77.3295 102.42C77.1185 102.21 77 101.923 77 101.625H95C95 101.923 94.8815 102.21 94.6705 102.42C94.4595 102.631 94.1734 102.75 93.875 102.75Z" fill="#E5FFFA" />
                  <path d="M120.875 99.375H119.75V92.625C119.75 91.7299 119.394 90.8715 118.761 90.2385C118.129 89.6056 117.27 89.25 116.375 89.25H105.125C104.23 89.25 103.371 89.6056 102.739 90.2385C102.106 90.8715 101.75 91.7299 101.75 92.625V99.375H100.625C100.327 99.375 100.04 99.4935 99.8295 99.7045C99.6185 99.9155 99.5 100.202 99.5 100.5V101.625C99.5 102.52 99.8556 103.379 100.489 104.011C101.121 104.644 101.98 105 102.875 105H118.625C119.52 105 120.379 104.644 121.011 104.011C121.644 103.379 122 102.52 122 101.625V100.5C122 100.202 121.881 99.9155 121.67 99.7045C121.46 99.4935 121.173 99.375 120.875 99.375ZM104 92.625C104 92.3266 104.119 92.0405 104.33 91.8295C104.54 91.6185 104.827 91.5 105.125 91.5H116.375C116.673 91.5 116.96 91.6185 117.17 91.8295C117.381 92.0405 117.5 92.3266 117.5 92.625V99.375H104V92.625ZM118.625 102.75H102.875C102.577 102.75 102.29 102.631 102.08 102.42C101.869 102.21 101.75 101.923 101.75 101.625H119.75C119.75 101.923 119.631 102.21 119.42 102.42C119.21 102.631 118.923 102.75 118.625 102.75Z" fill="#E5FFFA" />
                  <path d="M60.125 87C60.4234 87 60.7095 86.8815 60.9205 86.6705C61.1315 86.4595 61.25 86.1734 61.25 85.875V79.125H82.832C83.0001 79.5955 83.2705 80.0229 83.6238 80.3762C83.9771 80.7295 84.4045 80.9999 84.875 81.168V85.875C84.875 86.1734 84.9935 86.4595 85.2045 86.6705C85.4155 86.8815 85.7016 87 86 87C86.2984 87 86.5845 86.8815 86.7955 86.6705C87.0065 86.4595 87.125 86.1734 87.125 85.875V81.168C87.5955 80.9999 88.0229 80.7295 88.3762 80.3762C88.7295 80.0229 88.9999 79.5955 89.168 79.125H110.75V85.875C110.75 86.1734 110.869 86.4595 111.08 86.6705C111.29 86.8815 111.577 87 111.875 87C112.173 87 112.46 86.8815 112.67 86.6705C112.881 86.4595 113 86.1734 113 85.875V78C113 77.7016 112.881 77.4155 112.67 77.2045C112.46 76.9935 112.173 76.875 111.875 76.875H89.168C88.9974 76.3981 88.7216 75.9657 88.3611 75.6099C88.0006 75.2541 87.5647 74.984 87.0856 74.8196C87.1051 74.7562 87.1183 74.691 87.125 74.625V69H100.625C101.52 69 102.379 68.6444 103.011 68.0115C103.644 67.3786 104 66.5201 104 65.625V61.125C103.997 60.4295 103.779 59.7518 103.377 59.1847C102.974 58.6176 102.406 58.1888 101.75 57.957V56.418C102.406 56.1862 102.974 55.7574 103.377 55.1903C103.779 54.6232 103.997 53.9455 104 53.25V48.75C103.997 48.0545 103.779 47.3768 103.377 46.8097C102.974 46.2426 102.406 45.8138 101.75 45.582V44.043C102.406 43.8112 102.974 43.3824 103.377 42.8153C103.779 42.2482 103.997 41.5705 104 40.875V36.375C104 35.4799 103.644 34.6214 103.011 33.9885C102.379 33.3556 101.52 33 100.625 33H71.375C70.4799 33 69.6214 33.3556 68.9885 33.9885C68.3556 34.6214 68 35.4799 68 36.375V40.875C68.0029 41.5705 68.2206 42.2482 68.6233 42.8153C69.0261 43.3824 69.5942 43.8112 70.25 44.043V45.582C69.5942 45.8138 69.0261 46.2426 68.6233 46.8097C68.2206 47.3768 68.0029 48.0545 68 48.75V53.25C68.0029 53.9455 68.2206 54.6232 68.6233 55.1903C69.0261 55.7574 69.5942 56.1862 70.25 56.418V57.957C69.5942 58.1888 69.0261 58.6176 68.6233 59.1847C68.2206 59.7518 68.0029 60.4295 68 61.125V65.625C68 66.5201 68.3556 67.3786 68.9885 68.0115C69.6214 68.6444 70.4799 69 71.375 69H84.875V74.625C84.8817 74.691 84.8949 74.7562 84.9144 74.8196C84.4353 74.984 83.9994 75.2541 83.6389 75.6099C83.2784 75.9657 83.0026 76.3981 82.832 76.875H60.125C59.8266 76.875 59.5405 76.9935 59.3295 77.2045C59.1185 77.4155 59 77.7016 59 78V85.875C59 86.1734 59.1185 86.4595 59.3295 86.6705C59.5405 86.8815 59.8266 87 60.125 87ZM77 57.75V56.625H95V57.75H77ZM72.5 56.625H74.75V57.75H72.5V56.625ZM97.25 56.625H99.5V57.75H97.25V56.625ZM77 45.375V44.25H95V45.375H77ZM72.5 44.25H74.75V45.375H72.5V44.25ZM97.25 44.25H99.5V45.375H97.25V44.25ZM70.25 36.375C70.25 36.0766 70.3685 35.7905 70.5795 35.5795C70.7905 35.3685 71.0766 35.25 71.375 35.25H100.625C100.923 35.25 101.21 35.3685 101.42 35.5795C101.631 35.7905 101.75 36.0766 101.75 36.375V40.875C101.75 41.1734 101.631 41.4595 101.42 41.6705C101.21 41.8815 100.923 42 100.625 42H71.375C71.0766 42 70.7905 41.8815 70.5795 41.6705C70.3685 41.4595 70.25 41.1734 70.25 40.875V36.375ZM70.25 48.75C70.25 48.4516 70.3685 48.1655 70.5795 47.9545C70.7905 47.7435 71.0766 47.625 71.375 47.625H100.625C100.923 47.625 101.21 47.7435 101.42 47.9545C101.631 48.1655 101.75 48.4516 101.75 48.75V53.25C101.75 53.5484 101.631 53.8345 101.42 54.0455C101.21 54.2565 100.923 54.375 100.625 54.375H71.375C71.0766 54.375 70.7905 54.2565 70.5795 54.0455C70.3685 53.8345 70.25 53.5484 70.25 53.25V48.75ZM70.25 65.625V61.125C70.25 60.8266 70.3685 60.5405 70.5795 60.3295C70.7905 60.1185 71.0766 60 71.375 60H100.625C100.923 60 101.21 60.1185 101.42 60.3295C101.631 60.5405 101.75 60.8266 101.75 61.125V65.625C101.75 65.9234 101.631 66.2095 101.42 66.4205C101.21 66.6315 100.923 66.75 100.625 66.75H71.375C71.0766 66.75 70.7905 66.6315 70.5795 66.4205C70.3685 66.2095 70.25 65.9234 70.25 65.625ZM86 76.875C86.2225 76.875 86.44 76.941 86.625 77.0646C86.81 77.1882 86.9542 77.3639 87.0394 77.5695C87.1245 77.775 87.1468 78.0012 87.1034 78.2195C87.06 78.4377 86.9528 78.6382 86.7955 78.7955C86.6382 78.9528 86.4377 79.06 86.2195 79.1034C86.0012 79.1468 85.775 79.1245 85.5695 79.0394C85.3639 78.9542 85.1882 78.81 85.0646 78.625C84.941 78.44 84.875 78.2225 84.875 78C84.875 77.7016 84.9935 77.4155 85.2045 77.2045C85.4155 76.9935 85.7016 76.875 86 76.875Z" fill="#E5FFFA" />
                  <path d="M99.5 38.625C100.121 38.625 100.625 38.1213 100.625 37.5C100.625 36.8787 100.121 36.375 99.5 36.375C98.8787 36.375 98.375 36.8787 98.375 37.5C98.375 38.1213 98.8787 38.625 99.5 38.625Z" fill="#E5FFFA" />
                  <path d="M96.125 38.625C96.7463 38.625 97.25 38.1213 97.25 37.5C97.25 36.8787 96.7463 36.375 96.125 36.375C95.5037 36.375 95 36.8787 95 37.5C95 38.1213 95.5037 38.625 96.125 38.625Z" fill="#E5FFFA" />
                  <path d="M92.75 38.625C93.3713 38.625 93.875 38.1213 93.875 37.5C93.875 36.8787 93.3713 36.375 92.75 36.375C92.1287 36.375 91.625 36.8787 91.625 37.5C91.625 38.1213 92.1287 38.625 92.75 38.625Z" fill="#E5FFFA" />
                  <path d="M99.5 51C100.121 51 100.625 50.4963 100.625 49.875C100.625 49.2537 100.121 48.75 99.5 48.75C98.8787 48.75 98.375 49.2537 98.375 49.875C98.375 50.4963 98.8787 51 99.5 51Z" fill="#E5FFFA" />
                  <path d="M96.125 51C96.7463 51 97.25 50.4963 97.25 49.875C97.25 49.2537 96.7463 48.75 96.125 48.75C95.5037 48.75 95 49.2537 95 49.875C95 50.4963 95.5037 51 96.125 51Z" fill="#E5FFFA" />
                  <path d="M92.75 51C93.3713 51 93.875 50.4963 93.875 49.875C93.875 49.2537 93.3713 48.75 92.75 48.75C92.1287 48.75 91.625 49.2537 91.625 49.875C91.625 50.4963 92.1287 51 92.75 51Z" fill="#E5FFFA" />
                  <path d="M99.5 63.375C100.121 63.375 100.625 62.8713 100.625 62.25C100.625 61.6287 100.121 61.125 99.5 61.125C98.8787 61.125 98.375 61.6287 98.375 62.25C98.375 62.8713 98.8787 63.375 99.5 63.375Z" fill="#E5FFFA" />
                  <path d="M96.125 63.375C96.7463 63.375 97.25 62.8713 97.25 62.25C97.25 61.6287 96.7463 61.125 96.125 61.125C95.5037 61.125 95 61.6287 95 62.25C95 62.8713 95.5037 63.375 96.125 63.375Z" fill="#E5FFFA" />
                  <path d="M92.75 63.375C93.3713 63.375 93.875 62.8713 93.875 62.25C93.875 61.6287 93.3713 61.125 92.75 61.125C92.1287 61.125 91.625 61.6287 91.625 62.25C91.625 62.8713 92.1287 63.375 92.75 63.375Z" fill="#E5FFFA" />
                </g>
                <defs>
                  <filter id="filter0_f_2640_15467" x="98.738" y="-459.537" width="617.783" height="751.801" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="44.964" result="effect1_foregroundBlur_2640_15467" />
                  </filter>
                  <filter id="filter1_f_2640_15467" x="-270.408" y="19.236" width="617.891" height="751.942" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="44.964" result="effect1_foregroundBlur_2640_15467" />
                  </filter>
                  <filter id="filter2_f_2640_15467" x="24" y="7" width="124" height="124" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_2640_15467" />
                  </filter>
                  <radialGradient id="paint0_angular_2640_15467" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(401.91 -81.6447) rotate(37.4407) scale(363.447 350.867)">
                    <stop stopColor="#B8F1FE" />
                    <stop offset="0.475245" stopColor="#B6AFFF" />
                    <stop offset="0.848958" stopColor="#B8F1FE" />
                  </radialGradient>
                  <radialGradient id="paint1_angular_2640_15467" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(276.341 226.116) rotate(38.4728) scale(363.447 354.054)">
                    <stop stopColor="#B8F1FE" />
                    <stop offset="0.475245" stopColor="#B6AFFF" />
                    <stop offset="0.848958" stopColor="#B8F1FE" />
                  </radialGradient>
                  <clipPath id="clip0_2640_15467">
                    <rect width="172" height="138" rx="8" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </DownloadContainer>
          </SectionContent>
        </Section>
      </ModalContent>
    </AccountScreen>
  )
}

const DescriptionTopTitle = styled.div`
  color: var(--info-300, #66EDFF);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
`

const DownloadButtonLabel = styled.div`
  color: var(--basegrey-50, #F2F2F2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const DownloadButton = styled.div`
  display: inline-flex;
  height: 32px;
  padding: 4px 6px 4px 4px;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 2px solid var(--basegrey-100, #E6E6E6);
  pointer: cursor;
  box-sizing: border-box;
  &:hover {
    border-radius: 3px;
    background: var(--basegrey-100, #E6E6E6);
    svg path {
      fill: #0D0D0D;
    }
    div {
      color: var(--basegrey-950, #0D0D0D);
    }
  }
`

const DownloadTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--coldgrey-50, #F1F1F4);
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.2px;
`

const DownloadDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--basegrey-200, #CCC);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  width: 55%;
`

const DownloadContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 12px;
  background: #000;
  margin-bottom: 24px;
`

const ItemLabel = styled.div`
  color: var(--basegrey-200, #CCC);
  text-align: center;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin-top: 8px;
`

const ItemIcon = styled.img`
  width: 36px;
  height: 36px; 
  display: flex;
  padding: 23px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: var(--coldgrey-900, #16181D);

  &:hover {
    background: var(--coldgrey-800, #2D3039);
  }
`

const PlaceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const PlaceItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
`

const LinkCopier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  color: #F2F2F2;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
`

const CopyContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 14px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--coldgrey-900, #16181D);
`
const ModalHeader = styled.div`
  display: flex;
  width: var(--RightPanelWidth);
  padding: 24px 24px 24px 48px;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;

`
const ModalHeaderText = styled.div`
  color: var(--white, #fff);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`

const ModalContent = styled.div`
  display: flex;
  width: 512px;
  height: 675px;
  padding: 12px 0px 0px 48px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  overflow-x: hidden;
`

const Text = styled.span`
  font-family: Manrope;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #cccccc;
  width: 448px;
  height: 18px;
  display: flex;
`

const Section = styled.div`
  width: 448px;
`
const SectionHeader = styled.div`
  font-family: Manrope;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #f1f1f4;
  margin-bottom: 8px;
`
const SectionNumber = styled.div`
  color: var(--coldgrey-400, #8B92A7);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.24px;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

const SectionTitle = styled.div`
color: var(--coldgrey-50, #F1F1F4);
font-family: Manrope;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 20px;
letter-spacing: 0.16px;
`

const SectionContent = styled.div`
  display: flex;
`

const Description = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  height: 176px;
`

const DescriptionTitle = styled.div`
  color: var(--coldgrey-50, #F1F1F4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
`

const DescriptionContent = styled.div`
  color: var(--basegrey-200, #CCC);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

const DescriptionADS = styled.div`
  width: 40%;
`
