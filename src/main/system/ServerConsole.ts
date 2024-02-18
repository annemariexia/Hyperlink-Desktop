import { ApiClient } from "../api/ApiClient"

export class ServerConsole {
  private static apiClient: ApiClient

  public static setApiClient = (apiClient: ApiClient) => {
    ServerConsole.apiClient = apiClient
  }

  public static log = (log: string, data?: any) => {
    ServerConsole.apiClient.logToServer(log, data)
  }
}
