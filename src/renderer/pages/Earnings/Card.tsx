import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useEffect } from "react"
import styled from "styled-components"
import imgClose from "/images/close.svg"
import { TransferMain } from "../../styles/Earnings"
import CardImg from "/images/card-large.svg"
import HealthPNG from "/images/Hearth.png"

type Props = {
  profile
  closeModal
  refers
}

export const Card: FC<Props> = ({ profile, closeModal, refers }): ReactElement => {
  return (
    <TransferMain>
      <div className="transfer" style={{ marginRight: 0 }}>
        <div className="top">
          <div className="title">Card</div>
          <img src={imgClose} className="closeButton" onClick={closeModal}/>
        </div>
        <div className="content" style={{ overflowY: "scroll", height: "676px", paddingTop: 12, overflowX: "hidden"}}>
          <ImgSection>
            <ImgTopTitle>Coming soon</ImgTopTitle>
            <ImgTitle>Hyperlink Card</ImgTitle>
            <ImgDescription>Make purchases directly using your earnings from running Hypervisor, all through your Hyperlink Card.</ImgDescription>
            <img src={CardImg}></img>
            <Divider></Divider>
            <ImgTitle>
              Directly access your earnings.
              <br></br>
              Anywhere, Anytime.
            </ImgTitle>
            <ImgDescription>Stay tuned for a big announcement later this year.</ImgDescription>
            <ImgCard>
              <img src={HealthPNG}></img>
              <>
                <ImgCardTitle> Buy things you love using your earnings. </ImgCardTitle>
                <ImgCardDescription>No need to transfer money out.</ImgCardDescription>
              </>
            </ImgCard>
            <CardItems>
              <CardItem1>
                <>
                  <CardItemTitle1>Absolutely</CardItemTitle1>
                  <CardItemTitle2>
                    No Fees. <br /> Ever.
                  </CardItemTitle2>
                </>
                <CardItemTitle3>Only $10 Balance Needed to Unlock</CardItemTitle3>
              </CardItem1>
              <CardItem2>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="32" viewBox="0 0 21 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 10.5V13.5H19.5C20.3284 13.5 21 14.1716 21 15V28.5C21 29.3286 20.3284 30 19.5 30L1.5 29.9993C0.671631 29.9993 0 29.3276 0 28.4993V15C0 14.1716 0.671631 13.5 1.5 13.5H3V10.5C3 6.36456 6.36456 3 10.5 3C14.6354 3 18 6.36456 18 10.5ZM10.5 6C8.01892 6 6 8.01892 6 10.5V13.5H15V10.5C15 8.01892 12.9811 6 10.5 6ZM10.5 23.9993C11.7426 23.9993 12.75 22.9919 12.75 21.7493C12.75 20.5066 11.7426 19.4993 10.5 19.4993C9.25736 19.4993 8.25 20.5066 8.25 21.7493C8.25 22.9919 9.25736 23.9993 10.5 23.9993Z"
                    fill="#0D0D0D"
                  />
                </svg>
                <CardItemTitle4>High-level privacy for both our digital and physical cards.</CardItemTitle4>
              </CardItem2>
            </CardItems>
            <Divider></Divider>
            <CardTextTitle>When can I start using the card?</CardTextTitle>
            <CardTextAnswer>The card will be revealed later this year.</CardTextAnswer>
            <Divider></Divider>
            <CardTextTitle>Who can use the card?</CardTextTitle>
            <CardTextAnswer>A Hyperlink card becomes available to any Hyperlink user once their account balance exceeds $10.</CardTextAnswer>
            <Divider></Divider>
            <CardTextTitle>Where can I use the card?</CardTextTitle>
            <CardTextAnswer>Your virtual card can be used for any online purchases, while your physical card functions just like any other debit card.</CardTextAnswer>
            <Divider></Divider>
            <CardTextTitle>What are the fees?</CardTextTitle>
            <CardTextAnswer>Absolutely no fees, always.</CardTextAnswer>
            <Divider></Divider>
            <CardTextAnswer2>
              Please note that the following information pertains to a feature ('Feature') that is under development and may be implemented in the future on Hyperlink Card ('Card'). This information is provided by Hyperlink Technologies, Inc. ('we',
              'us', and 'our') for general informational and planning purposes only.
              <TextItemList>
                <li>The exact specifications, functionality, and availability of the Feature are subject to change without prior notice. We cannot guarantee that the Feature will be released, or that it will be released as described here.</li>
                <li>
                  We are not liable for any actions taken or decisions made based on the anticipated availability or functionality of the Feature. Any financial or other decisions should be made based on existing Card features and services, and not
                  on the potential availability of the Feature.
                </li>
                <li>We reserve the right to modify, postpone, or cancel the development or implementation of the Feature at our sole discretion.</li>
                <li>The announcement of the potential Feature does not constitute a binding commitment, guarantee, or obligation on our part. Any implementation of the Feature will be subject to our usual terms and conditions of service.</li>
                <li>Any expected dates or timelines provided for the implementation of the Feature are estimates only. We do not guarantee that the Feature will be implemented within these timelines.</li>
              </TextItemList>
              By using the Card, you acknowledge and agree to the terms set out in this disclaimer. For further information or inquiries, please contact our customer service team.
            </CardTextAnswer2>
          </ImgSection>
        </div>
      </div>
    </TransferMain>
  )
}

const TextItemList = styled.ol`
  list-style-type: decimal;
  padding-left: 10px;
`

const CardTextAnswer2 = styled.div`
  color: var(--basegrey-400, #999);
  font-family: Manrope;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 12.5px */
  margin-bottom: 55px;
`

const CardTextTitle = styled.div`
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

const CardTextAnswer = styled.div`
  color: var(--coldgrey-100, #e2e4e9);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

const CardItemTitle4 = styled.div`
  color: var(--basegrey-950, #0d0d0d);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 133.333% */
  letter-spacing: 0.24px;
`

const CardItem2 = styled.div`
  display: flex;
  width: 180px;
  padding: 16px 24px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-800, #2d3039);
  background: var(--primary-gradient-light, linear-gradient(180deg, #00cca7 0%, #33ffda 80.8%, #99ffec 99.05%));
`

const CardItemTitle3 = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 112.5% */
  letter-spacing: 0.16px;
  margin-top: 76px;
`

const CardItemTitle1 = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 100% */
  letter-spacing: 0.32px;
`

const CardItemTitle2 = styled.div`
  color: var(--primary-400, #33ffda);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 100% */
  letter-spacing: 0.32px;
`

const CardItem1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  display: flex;
  width: 180px;
  padding: 16px 24px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-800, #2d3039);
  background: var(--coldgrey-900, #16181d);
`

const CardItems = styled.div`
  display: flex;
  width: 448px;
  align-items: flex-start;
  gap: 8px;
`

const ImgCardDescription = styled.div`
  color: var(--secondary-300, #9d6bfa);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 122.222% */
  letter-spacing: 0.18px;
`

const ImgCardTitle = styled.div`
  color: #fff;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 116.667% */
`

const ImgCard = styled.div`
  display: flex;
  padding: 16px 24px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-800, #2d3039);
  background: var(--secondary-950, #090119);
  margin-bottom: 8px;
  width: 408px;
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
  margin-bottom: 24px;
`

const ImgDescription = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  margin-bottom: 24px;
  width: 448px;
`

const ImgTitle = styled.div`
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
  margin-bottom: 16px;
`

const ImgTopTitle = styled.div`
  color: var(--secondary-200, #be9cfc);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
  margin-bottom: 8px;
`

const ImgSection = styled.div`
  display: flex;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`
