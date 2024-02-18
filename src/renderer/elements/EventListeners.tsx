export const stopEventPropagation = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

export const doNothing = () => {}
