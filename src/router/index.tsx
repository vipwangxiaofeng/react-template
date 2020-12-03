import React from "react"
import { renderRoutes } from "react-router-config"
import { BrowserRouter } from "react-router-dom"
import config from "./config"

const routes = <BrowserRouter>{renderRoutes(config)}</BrowserRouter>
export default routes
