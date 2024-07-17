import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { CloseOutlined, RightOutlined } from '@ant-design/icons'

import { Button, Flex, Form, Input } from 'antd'

import classes from './ForumChat.module.scss'
import { ITopic } from 'app/api/requests/topics'
import { commentsRequests } from 'app/api'
import { IComment } from 'app/api/requests/comments'
import { Message } from 'components/Message'

type Props = {
  isOpen: boolean
  onClose: () => void
  topic: ITopic
}

export const ForumChat: FC<Props> = ({ isOpen, onClose, topic }) => {
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<IComment[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => scrollToBottom(), [comments])

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const setComment = async () => {
    try {
      await commentsRequests
        .createComment(topic.id, {
          content: message,
          topicId: topic.id,
        })
        .then(data => (data.data ? getComments() : null))
    } catch (e) {
      console.log(e)
    }
  }

  const handleSendMessage = useCallback(() => {
    if (!message) return

    setComment()

    setMessage('')
  }, [message])

  useEffect(() => {
    if (topic.id) {
      getComments()
    }
  }, [topic])

  const getComments = async () => {
    try {
      const { data } = await commentsRequests.getComments(topic.id)
      setComments(data)
    } catch (e) {
      console.log(e)
    }
  }

  if (!isOpen) return null

  const isYou = (userId: number) => {
    if (localStorage.getItem('user')) {
      return userId == JSON.parse(localStorage.getItem('user')!).id
    }
    return false
  }

  return (
    <div className={classes.forumChatContainer}>
      <Flex vertical justify="space-between" className={classes.forumChatModal}>
        <CloseOutlined onClick={onClose} className={classes.closeChat} />

        <div className={classes.messagesList}>
          {comments.map(({ userId, content, createdAt, id }) => (
            <Message
              id={id}
              message={content}
              author={userId!}
              isYou={isYou(userId!)}
              time={createdAt!}
              key={id}
              onAction={getComments}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={classes.forumChatPanelContainer}>
          <Form
            name="forum"
            autoComplete="off"
            className={classes.forumChatPanel}>
            <Form.Item style={{ margin: 0, width: '100%' }}>
              <Input
                className={classes.messageInput}
                size="large"
                placeholder="Text message..."
                value={message}
                onChange={event => handleMessageInput(event)}
              />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              <Button
                type="default"
                shape="round"
                size="large"
                htmlType="submit"
                className={classes.sendMessage}
                onClick={handleSendMessage}>
                <RightOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </div>
  )
}
