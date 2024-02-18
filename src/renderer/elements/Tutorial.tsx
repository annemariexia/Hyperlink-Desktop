import React, { useState } from "react"
import styled from "styled-components"
import { useEffect } from "react"
import { PotentialPanel } from "./panels/PotentialPanel"
// import { LiveBalancePanel } from "./panels/LiveBalancePanel"
import { DeviceDetails } from "./system/ProfileManager"
// import { AccountContainer } from "../styles/PageMain"
import { BoostEarningsPanel } from "../elements/panels/BoostEarnings"
import { StatsPanel } from "../elements/panels/StatsPanel"
import { InfoIconPanel } from "./panels/InfoIcon"
import { UptimePanel } from "./panels/UpTimePanel"

import { SignupButtonPanel } from "../elements/panels/SignupButtonPanel"
import { SettingPanel } from "../elements/panels/settingPanel"
import { UserIconPanel } from "../elements/panels/userIconPanel"
import { UserDetails } from "../elements/system/ProfileManager"
import { BottomPanel } from "../styles/PageMain"
import { LiveBalancePanel } from "../elements/panels/LiveBalancePanel"

interface TutorialCardProps {
  title: string
  banner: string
  description: string
  skipButtonText: string
  closeButtonText: string
  bottom: string
  left: string
  skipLogic?: () => void
  closeLogic?: () => void
}
const TutorialCardContainer = styled.div<TutorialCardProps>`
  position: absolute;
  width: 326px;
  height: 184px;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0px 10px 150px rgba(0, 0, 0, 0.08);
  bottom: 321px;
  backdrop-filter: blur(25px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
`
const Title = styled.p`
  position: absolute;
  width: 244px;
  height: 4px;
  bottom: 144px;
  left: 10%;
  color: #000;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  font-feature-settings: "tnum" on, "lnum" on;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: flex-start; /* Update justify-content */
  align-items: flex-start; /* Update align-items */
`

const Description = styled.p`
  position: absolute;
  width: 244px;
  height: 35px;
  bottom: 54px;
  left: 10%;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  text-align: left;
`

const Banner = styled.p`
  position: absolute;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  width: 211px;
  height: 15px;
  font-size: 32px;
  line-height: 41px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #000000;
  left: 10%;
  bottom: 98px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: flex-start; /* Update justify-content */
  align-items: flex-start; /* Update align-items */
`
const SkipButton = styled.button`
  position: absolute;
  width: 122px;
  height: 32px;
  bottom: 12px;
  right: 22px;
  background: #000000;
  border-radius: 100px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;

  &:hover {
    background-color: #00efc3;
    color: white;
    border-color: transparent;
    cursor: pointer;
  }
`
const CloseButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  background-color: transparent;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  top: 74%;
  left: 4%;
  position: absolute;
  text-decoration: underline;
`
const TopPanel = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(25px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0; /* Initial transparency is 0 */
  animation: fadeIn 0.5s ease-in forwards; /* Using the fadeIn animation effect */

  @keyframes fadeIn {
    from {
      opacity: 0; /* Full transparency at the beginning of the animation */
    }
    to {
      opacity: 1; /* Completely opaque at the end of the animation */
    }
  }
`

const FadeInContainer = styled.div`
  opacity: 0;
  animation: fadeIn 0.2s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const FadeOutContainer = styled.div`
  opacity: 1;
  animation: fadeOut 0.2s ease-out forwards;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

const AccountContainer = styled.div`
  position: absolute;
  top: 4.3%;
  height: 48px;
  display: flex;
  float: right;
  right: 3.3%;
`

const Bottom = styled.div`
  position: absolute;
  top: 0%;
  height: 48px;
  display: flex;
  float: right;
  right: -8.6%;
`

//fade-in & fade-out effect for tutorial cards
const TutorialCard: React.FC<TutorialCardProps> = ({ title, description, banner, bottom, left, skipButtonText, closeButtonText, skipLogic, closeLogic }) => {
  const [isFadeOut, setIsFadeOut] = useState(false)

  const handleFadeOut = () => {
    setIsFadeOut(true)
    setTimeout(() => {
      setIsFadeOut(false)
      skipLogic()
    }, 300)
  }

  const handleClose = () => {
    setIsFadeOut(true)
    setTimeout(() => {
      closeLogic()
    }, 200)
  }

  if (isFadeOut) {
    return (
      <FadeOutContainer>
        <TutorialCardContainer bottom={bottom} left={left} title={title} banner={banner} description={description} skipButtonText={skipButtonText} closeButtonText={closeButtonText}>
          <Title>{title}</Title>
          <Banner>{banner}</Banner>
          <Description>{description}</Description>
          <SkipButton onClick={skipLogic}>{skipButtonText}</SkipButton>
          <CloseButton onClick={closeLogic}>{closeButtonText}</CloseButton>
        </TutorialCardContainer>
      </FadeOutContainer>
    )
  }

  return (
    <FadeInContainer>
      <TutorialCardContainer bottom={bottom} left={left} title={title} banner={banner} description={description} skipButtonText={skipButtonText} closeButtonText={closeButtonText}>
        <Title>{title}</Title>
        <Banner>{banner}</Banner>
        <Description>{description}</Description>
        <SkipButton onClick={handleFadeOut}>{skipButtonText}</SkipButton>
        <CloseButton onClick={handleClose}>{closeButtonText}</CloseButton>
      </TutorialCardContainer>
    </FadeInContainer>
  )
}

