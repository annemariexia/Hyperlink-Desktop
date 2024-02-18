/*
This file contains the "root/parent" headers for the Device Management Popup Panel.
It takes the header label, dimension, and position values to create customized header.
*/


import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  HeaderLabel: string
  HeaderLeft: number
  HeaderCellWidth: number
  LabelWidth: number
}

export const ColumnHeader: FC<Props> = ({ HeaderLabel, HeaderLeft, HeaderCellWidth, LabelWidth }): ReactElement => {
  return (
    <Header left={HeaderLeft} width={HeaderCellWidth}>
      <Label width={LabelWidth}> {HeaderLabel} </Label>
    </Header>
  )
}

const Header = styled.div<{ left: number, width: number }>`
    height: 48px;
    width: ${({ width }) => width}px;
    position: absolute;
    top: 93px;
    left: ${({ left }) => left}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
    background: #0A0A0A;
    border-radius: 0px;
    flex: none;
    order: 0;
    flex-grow: 0;

`

const Label = styled.div<{ width: number }>`
    height: 16px;
    width: ${({ width }) => width}px;
    top: 16px;
    left: 24px;
    position: absolute;
    font-family: "Manrope", sans-serif;
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    color: #FFFFFF;
    flex: none;
    order: 1;
    flex-grow: 0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-feature-settings: 'tnum' on, 'lnum' on, 'liga' off;
    color: #999999;
    flex: none;
    order: 0;
    flex-grow: 0;
    white-space: nowrap;

`
