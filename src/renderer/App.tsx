import React from "react"
import * as ReactDOM from "react-dom/client"
import { PageMain } from "./pages/PageMain"
import "./../../styles/main.scss"
import "./../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { ErrorBoundary } from "./elements/ErrorBoundary"
import { isProduction } from "./elements/system/System"
import { Const } from "../main/Const"


declare const document: any

export class App {
  public start = () => {
    this.render()
  }

  private render = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"))

    root.render(
      <ErrorBoundary>
        <PageMain />
      </ErrorBoundary>
    )
  }
}

// Init app
const app = new App()
app.start()
