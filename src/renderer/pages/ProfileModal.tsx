import React, { FC, ReactElement } from "react"
import { Modal, ModalBottom, ModalTop } from "../elements/Modal"
import { ModalButton } from "../elements/modal/ModalButton"
import { UserDetails } from "../elements/system/ProfileManager"

type Props = {
  profile: UserDetails
  onLogOut: () => void
  onClose: () => void
}

export const ProfileModal: FC<Props> = ({ profile, onLogOut, onClose }): ReactElement => {
  return (
    <Modal>
      <ModalTop>
        <div>Profile</div>
        <br />
        <div>
          {profile.firstName} {profile.lastName}
        </div>
        <div>{profile.email}</div>
      </ModalTop>
      <ModalBottom>
        <ModalButton onClick={onLogOut} icon="bi-box-arrow-right">
          Log out
        </ModalButton>
      </ModalBottom>
    </Modal>
  )
}
