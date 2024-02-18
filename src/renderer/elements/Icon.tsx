import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  onClick?: (event: any) => void
  iconUrl: string
  bgColor?: string
  height: number
  width?: number
  margin?: string
  padding?: string
  borderRadius?: string
  boxShadow?: string
  background?: string
  opacity?: number
  flex_shrink?: number
  top?: number
  right?: number
  transform?: string
  position?: string
  color?: string
  paddingLeft?: number
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
}

export const Icon: FC<Props> = ({ onClick, height, width, iconUrl, bgColor, margin, padding, borderRadius, background, boxShadow, opacity,
  flex_shrink, top, right, transform, position, color, paddingLeft, paddingRight, paddingTop, paddingBottom }): ReactElement => {
  return (
    <Img src={iconUrl} onClick={onClick} height={height} width={width} margin={margin} opacity={opacity} padding={padding} background={background}
      boxShadow={boxShadow} bgColor={bgColor} borderRadius={borderRadius} flex_shrink={flex_shrink} top={top} right={right} transform={transform}
      color={color} position={position} paddingLeft={paddingLeft} paddingRight={paddingRight} paddingTop={paddingTop} paddingBottom={paddingBottom} />
  )
}

const BTN_PADDING = 0

const ImgContainer = styled.div<{ paddingLeft?: number; paddingRight?: number; paddingTop?: number; paddingBottom?: number }>`
  ${({ paddingLeft }) => (!!paddingLeft ? `padding: ${paddingLeft};` : "")}
  ${({ paddingRight }) => (!!paddingRight ? `padding: ${paddingRight};` : "")}
  ${({ paddingTop }) => (!!paddingTop ? `padding: ${paddingTop};` : "")}
  ${({ paddingBottom }) => (!!paddingBottom ? `padding: ${paddingBottom};` : "")}
`

const Img = styled.img<{
  bgColor?: string; height: number; width?: number; margin?: string; opacity?: number; padding?: string; borderRadius?: string; background?: string; boxShadow?: string
  flex_shrink?: number; top?: number; right?: number; transform?: string; position?: string; color?: string;
  paddingLeft?: number; paddingRight?: number; paddingTop?: number; paddingBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
  width: ${({ width }) => (width !== undefined ? `${width}px` : "auto")};
  padding: ${BTN_PADDING}px;
  ${({ margin }) => (!!margin ? `margin: ${margin};` : "")}
  ${({ padding }) => (!!padding ? `padding: ${padding};` : "")}
  ${({ bgColor }) => (!!bgColor ? `background-color: ${bgColor};` : "")}
  ${({ onClick }) => (!!onClick ? "cursor: pointer;" : "")}
  ${({ background }) => (!!background ? `background: ${background};` : "")}
  ${({ boxShadow }) => (!!boxShadow ? `box-shadow: ${boxShadow};` : "")}
  ${({ opacity }) => opacity !== undefined && `opacity: ${opacity};`}
  border: none;
  outline: none;
  user-drag: none;
  border-radius: ${({ borderRadius }) => (!!borderRadius ? borderRadius : "9px")};
  flex-shrink: ${({ flex_shrink }) => flex_shrink};
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
  transform: ${({ transform }) => transform};
  position: ${({ position }) => position};
  z-index: 9999;
`
