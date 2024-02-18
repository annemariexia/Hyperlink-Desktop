import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { Modal, ModalBottom, ModalTop } from "../elements/Modal"

type Props = {
  onClose: () => void
}

export const EarnMoreModal: FC<Props> = ({ onClose }): ReactElement => {
  return (
    <Modal>
      <ModalTop>
        <Center>
          <h2>Earn More</h2>
        </Center>
        <Content>You can earn more money by running Hypervisor on a larger number of devices.</Content>
      </ModalTop>
    </Modal>
  )
}

const Center = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  mar
`
