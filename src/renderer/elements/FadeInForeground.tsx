import React, { FC, ReactElement, useEffect, useState } from "react"
import styled from "styled-components"

type Props = {}

const HIDE_AFTER_MS = 2000
const REMOVE_DELAY_MS = 100

export const FadeInForeground: FC<Props> = ({}): ReactElement => {
  const [animate, setAnimate] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(false)
  useEffect(() => {
    setAnimate(true)

    setTimeout(() => {
      setHide(true)
    }, HIDE_AFTER_MS + REMOVE_DELAY_MS)
  }, [])

  if (hide) return null

  return <Container show={!animate}></Container>
}

export const Container = styled.div<{ show?: boolean }>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: ${({ show }) => (show ? "1" : "0")};
  z-index: 100;
  transition: all ${HIDE_AFTER_MS}ms ease-in;
  pointer-events: none;
`
