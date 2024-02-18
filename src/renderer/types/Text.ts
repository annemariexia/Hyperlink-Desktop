export class Text {
  public static generateRandom = (randomTextLength = 12): string => {
    let text = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    randomTextLength = Math.max(randomTextLength, 1)

    for (let i = 0; i < randomTextLength; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  public static isDefined = (value: string): boolean => !!value && value.length > 0
}
