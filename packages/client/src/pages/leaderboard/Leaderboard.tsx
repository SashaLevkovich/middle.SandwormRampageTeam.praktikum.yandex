import { FC } from 'react'
import classes from './Leaderboard.module.scss'
import { LeaderCard } from 'components/LeaderCard'

export const Leaderboard: FC = () => {
  const leaders = []
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
