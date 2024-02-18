import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "../elements/EventListeners"
import WelcomeImg from "../../../images/welcome.svg"
import WelcomeBottomImg from "../../../images/welcomebottom.svg"
import { ipcRenderer } from "electron"

type Props = {
    onClose()
    onOpenProfile()
}

export const WelcomeScreen: FC<Props> = ({ onClose, onOpenProfile }): ReactElement => {

    return (
        <Overlayer onClick={onClose}>
            <ModalWindow onClick={stopEventPropagation}>
                <ModalLeftContainer>
                    <ModalLeftContent>
                        <LeftEffect>
                            <Img src={WelcomeImg}></Img>
                        </LeftEffect>
                        <ModalLeftDescription>
                            <ModalLeftDescriptionText>
                                Take advantage of <br></br>earnings boosts <br></br>by signing in
                            </ModalLeftDescriptionText>
                        </ModalLeftDescription>
                    </ModalLeftContent>
                </ModalLeftContainer>
                <VerticalDivider />
                <ModalRightContainer>
                    <ModalRightHeader>
                        <ModalRightHeaderText>
                            <span>Welcome to Hyperlink</span>
                        </ModalRightHeaderText>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={() => {
                            onClose()
                        }} style={{ cursor: "pointer" }}>
                            <path d="M19.829 4.99203L19.008 4.17105C18.7799 3.94298 18.4101 3.94298 18.1821 4.17105L12 10.3531L5.81793 4.17105C5.58986 3.94298 5.2201 3.94298 4.99203 4.17105L4.17106 4.99202C3.94299 5.22009 3.94299 5.58986 4.17106 5.81792L10.3531 12L4.17106 18.1821C3.943 18.4101 3.943 18.7799 4.17106 19.008L4.99204 19.829C5.2201 20.057 5.58987 20.057 5.81793 19.829L12 13.6468L18.1821 19.8289C18.4102 20.057 18.7799 20.057 19.008 19.8289L19.829 19.0079C20.057 18.7799 20.057 18.4101 19.829 18.182L13.6469 12L19.829 5.81792C20.057 5.58986 20.057 5.22009 19.829 4.99203Z" fill="#A8ADBD" />
                        </svg>
                    </ModalRightHeader>
                    <ModalRightContent>
                        <Section1>
                            <Section1Header>
                                <Section1HeaderTitle>Welcome to Phase1</Section1HeaderTitle>
                                <Section1HeaderDescription>Earn passively and fuel the future</Section1HeaderDescription>
                            </Section1Header>
                            <Section1Content>
                                In Phase 1 we are testing our network before we can roll out full <br></br>capabilities and full payouts
                            </Section1Content>
                            <HorizontalDivider style={{ marginTop: "8px" }} />
                        </Section1>
                        <Section2>
                            <Section2Content>
                                <Section2ContentText1>your potential earnings in phase 2</Section2ContentText1>
                                <Section2ContentText2>
                                    <Section2ContentTextValue>
                                        <span>$</span> 8,689
                                    </Section2ContentTextValue>
                                    <Section2ContentTextUnit>per year</Section2ContentTextUnit>
                                </Section2ContentText2>
                            </Section2Content>
                            <HorizontalDivider />
                        </Section2>
                        <Section3>
                            <Section3Content>
                                <Section3Title>Unlock early access</Section3Title>
                                <Section3Text>Gain access to Phase 2 earnings ahead of our official launch by <br></br>maintaining uptime and thus helping us to benchmark our network.</Section3Text>
                            </Section3Content>
                            <HorizontalDivider />
                        </Section3>
                        <SectionTier>
                            <SectionTierContent>
                                <SectionTierHeader>
                                    <SectionTierTitle>Tier 3 priotiry</SectionTierTitle>
                                    <SectionTierUnlock>
                                        <span>72 hrs left to unlock</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.75 6V7.5H13.5C13.9142 7.5 14.25 7.83582 14.25 8.25V15C14.25 15.4143 13.9142 15.75 13.5 15.75L4.5 15.7496C4.08582 15.7496 3.75 15.4138 3.75 14.9996V8.25C3.75 7.83582 4.08582 7.5 4.5 7.5H5.25V6C5.25 3.93228 6.93228 2.25 9 2.25C11.0677 2.25 12.75 3.93228 12.75 6ZM9 3.75C7.75946 3.75 6.75 4.75946 6.75 6V7.5H11.25V6C11.25 4.75946 10.2405 3.75 9 3.75ZM9 12.7496C9.62132 12.7496 10.125 12.246 10.125 11.6246C10.125 11.0033 9.62132 10.4996 9 10.4996C8.37868 10.4996 7.875 11.0033 7.875 11.6246C7.875 12.246 8.37868 12.7496 9 12.7496Z" fill="#A8ADBD" />
                                        </svg>
                                    </SectionTierUnlock>
                                </SectionTierHeader>
                                <SectionTierTag color={`rgba(51, 231, 255, 0.20)`}>Early Access</SectionTierTag>
                                <SectionTierText>Gain access to Phase 2 with amazing earning 20 days ahead of <br></br>everyone else.</SectionTierText>
                            </SectionTierContent>
                            <HorizontalDivider />
                        </SectionTier>
                        <SectionTier>
                            <SectionTierContent>
                                <SectionTierHeader>
                                    <SectionTierTitle>Tier 2 priotiry</SectionTierTitle>
                                    <SectionTierUnlock>
                                        <span>200 hrs after Tier 3</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.75 6V7.5H13.5C13.9142 7.5 14.25 7.83582 14.25 8.25V15C14.25 15.4143 13.9142 15.75 13.5 15.75L4.5 15.7496C4.08582 15.7496 3.75 15.4138 3.75 14.9996V8.25C3.75 7.83582 4.08582 7.5 4.5 7.5H5.25V6C5.25 3.93228 6.93228 2.25 9 2.25C11.0677 2.25 12.75 3.93228 12.75 6ZM9 3.75C7.75946 3.75 6.75 4.75946 6.75 6V7.5H11.25V6C11.25 4.75946 10.2405 3.75 9 3.75ZM9 12.7496C9.62132 12.7496 10.125 12.246 10.125 11.6246C10.125 11.0033 9.62132 10.4996 9 10.4996C8.37868 10.4996 7.875 11.0033 7.875 11.6246C7.875 12.246 8.37868 12.7496 9 12.7496Z" fill="#A8ADBD" />
                                        </svg>
                                    </SectionTierUnlock>
                                </SectionTierHeader>
                                <SectionTierTag color={`rgba(51, 231, 255, 0.20)`}>Early Access</SectionTierTag>
                                <SectionTierText>Gain access to Phase 2 with amazing earning 30 days ahead of <br></br>everyone else.</SectionTierText>
                                <SectionTierTag color={`rgba(124, 58, 248, 0.20)`}>Priority</SectionTierTag>
                                <SectionTierText>Get a priority spot in your local region for premium workloads and <br></br>premium payouts in Phase 2.</SectionTierText>
                            </SectionTierContent>
                            <HorizontalDivider />
                        </SectionTier>
                        <SectionTier>
                            <SectionTierContent>
                                <SectionTierHeader>
                                    <SectionTierTitle>Tier 1 priotiry</SectionTierTitle>
                                    <SectionTierUnlock>
                                        <span>400 hrs after Tier 2</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.75 6V7.5H13.5C13.9142 7.5 14.25 7.83582 14.25 8.25V15C14.25 15.4143 13.9142 15.75 13.5 15.75L4.5 15.7496C4.08582 15.7496 3.75 15.4138 3.75 14.9996V8.25C3.75 7.83582 4.08582 7.5 4.5 7.5H5.25V6C5.25 3.93228 6.93228 2.25 9 2.25C11.0677 2.25 12.75 3.93228 12.75 6ZM9 3.75C7.75946 3.75 6.75 4.75946 6.75 6V7.5H11.25V6C11.25 4.75946 10.2405 3.75 9 3.75ZM9 12.7496C9.62132 12.7496 10.125 12.246 10.125 11.6246C10.125 11.0033 9.62132 10.4996 9 10.4996C8.37868 10.4996 7.875 11.0033 7.875 11.6246C7.875 12.246 8.37868 12.7496 9 12.7496Z" fill="#A8ADBD" />
                                        </svg>
                                    </SectionTierUnlock>
                                </SectionTierHeader>
                                <SectionTierTag color={`rgba(51, 231, 255, 0.20)`}>Early Access</SectionTierTag>
                                <SectionTierText>Gain access to Phase 2 with amazing earning 40 days ahead <br></br>of everyone else.</SectionTierText>
                                <SectionTierTag color={`rgba(124, 58, 248, 0.20)`}>Priority</SectionTierTag>
                                <SectionTierText>Get a permanent priority spot for premium workloads and premium <br></br> payouts in Phase 2.</SectionTierText>
                            </SectionTierContent>
                            <HorizontalDivider />
                        </SectionTier>
                        <SectionBottom>
                            <SectionButtomText>
                                Check in frequently to make sure your all your computers <br></br> are online and running
                            </SectionButtomText>
                            <img src={WelcomeBottomImg}></img>
                            <HorizontalDivider />
                        </SectionBottom>
                        <BottomText>
                            * $8,689 are predicted earnings in Phase 2 and are based on your <br></br>current computer specifications, assuming 99% uptime.
                        </BottomText>
                    </ModalRightContent>
                    <ModalRightContentBottom>
                        <BottomContent>
                            <span>Maximize your earnings and cash out easily</span>
                            <SignUpButton onClick={onOpenProfile}>Sign Up</SignUpButton>
                        </BottomContent>
                    </ModalRightContentBottom>
                </ModalRightContainer>
            </ModalWindow>
        </Overlayer>
    )
}

