import React, { FC, ReactElement } from "react"
import { Icon } from "../../elements/Icon"
import styled from "styled-components"
import { DeviceDetails } from "../../elements/system/ProfileManager"
import { ProcessStatus, SysInfo } from "../../elements/system/System"
import { DevicesEntry } from "./DeviceEntry"
import imgPlus from "./../../../../images/icons/plus-w.svg"

type Props = {
  processStatus: ProcessStatus
  sysInfo: SysInfo
  devices: DeviceDetails[]
  openDeviceInfoDrawer: () => void
  openRemoteDeviceInfoDrawer: (device: DeviceDetails) => () => void
  openEarnMoreModal: () => void
}

export const DevicesDrawer: FC<Props> = ({ processStatus, sysInfo, devices, openDeviceInfoDrawer, openRemoteDeviceInfoDrawer, openEarnMoreModal }): ReactElement => {
  const thisDeviceFound: DeviceDetails = devices.find((device) => device.macAddress === sysInfo?.macAddress)
  const thisDevice: DeviceDetails = {
    ...thisDeviceFound,
    name: sysInfo?.hostname ?? "This computer",
    macAddress: sysInfo?.macAddress,
    isGpuRunning: processStatus.isGpuRunning,
    isCpuRunning: processStatus.isCpuRunning
  }

  return (
    <Container>
      <SectionTitle>Earn more</SectionTitle>
      <SectionSubtitle>Add more computers</SectionSubtitle>
      <List>
        <DevicesEntry device={thisDevice} onClick={openDeviceInfoDrawer} />
        {devices.map((device, index) => {
          if (device.macAddress === sysInfo?.macAddress) return null
          return <DevicesEntry key={index + device.name} device={device} onClick={openRemoteDeviceInfoDrawer(device)} />
        })}
        <AddMoreBtn onClick={openEarnMoreModal}>
          <AddMoreIconSquare>
            <Icon iconUrl={imgPlus} height={36} padding="0" margin="0" />
          </AddMoreIconSquare>
          <EarnMoreContent>
            <EarnMoreTitle>Earn more</EarnMoreTitle>
            <EarnMoreSubtitle>Add more +</EarnMoreSubtitle>
          </EarnMoreContent>
        </AddMoreBtn>
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
  font-size: 60px;
  padding-left: 18px;
  margin-bottom: 2px;
`

const SectionSubtitle = styled.div`
  font-size: 20px;
  color: #8c8e8e;
  padding-left: 18px;
  margin-bottom: 33px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const AddMoreBtn = styled.button<{ selected?: boolean }>`
  height: 72px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  color: white;
  font-size: 20px;
  border: none;
  padding: 0;
  margin-right: 30px;
  margin-bottom: 4px;
  background: rgb(255 255 255 / 7%);
  cursor: pointer;
  transition: background 100ms ease-in;

  &:hover {
    background: rgb(255 255 255 / 12%);
  }

  &:active {
    background: rgb(255 255 255 / 15%);
  }
`

const AddMoreIconSquare = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 15px;
  background: rgb(255 255 255 / 10%);
  display: flex;
  align-items: center;
  justify-content: center;
`

const EarnMoreContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1 0 0;
  padding-left: 28px;
`

const EarnMoreTitle = styled.div`
  font-size: 20px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
`

const EarnMoreSubtitle = styled.div`
  font-size: 15px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  color: rgb(255 255 255 / 80%);
`
