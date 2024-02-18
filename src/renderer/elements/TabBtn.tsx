
import React, { FC, ReactElement, ReactNode, useState } from "react"
import styled from "styled-components"

type Props = {
  //   onClick?: (event: any) => void  [for later implementation]
  BttnLabel: string
  BtnLeft: number
  LabelLeft: number
  TextWidth: number
  BtnWidth: number
  isActive: boolean
  onClick?: () => void
}

export const TabBtn: FC<Props> = ({ BttnLabel, BtnLeft, LabelLeft, TextWidth, BtnWidth, isActive, onClick }): ReactElement => {

  return (
    <Button left={BtnLeft} width={BtnWidth} isActive={isActive} onClick={onClick}>
      <Label left={LabelLeft} width={TextWidth} isActive={isActive}>{BttnLabel}</Label>
    </Button>
  )
}

const Button = styled.div<{ left: number, width: number, isActive: boolean }>`
  display: flex;
  width: 64px;
  height: 12px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  font-weight: 500px;
  ${({ isActive }) => (
    isActive && `background: var(--coldgrey-300, #A8ADBD); 
    font-weight: 600px;` )}

  cursor: pointer;

  &:hover {
    ${({ isActive }) => (
      !isActive && `background: rgba(241, 241, 244, 0.30);` )}
  }
`

const Label = styled.div<{ width: number, left: number, isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'var(--basegrey-950, #0D0D0D)' : 'var(--basegrey-50, #F2F2F2)')};
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? '600' : '500')};
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
`