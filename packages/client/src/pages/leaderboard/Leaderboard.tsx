import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LeaderCard } from 'components/LeaderCard'
import { userIsAuth } from 'shared/utils/userLocalStorage'

import classes from './Leaderboard.module.scss'

export const Leaderboard: FC = () => {
  const navigate = useNavigate()
  const leaders = []

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [localStorage])

  for (let i = 0; i < 4; i++) {
    leaders.push(
      <LeaderCard key={i} name="Paul Atreides" scores={2828127127} point={1} />
    )
  }

  return (
    <div className={classes.background}>
      <div className={classes.title}>leaders</div>
      <div className={classes.flexbox}>{leaders}</div>
    </div>
  )
}