const VerticalDivider = styled.div`
    width: 1px;
    height: 660px;
    background: rgba(255, 255, 255, 0.15);
`

const LeftEffect = styled.div`
    width: 248px;
    height: 360px;
    border-radius: 8px;
    background: var(--dark-black, #0E0D17);

    .bg-effect {
        width: 547px;
        height: 543px;
        flex-shrink: 0;
    }

    .bg-rectangle {
        width: 547px;
        height: 543px;
        flex-shrink: 0;
        background: #D9D9D9;
    }

    .bg-ellipse1 {
        width: 1001px;
        height: 938px;
        transform: rotate(-90deg);
        flex-shrink: 0;
        border-radius: 1001px;
        background: var(--info-100, #CCF9FF);
        filter: blur(44.96403121948242px);
    }

    .bg-ellipse2 {
        width: 222.651px;
        height: 1077.594px;
        transform: rotate(106.437deg);
        flex-shrink: 0;
        border-radius: 1077.594px;
        background: var(--info-100, #CCF9FF);
        filter: blur(44.96403121948242px);
    }
`

const SignUpButton = styled.div`
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

const BottomContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    margin-left: 46px;

    span {
        width: 448px;
        align-self: stretch;
        color: var(--coldgrey-50, #F1F1F4);
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 150% */
        letter-spacing: 0.16px;
    }
`

