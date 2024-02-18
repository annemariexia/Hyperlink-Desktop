/* BtnIcon Component */

/*
0- Yes / No — do we need this code?
Yes, we need this code. It represents a reusable button component with an icon and optional children.

1- Why? — Why do we need this code?
We need this code to create and display buttons with icons and optional additional content (children) in various parts of the application.

2- How? — How does this code work?
The component takes in various props such as onClick, iconUrl, className, height, width, transparent, opacity, margin, and borderRadius.
It renders a button with a specified height, width, and iconUrl.
The button may have optional className, margin, and borderRadius for custom styling.
The button may also be set as transparent, which results in a transparent background.
On hover, the button's opacity changes if not already specified.

3- What? — What are the important key variables?
onClick: Optional click event handler for the button.
iconUrl: The URL of the icon/image to be displayed on the button.
className: Optional class name for additional styling of the button.
height: The height of the button.
width: Optional width of the button.
transparent: Boolean value to set the button's background as transparent or semi-transparent.
opacity: Optional opacity of the button on hover (default is 1).
margin: Optional margin of the button for positioning.
borderRadius: Optional border radius of the button.
children: Optional ReactNode representing additional content inside the button.

4- Who? — Who does this code serve?
This code serves developers who want to create reusable buttons with icons and optional children in the application.

5- Where? — Where does this code connect to?
This code can be used in various parts of the application where buttons with icons and optional children are required.

6- When? — When does this code get used?
This code gets used whenever there is a need to create buttons with icons and optional children in the application.
*/


import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  onClick?: (event: any) => void
  iconUrl: string
  className?: string
  transparent?: boolean
  opacity?: number
  children?: ReactNode
  height: number
  width?: number
  margin?: string
  borderRadius?: string
}

export const BtnIcon: FC<Props> = ({ onClick, className, height, width, iconUrl, transparent, opacity, margin, borderRadius, children }): ReactElement => {
  return (
    <Button onClick={onClick} className={className} height={height} width={width} margin={margin} transparent={transparent} opacity={opacity} borderRadius={borderRadius}>
      <img src={iconUrl} />
      {children}
    </Button>
  )
}

const BTN_PADDING = 12

const Button = styled.button<{ transparent?: boolean; height: number; width?: number; margin?: string; borderRadius?: string; opacity?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
  opacity: ${({ opacity }) => opacity ?? "1"};
  width: ${({ width }) => (width !== undefined ? `${width}px` : "auto")};
  padding: ${BTN_PADDING}px;
  ${({ margin }) => (!!margin ? `margin: ${margin};` : "")}
  background-color: ${({ transparent }) => (transparent ? "transparent" : "#ffffff33")};
  cursor: pointer;
  color: white;
  border: none;
  outline: none;
  user-drag: none;
  border-radius: ${({ borderRadius }) => (!!borderRadius ? borderRadius : "9px")};
  transition: opacity 100ms ease-in;

  &:hover {
    background-color: ${({ transparent }) => (transparent ? "transparent" : "rgba(199, 199, 199, 0.3)")};
  }

  img {
    user-drag: none;
  }
`
