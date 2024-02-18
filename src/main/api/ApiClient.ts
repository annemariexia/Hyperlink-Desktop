import { Const } from "../Const"
import { HttpStatus } from "./HttpStatus"
import fetch from "node-fetch"
import { DeviceDetails, UserDetails } from "../../renderer/elements/system/ProfileManager"
import * as packageInfo from "./../../../package.json"
import { SystemInfo } from "../system/SystemInfo"
import { PayoutType } from "../../renderer/types/Payments"
import { v4 as uuidv4 } from "uuid"

export type UserBasicInfo = {
  email: string
  firstName: string
  photoUrl: string
}

export type UserCheckResult = {
  exists: boolean
  user: UserBasicInfo
}

export type Result = {
  success: boolean
  msg: string
}

export type UserDetailsResult = {
  success: boolean
  msg: string
  user?: UserDetails
  devices?: DeviceDetails[]
}

export type ResultPayoutMethods = {
  success: boolean
  msg?: string
  lastPayoutMethod?: PayoutType
  payoutMethods?: any
}

export type LogInResult = {
  user?: UserDetails
  sessionId?: string
  deviceId?: string
  userId?: string
  msg?: string
  success: boolean
}

export type AvailabilityResult = {
  availability: number
  msg?: string
  success: boolean
}

export enum Provider {
  Google = "google",
  Facebook = "facebook",
  Apple = "apple"
}
export class ApiClient {
  private apiEndpoint = Const.API_ENDPOINT
  private sessionCookies = ""

  constructor(isProd: boolean) {
    this.apiEndpoint = isProd ? Const.API_ENDPOINT : Const.API_ENDPOINT_DEV
  }

