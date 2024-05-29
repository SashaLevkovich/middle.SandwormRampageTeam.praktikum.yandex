import { FC } from 'react'
import classes from './LeaderCard.module.scss'

interface LeaderCardFields {
  name: string
  scores: number
  point: number
}

export const LeaderCard: FC<LeaderCardFields> = props => {
  return (
    <div className={classes.flexbox}>
      <div className={classes.avatar}>
        <label>{props.point}</label>
      </div>
      <div className={classes.background}>
        <div className={classes.name}>{props.name}</div>
        <div>
          <label style={{ color: '#d66b1d' }}>{props.scores}</label> scores
        </div>
      </div>
    </div>
  )
}
