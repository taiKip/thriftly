import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from './app/store'
import App from './App'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="179228844613-do7b4fbiqb03ghtv9btqj4edulnsiq6g.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </Provider>
)
