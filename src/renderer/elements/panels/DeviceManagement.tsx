/*
This file contains the DeviceManagement Panel that pops up from clicking "Manage devices"
button in the Stats Panel.
*/

import React, { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import { ColumnHeader } from "../HeaderDeviceMan"
import { DisplayRow } from "../BarDeviceDisplay"
import { DeviceDetails } from "../system/ProfileManager"
import { stopEventPropagation } from "../../elements/EventListeners"

type Props = {
  isPopupOpen: boolean
  setIsPopupOpen: (isOpen: boolean) => void;
  devices: DeviceDetails[]
  progressPercent: number | null
  closeModal: () => void
}


export const DeviceManagementPanel: React.FC<Props> = ({ isPopupOpen, setIsPopupOpen, devices, progressPercent, closeModal }) => {
  const onClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <DeviceManagementContainer onClick={stopEventPropagation} >
      <DeviceManagementText>Device Management</DeviceManagementText>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={closeModal}
        style={{ top: 27, right: 29, position: 'absolute', cursor: "pointer" }}>
        <path d="M13.7031 0.999731L13.0002 0.296838C12.805 0.101576 12.4884 0.101576 12.2931 0.296838L7.00022 5.5897L1.70733 0.296837C1.51207 0.101575 1.19549 0.101575 1.00022 0.296837L0.297331 0.99973C0.102069 1.19499 0.102069 1.51157 0.297331 1.70684L5.59022 6.9997L0.297336 12.2926C0.102073 12.4879 0.102073 12.8045 0.297336 12.9997L1.00023 13.7026C1.19549 13.8979 1.51207 13.8979 1.70734 13.7026L7.00022 8.4097L12.2931 13.7026C12.4884 13.8979 12.805 13.8979 13.0002 13.7026L13.7031 12.9997C13.8984 12.8044 13.8984 12.4879 13.7031 12.2926L8.41022 6.9997L13.7031 1.70684C13.8984 1.51158 13.8984 1.19499 13.7031 0.999731Z"
          fill="#F2F2F2" />
      </svg>
      <ColumnHeader HeaderLabel="DEVICE" HeaderCellWidth={200} HeaderLeft={50} LabelWidth={47} />
      <ColumnHeader HeaderLabel="SPECIFICATIONS" HeaderCellWidth={152} HeaderLeft={294} LabelWidth={107} />
      <ColumnHeader HeaderLabel="STATUS" HeaderCellWidth={48} HeaderLeft={522} LabelWidth={50} />
      <ColumnHeader HeaderLabel="UPTIME" HeaderCellWidth={50} HeaderLeft={630} LabelWidth={49} />
      <ColumnHeader HeaderLabel="EARNINGS ESTIMATE" HeaderCellWidth={134} HeaderLeft={740} LabelWidth={134} />
      <ScrollSection>
        {devices.map((device, index) => (
          <DisplayRow key={index} device={device} RowTop={index * 110} progressPercent={progressPercent} svg={<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 34.5, left: 25.25 }}>
            <path d="M16.5 0.5H1.5C1.16848 0.5 0.850537 0.631696 0.616116 0.866116C0.381696 1.10054 0.25 1.41848 0.25 1.75V11.75C0.25 12.0815 0.381696 12.3995 0.616116 12.6339C0.850537 12.8683 1.16848 13 1.5 13H6.5V15.5H4V16.75H14V15.5H11.5V13H16.5C16.8315 13 17.1495 12.8683 17.3839 12.6339C17.6183 12.3995 17.75 12.0815 17.75 11.75V1.75C17.75 1.41848 17.6183 1.10054 17.3839 0.866116C17.1495 0.631696 16.8315 0.5 16.5 0.5V0.5ZM10.25 15.5H7.75V13H10.25V15.5ZM16.5 11.75H1.5V1.75H16.5V11.75Z" fill="#A8ADBD" />
          </svg>}>
          </DisplayRow>
        ))}
        <AddNewDeviceBtn style={{ top: devices.length * 110 }}>
          Add Device
        </AddNewDeviceBtn>
      </ScrollSection>
    </DeviceManagementContainer>
  )
}

const ScrollSection = styled.div`
  overflow-y: auto;
  height: 550px;
  width: 930px;
  position: absolute;
  top: 150px;
`

const AddNewDeviceBtn = styled.div`
  position: absolute;
  box-sizing: border-box;
  play: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  gap: 8px;
  width: 890px;
  height: 64px;
  left: 26px;
  cursor: pointer;
  border: 2px solid #00CCA7;
  border-radius: 3px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  white-space: nowrap;
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on, 'liga' off;
  color: #00EFC3;

  &:hover {
    color: black !important;
    background: #00CCA7;
  }
`

export const DeviceManagementContainer = styled.div`
  position: absolute;
  width: 960px;
  height: 720px;
  left: 160px;
  top: 40px;
  background: #0A0A0A;
  border: 2px solid rgba(168, 173, 189, 0.15);
  backdrop-filter: blur(25px);
  border-radius: 16px;
  z-index: 5555;
  display: flex;
`

const DeviceManagementText = styled.div`
  width: 1200px;
  height: 32px;
  top: 37px;
  left: 26px;
  position: relative;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #F1F1F4;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`