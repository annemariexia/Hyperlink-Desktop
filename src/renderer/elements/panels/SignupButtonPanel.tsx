import React from 'react'
import styled from 'styled-components'
import signupIcon from './../../../../images/icons/signup-icon.svg'
interface SignupButtonPanelProps {
  onClick: () => void
}

export const SignupButtonPanel: React.FC<SignupButtonPanelProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick} data-testid="screen-login">
      <StyledText>Sign Up</StyledText>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  display: flex;
  padding: 12px 14px;
  align-items: center;
  border-radius: 96px;
  background: rgba(0, 26, 21, 0.60);
  cursor: pointer;
  
  &:hover {
    border-radius: 96px;
    background: var(--primary-400, #33FFDA);
    div {
      color: var(--basegrey-950, #0D0D0D);
      text-align: center;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
    }
  }
`
const StyledText = styled.div`
  color: var(--primary-500, #00EFC3);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'liga' off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
`