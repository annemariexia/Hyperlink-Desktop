export type SysInfo = {
  version?: string
  platform?: string
  hostname?: string
  cpus?: any[]
  ramKb?: number
  gpuType?: string
  macAddress?: string
  gpuVram?: string
}

export type ProcessStatus = {
  isGpuRunning: boolean
  gpuStatus: string
  isCpuRunning: boolean
  cpuStatus: string
}

export enum Command {
  GetSysInfo = "GetSysInfo",
  StartProcess = "StartProcess",
  StopProcess = "StopProcess",
  GetProcessStatus = "GetProcessStatus"
}

export enum ApiCommand {
  CheckIfUserExists = "CheckIfUserExists",
  IsLoggedIn = "IsLoggedIn",
  SignUp = "SignUp",
  LogIn = "LogIn",
  ResetPassword = "ResetPassword",
  ResetPasswordPrivacy = "ResetPasswordPrivacy",
  LogOut = "LogOut",
  RemindPassword = "RemindPassword",
  LogToServer = "LogToServer",
  RequestPayout = "RequestPayout",
  UpdateStatus = "UpdateStatus",
  GetPayoutMethods = "GetPayoutMethods",
  GetPayoutHistory = "GetPayoutHistory",
  AuthStartGoogle = "AuthStartGoogle",
  AuthStartYahoo = "AuthStartYahoo",
  AuthStartOutlook = "AuthStartOutlook",
  AuthStartFacebook = "AuthStartFacebook",
  AuthStartApple = "AuthStartApple",
  OpenEmail = "OpenEmail",
  CreateGuestUser = "CreateGuestUser",
  SendHeartBeat = "SendHeartBeat",
  SendVerificationCode = "SendVerificationCode",
  MarkAsSecondTimeUser = "MarkAsSecondTimeUser",
  LoginWithVerificationCode = "LoginWithVerificationCode",
  ResetWithVerificationCode = "ResetWithVerificationCode",
  GetAvailability = "GetAvailability",
  GetDeviceAvailability = "GetDeviceAvailability",
  UpdatePotentialEarnings = "UpdatePotentialEarnings",
  SetOnline = "SetOnline",
  UpdateUsername = "UpdateUsername",
  ChangePassword = "ChangePassword",
  CheckIfUsernameExists = "CheckIfUsernameExists",
  SaveLiveBalance = "SaveLiveBalance"
}

export enum Message {
  SysInfo = "SysInfo",
  ProcessStatus = "ProcessStatus",
  GpuLog = "GpuLog",
  CpuLog = "CpuLog",
  UpdateUserInfo = "UpdateUserInfo",
  ConsoleLog = "ConsoleLog",
  Version = "Version",
  NetworkConnectionInfo = "NetworkConnectionInfo"
}

export enum ApiMessage {
  CheckIfUserExistsResult = "CheckIfUserExistsResult",
  IsLoggedInResult = "IsLoggedInResult",
  SignUpResult = "SignUpResult",
  LogInResult = "LogInResult",
  ResetPasswordResult = "ResetPasswordResult",
  SocialLogInResult = "SocialLogInResult",
  GuestLogInResult = "GuestLogInResult",
  UpdateDevices = "UpdateDevices",
  UpdateReferral = "UpdateReferral",
  LogOutResult = "LogOutResult",
  RemindPasswordResult = "RemindPasswordResult",
  RequestPayoutResult = "RequestPayoutResult",
  GetPayoutMethodsResult = "GetPayoutMethodsResult",
  GetPayoutHistoryResult = "GetPayoutHistoryResult",
  SendVerificationCodeResult = "SendVerificationCodeResult",
  GetAvailabilityResult = "GetAvailabilityResult",
  GetDeviceAvailabilityResult = "GetDeviceAvailabilityResult",
  SetOnlinleStatusResult = "SetOnlineStatusResult",
  UpdateUsernameResult = "UpdateUsernameResult",
  ChangePasswordResult = "ChangePasswordResult",
  CheckIfUsernameExistsResult = "CheckIfUsernameExistsResult"
}

export enum SlackCommand {
  ListenForMessages = "ListenForMessages",
  ConversationsList = "ConversationsList",
  ConversationsReplies = "ConversationsReplies",
  ConversationsHistory = "ConversationsHistory",
  PostMessage = "PostMessage"
}

export enum SlackMessage {
  NewMessage = "NewMessage",
  ConversationsList = "ConversationsList",
  ConversationsReplies = "ConversationsReplies",
  ConversationsHistory = "ConversationsHistory",
  PostMessage = "PostMessage"
}

export const isProduction = () => !!global.location.search && global.location.search.includes("isProd=true")
