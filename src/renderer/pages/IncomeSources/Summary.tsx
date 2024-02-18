import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"
import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import imgClose from "/images/close.svg"

type Props = {
  profile: UserDetails
  onClose()
  devices: any
  deviceEarnings: number
  refers: any
  referEarnings: number
  totalEarnings: number
  setActiveMenu: (menu: string) => void
  setActivePage: (page: string) => void
  setIsBoostEarning(boost: string)
}

export const Summary: FC<Props> = ({ profile, onClose, devices, deviceEarnings, refers, referEarnings, totalEarnings, setActiveMenu, setActivePage, setIsBoostEarning }): ReactElement => {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>Summary</ModalHeaderText>
        <img
          src={imgClose}
          alt="Close button"
          className="closeButton"
          onClick={onClose}
          style={{
            cursor: "pointer",
            position: "relative",
            right: "176px"
          }}
        />
      </ModalHeader>
      <ModalContent>
        <TextDescription>
          View all your income sources. You can manage your devices and referrals from here. To increase your earnings,{" "}
          <HoverLink
            onClick={() => {
              onClose()
              setIsBoostEarning("sharelink")
            }}
          >
            learn about boosts
          </HoverLink>
          .
        </TextDescription>
        <div>
          <TextTitle style={{ marginBottom: 8 }}>total earnings estimate</TextTitle>
          <TextValue>$ {devices.reduce((sum, device) => sum + device.potentialEarningsYrly, 0).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TextValue>
        </div>
        <div>
          <Container
            onClick={() => {
              setActiveMenu("devices")
              setActivePage("devices")
            }}
          >
            <ContainerHeader>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.4983 2.5H2.50033C2.04012 2.5 1.66699 2.87308 1.66699 3.33333V14.1667C1.66699 14.6269 2.04012 15 2.50033 15H9.16679V16.6667H6.25002C6.01992 16.6667 5.83335 16.8532 5.83335 17.0833V17.9167C5.83335 18.1468 6.01992 18.3333 6.25002 18.3333H13.7486C13.9787 18.3333 14.1653 18.1468 14.1653 17.9167V17.0833C14.1653 16.8532 13.9787 16.6667 13.7486 16.6667H10.8335V15H17.4983C17.9585 15 18.3316 14.6269 18.3316 14.1667V3.33333C18.3316 2.87308 17.9585 2.5 17.4983 2.5ZM3.33346 4.16667V13.3333H16.6668L16.6652 4.16667H3.33346Z"
                    fill="#E2E4E9"
                  />
                </svg>
              </Icon>
              <ContainerTitle>My devices</ContainerTitle>
              <ContainerDetail
                onClick={() => {
                  setActiveMenu("devices")
                  setActivePage("devices")
                }}
              >
                <DetailTitle>Details</DetailTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path
                    d="M10.8779 8.20493L7.29825 4.62222C7.13544 4.45926 6.87145 4.45926 6.70863 4.62222L6.12211 5.20924C5.95946 5.37204 5.95927 5.63594 6.1217 5.79896L8.8129 8.5L6.1217 11.201C5.95927 11.3641 5.95946 11.628 6.12211 11.7908L6.70863 12.3778C6.87145 12.5407 7.13544 12.5407 7.29825 12.3778L10.8779 8.79506C11.0407 8.6321 11.0407 8.36789 10.8779 8.20493Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </ContainerDetail>
            </ContainerHeader>
            <ContainerContent>
              <Section>
                <SectionTitle>connected devices</SectionTitle>
                <SectionContent>{devices.length}</SectionContent>
              </Section>
              <Section>
                <SectionTitle>device earnings</SectionTitle>
                <SectionContent>$ {devices.reduce((sum, device) => sum + device.potentialEarningsYrly, 0).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</SectionContent>
              </Section>
            </ContainerContent>
            <Divider></Divider>
            <ContainerFooter style={{ marginTop: "-16px" }}>
              <OnlineTag>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="4" fill="#33FFDA" />
                </svg>
                <OnlineTagTitle>{devices.filter((element) => element.device.isCpuRunning == true).length} Online</OnlineTagTitle>
              </OnlineTag>
              <FooterText>
                <FooterNumber>{((devices.reduce((sum, device) => sum + device?.device?.uptime?.uptime, 0) / devices.length) * 100).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</FooterNumber>
                <FooterSubText>average uptime</FooterSubText>
              </FooterText>
              <OfflineTag>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99992 1.33337C4.32397 1.33337 1.33325 4.3241 1.33325 8.00004C1.33325 11.676 4.32397 14.6667 7.99992 14.6667C11.6759 14.6667 14.6666 11.676 14.6666 8.00004C14.6666 4.3241 11.6759 1.33337 7.99992 1.33337ZM7.99992 2.66671C5.05916 2.66671 2.66659 5.05929 2.66659 8.00004C2.66659 10.9408 5.05916 13.3334 7.99992 13.3334C10.9407 13.3334 13.3333 10.9408 13.3333 8.00004C13.3333 5.05929 10.9407 2.66671 7.99992 2.66671ZM8.33325 12H7.66659C7.48249 12 7.33325 11.8508 7.33325 11.6667V11C7.33325 10.8159 7.48249 10.6667 7.66659 10.6667H8.33325C8.51735 10.6667 8.66659 10.8159 8.66659 11V11.6667C8.66659 11.8508 8.51735 12 8.33325 12ZM8.33325 9.33337H7.66659C7.48249 9.33337 7.33325 9.18414 7.33325 9.00004V4.66671C7.33325 4.48261 7.48249 4.33337 7.66659 4.33337H8.33325C8.51735 4.33337 8.66659 4.48261 8.66659 4.66671V9.00004C8.66659 9.18414 8.51735 9.33337 8.33325 9.33337Z"
                    fill="#EC464B"
                  />
                </svg>
                <OfflineTagTitle>{devices.filter((element) => element.device.isCpuRunning == false).length} Offline</OfflineTagTitle>
              </OfflineTag>
            </ContainerFooter>
          </Container>
          <Container
            style={{ marginTop: 8 }}
            onClick={() => {
              setActiveMenu("referrals")
              setActivePage("referrals")
            }}
          >
            <ContainerHeader>
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.1667 13.4C13.5334 13.4 12.9667 13.65 12.5334 14.0416L6.59175 10.5833C6.63341 10.3916 6.66675 10.2 6.66675 9.99996C6.66675 9.79996 6.63341 9.60829 6.59175 9.41663L12.4667 5.99163C12.9167 6.40829 13.5084 6.66663 14.1667 6.66663C15.5475 6.66663 16.6667 5.54734 16.6667 4.16663C16.6667 2.78591 15.5475 1.66663 14.1667 1.66663C12.786 1.66663 11.6667 2.78591 11.6667 4.16663C11.6667 4.36663 11.7001 4.55829 11.7417 4.74996L5.86675 8.17496C5.41675 7.75829 4.82508 7.49996 4.16675 7.49996C2.78604 7.49996 1.66675 8.61925 1.66675 9.99996C1.66675 11.3807 2.78604 12.5 4.16675 12.5C4.82508 12.5 5.41675 12.2416 5.86675 11.825L11.8001 15.2833C11.7584 15.4583 11.7334 15.6416 11.7334 15.8333C11.7334 17.175 12.8251 18.2583 14.1667 18.2583C15.5084 18.2583 16.6001 17.175 16.6001 15.8333C16.6001 14.4894 15.5106 13.4 14.1667 13.4Z"
                    fill="#E2E4E9"
                  />
                </svg>
              </Icon>
              <ContainerTitle>Referrals</ContainerTitle>
              <ContainerDetail
                onClick={() => {
                  setActiveMenu("referrals")
                  setActivePage("referrals")
                }}
              >
                <DetailTitle>Details</DetailTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path
                    d="M10.8779 8.20493L7.29825 4.62222C7.13544 4.45926 6.87145 4.45926 6.70863 4.62222L6.12211 5.20924C5.95946 5.37204 5.95927 5.63594 6.1217 5.79896L8.8129 8.5L6.1217 11.201C5.95927 11.3641 5.95946 11.628 6.12211 11.7908L6.70863 12.3778C6.87145 12.5407 7.13544 12.5407 7.29825 12.3778L10.8779 8.79506C11.0407 8.6321 11.0407 8.36789 10.8779 8.20493Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </ContainerDetail>
            </ContainerHeader>
            <ContainerContent>
              <Section>
                <SectionTitle>referred users</SectionTitle>
                <SectionContent>{refers.length}</SectionContent>
              </Section>
              <Section>
                <SectionTitle>referral earnings</SectionTitle>
                <SectionContent>$ {referEarnings}</SectionContent>
              </Section>
            </ContainerContent>
          </Container>
        </div>
      </ModalContent>
    </AccountScreen>
  )
}

const HoverLink = styled.a`
  color: #ccfff6;
  cursor: pointer;
  &:hover {
    color: var(--cybergreen-400, #33ffda) !important;
  }
`

const OfflineTagTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const OfflineTag = styled.div`
  display: flex;
  height: 24px;
  padding: 4px 8px 4px 2px;
  align-items: center;
  gap: 4px;
`

const FooterSubText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const FooterNumber = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.48px;
`

const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const OnlineTagTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.3px;
`

const OnlineTag = styled.div`
  display: flex;
  height: 16px;
  padding: 4px 8px 4px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  background: var(--basegrey-900, #1a1a1a);
`

const ContainerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`

const Divider = styled.div`
  display: flex;
  height: 1px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 2px;
  background: var(--basegrey-800, #333);
`

const SectionContent = styled.div`
  align-self: stretch;
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 100% */
  letter-spacing: 0.12px;
`

const SectionTitle = styled.div`
  align-self: stretch;
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
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`

const ContainerContent = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px;
  align-self: stretch;
  flex-wrap: wrap;
`

const DetailTitle = styled.span`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
`

const ContainerDetail = styled.div`
  display: flex;
  height: 14px;
  padding: 3px 2px 4px 8px;
  align-items: center;
  border-radius: 99px;
  background: rgba(102, 102, 102, 0.25);
  cursor: pointer;
  right: 0px;
`

const ContainerTitle = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
  width: 316px;
`

const Icon = styled.div`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: rgba(44, 48, 58, 0.5);
`

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`

const Container = styled.div`
  display: flex;
  width: 432px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 4px;
  border: 1px solid var(--basegrey-800, #333);
  background: var(--basegrey-950, #0d0d0d);
  cursor: pointer;

  &:hover {
    background: #141414;
    div:nth-child(1) {
      div:nth-child(3) {
        border-radius: 99px;
        background: rgba(241, 241, 244, 0.3);
      }
    }
  }
`

const TextValue = styled.div`
  flex: 1 0 0;
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 91.667% */
  letter-spacing: -0.96px;
`

const TextTitle = styled.div`
  align-self: stretch;
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
`

const TextDescription = styled.span`
  width: 448px;
  gap: 8px;
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  span {
    display: flex;
    color: var(--primary-200, #99ffec);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
  }
`

const ModalHeader = styled.div`
  display: flex;
  width: 670px;
  padding: 24px 24px 24px 48px;
  align-items: center;
  gap: 12px;
  .closeButton:hover img {
    filter: brightness(0) invert(1);
  }
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
  width: 464px;
  padding: 0px 48px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 8px;

  /* shadow */
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`
