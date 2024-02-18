import React from 'react'
import styled from 'styled-components'
interface InfoPanelProps {
  onClick: any
}
export const InfoIconPanel: React.FC<InfoPanelProps> = ({ onClick }) => {
  return (
    <FeedbackContainer onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.53124 19.312C5.40179 19.4245 5.2 19.3326 5.2 19.161V14.8H2.8C2.35817 14.8 2 14.4418 2 14V2.8C2 2.35817 2.35817 2 2.8 2H17.2C17.6418 2 18 2.35817 18 2.8V14C18 14.4418 17.6418 14.8 17.2 14.8H10.72L5.53124 19.312ZM6.8 13.2V16.0884L10.1216 13.2H16.4V3.6H3.6V13.2H6.8Z" fill="#F2F2F2" />
      </svg>
      <Text>Talk to us</Text>
    </FeedbackContainer>
  )
}

const FeedbackContainer = styled.div`
  display: flex;
  padding: 4px 14px 4px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;
  &:hover {
    border-radius: 96px;
    background: var(--basegrey-50, #F2F2F2);
    div {
      color: var(--basegrey-950, #0D0D0D);
    }
    svg path {
      fill: #0D0D0D;
    }
  }
`

const Text = styled.div`
  color: #FFF;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
  font-weight: 600;
`