import { FC, useEffect, useState } from 'react'
import classes from './Landing.module.scss'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { LANDING_PAGE_SECTIONS } from 'pages/landing/constants'
import chevronDown from '../../shared/assets/icons/chevronDown.svg'
import chevronUp from '../../shared/assets/icons/chevronUp.svg'

export const Landing: FC = () => {
  const [isBottomOfAPage, setIsBottomOfAPage] = useState(false)
  const [isTopOfAPage, setIsTopOfAPage] = useState(true)
  useEffect(() => {
    const scrollHandler = () => {
      setIsBottomOfAPage(
        document.body.scrollHeight ===
          window.innerHeight + Math.round(window.scrollY)
      )
      setIsTopOfAPage(window.scrollY <= window.innerHeight / 2)
    }
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })
  return (
    <div className={classes.landingPage}>
      {LANDING_PAGE_SECTIONS.map(section => (
        <Flex
          key={section.title}
          className={`${classes.landingPageSection} ${
            classes[section.className]
          }`}
          justify={section.justify}
          align={section.align}
          gap={23}
          vertical>
          <h1 className={classes.landingPageSectionTitle}>{section.title}</h1>
          <p className={classes.landingPageSectionText}>{section.text}</p>
          {section.linkTo && (
            <Link
              className={classes.landingPageSectionLinkSmall}
              to={section.linkTo}>
              {section.linkText}
            </Link>
          )}
        </Flex>
      ))}

      {!isTopOfAPage && (
        <Flex
          className={classes.landingPageScrollerUp}
          justify="center"
          align="center"
          onClick={() => {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
          }}>
          <img src={chevronUp} />
        </Flex>
      )}

      {!isBottomOfAPage && (
        <Flex
          className={classes.landingPageScrollerDown}
          justify="center"
          align="center"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
          }}>
          <img src={chevronDown} />
        </Flex>
      )}

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
