import { ApiCommand } from "./System"
import { ipcRenderer } from "electron"

export class RendererServerConsole {
  public static log = (log: string, data?: any) => {
    ipcRenderer.send(ApiCommand.LogToServer, { log, data })
  }
}
