import React, { Dispatch, FC, ReactElement, SetStateAction, useState, useRef, useEffect } from "react"

import { AccountScreen } from "../../styles/Settings"
import styled from "styled-components"
import { UserDetails } from "src/renderer/elements/system/ProfileManager"
import imgClose from "/images/close.svg"
import { setTokenSourceMapRange } from "typescript"

type Props = {
  profile: UserDetails
  onClose()
  refers: any
  referEarnings: number
  setIsBoostEarning(boost: string)
}

export const Referrals: FC<Props> = ({ profile, onClose, refers, referEarnings, setIsBoostEarning }): ReactElement => {
    const [isCopied, setIsCopied] = useState(false)
    return (
        <AccountScreen>
            <ModalHeader>
                <ModalHeaderText>Referrals</ModalHeaderText>
                <img src={imgClose} alt="Close button" className="closeButton" onClick={onClose} style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "44px",
                    right: "236px"
                }} />
            </ModalHeader>
            <ModalContent>
                <TextDescription>
                    View all income streams from referrals. To increase your earnings, <HoverLink onClick={() => {
                        onClose()
                        setIsBoostEarning("invitefriend")
                    }}>share your referral link</HoverLink>.
                </TextDescription>
                <div>
                    <TextTitle style={{ marginBottom: 8 }}>
                        referral earnings
                    </TextTitle>
                    <TextValue>
                        $ {referEarnings}
                    </TextValue>
                </div>
                <div>
                    <TextTitle style={{ marginBottom: 8 }}>
                        Referred users
                    </TextTitle>
                    <TextValue>
                        {refers.length}
                    </TextValue>
                </div>
                <Divider></Divider>
                <ReferLinkContainer>
                    <ReferTitle>Your unique referral link</ReferTitle>
                    <ReferLink onClick={() => {
                        navigator.clipboard.writeText(`https://hyperlink.org/join/${profile?.id}`)
                        setIsCopied(true)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.16675 5.41667V6.25C9.16675 6.4801 8.98018 6.66667 8.75008 6.66667H6.66675C4.82583 6.66667 3.33341 8.15903 3.33341 10C3.33341 11.841 4.82583 13.3333 6.66675 13.3333H8.75008C8.98018 13.3333 9.16675 13.5199 9.16675 13.75V14.5833C9.16675 14.8134 8.98018 15 8.75008 15H6.66675C3.90531 15 1.66675 12.7614 1.66675 10C1.66675 7.23857 3.90531 5 6.66675 5H8.75008C8.98018 5 9.16675 5.18656 9.16675 5.41667ZM13.3334 5C16.0948 5 18.3334 7.23857 18.3334 10C18.3334 12.7614 16.0948 15 13.3334 15H11.2501C11.02 15 10.8334 14.8134 10.8334 14.5833V13.75C10.8334 13.5199 11.02 13.3333 11.2501 13.3333H13.3334C15.1743 13.3333 16.6667 11.841 16.6667 10C16.6667 8.15903 15.1743 6.66667 13.3334 6.66667H11.2501C11.02 6.66667 10.8334 6.4801 10.8334 6.25V5.41667C10.8334 5.18656 11.02 5 11.2501 5H13.3334ZM7.08342 9.16667C6.85331 9.16667 6.66675 9.35323 6.66675 9.58333V10.4167C6.66675 10.6468 6.85331 10.8333 7.08342 10.8333H12.9167C13.1469 10.8333 13.3334 10.6468 13.3334 10.4167V9.58333C13.3334 9.35323 13.1469 9.16667 12.9167 9.16667H7.08342Z" fill="#C6C9D2" />
                        </svg>
                        <Link>https://hyperlink.org/join/{profile?.id}</Link>
                        {!isCopied ? (
                            <CopyButton onClick={() => {
                                navigator.clipboard.writeText(`https://hyperlink.org/join/${profile?.id}`)
                                setIsCopied(true)
                                setTimeout(() => {
                                    setIsCopied(false)
                                }, 3000)
                            }}>
                                <CopyButtonLabel>Copy Link</CopyButtonLabel>
                            </CopyButton>
                        ) : (
                            <CopiedButton onClick={() => {
                                setIsCopied(false)
                            }}>
                                <CopiedLabel>Copied!</CopiedLabel>
                            </CopiedButton>
                        )}
                    </ReferLink>
                </ReferLinkContainer>
            </ModalContent>
        </AccountScreen >
    )
}

const HoverLink = styled.a`
  color: #ccfff6;
  cursor: pointer;
  &:hover {
    color: var(--cybergreen-400, #33ffda) !important;
  }
`

const CopiedButton = styled.div`
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
`

const CopiedLabel = styled.div`
  color: var(--primary-400, #33ffda);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const CopyButtonLabel = styled.div`
  color: var(--basegrey-950, #0d0d0d);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.14px;
`

const CopyButton = styled.div`
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: var(--primary-500, #00efc3);
  cursor: pointer;
  width: 62px;
  height: 20px;
  &:hover {
    background: transparent;
    border: 1px solid var(--primary-500, #00efc3);
    div {
      color: var(--primary-400, #33ffda);
      text-align: center;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "liga" off;
      font-family: Manrope;
      font-size: 13px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
      letter-spacing: 0.14px;
    }
  }
`

const Link = styled.div`
  color: #f2f2f2;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  width: 298px;
`

const ReferLink = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--basegrey-800, #333);
  background: var(--basegrey-950, #0d0d0d);
  cursor: pointer;
  &:hover {
    border-radius: 4px;
    border: 1px solid var(--primary-200, #99ffec);
    background: var(--basegrey-950, #0d0d0d);
  }
`

const ReferTitle = styled.div`
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.96px;
  text-transform: uppercase;
`

const ReferLinkContainer = styled.div`
  display: flex;
  width: 448px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const Divider = styled.div`
  display: flex;
  height: 1px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 2px;
  background: var(--basegrey-800, #333);
  width: 464px;
`

const TextValue = styled.div`
  flex: 1 0 0;
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 91.667% */
  letter-spacing: -0.96px;
`

const TextTitle = styled.div`
  align-self: stretch;
  color: var(--coldgrey-200, #c6c9d2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.96px;
  text-transform: uppercase;
`

const TextDescription = styled.span`
  width: 448px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  color: var(--basegrey-200, #ccc);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 17.5px */
  span {
    display: flex;
    color: var(--primary-200, #99ffec);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
  }
`

const ModalHeader = styled.div`
  display: flex;
  width: 670px;
  padding: 24px 24px 24px 48px;
  align-items: center;
  gap: 12px;
  .closeButton:hover img {
    filter: brightness(0) invert(1);
  }
`
const ModalHeaderText = styled.div`
  color: var(--white, #fff);
  font-family: Manrope;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`

const ModalContent = styled.div`
  display: flex;
  width: 464px;
  padding: 0px 48px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 8px;

  /* shadow */
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
`
