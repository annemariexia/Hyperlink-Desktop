/* BarMsg Component */

/*
0- Yes / No — do we need this code?
Yes, we need this code. It represents a message bar with a title and content.

1- Why? — Why do we need this code?
We need this code to display a message bar with a title and corresponding content.

2- How? — How does this code work?
The component takes in Header and Question as props to display the title and content, respectively.
It renders a message bar with a fixed width and height and rounded corners.
The title and content are displayed in separate div elements.

3- What? — What are the important key variables?
Header: The title of the message bar.
Question: The content of the message bar.

4- Who? — Who does this code serve?
This code serves developers who want to display a message bar with a title and content.

5- Where? — Where does this code connect to?
This code can be used in various components that require a message bar with a title and content.

6- When? — When does this code get used?
This code gets used when there is a need to display informative messages or notifications to users.
*/


import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react"
import styled from "styled-components"

type Props = {
  Header: string
  Question: string
}


export const BarMsg: FC<Props> = ({ Header, Question }) => {
  return (
    <Bar>
      <Title>{Header}</Title>
      <Content>{Question}</Content>
    </Bar>
  )
}


const Bar = styled.div`
  width: 260px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.20);
`

const Title = styled.div`
  display: flex;
  width: 218px;
  height: 10px;
  flex-direction: column;
  justify-content: center;
  color: rgba(255, 255, 255, 0.50);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Alliance;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
  letter-spacing: -0.25px;
  margin-left: 17px;
  margin-top: 12px;
  marigin-bottom: 1vh;
`

const Content = styled.div`
  display: flex;
  width: 218px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  color: #FFF;
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Alliance;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.35px;
  margin-left: 17px;
  margin-top: 12px;
`