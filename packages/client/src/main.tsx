import ReactDOM from 'react-dom/client'
import AppProviders from './app/appProviders'
import './index.scss'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <AppProviders />
  </ErrorBoundary>
)
