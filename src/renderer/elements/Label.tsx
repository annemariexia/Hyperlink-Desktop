import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { Icon } from "./Icon"

type Props = {
  marginLeft?: string
  marginRight?: string
  leftIconUrl?: string
  rightIconUrl?: string
  children?: ReactNode
}

export const Label: FC<Props> = ({ marginLeft, marginRight, leftIconUrl, rightIconUrl, children }): ReactElement => {
  return (
    <Container marginLeft={marginLeft} marginRight={marginRight}>
      {!!leftIconUrl && <Icon iconUrl={leftIconUrl} height={8} padding="0" margin="0 6px 0 0" />}
      {children}
      {!!rightIconUrl && <Icon iconUrl={rightIconUrl} height={8} padding="0" margin="0 0 0 6px" />}
    </Container>
  )
}

export const Container = styled.div<{ marginLeft?: string; marginRight?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  background-color: #74747452;
  padding: 0 8px;
  margin-left: ${({ marginLeft }) => marginLeft ?? "0"};
  margin-right: ${({ marginRight }) => marginRight ?? "0"};
  border-radius: 9px;
  color: white;
  font-size: 8px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  border: none;
  outline: none;
  transition: all 100ms ease-in;
`
