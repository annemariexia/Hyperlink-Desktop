import React, { FC, MutableRefObject, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "./EventListeners"

type Props = {
  width?: string
  height?: string
  children?: ReactNode
  scrollPanelRef?: MutableRefObject<any>
}

export const Modal: FC<Props> = ({ width, height, children, scrollPanelRef }): ReactElement => {
  return (
    <Window width={width} height={height} onClick={stopEventPropagation}>
      <ScrollPanel ref={scrollPanelRef}>{children}</ScrollPanel>
    </Window>
  )
}

export const ModalTop = styled.div`
  flex: 1 0;
  width: 100%;
`

export const ModalBottom = styled.div`
  flex: 0 1;
  width: 100%;
`

const ScrollPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 5px 0 0;
  overflow-x: hidden;
  overflow-y: hidden;
`

const Window = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 20px;
  width: ${({ width }) => (width !== undefined ? width : "560px")};
  height: ${({ height }) => (height !== undefined ? height : "680px")};
  max-width: calc(var(--pageWidth) * 0.7);
  max-height: calc(var(--pageHeight) * 0.7);
  min-width: 100px;
  min-height: 50px;
  padding: 36px 31px 36px 36px;
  backdrop-filter: blur(30px);
  border-radius: 100px;
  background: rgb(255 255 255 / 12%);
  box-sizing: border-box;
`
