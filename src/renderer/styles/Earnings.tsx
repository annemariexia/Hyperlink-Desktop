import styled from "styled-components"

export const Form = styled.div`
  padding-bottom: 38px;
`

export const TransferMain = styled.div`
  .transfer {
    .top {
      display: flex;
      position: relative;
      padding: 24px 24px 24px 48px;
      align-items: center;
      align-self: stretch;
      justify-content: space-between;
      .title {
        color: var(--white, #fff);
        font-size: 24px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 100%;
        height: 24px;
      }
    }
    .content {
      display: flex;
      padding: 0px 64px 0px 48px;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      .subTitle {
        color: #ccc;
        font-size: 14px;
        font-family: Manrope;
        line-height: 125%;
        .link {
          cursor: pointer;
          color: #ccfff6;
          text-decoration: none;
        }
      }
      .middlePanel {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        align-self: stretch;
        .panelFrom {
          display: flex;
          padding: 12px 16px;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          align-self: stretch;
          border-radius: 8px;
          border: 1px solid var(--basegrey-800, #333);
          background: #0d0d0d;
          .text {
            color: var(--white, #fff);
            font-size: 14px;
            font-family: Manrope;
            font-weight: 500;
            line-height: 24px;
          }
          .earningsTag {
            display: flex;
            padding: 8px 0px;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
            align-self: stretch;
            .title {
              color: var(--coldgrey-50, #f1f1f4);
              font-size: 32px;
              font-family: Manrope;
              font-weight: 500;
              line-height: 36px;
              letter-spacing: -1.28px;
            }
            .subtitle {
              color: var(--coldgrey-400, #8b92a7);
              font-size: 16px;
              font-family: Manrope;
              font-weight: 300;
              line-height: 28px;
            }
          }
        }
        .panelTo {
          display: flex;
          padding: 12px 20px 12px 16px;
          align-items: center;
          gap: 24px;
          align-self: stretch;
          border-radius: 8px;
          border: 1px solid var(--basegrey-800, #333);
          background: #0d0d0d;
          .panelLeft {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            flex: 1 0 0;
            .text {
              color: var(--white, #fff);
              font-family: Manrope;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 24px; /* 171.429% */
            }
            .paymentMethodBlock {
              display: flex;
              padding: 8px 0px;
              flex-direction: column;
              align-items: flex-start;
              gap: 2px;
              align-self: stretch;
              border-radius: 3px;
              .subtitle {
                color: var(--coldgrey-400, #8b92a7);
                font-size: 16px;
                font-family: Manrope;
                line-height: 28px;
                font-weight: 400;
                line-height: 28px; /* 175% */
              }
              .title {
                color: var(--basegrey-50, #f2f2f2);
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                font-family: Manrope;
                line-height: 36px;
                letter-spacing: 0.2px;
              }
            }
          }
          .panelRight {
            display: flex;
            align-items: center;
            gap: 20px;
            .panelDivider {
              width: 1px;
              height: 100px;
              background-color: var(--basegrey-800, #333);
            }
            .panelRightTag {
              cursor: pointer;
              display: flex;
              align-items: flex-start;
              gap: 4px;
              .hoverText {
                color: var(--primary-500, #00EFC3);
                font-family: Manrope;
                font-size: 12px;
                font-style: normal;
                font-weight: 600;
                line-height: 20px; /* 166.667% */
              }
            }
          }
          &:hover {
            border: 1px solid var(--primary-200, #99ffec);
            .panelRight {
              .panelDivider {
                background-color: var(--primary-200, #99ffec);
              }
            }
            #icon {
              fill: var(--primary-500, #00efc3);
            }
          }
        }
        .dividerPanel {
          display: flex;
          align-items: center;
          gap: 12px;
          align-self: stretch;
          .divider {
            border-radius: 1px;
            background: var(--basegrey-800, #333);
            height: 1px;
            flex: 1 0 0;
          }
          .dividerImg {
            display: flex;
            padding: 10px;
            align-items: flex-start;
            gap: 10px;
            border-radius: 12px;
            background: var(--primary-500, #00efc3);
          }
        }
      }
      .amountPanel {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .text {
          color: var(--coldgrey-50, #f1f1f4);
          font-family: Manrope;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
        }
        .text.disabled {
          color: var(--basegrey-900, #1a1a1a);
        }
        input {
          display: flex;
          background: transparent;
          outline: none;
          border: none;
          padding: 3px 0px 0px 0px;
          font-size: 32px;
          line-height: 40px;
        }
        .buttonGroup {
          display: flex;
          align-items: flex-start;
          width: 448px;
          gap: 8px;
          .button {
            cursor: pointer;
            display: flex;
            padding: 10px 12px;
            flex-direction: column;
            align-items: center;
            flex: 1 0 0;
            color: var(--basegrey-50, #f2f2f2);
            border-radius: 3px;
            border: none;
            background: var(--coldgrey-900, #16181d);
            font-size: 16px;
            &:hover {
              background: var(--coldgrey-800, #2d3039);
            }
            &:disabled {
              background: var(--basegrey-900, #1a1a1a);
              color: var(--basegrey-950, #0d0d0d);
              cursor: not-allowed;
            }
          }
        }
      }
      button.transferButton {
        cursor: pointer;
        display: flex;
        padding: 12px 20px;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        width: 100%;
        gap: 12px;
        align-self: stretch;
        border-radius: 4px;
        background: var(--cybergreen-500, #00efc3);
        color: var(--basegrey-950, #0d0d0d);
        text-align: center;
        font-size: 18px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        border: 2px solid var(--cybergreen-500, #00efc3);

        &:not(:disabled):hover {
          border-radius: 4px;
          border: 2px solid var(--primary-500, #00efc3);
          background: #0a0a0a;
          color: var(--primary-500, #00efc3);
        }

        &:disabled {
          background: var(--basegrey-900, #1a1a1a);
          color: var(--basegrey-950, #0d0d0d);
          border: none;
          cursor: not-allowed;
        }
      }
    }
  }
`

