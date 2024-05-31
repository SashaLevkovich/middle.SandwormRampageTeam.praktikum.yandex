import { FC, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Flex, Typography } from 'antd'

import { ForumChat } from 'features/ForumChat'

import { ForumButton } from 'components/ForumButton'

import { MODAL_CONTAINER_ID } from './constants'
import classes from './Forum.module.scss'
import { TOPICS_MOCK } from './topics-mock'

export const Forum: FC = () => {
  const [activeTopic, setActiveTopic] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  )

  useEffect(() => {
    const container = document.getElementById(MODAL_CONTAINER_ID)

    if (container) {
      setPortalContainer(container)
    } else {
      console.error(`Container ${MODAL_CONTAINER_ID} not found!`)
    }
  }, [])

  const handleButtonClick = useCallback((topic: string) => {
    setActiveTopic(topic)
    setIsChatOpen(true)
  }, [])

  const closeChat = () => {
    setActiveTopic('')
    setIsChatOpen(false)
  }

  return (
    <>
      <Flex className={classes.wrapper}>
        <Flex justify="space-between" className={classes.container}>
          <Flex vertical gap={30} className={classes.buttonBlock}>
            {TOPICS_MOCK.map(({ name }) => (
              <ForumButton
                type="default"
                onClick={() => handleButtonClick(name)}
                key={name}>
                {name}
              </ForumButton>
            ))}
          </Flex>

          <Typography>
            <Typography.Title level={2} className={classes.title}>
              FORUM
            </Typography.Title>

            <Typography.Text className={classes.topicTitle}>
              {activeTopic}
            </Typography.Text>
          </Typography>
        </Flex>
      </Flex>

      <div id={MODAL_CONTAINER_ID}>
        {portalContainer &&
          createPortal(
            <ForumChat isOpen={isChatOpen} onClose={closeChat} />,
            portalContainer
          )}
      </div>
    </>
  )
}
