/* ModalInput 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to create an input field within a modal or form. It allows users to include labels for inputs and applies specific styling for better user experience.

2- How? — How does this code work?
The ModalInput component receives various props, including label. It renders a styled input field (Input) and optionally a label (Label) based on the provided label prop. The input field has customizable styles, including a placeholder and background transitions.

3- What? — What are the important key variables?
Input: Represents the styled input element with customizable styles based on the provided props.
Label: Represents an optional label to be displayed above the input field.
label: Prop that specifies the label text to be displayed above the input field.

4- Who? — Who does this code serve?
This code serves users who need to create input fields within modals or forms, along with optional labels for better user understanding.

5- Where? — Where does this code connect to?
This code can be used in various components and modules where input fields are required within modals or forms.

6- When? — When does this code get used?
This code is used whenever input fields are needed within a modal or form, such as user registration, login, or data submission in a modal context.
*/


import React, { FC, InputHTMLAttributes, ReactElement } from "react"
import styled from "styled-components"

type Props = {
  label?: string
}

export const ModalInput: FC<InputHTMLAttributes<HTMLInputElement> & Props> = (props): ReactElement => {
  return (
    <Container>
      {props.label && <Label>{props.label}</Label>}
      <Input {...props} />
    </Container>
  )
}

const Input = styled.input`
  width: 100%;
  height: 90px;
  border-radius: 45px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  padding: 0 32px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  transition: background 200ms ease-in;

  &::placeholder {
    color: #ffffff;
    opacity: 0.8;
  }

  &:focus {
    background-color: rgb(0 0 0 / 30%);
  }
`

const Label = styled.div`
  font-family: Alliance-PlattSemiBold, Alliance-No2-Regular, Helvetica, sans-serif;
  font-size: 20px;
  margin-bottom: 14px;
  opacity: 0.7;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`
