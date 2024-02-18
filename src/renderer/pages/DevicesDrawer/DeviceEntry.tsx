import React, { FC, ReactElement } from "react"
import { DeviceDetails } from "../../elements/system/ProfileManager"
import styled from "styled-components"
import { Money } from "../../elements/Money"

type Props = {
  device?: DeviceDetails
  onClick?: () => void
}

export const DevicesEntry: FC<Props> = ({ device, onClick }): ReactElement => {
  const isRunning = device.isGpuRunning || device.isCpuRunning

  return (
    <ComputerBtn onClick={onClick}>
      <RunningIndicator isRunning={isRunning} />
      <ComputerDetails>
        <ComputerName>{Money.formatCents(device.lifetimeEarningsCents ?? 0)}</ComputerName>
        <ComputerDescription>{device.name}</ComputerDescription>
      </ComputerDetails>
    </ComputerBtn>
  )
}

const ComputerBtn = styled.button<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 72px;
  border-radius: 15px;
  color: white;
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

const RunningIndicator = styled.div<{ isRunning: boolean }>`
  width: 30px;
  height: 100%;
  background: ${({ isRunning }) => (isRunning ? "rgb(52, 199, 89)" : "rgb(255, 45, 85)")};
  border-radius: 15px 0 0 15px;
  flex: 12.5px 0 0;
`

const ComputerDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  padding: 7px 9px 7px 19px;
  font-size: 15px;
`

const ComputerName = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 25px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  margin-bottom: 11px;
`

const ComputerDescription = styled.div<{ selected?: boolean }>`
  background: transparent;
  font-size: 15px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  color: ${({ selected }) => (selected ? "rgb(255 255 255 / 100%)" : "rgb(255 255 255 / 80%)")};
  ${({ selected }) => selected && "text-shadow: 0 0 20px #ffffff78;"}
  border: none;
  border-radius: 10px;
  padding: 0;
  cursor: pointer;
`
