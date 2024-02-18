import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "../../elements/EventListeners"

const Title = styled.span`
  display: flex;
  height: 12px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;
  color: #FFF;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const Description = styled.span`
  color: rgba(255, 255, 255, 0.50);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: stretch;
`
const Banner = styled.span`
  display: flex;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;
  color: #FFF;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const TutorialCardContainer = styled.div`
  display: flex;
  position: absolute;
  left: 51.5%;
  top: -98.9%;
  /* +2 to width and height as box-sizing includes 1px border */
  width: 286px;
  height: 162px;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.10);
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  box-sizing: border-box;

`

const FadeInContainer = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const FadeOutContainer = styled.div`
  opacity: 1;
  animation: fadeOut 0.2s ease-out forwards;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const Cardthree: React.FC = () => {
  return (

    <TutorialCardContainer onClick={stopEventPropagation}>
      <Title>Multiple earnings</Title>
      <Banner>Infinitely.</Banner>
      <Description>Supercharge your earnings by connecting more devices, inviting friends, posting links and maximizing your uptime.</Description>
    </TutorialCardContainer>

  )
}

export default Cardthree
