export class RendererConsole {
  private static mainWindow: any

  public static setMainWindow = (mainWindow: any) => {
    RendererConsole.mainWindow = mainWindow
  }

  public static log = (text: string, data?: any) => {
    RendererConsole?.mainWindow?.webContents?.send("ConsoleLog", {
      text,
      data
    })
  }
}
