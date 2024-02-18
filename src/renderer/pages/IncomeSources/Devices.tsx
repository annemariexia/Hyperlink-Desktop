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
  setActivePage: (page: string) => void
  setCurrentDevice: (device: any) => void
  macAddress
  setIsBoostEarning(boost: string)
}

export const Devices: FC<Props> = ({ profile, onClose, devices, deviceEarnings, setActivePage, setCurrentDevice, macAddress, setIsBoostEarning }): ReactElement => {
  const [isHovered, setIsHovered] = useState(null)
  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>My devices</ModalHeaderText>
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
          View all devices connected to your account. To increase your earnings,{" "}
          <HoverLink
            onClick={() => {
              onClose()
              setIsBoostEarning("adddevice")
            }}
          >
            add more devices
          </HoverLink>
          .
        </TextDescription>
        <EarningSection>
          <div>
            <TextTitle style={{ marginBottom: 8 }}>device earnings</TextTitle>
            <TextValue>$ {devices.reduce((sum, device) => sum + device.potentialEarningsYrly, 0).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TextValue>
          </div>
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
        </EarningSection>
        <DeviceList>
          <DeviceListText>{devices.length} connected devices</DeviceListText>
          {devices.map((detail, key) => (
            <DeviceItem
              onMouseEnter={() => {
                setIsHovered(key)
              }}
              onMouseLeave={() => {
                setIsHovered(null)
              }}
              onClick={() => {
                setCurrentDevice(detail)
                setActivePage("devicedetails")
              }}
              key={key}
            >
              <DeviceItemSection1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "stretch",
                    paddingBottom: "2px"
                  }}
                >
                  {detail.computer == "windows" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <g clipPath="url(#clip0_244_1669)">
                        <path d="M4.75236 4.7516H0V0H4.75236V4.7516Z" fill="#E2E4E9" />
                        <path d="M10 4.7516H5.24724V0H9.9996V4.7516H10Z" fill="#E2E4E9" />
                        <path d="M4.75236 10H0V5.24841H4.75236V10Z" fill="#E2E4E9" />
                        <path d="M10 10H5.24724V5.24841H9.9996V10H10Z" fill="#E2E4E9" />
                      </g>
                      <defs>
                        <clipPath id="clip0_244_1669">
                          <rect width="10" height="10" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M10.2181 3.83824C9.48072 4.30147 9.0253 5.09559 9.0253 5.97794C9.0253 6.97059 9.61084 7.875 10.5 8.25C10.3265 8.82353 10.0663 9.35294 9.74096 9.83823C9.26386 10.5221 8.76506 11.2279 8.02771 11.2279C7.29036 11.2279 7.07349 10.7868 6.20602 10.7868C5.36024 10.7868 5.05663 11.25 4.36265 11.25C3.66867 11.25 3.19157 10.6103 2.6494 9.81618C1.93374 8.71323 1.52169 7.43382 1.5 6.08824C1.5 3.90441 2.88795 2.73529 4.2759 2.73529C5.01325 2.73529 5.62048 3.22059 6.0759 3.22059C6.50964 3.22059 7.20361 2.71324 8.02771 2.71324C8.89518 2.69118 9.71928 3.11029 10.2181 3.83824ZM7.63735 1.78676C8.00602 1.34559 8.20121 0.794118 8.22289 0.220588C8.22289 0.154412 8.22289 0.0661765 8.2012 0C7.57229 0.0661765 6.98675 0.375 6.5747 0.860294C6.20602 1.27941 5.98916 1.80882 5.96747 2.38235C5.96747 2.44853 5.96747 2.51471 5.98916 2.58088C6.03253 2.58088 6.09759 2.60294 6.14096 2.60294C6.72651 2.55882 7.26867 2.25 7.63735 1.78676Z"
                        fill="#E6E6E6"
                      />
                    </svg>
                  )}
                  <DeviceName>{detail.device.name}</DeviceName>
                </div>
                <DeviceEarning>$ {detail.potentialEarningsYrly.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</DeviceEarning>
                <ThisDeviceName>{detail.device.macAddress == macAddress ? "This device" : ""}</ThisDeviceName>
              </DeviceItemSection1>
              {isHovered != key ? (
                <>
                  <DeviceItemSection2>
                    <DeviceDescription>{detail.cpuDetail + ", " + (detail.gpuDetail ? detail.gpuDetail.join(" / ") : "")}</DeviceDescription>
                  </DeviceItemSection2>
                  <DeviceItemSection3>
                    {detail.device.isCpuRunning ? (
                      <Tag>
                        <TagContainer>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="4" fill="#33FFDA" />
                          </svg>
                          <TagLabel>Online</TagLabel>
                        </TagContainer>
                      </Tag>
                    ) : (
                      <Tag>
                        <TagContainer>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="4" fill="#EC464B" />
                          </svg>
                          <TagLabel>Offline</TagLabel>
                        </TagContainer>
                      </Tag>
                    )}
                    <UptimeTag>
                      <UptimeNumber>{(detail?.device?.uptime?.uptime * 100).toLocaleString("es-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}%</UptimeNumber>
                      <UptimeText>uptime</UptimeText>
                    </UptimeTag>
                  </DeviceItemSection3>
                </>
              ) : (
                <ManageButton
                  onClick={() => {
                    setCurrentDevice(detail)
                    setActivePage("devicedetails")
                  }}
                >
                  <ManageButtonTitle>Manage</ManageButtonTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path
                      d="M10.8779 8.20493L7.29825 4.62222C7.13544 4.45926 6.87145 4.45926 6.70863 4.62222L6.12211 5.20924C5.95946 5.37204 5.95927 5.63594 6.1217 5.79896L8.8129 8.5L6.1217 11.201C5.95927 11.3641 5.95946 11.628 6.12211 11.7908L6.70863 12.3778C6.87145 12.5407 7.13544 12.5407 7.29825 12.3778L10.8779 8.79506C11.0407 8.6321 11.0407 8.36789 10.8779 8.20493Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                </ManageButton>
              )}
            </DeviceItem>
          ))}
        </DeviceList>
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

const UptimeTag = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const UptimeNumber = styled.div`
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

const UptimeText = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const ManageButtonTitle = styled.span`
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
`

const ManageButton = styled.div`
  display: flex;
  height: 14px;
  padding: 3px 2px 4px 8px;
  align-items: center;
  border-radius: 99px;
  background: rgba(102, 102, 102, 0.25);
  cursor: pointer;
  right: 0px;
`

const TagLabel = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.3px;
`

const TagContainer = styled.div`
  display: flex;
  height: 16px;
  padding: 4px 8px 4px 4px;
  align-items: center;
  gap: 4px;
`

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 100px;
  background: var(--basegrey-900, #1a1a1a);
`

const DeviceDescription = styled.div`
  display: flex;
  width: 120px;
  height: 64px;
  color: var(--basegrey-400, #999);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const ThisDeviceName = styled.div`
  color: var(--coldgrey-400, #8d93a5);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`

const DeviceEarning = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 122.222% */
  letter-spacing: -0.72px;
`

const DeviceName = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
`

const DeviceItemSection3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`

const DeviceItemSection1 = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const DeviceItemSection2 = styled.div`
  display: flex;
  width: 140.664px;
  align-items: center;
  align-self: stretch;
  flex-direction: column;
`

const DeviceItem = styled.div`
  width: 432px;
  height: 64px;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 3px;
  border: 1px solid var(--basegrey-800, #333);
  background: var(--basegrey-950, #0d0d0d);
  gap: auto;
  cursor: pointer;
`

const DeviceListText = styled.div`
  display: flex;
  width: 448px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
`

const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
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

const EarningSection = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  align-self: stretch;
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
  width: 353px;
`

const TextDescription = styled.span`
  width: 448px;
  flex-direction: column;
  align-items: flex-start;
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
  width: 468px;
  padding: 0px 46px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 680px;

  /* shadow */
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`
