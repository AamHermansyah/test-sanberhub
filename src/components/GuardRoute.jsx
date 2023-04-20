import Cookies from 'js-cookie';
import React from 'react'
import { Navigate } from 'react-router-dom';

export function GuardRouteWithToken({ children }) {
  if (Cookies.get('token') === undefined) return <Navigate to='/login' />
  return children;
}

export function GuardRouteWithoutToken({ children }) {
  if (Cookies.get('token') !== undefined) return <Navigate to='/dashboard' />
  return children;
}