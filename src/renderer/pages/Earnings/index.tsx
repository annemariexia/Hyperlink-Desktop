import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useEffect } from "react"
import styled from "styled-components"
import imgRedo from "./../../../../images/redo.svg"
import imgBank from "./../../../../images/bank.svg"
import imgMenuCard from "./../../../../images/card.svg"
import imgMenuActiveCard from "./../../../../images/card-active.svg"
import imgRewards from "./../../../../images/rewards.svg"
import imgRewardsActive from "./../../../../images/rewards-active.svg"
import imgArrowRight from "./../../../../images/arrow-right.svg"
import imgRedoActive from "./../../../../images/redo-active.svg"
import imgBankActive from "./../../../../images/bank-active.svg"
import imgArrowRightActive from "./../../../../images/arrow-right-active.svg"
import imgCard from "./../../../../images/card.png"
import { Transfer } from "./Transfer"
import { TransferHistory } from "./TransferHistory"
import { Card } from "./Card"
import { Rewards } from "./Rewards"
import { stopEventPropagation } from "../../elements/EventListeners"

type Props = {
  openTransferScreen: Dispatch<SetStateAction<string>>
  profile: any
  refers?: any
  closeModal: () => void
  onReferalClick: () => void
  activeTab?: string | "transfer"
  openChatDrawer()
  setActiveModal(activeModal: string)
  setProfile(profile: any)
}

const menu = [
  { id: "transfer", text: "Transfer", icon: imgArrowRight, activeIcon: imgArrowRightActive, width: 11.58, height: 11.58, top: 4.17, left: 4.25 },
  { id: "history", text: "Transfer History", icon: imgRedo, activeIcon: imgRedoActive, width: 13.3, height: 13.3, top: 1.33, left: 1.33 },
  { id: "card", text: "Card", icon: imgMenuCard, activeIcon: imgMenuActiveCard, width: 16, height: 16, top: 3, left: 2 },
  { id: "reward", text: "Rewards", icon: imgRewards, activeIcon: imgRewardsActive, width: 14, height: 16, top: 2, left: 3 }
]

export const TransferScreen: FC<Props> = ({ openTransferScreen, profile, closeModal, onReferalClick, refers, activeTab, openChatDrawer, setActiveModal, setProfile }): ReactElement => {
  const [activeMenu, setActiveMenu] = useState(activeTab)

  return (
    <Form onClick={stopEventPropagation}>
      <div className="leftPanel">
        <div className="title">Earnings</div>
        <div className="menuPanel">
          {
            menu.map((item, index) => {
              return (
                <div key={index} className={`menu ${item.id === activeMenu ? "active" : ""}`} onClick={() => {
                  if (item.id === menu[0].id || item.id === menu[1].id) {
                    if (!profile || (profile && profile.role === "Guest")) {
                      setActiveModal("SignupLogin")
                      return
                    }
                  }
                  setActiveMenu(item.id)
                }}>
                  <div className="icon" style={{ width: 18, height: 18 }}>
                    <img src={item.id === activeMenu ? item.activeIcon : item.icon} style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="menuText">{item.text}</div>
                </div>
              )
            })
          }
        </div>
        {activeMenu !== "card" && (
          <>
            <div className="menuDivider"></div>
            <div className="card">
              <img className="cardImage" src={imgCard} />
            </div>
            <div className="bottomText">Hyperlink Card is coming soon</div>
            <div className="learnMore">
              <a onClick={() => { setActiveMenu('card') }} style={{ cursor: "pointer", marginRight: "4px" }}>Learn more </a>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM11.5303 6.53033C11.8232 6.23744 11.8232 5.76256 11.5303 5.46967L6.75736 0.696699C6.46447 0.403806 5.98959 0.403806 5.6967 0.696699C5.40381 0.989593 5.40381 1.46447 5.6967 1.75736L9.93934 6L5.6967 10.2426C5.40381 10.5355 5.40381 11.0104 5.6967 11.3033C5.98959 11.5962 6.46447 11.5962 6.75736 11.3033L11.5303 6.53033ZM1 6.75H11V5.25H1V6.75Z"
                  fill="#33FFDA"
                />
              </svg>
            </div>
          </>
        )}
      </div>
      <div className="divider"></div>
      <div className="rightPanel">
        {activeMenu === menu[0].id && <Transfer profile={profile} openTransferScreen={openTransferScreen} closeModal={closeModal} openChatDrawer={openChatDrawer} setActiveMenu={setActiveMenu} setProfile={setProfile} />}
        {activeMenu === menu[1].id && <TransferHistory profile={profile} closeModal={closeModal} openChatDrawer={openChatDrawer} />}
        {activeMenu === menu[2].id && <Card profile={profile} closeModal={closeModal} refers={refers} />}
        {activeMenu === menu[3].id && <Rewards profile={profile} closeModal={closeModal} refers={refers} onReferalClick={onReferalClick} />}
      </div>
    </Form>
  )
}

const Form = styled.div`
  width: 844px;
  height: var(--FormHeight);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  .divider {
    width: 1px;
    height: var(--FormHeight);
    background: rgba(255, 255, 255, 0.15);
  }
  .leftPanel {
    width: 284px;
    height: var(--FormHeight);
    border-radius: 12px 0px 0px 12px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(25px);
    .title {
      margin-left: 36px;
      margin-top: 24px;
      color: var(--white, #fff);
      font-size: 24px;
      font-family: Manrope;
      font-weight: 600;
      line-height: 100%;
    }
    .icon {
      position: relative;
    }
    .menuPanel {
      margin-top: 40px;
      margin-left: 10px;
      margin-right: 10px;
      .menu {
        &.active {
          background: rgba(255, 255, 255, 0.1);
          .menuText {
            display: flex;
            width: 192px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-family: Manrope;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: 0.21px;
          }
        }
        cursor: pointer;
        display: flex;
        padding: 6px 12px 6px 24px;
        align-items: center;
        gap: 16px;
        align-self: stretch;
        border-radius: 8px;
        .menuText {
          display: flex;
          width: 192px;
          height: 36px;
          flex-direction: column;
          justify-content: center;
          color: var(--basegrey-50, #f2f2f2);
          font-size: 14px;
          font-family: Manrope;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.21px;
        }
        &:not(.active):hover {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
    .menuDivider {
      margin-top: 100px;
      margin-bottom: 16px;
      margin-left: 14px;
      border-radius: 1px;
      background: rgba(255, 255, 255, 0.15);
      width: 256px;
      height: 1px;
      flex-shrink: 0;
    }
    .card {
      margin-left: 18px;
    }
    .cardImage {
      width: 248px;
      border-radius: 8px;
      background: var(--dark-black, #0e0d17);
    }
    .bottomText {
      margin-left: 18px;
      margin-top: 18px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-self: stretch;
      color: #fff;
      font-size: 24px;
      font-family: Space Grotesk;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.6px;
    }
    .learnMore {
      display: flex;
      align-items: center;
      a {
        margin-left: 18px;
        color: var(--cybergreen-400, #33ffda);
        font-size: 14px;
        font-family: Manrope;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0.21px;
        &:hover {
          cursor: pointer;
        }
      }
      .arrowIcon {
        margin-left: 8px;
      }
      img {
        margin-left: 8px;
      }
    }
  }
  .rightPanel {
    width: 560px;
    padding: 0px 0px 38px 0px;
    align-items: flex-start;
    border-radius: 0px 12px 12px 0px;
    background: #0a0a0a;
  }
`
