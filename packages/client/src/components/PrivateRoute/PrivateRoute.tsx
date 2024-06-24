import { ReactElement, useEffect } from 'react'

import { userIsAuth } from 'shared/utils/userLocalStorage'
import { useNavigate } from 'react-router-dom'

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [])

  return children
}