  public checkIfUserExists = async (email: string): Promise<UserCheckResult> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/find/${email}`, {
        credentials: "include"
      } as any)
      const json: any = await response.json()
      return json
    } catch (error) {
      return error
    }
  }

  public isLoggedIn = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/is-logged-in`, {
        credentials: "include",
        headers: {
          cookie: this.sessionCookies
        }
      } as any)
      return response.status === HttpStatus.OK
    } catch (error) {
      return error
    }
  }

  public signUp = async (email: string, password: string, macAddress: string): Promise<Result> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          macAddress
        })
      } as any)
      const msg = await response.text()
      return {
        success: response.status === HttpStatus.OK,
        msg
      }
    } catch (error) {
      return error
    }
  }

  public SendVerificationCode = async (email: string): Promise<Result> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/send-verification-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email
        })
      } as any)
      const msg = await response.text()
      return {
        success: response.status === HttpStatus.OK,
        msg
      }
    } catch (error) {
      return error
    }
  }

  public MarkAsSecondTimeUser = async (email: string): Promise<Result> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/mark-second-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email
        })
      } as any)
      const msg = await response.text()
      return {
        success: response.status === HttpStatus.OK,
        msg
      }
    } catch (error) {
      return error
    }
  }

  public LoginWithVerificationCode = async (email: string, code: string, guestUsername: string): Promise<LogInResult> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/login-with-verification-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email,
          verificationCode: code,
          guestUsername
        })
      } as any)
      const data: any = await response.json()
      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public ResetWithVerificationCode = async (email: string, code: string, guestUsername: string): Promise<LogInResult> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/reset-with-verification-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email,
          verificationCode: code,
          guestUsername
        })
      } as any)
      const data: any = await response.json()
      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public socialLogin = async (provider: Provider, accessToken: string, guestUsername: string, deviceName: string, macAddress: string, deviceDetails: string, isGpuRunning: boolean, isCpuRunning: boolean): Promise<LogInResult> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/social-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          provider,
          accessToken,
          guestUsername
        })
      } as any)
      const data: any = await response.json()

      if (data.success) {
        this.sessionCookies = this.getCookies(response)

        // Register device
        const deviceRegisterResponse = await fetch(`${this.apiEndpoint}/api/v1/device/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: this.sessionCookies
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          credentials: "include",
          body: JSON.stringify({
            name: deviceName,
            macAddress,
            details: deviceDetails,
            isGpuRunning,
            isCpuRunning
          })
        } as any)

        const deviceRegisterData: any = await deviceRegisterResponse.json()

        if (!deviceRegisterData.deviceId || !deviceRegisterData.userId) {
          return {
            msg: "Can't log in. Couldn't get necessary device data.",
            success: false
          }
        }

        data.deviceId = deviceRegisterData.deviceId
        data.userId = deviceRegisterData.userId
      }

      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public logInAndRegisterDevice = async (email: string, password: string, guestUsername: string, deviceName: string, macAddress: string, deviceDetails: string, isGpuRunning: boolean, isCpuRunning: boolean): Promise<LogInResult> => {
    try {
      const platformName = SystemInfo.getPlatformName()

      const response = await fetch(`${this.apiEndpoint}/api/v1/user/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-agent": `Desktop app. Ver. ${packageInfo?.version} ${platformName}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          guestUsername
        })
      } as any)

      const data: any = await response.json()

      if (data.success) {
        this.sessionCookies = this.getCookies(response)
        // Register device
        const deviceRegisterResponse = await fetch(`${this.apiEndpoint}/api/v1/device/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: this.sessionCookies
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          credentials: "include",
          body: JSON.stringify({
            name: deviceName,
            macAddress,
            details: deviceDetails,
            isGpuRunning,
            isCpuRunning
          })
        } as any)

        const deviceRegisterData: any = await deviceRegisterResponse.json()

        if (!deviceRegisterData.deviceId || !deviceRegisterData.userId) {
          return {
            msg: "Can't log in. Couldn't get necessary device data.",
            success: false
          }
        }

        data.deviceId = deviceRegisterData.deviceId
        data.userId = deviceRegisterData.userId

        data.email = email
        data.password = password
      }

      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public SaveLiveBalance = async (balance: any, userId: any): Promise<any> => {
    try {
      const result = await fetch(`${this.apiEndpoint}/api/v1/user/update-balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          balance: balance,
          userId: userId
        })
      } as any)
      const data: any = await result.json()
      return data
    } catch (error) {
      return error
    }
  }

  public updateDeviceStatus = async (macAddress: string, isGpuRunning: boolean, isCpuRunning: boolean): Promise<UserDetailsResult> => {
    try {
      const result = await fetch(`${this.apiEndpoint}/api/v1/device/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          macAddress,
          isGpuRunning,
          isCpuRunning
        })
      } as any)
      const data: any = await result.json()
      return data
    } catch (error) {
      return error
    }
  }

  public updateUsername = async (username: string, id: string): Promise<any> => {
    try {
      const result = await fetch(`${this.apiEndpoint}/api/v1/user/update-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          username: username,
          id: id
        })
      } as any)
      const data: any = await result.json()
      return data
    } catch (error) {
      return error
    }
  }

  public changePassword = async (password: string): Promise<any> => {
    try {
      const result = await fetch(`${this.apiEndpoint}/api/v1/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          password
        })
      } as any)
      const data: any = await result.json()
      return data
    } catch (error) {
      return error
    }
  }

  public updateDevicePotentialEarnings = async (param: any): Promise<any> => {
    try {
      const result = await fetch(`${this.apiEndpoint}/api/v1/device/potentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify(param)
      } as any)
      const data: any = await result.json()
      return data
    } catch (error) {
      return error
    }
  }

  public logOut = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/log-out`, {
        method: "POST",
        credentials: "include",
        headers: {
          cookie: this.sessionCookies
        }
      } as any)
      this.sessionCookies = ""
      return response.status === HttpStatus.OK
    } catch (error) {
      return error
    }
  }

  public remindPassword = async (email: string): Promise<Result> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/remind-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email: email
        })
      } as any)
      const msg = await response.text()

      return {
        success: response.status === HttpStatus.OK,
        msg
      }
    } catch (error) {
      return error
    }
  }

  public resetUserPassword = async (email: string, password: string, guestUsername: string, deviceName: string, macAddress: string, deviceDetails: string, isGpuRunning: boolean, isCpuRunning: boolean): Promise<LogInResult> => {
    try {
      const platformName = SystemInfo.getPlatformName()
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-agent": `Desktop app. Ver. ${packageInfo?.version} ${platformName}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          guestUsername
        })
      } as any)

      const data: any = await response.json()

      if (data.success) {
        return data
      }

      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public requestPayout = async (
    method: PayoutType,
    amountCents: number,
    username?: string,
    email?: string,
    phone?: string,
    fullName?: string,
    bankName?: string,
    accountNumber?: string,
    routingNumber?: string,
    accountType?: string,
    accountOwnership?: string,
    swiftCode?: string,
    country?: string,
    state?: string,
    city?: string,
    address?: string,
    postCode?: string
  ): Promise<Result & { payoutId?: string }> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/request-payout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          method,
          amountCents,
          username,
          email,
          phone,
          fullName,
          bankName,
          accountNumber,
          routingNumber,
          accountType,
          accountOwnership,
          swiftCode,
          country,
          state,
          city,
          address,
          postCode
        })
      } as any)
      const responseJson: any = await response.json()
      return {
        success: response.status === HttpStatus.OK,
        msg: responseJson.msg,
        payoutId: responseJson.payoutId
      }
    } catch (error) {
      return {
        success: false,
        msg: error
      }
    }
  }

  public getPayoutMethods = async (): Promise<ResultPayoutMethods> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/payout-methods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include"
      } as any)
      const data: any = await response.json()
      return {
        success: response.status === HttpStatus.OK,
        lastPayoutMethod: data?.lastPayoutMethod,
        payoutMethods: data?.payoutMethods
      }
    } catch (error) {
      return {
        success: false,
        msg: error
      }
    }
  }

  public getPayoutHistory = async (userId: string): Promise<any> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/payout-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          userId: userId
        })
      } as any)
      const data: any = await response.json()
      return {
        success: response.status === HttpStatus.OK,
        payoutHistory: data?.payoutHistory
      }
    } catch (error) {
      return {
        success: false,
        msg: error
      }
    }
  }

  public setOnlineStatus = async (online_time: Date, offline_time: Date): Promise<any> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/setonline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          online_time: online_time,
          offline_time: offline_time
        })
      } as any)
      const data: any = await response.json()
      return data
    } catch (error) {
      return {
        success: false
      }
    }
  }

  public getAvailability = async (macAddress: string): Promise<AvailabilityResult> => {
    try {
      if (this.sessionCookies == "") {
        return {
          availability: 0,
          success: false
        }
      }
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({ macAddress: macAddress })
      } as any)
      const data: any = await response.json()
      return data
    } catch (error) {
      return {
        availability: 0,
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public logToServer = async (log: string, data: any): Promise<Result> => {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/v1/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          log,
          data
        })
      } as any)
      const msgResponse = await response.text()
      return {
        success: response.status === HttpStatus.OK,
        msg: msgResponse
      }
    } catch (error) {
      return error
    }
  }

  public createGuestAndRegisterDevice = async (deviceName: string, macAddress: string, deviceDetails: string, isGpuRunning: boolean, isCpuRunning: boolean): Promise<LogInResult> => {
    try {
      const platformName = SystemInfo.getPlatformName()
      const uuid = `Guest_${uuidv4()}`
      const response = await fetch(`${this.apiEndpoint}/api/v1/user/create-guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-agent": `Desktop app. Ver. ${packageInfo?.version} ${platformName}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          username: uuid,
          password: uuid,
          macAddress: macAddress
        })
      } as any)

      const data: any = await response.json()

      if (data.success) {
        this.sessionCookies = this.getCookies(response)

        // Register device
        const deviceRegisterResponse = await fetch(`${this.apiEndpoint}/api/v1/device/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: this.sessionCookies
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          credentials: "include",
          body: JSON.stringify({
            name: deviceName,
            macAddress,
            details: deviceDetails,
            isGpuRunning,
            isCpuRunning
          })
        } as any)

        const deviceRegisterData: any = await deviceRegisterResponse.json()

        if (!deviceRegisterData.deviceId || !deviceRegisterData.userId) {
          return {
            msg: "Can't log in. Couldn't get necessary device data.",
            success: false
          }
        }

        data.deviceId = deviceRegisterData.deviceId
        data.userId = deviceRegisterData.userId

        data.email = uuid
        data.password = uuid
      }
      return data
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  public getReferralStatus = async (userId: string) => {
    try {
      const referralStatus = await fetch(`${this.apiEndpoint}/api/v1/user/get-refers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: this.sessionCookies
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        credentials: "include",
        body: JSON.stringify({
          userId: userId
        })
      } as any)

      return referralStatus.json()
    } catch (error) {
      return {
        msg: JSON.stringify(error),
        success: false
      }
    }
  }

  private getCookies = (response): string => {
    const raw = response.headers.raw()["set-cookie"]
    return raw
      .map((entry) => {
        const parts = entry.split(";")
        const cookiePart = parts[0]
        return cookiePart
      })
      .join(";")
  }
}
