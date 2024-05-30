import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { userIsAuth } from 'shared/utils/userLocalStorage'

export const Profile: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [localStorage])

  return <div>Profile</div>
}
