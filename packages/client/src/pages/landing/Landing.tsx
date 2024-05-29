import { FC } from 'react'
import classes from './Landing.module.scss'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { LANDING_PAGE_SECTIONS } from 'pages/landing/constants'

export const Landing: FC = () => {
  return (
    <div className={classes.landingPage}>
      {LANDING_PAGE_SECTIONS.map(section => (
        <Flex
          className={`${classes.landingPageSection} ${
            classes[section.className]
          }`}
          justify={section.justify}
          align={section.align}
          gap={23}
          vertical>
          <h1 className={classes.landingPageSectionTitle}>{section.title}</h1>
          <p className={classes.landingPageSectionText}>{section.text}</p>
        </Flex>
      ))}

      <Flex
        className={`${classes.landingPageSection} ${classes.landingPageSection5}`}
        justify="end"
        align="start"
        gap={23}
        vertical>
        <Link className={classes.landingPageSectionLink} to="/">
          Go to Game
        </Link>
      </Flex>
    </div>
  )
}
