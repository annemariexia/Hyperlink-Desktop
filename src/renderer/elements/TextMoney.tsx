import React, { FC, ReactElement } from "react"
import styled from "styled-components"

type Props = {
  amountUsd: number
  sizePx?: number
  transitionTime?: string
  fractionDigits?: number
  textShadow?: string
}

const DEFAULT_TEXT_SIZE_PX = 12

export const formatMoney = (amountUsd: number, fractionDigits: number = 2): string => (amountUsd / 100).toLocaleString("en-US", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })

export const TextMoney: FC<Props> = ({ amountUsd, sizePx, transitionTime, fractionDigits, textShadow }): ReactElement => {
  const textSizePx = sizePx ?? DEFAULT_TEXT_SIZE_PX
  const centSizePx = Math.round(textSizePx * 0.75)
  const text = formatMoney(amountUsd, fractionDigits)
  const [dollars, cents] = text.split(".")
  const areCentsDefined = !!cents && cents.length > 0
  const dollarAmounts = dollars.split(",")

  const isLastDollarSegment = (index: number) => index === dollarAmounts.length - 1
  const showComma = (index: number) => (isLastDollarSegment(index) ? "" : ",")

  return (
    <MainText sizePx={textSizePx} transitionTime={transitionTime} textShadow={textShadow}>
      <DollarSign textShadow={textShadow}>$</DollarSign>
      {dollarAmounts.map((value, index) => (
        <span key={index}>
          <Amount sizePx={textSizePx} transitionTime={transitionTime} textShadow={textShadow}>
            {value}
          </Amount>
          {showComma(index)}
        </span>
      ))}
      {areCentsDefined && (
        <>
          .
          <Amount sizePx={centSizePx} transitionTime={transitionTime} textShadow={textShadow}>
            {cents}
          </Amount>
        </>
      )}
    </MainText>
  )
}

const DollarSign = styled.span<{ textShadow?: string }>`
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
`

const MainText = styled.span<{ sizePx: number; transitionTime?: string; textShadow?: string }>`
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ sizePx }) => (!!sizePx ? `font-size: ${sizePx}px;` : "")}
  transition: all ${({ transitionTime }) => (transitionTime !== undefined ? transitionTime : "500ms")} ease-in;
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
`

const Amount = styled.span<{ sizePx: number; transitionTime?: string; textShadow?: string }>`
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ sizePx }) => (!!sizePx ? `font-size: ${sizePx}px;` : "")}
  transition: all ${({ transitionTime }) => (transitionTime !== undefined ? transitionTime : "500ms")} ease-in;
  ${({ textShadow }) => (!!textShadow ? `text-shadow: ${textShadow};` : "")}
`
