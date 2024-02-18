import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import imgBackArrow from "../../../../images/icons/back-arrow.svg"

type Props = {
  onClick: (event) => void
}

export const BackArrow: FC<Props> = ({ onClick }): ReactElement => {
  return (
    <Container onClick={onClick}>
      <Arrow src={imgBackArrow} />
    </Container>
  )
}

const Container = styled.div<{ disabled?: boolean }>`
  position: absolute;
  top: 50px;
  left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: rgb(255 255 255 / 80%);
  opacity: 0.9;
  outline: none;
  border: none;
  cursor: pointer;
  transition-property: background, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  backdrop-filter: blur(3px);

  &:disabled {
    color: rgb(200 200 200 / 90%);
    background: rgb(255 255 255 / 35%);
    opacity: 0.5;
  }

  &:hover {
    opacity: ${({ disabled }) => (disabled ? `0.5` : "1")};
  }
`

const Arrow = styled.img`
  height: 29px;
`
