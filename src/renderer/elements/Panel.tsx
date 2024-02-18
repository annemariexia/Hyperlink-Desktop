import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children?: ReactNode
  className?: string
  borderRadius?: string
  width: string
  height: string
  onClick?: (event) => void
  testId?: string
}

export const Panel: FC<Props> = ({ children, className, borderRadius, width, height, onClick, testId }): ReactElement => {
  return (
    <Container className={className} borderRadius={borderRadius} width={width} height={height} onClick={onClick} isClickable={!!onClick} data-testid={testId}>
      {children}
    </Container>
  )
}

const Container = styled.div<{ width: string; height: string; borderRadius?: string; isClickable?: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: start;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius ?? "50px"};
  background:  rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 10px 150px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  ${({ isClickable }) =>
    isClickable &&
    `
    cursor: pointer;
    transition: background 200ms ease-in;

    &:hover {
      background: #99999933 0% 0% no-repeat padding-box;
    }
  `}
`
