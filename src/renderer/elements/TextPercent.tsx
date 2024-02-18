import React, { FC, ReactElement } from "react"
import styled from "styled-components"

type Props = {
  value: number
  sizePx?: number
  transitionTime?: string
  fractionDigits?: number
  textShadow?: string
}

const DEFAULT_TEXT_SIZE_PX = 12

export const TextPercent: FC<Props> = ({ value, sizePx, transitionTime, fractionDigits, textShadow }): ReactElement => {
  let content: any = "-"
  const integerSizePx = sizePx ?? DEFAULT_TEXT_SIZE_PX

  if (!isNaN(value)) {
    const text = value.toLocaleString("en-US", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
    const [integer, fraction] = text.split(".")
    const areCentsDefined = !!fraction && fraction.length > 0

    content = (
      <>
        <Amount sizePx={integerSizePx} transitionTime={transitionTime} textShadow={textShadow}>
          {integer}
        </Amount>
        {areCentsDefined && (
          <>
            .
            <Amount sizePx={integerSizePx} transitionTime={transitionTime} textShadow={textShadow}>
              {fraction}
            </Amount>
          </>
        )}
        <Percentage textShadow={textShadow}>%</Percentage>
      </>
    )
  }

  return (
    <MainText sizePx={integerSizePx} transitionTime={transitionTime} textShadow={textShadow}>
      {content}
    </MainText>
  )
}

const MainText = styled.span<{ sizePx: number; transitionTime?: string; textShadow?: string }>`
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ sizePx }) => (!!sizePx ? `font-size: ${sizePx}px;` : "")}
  transition: all ${({ transitionTime }) => (transitionTime !== undefined ? transitionTime : "500ms")} ease-in;
  text-align: left;
  color: #ffffff;
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
`

const Amount = styled.span<{ sizePx: number; transitionTime?: string; textShadow?: string }>`
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ sizePx }) => (!!sizePx ? `font-size: ${sizePx}px;` : "")}
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
  transition: all ${({ transitionTime }) => (transitionTime !== undefined ? transitionTime : "500ms")} ease-in;
`

const Percentage = styled.span<{ textShadow?: string }>`
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
`
