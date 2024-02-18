/*eslint import/no-unresolved: 2*/
import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react"
import { Form } from "../../styles/Earnings"
import { TransferAddPayoutMethod } from "./TransferAddPayoutMethod"
import { TransferInfoPanel } from "./TransferInfoPanel"
import { TransferConfirmPanel } from "./TransferConfirmPanel"
import { TransferMainPanel } from "./TransferMain"

type Props = {
  openTransferScreen?: Dispatch<SetStateAction<string>>
  profile: any
  closeModal: () => void
  openChatDrawer()
  setActiveMenu(menu: string)
  setProfile
}

const screenStep = {
  transfer: "transfer",
  addPayoutMethod: "addPayoutMethod",
  confirmTransfer: "confirmTransfer",
  confirmation: "confirmation"
}

export const Transfer: FC<Props> = ({ openTransferScreen, profile, closeModal, openChatDrawer, setActiveMenu, setProfile }): ReactElement => {
  
  const [step, setStep] = useState(screenStep.transfer)
  const [payoutResult, setPayoutResult] = useState(null)
  const [transinfo, setTransferInfo] = useState({
    to: profile ? profile.payoutEmail : "",
    amount: 0,
    from: profile ? profile.earningsUsd : 0,
    confirmed: false
  })

  const setPaymentEmail = (email) => {
    setTransferInfo({ ...transinfo, to: email })
    setProfile({ ...profile, payoutEmail: email})
  }

  const goAddPayoutMethod = () => {
    setStep(screenStep.addPayoutMethod)
  }

  const goConfirmTransfer = () => {
    if (transinfo.to != "" && transinfo.amount > 0) {
      setStep(screenStep.confirmTransfer)
    }
  }

  const goConfirmResult = (bConfirmed, payid) => {
    const result = {
      confirmed: false,
      to: transinfo.to,
      amount: transinfo.amount,
      payoutId: ""
    }

    if (bConfirmed) {
      result.payoutId = payid
      result.confirmed = true
    }
    setPayoutResult(result)
    setStep(screenStep.confirmation)
  }

  const goHome = () => {
    setStep(screenStep.transfer)
  }

  const goHistory = () => {
    setActiveMenu("history")
  }

  return (
    <Form>
      {step === screenStep.transfer && (
        <TransferMainPanel goAddPayout={goAddPayoutMethod} goTransferConfirm={goConfirmTransfer} setTransferInfo={setTransferInfo} transinfo={transinfo} closeModal={closeModal} />
      )}
      {step === screenStep.addPayoutMethod && <TransferAddPayoutMethod goHome={goHome} setPayoutEmail={setPaymentEmail} transInfo={transinfo} closeModal={closeModal}/>}
      {step === screenStep.confirmTransfer && <TransferInfoPanel goHome={goHome} goConfirm={goConfirmResult} transinfo={transinfo} closeModal={closeModal} />}
      {step === screenStep.confirmation && <TransferConfirmPanel goHome={goHome} payoutResult={payoutResult} closeModal={closeModal} openChatDrawer={openChatDrawer} goHistory={goHistory} />}
    </Form>
  )
}
