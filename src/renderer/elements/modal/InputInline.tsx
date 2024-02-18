/* InputInline 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to render an inline input field with a button. The input field allows users to enter text, and the button is used to trigger a specific action (e.g., search, submit) based on the onClick prop.

2- How? — How does this code work?
The code receives various props, including disabled, onClick, and other standard input element attributes, to customize the behavior and appearance of the input field and button. The InputInline component consists of a styled input element (Input) and a styled button (Button) with an embedded icon. The Input element handles user input, while the Button element is associated with the onClick function to perform a specific action.

3- What? — What are the important key variables?
Input: Represents the styled input element.
Button: Represents the styled button element with an embedded icon.
disabled: Prop that determines whether the button is disabled or not.
onClick: Prop that specifies the action to be triggered when the button is clicked.

4- Who? — Who does this code serve?
This code serves users who need to input text and perform a specific action by clicking the associated button.

5- Where? — Where does this code connect to?
This code can be used in various parts of the application where an inline input field with an associated button is required.

6- When? — When does this code get used?
This code is used whenever there is a need for an inline input field and an associated button, such as search boxes, submission forms, or any other interactive input scenarios.
*/


import React, { FC, InputHTMLAttributes, ReactElement } from "react"
import styled from "styled-components"
import { Icon } from "../Icon"
import imgSingleArrow from "./../../../../images/icons/single-arrow.svg"

type Props = {
  label?: string
  onClick?: (event) => void
}

export const InputInline: FC<InputHTMLAttributes<HTMLInputElement> & Props> = ({ disabled, onClick, ...props }): ReactElement => {
  return (
    <Container>
      <Input {...props} />
      <Button disabled={disabled} onClick={onClick}>
        <Icon iconUrl={imgSingleArrow} height={29} padding="0" />
      </Button>
    </Container>
  )
}

const Input = styled.input`
  width: 400px;
  height: 81px;
  border-radius: 30px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: ${({ value }) => (!!value && value?.toString()?.length > 0 ? `50px` : "25px")};
  padding: ${({ value }) => (!!value && value?.toString()?.length > 0 ? `0 32px 7px 32px` : "0 32px 0 32px")};
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  margin-right: 18px;
  margin-left: 99px;

  &::placeholder {
    color: #ffffff;
    opacity: 0.8;
  }
`

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
