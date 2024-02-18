import React from "react"
import styled from "styled-components"

export const ModalTitle = styled.div<{ isMainTitle?: boolean }>`
  font-size: 40px;
  margin-bottom: ${({ isMainTitle }) => (isMainTitle ? "80px" : "30px")};
`
