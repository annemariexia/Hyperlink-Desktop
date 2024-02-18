import React from "react"
import styled from "styled-components"

export const ErrorMsg = styled.div<{ marginLeft?: string; marginRight?: string }>`
  font-size: 25px;
  color: white;
  margin: 10px 0;
  ${({ marginLeft }) => !!marginLeft && `margin-left: ${marginLeft};`}
  ${({ marginRight }) => !!marginRight && `margin-right: ${marginRight};`}
`
