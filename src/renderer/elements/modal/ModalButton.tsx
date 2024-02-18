/* ModalButton 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to create a customizable button with an optional icon, icon text, or image. It allows users to create modal buttons with specific styles, colors, and functionality.

2- How? — How does this code work?
The ModalButton component receives various props such as children, icon, iconUrl, iconText, and isWhite. It renders a styled button (Button) with optional icons or text, depending on the provided props. The button's appearance and behavior can be customized based on the provided props.

3- What? — What are the important key variables?
Button: Represents the styled button element with customizable styles based on the provided props.
children: Represents the content inside the button.
icon: Specifies the Bootstrap icon class to display as part of the button.
iconUrl: Specifies the URL of an image icon to display as part of the button.
iconText: Specifies text to display as part of the button along with the icon.
isWhite: Prop that determines whether the button has a white background and dark text/color.

4- Who? — Who does this code serve?
This code serves users who need to create modal buttons with customizable styles, icons, and text.

5- Where? — Where does this code connect to?
This code can be used in various components and modules where modal buttons are required.

6- When? — When does this code get used?
This code is used whenever modal buttons are needed, such as in dialog boxes, pop-ups, or other scenarios where user interaction is required within a modal context.
*/


import React, { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { Icon } from "../Icon"

type Props = {
  children?: ReactNode
  icon?: string
  iconUrl?: string
  iconText?: string
  isWhite?: boolean
}

export const ModalButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props): ReactElement => {
  const { children, icon, iconUrl, iconText, ...otherProps } = props
  return (
    <Button {...otherProps}>
      <Left>{children}</Left>
      {icon && <InlineIcon className={`bi ${icon}`} />}
      {iconUrl && <Icon iconUrl={iconUrl} height={35} />}
      {!!iconText && <>{iconText}</>}
    </Button>
  )
}

const Button = styled.button<{ disabled?: boolean; isWhite?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90px;
  color: ${({ isWhite }) => (isWhite ? "rgb(0 0 0 / 45%)" : "rgb(255 255 255 / 90%)")};
  fill: ${({ isWhite }) => (isWhite ? "rgb(0 0 0 / 45%)" : "rgb(255 255 255 / 90%)")};
  align-items: center;
  border-radius: 45px;
  background: ${({ isWhite }) => (isWhite ? "rgb(255 255 255 / 80%)" : "rgb(255 255 255 / 1%)")};
  padding: 0 35px;
  font-size: 40px;
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  border: none;
  outline: none;
  ${({ disabled }) => !disabled && "cursor: pointer;"}
  backdrop-filter: blur(20px);
  transition-property: background, color;
  transition-duration: 200ms;
  transition-timing-function: ease-in;

  &:hover {
    ${({ disabled, isWhite }) => {
      if (disabled) return ""
      return `background: ${isWhite ? "rgb(255 255 255 / 90%)" : "rgb(255 255 255 / 10%)"};`
    }}
  }

  &:disabled {
    color: rgb(200 200 200 / 90%);
    background: rgb(255 255 255 / 1%);
    opacity: 0.5;
  }
`

const Left = styled.div`
  display: flex;
  justify-items: flex-start;
  align-items: center;
  flex: 1 0;
`

const InlineIcon = styled.i`
  font-size: 35px;
  margin-top: 2px;
`
