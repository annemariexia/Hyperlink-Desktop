/* ProgressBar 

0- Yes / No — do we need this code?
Yes.

1- Why? — Why do we need this code?
This code is needed to render a progress bar with a specific percentage fill. It visually represents the progress of a task or system operation.

2- How? — How does this code work?
The ProgressBar component receives the percent prop, which indicates the progress percentage. It uses styled components to create a container and a bar element. The width of the bar is determined by the provided percentage, and the appearance is customized with gradients and transitions.

3- What? — What are the important key variables?
percent: Prop that represents the progress percentage to fill the bar.

4- Who? — Who does this code serve?
This code serves users who need to display a progress bar with a specific percentage fill, usually to visualize the progress of a task or operation.

5- Where? — Where does this code connect to?
This code is a standalone component and can be used anywhere in the application where a progress bar is required.

6- When? — When does this code get used?
This code gets used whenever a progress bar needs to be displayed with a specific percentage, such as when showing the progress of file uploads, system loading, or any other task that has measurable progress.
*/


import React, { FC, ReactElement } from "react"
import styled from "styled-components"

type Props = {
  percent: number
}

export const ProgressBar: FC<Props> = ({ percent }): ReactElement => {
  return <Container>
    <Bar percent={percent} />
  </Container>
}

const Container = styled.div`
  width: 100%;
  height: 22px;
  border-radius: 11px;
  background: rgb(255 255 255 / 12%);
`

const Bar = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 22px;
  border-radius: 11px;
  background: rgb(172,172,186);
  background: linear-gradient(90deg, rgba(172,172,186,1) 0%, rgba(215,186,254,1) 65%, rgba(202,180,223,1) 100%);
  transition: width 200ms ease-in;
`