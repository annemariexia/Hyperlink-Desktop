export class Window {
  public static calculateFrameSize = (browserWindow): { width: number; height: number } => {
    const [windowWidth, windowHeight] = browserWindow.getSize()
    const [contentWidth, contentHeight] = browserWindow.getContentSize()
    
    return {
      width: windowWidth - contentWidth,
      height: windowHeight - contentHeight
    }
  }

  public static setInnerContentAspectRatio = (browserWindow, aspectRatio: number) => {
    try {
      const frameSize: any = Window.calculateFrameSize(browserWindow)
      const [width, height] = browserWindow.getContentSize()

      const newHeight = width / aspectRatio
      const widthPx = Math.round(width)
      const newHeightPx = Math.round(newHeight)

      if (newHeightPx === height) return

      browserWindow.setContentSize(widthPx, newHeightPx)

      const aspectRatioTotal = (width + frameSize.width) / (newHeight + frameSize.height)
      // browserWindow.setAspectRatio(aspectRatioTotal)
    } catch (error) {
      console.error("Couldn't set aspect ratio", error)
    }
  }
}
