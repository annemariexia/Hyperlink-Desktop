import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { ProcessStatus, SysInfo } from "../elements/system/System"

type Props = {
  processStatus: ProcessStatus
  sysInfo: SysInfo
  openGpuLogsModal: () => void
  openCpuLogsModal: () => void
}

export const AppInfoDrawer: FC<Props> = ({ processStatus, sysInfo, openGpuLogsModal, openCpuLogsModal }): ReactElement => {
  return (
    <Container>
      <SectionTitle>App Info</SectionTitle>
      <List>
        <InfoSection>
          <Title>Version</Title>
          <Description>{sysInfo?.version ?? "-"}</Description>
        </InfoSection>
        <InfoSection onClick={openGpuLogsModal}>
          <Title>GPU process status</Title>
          <Description>{processStatus?.isGpuRunning ? "Running" : "Stopped"}</Description>
        </InfoSection>
        <InfoSection onClick={openCpuLogsModal}>
          <Title>CPU process status</Title>
          <Description>{processStatus?.isCpuRunning ? "Running" : "Stopped"}</Description>
        </InfoSection>
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

const SectionTitle = styled.div`
  font-size: 30px;
  padding-left: 18px;
  margin-bottom: 18px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoSection = styled.button<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 72px;
  border-radius: 15px;
  background: transparent;
  padding: 16px 17px 14px 17px;
  color: white;
  border: 1px solid white;
  margin-right: 30px;
  margin-bottom: 4px;
`

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 20px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  text-align: left;
  margin-bottom: 11px;
`

const Description = styled.div<{ selected?: boolean }>`
  background: transparent;
  font-size: 15px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  text-align: left;
  color: ${({ selected }) => (selected ? "rgb(255 255 255 / 100%)" : "rgb(255 255 255 / 80%)")};
  ${({ selected }) => selected && "text-shadow: 0 0 20px #ffffff78;"}
  border: none;
  border-radius: 10px;
  padding: 0;
`
