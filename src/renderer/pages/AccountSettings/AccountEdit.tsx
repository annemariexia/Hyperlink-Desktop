import React, { FC, ReactElement, useEffect, useState, Dispatch, SetStateAction } from "react"
import styled from 'styled-components'
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import { ApiCommand, ApiMessage } from "../../elements/system/System"
import { ipcRenderer } from "electron"
import iconSuccess from "/images/success-btn.svg"
import * as Components from "./AccountSettingComponents"


type Props = {
  profile: UserDetails
  fullname: string
  setName: Dispatch<SetStateAction<string>>
  onClose: () => void
  onSetPage: (page: string) => void
}

export const AccountEdit: FC<Props> = ({ profile, fullname, setName, onClose, onSetPage }): ReactElement => {
  const [username, setUserName] = useState(fullname)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string | null> (null)

  const isActionButtonDisabled = !username || username.length === 0 || isLoading == true

const onSubmit = () => {
    if(username.length < 4 || username.length > 42) {
      setError("Display Name must be 4 to 42 characters")
      return
    }
    setIsLoading(false)
    setIsSaved(true)
    setName(username)
    ipcRenderer.send(ApiCommand.UpdateUsername, { username: username, id: profile.id })
    onSetPage('AccountMain')
  }

  return (
    <AccountScreen>
      <Components.ModalHeader className="withBackBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => onSetPage('AccountMain')} style={{ cursor: "pointer" }}>
          <path d="M7.24423 11.4099L14.4035 4.24444C14.7291 3.91852 15.2571 3.91852 15.5827 4.24444L16.7558 5.41849C17.0811 5.74409 17.0815 6.27187 16.7566 6.59792L11.3742 12L16.7566 17.4021C17.0815 17.7281 17.0811 18.2559 16.7558 18.5815L15.5827 19.7556C15.2571 20.0815 14.7291 20.0815 14.4035 19.7556L7.24423 12.5901C6.91859 12.2642 6.91859 11.7358 7.24423 11.4099Z" fill="white" fillOpacity="0.95" />
        </svg>
        <Components.ModalHeaderText> Edit Display Name </Components.ModalHeaderText>
        <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose}/>
      </Components.ModalHeader>
      <Components.ModalContent>
        <Components.Text> Add your display name or a nickname to personalize your account. </Components.Text>
        <Components.SectionNoBorder>
          <Components.SectionTitle>Display Name</Components.SectionTitle>
          <Components.SectionContent style = {{ flexDirection: "column" }}>
            <Components.CustomInputContainer error={error? true : false} className="editable">
              <Components.CustomInput
                type="text"
                value={username}
                onChange={(event)=> setUserName(event.target.value)}
              />
            </Components.CustomInputContainer>
            {error &&(
              <Components.ErrorDescription>{error}</Components.ErrorDescription>
            )}
          </Components.SectionContent>
            <ButtonAlign>
              <Components.Button onClick={isActionButtonDisabled ? undefined : onSubmit} disabled={isActionButtonDisabled} style = {{marginTop: 0}}> Save Changes </Components.Button>
              <Components.CancelButton onClick={() => onSetPage('AccountMain')}>Cancel</Components.CancelButton>
            </ButtonAlign>
        </Components.SectionNoBorder>
      </Components.ModalContent>
    </AccountScreen>
  )
}
const ButtonAlign = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 32px;
`
