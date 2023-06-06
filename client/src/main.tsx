import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './app/store'
import App from './App'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="179228844613-eea7rq7f6psii5h799co0v5rlbgokpvq.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </Provider>
)
