import { app } from "electron"
import AutoLaunch from "auto-launch"
import WinRegistry from "winreg"

export class AutoStart {
  public static enable = async () => {
    const autoStart = new AutoStart()
    await autoStart.enable()
    await autoStart.removeAutoStartDuplicates()
  }

  constructor() {}

  private enable = async () => {
    const autoLaunch = new AutoLaunch({
      name: "Hypervisor",
      path: app.getPath("exe"),
      isHidden: true
    })

    const isEnabled = await autoLaunch.isEnabled()
    if (!isEnabled) await autoLaunch.enable()
  }

  public removeAutoStartDuplicates = async () => {
    const registryKey = new WinRegistry({
      hive: WinRegistry.HKCU, // HKEY_CURRENT_USER
      key: "\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" // Path to the registry key
    })

    const autostartKeys: string[] = await new Promise((resolve, reject) => {
      const result = []
      registryKey.values(function (error, items) {
        if (error) {
          console.error("Couldn't get autostart registry entries: " + error)
        } else {
          for (var i = 0; i < items.length; i++) {
            const name = items[i].name
            if (name.indexOf("Hypervisor") >= 0) {
              result.push(name)
            }
          }
        }
        resolve(result)
      })
    })

    const MAX_AUTOSTART_KEYS = 1
    if (autostartKeys.length > MAX_AUTOSTART_KEYS) {
      for (let i = MAX_AUTOSTART_KEYS; i < autostartKeys.length; i++) {
        // Remove duplicated autostart key
        await new Promise((resolve, reject) => {
          registryKey.remove(autostartKeys[i], (error) => {
            if (error) {
              console.error("Couldn't remove duplicated autostart registry entry: " + error)
            }
            resolve(!error)
          })
        })
      }
    }
  }
}
