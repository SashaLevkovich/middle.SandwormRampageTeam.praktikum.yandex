import axios from 'axios'
import AuthRequests from './requests/auth'
import OAuthRequests from './requests/oAuth'
import TopicsRequests from 'app/api/requests/topics'
import CommentsRequests from 'app/api/requests/comments'

export const rootApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const geolocationApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/reverse?',
})

export const authRequests = new AuthRequests()
export const oAuthRequests = new OAuthRequests()
export const topicsRequests = new TopicsRequests()
export const commentsRequests = new CommentsRequests()
