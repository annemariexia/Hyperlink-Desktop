import Store from "electron-store"
import { UserBasicInfo } from "../../../main/api/ApiClient"

export const MARTA_EMAIL = "marta@hyperlink.org"

export enum Role {
  Admin = "Admin",
  Supplier = "Supplier",
  Guest = "Guest"
}

export type UserDetails = {
  id: string
  role: Role
  firstName: string
  lastName: string
  username: string
  email: string
  photoUrl: string
  language: string
  country: string
  active: boolean
  verified: boolean
  earningsUsd: number
  earningsExpectedUsd: number
  payoutEmail: string
  created: Date
  updated: Date
  isFirstUse: boolean
}

export type ReferDetails = {
  id: string
  role: Role
  firstName: string
  lastName: string
  username: string
  email: string
  photoUrl: string
  language: string
  country: string
  active: boolean
  verified: boolean
  earningsUsd: number
  earningsExpectedUsd: number
  payoutEmail: string
  created: Date
}

export type DeviceDetails = {
  id: string
  name: string
  details: string
  macAddress: string
  isGpuRunning: boolean
  isCpuRunning: boolean
  lifetimeEarningsCents: number
  availabilityPercentage: number
  gpuRunningSince: string
  cpuRunningSince: string
  created: string
  ip: string
  uptime: any
}

export type Credentials = {
  email: string
  password: string
  userInfo: UserBasicInfo
}

const KEY_CREDENTIALS = "5rvJtM64JvzbuYNU" // Make this key purposefully unreadable
const KEY_GUEST_CREDENTIALS = "7wLpN92GcKxqrXZV" // Make this key purposefully unreadable

export class ProfileManager {
  public static saveCredentials = async (email: string, password: string, userInfo: UserBasicInfo) => {
    // Encode
    const data: Credentials = {
      email,
      password,
      userInfo
    }
    const dataToStore = Buffer.from(JSON.stringify(data)).toString("base64")

    const store = new Store()
    await store.set(KEY_CREDENTIALS, dataToStore) // stores credentials using <KEY_CREDENTIALS>
  }

  public static saveGuestCredentials = async (email: string, password: string, userInfo: UserBasicInfo) => {
    // Encode
    const data: Credentials = {
      email,
      password,
      userInfo
    }
    const dataToStore = Buffer.from(JSON.stringify(data)).toString("base64")

    const store = new Store()
    await store.set(KEY_GUEST_CREDENTIALS, dataToStore) // stores credentials using <KEY_GUEST_CREDENTIALS>
  }

  public static removeCreadentials = async () => {
    const store = new Store()
    await store.delete(KEY_CREDENTIALS)
  }

  /* retrieves and decodes the stored credentials from the electron-store */
  public static loadCredentials = async (): Promise<Credentials | undefined> => {
    const store = new Store()
    const result: any = await store.get(KEY_CREDENTIALS)
    if (!result) return

    const data = Buffer.from(result, "base64").toString()
    const dataJson = JSON.parse(data)
    return dataJson
  }

  public static loadGuestCredentials = async (): Promise<Credentials | undefined> => {
    const store = new Store()
    const result: any = await store.get(KEY_GUEST_CREDENTIALS)
    if (!result) return

    const data = Buffer.from(result, "base64").toString()
    const dataJson = JSON.parse(data)
    return dataJson
  }


  /* sets the last attempt time for login by encoding the current time and storing it in the electron-store 
    under the key "LastAttemptAt" */
  public static setLastAttemptAt = async () => {
    // Encode
    const attemptAt = new Date()
    attemptAt.setMinutes(attemptAt.getMinutes() + 15)
    const data = {
      lastAttemptAt: attemptAt
    }
    const dataToStore = Buffer.from(JSON.stringify(data)).toString("base64")

    const store = new Store()
    await store.set("LastAttemptAt", dataToStore)
  }


  /* retrieves and decodes the last attempt time */
  public static getLastAttemptAt = async () => {
    const store = new Store()
    const result: any = await store.get("LastAttemptAt")
    if (!result) return

    const data = Buffer.from(result, "base64").toString()
    const dataJson = JSON.parse(data)
    return dataJson?.lastAttemptAt
  }

  /* sets the offline time by encoding the current time and storing it in the electron-store under the key "OfflineTime". */
  public static setOfflineStatus = async () => { 
    const data = { offlineTime: new Date().getTime() }
    const dataToStore = Buffer.from(JSON.stringify(data)).toString("base64")
    
    const store = new Store()
    await store.set("OfflineTime", dataToStore)
  }

  public static getOfflineTime = async () => {
    const store = new Store()
    const result: any = await store.get("OfflineTime")
    if (!result) return null

    const data = Buffer.from(result, "base64").toString()
    const dataJson = JSON.parse(data)
    return new Date(dataJson.offlineTime)
  }

  public static resetOfflineTime = async () => {
    const store = new Store()
    await store.delete("OfflineTime")
  }
}
