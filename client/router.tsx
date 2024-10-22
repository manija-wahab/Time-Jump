/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import LoginPage from './components/LoginPage'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/Login" element={<LoginPage />} />,
  ]),
)

export default router
