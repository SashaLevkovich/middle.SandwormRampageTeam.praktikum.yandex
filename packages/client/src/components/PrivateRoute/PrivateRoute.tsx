import { ReactElement, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { userIsAuth } from 'shared/helpers/userLocalStorage'

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [])

  return children
}
