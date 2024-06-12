import { ReactElement, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { userIsAuth } from 'shared/utils/userLocalStorage'

export const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate()

  const user = userIsAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return children
}
