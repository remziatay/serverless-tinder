import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './reboot.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { UserProvider } from './firebase'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
