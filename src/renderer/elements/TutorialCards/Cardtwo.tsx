import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { stopEventPropagation } from "../../elements/EventListeners"

const Title = styled.span`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16.39px;
  width: 212px;
  height: 14px;
  flex-shrink: 0;
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
  position: absolute;
  left: -0.5%;
  top: -98.9%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
  /* +2 to width as width includes 1px border */
  width: 286px;
  height: 162px;
  flex-shrink: 0;
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
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
const Cardtwo: React.FC = () => {
  return (
    <TutorialCardContainer onClick={stopEventPropagation}>
      <Title>Detect Potential</Title>
      <Banner>Resourcefully.</Banner>
      <Description>Calculate your earnings potential combined for all your devices. See how much it is worth per year, per month, and over its lifetime.</Description>
    </TutorialCardContainer>
  )
}

export default Cardtwo
