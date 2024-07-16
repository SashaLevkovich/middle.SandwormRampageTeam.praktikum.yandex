import { FC, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button, Flex, Typography } from 'antd'

import { ForumChat } from 'features/ForumChat'

import { ForumButton } from 'components/ForumButton'

import { FORUM_CREATE_CHAT_ID, MODAL_CONTAINER_ID } from './constants'
import classes from './Forum.module.scss'
import { topicsRequests } from 'app/api'
import { ITopic } from 'app/api/requests/topics'
import { PlusOutlined } from '@ant-design/icons'
import { ForumCreateChat } from 'features/ForumCreateChat'

export const Forum: FC = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [activeTopic, setActiveTopic] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatOpenNew, setIsChatOpenNew] = useState(false)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  )
  const [portalContainerNew, setPortalContainerNew] =
    useState<HTMLElement | null>(null)

  useEffect(() => {
    const container = document.getElementById(MODAL_CONTAINER_ID)

    if (!container) {
      console.error(`Container ${MODAL_CONTAINER_ID} not found!`)
      return
    }

    setPortalContainer(container)

    return () => {
      setPortalContainer(null)
    }
  }, [])

  useEffect(() => {
    const container = document.getElementById(FORUM_CREATE_CHAT_ID)

    if (!container) {
      console.error(`Container ${FORUM_CREATE_CHAT_ID} not found!`)
      return
    }

    setPortalContainerNew(container)

    return () => {
      setPortalContainerNew(null)
    }
  }, [])

  useEffect(() => {
    getTopics()
  }, [])

  const handleButtonClick = useCallback((topic: string) => {
    setActiveTopic(topic)
    setIsChatOpen(true)
  }, [])

  const closeChat = () => {
    setActiveTopic('')
    setIsChatOpen(false)
  }

  const closeChatNew = () => {
    setIsChatOpenNew(false)
    getTopics()
  }

  const createTopic = () => {
    setIsChatOpenNew(true)
  }

  const getTopics = async () => {
    try {
      const { data } = await topicsRequests.getTopics()
      setTopics(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Flex className={classes.wrapper}>
        <Flex justify="space-between" className={classes.container}>
          <Button
            type="default"
            shape="round"
            size="large"
            onClick={createTopic}>
            <PlusOutlined />
          </Button>
          <Flex vertical gap={30} className={classes.buttonBlock}>
            {topics.map(({ title }) => (
              <ForumButton
                type="default"
                onClick={() => handleButtonClick(title)}
                key={title}>
                {title}
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

      <div id={FORUM_CREATE_CHAT_ID}>
        {portalContainerNew &&
          createPortal(
            <ForumCreateChat isOpen={isChatOpenNew} onClose={closeChatNew} />,
            portalContainerNew
          )}
      </div>
    </>
  )
}
