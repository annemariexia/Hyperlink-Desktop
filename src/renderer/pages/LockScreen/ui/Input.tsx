import React from "react"
import styled from "styled-components"

export const Input = styled.input<{ margin?: string }>`
  width: 400px;
  height: 81px;
  border-radius: 30px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: ${({ value, type }) => (!!value && type === "password" && value?.toString()?.length > 0 ? `50px` : "25px")};
  padding: ${({ value, type }) => (!!value && type === "password" && value?.toString()?.length > 0 ? `0 32px 7px 32px` : "0 32px 0 32px")};
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ margin }) => !!margin && `margin: ${margin};`}

  &::placeholder {
    color: #ffffff;
    opacity: 0.8;
  }
`
