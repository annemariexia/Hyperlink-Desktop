/* SideBar Component */

/*
0- Yes / No — do we need this code?
Yes, we need this code. It represents the Sidebar component of a user interface.

1- Why? — Why do we need this code?
We need this code to display a Sidebar with clickable buttons/icons for various actions.

2- How? — How does this code work?
The component renders a container (<Container>) that serves as the Sidebar.
Inside the container, there are three clickable buttons (<SideBarBtn> components) with corresponding icons and labels.
Each button is associated with a specific action (openEarnMoreModal, openDevicesDrawer, and openChatDrawer).

3- What? — What are the important key variables?
openEarnMoreModal: A function to open the "Earn more" modal when the corresponding button is clicked.
openDevicesDrawer: A function to open the devices drawer when the corresponding button is clicked.
openChatDrawer: A function to open the chat drawer when the corresponding button is clicked.

4- Who? — Who does this code serve?
This code serves users who interact with the user interface and want quick access to the "Earn more" modal, devices drawer, and chat drawer.

5- Where? — Where does this code connect to?
This code is connected to other parts of the user interface where the Sidebar is intended to be displayed, probably as part of a larger layout.

6- When? — When does this code get used?
This code is used whenever the Sidebar needs to be displayed in the user interface, and the associated actions are required to be accessible.
*/


import React, { FC, ReactElement } from "react"
import { SideBarBtn } from "./SideBarBtn"
import imgPc from "./../../../../images/icons/pc-w.svg"
import imgDollar from "./../../../../images/icons/dollar-w.svg"
import imgChat from "./../../../../images/icons/chat-w.svg"
import styled from "styled-components"

type Props = {
  openEarnMoreModal: () => void
  openDevicesDrawer: () => void
  openChatDrawer: () => void
}

export const SideBar: FC<Props> = ({ openEarnMoreModal, openDevicesDrawer, openChatDrawer }): ReactElement => {
  return (
    <Container>
      <SideBarBtn onClick={openEarnMoreModal} labelNextToIt="+ Earn more" iconHeight={45} iconUrl={imgDollar} />
      <SideBarBtn onClick={openDevicesDrawer} labelNextToIt="+ Devices" iconHeight={37} iconUrl={imgPc} />
      <SideBarBtn onClick={openChatDrawer} labelNextToIt="+ Improve" iconHeight={35} iconUrl={imgChat} />
    </Container>
  )
}

const Container = styled.div`
  width: 64px;
  border-radius: 32px;
  background: #64646433;
  opacity: 1;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`
