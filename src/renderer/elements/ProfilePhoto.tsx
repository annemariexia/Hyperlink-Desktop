import React, { FC, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import imgAvatarPlaceholder from "./../../../images/avatar-placeholder.svg"

type Props = {
  size?: string
  onClick?: (event: any) => void
  photoUrl?: string
  margin?: string
}

export const ProfilePhoto: FC<Props> = ({ size, onClick, photoUrl, margin }): ReactElement => {
  const isPhotoUrlDefined = !!photoUrl && photoUrl.trim().length > 0
  return (
    <Container size={size} onClick={onClick} margin={margin}>
      <Img src={isPhotoUrlDefined ? photoUrl : imgAvatarPlaceholder} />
    </Container>
  )
}

const Container = styled.div<{ size?: string; margin?: string }>`
  width: ${({ size }) => (!!size ? size : "126px")};
  height: ${({ size }) => (!!size ? size : "126px")};
  ${({ margin }) => !!margin && `margin: ${margin};`}
  background-color: white;
  border-radius: 63px;
  overflow: hidden;
  user-drag: none;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  user-drag: none;
`
