import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "../elements/EventListeners"
import { ipcRenderer } from "electron"

type Props = {
    onClose()
}

export const SecurityWarning: FC<Props> = ({ onClose }): ReactElement => {

    const closeModal = () => onClose()
    
    const onClickUpdateButton = () => {
        ipcRenderer.send("DownloadFile")
        onClose()
    }

    const onClickTutorialButton = () => {
        ipcRenderer.send("OpenBrowser", {
            link: "https://support.salad.com/category/30-anti-virus?sort=popularity"
        })
    }

    return (
        <Overlayer onClick={stopEventPropagation}>
            <ModalWindow>
                <ModalTitle>
                    <ModalTitleText>Antivirus</ModalTitleText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: "pointer" }} onClick={closeModal}>
                        <path d="M19.829 4.99203L19.008 4.17105C18.7799 3.94298 18.4101 3.94298 18.1821 4.17105L12 10.3531L5.81793 4.17105C5.58986 3.94298 5.2201 3.94298 4.99203 4.17105L4.17106 4.99202C3.94299 5.22009 3.94299 5.58986 4.17106 5.81792L10.3531 12L4.17106 18.1821C3.943 18.4101 3.943 18.7799 4.17106 19.008L4.99204 19.829C5.2201 20.057 5.58987 20.057 5.81793 19.829L12 13.6468L18.1821 19.8289C18.4102 20.057 18.7799 20.057 19.008 19.8289L19.829 19.0079C20.057 18.7799 20.057 18.4101 19.829 18.182L13.6469 12L19.829 5.81792C20.057 5.58986 20.057 5.22009 19.829 4.99203Z" fill="#A8ADBD" />
                    </svg>
                </ModalTitle>
                <ModalContent>
                    <ModalContentText>Have you whitelisted Hyperlink with your Antivirus?</ModalContentText>
                    <ModalActionGroup>
                        <ModalUpdateButton onClick={onClickUpdateButton}>Yes, update files</ModalUpdateButton>
                        <ModalTutorialButton onClick={onClickTutorialButton}>No, view tutorial again</ModalTutorialButton>
                    </ModalActionGroup>
                </ModalContent>
            </ModalWindow>
        </Overlayer>
    )
}

const ModalUpdateButton = styled.div`
    display: flex;
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

const ModalTutorialButton = styled.div`
    display: flex;
    padding: 12px 20px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 4px;
    background: var(--basegrey-900, #1A1A1A);
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
`

const ModalActionGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const ModalContentText = styled.div`
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

const ModalContent = styled.div`
    display: flex;
    padding: 0px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`

const ModalTitleText = styled.div`
    color: var(--white, #FFF);
    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 24px */
    width: 452px;
`

const ModalTitle = styled.div`
    display: flex;
    padding: 0px 24px 0px 48px;
    align-items: center;
    gap: 12px;
    align-self: stretch;
`

const Overlayer = styled.div`
    background: rgba(0, 0, 0, 0.90);
    backdrop-filter: blur(6px);
    width: 1280px;
    height: 832px;
    flex-shrink: 0;
`
const ModalWindow = styled.div`
    display: flex;
    width: 560px;
    padding: 24px 0px 32px 0px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: #0A0A0A;
    box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.20);
    backdrop-filter: blur(6px);
    position: absolute;
    left: 360px;
    top: 272px;
`
