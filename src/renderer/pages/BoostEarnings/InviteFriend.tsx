import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"
import { AccountScreen } from "../../styles/Settings"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import { UserDetails, Role } from "../../elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import WhatsAppIcon from "/images/boost/WhatsApp.png"
import DiscordIcon from "/images/boost/Discord.png"
import SnapchatIcon from "/images/boost/Snapchat.svg"
import InstagramIcon from "/images/boost_new/instagram.png"
import MessengerIcon from "/images/boost/Messenger.png"
import TelegramIcon from "/images/boost/Telegram.png"

import InviteSVG from "/images/boost_new/inviteuser.svg"
import IncomeSVG from "/images/boost_new/incomepanel.svg"

import { CreateAccountContainer } from "./ShareLink"

type Props = {
  profile: UserDetails
  onClose()
  onSetModal(modal: string)
  setIsPopupOpen(page: string)
}

export const InviteFriend: FC<Props> = ({ profile, onClose, onSetModal, setIsPopupOpen }): ReactElement => {
  const [isCopied, setIsCopied] = useState(false)
  const [isCopiedTemplate, setIsCopiedTemplate] = useState(false)

  const OpenLink = (link) => {
    ipcRenderer.send("OpenBrowser", {
      link: link
    })
  }

  const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>Invite Friends</ModalHeaderText>
        <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Section>
          <Description>
            <div style={{ width: "244px" }}>
              <DescriptionTopTitle style={{ marginBottom: 8 }}>Better with friends</DescriptionTopTitle>
              <DescriptionTitle style={{ marginBottom: 16 }}>Multiply earnings by referring new users</DescriptionTitle>
              <DescriptionContent>
                Receive <a style={{ fontWeight: 600, color: "var(--info-500, #1EE5FF)" }}>5%</a> <a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>of what referred users<br></br> are earning</a>. Earn up to 2x more by <br></br> inviting 10 friends. Best part: you both <br></br>get rewarded!
              </DescriptionContent>
            </div>
            <img src={InviteSVG}></img>
          </Description>
        </Section>
        <Section>
          <SectionHeader>
            <SectionTitle>You both get rewarded</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <RewardItem style={{ marginRight: "8px" }}>
              <RewardTopTitle>You get up to</RewardTopTitle>
              <RewardMiddleTitle>10%</RewardMiddleTitle>
              <RewardFooter>Of your friend’s earnings, <br></br>on us, indefinitely.</RewardFooter>
            </RewardItem>
            <RewardItem>
              <RewardTopTitle>Your friend gets</RewardTopTitle>
              <RewardMiddleTitle>5%</RewardMiddleTitle>
              <RewardFooter>Boost to their earnings, <br></br>on us, indefinitely.</RewardFooter>
            </RewardItem>
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>01</SectionNumber>
            <SectionTitle>Copy your unique referral link</SectionTitle>
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
              <CopyContainer onClick={() => {
                navigator.clipboard.writeText(`https://hyperlink.org/join/${profile?.id}`)
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false)
                }, 3000)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#C6C9D2" />
                </svg>
                <LinkCopier>
                  https://hyperlink.org/join/{profile?.id}
                </LinkCopier>
                {!isCopied ? (
                  <CopyButton onClick={() => {
                    navigator.clipboard.writeText(`https://hyperlink.org/join/${profile?.id}`)
                    setIsCopied(true)
                  }}>
                    <CopyButtonLabel>Copy Link</CopyButtonLabel>
                  </CopyButton>
                ) : (
                  <CopiedButton onClick={() => {
                    setIsCopied(false)
                  }}>
                    <CopiedLabel>Copied!</CopiedLabel>
                  </CopiedButton>
                )}
              </CopyContainer>
            </SectionContent>
          }
          
          <Divider></Divider>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>02</SectionNumber>
            <SectionTitle>Share with your friends</SectionTitle>
          </SectionHeader>
          {/* Added background color as there is a small gap between image and border*/}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <ShareIconContainer style = {{background: "#12df53"}}>
              <ShareIcon src={WhatsAppIcon} onClick={() => {
                OpenLink("https://web.whatsapp.com/")
              }}></ShareIcon>
            </ShareIconContainer>
            <ShareIconContainer style = {{background: "#fff"}}>
              <ShareIcon src={MessengerIcon} onClick={() => {
                OpenLink("https://www.messenger.com/")
              }}></ShareIcon>
            </ShareIconContainer>
            {/* Instagram already has curved border so borderRadius should be smaller*/}
            <ShareIconContainer>
              <ShareIcon src={InstagramIcon} style = {{width: "101%", height: "101%", borderRadius: "10px"}} onClick={() => {
                OpenLink("https://www.instagram.com/")
              }}></ShareIcon>
            </ShareIconContainer>
            <ShareIconContainer style = {{background: "#FFFC00"}}>
              <ShareIcon src={SnapchatIcon} onClick={() => {
                OpenLink("https://accounts.snapchat.com/")
              }}></ShareIcon>
            </ShareIconContainer>
            <ShareIconContainer style = {{background: "#30a3e6"}}>
              <ShareIcon src={TelegramIcon} onClick={() => {
                OpenLink("https://web.telegram.org/")
              }}></ShareIcon>
            </ShareIconContainer>
            <ShareIconContainer style = {{background: "#5865f2"}} >
              <ShareIcon src={DiscordIcon} onClick={() => {
                OpenLink("https://discord.com/channels/@me")
              }}></ShareIcon>
            </ShareIconContainer>
          </div>
          <SectionContent>
            <CopyPasteContainer >
              <CopyPasteTitle>Copy & paste</CopyPasteTitle>
              <CopyPasteSubTitle>We even wrote a template message for you!</CopyPasteSubTitle>
              {!isCopiedTemplate ? (
                <CopyTemplateButton onClick={() => {
                  setIsCopiedTemplate(true)
                  navigator.clipboard.writeText(document.getElementsByClassName("template")[0].textContent)
                  setTimeout(() => {
                    setIsCopiedTemplate(false)
                  }, 3000)
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#F2F2F2" />
                  </svg>
                  <CopyTemplateButtonLabel>Copy Template</CopyTemplateButtonLabel>
                </CopyTemplateButton>
              ) : (
                <CopiedTemplateButton onClick={() => {
                  setIsCopiedTemplate(false)
                }}>
                  <CopiedTemplateLabel>Copied to clipboard!</CopiedTemplateLabel>
                </CopiedTemplateButton>
              )}
                <CopyPasteDescription onClick={() => {
                  setIsCopiedTemplate(true)
                  navigator.clipboard.writeText(document.getElementsByClassName("template")[0].textContent)
                  setTimeout(() => {
                    setIsCopiedTemplate(false)
                  }, 3000)
                }}>
                  <CopyPasteDescriptionText className="template" style={{whiteSpace: "pre-line"}}>
                    <b> "Hey, have you heard of Hyperlink?" {"\n\n"} </b>
                    {"You can earn money passively by utilizing your unused computer time and earn up to $8,690 / computer / year."}
                    {"\n\n"}
                    {"Multiply your earnings 2x with multiple PCs. Invite friends for a 100x bonus."}
                    {"\n\n"}
                    <b>Start today! Download Hyperlink at </b> <a>https://hyperlink.org/join/{profile?.id}</a>
                  </CopyPasteDescriptionText>
                </CopyPasteDescription>
            </CopyPasteContainer>
          </SectionContent>
          <Divider></Divider>
        </Section>
        <Section style={{ marginBottom: 30 }}>
          <SectionHeader>
            <SectionNumber>03</SectionNumber>
            <SectionTitle>Keep track of your referrals through <a style={{ color: "var(--primary-200, #99FFEC)", cursor: "pointer" }} onClick={() => {
              onSetModal("Device")
              setIsPopupOpen("summary")
            }}>Income Sources</a></SectionTitle>
          </SectionHeader>
          <SectionContent>
            <img src={IncomeSVG}></img>
          </SectionContent>
        </Section>
      </ModalContent>
    </AccountScreen >
  )
}

