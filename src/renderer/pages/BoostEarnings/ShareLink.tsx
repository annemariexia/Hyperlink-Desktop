import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"
import { ipcRenderer } from "electron"

import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails, Role } from "../../elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import DollarIcon from "/images/Dollar.png"

import IncomeSVG from "/images/boost_new/incomepanel.svg"
import SharelinkSVG from "/images/boost_new/ShareLink.svg"

import FacebookIcon from "/images/boost/Facebook.svg"
import TwitterIcon from "/images/boost/Twitter.svg"
import LinkedInIcon from "/images/boost/LinkedIn.svg"
import InstagramIcon from "/images/boost/Instagram.svg"
import PinterestIcon from "/images/boost/Pinterest.svg"
import YoutubeIcon from "/images/boost/Youtube.svg"
import TiktokIcon from "/images/boost/TicToc.svg"
import SnapchatIcon from "/images/boost/Snapchat.svg"
import TwitchIcon from "/images/boost/Twitch.svg"
import WhatsAppIcon from "/images/boost/WhatsApp.svg"
import MessengerIcon from "/images/boost/Messenger.svg"
import TelegramIcon from "/images/boost/Telegram.svg"
import DiscordIcon from "/images/boost/Discord.svg"
import QuoraIcon from "/images/boost/Quora.svg"
import RedditIcon from "/images/boost/Reddit.svg"
import MediumIcon from "/images/boost/Medium.svg"
import BloggerIcon from "/images/boost/Blogger.svg"

type Props = {
  profile: UserDetails | null
  onClose()
  onSetModal: (modal: string) => void
  setIsPopupOpen(page: string)
}

