import * as childProcess from "child_process"
import { ChildProcessWithoutNullStreams } from "child_process"
import kill from "tree-kill"

export enum DataType {
  Info = "info",
  Error = "error"
}

export const runScript = (command: string, args?: string[], onData?: (data: string, type: DataType) => void, onError?: (error?: any) => void, onClose?: (isSuccess: boolean, exitCode: number) => void): ChildProcessWithoutNullStreams => {
  const child = childProcess.spawn(command, args, {
    shell: true
  })
  // You can also use a variable to save the output for when the script closes later
  child.on("error", (error) => {
    if (onError) onError(error)
  })

  child.stdout.setEncoding("utf8")
  child.stdout.on("data", (data) => {
    if (!!onData && data !== undefined) onData(data, DataType.Info)
  })

  child.stdout.on("end", (data) => {
    if (!!onData && data !== undefined) onData(data, DataType.Info)
  })

  child.stderr.setEncoding("utf8")
  child.stderr.on("data", (data) => {
    if (!!onData && data !== undefined) onData(data, DataType.Error)
  })

  child.stderr.setEncoding("utf8")
  child.stderr.on("end", (data) => {
    if (!!onData && data !== undefined) onData(data, DataType.Error)
  })

  child.stderr.on("message", (data) => {
    if (!!onData && data !== undefined) onData(data, DataType.Error)
  })

  child.on("close", (code) => {
    const SUCCESS_CODE = 0
    if (onClose) onClose(code === SUCCESS_CODE, code)
  })

  const killOnExit = (code) => {
    if (child) {
      kill(child.pid)
    }
  }

  process.on("exit", killOnExit)
  process.on("SIGINT", killOnExit)
  process.on("SIGTERM", killOnExit)

  return child
}

export const runScriptAsync = (command: string, args?: string[], onData?: (data: string, type: DataType) => void, onError?: (error?: any) => void, onClose?: (isSuccess: boolean, exitCode: number) => void): Promise<string> => {
  return new Promise<string>((resolve) => {
    let output = ""
    runScript(
      command,
      args,
      (data: string, type: DataType) => {
        output += data + "\n"
        if (onData) {
          onData(data, type)
        }
      },
      onError,
      (isSuccess: boolean, exitCode: number) => {
        if (onClose) {
          onClose(isSuccess, exitCode)
        }
        resolve(output)
      }
    )
  })
}
