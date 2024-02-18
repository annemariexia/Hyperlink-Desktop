import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import imgLightDarkTheme from "./../../../images/icons/light-dark-theme.svg"
import imgTranslateWhite from "./../../../images/icons/translate-white.svg"

type Props = {
  openLangModal: () => void
  toggleTheme: () => void
  isWhiteTheme: boolean
}

export const BtnLangAndTheme: FC<Props> = ({ openLangModal, toggleTheme, isWhiteTheme }): ReactElement => {
  return (
    <Container>
      <ButtonTheme onClick={toggleTheme}>
        <Img src={imgLightDarkTheme} rotateDeg={isWhiteTheme ? 0 : 180} />
      </ButtonTheme>
      <ButtonLang onClick={openLangModal}>
        <Img src={imgTranslateWhite} />
      </ButtonLang>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ButtonTheme = styled.button`
  background: rgb(255 255 255 / 15%);
  height: 100px;
  width: 80px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-radius: 40px 40px 0 0;
  margin-bottom: -40px;
  color: white;
  font-size: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  padding-top: 23px;
  transition: background 200ms ease-in;
  z-index: 1;
  -webkit-mask-image: radial-gradient(circle 40px at 40px 101px, transparent 0, transparent 40px, black 41px);
  -webkit-mask-composite: source-in;

  &:hover {
    background: #ffffff65 0% 0% no-repeat padding-box;
  }
`

const ButtonLang = styled.button`
  background: #ffffff50 0% 0% no-repeat padding-box;
  height: 120px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  color: white;
  font-size: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 200ms ease-in;
  z-index: 2;

  &:hover {
    background: #ffffff65 0% 0% no-repeat padding-box;
  }
`

const Img = styled.img<{ rotateDeg?: number }>`
  height: 32px;
  width: 32px;
  ${({ rotateDeg }) => !!rotateDeg && `rotate: ${rotateDeg}deg;`}
  transition: rotate 300ms ease-in;
`
