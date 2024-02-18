export type ProcessStatus = {
  isGpuRunning: boolean
  gpuStatus: string
  isCpuRunning: boolean
  cpuStatus: string
}

export interface SystemCommands {
  getPlatformName(): string
  start(minerId: string, appVersion: string): Promise<ProcessStatus>
  stop(): Promise<ProcessStatus>
  getStatus(): Promise<ProcessStatus>
  setOnProcessStatusChangedListener(onProcessStatusChangedListener: (status: ProcessStatus) => void)
}

const PLATFORM_NOT_SUPPORTED: ProcessStatus = {
  isGpuRunning: false,
  gpuStatus: "This operating system is not supported",
  isCpuRunning: false,
  cpuStatus: "This operating system is not supported"
}

export class ProcessCommander {
  private systemsCommands: SystemCommands[] = []
  private onProcessStatusChangedListener: (status: ProcessStatus) => void

  public addSystemCommands = (systemCommand: SystemCommands) => {
    this.systemsCommands.push(systemCommand)
    systemCommand.setOnProcessStatusChangedListener(this.onProcessStatusChangedListener)
  }

  private getPlatformSystemCommands = (): SystemCommands | null => {
    for (const systemCommand of this.systemsCommands) {
      if (process.platform === systemCommand.getPlatformName()) {
        return systemCommand
      }
    }
    return null
  }

  private isMinerIdDefined = (minerId: string) => {
    const MIN_LENGTH = 5
    return !!minerId && minerId.trim().length >= MIN_LENGTH
  }

  public start = async (minerId: string, appVersion: string): Promise<ProcessStatus> => {
    if (!this.isMinerIdDefined(minerId)) {
      return
    }
    const systemCommand = this.getPlatformSystemCommands()
    if (!systemCommand) return PLATFORM_NOT_SUPPORTED
    return systemCommand.start(minerId, appVersion)
  }

  public stop = async (): Promise<ProcessStatus> => {
    const systemCommand = this.getPlatformSystemCommands()
    if (!systemCommand) return PLATFORM_NOT_SUPPORTED
    return systemCommand.stop()
  }

  public restart = async (minerId: string, appVersion: string): Promise<ProcessStatus> => {
    const systemCommand = this.getPlatformSystemCommands()
    if (!systemCommand) return PLATFORM_NOT_SUPPORTED
    await systemCommand.stop()
    if (!this.isMinerIdDefined(minerId)) {
      return
    }
    return systemCommand.start(minerId, appVersion)
  }

  public getStatus = async (): Promise<ProcessStatus> => {
    const systemCommand = this.getPlatformSystemCommands()
    if (!systemCommand) return PLATFORM_NOT_SUPPORTED
    return systemCommand.getStatus()
  }

  public setOnProcessStatusChangedListener = (onProcessStatusChangedListener: (status: ProcessStatus) => void) => {
    this.onProcessStatusChangedListener = onProcessStatusChangedListener
    for (const systemCommands of this.systemsCommands) {
      systemCommands.setOnProcessStatusChangedListener(onProcessStatusChangedListener)
    }
  }
}
