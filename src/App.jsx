import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Dashboard from "./pages/dashboard"
import { GuardRouteWithToken, GuardRouteWithoutToken } from "./components/GuardRoute"

import axios from 'axios';
import Profile from "./pages/profile"
import DetailUser from "./pages/detail-user"

export const api = axios.create({
  baseURL: 'https://cms-admin-v2.ihsansolusi.co.id/testapi'
});

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <GuardRouteWithToken>
          <Dashboard />
        </GuardRouteWithToken>
      } />
      <Route path="/profile" element={
        <GuardRouteWithToken>
          <Profile />
        </GuardRouteWithToken>
      } />
      <Route path="/user/:id" element={
        <GuardRouteWithToken>
          <DetailUser />
        </GuardRouteWithToken>
      } />
      <Route path="/login" element={
        <GuardRouteWithoutToken>
          <Login />
        </GuardRouteWithoutToken>
      } />
      <Route path="/signup" element={
        <GuardRouteWithoutToken>
          <SignUp />
        </GuardRouteWithoutToken>
      } />
      <Route path="*" element={
        <GuardRouteWithToken>
          <Dashboard />
        </GuardRouteWithToken>
      } />
    </Routes>
  )
}

export default App