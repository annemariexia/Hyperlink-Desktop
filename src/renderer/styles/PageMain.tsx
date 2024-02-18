import styled from "styled-components"

export const Main = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 90px 80px 90px 80px;
`

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px rgb(255 255 255 / 7%) solid;
  align-items: center;
  justify-content: center;
  flex: 0 0 160px;
`

export const TopPanel = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
`

export const BottomPanel = styled.div`
  display: flex;
  flex: 1;
  align-items: start;
  justify-content: flex-start;
  z-index: 2
`

export const Video = styled.video<{ brighten?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-drag: none;
  user-select: none;
  z-index: -1;
`

export const BgDev = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-drag: none;
  user-select: none;
  z-index: -1;
  user-drag: none;
`
export const Version = styled.div`
  z-index: 100;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  opacity: 0.5;
`
export const SignUpContainer = styled.div`
  position: absolute;
  top: calc(7% + 57px);
  bottom: calc(89% - 725px);
  // left: calc(26% + 845px);
  right: calc(72% - 359px);
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

export const InfoContainer = styled.div`
  position: absolute;
  top: calc(7% + 57px);
  bottom: calc(89% - 725px);
  left: calc(26% + 845px + 359px + 8px); /* Adjusted left position based on SignUpContainer's right position and desired distance */
  display: flex;
  align-items: center;
`
export const AccountContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 200px;
  height: 46px;
  display: flex;
  float: right;
  text-align: right;
  gap: 8px;
`

export const ScreenWrapper = styled.div`
  width: 1280px;
  height: 800px;
  margin: 0 auto; /* Center the screen */
  overflow: hidden; /* Hide any content that overflows the screen */
  position: fixed;

  &::before {
    display: block;
  }
`

export const LogoHyperlink = styled.div`

  position: absolute;
  width: 140px;
  left: 48px;
  top: 32px;
  display: flex;
  width: 183px;
  height: 40px;
  justify-content: center;
  flex-shrink: 0;
  color: #FFF;
  font-family: Space Grotesk;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  flex-direction: row;
  justify-content: left;

`

export const PotentialInfoButton = styled.button`
  position: absolute;
  left: 21%;
  top: 520%; 
  width: 16px; 
  height: 16px; 
  background: transparent; 
  border none; 
  z-index:1;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`

export const BoostEarningsInfoButton = styled.button`
  position: absolute;
  left: 59%;
  top: 500 %;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`
export const TutorialInfoButton = styled.button.attrs((props) => ({
  onClick: props.onClick
}))`
  position: relative;
  left: -105%;
  top: 8%;
  z-index: 1px;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`
