import { FC } from 'react'
import classes from './Errors.module.scss'
import { Link, useNavigate } from 'react-router-dom'

interface GeneralLayoutProps {
  name: string
  description: string
}

export const GeneralErrorLayout: FC<GeneralLayoutProps> = (
  props: GeneralLayoutProps
) => {
  const navigate = useNavigate()

  function goBack() {
    return navigate(-1)
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>{props.name}</div>
      <div className={classes.text}>{props.description}</div>
      <Link to="#" onClick={goBack} className={classes.link}>
        Back
      </Link>
    </div>
  )
}
