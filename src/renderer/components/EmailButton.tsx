/* EmailButton

0- Yes / No — do we need this code?
   Yes, we need this code as it defines a React functional component representing an EmailButton with an icon and text.

1- Why? — Why do we need this code?
   We need this code to create a reusable EmailButton component that can be used to display an icon and text, and perform a specific action (sending an email) when clicked.

2- How? — How does this code work?
   - The component 'EmailButton' is a functional component that takes three props: 'text', 'link', and 'img'.
   - The 'text' prop represents the text to be displayed below the icon.
   - The 'link' prop contains the email link that will be used when the button is clicked.
   - The 'img' prop contains the URL to the image that will be displayed as the icon.
   - The 'onClick' function is defined to handle the button click event. It sends an IPC message to the Electron main process with the 'ApiCommand.OpenEmail' command and the provided 'link'.
   - The content of the EmailButton is defined using 'styled-components', with a flex container that aligns items vertically.
   - The icon and text are placed within this container.
   - The icon is displayed as an image, and its height is determined based on the 'text' prop value. Different heights are used for specific text (e.g., "Yahoo").

3- What? — What are the important key variables?
   - 'EmailButton': The functional component that represents the EmailButton with an icon and text.
   - 'Content': A styled-component that provides the styling for the EmailButton container, icon, and text.
   - 'ipcRenderer': An instance of Electron's IPC renderer used to send messages to the main process.
   - 'ApiCommand.OpenEmail': The IPC command used to open the provided email link in the main process.

4- Who? — Who does this code serve?
   This code serves the React application that needs a reusable EmailButton component with an icon and text for email-related actions.

5- Where? — Where does this code connect to?
   This code can be imported and used within any React component in the project where an EmailButton is required.

6- When? — When does this code get used?
   This code is used whenever the 'EmailButton' component is included and rendered within a React component, typically when there is a need for an email-related action button.
*/


import { ipcRenderer } from "electron"
import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { ApiCommand } from "../elements/system/System"

const EmailButton: FC<{ text: string; link: string; img: string }> = ({ text, link, img }): ReactElement => {
  const onClick = () => {
    ipcRenderer.send(ApiCommand.OpenEmail, link)
  }
  return (
    <Content onClick={onClick}>
      <div className="icon">
        <img className={text} src={img} />
      </div>
      <div className="text">{text}</div>
    </Content>
  )
}
export default EmailButton

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 116px;
    height: 68px;
    background: #ffffff00 0% 0% no-repeat padding-box;
    border-radius: 15px;
    opacity: 1;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    img {
      height: 44px;
    }
    .Yahoo {
      height: 25px;
    }
  }
  .text {
    text-align: center;
    font: normal normal 600 20px/24px Alliance;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    margin-top: 10px;
  }
`