export const ShareLink: FC<Props> = ({ profile, onClose, onSetModal, setIsPopupOpen }): ReactElement => {
  const [isCopied, setIsCopied] = useState(false)
  const [isTemplateCopied, setIsTemplateCopied] = useState([])

  const OpenLink = (link) => {
    ipcRenderer.send("OpenBrowser", {
      link: link
    })
  }

  const isGuestOrNoProfile = !profile || (profile && profile.role === Role.Guest)

  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>Share Link</ModalHeaderText>
        <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </ModalHeader>
      <ModalContent>
        <Section>
          <Description>
            <div style={{ width: "244px" }}>
              <DescriptionTopTitle style={{ marginBottom: 8 }}>Share with the World</DescriptionTopTitle>
              <DescriptionTitle style={{ marginBottom: 16 }}>Multiply earnings by referring new users</DescriptionTitle>
              <DescriptionContent>Receive <a style={{ fontWeight: 600, color: "var(--info-500, #1EE5FF)" }}>5%</a> <a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>of what referred users <br></br> are earning.</a> Refer 1,000 new users to <br></br>100x your earnings. That is up to <br></br>$860,000 per year!</DescriptionContent>
            </div>
            <img src={SharelinkSVG}></img>
          </Description>
        </Section>
        <Section>
          <SectionHeader>
            <SectionTitle>You both get rewarded</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <RewardItem style={{ marginRight: 8 }}>
              <RewardTopTitle>You get</RewardTopTitle>
              <RewardMiddleTitle>5%</RewardMiddleTitle>
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
            <SectionTitle>{isGuestOrNoProfile ? "Create an account to get your referral link" : "Copy your unique referral link"}</SectionTitle>
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
                navigator.clipboard.writeText(`www.hyperlink.org/join/${profile?.id}`)
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false)
                }, 3000)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#C6C9D2" />
                </svg>
                <LinkCopier>
                  www.hyperlink.org/join/{profile?.id}
                </LinkCopier>
                {!isCopied ? (
                  <CopyButton onClick={() => {
                    navigator.clipboard.writeText(`www.hyperlink.org/join/${profile?.id}`)
                    setIsCopied(true)
                    setTimeout(() => {
                      setIsCopied(false)
                    }, 3000)
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
            <SectionTitle>Share link through various channels</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ChannelContainer>
              <ChannelTitle>Feed & Profile</ChannelTitle>
              <ChannelDescription>
                Share posts with the link or add it to your profile bio.
              </ChannelDescription>
              <ChannelIcons>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={FacebookIcon} onClick={() => {
                    OpenLink("https://www.facebook.com/")
                  }}></ShareIcon>
                  <ShareIcon src={TwitterIcon} onClick={() => {
                    OpenLink("https://www.twitter.com/")
                  }}></ShareIcon>
                  <ShareIcon src={LinkedInIcon} onClick={() => {
                    OpenLink("https://www.linkedin.com/")
                  }}></ShareIcon>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={InstagramIcon} onClick={() => {
                    OpenLink("https://www.instagram.com/")
                  }}></ShareIcon>
                  <ShareIcon src={PinterestIcon} onClick={() => {
                    OpenLink("https://www.pinterest.com/")
                  }}></ShareIcon>
                </div>
                <IconDescription style={{ marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: "8px" }}>
                    <path d="M15.2782 14.2943C15.7958 13.8135 16.125 13.1348 16.125 12.375C16.125 10.9275 14.9475 9.75 13.5 9.75C12.0525 9.75 10.875 10.9275 10.875 12.375C10.875 13.1348 11.2042 13.8135 11.7218 14.2943C10.6132 14.6947 9.75 15.465 9.75 16.5H11.25C11.25 16.0515 12.3097 15.4823 13.5 15.4823C14.6903 15.4823 15.75 16.0522 15.75 16.5H17.25C17.25 15.465 16.3868 14.6947 15.2782 14.2943ZM13.5 11.25C14.1202 11.25 14.625 11.7548 14.625 12.375C14.625 12.9952 14.1202 13.5 13.5 13.5C12.8798 13.5 12.375 12.9952 12.375 12.375C12.375 11.7548 12.8798 11.25 13.5 11.25ZM6.27825 14.2943C7.38675 14.6947 8.25 15.465 8.25 16.5H6.75C6.75 16.0515 5.69025 15.4823 4.5 15.4823C3.30975 15.4823 2.25 16.0515 2.25 16.5H0.75C0.75 15.465 1.61325 14.6947 2.72175 14.2943C2.20425 13.8135 1.875 13.1348 1.875 12.375C1.875 10.9275 3.0525 9.75 4.5 9.75C5.9475 9.75 7.125 10.9275 7.125 12.375C7.125 13.1348 6.79575 13.8135 6.27825 14.2943ZM4.5 11.25C3.87975 11.25 3.375 11.7548 3.375 12.375C3.375 12.9952 3.87975 13.5 4.5 13.5C5.12025 13.5 5.625 12.9952 5.625 12.375C5.625 11.7548 5.12025 11.25 4.5 11.25ZM11.25 8.25C11.25 7.8015 10.1903 7.23225 9 7.23225C7.80975 7.23225 6.75 7.8015 6.75 8.25H5.25C5.25 7.215 6.11325 6.44475 7.22175 6.04425C6.70425 5.56425 6.375 4.88475 6.375 4.125C6.375 2.6775 7.5525 1.5 9 1.5C10.4475 1.5 11.625 2.6775 11.625 4.125C11.625 4.88475 11.2958 5.56425 10.7782 6.04425C11.8868 6.44475 12.75 7.215 12.75 8.25H11.25ZM9 3C8.37975 3 7.875 3.50475 7.875 4.125C7.875 4.74525 8.37975 5.25 9 5.25C9.62025 5.25 10.125 4.74525 10.125 4.125C10.125 3.50475 9.62025 3 9 3Z" fill="white" fillOpacity="0.95" />
                  </svg>
                  Reach your entire network
                </IconDescription>
                <DividerSmaller />
                <CopyTemplateContainer style={{ marginTop: 16 }}>
                  {
                    (!isTemplateCopied.includes("feed")) ? (
                      <CopyTemplateButton onClick={() => {
                        const newArray = [...isTemplateCopied, "feed"];
                        setIsTemplateCopied(newArray)
                        window.navigator.clipboard.writeText(`Start today! Download Hyperlink at www.hyperlink.org/join/${profile?.id}`)
                        setTimeout(() => {
                          const newArray = isTemplateCopied.filter((element) => element != "feed")
                          setIsTemplateCopied(newArray)
                        }, 3000)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#F2F2F2" />
                        </svg>
                        <CopyTemplateButtonLabel>Copy Template</CopyTemplateButtonLabel>
                      </CopyTemplateButton>
                    ) : (
                      <CopiedTemplateButton style={{ background: "transparent", borderColor: "transparent" }} onClick={() => {
                        const newArray = isTemplateCopied.filter((element) => element != "feed")
                        setIsTemplateCopied(newArray)
                      }}>
                        <CopyTemplateButtonLabel>Copied to clipboard!</CopyTemplateButtonLabel>
                      </CopiedTemplateButton>
                    )
                  }
                  <CopyTemplateDescription>
                    A template of a post with product description and your unique share link.
                  </CopyTemplateDescription>
                </CopyTemplateContainer>
              </ChannelIcons>
            </ChannelContainer>
            <ChannelContainer>
              <ChannelTitle>Direct Messages</ChannelTitle>
              <ChannelDescription>
                Send link to your contacts via direct messages.
              </ChannelDescription>
              <ChannelIcons>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={WhatsAppIcon} onClick={() => {
                    OpenLink("https://web.whatsapp.com/")
                  }}></ShareIcon>
                  <ShareIcon src={MessengerIcon} onClick={() => {
                    OpenLink("https://www.messenger.com/")
                  }}></ShareIcon>
                  <ShareIcon src={InstagramIcon} onClick={() => {
                    OpenLink("https://www.instagram.com/")
                  }}></ShareIcon>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={SnapchatIcon} onClick={() => {
                    OpenLink("https://www.snapchat.com/")
                  }}></ShareIcon>
                  <ShareIcon src={TelegramIcon} onClick={() => {
                    OpenLink("https://telegram.org/")
                  }}></ShareIcon>
                  <ShareIcon src={DiscordIcon} onClick={() => {
                    OpenLink("https://discord.com/app")
                  }}></ShareIcon>
                </div>
                <IconDescription style={{ marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: "8px" }}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 6C6 7.6545 7.34546 9 9 9C10.6545 9 12 7.6545 12 6C12 4.3455 10.6545 3 9 3C7.34546 3 6 4.3455 6 6ZM7.5 6C7.5 5.172 8.17273 4.5 9 4.5C9.82727 4.5 10.5 5.172 10.5 6C10.5 6.82725 9.82727 7.5 9 7.5C8.17273 7.5 7.5 6.82725 7.5 6Z" fill="white" fillOpacity="0.95" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.375 15C3.16791 15 3 14.8321 3 14.625V14.25C3 11.6003 5.46753 9.75 9 9.75C12.5325 9.75 15 11.6003 15 14.25V14.625C15 14.8321 14.8321 15 14.625 15H3.375ZM13.3815 13.5H4.61929C5.06781 12.144 6.74478 11.25 9.00082 11.25C11.2568 11.25 12.933 12.144 13.3815 13.5Z" fill="white" fillOpacity="0.95" />
                  </svg>
                  Reach one at a time
                </IconDescription>
                <DividerSmaller />
                <CopyTemplateContainer style={{ marginTop: 16 }}>
                  {
                    (!isTemplateCopied.includes("message")) ? (
                      <CopyTemplateButton onClick={() => {
                        const newArray = [...isTemplateCopied, "message"];
                        setIsTemplateCopied(newArray)
                        window.navigator.clipboard.writeText(`Start today! Download Hyperlink at https://hyperlink.org/join/${profile?.id}`)
                        setTimeout(() => {
                          const newArray = isTemplateCopied.filter((element) => element != "message")
                          setIsTemplateCopied(newArray)
                        }, 3000)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#F2F2F2" />
                        </svg>
                        <CopyTemplateButtonLabel>Copy Template</CopyTemplateButtonLabel>
                      </CopyTemplateButton>
                    ) : (
                      <CopiedTemplateButton style={{ background: "transparent", borderColor: "transparent" }} onClick={() => {
                        const newArray = isTemplateCopied.filter((element) => element != "message")
                        setIsTemplateCopied(newArray)
                      }}>
                        <CopyTemplateButtonLabel>Copied to clipboard!</CopyTemplateButtonLabel>
                      </CopiedTemplateButton>
                    )
                  }
                  <CopyTemplateDescription>
                    A message template with product description and your unique share link.
                  </CopyTemplateDescription>
                </CopyTemplateContainer>
              </ChannelIcons>
            </ChannelContainer>
          </SectionContent>
          <SectionContent style={{ marginTop: 10 }}>
            <ChannelContainer>
              <ChannelTitle>Videos</ChannelTitle>
              <ChannelDescription>
                Put link in the description of your video.
              </ChannelDescription>
              <ChannelIcons>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={YoutubeIcon} onClick={() => {
                    OpenLink("https://www.youtube.com/")
                  }}></ShareIcon>
                  <ShareIcon src={TiktokIcon} onClick={() => {
                    OpenLink("https://www.tiktok.com/")
                  }}></ShareIcon>
                  <ShareIcon src={InstagramIcon} onClick={() => {
                    OpenLink("https://www.instagram.com/")
                  }}></ShareIcon>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={SnapchatIcon} onClick={() => {
                    OpenLink("https://www.snapchat.com/")
                  }}></ShareIcon>
                  <ShareIcon src={TwitchIcon} onClick={() => {
                    OpenLink("https://www.twitch.tv/")
                  }}></ShareIcon>
                </div>
                <IconDescription style={{ marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: "8px" }}>
                    <path d="M15.2782 14.2943C15.7958 13.8135 16.125 13.1348 16.125 12.375C16.125 10.9275 14.9475 9.75 13.5 9.75C12.0525 9.75 10.875 10.9275 10.875 12.375C10.875 13.1348 11.2042 13.8135 11.7218 14.2943C10.6132 14.6947 9.75 15.465 9.75 16.5H11.25C11.25 16.0515 12.3097 15.4823 13.5 15.4823C14.6903 15.4823 15.75 16.0522 15.75 16.5H17.25C17.25 15.465 16.3868 14.6947 15.2782 14.2943ZM13.5 11.25C14.1202 11.25 14.625 11.7548 14.625 12.375C14.625 12.9952 14.1202 13.5 13.5 13.5C12.8798 13.5 12.375 12.9952 12.375 12.375C12.375 11.7548 12.8798 11.25 13.5 11.25ZM6.27825 14.2943C7.38675 14.6947 8.25 15.465 8.25 16.5H6.75C6.75 16.0515 5.69025 15.4823 4.5 15.4823C3.30975 15.4823 2.25 16.0515 2.25 16.5H0.75C0.75 15.465 1.61325 14.6947 2.72175 14.2943C2.20425 13.8135 1.875 13.1348 1.875 12.375C1.875 10.9275 3.0525 9.75 4.5 9.75C5.9475 9.75 7.125 10.9275 7.125 12.375C7.125 13.1348 6.79575 13.8135 6.27825 14.2943ZM4.5 11.25C3.87975 11.25 3.375 11.7548 3.375 12.375C3.375 12.9952 3.87975 13.5 4.5 13.5C5.12025 13.5 5.625 12.9952 5.625 12.375C5.625 11.7548 5.12025 11.25 4.5 11.25ZM11.25 8.25C11.25 7.8015 10.1903 7.23225 9 7.23225C7.80975 7.23225 6.75 7.8015 6.75 8.25H5.25C5.25 7.215 6.11325 6.44475 7.22175 6.04425C6.70425 5.56425 6.375 4.88475 6.375 4.125C6.375 2.6775 7.5525 1.5 9 1.5C10.4475 1.5 11.625 2.6775 11.625 4.125C11.625 4.88475 11.2958 5.56425 10.7782 6.04425C11.8868 6.44475 12.75 7.215 12.75 8.25H11.25ZM9 3C8.37975 3 7.875 3.50475 7.875 4.125C7.875 4.74525 8.37975 5.25 9 5.25C9.62025 5.25 10.125 4.74525 10.125 4.125C10.125 3.50475 9.62025 3 9 3Z" fill="white" fillOpacity="0.95" />
                  </svg>
                  Mass outreach
                </IconDescription>
                <DividerSmaller />
                <CopyTemplateContainer style={{ marginTop: 16 }}>
                  {
                    (!isTemplateCopied.includes("video")) ? (
                      <CopyTemplateButton onClick={() => {
                        const newArray = [...isTemplateCopied, "video"];
                        setIsTemplateCopied(newArray)
                        window.navigator.clipboard.writeText(`Start today! Download Hyperlink at https://hyperlink.org/join/${profile?.id}`)
                        setTimeout(() => {
                          const newArray = isTemplateCopied.filter((element) => element != "video")
                          setIsTemplateCopied(newArray)
                        }, 3000)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#F2F2F2" />
                        </svg>
                        <CopyTemplateButtonLabel>Copy Template</CopyTemplateButtonLabel>
                      </CopyTemplateButton>
                    ) : (
                      <CopiedTemplateButton style={{ background: "transparent", borderColor: "transparent" }} onClick={() => {
                        const newArray = isTemplateCopied.filter((element) => element != "video")
                        setIsTemplateCopied(newArray)
                      }}>
                        <CopyTemplateButtonLabel>Copied to clipboard!</CopyTemplateButtonLabel>
                      </CopiedTemplateButton>
                    )
                  }
                  <CopyTemplateDescription>
                    A template with product description and your unique share link.
                  </CopyTemplateDescription>
                </CopyTemplateContainer>
              </ChannelIcons>
            </ChannelContainer>
            <ChannelContainer>
              <ChannelTitle>Blog</ChannelTitle>
              <ChannelDescription>
                Share a blog post mentioning Hyperlink.
              </ChannelDescription>
              <ChannelIcons>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={QuoraIcon} onClick={() => {
                    OpenLink("https://www.quora.com/")
                  }}></ShareIcon>
                  <ShareIcon src={RedditIcon} onClick={() => {
                    OpenLink("https://www.reddit.com/")
                  }}></ShareIcon>
                  <ShareIcon src={MediumIcon} onClick={() => {
                    OpenLink("https://medium.com/m/signin")
                  }}></ShareIcon>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <ShareIcon src={BloggerIcon} onClick={() => {
                    OpenLink("https://blogger.com")
                  }}></ShareIcon>
                </div>
                <IconDescription style={{ marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: "8px" }}>
                    <path d="M15.2782 14.2943C15.7958 13.8135 16.125 13.1348 16.125 12.375C16.125 10.9275 14.9475 9.75 13.5 9.75C12.0525 9.75 10.875 10.9275 10.875 12.375C10.875 13.1348 11.2042 13.8135 11.7218 14.2943C10.6132 14.6947 9.75 15.465 9.75 16.5H11.25C11.25 16.0515 12.3097 15.4823 13.5 15.4823C14.6903 15.4823 15.75 16.0522 15.75 16.5H17.25C17.25 15.465 16.3868 14.6947 15.2782 14.2943ZM13.5 11.25C14.1202 11.25 14.625 11.7548 14.625 12.375C14.625 12.9952 14.1202 13.5 13.5 13.5C12.8798 13.5 12.375 12.9952 12.375 12.375C12.375 11.7548 12.8798 11.25 13.5 11.25ZM6.27825 14.2943C7.38675 14.6947 8.25 15.465 8.25 16.5H6.75C6.75 16.0515 5.69025 15.4823 4.5 15.4823C3.30975 15.4823 2.25 16.0515 2.25 16.5H0.75C0.75 15.465 1.61325 14.6947 2.72175 14.2943C2.20425 13.8135 1.875 13.1348 1.875 12.375C1.875 10.9275 3.0525 9.75 4.5 9.75C5.9475 9.75 7.125 10.9275 7.125 12.375C7.125 13.1348 6.79575 13.8135 6.27825 14.2943ZM4.5 11.25C3.87975 11.25 3.375 11.7548 3.375 12.375C3.375 12.9952 3.87975 13.5 4.5 13.5C5.12025 13.5 5.625 12.9952 5.625 12.375C5.625 11.7548 5.12025 11.25 4.5 11.25ZM11.25 8.25C11.25 7.8015 10.1903 7.23225 9 7.23225C7.80975 7.23225 6.75 7.8015 6.75 8.25H5.25C5.25 7.215 6.11325 6.44475 7.22175 6.04425C6.70425 5.56425 6.375 4.88475 6.375 4.125C6.375 2.6775 7.5525 1.5 9 1.5C10.4475 1.5 11.625 2.6775 11.625 4.125C11.625 4.88475 11.2958 5.56425 10.7782 6.04425C11.8868 6.44475 12.75 7.215 12.75 8.25H11.25ZM9 3C8.37975 3 7.875 3.50475 7.875 4.125C7.875 4.74525 8.37975 5.25 9 5.25C9.62025 5.25 10.125 4.74525 10.125 4.125C10.125 3.50475 9.62025 3 9 3Z" fill="white" fillOpacity="0.95" />
                  </svg>
                  Mass outreach
                </IconDescription>
                <DividerSmaller />
                <CopyTemplateContainer style={{ marginTop: 16 }}>
                  {
                    (!isTemplateCopied.includes("blog")) ? (
                      <CopyTemplateButton onClick={() => {
                        const newArray = [...isTemplateCopied, "blog"];
                        setIsTemplateCopied(newArray)
                        window.navigator.clipboard.writeText(`Start today! Download Hyperlink at https://hyperlink.org/join/${profile?.id}`)
                        setTimeout(() => {
                          const newArray = isTemplateCopied.filter((element) => element != "blog")
                          setIsTemplateCopied(newArray)
                        }, 3000)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.16699 5.41667V6.25C9.16699 6.4801 8.98043 6.66667 8.75033 6.66667H6.66699C4.82607 6.66667 3.33366 8.15903 3.33366 10C3.33366 11.841 4.82607 13.3333 6.66699 13.3333H8.75033C8.98043 13.3333 9.16699 13.5199 9.16699 13.75V14.5833C9.16699 14.8134 8.98043 15 8.75033 15H6.66699C3.90556 15 1.66699 12.7614 1.66699 10C1.66699 7.23857 3.90556 5 6.66699 5H8.75033C8.98043 5 9.16699 5.18656 9.16699 5.41667ZM13.3337 5C16.0951 5 18.3337 7.23857 18.3337 10C18.3337 12.7614 16.0951 15 13.3337 15H11.2503C11.0202 15 10.8337 14.8134 10.8337 14.5833V13.75C10.8337 13.5199 11.0202 13.3333 11.2503 13.3333H13.3337C15.1746 13.3333 16.667 11.841 16.667 10C16.667 8.15903 15.1746 6.66667 13.3337 6.66667H11.2503C11.0202 6.66667 10.8337 6.4801 10.8337 6.25V5.41667C10.8337 5.18656 11.0202 5 11.2503 5H13.3337ZM7.08366 9.16667C6.85356 9.16667 6.66699 9.35323 6.66699 9.58333V10.4167C6.66699 10.6468 6.85356 10.8333 7.08366 10.8333H12.917C13.1471 10.8333 13.3337 10.6468 13.3337 10.4167V9.58333C13.3337 9.35323 13.1471 9.16667 12.917 9.16667H7.08366Z" fill="#F2F2F2" />
                        </svg>
                        <CopyTemplateButtonLabel>Copy Template</CopyTemplateButtonLabel>
                      </CopyTemplateButton>
                    ) : (
                        <CopiedTemplateButton style={{ background: "transparent", borderColor: "transparent" }} onClick={() => {
                        const newArray = isTemplateCopied.filter((element) => element != "blog")
                        setIsTemplateCopied(newArray)
                      }}>
                        <CopyTemplateButtonLabel>Copied to clipboard!</CopyTemplateButtonLabel>
                      </CopiedTemplateButton>
                    )
                  }
                  <CopyTemplateDescription>
                    A blog post template with product description and your unique share link.
                  </CopyTemplateDescription>
                </CopyTemplateContainer>
              </ChannelIcons>
            </ChannelContainer>
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
    </AccountScreen>
  )
}


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
    gap: 16px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 12px;
    background: var(--coldgrey-900, #16181D);   
`

const ShareIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 6px;
  cursor: pointer;
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
  color: #FFF;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.16px;
  width: 300px;
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

const CopyTemplateDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--basegrey-200, #CCC);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
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
  height: 24px;
  padding: 4px 8px 4px 6px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  border: 2px solid var(--basegrey-100, #E6E6E6);

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

const CopiedTemplateButton = styled.div`
  display: flex;
  height: 24px;
  padding: 4px 8px 4px 6px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  border: 2px solid var(--basegrey-100, #E6E6E6);
  cursor: pointer;
`

const CopyTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const IconDescription = styled.div`
  display: flex;
  align-self: stretch;
  color: var(--basegrey-200, #CCC);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
`

const ChannelIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const ChannelTitle = styled.div`
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

const ChannelDescription = styled.div`
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

const ChannelContainer = styled.div`
  display: flex;
  width: 180px;
  padding: 16px 24px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #000;
  margin-right: 10px;
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
`

const DividerSmaller = styled.div`
  width: 180px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
`

const CopiedButton = styled.div`
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  cursor: pointer;
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

  &:hover {
    border-radius: 4px;
    border: 1px solid var(--primary-200, #99FFEC);
    background: var(--basegrey-950, #0D0D0D);
  }
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

const DescriptionContent = styled.div`
  color: var(--basegrey-200, #CCC);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

export const CreateAccountContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #FFF;
  color: var(--coldgrey-950, #0B0C0E);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%; /* 17.5px */
  cursor: pointer;
`