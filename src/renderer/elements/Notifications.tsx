import { formatMoney } from "./TextMoney"
import imgBankIcon from "./../../../images/banks/bank-icon.png"
import imgPaypal from "./../../../images/banks/paypal.png"
import imgVenmo from "./../../../images/banks/venmo.png"
import { PayoutType } from "../types/Payments"

export class Notifications {
  public static showPayout = (type: PayoutType, amount: number) => {
    // US payout
    let title = "Payment requested"
    let content = `We will pay you $${formatMoney(amount, undefined)}`
    let icon = imgBankIcon

    if (type === PayoutType.BankInternational) {
      title = "Wire transfer"
      icon = imgBankIcon
    } else if (type === PayoutType.PayPal) {
      title = "PayPal"
      icon = imgPaypal
    } else if (type === PayoutType.Venmo) {
      title = "Venmo"
      icon = imgVenmo
    }

    new Notification(title, { body: content, icon })
  }
}
