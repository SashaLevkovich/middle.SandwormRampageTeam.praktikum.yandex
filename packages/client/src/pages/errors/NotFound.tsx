import { FC } from 'react'
import classes from './NotFound.module.scss'
import { Link, useNavigate } from 'react-router-dom'

export const NotFound: FC = () => {
  const navigate = useNavigate()

  function goBack() {
    return navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>400</div>
      <div className={classes.text}>page not found</div>
      <Link to="#" onClick={goBack} className={classes.link}>
        Back
      </Link>
    </div>
  )
}
