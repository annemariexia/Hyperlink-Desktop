import React, { FC, ReactElement, useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { BtnLeaf } from "../elements/BtnLeaf"
import { EarningsInput } from "../elements/EarningsInput"
import { doNothing } from "../elements/EventListeners"
import { Icon } from "../elements/Icon"
import { Modal, ModalBottom, ModalTop } from "../elements/Modal"
import { ModalButton } from "../elements/modal/ModalButton"
import { ModalInput } from "../elements/modal/ModalInput"
import { ModalSelect } from "../elements/modal/ModalSelect"
import { UserDetails } from "../elements/system/ProfileManager"
import { isEmailValid } from "../types/Email"
import { ipcRenderer } from "electron"
import { shell } from "electron"
import imgPaypal from "./../../../images/icons/paypal-w.svg"
import imgVenmo from "./../../../images/icons/venmo-w.svg"
import imgBank from "./../../../images/icons/bank-w.svg"
import imgUsa from "./../../../images/icons/usa-w.svg"
import imgInternational from "./../../../images/icons/international-bank-w.svg"
import { ApiCommand, ApiMessage } from "../elements/system/System"
import { Notifications } from "../elements/Notifications"
import { PayoutType } from "../types/Payments"

enum Stage {
  Details,
  Message
}

enum PayoutOption {
  Bank,
  PayPal,
  Venmo,
  Zelle
}

enum BankOption {
  US,
  International
}

type Props = {
  profile: UserDetails
  onClose: () => void
}

enum VenmoType {
  Phone = "Phone number",
  Email = "Email",
  Username = "Venmo username"
}

enum UsAccountType {
  Checking = "Checking",
  Savings = "Savings"
}

const ENABLE_ALL_PAYOUT_METHODS = false
const DEFAULT_CASHOUT_AMOUNT_PERCENTAGE = 0.5

export const CashOutModal: FC<Props> = ({ onClose, profile }): ReactElement => {
  const [withdrawalConfirmationNumber, setWithdrawalConfirmationNumber] = useState<string>("-")
  const [paypalEmail, setPaypalEmail] = useState<string>("")
  const [venmoId, setVenmoId] = useState<string>("")
  const [venmoIdType, setVenmoIdType] = useState<VenmoType>(VenmoType.Phone)

  const [achRoutingNumber, setAchRoutingNumber] = useState<string>("")
  const [usBankAccountNumber, setUsBankAccountNumber] = useState<string>("")
  const [accountType, setAccountType] = useState<UsAccountType>(UsAccountType.Checking)

  const [iban, setIban] = useState<string>("")
  const [swiftCode, setSwiftCode] = useState<string>("")

  const [usBankRecipientName, setUsBankRecipientName] = useState<string>("")
  const [usBankRecipientCountry, setUsBankRecipientCountry] = useState<string>("United States")
  const [usBankRecipientCity, setUsBankRecipientCity] = useState<string>("")
  const [usBankRecipientAddress, setUsBankRecipientAddress] = useState<string>("")
  const [usBankRecipientPostCode, setUsBankRecipientPostCode] = useState<string>("")

  const [intBankRecipientName, setIntBankRecipientName] = useState<string>("")
  const [intBankRecipientCountry, setIntBankRecipientCountry] = useState<string>("")
  const [intBankRecipientCity, setIntBankRecipientCity] = useState<string>("")
  const [intBankRecipientAddress, setIntBankRecipientAddress] = useState<string>("")
  const [intBankRecipientPostCode, setIntBankRecipientPostCode] = useState<string>("")

  const [earnings, setEarnings] = useState<number>(Math.round((profile?.earningsUsd ?? 0) * DEFAULT_CASHOUT_AMOUNT_PERCENTAGE))
  const [stage, setStage] = useState<Stage>(Stage.Details)
  const [payoutOption, setPayoutOption] = useState<PayoutOption>(PayoutOption.PayPal)
  const [bankOption, setBankOption] = useState<BankOption | null>(BankOption.US)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(true)

  // Stages
  const selectBank = () => setPayoutOption(PayoutOption.Bank)

  // Cashout options
  const selectPayPal = () => {
    if (ENABLE_ALL_PAYOUT_METHODS) {
      setPayoutOption(PayoutOption.PayPal)
    } else {
      shell.openExternal("https://paypal.com")
    }
  }
  const selectVenmo = () => setPayoutOption(PayoutOption.Venmo)

  const isBank = payoutOption === PayoutOption.Bank
  const isPayPal = payoutOption === PayoutOption.PayPal
  const isVenmo = payoutOption === PayoutOption.Venmo

  // Bank options
  const selectUSBank = () => setBankOption(BankOption.US)
  const selectInternationalBank = () => setBankOption(BankOption.International)

  const isUSBank = isBank && bankOption === BankOption.US
  const isInternationalBank = isBank && bankOption === BankOption.International

  const cashout = () => {
    if (payoutOption === PayoutOption.PayPal) {
      ipcRenderer.send(ApiCommand.RequestPayout, {
        method: PayoutType.PayPal,
        email: paypalEmail,
        amountCents: earnings
      })
    } else if (payoutOption === PayoutOption.Venmo) {
      const options: any = {
        method: PayoutType.Venmo,
        amountCents: earnings
      }
      if (venmoIdType === VenmoType.Email) {
        options.email = venmoId
      } else if (venmoIdType === VenmoType.Phone) {
        options.phone = venmoId
      } else if (venmoIdType === VenmoType.Username) {
        options.username = venmoId
      }
      ipcRenderer.send(ApiCommand.RequestPayout, options)
    } else if (payoutOption === PayoutOption.Bank && bankOption === BankOption.International) {
      ipcRenderer.send(ApiCommand.RequestPayout, {
        method: PayoutType.BankInternational,
        amountCents: earnings,
        fullName: intBankRecipientName,
        swiftCode,
        accountNumber: iban,
        country: intBankRecipientCountry,
        city: intBankRecipientCity,
        address: intBankRecipientAddress,
        postCode: intBankRecipientPostCode
      })
    } else if (payoutOption === PayoutOption.Bank && bankOption === BankOption.US) {
      ipcRenderer.send(ApiCommand.RequestPayout, {
        method: PayoutType.BankUS,
        amountCents: earnings,
        fullName: usBankRecipientName,
        routingNumber: achRoutingNumber,
        accountNumber: usBankAccountNumber,
        accountType,
        country: usBankRecipientCountry,
        city: usBankRecipientCity,
        address: usBankRecipientAddress,
        postCode: usBankRecipientPostCode
      })
    }

    setIsLoading(true)
  }

  useEffect(() => {
    ipcRenderer.on(ApiMessage.RequestPayoutResult, (event, result) => {
      setIsLoading(false)
      setIsPaymentSuccessful(result.success)
      setWithdrawalConfirmationNumber(result.payoutId)

      if (result.success) {
        setMessage("Your payment is confirmed!")
        Notifications.showPayout(result.type, earnings)
      } else {
        setMessage(result.msg ?? "We couldn't get details of the problem.")
      }

      ipcRenderer.send(ApiCommand.UpdateStatus)
      setStage(Stage.Message)
    })

    ipcRenderer.on(ApiMessage.GetPayoutMethodsResult, (event, result) => {
      if (!result || !result.success) return

      // Load last used payout method
      if (result.lastPayoutMethod === PayoutType.PayPal) {
        setPayoutOption(PayoutOption.PayPal)
      } else if (result.lastPayoutMethod === PayoutType.Venmo) {
        setPayoutOption(PayoutOption.Venmo)
      } else if (result.lastPayoutMethod === PayoutType.Zelle) {
        setPayoutOption(PayoutOption.Zelle)
      } else if (result.lastPayoutMethod === PayoutType.BankUS) {
        setPayoutOption(PayoutOption.Bank)
        setBankOption(BankOption.US)
      } else if (result.lastPayoutMethod === PayoutType.BankInternational) {
        setPayoutOption(PayoutOption.Bank)
        setBankOption(BankOption.International)
      }

      // Load previously used payout methods
      if (!!result?.payoutMethods?.paypal) {
        setPaypalEmail(result?.payoutMethods?.paypal?.email)
      }

      if (!!result?.payoutMethods?.venmo) {
        if (!!result?.payoutMethods?.venmo?.email) {
          setVenmoIdType(VenmoType.Email)
          setVenmoId(result?.payoutMethods?.venmo?.email)
        } else if (!!result?.payoutMethods?.venmo?.phone) {
          setVenmoIdType(VenmoType.Phone)
          setVenmoId(result?.payoutMethods?.venmo?.phone)
        } else if (!!result?.payoutMethods?.venmo?.username) {
          setVenmoIdType(VenmoType.Username)
          setVenmoId(result?.payoutMethods?.venmo?.username)
        }
      }

      if (!!result?.payoutMethods?.bankInternational) {
        setIban(result?.payoutMethods?.bankInternational?.accountNumber)
        setSwiftCode(result?.payoutMethods?.bankInternational?.swiftCode)
        setIntBankRecipientName(result?.payoutMethods?.bankInternational?.fullName)
        setIntBankRecipientCountry(result?.payoutMethods?.bankInternational?.country)
        setIntBankRecipientCity(result?.payoutMethods?.bankInternational?.city)
        setIntBankRecipientAddress(result?.payoutMethods?.bankInternational?.address)
        setIntBankRecipientPostCode(result?.payoutMethods?.bankInternational?.postCode)
      }

      if (!!result?.payoutMethods?.bankUs) {
        setAchRoutingNumber(result?.payoutMethods?.bankUs?.routingNumber)
        setUsBankAccountNumber(result?.payoutMethods?.bankUs?.accountNumber)
        setAccountType(result?.payoutMethods?.bankUs?.accountType)
        setUsBankRecipientName(result?.payoutMethods?.bankUs?.fullName)
        setUsBankRecipientCountry(result?.payoutMethods?.bankUs?.country)
        setUsBankRecipientCity(result?.payoutMethods?.bankUs?.city)
        setUsBankRecipientAddress(result?.payoutMethods?.bankUs?.address)
        setUsBankRecipientPostCode(result?.payoutMethods?.bankUs?.postCode)
      }
    })

    ipcRenderer.send(ApiCommand.GetPayoutMethods)
  }, [])

  const onPaypalEmailChanged = (event) => setPaypalEmail(event?.currentTarget?.value)
  const onVenmoIdChanged = (event) => setVenmoId(event?.currentTarget?.value)
  const onVenmoIdTypeChanged = (event) => setVenmoIdType(event?.currentTarget?.value)

  const onValueChanged = (setter: (value: any) => void) => (event) => setter(event?.currentTarget?.value)

  const getVenmoPlaceholder = () => {
    if (venmoIdType === VenmoType.Email) return "Enter Venmo email"
    if (venmoIdType === VenmoType.Phone) return "Enter Venmo phone"
    return "Enter Venmo username"
  }

  let isCashoutEnabled = false
  if (isPayPal) {
    isCashoutEnabled = isEmailValid(paypalEmail)
  } else if (isVenmo) {
    if (venmoIdType === VenmoType.Email) {
      isCashoutEnabled = isEmailValid(venmoId)
    } else {
      const MIN_LENGTH = 3
      isCashoutEnabled = venmoId.length > MIN_LENGTH
    }
  } else if (isUSBank) {
    const MIN_FIELD_LENGTH = 2
    const MIN_BANK_ACCOUNT_LENGTH = 4
    const MIN_COUNTRY_LENGTH = 2
    const MIN_SWIFT_CODE_LENGTH = 4

    isCashoutEnabled =
      usBankRecipientName.length > MIN_FIELD_LENGTH &&
      achRoutingNumber.length >= MIN_SWIFT_CODE_LENGTH &&
      usBankAccountNumber.length >= MIN_BANK_ACCOUNT_LENGTH &&
      accountType.length >= MIN_BANK_ACCOUNT_LENGTH &&
      usBankRecipientCountry.length >= MIN_COUNTRY_LENGTH &&
      usBankRecipientCity.length >= MIN_FIELD_LENGTH &&
      usBankRecipientAddress.length >= MIN_FIELD_LENGTH &&
      usBankRecipientPostCode.length >= MIN_FIELD_LENGTH
  } else if (isInternationalBank) {
    const MIN_FIELD_LENGTH = 2
    const MIN_BANK_ACCOUNT_LENGTH = 4
    const MIN_COUNTRY_LENGTH = 2
    const MIN_SWIFT_CODE_LENGTH = 4

    isCashoutEnabled =
      intBankRecipientName.length > MIN_FIELD_LENGTH &&
      swiftCode.length >= MIN_SWIFT_CODE_LENGTH &&
      iban.length >= MIN_BANK_ACCOUNT_LENGTH &&
      intBankRecipientCountry.length >= MIN_COUNTRY_LENGTH &&
      intBankRecipientCity.length >= MIN_FIELD_LENGTH &&
      intBankRecipientAddress.length >= MIN_FIELD_LENGTH &&
      intBankRecipientPostCode.length >= MIN_FIELD_LENGTH
  }

  if (earnings <= 0) isCashoutEnabled = false

  const getPaymentMethodIcon = () => {
    if (isPayPal) return imgPaypal
    if (isVenmo) return imgVenmo
    return imgBank
  }

  const getOnPaymentMethodBtnClick = () => () => {
    if (isPayPal) {
      shell.openExternal("https://paypal.com")
    }
  }

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
  };
  const venmoPlaceholder = getVenmoPlaceholder()

  const enableSubmitButton = isCashoutEnabled && !isLoading

  return (
    <Modal>
      {stage === Stage.Details && (
        <>
          <ModalTop>
            <Row>
              <EarningsInput value={earnings} onValueChanged={setEarnings} earningsUsd={profile?.earningsUsd ?? 0} />
            </Row>
            <Row gap="24px">
              {ENABLE_ALL_PAYOUT_METHODS && (
                <TabButton selected={isBank} onClick={selectBank}>
                  <Icon iconUrl={imgBank} height={35} />
                </TabButton>
              )}
              <TabButton selected={isPayPal} onClick={selectPayPal}>
                <Icon iconUrl={imgPaypal} height={22} />
              </TabButton>
              {ENABLE_ALL_PAYOUT_METHODS && (
                <TabButton selected={isVenmo} onClick={selectVenmo}>
                  <Icon iconUrl={imgVenmo} height={14} />
                </TabButton>
              )}
            </Row>
            {isPayPal && (
              <Column>
                <ModalInput autoFocus label="Enter PayPal email" type="text" placeholder="Email" value={paypalEmail} onInput={onPaypalEmailChanged} />
              </Column>
            )}
            {isVenmo && (
              <Column>
                <ModalSelect options={[VenmoType.Phone, VenmoType.Email, VenmoType.Username]} value={venmoIdType} onChange={onVenmoIdTypeChanged} />
                <ModalInput autoFocus type="id" placeholder={venmoPlaceholder} value={venmoId} onInput={onVenmoIdChanged} />
              </Column>
            )}
            {isBank && (
              <>
                <Row gap="24px">
                  <TabButton selected={isUSBank} height="150px" onClick={selectUSBank}>
                    <Icon iconUrl={imgUsa} height={47} />
                  </TabButton>
                  <TabButton selected={isInternationalBank} height="150px" onClick={selectInternationalBank}>
                    <Icon iconUrl={imgInternational} height={70} />
                  </TabButton>
                </Row>
                {isUSBank && (
                  <Column>
                    <ModalInput label="Recipient Name" type="text" placeholder="Recipient Name" value={usBankRecipientName} onInput={onValueChanged(setUsBankRecipientName)} />
                    <ModalInput label="ACH routing number" type="number" placeholder="ACH routing number" value={achRoutingNumber} onInput={onValueChanged(setAchRoutingNumber)} />
                    <ModalInput label="Account number" type="number" placeholder="Account number" value={usBankAccountNumber} onInput={onValueChanged(setUsBankAccountNumber)} />
                    <ModalSelect label="Account type" options={[UsAccountType.Checking, UsAccountType.Savings]} value={accountType} onChange={onValueChanged(setAccountType)} />
                    <br />
                    <InfoLabel>Recipient address</InfoLabel>
                    <ModalInput label="Country" type="text" placeholder="Country" value={usBankRecipientCountry} onInput={onValueChanged(setUsBankRecipientCountry)} />
                    <ModalInput label="City" type="text" placeholder="City" value={usBankRecipientCity} onInput={onValueChanged(setUsBankRecipientCity)} />
                    <ModalInput label="Address" type="text" placeholder="Address" value={usBankRecipientAddress} onInput={onValueChanged(setUsBankRecipientAddress)} />
                    <ModalInput label="Post Code" type="text" placeholder="Post Code" value={usBankRecipientPostCode} onInput={onValueChanged(setUsBankRecipientPostCode)} />
                  </Column>
                )}
                {isInternationalBank && (
                  <Column>
                    <ModalInput label="Recipient Name" type="text" placeholder="Recipient Name" value={intBankRecipientName} onInput={onValueChanged(setIntBankRecipientName)} />
                    <ModalInput label="SWIFT / BIC code" type="text" placeholder="SWIFT / BIC code" value={swiftCode} onInput={onValueChanged(setSwiftCode)} />
                    <ModalInput label="IBAN / Account Number" type="text" placeholder="IBAN / Account Number" value={iban} onInput={onValueChanged(setIban)} />
                    <br />
                    <InfoLabel>Recipient address</InfoLabel>
                    <ModalInput label="Country" type="text" placeholder="Country" value={intBankRecipientCountry} onInput={onValueChanged(setIntBankRecipientCountry)} />
                    <ModalInput label="City" type="text" placeholder="City" value={intBankRecipientCity} onInput={onValueChanged(setIntBankRecipientCity)} />
                    <ModalInput label="Address" type="text" placeholder="Address" value={intBankRecipientAddress} onInput={onValueChanged(setIntBankRecipientAddress)} />
                    <ModalInput label="Post Code" type="text" placeholder="Post Code" value={intBankRecipientPostCode} onInput={onValueChanged(setIntBankRecipientPostCode)} />
                  </Column>
                )}
              </>
            )}
          </ModalTop>
          <ModalBottom>
            {(isPayPal || isVenmo || bankOption !== undefined) && (
              <SubmitButton isWhite disabled={!enableSubmitButton} onClick={enableSubmitButton ? cashout : doNothing} iconText="❯❯">
                {isLoading ? "Loading..." : "Payout"}
              </SubmitButton>
            )}
          </ModalBottom>
        </>
      )}
      {stage === Stage.Message && (
        <>
          {isPaymentSuccessful && (
            <ModalTop>
              <Row>
                <EarningsInput value={earnings} notEditable earningsUsd={profile?.earningsUsd ?? 0} />
              </Row>
              <Row gap="24px">
                <InfoButton onClick={getOnPaymentMethodBtnClick()}>
                  <Icon iconUrl={getPaymentMethodIcon()} height={35} />
                </InfoButton>
              </Row>
              <Column>
                <InfoLabel>{message}</InfoLabel>
                <PayoutInfo>
                  <span onClick={copyToClipboard}>{withdrawalConfirmationNumber}</span>
                </PayoutInfo>
              </Column>
            </ModalTop>
          )}
          {!isPaymentSuccessful && (
            <ModalTop>
              <Row>
                <h2>There was a problem with your payout request</h2>
              </Row>
              <Row>
                <InfoLabel>{message}</InfoLabel>
              </Row>
            </ModalTop>
          )}
          <ModalBottom>
            <SubmitButton isWhite disabled={!isCashoutEnabled} onClick={onClose} iconText="❯❯">
              {isPaymentSuccessful ? "Thanks!" : "Close"}
            </SubmitButton>
          </ModalBottom>
        </>
      )}
    </Modal>
  )
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const Row = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  ${({ gap }) => !!gap && `gap: ${gap};`}
`

const InfoLabel = styled.div`
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  font-size: 20px;
  margin: 7px 0 20px 0;
  color: #ffffff;
  opacity: 1;
`

const PayoutInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 90px;
  border-radius: 45px;
  flex: 1 1 90px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: rgb(255 255 255 / 70%);
  font-family: Alliance-Mono, Alliance-No2-Regular, Helvetica, sans-serif;
  font-size: 20px;
  padding: 0 32px;
  background: rgb(0 0 0 / 7%);
  backdrop-filter: blur(25px) contrast(-25%);
`

const PayoutInfoBtns = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  zoom: 0.83;
`

const TabButton = styled.button<{ selected?: boolean; height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => (!!height ? height : "90px")};
  border-radius: 45px;
  flex: 1 1;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  padding: 0 5px;
  background: ${({ selected }) => (!!selected ? "rgb(255 255 255 / 25%)" : "rgb(0 0 0 / 7%)")};
  cursor: pointer;
  backdrop-filter: blur(25px) contrast(-25%);
  transition: background 200ms ease-in;

  &:hover {
    background: ${({ selected }) => (!!selected ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 10%)")};
  }
`

const InfoButton = styled.button<{ selected?: boolean; height?: string; background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => (!!height ? height : "90px")};
  border-radius: 45px;
  flex: 1 1;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  padding: 0 5px;
  background: rgb(0 0 0 / 15%);
  backdrop-filter: blur(25px) contrast(-25%);
  transition: background 200ms ease-in;
  cursor: ${({ onClick }) => (!!onClick ? "pointer" : "default")};
`

const SubmitButton = styled(ModalButton)``

const Video = styled.video`
  height: 100%;
  object-fit: contain;
  user-drag: none;
  user-select: none;
  z-index: -1;
`
