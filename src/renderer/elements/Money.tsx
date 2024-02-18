export const NUMBER_FORMAT = "en-US"

export class Money {
  private static TWO_DECIMAL_PLACES = 100

  // Cents needs to be stored as an integer in order to make numerical operations safely
  public static toCents = (dollars: number) => Math.round(dollars * Money.TWO_DECIMAL_PLACES)

  public static toDollars = (cents: number) => cents / Money.TWO_DECIMAL_PLACES

  public static formatCents = (cents: number): string => {
    return Money.formatDollars(Money.toDollars(cents))
  }

  public static formatDollars = (dollars: number): string => {
    return Number(dollars.toFixed(2)).toLocaleString(NUMBER_FORMAT, {
      style: "currency",
      currency: "USD"
    })
  }

  public static roundDollars = (dollars: number) => Math.round(dollars * Money.TWO_DECIMAL_PLACES) / Money.TWO_DECIMAL_PLACES
}