export const TransferAddPayout = styled.div`
  .top {
    display: flex;
    padding: 24px 24px 24px 12px;
    gap: 12px;
    align-items: center;
    align-self: stretch;
    .title {
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
      display: flex;
      align-items: center;
      flex: 1 0 0;
    }
    .button {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
  .content {
    display: flex;
    padding: 0px 64px 0px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    .subTitle {
      color: #ccc;
      font-size: 14px;
      font-family: Manrope;
      font-weight: 400;
      line-height: 125%;
      .link {
        color: #ccfff6;
        cursor: pointer;
      }
    }
    .inputCard {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      .panelFrom {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        color: var(--coldgrey-50, #f1f1f4);
        font-size: 16px;
        font-family: Manrope;
        line-height: 24px;
        letter-spacing: 0.16px;
      }

      .input-group {
        position: relative;

        input.email {
          display: flex;
          align-items: center;
          gap: 8px;
          align-self: stretch;
          padding: 12px 16px 12px 42px;
          border-radius: 3px;
          border: 2px solid var(--primary-400, #33ffda);
          background: var(--basegrey-950, #0d0d0d);
          outline: none;
          color: var(--basegrey-50, #f2f2f2);
          font-size: 14px;
          font-family: Manrope;
          line-height: 125%;
          width: 390px;
          &::placeholder {
            color: var(--basegrey-400, #999);
          }
        }

        input.email:hover {
          border: 2px solid var(--primary-100, #ccfff6);
        }

        input.email:focus {
          border: 2px solid var(--primary-400, #33ffda);
        }

        img {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }
      }
    }

    .actions {
      display: flex;
    }

    button.submit {
      cursor: pointer;
      display: inline-flex;
      padding: 10px 12px;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      border: 1px solid var(--cybergreen-500, #00EFC3);
      background: var(--cybergreen-500, #00EFC3);
      color: var(--coldgrey-950, #0B0C0E);
      text-align: right;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
      margin-right: 8px;
    }

    button.submit-disabled {
      cursor: pointer;
      display: inline-flex;
      padding: 10px 12px;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      border: 1px solid var(--basegrey-800, #333);
      color: var(--basegrey-800, #333);
      background: transparent;
      text-align: right;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
      margin-right: 8px;
    }

    button.submit:hover {
      display: flex;
      padding: 10px 12px;
      flex-direction: column;
      align-items: center;
      border-radius: 4px;
      border: 1px solid var(--primary-500, #00EFC3);
      background: var(--coldgrey-950, #0B0C0E);
      color: var(--primary-500, #00EFC3);
      text-align: right;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
      margin-right: 8px;
    }

    button.btn-danger {
      cursor: pointer;
      display: flex;
      padding: 10px 12px;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: none;
      color: #FFF;
      text-align: right;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
      border: none;
    }

    button.btn-danger:hover {
      display: inline-flex;
      padding: 10px 12px;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      background: #0A0A0A;
      color: var(--danger-400, #EC464B);
      text-align: right;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: 'liga' off;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
    }

    button.btn-success {
      display: flex;
      padding: 10px 12px 10px 8px;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      color: var(--primary-200, #99ffec);
      text-align: right;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 125% */
      letter-spacing: 0.16px;
      background: none;
      border: 0px;
      cursor: pointer;
    }
  }
`

