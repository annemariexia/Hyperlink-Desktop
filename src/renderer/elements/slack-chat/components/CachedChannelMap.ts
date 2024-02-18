import Store from "electron-store"

const store = new Store()

export const getCachedChannelMap = (workspaceId: string, { channels }) => {
  const data: any = store.get("TS_MAP-" + workspaceId)
  if (data) {
    return JSON.parse(data)
  } else {
    const data = channels.reduce((itr, channel) => {
      itr[channel.name || channel.id] = null
      return itr
    }, {})
    saveChannelMap(workspaceId, { TS_MAP: data })
    return data
  }
}

export const saveChannelMap = (workspaceId: string, { TS_MAP }) => {
  store.set("TS_MAP-" + workspaceId, JSON.stringify(TS_MAP))
}
