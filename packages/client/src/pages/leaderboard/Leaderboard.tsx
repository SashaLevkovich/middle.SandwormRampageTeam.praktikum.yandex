import { FC } from 'react'

import { LeaderCard } from 'components/LeaderCard'

import classes from './Leaderboard.module.scss'

const leaders: JSX.Element[] = []
export const Leaderboard: FC = () => {
  return (
    <div className={classes.background}>
      <div className={classes.title}>leaders</div>
      <div className={classes.flexbox}>
        {leaders.map((el, idx) => (
          <LeaderCard
            key={idx}
            name="Paul Atreides"
            scores={2828127127}
            point={idx}></LeaderCard>
        ))}
      </div>
    </div>
  )
}
