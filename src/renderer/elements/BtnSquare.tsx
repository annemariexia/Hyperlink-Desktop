import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children?: ReactNode
  onClick?: (event: any) => void
  iconUrl: string
  size?: number
  iconSize?: number
  margin?: string
  labelBelow?: string
}

export const BtnSquare: FC<Props> = ({ onClick, iconUrl, size, iconSize, children, margin, labelBelow }): ReactElement => {
  return (
    <>
      <Button onClick={onClick} size={size} margin={margin}>
        <Img src={iconUrl} iconSize={iconSize} />
        {children}
      </Button>
      {labelBelow && <LabelBelow size={size}>{labelBelow}</LabelBelow>}
    </>
  )
}

const Button = styled.button<{ size?: number; margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? "90"}px;
  height: ${({ size }) => size ?? "90"}px;
  padding: 2px 0 0 0;
  background: #ffffff50 0% 0% no-repeat padding-box;
  border-radius: 20px;
  color: white;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
  transition: all 100ms ease-in;
  margin: ${({ margin }) => (!!margin ? margin : "0")};
  z-index: 2;
  user-drag: none;
  transition: background 200ms ease-in;

  &:hover {
    background: #ffffff65 0% 0% no-repeat padding-box;
  }
`

const Img = styled.img<{ iconSize?: number }>`
  height: ${({ iconSize }) => iconSize ?? "35"}px;
  width: auto;
  user-drag: none;
`

const LabelBelow = styled.div<{ size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size ?? "90"}px;
  height: 65px;
  font-size: 20px;
  box-sizing: border-box;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  padding-top: 20px;
  margin-top: -21px;
  background: #ffffff33 0% 0% no-repeat padding-box;
  -webkit-mask-image: radial-gradient(circle 20px at 20px 0px, transparent 0, transparent 20px, black 21px), radial-gradient(circle 20px at 28px 0px, transparent 0, transparent 20px, black 21px),
    radial-gradient(circle 20px at 36px 0px, transparent 0, transparent 20px, black 21px), radial-gradient(circle 20px at 45px 0px, transparent 0, transparent 20px, black 21px),
    radial-gradient(circle 20px at 53px 0px, transparent 0, transparent 20px, black 21px), radial-gradient(circle 20px at 61px 0px, transparent 0, transparent 20px, black 21px),
    radial-gradient(circle 20px at 70px 0px, transparent 0, transparent 20px, black 21px);
  -webkit-mask-composite: source-in;
`
