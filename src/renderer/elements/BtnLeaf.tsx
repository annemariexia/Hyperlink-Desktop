import React, { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children?: ReactNode
  selected?: boolean
  isInCorner?: boolean
  isInBetween?: boolean // Affects background color only
  zIndex?: number
}

export const BtnLeaf: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({ children, selected, isInBetween, ...props }): ReactElement => {
  let backgroundColor = "rgba(77, 77, 77, 0.25)"
  let color = "rgba(255, 255, 255, 0.7);"

  if (selected) {
    backgroundColor = "rgba(179, 179, 179, 0.3)"
    // backgroundColor = "#ffffffed"
    color = "rgba(255, 255, 255, 0.95)"

  } 

  return (
    <Button backgroundColor={backgroundColor} color={color} {...props}>
      {children}
    </Button>
  )
}

const Button = styled.button<{ backgroundColor: string; color: string; isInCorner?: boolean; zIndex?: number }>`

box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px 12px;

width: 80px;
height: 32px;

background: rgba(179, 179, 179, 0.3);
border: 1px solid #000000;
border-radius: 8px;
  
  display: flex;
  // align-items: center;
  // justify-content: center;
  background: ${({ backgroundColor }) => backgroundColor};
  // width: ${({ isInCorner }) => (isInCorner ? "128px" : "182px")};
  // height: 54px;
  // padding: 0 8px;
  // padding-right: ${({ isInCorner }) => (isInCorner ? "0" : "35px")};
  // margin-right: ${({ isInCorner }) => (isInCorner ? "0" : "-54px")};
  // border-radius: ${({ isInCorner }) => (isInCorner ? "54px 0 54px 0" : "54px 0 0 0")};
  color: ${({ color }) => color};
  font-size: 20px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  border: none;
  outline: none;
  cursor: pointer;
  user-drag: none;
  transition: background 100ms ease-in;
  ${({ isInCorner }) => !isInCorner && "-webkit-mask-image: radial-gradient(circle 54px at 182px 54px, transparent 0, transparent 53px, black 54px);"}
  ${({ zIndex }) => zIndex !== undefined && `z-index: ${zIndex};`}
  opacity: 0.9;
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 1;
  }
`
