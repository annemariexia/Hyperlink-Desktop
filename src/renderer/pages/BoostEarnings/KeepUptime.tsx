import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"

import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import DollarIcon from "/images/Dollar.png"
import LightningIcon from "/images/boost/lightning.png"
import MaginPageSVG from "/images/boost/mainpage.svg"

import KeepSVG from "/images/boost_new/keepup.svg"
import IncomeSVG from "/images/boost_new/incomepanel.svg"

type Props = {
  profile: UserDetails
  onClose()
  onSetModal(modal: string)
  setIsPopupOpen(popup: string)
}

export const KeepUptime: FC<Props> = ({ profile, onClose, onSetModal, setIsPopupOpen }): ReactElement => {
  return (
    <AccountScreen>
      <ModalHeader>
        <ModalHeaderText>Keep uptime</ModalHeaderText>
        <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </ModalHeader>
      <ModalContent>
        <Section>
          <Description>
            <div style={{ width: "244px" }}>
              <DescriptionTopTitle style={{ marginBottom: 8 }}>Stay online</DescriptionTopTitle>
              <DescriptionTitle style={{ marginBottom: 16 }}>Multiply earnings by staying online</DescriptionTitle>
              <DescriptionContent>
                Earn up to <a style={{ fontWeight: 600, color: "var(--info-500, #1EE5FF)" }}>50x</a> more by turning CPU and GPU into server grade <a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>99% uptime servers.</a> Just keep <br></br>Hypervisor running <a style={{ fontWeight: 600, color: "var(--coldgrey-50, #F1F1F4)" }}>24/7.</a>
              </DescriptionContent>
            </div>
            <img src={KeepSVG}></img>
          </Description>
        </Section>
        <Divider></Divider>
        <Section>
          <SectionHeader>
            <SectionTitle>Get Premium Workloads</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <RewardItem style={{ marginRight: 8 }}>
              <RewardTopTitle>Higher uptime <br></br> higher rewards</RewardTopTitle>
              <RewardMiddleTitle>90%+</RewardMiddleTitle>
              <RewardFooter>Percentage of time online since account creation</RewardFooter>
            </RewardItem>
            <RewardItem>
              <RewardTopTitle>Maximize your earnings by running</RewardTopTitle>
              <RewardMiddleTitle>24/7</RewardMiddleTitle>
              <RewardFooter>Achieve server grade {"/n"} 99%+ uptime</RewardFooter>
            </RewardItem>
          </SectionContent>
          <Divider></Divider>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>01</SectionNumber>
            <SectionTitle>Keep your computers online 24/7</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <PanelContainer>
              <UpperText>This Device</UpperText>
              <svg xmlns="http://www.w3.org/2000/svg" width="448" height="4" viewBox="0 0 448 4" fill="none" style={{ position: "absolute", top: 38 }}>
                <rect width="448" height="4" rx="2" fill="#2D3039" />
                <rect width="443" height="4" rx="2" fill="#33FFDA" />
              </svg>
              <UptimeContainer>
                <TextContainer>
                  <NumberValue> 99% </NumberValue>
                  <NumberText>uptime</NumberText>
                </TextContainer>
                <StatusTag isRunning={true}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill="#1EFF96" />
                  </svg>
                  <StatusText> {"Running"} </StatusText>
                </StatusTag>
              </UptimeContainer>
            </PanelContainer>
          </SectionContent>
          <Divider></Divider>
        </Section>
        <Section>
          <SectionHeader>
            <SectionNumber>02</SectionNumber>
            <SectionTitle>Check in frequently to make sure your all your computers are online and running</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <img src={MaginPageSVG} style={{ width: "100%", height: "100%" }}></img>
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


const PanelContainer = styled.div`
  width: 600px;
  height: 76px; // Increased height to accommodate ProgressBar
  display: inline-flex;
  padding: 8px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`
const UptimeContainer = styled.div`
  position: absolute;
  bottom: 8px;
  width: 460px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
`

const TextContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const UpperText = styled.div`
  position: absolute;
  top: 8px;
  color: var(--basegrey-50, #F2F2F2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
`
const NumberValue = styled.div`
  color: var(--basegrey-50, #F2F2F2);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 133.333% */
  letter-spacing: -1.44px;
`
const NumberText = styled.div`
  color: var(--coldgrey-200, #C6C9D2);
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

const StatusTag = styled.div<{ isRunning: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ isRunning }) => (isRunning ? "rgba(51, 51, 51, 0.3)" : "rgba(51, 51, 51, 0.7)")};
  border-radius: 100px;
  padding: 5px 10px;
  margin-right: 8px;
`

const StatusText = styled.div`
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.025em;
  font-feature-settings: "tnum" on, "lnum" on, "liga" off;
  color: #f2f2f2;
  margin-left: 10px; // Space between SVG and StatusText
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
    white-space: pre-line;
`

const RewardItem = styled.div`
    display: flex;
    width: 220px;
    padding: 16px 24px 24px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 12px;
    background: var(--coldgrey-900, #16181D);   
    box-sizing: border-box;
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
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
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