import { ChangeEvent, FC, useCallback, useState } from 'react'

import { CloseOutlined, RightOutlined } from '@ant-design/icons'

import { Button, Flex, Form, Input } from 'antd'

import classes from './ForumCreateChat.module.scss'
import { ITopic } from 'app/api/requests/topics'
import { topicsRequests } from 'app/api'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ForumCreateChat: FC<Props> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState<ITopic>({ content: '', title: '', id: 0 })

  const handleTopicInput = (event: ChangeEvent<HTMLInputElement>) =>
    setTopic({ title: event.target.value, content: '', id: 0 })

  const createTopic = useCallback(() => {
    postTopic()
    onClose()
  }, [topic])

  const postTopic = async () => {
    try {
      await topicsRequests.createTopic({
        title: topic.title,
        content: '',
      })
      setTopic({ title: '', content: '', id: 0 })
    } catch (e) {
      console.log(e)
    }
  }

  if (!isOpen) return null

  return (
    <div className={classes.forumChatContainer}>
      <Flex vertical justify="space-between" className={classes.forumChatModal}>
        <CloseOutlined onClick={onClose} className={classes.closeChat} />

        <div className={classes.forumChatPanelContainer}>
          <Form
            name="forum"
            autoComplete="off"
            className={classes.forumChatPanel}>
            <Form.Item style={{ margin: 0, width: '100%' }}>
              <Input
                className={classes.messageInput}
                size="large"
                placeholder="Topic title"
                value={topic.title}
                onChange={event => handleTopicInput(event)}
              />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              <Button
                type="default"
                shape="round"
                size="large"
                htmlType="submit"
                className={classes.sendMessage}
                onClick={createTopic}>
                <RightOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </div>
  )
}
