/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    // const user = {
    //   username: decodedUser.username,
    //   id: decodedUser.user_id,
    //   role: decodedUser.role
    // }

    return decodedUser
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
