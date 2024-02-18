import { app, autoUpdater } from "electron"
import { spawn } from "child_process"
import path from "path"
import log from "electron-log"

export class AutoUpdater {
  private static CHECK_AUTO_UPDATE_EVERY_MS = 60 * 60 * 1000 // 1 hour
  private static AUTO_UPDATE_SERVER_URL = "http://3.95.195.9:9003"
  private static autoUpdateInterval: any

  public static setup = () => {
    log.info("auto update started...")
    const url = `${AutoUpdater.AUTO_UPDATE_SERVER_URL}/update/${process.platform}/${app.getVersion()}`

    log.info(url)
    autoUpdater.setFeedURL({ url })

    clearInterval(AutoUpdater.autoUpdateInterval)
    AutoUpdater.autoUpdateInterval = setInterval(() => {
      log.info("check auto update")
      autoUpdater.checkForUpdates()
    }, AutoUpdater.CHECK_AUTO_UPDATE_EVERY_MS)

    autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
      autoUpdater.quitAndInstall()
      app.exit()
    })
    autoUpdater.on("checking-for-update", () => {
      log.info("checking-for-update")
    })
    autoUpdater.on("update-available", () => {
      log.info("update-available")
    })
    autoUpdater.on("update-not-available", () => {
      log.info("update-not-available")
    })

    autoUpdater.on("error", (message) => {
      log.info("There was a problem updating the application")
      log.info(message)
    })

    autoUpdater.checkForUpdates()
  }

  public static launcher = (version, url) => {
    spawn("./resources/win/launcher.exe", [version, url], {
      detached: true,
      stdio: "ignore"
    }).unref()
  }
}
