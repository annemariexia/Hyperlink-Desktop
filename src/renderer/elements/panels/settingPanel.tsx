import React from "react"
import styled from "styled-components"
import settingIcon from "./../../../../images/icons/setting-icon.svg"
import { Dispatch, SetStateAction } from "react"

interface settingButtonPanelProps {
  onClick: (event: any) => void
}
const SettingIcon = () => <img src={settingIcon} alt="Signup Icon" />

export const SettingPanel: React.FC<settingButtonPanelProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <SettingIcon />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: black;
  border: none;
  display: flex;
  cursor: pointer;
`
