import ReactDOM from 'react-dom/client'

import { registerServiceWorker } from 'shared/utils/registerServiceWorker'

import AppProviders from './app/appProviders'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProviders />
)

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}
