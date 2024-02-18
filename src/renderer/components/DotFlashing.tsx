/* DotFlashing

0- Yes / No — do we need this code?
   Yes, we need this code as it defines a React component for a flashing dot animation.

1- Why? — Why do we need this code?
   We need this code to create a visual effect of a flashing dot that can be used for various purposes in the UI.

2- How? — How does this code work?
   - The component 'DotFlashing' is a functional component that returns a styled div element representing the flashing dot.
   - The CSS styles are defined using the 'styled-components' library to create the animation effect.
   - The dot element is created using a div with the 'dot-flashing' class, which is animated using a keyframes animation.
   - Two additional pseudo-elements (::before and ::after) are used to create two more dots, making it a group of three flashing dots.
   - The animation alternates between displaying the dots with a solid white background and a semi-transparent purple background.
   - The animation has a 1-second duration and repeats infinitely.

3- What? — What are the important key variables?
   - 'DotFlashingWrapper': A styled-component that provides the styling for the overall container of the flashing dots.
   - '.dot-flashing': The class that represents the single dot element and is animated to create the flashing effect.
   - '@keyframes dot-flashing': The keyframes animation that defines the alternating background color of the dot.

4- Who? — Who does this code serve?
   This code serves the React application that needs a flashing dot animation as part of its UI components.

5- Where? — Where does this code connect to?
   This code can be imported and used within any React component in the project where a flashing dot animation is required.

6- When? — When does this code get used?
   This code is used whenever the 'DotFlashing' component is included and rendered within a React component.
*/

import React from "react"
import styled from "styled-components"

const DotFlashing = () => {
  return (
    <DotFlashingWrapper>
      <div className="dot-flashing"></div>
    </DotFlashingWrapper>
  )
}

export default DotFlashing

const DotFlashingWrapper = styled.div`
  height: 24px;
  .dot-flashing {
    margin-top: 7px;
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #ffffff;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }
  .dot-flashing::before,
  .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0px;
  }
  .dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #ffffff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }
  .dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #ffffff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: #ffffff;
    }
    50%,
    100% {
      background-color: rgba(152, 128, 255, 0.2);
    }
  }
`
