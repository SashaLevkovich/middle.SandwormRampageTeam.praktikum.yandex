import { FC } from 'react'
import classes from './Landing.module.scss'
import { Flex } from 'antd'
import { Link } from 'react-router-dom'

export const Landing: FC = () => {
  return (
    <div className={classes.landingPage}>
      <Flex
        className={`${classes.landingPageSection} ${classes.landingPageSection1}`}
        justify="end"
        align="end"
        gap={23}
        vertical>
        <h1 className={classes.landingPageSectionTitle}>Worm</h1>
        <p className={classes.landingPageSectionText}>Created by team 3</p>
      </Flex>

      <Flex
        className={`${classes.landingPageSection} ${classes.landingPageSection2}`}
        justify="start"
        align="start"
        gap={23}
        vertical>
        <h1 className={classes.landingPageSectionTitle}>About game</h1>
        <p className={classes.landingPageSectionText}>
          It’s basically a classic Snake but in the setting of Dune! Get your
          sandworm ready, because you are about to save Arrakis from Spice
          Harvesters.
        </p>
      </Flex>

      <Flex
        className={`${classes.landingPageSection} ${classes.landingPageSection3}`}
        justify="start"
        align="end"
        gap={23}
        vertical>
        <h1 className={classes.landingPageSectionTitle}>LeaderBoards</h1>
        <p className={classes.landingPageSectionText}>
          You can compare your results with friends and other players. Try hard
          if you want to be at the top!
        </p>
      </Flex>

      <Flex
        className={`${classes.landingPageSection} ${classes.landingPageSection4}`}
        justify="start"
        align="start"
        gap={23}
        vertical>
        <h1 className={classes.landingPageSectionTitle}>Forum</h1>
        <p className={classes.landingPageSectionText}>
          You can also start a thread in our forum page. Don’t be a stranger,
          talk to others and maybe get some insights about how to become the
          best at our game.
        </p>
      </Flex>

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
