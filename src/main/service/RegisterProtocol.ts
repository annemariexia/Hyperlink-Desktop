import { app } from "electron"

import path from "path"

// register hypervisor as default protocol
const MAIN_SCRIPT_INDEX = 2

export const registerProtocol = () => {
  if (process.defaultApp) {
    // process.argv includes the main script
    if (process.argv.length > MAIN_SCRIPT_INDEX) {
      app.setAsDefaultProtocolClient("hypervisor", process.execPath, [path.resolve(process.argv[MAIN_SCRIPT_INDEX])])
    }
  } else {
    app.setAsDefaultProtocolClient("hypervisor")
  }
}
