/* SideBarBtn Component */

/*
0- Yes / No — do we need this code?
Yes, we need this code. It represents a button component used in the Sidebar.

1- Why? — Why do we need this code?
We need this code to create clickable buttons with icons and optional labels to be used in the Sidebar.

2- How? — How does this code work?
The component renders a container (<Container>) that wraps the button and label elements.
The button (<Button>) is created with an optional click event handler (onClick) and displays an icon and children (optional).
The label (<LabelNextToIt>) is an optional element displayed next to the button.
When hovering over the button, the label's opacity is increased (visually indicating its presence).

3- What? — What are the important key variables?
children: Optional ReactNode representing the content within the button.
onClick: Optional function to be called when the button is clicked.
iconUrl: The URL of the icon to be displayed on the button.
iconHeight: The height of the icon (optional, defaults to 40px).
labelNextToIt: Optional string to display as a label next to the button.

4- Who? — Who does this code serve?
This code serves developers who want to create buttons with icons and optional labels for use in the Sidebar or similar components.

5- Where? — Where does this code connect to?
This code is connected to the Sidebar component or other components where buttons with icons and labels are required.

6- When? — When does this code get used?
This code is used whenever a button with an icon and optional label is needed, typically in the Sidebar for user interactions.
*/



import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children?: ReactNode
  onClick?: (event: any) => void
  iconUrl: string
  iconHeight?: number
  labelNextToIt?: string
}

export const SideBarBtn: FC<Props> = ({ onClick, iconUrl, iconHeight, children, labelNextToIt }): ReactElement => {
  return (
    <Container>
      <Button onClick={onClick}>
        <Img src={iconUrl} height={iconHeight} />
        {children}
      </Button>
      {labelNextToIt && <LabelNextToIt className="side-label">{labelNextToIt}</LabelNextToIt>}
    </Container>
  )
}

const Container = styled.div`
  width: 64px;
  height: 108px;
  position: relative;
  border-radius: 32px;

  &:hover .side-label {
    opacity: 1;
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 108px;
  padding: 2px 0 0 0;
  background: transparent;
  border-radius: 32px;
  color: white;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
  transition: all 100ms ease-in;
  margin: 0;
  z-index: 2;
  user-drag: none;
  transition: background 100ms ease-in;
  opacity: 1;

  &:hover {
    background: #99999933 0% 0% no-repeat padding-box;
  }
`

const Img = styled.img<{ height?: number }>`
  height: ${({ height }) => height ?? "40px"};
  width: auto;
  user-drag: none;
`

const LabelNextToIt = styled.div`
  position: absolute;
  left: 90px;
  top: 42px;
  width: auto;
  font-size: 20px;
  z-index: 1;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 100ms ease-in;
`
