import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import styled from "styled-components"
import { AccountScreen } from "../../styles/Settings"
import imgClose from "/images/close.svg"
import imgEllipse from "/images/icon-Ellipse.png"
import SecurityIcon from "/images/SecurityIcon.png"
import Cridential from "/images/Credential.png"
import imgAntivirus from "/images/icon-Antivirus.png"
import * as Components from "./AccountSettingComponents"

type Props = {
  onClose()
  profile
  setActiveModal: (modal: string) => void
}

export const Security: FC<Props> = ({ onClose, profile, setActiveModal }): ReactElement => {
  const [isAutoStart, setIsAutoStart] = useState(true)

  const onChangeCheckbox = () => {
    setIsAutoStart(!isAutoStart)
  }

  const clickHandlerAntivirusReport = () => {
    window.open("www.hyperlink.org/antivirus-whitelist", "_blank")
  }

  const clickHandlerLinkedIn = () => {
    window.open("https://www.linkedin.com/company/hyperlink-supercomupting/", "_blank")
  }

  return (
    <>
      <AccountScreen>
        <Components.ModalHeader className="withoutBackBtn">
          <Components.ModalHeaderText>Security</Components.ModalHeaderText>
          <Components.CloseButton src={imgClose} alt="Close button" className="closeButton" onClick={onClose} />
        </Components.ModalHeader>
        <ModalContent>
          <Container>
            <DescriptionContinaer>
              <DescriptionTitle>Antivirus is blocking Hyperlink?</DescriptionTitle>
              <DescriptionTitleTwo>Don’t worry!</DescriptionTitleTwo>
              <Description>Don't worry, it is not a virus. Simply follow our detailed guides to whitelist Hyperlink and its libraries.</Description>
            </DescriptionContinaer>
            <img src={SecurityIcon}></img>
          </Container>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>Why am I getting an Antivirus warning?</DescriptionTitle>
            <Description>
              Antivirus programs sometimes incorrectly label CPU / GPU containers and mining libraries as potentially unwanted programs [PUP] or malicious due to the similarity between legitimate mining software and those used by hackers without
              permission to mine cryptocurrencies.
            </Description>
            <br />
            <br />
            <Description style={{ fontWeight: "500px;" }}>This means that even Hyperlink, which seeks your permission and fairly compensates you for your computation time, can be blocked sometimes.</Description>
          </DescriptionContinaerTwo>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>How do I fix this?</DescriptionTitle>
            <Description>To ensure Hyperlink works and you are not losing on your earnings, please add the Hyperlink folder to the list of exceptions of your Antivirus. </Description>
            <ClickButton> Click for a detailed tutorial.</ClickButton>
          </DescriptionContinaerTwo>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>Do all Antivirus programs block Hyperlink?</DescriptionTitle>
            <Description>No! In fact it is only a handful of antivirus programs that identify Hyperlink as potentially unwanted program.</Description>
            <ClickButton onClick={clickHandlerAntivirusReport}> See an Antivirus report.</ClickButton>
          </DescriptionContinaerTwo>
          <FlagContainer>
            <FlagSubContainerLeft>
              <img src={imgEllipse} style={{ transform: "rotate(90deg)", zIndex: "-1" }} />
              <FlagSubContainerLeftDescriptionUp>64</FlagSubContainerLeftDescriptionUp>
              <FlagSubContainerLeftDescriptionDown>/ 70</FlagSubContainerLeftDescriptionDown>
            </FlagSubContainerLeft>
            <FlagSubContainerRight>64 out of 70 security vendors identified Hyperlink executable file as safe</FlagSubContainerRight>
          </FlagContainer>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>How does Hyperlink work?</DescriptionTitle>
            <Description>
              <StyledList>
                <li>We use resources of your CPU and GPU to perform computational tasks for which you are rewarded with money.</li>
                <li>To run those tasks our software needs to access CPU and GPU of your computer.</li>
                <li>CPU and GPU mining is used during the testing phase</li>
                <li>Hyperlink does not access your OS file system.</li>
                <li>We utilize the highest level of protection protocols to safeguard your privacy.</li>
              </StyledList>
            </Description>
          </DescriptionContinaerTwo>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>Can I trust Hyperlink?</DescriptionTitle>
            <Description>Yes! Learn more about us on</Description>
            <ClickButton onClick={clickHandlerLinkedIn}> LinkedIn.</ClickButton>
          </DescriptionContinaerTwo>
          <CredentialContainer>
            <CredentialTitleContainer>
              <img src={Cridential}></img>
              <CredentialTitleDescription>Our credentials</CredentialTitleDescription>
            </CredentialTitleContainer>
            <CredentialDescription>
              Hyperlink Technologies Inc.
              <br />2 Embarcadero Center, San Francisco, CA 94111, USA hello@hyperlink.org
            </CredentialDescription>
          </CredentialContainer>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>Where is my data going?</DescriptionTitle>
            <Description>
              Your privacy is our highest priority. In order to run the service, we only collect necessary usage data; however, your account details, CPU and GPU usage, earnings and login credentials are always encrypted and never shared with anyone.
            </Description>
            {/* <ClickButton>Check VirusTotal report.</ClickButton> */}
          </DescriptionContinaerTwo>
          <Divider />
          {/* <Divider /> */}
          <DescriptionContinaerTwo>
            <DescriptionTitle>We are working with antivirus companies to solve this issue!</DescriptionTitle>
            <Description>
              Hyperlink is actively engaging and collaborating with leading antivirus companies, to ensure our software complies with security standards. We are implementing transparency measures to solidify and demonstrate our commitment to user
              security.
            </Description>
            <AntivirusImgConainter>
              <img src={imgAntivirus} />
            </AntivirusImgConainter>
          </DescriptionContinaerTwo>
          <Divider />
          <DescriptionContinaerTwo>
            <DescriptionTitle>You can Help! Submit a file for analysis</DescriptionTitle>
            <Description>
              Please submit Hyperlink files to Microsoft and your Antivirus Provider for inspection as a false positive.
              <br />
              <br /> Mark it as: Incorrectly detected as PUA (potentially unwanted application)
            </Description>
          </DescriptionContinaerTwo>
          <DescriptionContinaerTwo style={{ height: "160px" }}></DescriptionContinaerTwo>
        </ModalContent>
      </AccountScreen>
      <BottomConainter>
        <BottomTitle>Sounds good?</BottomTitle>
        <BottomButton>
          <ContinueButtonLabel>
            Unblock {"&"} Start Earning {">"}
          </ContinueButtonLabel>
        </BottomButton>
      </BottomConainter>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  margin-left: 48px;
  margin-right: 64px;
`

const DescriptionContinaer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  width: 224px;
  height: 146px;
`

const DescriptionContinaerTwo = styled.div`
  margin-left: 48px;
  margin-right: 64px;
`
const DescriptionTitle = styled.div`
  margin-bottom: 8px;
  align-self: stretch;
  color: var(--basegrey-50, #f2f2f2);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: 0.2px;
`
const DescriptionTitleTwo = styled.div`
  align-self: stretch;
  margin-bottom: 16px;
  color: var(--info-400, #33e7ff);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: 0.2px;
`
const Description = styled.div`
  display: inline;
  align-self: stretch;
  color: var(--coldgrey-200, #c6c9d2);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`

const Divider = styled.div`
  width: 448px;
  height: 1px;
  border-radius: 1px;
  background: var(--basegrey-800, #333);
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 48px;
`
const ClickButton = styled.div`
  display: inline;
  cursor: pointer;
  color: var(--primary-200, #99ffec);
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`

const CredentialContainer = styled.div`
  margin-left: 48px;
  margin-right: 64px;
  margin-top: 24px;
  display: flex;
  padding: 16px 24px 24px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-800, #2d3039);
  background: var(--coldgrey-900, #16181d);
`

const CredentialTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`

const CredentialTitleDescription = styled.div`
  color: var(--coldgrey-50, #f1f1f4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: 0.2px;
`

const CredentialDescription = styled.div`
  align-self: stretch;
  color: var(--coldgrey-100, #e2e4e9);
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`
const ModalContent = styled.div`
  width: 560px;
  height: 675px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const FlagContainer = styled.div`
  margin-top: 24px;
  margin-left: 48px;
  margin-right: 64px;
  display: flex;
  padding: 16px 24px 16px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--coldgrey-800, #2d3039);
  background: var(--coldgrey-900, #16181d);
`
const FlagSubContainerLeft = styled.div`
  width: 72px;
  height: 72px;
  transform: rotate(-90deg);
  flex-shrink: 0;
  stroke-width: 4px;
  stroke: var(--primary-200, #99ffec);
`

const FlagSubContainerLeftDescriptionUp = styled.div`
  position: absolute;
  left: 43%;
  top: 31%;
  transform: rotate(90deg);
  color: var(--primary-500, #00efc3);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 92.308% */
  letter-spacing: -1.04px;
`

const FlagSubContainerLeftDescriptionDown = styled.div`
  position: absolute;
  left: 14%;
  top: 36%;
  transform: rotate(90deg);
  color: var(--coldgrey-200, #c6c9d2);
  text-align: center;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 100% */
  letter-spacing: -0.64px;
`

const FlagSubContainerRight = styled.div`
  margin-left: 6px;
  flex: 1 0 0;
  color: var(--coldgrey-100, #e2e4e9);
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 8px;

  li {
    padding-left: 1em;
    text-indent: -1em;

    &::before {
      content: "·";
      padding-right: 10px;
      font-size: 24px;
    }
  }
`
const AntivirusImgConainter = styled.div`
  margin-top: 8px;
`

const BottomConainter = styled.div`
  display: flex;
  position: absolute;
  top: 81.8%;
  border-radius: 0 0 10px 0;
  width: 540px;
  padding: 20px 10px;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(50px);
`

const BottomTitle = styled.div`
  margin-left: 56px;
  align-self: stretch;
  color: var(--coldgrey-50, #f1f1f4);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "liga" off;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  letter-spacing: 0.16px;
`

const BottomButton = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  background: var(--primary-500, #00efc3);
  margin-left: 56px;
  margin-right: 56px;
  cursor: pointer;
  border: 2px solid var(--primary-500, #00efc3);
  &:hover {
    border-radius: 4px;
    border: 2px solid var(--primary-500, #00efc3);
    background: #0a0a0a;
    div {
      color: var(--primary-500, #00efc3);
      text-align: center;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "liga" off;
      font-family: Manrope;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 133.333% */
    }
  }
`

const ContinueButtonLabel = styled.div`
  color: var(--basegrey-950, #0d0d0d);
  text-align: center;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
`