export const TransferInfoContainer = styled.div`
  .top {
    display: flex;
    padding: 24px 24px 24px 12px;
    gap: 12px;
    align-items: center;
    align-self: stretch;
    .title {
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
      display: flex;
      align-items: center;
      flex: 1 0 0;
    }
    .button {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
  
  .content {
    padding: 0 64px 0 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    .subTitle {
      color: #ccc;
      font-size: 14px;
      font-family: Manrope;
      line-height: 125%;
      .link {
        color: #ccfff6;
        cursor: pointer;
        &:hover {
          color: var(--primary-500, #33E7FF);
        }
      }
    }
    .actions {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .submit {
        display: flex;
        width: 448px;
        padding: 12px 20px;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        background: var(--cybergreen-500, #00efc3);
        color: var(--basegrey-950, #0d0d0d);
        text-align: center;
        font-size: 18px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        cursor: pointer;
        border: 2px solid var(--primary-500, #00efc3);
      }

      .submit:hover {
        color: var(--cybergreen-500, #00efc3);
        text-align: center;
        font-size: 18px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        border-radius: 4px;
        border: 2px solid var(--primary-500, #00efc3);
        background: #0a0a0a;
      }

      .btn-cancel {
        display: flex;
        width: 448px;
        padding: 12px 20px;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        border: 1px solid var(--basegrey-900, #1A1A1A);
        background: var(--basegrey-900, #1A1A1A);
        color: var(--basegrey-50, #F2F2F2);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
        cursor: pointer;
      }

      .btn-cancel:hover {
        border-radius: 4px;
        background: #0a0a0a;
        color: var(--danger-400, #ec464b);
        text-align: center;
        font-size: 18 px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        border-radius: 4px;
        background: #FFF;
        border: 1px solid #fff;
        color: var(--basegrey-950, #0D0D0D);
        text-align: center;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: 'liga' off;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 133.333% */
      }
    }
    .total-row {
      display: flex;
      width: 100%;
      align-items: baseline;
      gap: 2px;
      .total-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 0 0;
        color: var(--basegrey-50, #f2f2f2);
        font-size: 16px;
        font-family: Manrope;
        line-height: 20px;
      }

      .total-dollar {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;
        font-size: 32px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 36px;
        letter-spacing: -1.28px;
      }

      .total-currency {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;

        /* Heading/XXSmall */
        font-size: 14px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1.12px;
        text-transform: uppercase;
      }
    }
    .form-rows {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      .form-row {
        display: flex;
        width: 448px;
        align-items: center;
        gap: 2px;
        .detail-label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 0 0;
          color: var(--basegrey-300, #b3b3b3);
          font-size: 16px;
          font-family: Manrope;
          line-height: 20px;
        }

        .detail-value {
          color: var(--basegrey-50, #f2f2f2);
          text-align: right;
          font-size: 16px;
          font-family: Manrope;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: -0.64px;
        }
      }
    }
    .form-divider {
      height: 1px;
      align-self: stretch;
      border-radius: 1px;
      background: var(--basegrey-800, #333);
    }
    .from-groups {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      .from-group {
        display: flex;
        padding: 12px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        border-radius: 8px;
        border: 1px solid var(--basegrey-800, #333);
        background: var(--basegrey-950, #0d0d0d);
        .from-label {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          color: var(--white, #fff);
          font-size: 14px;
          font-family: Manrope;
          font-weight: 500;
          line-height: 24px;
        }
        .from-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          align-self: stretch;
          .from-comment {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: stretch;
            color: var(--coldgrey-400, #8d93a5);
            font-size: 16px;
            font-family: Manrope;
            line-height: 24px;
          }
          .payment-method {
            display: flex;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            img {
              width: 24px;
              height: 24px;
            }
            .payment-email {
              color: var(--coldgrey-50, #f1f1f4);
              font-family: Manrope;
              font-size: 20px;
              font-style: normal;
              font-weight: 500;
              line-height: 24px; /* 120% */
              letter-spacing: 0.2px;
            }
          }
          .earnings {
            display: flex;
            align-self: stretch;
            .earnings-arrived {
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1 0 0;
              color: var(--coldgrey-50, #f1f1f4);
              font-size: 20px;
              font-family: Manrope;
              font-weight: 500;
              line-height: 24px;
              letter-spacing: 0.2px;
            }
            .earnings-value {
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1 0 0;
              color: var(--coldgrey-50, #f1f1f4);
              text-align: right;
              font-size: 20px;
              font-family: Manrope;
              font-weight: 500;
              line-height: 24px;
              letter-spacing: -0.8px;
            }
          }
        }
      }
    }
  }
`

export const Input = styled.input<{ margin?: string }>`
  outline: none;
  color: #ffffff;
  font-size: ${({ value, type }) => (!!value && type === "password" && value?.toString()?.length > 0 ? `42px` : "24px")};
  padding: ${({ value, type }) => (!!value && type === "password" && value?.toString()?.length > 0 ? `0 32px 7px 32px` : "0 32px 0 32px")};
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  ${({ margin }) => !!margin && `margin: ${margin};`}
  &::placeholder {
    color: #ffffff;
    opacity: 0.8;
  }
`

