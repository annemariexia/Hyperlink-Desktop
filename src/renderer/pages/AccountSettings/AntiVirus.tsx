import React, { Component, Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import styled from "styled-components"
import { ipcRenderer } from "electron"
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import imgAntivirus from "/images/anti-virus.svg"
import * as Components from "./AccountSettingComponents"

type Props = {
    onClose()
    profile
    setActiveModal: (modal: string) => void
}

export const AntiVirus: FC<Props> = ({ onClose, profile, setActiveModal }): ReactElement => {

    const openTutorial = () => {
        ipcRenderer.send("OpenBrowser", {
            link: "https://support.salad.com/category/30-anti-virus?sort=popularity"
        })
    }

    const onClickUnlockBtn = () => {
        ipcRenderer.send("OpenBrowser", {
            link: "https://support.salad.com/category/30-anti-virus?sort=popularity"
        })
        setActiveModal("SecurityWarning")
    }

    const onClickUpdateBtn = () => {
        ipcRenderer.send("DownloadFile")
        onClose()
    }

    return (
        <AccountScreen>
            <Components.ModalHeader className="withoutBackBtn">
                <Components.ModalHeaderText>Antivirus</Components.ModalHeaderText>
                <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
            </Components.ModalHeader>
            <AntivirusModalContent>
                <AntiVirusHeader>
                    <AntiVirusHeaderText>
                        <AntiVirusHeaderTitle>
                            <AntiVirusHeaderTitle1>Antivirus is blocking Hyperlink?</AntiVirusHeaderTitle1>
                            <AntiVirusHeaderTitle2>Don't worry!</AntiVirusHeaderTitle2>
                        </AntiVirusHeaderTitle>
                        <AntiVirusHeaderDescription>
                            Don't worry, it is not a virus. Simply<br></br> follow our detailed guides to whitelist<br></br> Hyperlink and its libraries.
                        </AntiVirusHeaderDescription>
                    </AntiVirusHeaderText>
                    <AntiVirusHeaderImg src={imgAntivirus} />
                </AntiVirusHeader>
                <AntiVirusSection>
                    <AntiVirusSectionTitle>
                        Why am I getting an Antivirus warning?
                    </AntiVirusSectionTitle>
                    <AntiVirusSectionDescription>
                        Antivirus programs often treat mining libraries as malicious due to the <br></br>
                        similarity between legitimate mining executables and those used by <br></br>
                        malware for cryptojacking.
                        <br></br><br></br>
                        <span>
                            This means that even Hyperlink, which seeks your permission and <br></br>
                            fairly compensates you for your compute, can be blocked.
                        </span>
                    </AntiVirusSectionDescription>
                </AntiVirusSection>
                <AntiVirusSection>
                    <AntiVirusSectionTitle>
                        How to fix this
                    </AntiVirusSectionTitle>
                    <AntiVirusSectionDescription>
                        To ensure Hyperlink works properly and you are not losing profits, <br></br>
                        please, add the Hyperlink folder to the list of exceptions of your <br></br>
                        Antivirus. <HoverLink className="link" onClick={openTutorial}>
                            Click for a detailed tutorial.
                        </HoverLink>
                    </AntiVirusSectionDescription>
                </AntiVirusSection>
            </AntivirusModalContent>
            <AntiVirusActionSection>
                <ActionButtonGroup>
                    <ActionLabel>Sounds good?</ActionLabel>
                    <ActionUnlockButton onClick={onClickUnlockBtn}>Unblock & Start Earning {`>`}</ActionUnlockButton>
                    <ActionUpdateButton onClick={onClickUpdateBtn}>I have already whitelisted, update files</ActionUpdateButton>
                </ActionButtonGroup>
            </AntiVirusActionSection>
        </AccountScreen>
    )
}

const AntivirusModalContent = styled.div`
    display: flex;
    width: 448px;
    padding: 12px 64px 0px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const ActionButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    margin-left: 46px;
`

const ActionLabel = styled.div`
    width: 448px;
    color: var(--coldgrey-50, #F1F1F4);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    letter-spacing: 0.16px;
`

const ActionUnlockButton = styled.div`
    display: flex;
    width: 408px;
    padding: 12px 20px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 4px;
    border: 2px solid var(--primary-500, #00EFC3);
    background: var(--primary-500, #00EFC3);
    color: var(--basegrey-950, #0D0D0D);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    cursor: pointer;

    &:hover {
        background: transparent;
        color: var(--primary-500, #00EFC3);
    }
`

const ActionUpdateButton = styled.div`
    display: flex;
    width: 408px;
    padding: 12px 20px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-radius: 4px;
    border: 2px solid var(--basegrey-50, #F2F2F2);
    background: var(--basegrey-950, #0D0D0D);
    color: var(--basegrey-50, #F2F2F2);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    cursor: pointer;

    &:hover {
        background: var(--basegrey-50, #F2F2F2);
        color: var(--basegrey-950, #0D0D0D);
    }
`

const AntiVirusActionSection = styled.div`
    display: flex;
    width: 540px;
    padding: 19px 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.60) 25.52%, rgba(0, 0, 0, 0.00) 100%), rgba(255, 255, 255, 0.05);
    box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.20);
    backdrop-filter: blur(6px);
    border-bottom-right-radius: 12px;
`

const HoverLink = styled.a`
  color: var(--primary-200, #99FFEC);
  cursor: pointer;
  &:hover {
      color: var(--cybergreen-400, #33FFDA) !important;
  }
`

const AntiVirusSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--basegrey-800, #333);
`

const AntiVirusSectionTitle = styled.div`
    color: var(--coldgrey-50, #F1F1F4);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    letter-spacing: 0.2px;
`
const AntiVirusSectionDescription = styled.div`
    color: var(--coldgrey-100, #E2E4E9);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    span {
        font-weight: 500;
    }
`
const AntiVirusHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--basegrey-800, #333);
`

const AntiVirusHeaderText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;
`

const AntiVirusHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const AntiVirusHeaderTitle1 = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    letter-spacing: 0.2px;
`

const AntiVirusHeaderTitle2 = styled.div`
    color: var(--info-400, #33E7FF);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: 0.2px;
`

const AntiVirusHeaderDescription = styled.div`
    color: var(--coldgrey-200, #C6C9D2);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
`

const AntiVirusHeaderImg = styled.img`
    width: 180px;
    align-self: stretch;
    border-radius: 8px;
`
