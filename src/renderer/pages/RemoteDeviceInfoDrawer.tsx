import React, { FC, ReactElement } from "react"
import spacetime from "spacetime"
import styled from "styled-components"
import { DeviceDetails } from "../elements/system/ProfileManager"

type Props = {
  device: DeviceDetails
}

export const RemoteDeviceInfoDrawer: FC<Props> = ({ device }): ReactElement => {
  return (
    <Container>
      <SectionTitle>Device Info</SectionTitle>
      <List>
        <InfoSection>
          <Title>Name</Title>
          <Description>{device.name}</Description>
        </InfoSection>
        <InfoSection>
          <Title>Details</Title>
          <Description>{device.details}</Description>
        </InfoSection>
        <InfoSection>
          <Title>Mac Address</Title>
          <Description>{device.macAddress}</Description>
        </InfoSection>
        <InfoSection>
          <Title>Registered</Title>
          <Description>{spacetime(device.created).unixFmt("dd MMM yyyy")}</Description>
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
  background: rgb(255 255 255 / 12%);
  padding: 16px 17px 14px 17px;
  color: white;
  border: none;
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
