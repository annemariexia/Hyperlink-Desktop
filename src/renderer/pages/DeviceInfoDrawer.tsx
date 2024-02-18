import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { SysInfo } from "../elements/system/System"

type Props = {
  sysInfo: SysInfo
}

const SINGLE_CORE = 1
const KB_TO_GB = 1024 * 1024

export const DeviceInfoDrawer: FC<Props> = ({ sysInfo }): ReactElement => {
  let cpuModel = ""
  if (!!sysInfo?.cpus && sysInfo.cpus.length > 0) {
    cpuModel = sysInfo?.cpus[0]?.model ?? ""
  }

  let operatingSystem = "-"
  if (sysInfo?.platform === "darwin") operatingSystem = "MacOS"
  if (sysInfo?.platform === "win32") operatingSystem = "Windows"
  if (sysInfo?.platform === "linux") operatingSystem = "Linux"

  let ramGb: any = "-"
  if (!!sysInfo.ramKb) {
    ramGb = new String(Math.round(sysInfo.ramKb / KB_TO_GB))
  }

  const gpuType = sysInfo.gpuType ?? "-"
  const gpuTypeValues = gpuType.split("\n").filter((value) => !!value && value.length > 0)

  return (
    <Container>
      <SectionTitle>System Info</SectionTitle>
      <List>
        <InfoSection>
          <Title>OS</Title>
          <Description>{operatingSystem}</Description>
        </InfoSection>
        <InfoSection>
          <Title>Processor</Title>
          <Description>
            {sysInfo?.cpus?.length ?? SINGLE_CORE}-Core {cpuModel}
          </Description>
        </InfoSection>
        <InfoSection>
          <Title>Memory</Title>
          <Description>{ramGb}GB</Description>
        </InfoSection>
        <InfoSection>
          <Title>Graphics</Title>
          <Description>
            {gpuTypeValues.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </Description>
        </InfoSection>
        <InfoSection>
          <Title>Storage</Title>
          <Description>2TB</Description>
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
