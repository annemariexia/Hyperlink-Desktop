import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"

import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails, ProfileManager } from "../../elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import appleSVG from "/images/icons/apple.svg"

type Props = {
    profile: UserDetails
    onClose()
    device
    setActivePage: (page: string) => void
    macAddress
}

export const DeviceDetails: FC<Props> = ({ profile, onClose, device, setActivePage, macAddress }): ReactElement => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const earningsExpectedUsdRef = useRef<number>(0)
    const [earningsExpectedUsd, setEarningsExpectedUsd] = useState<number>(0)
    const [startDateMs] = useState<number>(new Date().getTime())

    const INCREASE_EVERY_MS = 10
    let intervalIncreaseEarnings = null
    
    // calculate potential and estimated earnings
    const estimatedEarningsPerMs = device.potentialEarningsYrly / (365 * 60 * 60 * 24 * 1000)

    // calculate live earnings
    const increaseEarnings = async () => {
        const nowMs = new Date().getTime()
        const offlineTime = await ProfileManager.getOfflineTime()
        const isOnline = offlineTime == null
        earningsExpectedUsdRef.current = (nowMs - startDateMs) * estimatedEarningsPerMs
        setEarningsExpectedUsd(isOnline ? earningsExpectedUsdRef.current : 0)
    }

    useEffect(() => {
        if (estimatedEarningsPerMs === 0)
            return

        intervalIncreaseEarnings = setInterval(increaseEarnings, INCREASE_EVERY_MS)

        return () => {
            clearInterval(intervalIncreaseEarnings)
        }

    }, [estimatedEarningsPerMs])

    // Update the earnings ticker when the profile changes
    useEffect(() => {
        if (profile) {
            earningsExpectedUsdRef.current = profile.earningsExpectedUsd
        } else {
            earningsExpectedUsdRef.current = 0
        }
    }, [profile])

    // update the earnings amount based on the view selected
    const currTextMoney = (profile?.earningsUsd ?? 0) + earningsExpectedUsd
    
    const getBalanceData = (amount) => {
        const realBalance = (amount / 100).toString()
        const digitNumber = realBalance.split(".")[0].length
        let displayBalance = ""

        // if (digitNumber <= 5) {
        //     displayBalance = (amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

        //     return {
        //         integerNumber: displayBalance.split(".")[0],
        //         pointNumber: displayBalance.split(".")[1],
        //         integerNumberSize: 40,
        //         pointNumberSize: 40 - 4 * (digitNumber - 1)
        //     }
        // } else if (digitNumber > 5) {
        //     displayBalance = (amount / 100).toLocaleString("en-US", { minimumFractionDigits: 8 - 2 * (digitNumber - 5), maximumFractionDigits: 8 - 2 * (digitNumber - 5) })

        //     return {
        //         integerNumber: displayBalance.split(".")[0],
        //         pointNumber: displayBalance.split(".")[1],
        //         pointNumberSize: 20
        //     }
        // }
        displayBalance = (amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

        return {
            integerNumber: displayBalance.split(".")[0],
            pointNumber: displayBalance.split(".")[1],
            integerNumberSize: 40,
            pointNumberSize: 40 - 4 * (digitNumber - 1)
        }
    }

    const curBalanceData = getBalanceData(currTextMoney)
    
    const getDateTime = (time) => {
        const millisecondsPerSecond = 1000;
        const millisecondsPerMinute = millisecondsPerSecond * 60;
        const millisecondsPerHour = millisecondsPerMinute * 60;
        const millisecondsPerDay = millisecondsPerHour * 24;

        const days = Math.floor(time / millisecondsPerDay);
        const hours = Math.floor((time % millisecondsPerDay) / millisecondsPerHour);
        const minutes = Math.floor((time % millisecondsPerHour) / millisecondsPerMinute);
        const seconds = Math.floor((time % millisecondsPerMinute) / millisecondsPerSecond);

        const totalTimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        return totalTimeString;
    }

    return (
        <AccountScreen>
            <ModalHeader>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    style={{
                        position: "absolute",
                        top: 44,
                        left: 520,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setActivePage("devices")
                    }}
                >
                    <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
                </svg>
                <ModalHeaderText>Manage device</ModalHeaderText>
                <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose} style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "44px",
                    right: "236px"
                }} />
            </ModalHeader>
            <ModalContent>
                <TextDescription>
                    View detailed info about this device and manage it.
                </TextDescription>
                <div>
                    {
                        (device.device.macAddress == macAddress) && (
                            <TextTitle style={{ marginBottom: 12 }}>
                                This device
                            </TextTitle>
                        )
                    }
                    <DeviceNameContainer>
                        <DeviceIcon>
                            {
                                (device.computer == "windows") ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <g clipPath="url(#clip0_244_2019)">
                                            <path d="M6.30661 6.30448H-7V-7H6.30661V6.30448Z" fill="#E2E4E9" />
                                            <path d="M21 6.30448H7.69227V-7H20.9989V6.30448H21Z" fill="#E2E4E9" />
                                            <path d="M6.30661 21H-7V7.69552H6.30661V21Z" fill="#E2E4E9" />
                                            <path d="M21 21H7.69227V7.69552H20.9989V21H21Z" fill="#E2E4E9" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_244_2019">
                                                <rect width="28" height="28" fill="white" transform="translate(-7 -7)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                ) : (
                                    <img src={appleSVG} style={{ width: 16, height: 16 }}></img>
                                )
                            }
                        </DeviceIcon>
                        <DeviceName>{device.device.name}</DeviceName>
                        {
                            device.device.isCpuRunning ? (
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
                            )
                        }
                    </DeviceNameContainer>
                    <Divider></Divider>
                </div>
                <div>
                    <TextTitle style={{ marginBottom: 12 }}>
                        Earnings
                    </TextTitle>
                    <TextCotainer>
                        <TextItem>
                            <TextItemTitle>EARNINGS POTENTIAL</TextItemTitle>
                            <TextItemContent>$ {device.potentialEarningsYrly.toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span style={{ fontSize: 14 }}>/yr</span></TextItemContent>
                        </TextItem>
                        <TextItem>
                            <TextItemTitle>EARNINGS ARRIVED</TextItemTitle>
                            <TextItemContent>$ {curBalanceData.integerNumber + "." + curBalanceData.pointNumber}</TextItemContent>
                        </TextItem>
                    </TextCotainer>
                    <Divider></Divider>
                </div>
                <div>
                    <TextTitle style={{ marginBottom: 12 }}>
                        Status
                    </TextTitle>
                    <TextCotainer>
                        <TextItem>
                            <TextItemTitle>UPTIME</TextItemTitle>
                            <TextItemContent>{(device?.device?.uptime?.uptime * 100).toLocaleString("es-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</TextItemContent>
                        </TextItem>
                        <TextItem>
                            <TextItemTitle>UPTIME TOTAL TIME</TextItemTitle>
                            <TextItemContent>{getDateTime(device?.device?.uptime?.totalOnlineTime)}</TextItemContent>
                        </TextItem>
                    </TextCotainer>
                    <Divider></Divider>
                </div>
                <div>
                    <TextTitle style={{ marginBottom: 12 }}>
                        Specifications
                    </TextTitle>
                    <SpecContainer>
                        <SpecItem>
                            <SpecSymbol>
                                <SymbolText>CPU</SymbolText>
                            </SpecSymbol>
                            <SpecDescription>{device.cpuDetail}</SpecDescription>
                        </SpecItem>
                        <SpecItem>
                            <SpecSymbol>
                                <SymbolText>GPU</SymbolText>
                            </SpecSymbol>
                            <SpecDescription>{device.gpuDetail}</SpecDescription>
                        </SpecItem>
                        <SpecItem>
                            <SpecSymbol>
                                <SymbolText>RAM</SymbolText>
                            </SpecSymbol>
                            <SpecDescription>{device.totalRam}</SpecDescription>
                        </SpecItem>
                        <SpecItem>
                            <SpecSymbol>
                                <SymbolText>OS</SymbolText>
                            </SpecSymbol>
                            <SpecDescription>{device.os}</SpecDescription>
                        </SpecItem>
                        <SpecItem>
                            <SpecSymbol>
                                <SymbolText>VER</SymbolText>
                            </SpecSymbol>
                            <SpecDescription>{device.version}</SpecDescription>
                        </SpecItem>
                    </SpecContainer>
                    <Divider></Divider>
                </div>
                <div style={{ marginBottom: "32px" }}>
                    <TextTitle style={{ marginBottom: 12 }}>
                        Remove device
                    </TextTitle>
                    <RemoveContainer>
                        <TextItemRemoveTitle isConfirmed={isConfirmed}>Remove this device from my account</TextItemRemoveTitle>
                        {
                            !isConfirmed ? (
                                <>
                                    <TextItemRemoveButton onClick={() => {
                                        setIsConfirmed(true)
                                    }}>Remove</TextItemRemoveButton>
                                </>
                            ) : (
                                <>
                                    <TextItemRemoveButton onClick={() => {
                                        setIsConfirmed(true)
                                    }}>Confirm remove</TextItemRemoveButton>
                                    <TextItemCancelButton onClick={() => {
                                        setIsConfirmed(false)
                                    }}>Cancel</TextItemCancelButton>
                                </>
                            )
                        }
                    </RemoveContainer>
                </div>
            </ModalContent>
        </AccountScreen >
    )
}

const RemoveContainer = styled.div`
    display: flex;
    padding: 4px 12px 4px 0px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 3px;
`

const TextItemCancelButton = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 150% */
    letter-spacing: 0.12px;
    cursor: pointer;
    &:hover {
        color: var(--coldgrey-400, #8D93A5);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px; /* 150% */
        letter-spacing: 0.12px;
    }
`

const TextItemRemoveButton = styled.div`
    color: var(--danger-200, #F6A2A5);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 150% */
    letter-spacing: 0.12px;
    cursor: pointer;
    &:hover {
        color: var(--danger-400, #EC464B);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px; /* 150% */
        letter-spacing: 0.12px;
    }
`

const TextItemRemoveTitle = styled.div<{ isConfirmed: boolean }>`
    flex: 1 0 0;
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    width: ${({ isConfirmed }) => (isConfirmed ? "282px" : "379px")};
`

const SpecDescription = styled.div`
    display: flex;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    flex: 1 0 0;
    color: var(--basegrey-50, #F2F2F2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.18px;
`

const SymbolText = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Space Grotesk;
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    width: 18px;
    height: 8px;
    flex-direction: column;
    justify-content: center;
`

const SpecSymbol = styled.div`
    display: flex;
    padding: 4px 2px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 1px;
    border: 1px solid var(--basegrey-400, #999);
`

const SpecItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const SpecContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
`

const TextItemTitle = styled.div`
    align-self: stretch;
    color: var(--coldgrey-200, #C6C9D2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.96px;
    text-transform: uppercase;
`

const TextItemContent = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 91.667% */
    letter-spacing: 0.96px;
`

const TextItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    width: 220px;
`

const TextCotainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const TagLabel = styled.div`
    color: var(--basegrey-50, #F2F2F2);
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
    background: var(--basegrey-900, #1A1A1A);
`
const DeviceName = styled.div`
    width: 338px;
    color: var(--coldgrey-200, #C6C9D2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.14px;
`

const DeviceIcon = styled.div`
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: var(--coldgrey-900, #16181D);
`

const DeviceNameContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
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
    margin-top: 24px;
    width: 464px;
`

const TextTitle = styled.div`
    align-self: stretch;
    color: var(--coldgrey-50, #F1F1F4);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;

    /* Paragraph/Medium */
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.16px;
`

const TextDescription = styled.div`
    display: flex;
    width: 448px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 17.5px */
    span {
        display: flex;
        color: var(--primary-200, #99FFEC);
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
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);
`

