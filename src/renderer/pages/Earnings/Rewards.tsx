import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useEffect } from "react"
import styled from "styled-components"
import imgClose from "/images/close.svg"
import { TransferMain } from "../../styles/Earnings"
import RewardsHeaderImg from "./../../../../images/rewards/rewards.svg"
import RewardsItemImg1 from "../../../../images/rewards/rewards1.svg"
import RewardsItemImg2 from "../../../../images/rewards/rewards2.png"
import RewardsItemImg3 from "../../../../images/rewards/rewards3.png"
import RewardsItemImg4 from "../../../../images/rewards/rewards4.png"
import RewardsItemImg5 from "../../../../images/rewards/rewards5.png"
import RewardsItemImg6 from "../../../../images/rewards/rewards6.png"
import { getGeneratedNameForNode } from "typescript"

type Props = {
  profile
  closeModal
  refers
  onReferalClick
}

export const Rewards: FC<Props> = ({ profile, closeModal, refers, onReferalClick }): ReactElement => {


  const getRewardPercentContent = (price: number) => {
    const actualEarning = profile? (profile.earningsUsd / 100) : 0
    const earningVsPricePct = Math.trunc(profile.earningsUsd / price)
    return (
    <RewardsPercent>
      <RewardsPercentTitle>
        <PercentTitle>Your Progress</PercentTitle>
        <PercentNumber>{profile ? (actualEarning >= price ? 100 : earningVsPricePct) : "0"}%</PercentNumber>
      </RewardsPercentTitle>
      {actualEarning >= price ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="188" height="4" viewBox="0 0 188 4" fill="none">
            <rect width="188" height="4" rx="2" fill="#2D3039" />
            <rect width="188" height="4" rx="2" fill="#00EFC3" />
          </svg>
          <RewardsPercentDescription>Unlocked!</RewardsPercentDescription>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="188" height="4" viewBox="0 0 188 4" fill="none">
            <rect width="188" height="4" rx="2" fill="#2D3039" />
            <rect width={profile ? (earningVsPricePct/100 * 188).toFixed(0) : "0"} height="4" rx="2" fill="#F1F1F4" />
          </svg>
          <RewardsPercentDescription>Earn ${getRemainingAmount(price, actualEarning).toFixed(2)} more to unlock</RewardsPercentDescription>
        </>
      )}
    </RewardsPercent>)
  }

  const getRemainingAmount = (price: number, earning: number) => {
    const actualRemainingAmount = (price-earning)
    if(actualRemainingAmount < 0.01 && actualRemainingAmount > 0) {
      return 0.01
    }
    return Math.trunc(actualRemainingAmount*100)/100
  }

  return (
    <TransferMain>
      <div className="transfer" style={{ marginRight: 0 }}>
        <div className="top">
          <div className="title">Rewards</div>
          <img src={imgClose} className="closeButton" onClick={closeModal}/>
        </div>
        <div className="content" style={{ overflowY: "scroll", height: "676px", paddingTop: 12, marginRight: 0, overflowX: "hidden" }}>
          <RewardsContentContainer>
            <RewardsHeader>
              <RewardsHeaderLeftContainer>
                <RewardsHeaderTitle>
                  <Toptitle>Coming soon</Toptitle>
                  <MainTitle>Unlock amazing rewards just by keeping your computer on!</MainTitle>
                </RewardsHeaderTitle>
                <RewardsHeaderContent>
                  Enjoy instant access to a diverse range of items using the cash you've accrued, directly in Hyperlink. <br></br>No external transfers required.
                </RewardsHeaderContent>
              </RewardsHeaderLeftContainer>
              <RewardsHeaderRightContainer>
                <img src={RewardsHeaderImg} style={{ width: 180, height: 176 }} />
              </RewardsHeaderRightContainer>
            </RewardsHeader>
            <Divider></Divider>
            <RewardsContent>
              <RewardsContentTitle>Discover a variety of rewards</RewardsContentTitle>
              <RewardsContentDescription>Understand the time required to earn rewards at your current computation rate.</RewardsContentDescription>
              <RewardsContentItemList>
                <RewardsItemRow>
                  <RewardsItem>
                    <RewardsItemTitle>Treat yourself to a nice cup of coffee</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn a $5 cup of morning coffee</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg1} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>
                      Run Hypervisor for <br></br>20 mins every day
                    </RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    {getRewardPercentContent(5)}
                  </RewardsItem>
                  <RewardsItem>
                    <RewardsItemTitle>Upgrade yourself to a new iPhone 14</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn a $22.22 monthly payment</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg2} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>
                      Run Hypervisor for <br></br>23 days every month
                    </RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    {getRewardPercentContent(22.22)}
                  </RewardsItem>
                </RewardsItemRow>
                <RewardsItemRow>
                  <RewardsItem>
                    <RewardsItemTitle>Enjoy movies and shows on Netflix</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn a $16 monthly subscription</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg3} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>Run Hypervisor for 36 hours every month</RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    {getRewardPercentContent(16)}
                  </RewardsItem>
                  <RewardsItem>
                    <RewardsItemTitle>Earn even more with a powerful new Desktop</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn a $2199 gaming computer</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg4} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>
                      Run Hypervisor for <br />
                      247 days
                    </RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    {getRewardPercentContent(2199)}
                  </RewardsItem>
                </RewardsItemRow>
                <RewardsItemRow>
                  <RewardsItem>
                    <RewardsItemTitle>Enjoy a vacation in the Maldives for two</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn $10,000 per year in referral fees</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg5} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>
                      Invite 500 users by posting your <a onClick={onReferalClick}>unique referral link</a>
                    </RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    {getRewardPercentContent(10000)}
                  </RewardsItem>
                  <RewardsItem>
                    <RewardsItemTitle>Get your own Lamborghini Huracan</RewardsItemTitle>
                    <RewardsItemDescription>Passively earn $210,000 per year in referral fees</RewardsItemDescription>
                    <RewardsItemImage>
                      <img src={RewardsItemImg6} style={{ width: "188px", height: "140px", borderRadius: "4px" }} />
                    </RewardsItemImage>
                    <RewardsItemSubDescription>
                      Invite 10,000 users by posting your <a onClick={onReferalClick}>unique referral link</a>
                    </RewardsItemSubDescription>
                    <SmallDivider></SmallDivider>
                    <RewardsPercent>
                      <RewardsPercentTitle>
                        <PercentTitle>Your Progress</PercentTitle>
                        <PercentNumber>{profile ? (profile?.earningsUsd / 100 > 210000 ? 100 : (profile?.earningsUsd / 210000).toFixed(0)) : "0"}%</PercentNumber>{" "}
                      </RewardsPercentTitle>
                      {profile?.earningsUsd / 100 > 210000 ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="188" height="4" viewBox="0 0 188 4" fill="none">
                            <rect width="188" height="4" rx="2" fill="#2D3039" />
                            <rect width={profile ? ((profile?.earningsUsd / 210000 / 100) * 188).toFixed(0) : "0"} height="4" rx="2" fill="#F1F1F4" />{" "}
                          </svg>
                          <RewardsPercentDescription>Unlocked!</RewardsPercentDescription>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="188" height="4" viewBox="0 0 188 4" fill="none">
                            <rect width="188" height="4" rx="2" fill="#2D3039" />
                            <rect width={profile ? ((refers.length / 8897 / 100) * 188).toFixed(0) : "0"} height="4" rx="2" fill="#F1F1F4" />
                          </svg>
                          <RewardsPercentDescription>Invite 8,897 more to unlock</RewardsPercentDescription>
                        </>
                      )}
                    </RewardsPercent>
                  </RewardsItem>
                </RewardsItemRow>
              </RewardsContentItemList>
              <Divider></Divider>
            </RewardsContent>
            <RewardsFooter>
              Please note that the following information pertains to a feature ('Feature') that is under development and may be implemented in the future on Hyperlink Rewards (‘Rewards’). This information is provided by Hyperlink Technologies, Inc.
              ('we', 'us', and 'our') for general informational and planning purposes only.
              <ol>
                <li>The exact specifications, functionality, and availability of the Feature are subject to change without prior notice. We cannot guarantee that the Feature will be released, or that it will be released as described here.</li>
                <li>
                  We are not liable for any actions taken or decisions made based on the anticipated availability or functionality of the Feature. Any financial or other decisions should be made based on existing Card features and services, and not
                  on the potential availability of the Feature.
                </li>
                <li>We reserve the right to modify, postpone, or cancel the development or implementation of the Feature at our sole discretion.</li>
                <li>The announcement of the potential Feature does not constitute a binding commitment, guarantee, or obligation on our part. Any implementation of the Feature will be subject to our usual terms and conditions of service.</li>
                <li>Any expected dates or timelines provided for the implementation of the Feature are estimates only. We do not guarantee that the Feature will be implemented within these timelines.</li>
              </ol>
              By using Rewards, you acknowledge and agree to the terms set out in this disclaimer. For further information or inquiries, please contact our customer service team.
            </RewardsFooter>
          </RewardsContentContainer>
        </div>
      </div>
    </TransferMain>
  )
}