const App: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showStartEarning, setShowStartEarning] = useState(true)
  const [isIntropComplete, setIsIntroComplete] = useState(false)
  const [tutorialShown, setTutorialShown] = useState(false)

  const [devices, setDevices] = useState<DeviceDetails[]>([])
  const [profile, setProfile] = useState<UserDetails | null>(null)
  const [scale, setScale] = useState<number>(1)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [isPopupOpen, setIsPopupOpen] = useState("")

  //series of tutorialCards, contant and style
  const tutorialCards: TutorialCardProps[] = [
    {
      title: "Enjoy earning",
      description: "Possible for the first time ever now: Hyperlink helps you earn money passively with computers anywhere, anytime.",
      banner: "Rewardingly.",
      bottom: "32%",
      left: "48px",
      skipButtonText: "Amazing >",
      closeButtonText: "skip tutorial"
    },
    {
      title: "Detect potential",
      description: "Calculate your earnings potential combined for all your devices. See how much it is worth per year, per month, and over its lifetime.",
      banner: "Resourcefully.",
      bottom: "26%",
      left: "48px",
      skipButtonText: "Awesome >",
      closeButtonText: "skip tutorial"
    },
    {
      title: "Multiple earnings",
      description: "Supercharge your earnings by connecting more devices, inviting friends, posting links and maximizing your uptime.",
      banner: "Infinitely.",
      bottom: "26%",
      left: "26.5%",
      skipButtonText: "Fantastic >",
      closeButtonText: "skip tutorial"
    },
    {
      title: "Personalize features",
      description: "We are dedicated to serving you an amazing experience. Let us know your suggestions for improving the app.",
      banner: "Desireably.",
      bottom: "65%",
      left: "65%",
      skipButtonText: "Excellent >",
      closeButtonText: "skip tutorial"
    },
    {
      title: "Track earnings",
      description: "Easily see your earnings for every device, anywhere, remotely, continuously 24/7. Keep them online to maximize your earnings!",
      banner: "Conveniently.",
      bottom: "26%",
      left: "70%",
      skipButtonText: "Wonderful >",
      closeButtonText: "skip tutorial"
    },
    {
      title: "Stay online",
      description: "To earn passively and max earnings, simply keep your systems online. You can even close the app and use your PC as normal.",
      banner: "Autonomously.",
      bottom: "20%",
      left: "70%",
      skipButtonText: "Thanks >",
      closeButtonText: "skip tutorial"
    }
  ]

  const onOpenProfile = async () => { }

  const goToNextPage = () => {
    if (currentCardIndex < tutorialCards.length - 1) {
      setCurrentCardIndex((prevPage) => prevPage + 1)
    } else {
      setShowTutorial(false) // Set showTutorial to false instead of setIsIntroComplete(true)
    }
  }

  // add five seconds autonomously change the tutorial Cards
  useEffect(() => {
    //add useEffect to show the tutorial right now after signup
    if (currentCardIndex === 0 && !tutorialShown) {
      setShowTutorial(true)
      setTutorialShown(true)
    }
    //set default intervals between different cards with 8s
    const timer = setInterval(() => {
      goToNextPage()
    }, 8000)

    //reset the timer if click the skip button
    if (currentCardIndex !== 0) {
      clearInterval(timer)
      const newTimer = setTimeout(goToNextPage, 8000)
      return () => clearTimeout(newTimer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [currentCardIndex, goToNextPage])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(true)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  //click button, close tutorial
  const handleCloseTutorial = () => {
    setShowTutorial(false)
    setCurrentCardIndex(currentCardIndex + 6)
  }
  const currentCard = tutorialCards[currentCardIndex]

  return (
    <div>
      {showTutorial && (
        <>
          {currentCard && (
            <>
              <Overlay>
                <TopPanel>{currentCardIndex === 0 && <LiveBalancePanel isEnableAllButtons={true} openTransferScreen={() => { }} profile={profile} devices={devices} scale={scale} isProcessRunning={isRunning} />}</TopPanel>
                {currentCardIndex === 1 && <PotentialPanel devices={devices} setIsEnableAllButtons={() => { }} />}
                {currentCardIndex === 2 && <BoostEarningsPanel isEnableAllButtons={true} />}
                {currentCardIndex === 3 && (
                  <AccountContainer>
                    <SignupButtonPanel onClick={onOpenProfile} />
                    <InfoIconPanel onClick={() => { }} />
                    <UserIconPanel profile={profile} />
                  </AccountContainer>
                )}
                {currentCardIndex === 4 && (
                  <StatsPanel isEnableAllButtons={true} isRunning={isRunning} devices={devices} setIsPopupOpen={setIsPopupOpen} progressPercent={0} />
                )}
                {currentCardIndex === 5 && <UptimePanel isRunning={isRunning} devices={devices} progressPercent={0} />}
                <TutorialCard
                  title={currentCard.title}
                  banner={currentCard.banner}
                  description={currentCard.description}
                  bottom={tutorialCards[currentCardIndex].bottom}
                  left={tutorialCards[currentCardIndex].left}
                  skipButtonText={tutorialCards[currentCardIndex].skipButtonText}
                  closeButtonText={tutorialCards[currentCardIndex].closeButtonText}
                  skipLogic={goToNextPage}
                  closeLogic={handleCloseTutorial}
                />
                {/* <SkipButton onClick={handleSkip}>{currentCard.skipButtonText}</SkipButton> */}
              </Overlay>
            </>
          )}
          {!currentCard && null}
        </>
      )}
    </div>
  )
}
export default App
