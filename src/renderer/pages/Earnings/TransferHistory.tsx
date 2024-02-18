import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useEffect } from "react"
import { ipcRenderer } from "electron"
import styled from 'styled-components'
import imgClose from "/images/close.svg"
import { TransferMain } from "../../styles/Earnings"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { Role } from "../../elements/system/ProfileManager"

type Props = {
    profile
    closeModal
    openChatDrawer
}

export const TransferHistory: FC<Props> = ({ profile, closeModal, openChatDrawer }): ReactElement => {
    const [isSelected, setIsSelected] = useState([])
    const [payoutHistory, setPayoutHistory] = useState([])
    let currentDateText = ""

    const formatDate = (date) => {
        const inputDate = new Date(date);
        const currentDate = new Date();
        const isThisMonth = inputDate.getMonth() === currentDate.getMonth() && inputDate.getFullYear() === currentDate.getFullYear();
        let returnValue = ""

        if (isThisMonth) {
            returnValue = "This month";
        } else {
            returnValue = inputDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
        }

        if (returnValue != currentDateText) {
            currentDateText = returnValue
            return returnValue
        } else {
            return ""
        }
    }

    const openTermsOfService = () => {
        ipcRenderer.send("OpenBrowser", {
            link: "https://www.hyperlink.org/terms-of-service"
        })
    }

    useEffect(() => {
        if (profile && profile.role != Role.Guest)
            ipcRenderer.send(ApiCommand.GetPayoutHistory, { userId: profile?.id })

        ipcRenderer.on(ApiMessage.GetPayoutHistoryResult, (event, result) => {
            setPayoutHistory(result.payoutHistory)
        })

        return () => {
            ipcRenderer.removeAllListeners(ApiMessage.GetPayoutHistoryResult)
        }
    }, [])

    return (
        <TransferMain>
            <div className="transfer" style={{ marginRight: 0 }}>
                <div className="top">
                    <div className="title">Transfer history</div>
                    <img src={imgClose} className="closeButton" onClick={closeModal}/>
                </div>
                <div className="content" style={{ overflowY: "scroll", height: "688px"}}>
                    <div className="subTitle">
                        View your transaction history. See our <HoverLink className="link" onClick={openTermsOfService}>
                            Terms of Service
                        </HoverLink>
                    </div>
                    <PayoutHistoryContainer>
                        {
                            payoutHistory?.map((history, key) => (
                                <PeriodItem key={key}>
                                    <PayoutMonth>{formatDate(history.created)}</PayoutMonth>
                                    <PayoutItem key={key}>
                                        <PayoutItemHeader onClick={() => {
                                            if (isSelected.includes(key)) {
                                                const newArray = isSelected.filter((selected) => selected != key)
                                                setIsSelected(newArray)
                                            } else {
                                                const newArray = [...isSelected, key]
                                                setIsSelected(newArray)
                                            }
                                        }}>
                                            <PayoutItemSection1>
                                                <PayoutItemTransfer>
                                                    <PaypalIcon>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path opacity="0.68" d="M12.8141 4.55697C12.9868 3.4678 12.8129 2.72686 12.2171 2.05551C11.5612 1.31657 10.3762 1 8.86013 1H4.45924C4.14944 1 3.88551 1.22288 3.83734 1.52562L2.00467 13.015C1.96862 13.2418 2.14587 13.4467 2.37778 13.4467H5.0947L4.9072 14.6224C4.87562 14.8208 5.03051 15 5.23358 15H7.52374C7.79473 15 8.02549 14.8051 8.06775 14.5403L8.09025 14.425L8.52163 11.7202L8.54946 11.5708C8.59172 11.3061 8.82248 11.1109 9.09348 11.1109H9.43602C11.6546 11.1109 13.3918 10.2198 13.8994 7.64251C14.1115 6.56561 14.0018 5.66667 13.4409 5.03467C13.2714 4.84388 13.0603 4.68588 12.8141 4.55697Z" fill="#E6E6E6" />
                                                            <path opacity="0.7" d="M12.8141 4.55697C12.9868 3.4678 12.8129 2.72686 12.2171 2.05551C11.5612 1.31657 10.3762 1 8.86013 1H4.45924C4.14944 1 3.88551 1.22288 3.83734 1.52562L2.00467 13.015C1.96862 13.2418 2.14587 13.4467 2.37778 13.4467H5.0947L5.77717 9.16774L5.75597 9.30192C5.80428 8.99933 6.06576 8.7763 6.3757 8.7763H7.6671C10.2031 8.7763 12.189 7.75758 12.7691 4.81151C12.7864 4.72452 12.8009 4.63996 12.8141 4.55697Z" fill="#E6E6E6" />
                                                            <path d="M6.51041 4.57137C6.5394 4.38942 6.65766 4.24026 6.81674 4.16497C6.889 4.13074 6.96991 4.11163 7.05457 4.11163H10.5043C10.913 4.11163 11.2941 4.13816 11.6424 4.19363C11.7419 4.20946 11.8388 4.22771 11.933 4.24839C12.027 4.26906 12.1185 4.29202 12.2069 4.31769C12.2511 4.33038 12.2946 4.34393 12.3374 4.3579C12.5084 4.41408 12.6678 4.48025 12.8143 4.55711C12.9871 3.46795 12.8132 2.72701 12.2174 2.05565C11.5612 1.31657 10.3762 1 8.86013 1H4.45924C4.14944 1 3.88551 1.22288 3.83734 1.52562L2.00467 13.015C1.96862 13.2418 2.14587 13.4467 2.37778 13.4467H5.0947L5.77717 9.16774L6.51041 4.57137Z" fill="#E6E6E6" />
                                                        </svg>
                                                    </PaypalIcon>
                                                    <PayoutTransferInfo>
                                                        <PayoutTransferInfoTitle>Transfer to</PayoutTransferInfoTitle>
                                                        <PayoutTransferEmail>{history.payoutMethod.email}</PayoutTransferEmail>
                                                    </PayoutTransferInfo>
                                                </PayoutItemTransfer>
                                                <PayoutItemDate>
                                                    <PayoutItemDateText>{new Date(history.created).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</PayoutItemDateText>
                                                    <PayoutItemDateText>•</PayoutItemDateText>
                                                    <PayoutItemDateText>{history.payoutMethod.method}</PayoutItemDateText>
                                                </PayoutItemDate>
                                            </PayoutItemSection1>
                                            <PayoutItemSection2>
                                                <PayoutAmount>
                                                    <span style={{ fontWeight: "400" }}>$</span>
                                                    {(history.amountCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </PayoutAmount>
                                                <PayoutStatus isPaid={history.isPaid} isProcessing={history.created == history.updated}>
                                                    {history.isPaid ? "Paid" : history.created == history.updated ? "Processing" : "Declined"}
                                                </PayoutStatus>
                                            </PayoutItemSection2>
                                        </PayoutItemHeader>
                                        {
                                            (isSelected.includes(key)) && (
                                                <PayoutItemContent>
                                                    <Divider></Divider>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Payout Method</ContentText1>
                                                        <ContentText2>{history.payoutMethod.method}</ContentText2>
                                                    </PayoutItemContentSection>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Reference</ContentText1>
                                                        <ContentText2>{history.id}</ContentText2>
                                                    </PayoutItemContentSection>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Payout Account</ContentText1>
                                                        <ContentText2>{history.payoutMethod.email}</ContentText2>
                                                    </PayoutItemContentSection>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Date</ContentText1>
                                                        <ContentText2>{new Date(history.created).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</ContentText2>
                                                    </PayoutItemContentSection>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Time</ContentText1>
                                                        <ContentText2>{new Date(history.created).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</ContentText2>
                                                    </PayoutItemContentSection>
                                                    <Divider></Divider>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Transfer amount</ContentText1>
                                                        <TransferAmount>${(history.amountCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TransferAmount>
                                                    </PayoutItemContentSection>
                                                    <Divider></Divider>
                                                    <PayoutItemContentSection>
                                                        <ContentText1>Email with confirmation was sent to vladhyperlink@gmail.com <br/>
                                                            If you have any questions, please <HoverLink className="link" onClick={() => {
                                                                closeModal()
                                                                openChatDrawer()
                                                            }}>
                                                                Contact Support
                                                            </HoverLink>.
                                                        </ContentText1>
                                                    </PayoutItemContentSection>
                                                </PayoutItemContent>
                                            )
                                        }
                                    </PayoutItem>
                                </PeriodItem>
                            ))
                        }
                    </PayoutHistoryContainer>
                </div>
            </div>
        </TransferMain>
    )
}

const HoverLink = styled.span`
    &:hover {
        color: var(--cybergreen-400, #33FFDA) !important;
    }
`

const TransferAmount = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.14px;
`

const PeriodItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const ContentText1 = styled.div`
    color: var(--coldgrey-200, #C5C9D3);
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
    align-self: stretch;
    span {
        color: var(--primary-200, #99FFEC);
        cursor: pointer;
    }
`

const ContentText2 = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.14px;
`

const PayoutItemContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;
    border-radius: 3px;
`

const Divider = styled.div`
    height: 1px;
    align-self: stretch;
    background: var(--basegrey-800, #333);
`

const PayoutItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const PayoutItemHeader = styled.div`
    display: flex;
    height: 58px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    cursor: pointer;
`

const PayoutStatus = styled.div<{ isPaid: boolean, isProcessing: boolean}>`
    display: flex;
    height: 12px;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    border-radius: 99px;
    background: ${({ isPaid, isProcessing }) => (isPaid ? "var(--primary-950, #001A15)" : isProcessing ? "var(--info-950, #00171A)" : "var(--danger-950, #170203)")};
    color: ${({ isPaid, isProcessing }) => (isPaid ? "var(--primary-400, #33FFDA)" : isProcessing ? "var(--info-400, #33E7FF)" : "var(--danger-400, #EC464B)")};
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.3px;
`

const PayoutAmount = styled.div`
    color: var(--basegrey-50, #F2F2F2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 122.222% */
    letter-spacing: -0.72px;
`

const PayoutItemSection2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    align-self: stretch;
`

const PayoutItemDateText = styled.div`
    color: var(--coldgrey-400, #8D93A5);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.12px;
`

const PayoutItemDate = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`

const PayoutTransferEmail = styled.div`
    align-self: stretch;
    color: var(--basegrey-50, #F2F2F2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.14px;
`

const PayoutTransferInfoTitle = styled.div`
    color: var(--coldgrey-200, #C6C9D2);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
`

const PayoutTransferInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1 0 0;
`

const PaypalIcon = styled.div`
    display: flex;
    padding: 6px;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    background: var(--coldgrey-800, #2D3039);
`

const PayoutItemTransfer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const PayoutItemSection1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
`

const PayoutItem = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    border-radius: 4px;
    border: 1px solid var(--basegrey-800, #333333);
    background: var(--basegrey-950, #0D0D0D);

    &:hover {
        border-radius: 4px;
        border: 1px solid var(--basegrey-800, #333333);
        background: var(--basegrey-950, #0D0D0D);
    }
`

const PayoutMonth = styled.div`
    display: flex;
    width: 448px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 17.5px */
    align-self: stretch;
`

const PayoutHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`