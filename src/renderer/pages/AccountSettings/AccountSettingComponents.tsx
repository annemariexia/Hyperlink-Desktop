import styled from "styled-components"

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;

  &.withBackBtn {
    padding: 24px 24px 24px 12px;
  }
  &.withoutBackBtn {
    padding: 24px 24px 24px 48px;
  }
`

export const ModalHeaderText = styled.div`
  color: var(--white, #ffffff);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 24px */
`

export const ModalContent = styled.div`
  display: flex;
  width: var(--RightPanelWidth);
  box-sizing: border-box;
  align-self: stretch;
  padding: 0px 64px 0px 48px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  /* shadow */
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`
export const TextContainer = styled.div`
  display: flex;
  padding: 4px 10px 4px 0px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`
export const Text = styled.span`
  font-family: Manrope;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  letter-spacing: 0.14px;
  color: var(--basegrey-200);
  width: 100%;
  align-self: stretch;
  flex: 1 0 0;
  &.secondary {
    color: var(--basegrey-400);
  }
`

export const SectionNoBorder = styled.div`
  width: 100%;
  align-self: stretch;
`

export const Section = styled.div`
  border-bottom: 1px solid var(--basegrey-800);
  gap: 8px;
  width: 100%;
  padding-bottom: 24px;
  align-self: stretch;
`

export const SectionTitle = styled.div`
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.16px;
  color: var(--coldgrey-50);
  margin-bottom: 8px;
  align-self: stretch;
`

export const SectionContent = styled.div`
  display: flex;
`
export const LinkButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: var(--danger-200);
  text-align: right;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
  letter-spacing: 0.12px;

  &:hover {
    span {
      color: var(--primary-400, #33ffda);
      text-align: right;
      font-family: Manrope;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px; /* 150% */
      letter-spacing: 0.14px;
    }

    svg path {
      fill: var(--primary-400, #33ffda);
    }
  }
`

export const LinkbuttonText = styled.span`
  color: var(--primary-500, #00efc3);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.14px;
`

export const CustomInputContainer = styled.div<{ error: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 4px;
  gap: 10px;
  background: linear-gradient(0deg, var(--basegrey-950), var(--basegrey-950));
  linear-gradient(0deg, var(--basegrey-950), var(--basegrey-950));
  border: 2px solid var(--primary-500, #33ffda);
  display: flex;
  align-self: stretch;

  &:hover {
    border: 2px solid var(--primary-500, #ccfff6);
  }

  &:focus {
    border: 2px solid var(--primary-500, #33ffda);
  }

  &.editable{
    &:focus-within{
      border: 2px solid var(--primary-500, #33FFDA);
      background: var(--basegrey-950, #0D0D0D);
    }

    ${({ error }) => error && `border: 2px solid var(--danger-400, #EC464B);`}
  }

  &.passwordEditable{
    &:focus-within{
      border: 2px solid var(--primary-500, #33FFDA);
      background: var(--basegrey-950, #0D0D0D);
    }

    ${({ error }) => error && `border: 2px solid var(--danger-400);`}
  }

  &.editableWhiteBorder{
    border: 1px solid var(--basegrey-800);
    &:focus-within{
    border: 1px solid var(--basegrey-50);
    }
  }


`

export const CustomInput = styled.input`
  &:not(:focus) {
    font-family: Manrope;
    font-weight: 400;
  }
  width: 100%;
  border: 0px;
  background: linear-gradient(0deg, var(--basegrey-950), var(--basegrey-950));
  font-family: Manrope;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: normal;
  text-align: left;
  color: var(--basegrey-400);
  flex: 1 0 0;
  &::placeholder {
    color: var(--basegrey-700);
  }
  &:focus-visible {
    outline: none;
    color: white;
    border: none;
  }

  disable: true;

  &.non-editable {
    pointer-events: none;
  }
`
export const CustomInputButton = styled.div`
  justify-content: center;
  flex-direction: column;
  display: flex;
  float: right;
  text-align: right;
  cursor: pointer;
  font-family: Manrope;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-align: right;
  color: var(--primary-100);
`

export const ErrorDescription = styled.div`
  align-self: stretch;
  color: var(--danger-200);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  /* Paragraph/Medium */
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  font-family: Manrope;
  line-height: 24px;
  letter-spacing: 0.16px;
  margin-top: 8px;
`

export const CancelButton = styled.div`
  display: inline-flex;
  padding: 12px 20px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  color: var(--basegrey-50, #f2f2f2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    color: var(--coldgrey-400);
  }
`

export const Button = styled.span<{ disabled: boolean }>`
  display: inline-flex;
  padding: 12px 20px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  border: 2px solid var(--basegrey-800, #333);
  color: var(--basegrey-800, #333);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */

  ${({ disabled }) =>
    !disabled &&
    `cursor: pointer; 
    background: var(--cybergreen-500, var(--primary-500));
    border: 2px solid var(--cybergreen-500, var(--primary-500));
    color: var(--basegrey-950);

    &:hover {
      background:transparent;
      border: 2px solid var(--primary-500);
      color: var(--primary-500);
    }`}
  margin-top: 12px;
`
export const ButtonSuccess = styled.span`
  display: flex;
  padding: 10px 12px 10px 8px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  color: var(--primary-200, var(--primary-200));
  text-align: right;
  font-family: Manrope;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
  background: none;
  border: 0px;
  cursor: pointer;
`
export const ToogleButton = styled.div<{ buttonType: boolean }>`
  display: flex;
  width: 36px;
  height: 20px;
  padding: 2px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 1000px;
  background: ${({ buttonType }) => (buttonType ? "var(--primary-500)" : "var(--coldgrey-400)")};
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease;
  box-sizing: border-box;

  &:hover {
    background: ${({ buttonType }) => (buttonType ? "var(--primary-200, #99FFEC)" : "var(--coldgrey-400, #8D93A5)")};
  }
`

export const ToogleButtonRadio = styled.div<{ buttonType: boolean }>`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  ${({ buttonType }) => (buttonType ? "margin-right: 0px;" : "margin-right: 16px;")};
  background: var(--basegrey-950, var(--basegrey-950));
  transition: margin-left 0.3s ease, margin-right 0.3s ease;
`
export const ToggleText = styled.span`
  font-family: Manrope;
  font-size: 12px;
  color: var(--basegrey-50);
`

export const CloseButton = styled.img`
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: 0px;
  cursor: pointer;
  position: relative;
  &:hover {
    img {
      filter: brightness(0) invert(1);
    }
  }
`

export const ButtonAlign = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 32px;
`
// Styled Component for the Show and Hide password button
export const ShowHideButton = styled.button`
  font-family: Manrope;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #fff;

  font-style: normal;
  background: transparent;
  border: transparent;
  &:hover {
    cursor: pointer;
  }
`
