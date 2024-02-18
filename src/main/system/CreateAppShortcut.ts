import path from "path"
import createDesktopShortcut from "create-desktop-shortcuts"
import { spawn } from "child_process"
import { app } from "electron"
import fs from "fs"

export class CreateAppShortcut {
  private static runCmd = (command, args) => {
    let spawnedProcess

    try {
      spawnedProcess = spawn(command, args, { detached: true })
    } catch (error) {
      console.warn(error)
    }

    return spawnedProcess
  }

  private static runUpdate = (args) => {
    const appFolder = path.resolve(process.execPath, "..")
    const rootAtomFolder = path.resolve(appFolder, "..")
    const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"))

    return CreateAppShortcut.runCmd(updateDotExe, args)
  }

  public static run = (): boolean => {
    if (process.argv.length === 1) {
      return false
    }

    const exeName = path.basename(process.execPath)

    const squirrelEvent = process.argv[1]
    switch (squirrelEvent) {
      case "--squirrel-firstrun":
      case "--squirrel-install":
      case "--squirrel-updated":
        // Optionally do things such as:
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        //   explorer context menus

        // Remove default Squirrel shortcut
        CreateAppShortcut.runUpdate(["--removeShortcut", exeName])

        const appPath = app.getPath("exe")

        // Create desktop shortcut
        createDesktopShortcut({
          windows: { filePath: appPath }
        })

        // Create start menu shortcut
        createDesktopShortcut({
          windows: { filePath: appPath, outputPath: `%AppData%\\Microsoft\\Windows\\Start Menu\\Programs` }
        })

        break

      case "--squirrel-uninstall":
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers

        // Remove desktop and start menu shortcuts
        CreateAppShortcut.runUpdate(["--removeShortcut", exeName])

        const desktopLink = `%UserProfile%\\Desktop\\Hypervisor.lnk`
        const startMenuLink = `%AppData%\\Microsoft\\Windows\\Start Menu\\Programs\\Hypervisor.lnk`
        if (fs.existsSync(desktopLink)) {
          fs.unlinkSync(desktopLink)
        }
        if (fs.existsSync(startMenuLink)) {
          fs.unlinkSync(startMenuLink)
        }

        break

      case "--squirrel-obsolete":
        // This is called on the outgoing version of your app before
        // we update to the new version - it's the opposite of
        // --squirrel-updated
        break
    }

    return true
  }
}
