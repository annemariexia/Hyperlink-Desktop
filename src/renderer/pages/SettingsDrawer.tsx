import React, { FC, ReactElement, useEffect, useState } from "react"
import styled from "styled-components"
import { doNothing } from "../elements/EventListeners"
import { shell } from "electron"
import { UserDetails } from "../elements/system/ProfileManager"

type Props = {
  profile: UserDetails
  openProfileModal: () => void
  openAppInfoDrawer: () => void
  onLogIn: () => void
  onLogOut: () => void
  onClose: () => void
}

export const SettingsDrawer: FC<Props> = ({ profile, openProfileModal, openAppInfoDrawer, onLogIn, onLogOut, onClose }): ReactElement => {
  const openHyperlinkPage = () => shell.openExternal("https://hyperlink.org")
  return (
    <Container>
      <SectionTitle isFirst>Settings</SectionTitle>
      <List>
        <SettingBtn onClick={openProfileModal}>
          <SettingTitle>Profile</SettingTitle>
          <SubSettings>
            <BtnDetails>Edit</BtnDetails>
          </SubSettings>
        </SettingBtn>
        <SettingBtn onClick={doNothing}>
          <SettingTitle>Password</SettingTitle>
          <SubSettings>
            <BtnDetails>Change</BtnDetails>
            <BtnDetails>Add PIN</BtnDetails>
            <BtnDetails>Add 2FA</BtnDetails>
          </SubSettings>
        </SettingBtn>
        <SettingBtn onClick={doNothing}>
          <SettingTitle>Privacy</SettingTitle>
          <SubSettings>
            <BtnDetails>Settings</BtnDetails>
          </SubSettings>
        </SettingBtn>
        <SettingBtn onClick={doNothing}>
          <SettingTitle>Notifications</SettingTitle>
          <SubSettings>
            <BtnDetails>Desktop</BtnDetails>
            <BtnDetails>Email</BtnDetails>
            <BtnDetails>Phone</BtnDetails>
          </SubSettings>
        </SettingBtn>
      </List>
      <SectionTitle>More</SectionTitle>
      <List>
        <SettingBtn>
          <SettingTitle>Help</SettingTitle>
          <SubSettings>
            <BtnDetails onClick={openHyperlinkPage}>Tutorial</BtnDetails>
            <BtnDetails onClick={openHyperlinkPage}>Support</BtnDetails>
            <BtnDetails onClick={openAppInfoDrawer}>App info</BtnDetails>
          </SubSettings>
        </SettingBtn>
        <SettingBtn onClick={openHyperlinkPage}>
          <SettingTitle>Community</SettingTitle>
          <SubSettings>
            <BtnDetails>Tell a friend</BtnDetails>
            <BtnDetails>Share</BtnDetails>
          </SubSettings>
        </SettingBtn>
      </List>
      <List topGap>
        <SettingBtn onClick={profile ? onLogOut : onLogIn}>
          <SettingTitle>Account</SettingTitle>
          <SubSettings>
            <BtnDetails>{profile ? "Log out" : "Log in"}</BtnDetails>
          </SubSettings>
        </SettingBtn>
      </List>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  overflow: auto;
`

const SectionTitle = styled.div<{ isFirst?: boolean }>`
  font-size: 30px;
  padding-left: 18px;
  ${({ isFirst }) => !isFirst && "margin-top: 80px;"}
  margin-bottom: 24px;
`

const List = styled.div<{ topGap?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ topGap }) => topGap && "margin-top: 110px;"}
`

const SettingBtn = styled.div`
  border-radius: 15px;
  background: transparent;
  padding: 16px 17px 14px 17px;
  color: white;
  border: none;
  margin-right: 30px;
  cursor: pointer;
  transition: background 100ms ease-in;

  &:hover {
    background: rgb(255 255 255 / 7%);
  }

  &:active {
    background: rgb(255 255 255 / 12%);
  }
`

const SettingTitle = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 14px;
`

const SubSettings = styled.div`
  display: flex;
  flex-direction: row;
`

const BtnDetails = styled.div`
  background: transparent;
  font-size: 15px;
  color: rgb(255 255 255 / 80%);
  border: none;
  border-radius: 10px;
  margin-right: 25px;
  cursor: pointer;
`
