import { runScriptAsync } from "../RunScript"
import { app } from 'electron';
import { exec as execCb } from 'child_process';
import { promisify } from 'util';
export class GpuInfo {
  public static getName = async (): Promise<string> => {
    const isMac = process.platform === "darwin"
    const isWindows = process.platform === "win32"
    const isLinux = process.platform === "linux"
    let output = "-"
    if (isWindows) {
      // Windows:
      const outputText = await runScriptAsync(`wmic path win32_VideoController get name`)
      const outputData = outputText.split("\n")
      output = ""

      for (const line of outputData) {
        if (!line || line.trim().length === 0 || line.trim() === "Name") continue
        output += line + "\n"
      }
    }
    if (isMac) {
      // Mac OS:
      const outputText = await runScriptAsync(`system_profiler SPDisplaysDataType`)
      const outputData = outputText.split("\n")
      const GPU_NAME_OFFSET = 4
      output = ""

      for (const line of outputData) {
        const offset = line.search(/\S/)
        if (offset === GPU_NAME_OFFSET) {
          output += line.substring(0, line.length - 1) + "\n"
        }
      }
    }
    if (isLinux) {
      // Linux:
      output = await runScriptAsync(`sudo lshw -C display`)
    }
    return output
  }

  // get the GPU Vram information
  public static getVram = async (): Promise<string> => {  
    const exec = promisify(execCb)
    const isMac = process.platform === "darwin"
    const isWindows = process.platform === "win32"
    const isLinux = process.platform === "linux"
    var output = "0"
    if (isWindows) {
    
      const command = 'powershell.exe -File ./src/main/system/win-vram-info.ps1';
      try {
        const { stdout } = await exec(command);
        output = stdout.trim();
      } catch (error) {
        console.error(`exec error: ${error}`);
      }
    }

    if (isLinux) {
      // Attempt to get VRAM for Nvidia GPUs
      try {
        const outputText = await runScriptAsync(`nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits`)
        output = outputText.trim();
      } catch (e) {
        // If nvidia-smi is not available, default to 0
        output = "0"
      }
    }

    if (isMac) {
     
      output = "0"
    }
    return output
  }
}
