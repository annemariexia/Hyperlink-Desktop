import { DataType, runScript } from "../RunScript"
import { ProcessStatus, SystemCommands } from "./ProcessCommander"
import kill from "tree-kill"
import os from "os"
import { ExecutableError } from "google-auth-library/build/src/auth/pluggable-auth-client"
import { setEmitFlags } from "typescript"

export class MacCommands implements SystemCommands {
  private static XMR_ADDRESS = "4BETwgau3rMSL34LoPytCpZUxiiHc2P55FY1eJRkZHa7HBbJpfAi7sWSByERH8NNw3ELoroKFabS4gx25YkpZrGU1hzsF1U"
  private static RVN_ADDRESS = "RL86Z5PyWRHtBFDS8BQcfYeE5iq8MFdsXU"
  private static pool_ADDRESS = "xmr.2miners.com:2222"

  private static MAX_CPU_PRC_PROD = 50
  private static MAX_CPU_PRC_DEV = 40

  private isProd = false
  private isGpuRunning = false
  private isCpuRunning = false

  private gpuStatus = ""
  private cpuStatus = ""

  private gpuProcess: any = null
  private cpuProcess: any = null
  
  private chipType: string = "unknown"

  private onGpuLog: (content: string, isError: boolean) => void
  private onCpuLog: (content: string, isError: boolean) => void

  constructor(isProd: boolean, onGpuLog: (content: string, isError: boolean) => void, onCpuLog: (content: string, isError: boolean) => void) {
    this.isProd = isProd
    this.onGpuLog = onGpuLog
    this.onCpuLog = onCpuLog
  }

  private onProcessStatusChangedListener: (status: ProcessStatus) => void

  public getPlatformName = (): string => "darwin"

  public getSystemUserName = () => { os.userInfo().username }

  private checkChipType = async(): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      runScript('uname -m',
        [],
        (data: string, type: DataType) => {
            this.chipType = data.includes('x86_64') ? 'Intel':'M1'
            resolve()
        },
        (error) => {
          reject(error)
        }
      )
    })
    
  }

  public start = async (minerId: string, appVersion: string): Promise<ProcessStatus> => {
    /*
      Mac with M1 chip and Intel chip use different executable files.
      So determining the chip type is necessary before running the .exec file.
    */
    await this.checkChipType()

    const maxCpuPrc = this.isProd ? MacCommands.MAX_CPU_PRC_PROD : MacCommands.MAX_CPU_PRC_DEV

    const miningCommand = this.chipType == 'Intel' 
        ? `cd resources/win && ./cpulimit/cpulimit -l ${maxCpuPrc} ./xmrigMacIntelChip/xmrig -o ${MacCommands.pool_ADDRESS} -u ${MacCommands.XMR_ADDRESS}.${minerId} -p x`
        : `cd resources/win/xmrigMacM1Chip && ./xmrig -o ${MacCommands.pool_ADDRESS} -u ${MacCommands.XMR_ADDRESS}.${minerId} -p x`

    if (!this.isCpuRunning) {
      this.isCpuRunning = true
      this.onCpuLog(`--- Starting XMRig, miner ID: ${minerId} ---`, false)

      this.cpuProcess = runScript(
        miningCommand,
        [],
        (data: string, type: DataType) => {
          this.cpuStatus = data

          if (!this.isCpuRunning) {
            this.isCpuRunning = true
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