const ModalRightContentBottom = styled.div`
    display: flex;
    width: 540px;
    padding: 20px 10px 32px 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.60) 25.52%, rgba(0, 0, 0, 0.00) 100%), rgba(255, 255, 255, 0.05);
    box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.20);
    backdrop-filter: blur(6px);
    position: absolute;
    bottom: 0px;
    border-bottom-right-radius: 8px;
`

const BottomText = styled.div`
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    margin-bottom: 168px;
`

const SectionBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const SectionButtomText = styled.div`
    color: var(--coldgrey-50, #F1F1F4);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 125% */
    letter-spacing: 0.16px;
`

const SectionTierText = styled.div`
    color: var(--coldgrey-100, #E2E4E9);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
`

const SectionTierTag = styled.div<{color: string}>`
    display: flex;
    height: 24px;
    padding: 3px 8px 4px 8px;
    align-items: center;
    border-radius: 99px;
    background: ${({ color }) => color};
    color: #F2F2F2;
    text-align: center;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    letter-spacing: 0.35px;
`

const SectionTierUnlock = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    span {
        color: var(--coldgrey-300, #A8ADBD);
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
        letter-spacing: 0.16px;
    }
`

const SectionTierTitle = styled.div`
    color: var(--coldgrey-50, #F1F1F4);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    letter-spacing: 0.2px;
    flex: 1 0 0;
`

const SectionTierHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const SectionTierContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
`

const SectionTier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const Section3Title = styled.div`
    align-self: stretch;
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

const Section3Text = styled.div`
    align-self: stretch;
    color: var(--coldgrey-100, #E2E4E9);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
`

const Section3Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const Section3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const Section2ContentTextValue = styled.div`
    display: flex;
    align-items: baseline;
    color: var(--primary-300, #66FFE3);
    font-family: Manrope;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: 42px; /* 116.667% */
    letter-spacing: -2.16px;
    gap: 1px;
    span {
        color: var(--primary-300, #66FFE3);
        font-family: Manrope;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 36px; /* 112.5% */
        letter-spacing: -1.92px;
    }
`

const Section2ContentTextUnit = styled.div`
    color: var(--coldgrey-200, #C6C9D2);
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
    letter-spacing: 0.16px;
`

const Section2ContentText2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Section2ContentText1 = styled.div`
    color: var(--coldgrey-50, #F1F1F4);
    text-align: center;
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
    letter-spacing: 1.12px;
    text-transform: uppercase;
`

const Section2Content = styled.div`
    display: flex;
    padding: 32px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const Section2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`

const HorizontalDivider = styled.div`
    width: 448px;
    height: 1px;
    border-radius: 1px;
    background: var(--basegrey-800, #333);
`

const Section1HeaderTitle = styled.div`
    align-self: stretch;
    color: var(--primary-300, #66FFE3);
    font-variant-numeric: lining-nums tabular-nums;
    font-feature-settings: 'liga' off;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    letter-spacing: 0.2px;
`

const Section1HeaderDescription = styled.div`
    align-self: stretch;
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

const Section1Content = styled.div`
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
`

const Section1Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`

const Section1 = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    align-items: flex-start;
    align-self: stretch;
    gap: 16px;
    flex: 1 0 0;
`

const ModalRightHeaderText = styled.div`
    display: flex;
    align-items: center;
    flex: 1 0 0;
    span {
        color: var(--white, #FFF);
        font-family: Manrope;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%; /* 24px */
    }
`

const ModalRightHeader = styled.div`
    display: flex;
    width: 488px;
    padding: 24px 24px 24px 48px;
    align-items: center;
    gap: 12px;
`

const ModalRightContent = styled.div`
    display: flex;
    width: 448px;
    padding: 12px 64px 0px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    border-radius: 8px;
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);
    overflow-y: auto;
    height: 560px;
    overflow-x: hidden;
    padding-right: 56px;
`

const ModalRightContainer = styled.div`
    width: 560px;
    height: 660px;
    flex-shrink: 0;
    border-radius: 0px 12px 12px 0px;
    background: #0A0A0A;
`

const ModalLeftDescriptionText = styled.span`
    color: #FFF;
    font-feature-settings: 'liga' off;
    font-family: Space Grotesk;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 100% */
    letter-spacing: -0.7px;
`

const ModalLeftDescription = styled.div`
    display: flex;
    width: 248px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
`

const Img = styled.img`
    width: 248px;
    height: 360px;
    border-radius: 8px;
    background: var(--dark-black, #0E0D17);
`

const ModalLeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 12px;
`

const ModalLeftContainer = styled.div`
    display: inline-flex;
    padding: 24px 18px 36px 18px;
    flex-direction: column;
    align-items: center;
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
    height: 600px;
`

const Overlayer = styled.div`
    background: rgba(0, 0, 0, 0.90);
    backdrop-filter: blur(6px);
    width: 1280px;
    height: 800px;
    flex-shrink: 0;
`

const ModalWindow = styled.div`
    position: absolute;
    top: 70px;
    left: 218px;
    width: 845px;
    height: 660px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: row;
`