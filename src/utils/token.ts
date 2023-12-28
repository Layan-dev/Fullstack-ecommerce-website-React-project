import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'

export function isExpired() {
  const token = getDecodedTokenFromStorage()
  if (!token) {
    return true
  }
  const expiredAt = token.exp
  if (expiredAt * 1000 < new Date().getTime()) {
    console.log('expired')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true
  } else {
    return false
  }
}
export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    return decodedUser
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const expired = isExpired()
  if (!expired) {
    const token = localStorage.getItem('token')
    if (!token) return null

    return token
  }
  return null
}

export function getUserFromStorage() {
  const user = localStorage.getItem('user')
  if (!user) return null

  try {
    return JSON.parse(user)
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return null
  }
}
