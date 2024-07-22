import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'

import { CloseOutlined, RightOutlined } from '@ant-design/icons'

import { Button, Flex, Form, Input } from 'antd'

import { topicsRequests } from 'app/api'
import { ITopic } from 'app/api/requests/topics'
import classes from './ForumCreateChat.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  editingTopic: ITopic
}

export const ForumCreateChat: FC<Props> = ({
  isOpen,
  onClose,
  editingTopic,
}) => {
  const [topic, setTopic] = useState<ITopic>({ content: '', title: '', id: 0 })

  const handleTopicInput = (event: ChangeEvent<HTMLInputElement>) =>
    setTopic({ title: event.target.value, content: '', id: 0 })

  const createTopic = useCallback(() => {
    if (editingTopic.id) {
      updateTopic()
    } else {
      postTopic()
    }
  }, [topic])

  const postTopic = async () => {
    try {
      await topicsRequests
        .createTopic({
          title: topic.title,
          content: '',
        })
        .then(data => (data.data ? onClose() : null))
      setTopic({ title: '', content: '', id: 0 })
    } catch (e) {
      console.log(e)
    }
  }

  const updateTopic = async () => {
    try {
      await topicsRequests
        .updateTopic(editingTopic.id, {
          title: topic.title,
          content: topic.content,
        })
        .then(data => (data.data ? onClose() : null))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setTopic(editingTopic)
  }, [editingTopic])

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
