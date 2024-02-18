import React, { FC, ReactElement } from "react"
import { Modal } from "../elements/Modal"
import styled from "styled-components"
import { Log, LogType } from "../types/Log"

type Props = {
  logs: Log[]
}

export const LogsScreen: FC<Props> = ({ logs }): ReactElement => {
  let logsToShow = logs
  if (!logs || logs.length === 0) {
    logsToShow = [
      {
        content: "--- There are no logs ---",
        type: LogType.Info
      }
    ]
  }

  return (
    <Modal width="98vw" height="98vh">
      <Container>
        {logsToShow.map((log, index) => {
          if (log.type === LogType.Error) return <LogError key={`error-${index}`}>{log.content}</LogError>
          return <LogInfo key={`info-${index}`}>{log.content}</LogInfo>
        })}
      </Container>
    </Modal>
  )
}

const LogError = styled.div`
  color: #ffabab;
`

const LogInfo = styled.div`
  color: white;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
