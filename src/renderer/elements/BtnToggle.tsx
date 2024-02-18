import styled from "styled-components"

export const BtnToggle = styled.button<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? "#74747452" : "transparent")};
  height: 18px;
  padding: 0 8px;
  border-radius: 9px;
  color: white;
  font-size: 20px;
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  border: none;
  outline: none;
  cursor: pointer;
  user-drag: none;
  transition: all 100ms ease-in;

  &:hover {
    background-color: #d2d2d24d;
  }
`