export const TransferInputContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  width: 448px;
  height: 70px;
  border-radius: 30px;
  background-color: rgb(0 0 0 / 17%);
  box-sizing: border-box;
  border: none;
  disaply: flex;
  flex-direction: row;

  padding: 16px 12px;
  align-items: center;
  border-radius: 8px;
  border: ${({ disabled }) => (disabled ? "2px solid var(--basegrey-900, #1A1A1A)" : "2px solid var(--cybergreen-500, #00efc3)")};
  background: var(--basegrey-950, #0d0d0d);
  color: var(--coldgrey-50, #F1F1F4);
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Manrope;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: -1.28px;

  &::before {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--coldgrey-50, #f1f1f4);
    pointer-events: none;
  };
  &:disabled {
    border: 2px solid var(--basegrey-900, #1a1a1a);
    color: #1a1a1a;
  }
`

export const ImageButton = styled.img`
  cursor: pointer;
  width: 32px;
`

export const CustomImageButton = styled.svg`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

export const TransferConfirmContainer = styled.div`
  .top {
    display: flex;
    padding: 24px 24px 24px 48px;
    align-items: center;
    align-self: stretch;
    .title {
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
      display: flex;
      align-items: center;
      flex: 1 0 0;
    }
    .button {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }

  .content {
    padding: 0 64px 0 48px;

    .comment {
      color: #ccc;
      font-size: 14px;
      font-family: Manrope;
      line-height: 125%;
      margin-bottom: 24px;
      a {
        color: #ccfff6;
        cursor: pointer;
      }
    }
    .actions {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .submit {
        display: flex;
        width: 448px;
        padding: 12px 20px;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        background: none;
        color: var(--basegrey-50, #f2f2f2);
        text-align: center;
        font-size: 18px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        border: 2px solid var(--basegrey-50, #f2f2f2);
        cursor: pointer;
      }

      .submit:hover {
        color: var(--basegrey-950, #0d0d0d);
        background: var(--coldgrey-50, #f1f1f4);
      }

      .btn-cancel {
        display: flex;
        width: 448px;
        padding: 12px 20px;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        background: var(--basegrey-900);
        border: none;
        color: var(--basegrey-50, #f2f2f2);
        text-align: center;
        font-size: 18px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 24px;
        cursor: pointer;
      }

      .btn-cancel:hover {
        color: #0D0D0D;
        background: var(--coldgrey-50, #F1F1F4);
      }
    }

    .confirm-box.rejected {
      display: flex;
      padding: 12px 16px 20px 16px;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      border-radius: 8px;
      border: 2px solid var(--danger-400, #ec464b);
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
      border: 2px solid var(--primary-400, #33ffda);
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
        font-weight: 400;
      }
    }

    .content-row {
    }

    .content-total {
      display: flex;
      width: 100%;
      align-items: baseline;
      gap: 2px;
      border-radius: 3px;
      margin-top: 24px;

      .label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 0 0;
        color: var(--basegrey-50, #f2f2f2);
        font-size: 16px;
        font-family: Manrope;
        line-height: 20px;
        font-weight: 400;
        font-style: normal;
      }

      .dollar {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;
        font-size: 32px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 36px;
        letter-spacing: -1.28px;
      }

      .currency {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;

        /* Heading/XXSmall */
        font-size: 14px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1.12px;
        text-transform: uppercase;
      }

      .cancel-text {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;
        font-variant-numeric: lining-nums tabular-nums;
        font-feature-settings: "liga" off;
        font-family: Manrope;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1.12px;
        text-transform: uppercase;
      }
    }

    .content-divider {
      height: 1px;
      align-self: stretch;
      border-radius: 1px;
      background: var(--basegrey-800, #333);
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .detail-row {
      display: flex;
      align-items: flex-start;
      align-self: stretch;
      margin-bottom: 12px;

      .detail-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 0 0;
        color: var(--basegrey-300, #b3b3b3);
        font-size: 16px;
        font-family: Manrope;
        line-height: 20px;
        font-weight: 400;
      }

      .detail-value {
        color: var(--basegrey-50, #f2f2f2);
        text-align: right;
        font-size: 16px;
        font-family: Manrope;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.16px;
      }
    }

    .confirm-desc {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
      color: #ccc;
      font-size: 14px;
      font-family: Manrope;
      line-height: 125%;
      letter-spacing: 0.14px;
      font-weight: 400;
      .link {
        color: #ccfff6;
        cursor: pointer;
        &:hover {
          color: var(--primary-500, #33E7FF);
        }
      }
    }
  }
`
