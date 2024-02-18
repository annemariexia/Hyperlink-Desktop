import { Const } from "../Const"

// get facebook access_token from the browser
export const getFacebookOAuthCodeByInteraction = (interactionWindow, info) => {
  const authPageUrl = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${info.clientId}&redirect_uri=${info.redirectUri}&response_type=token,granted_scopes&scope=${info.scope}&display=popup`
  interactionWindow.loadURL(authPageUrl)
  return new Promise((resolve, reject) => {
    const onclosed = () => {
      reject("Interaction ended intentionally ;(")
    }
    interactionWindow.on("closed", onclosed)

    interactionWindow.on("did-navigate-in-page", (ev, url) => {
      const raw_code = /access_token=([^&]*)/.exec(url) || null
      const access_token = raw_code && raw_code.length > 1 ? raw_code[1] : null
      const error = /\?error=(.+)$/.exec(url)

      if (access_token || error) {
        interactionWindow.removeListener("closed", onclosed)
        interactionWindow.close()
        return resolve(access_token)
      }
    })

    interactionWindow.webContents.on("did-fail-load", (ev, errorCode, errorDescription, url) => {
      const raw_code = /access_token=([^&]*)/.exec(url) || null
      const access_token = raw_code && raw_code.length > 1 ? raw_code[1] : null
      const error = /\?error=(.+)$/.exec(url)

      if (access_token || error) {
        interactionWindow.removeListener("closed", onclosed)
        interactionWindow.close()
        return resolve(access_token)
      }
    })
  })
}

// get google access_token from the browser
export const getGoogleOAuthCodeByInteraction = (interactionWindow, authPageURL) => {
  interactionWindow.loadURL(authPageURL)
  return new Promise((resolve, reject) => {
    const onclosed = () => {
      reject("Interaction ended intentionally ;(")
    }
    interactionWindow.on("closed", onclosed)
    interactionWindow.on("page-title-updated", (ev) => {
      const url = new URL(ev.sender.getURL())
      if (url.searchParams.get("approvalCode")) {
        interactionWindow.removeListener("closed", onclosed)
        interactionWindow.close()
        return resolve(url.searchParams.get("approvalCode"))
      }
      if ((url.searchParams.get("response") || "").startsWith("error=")) {
        interactionWindow.removeListener("closed", onclosed)
        interactionWindow.close()
        return reject(url.searchParams.get("response"))
      }
    })
    interactionWindow.webContents.on("did-fail-load", (ev) => {
      const urlObj = new URL(ev.sender.getURL())
      const code = urlObj.searchParams.get("code")
      if (code) {
        interactionWindow.removeListener("closed", onclosed)
        interactionWindow.close()
        return resolve(code)
      }
    })
  })
}

export const getGoogleClientInfo = (isProd: boolean) => {
  const clientInfo = Const.GOOGLE_CLIENT_INFO
  clientInfo.redirectUri = `${isProd ? Const.API_ENDPOINT : Const.API_ENDPOINT_DEV}/social-login`
  return clientInfo
}

export const getFacebookClientInfo = (isProd: boolean) => {
  const clientInfo = Const.FACEBOOK_CLIENT_INFO
  clientInfo.redirectUri = `${isProd ? Const.API_ENDPOINT : Const.API_ENDPOINT_DEV}/social-login`
  return clientInfo
}