const CopiedTemplateLabel = styled.div`
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

const CopiedTemplateButton = styled.div`
  display: flex;
  height: 32px;
  padding: 4px 6px 4px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  border: 2px solid var(--basegrey-100, transparent);
  cursor: pointer;
  box-sizing: border-box;
`

const ShareIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  flex-shrink: 0;
`
const ShareIconContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 2px solid var(--coldgrey-800, #2C303A);
  cursor: pointer;
  &:hover {
    border: 2px solid var(--coldgrey-400, #8D93A5);
  }
`

const CopyPasteDescriptionText = styled.span`
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
    a {
      color: var(--primary-500, #00EFC3);
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 125%;
      text-decoration-line: underline;

    }

    b {
      font-weight: 700;
    }

`

const CopyPasteDescription = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--coldgrey-200, #C6C9D2);
  background: var(--basegrey-950, #0D0D0D);
  cursor:pointer;

  span {
    &:hover {
      color: var(--white);
      opacity: 10%;
    }
  }


`

const CopyPasteTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    color: var(--coldgrey-50, #F1F1F4);
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.16px;
`

const CopyPasteSubTitle = styled.div`
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
`

const CopyPasteContainer = styled.div`
    display: flex;
    padding: 16px 24px 24px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 12px;
    background: #000;
    height: 384px;
    box-sizing: border-box;
`

const RewardTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    color: var(--coldgrey-50, #F1F1F4);
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.16px;
`

const RewardMiddleTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    color: var(--basegrey-200, #CCC);
    font-family: Manrope;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
`

const RewardFooter = styled.div`
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
`

const RewardItem = styled.div`
    display: flex;
    width: 180px;
    padding: 16px 24px 24px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 12px;
    background: var(--coldgrey-900, #16181D);   
`
const ManageButtonTitle = styled.span`
    color: var(--basegrey-50, #F2F2F2);
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

    &:hover {
      border-radius: 99px;
      background: rgba(241, 241, 244, 0.30);
    }
`

const IconTitle = styled.div`
  width: 300px;
  color: #FFF;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.16px;
`

const Icon = styled.img`
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: rgba(44, 48, 58, 0.50);
`
const IncomeSourceContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--coldgrey-900, #16181D);
  cursor: pointer;
`

const CopyTemplateButtonLabel = styled.div`
  color: var(--basegrey-50, #F2F2F2);
  text-align: center;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
`

const CopyTemplateButton = styled.div`
  display: flex;
  height: 32px;
  padding: 4px 6px 4px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  border: 2px solid var(--basegrey-100, #E6E6E6);
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

  cursor: pointer;
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
`
const CopiedButton = styled.div`
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const CopiedLabel = styled.div`
  color: var(--primary-400, #33FFDA);
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

const CopyButtonLabel = styled.div`
  color: var(--basegrey-950, #0D0D0D);
  text-align: center;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
`

const CopyButton = styled.div`
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: var(--primary-500, #00EFC3);
  cursor: pointer;
  &:hover {
    background: transparent;
    border: 1px solid var(--primary-500, #00EFC3);
    div {
      color: var(--primary-400, #33FFDA);
      text-align: center;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
      letter-spacing: 0.14px;
    } 
  }
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
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--primary-400, #33FFDA);
  background: var(--basegrey-950, #0D0D0D);
  cursor: pointer;
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
  width: var(--RightPanelWidth);
  height: 688px;
  padding: 12px 64px 0px 48px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
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
  margin-top: 16px;
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