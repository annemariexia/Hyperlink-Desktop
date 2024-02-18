import React, { FC, InputHTMLAttributes, ReactElement } from "react"
import { Icon } from "../../../elements/Icon"
import styled from "styled-components"
import { Input } from "./Input"
import imgSingleArrow from "../../../../../images/icons/single-arrow.svg"
import imgLoading from "../../../../../images/icons/loading.gif"

type Props = {
  label?: string
  onClick?: (event) => void
  isLoading?: boolean
}

export const InputInline: FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({ disabled, onClick, isLoading, ...props }): ReactElement => {
  const icon = isLoading ? imgLoading : imgSingleArrow
  const isDisabled = disabled || isLoading
  return (
    <Container>
      <Input margin="0 18px 0 99px" {...props} />
      <Button disabled={isDisabled} onClick={isDisabled ? undefined : onClick} type="submit">
        <Icon iconUrl={icon} height={29} padding="0" />
      </Button>
    </Container>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255 255 255 / 80%);
  opacity: 0.9;
  width: 81px;
  height: 81px;
  border-radius: 41px;
  outline: none;
  border: none;
  ${({ disabled }) => !disabled && "cursor: pointer;"}
  transition-property: background, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-in;

  &:disabled {
    color: rgb(200 200 200 / 90%);
    background: rgb(255 255 255 / 35%);
    opacity: 0.5;
  }

  &:hover {
    opacity: ${({ disabled }) => (!!disabled ? `0.5` : "1")};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
