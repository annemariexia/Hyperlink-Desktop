export enum LogType {
  Info = "info",
  Error = "error"
}

export type Log = {
  content: string
  type: LogType
}
