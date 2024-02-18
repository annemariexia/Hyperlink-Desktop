export const genRandom = (min: number, max: number) => {
  let result = Math.random() * (max - min) + min
  result *= Math.round(Math.random()) ? 1 : -1 // Make it positive or negative
  return result
}
