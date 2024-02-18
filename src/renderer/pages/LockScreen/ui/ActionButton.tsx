import React, { FC, InputHTMLAttributes, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  label?: string
  children?: ReactNode
  onClick?: (event) => void
}

export const ActionButton: FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({ disabled, children, onClick, ...props }): ReactElement => {
  return (
    <Button disabled={disabled} onClick={onClick} type="submit">
      {children}
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 81px;
  font-size: 25px;
  padding: 0 32px 0 32px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  border-radius: 30px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  color: #ffffff;
  opacity: 0.9;
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
