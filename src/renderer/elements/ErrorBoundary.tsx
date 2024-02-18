import React, { FC, ReactElement } from "react"
import styled from "styled-components"

const RESTART_AFTER_MS = 5000

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  private reloadTimeout: any

  constructor(props) {
    super(props)
    this.state = { hasError: false, error: "" }
  }

  static getDerivedStateFromError = (error) => {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.toString() }
  }

  reloadApp = () => {
    clearTimeout(this.reloadTimeout)
    this.reloadTimeout = setTimeout(() => {
      window.location.reload()
    }, RESTART_AFTER_MS)
  }

  componentDidCatch = (error, errorInfo) => {
    // You can log the error to an error reporting service
    console.error(error, errorInfo)
    this.reloadApp()
  }

  render = () => {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container>
          <h1>Something went wrong.</h1>
          <div>{this.state.error}</div>
        </Container>
      )
    }
    return this.props.children
  }
}

const Container = styled.div`
  padding: 0 40px;
`
