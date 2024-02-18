import WebSocket from 'websocket'
import { Const } from '../Const'
import { BrowserWindow } from 'electron'


export class WebSocketClient {
  private socket: WebSocket.client
  private connection: WebSocket.connection
  private timer: NodeJS.Timeout
  private needReconnect: boolean
  private isProd: boolean
  private macAddress: string
  private mainWindow: BrowserWindow

  constructor(isProd: boolean, macAddress: string) {
    this.socket = new WebSocket.client()
    this.timer = null
    this.needReconnect = true
    this.isProd = isProd
    this.macAddress = macAddress
    this.mainWindow = null
  }

  connect(): void {
    this.socket.on('connectFailed', (error: Error) => {
      this.connection = null
      this.reconnect()
    })

    this.socket.on('connect', (connection: WebSocket.connection) => {
      this.connection = connection
      if (this.mainWindow) {
        this.mainWindow.webContents.send("NetworkConnectionInfo", {isOnline: true})
      }

      connection.on('message', (message: WebSocket.IMessage) => {
        // message content
      })

      connection.on('close', () => {
        this.connection = null
        this.reconnect()
        if (this.mainWindow) {
          this.mainWindow.webContents.send("NetworkConnectionInfo", {isOnline: false})
        }
      })

      connection.on('error', () => {
        this.connection = null
        this.reconnect()
      })

      const initServer = () => {
        if (connection.connected) {
          const data = {
            action: "register",
            type: "device",
            macAddress: this.macAddress
          }

          connection.send(JSON.stringify(data))
        }
      }

      initServer()
    })

    this.socket.connect(this.isProd ? Const.WS_SERVER_URL : Const.WS_SERVER_DEV_URL)
  }

  close(): void {
    this.needReconnect = false
    if (this.socket) {
      this.socket.abort()
    }
  }

  send(msg: string): void {
    if (this.connection && this.connection.connected) {
      this.connection.send(msg)
    }
  }

  reconnect(): void {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.needReconnect && this.connection == null && (this.timer = setTimeout(() => {
      this.connect()
    }, 1000 * 20))
  }

  setMainWindow(mainWnd): void {
    this.mainWindow = mainWnd
  }
}