const TextItemList = styled.ol`
  list-style-type: decimal;
  padding-left: 10px;
`

const PercentTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const PercentNumber = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  text-align: right;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const RewardsPercentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const RewardsPercentDescription = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`

const RewardsPercent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  box-shadow: 0px 10px 150px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(25px);
`

const RewardsItemImage = styled.div`
  border-radius: 4px;
`

const SmallDivider = styled.div`
  border-radius: 1px;
  background: var(--coldgrey-800, #2c303a);
  height: 1px;
  align-self: stretch;
`

const RewardsItemSubDescription = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  a {
    color: var(--primary-200, #99ffec);
    font-family: Manrope;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`

const RewardsItemDescription = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

const RewardsItemTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 125% */
  letter-spacing: 0.16px;
`

const RewardsItem = styled.div`
  display: flex;
  width: 188px;
  padding: 16px 16px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-900, #16181d);
  background: #000;
`

const RewardsItemRow = styled.div`
  display: flex;
  width: 448px;
  align-items: flex-start;
  gap: 8px;
`

const RewardsContentItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const RewardsContentTitle = styled.div`
  color: var(--coldgrey-50, #f1f1f4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: 0.2px;
  margin-bottom: 8px;
`

const RewardsContentDescription = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  margin-bottom: 24px;
`

const RewardsHeaderContent = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

const Toptitle = styled.div`
  color: var(--secondary-200, #be9cfc);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
`

const MainTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
`

const RewardsHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const RewardsHeaderRightContainer = styled.div``

const RewardsHeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
  margin-bottom: 24px;
`

const RewardsHeader = styled.div`
  display: flex;
  padding-bottom: 0px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`

const RewardsContent = styled.div``

const RewardsFooter = styled.div`
  color: var(--basegrey-400, #999);
  font-family: Manrope;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */

  ol {
    padding-left: 0px;
    list-style-position: inside;
  }
  li {
    text-indent: -1em;
    padding-left: 1em;
  }
  
  color: var(--basegrey-400, #999);
  font-family: Manrope;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 12.5px */
  margin-bottom: 55px;
`

const RewardsContentContainer = styled.div`
  display: flex;
  width: 448px;
  flex-direction: column;
  align-items: flex-start;
`
