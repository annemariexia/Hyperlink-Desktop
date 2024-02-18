import styled from "styled-components"

export const Form = styled.div`
  padding-bottom: 38px;
`

// styled components for the account screen as implemented in Account.tsx
export const AccountScreen = styled.div`
  display: flex;
  width: var(--RightPanelWidth);
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0px 12px 12px 0px;
  text-align: left;

  .delete-link-btn {
    &:hover {
      color: var(--danger-400, #ec464b);
    }
  }
  .input-container {
    position: relative;
    display: inline-block;
  }

  .phonenumber {
    padding-right: 30px; /* Make space for the edit button */
  }
  .container_account {
    position: relative;
    width: 460px;
    border-bottom: 2px solid rgba(51, 51, 51, 1); /* You can change the border style/color here */
    margin-bottom: 30px;
    padding-bottom: 10px;
  }

  .editbutton {
    position: absolute;
    top: 45%;
    right: 15px; /* Distance from the right side of the input-container */
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
  }
  .managebutton {
    position: absolute;
    top: 55%;
    right: 0px; /* Distance from the right side of the input-container */
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
  }

  .title {
    margin-top: 32px;
    color: #ffffff;
    font-size: 24px;
    font-family: Manrope;
    font-weight: 600;
    line-height: 100%;
  }
  .title2 {
    margin-top: 32px;
    margin-bottom: 10px;
    color: var(--white, #fff);
    font-size: 24px;
    font-family: Manrope;
    font-weight: 600;
    line-height: 100%;
  }
  .text {
    color: rgba(204, 204, 204, 1);
    font-family: "Manrope", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .indicationtext {
    color: rgba(246, 162, 165, 1);
    font-family: "Manrope", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 0;
  }
  .subtitle a {
    color: rgba(153, 255, 236, 1);
    text-decoration: none;
  }
  .withoutBackBtn .closeButton {
    position: absolute;
    margin-left: 475px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .withBackBtn .closeButton {
    position: absolute;
    margin-left: 511px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .returnButton {
    position: absolute;
    margin-left: -36px;
    margin-top: 32px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .subtitle {
    color: var(--basegrey-200, #ccc);
    font-size: 14px;
    font-family: Manrope;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
  }
  .label {
    color: var(--coldgrey-50, #f1f1f4);
    font-size: 16px;
    font-family: Manrope;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.16px;
  }
  .divideLine {
    width: 448px;
    height: 1px;
    border: var(--basegrey-800, #333);
    background: var(--basegrey-800, #333);
  }
  .profileImgSection {
    display: flex;
    padding: 4px 12px 4px 0px;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    .profileImg {
      display: flex;
      width: 72px;
      height: 72px;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 72px;
      border: 2px solid var(--primary-200, #99ffec);
      color: var(--primary-200, #99ffec);
      text-align: center;
      font-size: 24px;
      font-family: Manrope;
      font-style: normal;
      font-weight: 600;
      line-height: 44px;
      letter-spacing: 0.96px;
      text-transform: uppercase;
    }
    .addProfileImgSection {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      flex: 1 0 0;
      .profileText {
        color: var(--basegrey-400, #999);
        font-size: 14px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
      }
      .profileBtn {
        cursor: pointer;
        display: flex;
        height: 24px;
        padding: 0px 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        border-radius: 2px;
        background: var(--coldgrey-900, #16181d);
        color: var(--coldgrey-400, #8d93a5);
        text-align: center;
        font-size: 12px;
        font-family: Manrope;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
        letter-spacing: 0.12px;
      }
    }
  }
  .userInfoGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    .userInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      .infoContent {
        display: flex;
        padding: 4px 10px 4px 0px;
        align-items: center;
        justify-content: space-between;
        width: 436px;
        gap: 10px;
        margin-bottom: 8px;
        align-self: stretch;
        color: var(--basegrey-400, #999);
        font-size: 14px;
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 400;
        line-height: 125%;
        .editLabel {
          cursor: pointer;
          color: var(--primary-100, #ccfff6);
          text-align: center;
          font-size: 12px;
          font-family: Manrope;
          font-style: normal;
          font-weight: 600;
          line-height: 18px;
          letter-spacing: 0.12px;
        }
      }
    }
  }
  .inputActive {
    display: flex;
    padding: 16px;
    align-items: center;
    width: 440px;
    gap: 10px;
    margin-top: 8px;
    align-self: stretch;
    border-radius: 4px;
    background: var(--basegrey-950, #0d0d0d);
    color: var(--basegrey-50, #f2f2f2);
    font-size: 14px;
    font-family: Manrope;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    border: 2px solid var(--primary-400, #33ffda);
  }

  .saveChangesBtn {
    cursor: pointer;
    width: auto;
    height: auto;
    padding: 10px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 2px solid var(--cybergreen-600, #00cca7);
    color: var(--cybergreen-500, #00efc3);
    text-align: center;
    font-size: 16px;
    font-family: Manrope;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.16px;
    border-radius: 4px;
  }
  .saveChangesBtn:hover {
    background-color: var(--cybergreen-500, #00efc3);
    color: rgba(13, 13, 13, 1);
    border-color: transparent;
  }

  .saveChangesBtn:active {
    background-color: var(--cybergreen-600, #00cca7);
    color: rgba(13, 13, 13, 1);
    border-color: transparent;
  }
  .inputFormGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4px;
    .label {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      color: var(--coldgrey-50, #f1f1f4);
      font-size: 16px;
      font-family: Manrope;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
    .inputGreyed {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border: 0px;
      color: var(--basegrey-400, #999);
      font-size: 16px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }
    .inputError {
      display: flex;
      padding: 16px;
      align-items: center;
      width: 440px;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border: 0px;
      color: var(--basegrey-400, #999);
      font-size: 16px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }
    .inputGreyed {
      cursor: pointer;
      display: flex;
      width: 440px;
      padding: 12px 16px;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      color: var(--basegrey-400, #999);
      font-size: 14px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }

    input {
      display: flex;
      width: 440px;
      padding: 12px 16px;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border-radius: 4px;
      // border: 1px solid var(--basegrey-800, #333);
      border: 2px solid var(--primary-400, #33ffda);
      background: var(--basegrey-950, #0d0d0d);
      color: var(--basegrey-400, #999);
      font-size: 14px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }
  }
  .inputFormGroup2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 500px;
    .label {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      color: var(--coldgrey-50, #f1f1f4);
      font-size: 16px;
      font-family: Manrope;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
    .inputGreyed {
      cursor: pointer;
      display: flex;
      width: 440px;
      padding: 12px 16px;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: var(--basegrey-400, #999);
      font-size: 14px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }
    input {
      display: flex;
      width: 440px;
      padding: 12px 16px;
      flex-direction: column;
      align-items: start;
      margin-top: 8px;
      margin-bottom: 20px;
      flex: 1 0 0;
      border-radius: 8px;
      border: 1px solid var(--basegrey-800, #333);
      background: var(--basegrey-950, #0d0d0d);
      color: var(--basegrey-400, #999);
      font-size: 14px;
      font-family: Inter, sans-serif;
      line-height: 125%;
    }
  }
  .confirm-box.rejected {
    display: flex;
    width: 448px;
    padding: 12px 16px 20px 16px;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    gap: 0px;
    border: 1px solid var(--danger-400, #ec464b);
    background: #0d0d0d;
  }

  .confirm-box {
    display: flex;
    padding: 12px 16px 20px 16px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid var(--primary-400, #33ffda);
    background: #0d0d0d;

    img {
      width: 96px;
      height: 96px;
    }

    .confirm-status {
      display: flex;
      width: 416px;
      flex-direction: column;
      justify-content: center;
      flex: 1 0 0;
      color: var(--coldgrey-50, #f1f1f4);
      text-align: center;
      font-size: 20px;
      font-family: Manrope;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.2px;
    }

    .confirm-comment {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: stretch;
      color: var(--coldgrey-400, #8d93a5);
      text-align: center;
      font-size: 16px;
      font-family: Manrope;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
