import os from "os"
import Store from "electron-store"
import * as packageInfo from "./../../../package.json"
import { ProcessCommander } from "../commands/ProcessCommander"

export class SystemInfo {
  private static KEY_MAC_ADDRESS = "macAddress"
  private static DEFAULT_MAC_ADDRESS = "00:00:00:00:00:00"
  private static BYTES_TO_GB = 1024 * 1024 * 1024

  public static getPlatformName = () => {
    if (process.platform === "darwin") return "Mac"
    if (process.platform === "win32") return "Windows"
    if (process.platform === "linux") return "Linux"
    return "Unknown OS"
  }

  public static getMacAddress = (): string => {
    const store = new Store()
    let macAddress: any = store.get(SystemInfo.KEY_MAC_ADDRESS)

    if (!macAddress) {
      macAddress = SystemInfo.fetchMacAddress()
      store.set(SystemInfo.KEY_MAC_ADDRESS, macAddress)
    }

    return macAddress
  }

  private static fetchMacAddress = (): string => {
    const networkInterfaces = os.networkInterfaces()

    // By default try getting main MAC address
    const mainMacAddress = networkInterfaces?.["Wi-Fi"]?.[0]?.["mac"]
    if (!!mainMacAddress && mainMacAddress.trim().length > 0 && mainMacAddress !== SystemInfo.DEFAULT_MAC_ADDRESS) {
      return mainMacAddress
    }

    // Find first valid MAC address
    for (const interfaceName in networkInterfaces) {
      const netDataEntires = networkInterfaces[interfaceName]
      if (!!netDataEntires && Array.isArray(netDataEntires)) {
        for (const netData of netDataEntires) {
          const macAddress = netData["mac"]
          if (!!macAddress && macAddress !== SystemInfo.DEFAULT_MAC_ADDRESS) return macAddress
        }
      }
    }
    return SystemInfo.DEFAULT_MAC_ADDRESS
  }

  public static getCpu = () => {
    const cpus = os.cpus()
    if (!cpus || cpus.length === 0) return "-"
    const mainCpu = cpus[0]
    const model = mainCpu["model"] ?? "-"
    const cores = cpus.length === 1 ? "single core" : `${cpus.length} cores`
    return `${model}, ${cores}`
  }
  
  public static getDeviceInfo = async (processCommander: ProcessCommander, gpuType: string, gpuVram?:string) => {
    const deviceName = os.hostname()
    const ramGb = Math.round(os.totalmem() / SystemInfo.BYTES_TO_GB)
    const deviceDetails = `Ver. ${packageInfo?.version}, CPUs: ${SystemInfo.getCpu()}, RAM: ${ramGb}Gb, GPU ${gpuType}, GPUVram: ${gpuVram}`
    const status = await processCommander.getStatus()
    const isGpuRunning = status.isGpuRunning
    const isCpuRunning = status.isCpuRunning
    return { deviceName, ramGb, deviceDetails, isGpuRunning, isCpuRunning }
  }
}
