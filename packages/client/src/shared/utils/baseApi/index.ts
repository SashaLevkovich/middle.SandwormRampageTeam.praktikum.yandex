import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://test:port/api',
})
