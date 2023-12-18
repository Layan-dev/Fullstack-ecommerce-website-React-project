/* eslint-disable prettier/prettier */
import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

const baseURL = process.env.BACKEND_ORIGIN || 'ad'
console.log('base url', baseURL)
const api = axios.create({
  baseURL
})

const token = getTokenFromStorage()
api.defaults.headers['Authorization'] = `Bearer ${token}`

export default api
