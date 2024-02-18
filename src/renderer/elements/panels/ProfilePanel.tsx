import React, { FC, ReactElement } from "react"
import { Panel } from "../Panel"
import { ProfilePhoto } from "../ProfilePhoto"
import { UserDetails } from "../system/ProfileManager"
import styled from "styled-components"
import { Icon } from "../Icon"
import { BtnLeaf } from "../BtnLeaf"
import imgBank from "./../../../../images/icons/bank-b.svg"
import imgCog from "./../../../../images/icons/cog-w.svg"

type Props = {
  profile: UserDetails | null
  onClick?: (event) => void
  onOpenCashOut: (event) => void
  onOpenSettings: (event) => void
}

export const ProfilePanel: FC<Props> = ({ profile, onClick, onOpenCashOut, onOpenSettings }): ReactElement => {
  let name = "Log in"
  if (profile) {
    name = `${profile?.firstName} ${profile?.lastName}`
    if (name.trim().length === 0) name = profile?.username || "User"
  }
  return (
    <Panel onClick={onClick} width="560px" height="180px" borderRadius="100px 60px 60px 100px" testId="profile-panel">
      <Content>
        <PanelContentTop>
          <NameWrapper>
            <Label>Welcome</Label>
            <Name>{name}</Name>
          </NameWrapper>
        </PanelContentTop>
        <PanelContentBottom>
          <BtnLeaf zIndex={1} selected onClick={onOpenCashOut}>
            <Icon iconUrl={imgBank} opacity={0.4} height={26} />
          </BtnLeaf>
          <BtnLeaf zIndex={2} onClick={onOpenSettings} isInCorner>
            <Icon iconUrl={imgCog} opacity={0.4} height={25} />
          </BtnLeaf>
        </PanelContentBottom>
      </Content>
    </Panel>
  )
}

const Label = styled.div`
  font-size: 20px;
`

const Name = styled.div`
  font-size: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Content = styled.div`
  height: 100%;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`

const PanelContentTop = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1 0;
  width: 100%;
  margin-bottom: 15px;
  padding-top: 28px;
  padding-left: 80px;
  padding-right: 20px;
  box-sizing: border-box;
`

const NameWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  flex: 1 0;
  top: 45px;
  left: 80px;
  right: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const PanelContentBottom = styled.div`
  display: flex;
`
