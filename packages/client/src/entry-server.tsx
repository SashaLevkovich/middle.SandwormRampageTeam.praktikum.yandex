import AppProviders from 'app/appProviders'
import React from 'react'
import ReactDOM from 'react-dom/server'

export const render = () => ReactDOM.renderToString(<AppProviders />)
