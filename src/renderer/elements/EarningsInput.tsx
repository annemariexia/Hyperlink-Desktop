import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { Money } from "./Money"
import { TextMoney } from "./TextMoney"

type Props = {
  earningsUsd: number
  value: number
  notEditable?: boolean
  onValueChanged?: (value: number) => void
}

export const EarningsInput: FC<Props> = ({ earningsUsd, value, onValueChanged, notEditable }): ReactElement => {
  const setEarningsValue = (newValue?: number) => {
    let value = newValue
    if (isNaN(value)) return
    value = Money.toCents(value)
    if (value > earningsUsd) value = earningsUsd
    if (value < 0) value = 0
    if (!!onValueChanged) onValueChanged(value)
  }

  const onValuePickerButtonClicked = (isPositive: boolean) => {
    const valueReadable = Money.toDollars(value)
    let power = Math.floor(valueReadable).toString().length - 2
    power = Math.max(power, 0)
    let change = Math.pow(10, power)
    if (!isPositive) change *= -1
    setEarningsValue(valueReadable + change)
  }

  const onMinusClicked = () => onValuePickerButtonClicked(false)
  const onPlusClicked = () => onValuePickerButtonClicked(true)

  return (
    <Container notEditable={notEditable}>
      <LeftContent>
        <Label>
          <b>Earnings</b> arrived
        </Label>
        <TextMoney sizePx={60} amountUsd={value} textShadow="0 0 40px #ffffff78" />
      </LeftContent>
      {!notEditable && (
        <RightContent>
          <PlusButton onClick={onPlusClicked}>+</PlusButton>
          <MinusButton onClick={onMinusClicked}>-</MinusButton>
        </RightContent>
      )}
    </Container>
  )
}

const Container = styled.div<{ notEditable?: boolean }>`
  @keyframes flash {
    from {
      background: rgb(0 0 0 / 50%);
    }
    to {
      background: rgb(0 0 0 / 7%);
    }
  }

  display: flex;
  flex: 1;
  height: 180px;
  border-radius: 60px;
  background: ${({ notEditable }) => (!!notEditable ? "rgb(0 0 0 / 50%)" : "rgb(0 0 0 / 7%)")};
  color: #ffffff;
  backdrop-filter: blur(25px) contrast(-25%);
  overflow: hidden;
  ${({ notEditable }) => !!notEditable && "animation: flash 600ms ease-in alternate infinite;"}
`

const LeftContent = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  margin-left: 34px;
  color: #ffffff;
`

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
`

const Label = styled.div`
  font-size: 20px;
  color: #ffffffc9;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
`

const PlusButton = styled.button`
  width: 82px;
  color: #ffffff;
  font-size: 40px;
  border: none;
  background: transparent;
  border-radius: 0 0 0 60px;
  outline: none;
  flex: 1;
  cursor: pointer;
  transition: background 200ms ease-in;

  &:hover {
    background: rgb(255 255 255 / 15%);
  }

  &:active {
    background: rgb(255 255 255 / 25%);
  }
`

const MinusButton = styled.button`
  width: 82px;
  color: #ffffff;
  font-size: 40px;
  border: none;
  background: transparent;
  background: rgb(0 0 0 / 7%);
  border-radius: 60px 0 0 0;
  outline: none;
  flex: 1;
  cursor: pointer;
  transition: background 200ms ease-in;

  &:hover {
    background: rgb(255 255 255 / 15%);
  }

  &:active {
    background: rgb(255 255 255 / 25%);
  }
`
