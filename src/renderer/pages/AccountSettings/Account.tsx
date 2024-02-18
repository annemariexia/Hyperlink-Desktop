import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"
import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import imgClose from "/images/close.svg"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import * as Components from "./AccountSettingComponents"
import imgPencil from '/images/icon-pencil.svg'

type Props = {
  profile: UserDetails
  fullname: string
  onClose()
  onSetPage: (page: string) => void
  setActiveModal: (modal: string) => void
}

export const Account: FC<Props> = ({ profile, fullname, onClose, onSetPage, setActiveModal }): ReactElement => {
  return (
    <AccountScreen>
      <Components.ModalHeader className="withoutBackBtn">
        <Components.ModalHeaderText>Account</Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text>Add more details to personalize your account</Components.Text>
        {
          (profile && profile.role != "Guest") ? (
            <ModalContentSmallGap style={{ gap: "16px" }}>
              <Components.Section>
                <Components.SectionTitle style={{ marginBottom: 12 }}>Profile</Components.SectionTitle>
                <Components.TextContainer>
                  <ProfileAvatar>{fullname == "" ? "A" : fullname.charAt(0).toUpperCase() + fullname.charAt(1).toUpperCase()}</ProfileAvatar>
                </Components.TextContainer>
              </Components.Section>
              <Components.Section>
                <Components.SectionTitle>UserID</Components.SectionTitle>
                <Components.TextContainer>
                  <Components.Text className="secondary">{profile.id}</Components.Text>
                </Components.TextContainer>
              </Components.Section>
              <Components.Section>
                <Components.SectionTitle>Email</Components.SectionTitle>
                <Components.TextContainer>
                  <Components.Text>{profile.email}</Components.Text>
                </Components.TextContainer>
              </Components.Section>
              <Components.Section>
                <Components.SectionTitle>Full Name</Components.SectionTitle>
                <Components.TextContainer>
                  <Components.Text className="secondary">{fullname ? fullname : <span>Add your full name or a nickname</span>}</Components.Text>
                  {fullname ? (
                    <Components.LinkButton onClick={() => onSetPage("AccountDetail")}>
                      <img src={imgPencil} />
                      <Components.LinkbuttonText>Change</Components.LinkbuttonText>
                    </Components.LinkButton>
                  ) : (
                    <Components.LinkButton onClick={() => onSetPage("AccountDetail")}>
                      <Components.LinkbuttonText>Add Name</Components.LinkbuttonText>
                    </Components.LinkButton>
                  )}

                </Components.TextContainer>
              </Components.Section>
            </ModalContentSmallGap>
          ): (
              <ModalContentSmallGap style={{ gap: "16px" }}>
                <Components.Section>
                  <Components.SectionTitle>UserID</Components.SectionTitle>
                  <Components.TextContainer>
                    <Components.Text className="secondary">{profile?.id}</Components.Text>
                  </Components.TextContainer>
                </Components.Section>
                <Components.Section>
                  <Components.SectionTitle>Sign in</Components.SectionTitle>
                  <Components.TextContainer>
                    <Components.Text className="secondary">Sign in to get access to transfer your earnings, account personalization, earning boosts and much more</Components.Text>
                    <Components.LinkButton onClick={() => {
                      setActiveModal("SignupLogin")
                    }}>
                      <Components.LinkbuttonText>Sign in</Components.LinkbuttonText>
                    </Components.LinkButton>
                  </Components.TextContainer>
                </Components.Section>
              </ModalContentSmallGap>
          )
        }
        
      </Components.ModalContent>
    </AccountScreen>
  )
}




const ProfileAvatar = styled.div`
  display: flex;
  width: 72px;
  height: 72px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary-200, #99FFEC);
  text-align: center;
  border: 2px solid var(--primary-200, #99FFEC);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 44px; /* 183.333% */
  letter-spacing: 0.96px;
  border-radius: 50%;
  background: #181818;
`
export const ModalContentSmallGap = styled.div`
  display: flex;
  width: 448px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`
