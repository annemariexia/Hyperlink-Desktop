/* ModalSelect 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to create a dropdown select input within a modal or form. It allows users to choose from a list of options and applies specific styling for better user experience.

2- How? — How does this code work?
The ModalSelect component receives various props, including label and options. It renders a styled dropdown select (Select) and optionally a label (Label) based on the provided label prop. The select element contains a list of options dynamically generated from the options prop array.

3- What? — What are the important key variables?
Select: Represents the styled dropdown select element with customizable styles based on the provided props.
Label: Represents an optional label to be displayed above the select field.
label: Prop that specifies the label text to be displayed above the select field.
options: Prop that provides an array of string options for the dropdown select.

4- Who? — Who does this code serve?
This code serves users who need to create dropdown select inputs within modals or forms, along with optional labels for better user understanding.

5- Where? — Where does this code connect to?
This code can be used in various components and modules where dropdown select inputs are required within modals or forms.

6- When? — When does this code get used?
This code is used whenever dropdown select inputs are needed within a modal or form, such as selecting preferences, categories, or other choices in a modal context.
*/


import React, { FC, SelectHTMLAttributes, ReactElement } from "react"
import styled from "styled-components"

type Props = {
  label?: string
  options: string[]
  onChange?: (event) => void
}

export const ModalSelect: FC<SelectHTMLAttributes<HTMLSelectElement> & Props> = (props): ReactElement => {
  return (
    <Container>
      {props.label && <Label>{props.label}</Label>}
      <Select onChange={props.onChange} {...props}>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Container>
  )
}

const Select = styled.select`
  width: 100%;
  height: 90px;
  border-radius: 45px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  padding: 0 15px;
  cursor: pointer;
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
