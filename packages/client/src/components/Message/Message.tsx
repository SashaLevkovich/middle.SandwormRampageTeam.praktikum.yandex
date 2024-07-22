import { FC } from 'react'

import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex } from 'antd'
import { commentsRequests } from 'app/api'
import { Reaction } from 'components/Reaction'

import classes from './Message.module.scss'

type Props = {
  id: number
  isYou: boolean
  author: number
  message: string
  time: string
  onAction: () => void
}

export const Message: FC<Props> = ({
  id,
  author,
  isYou,
  message,
  time,
  onAction,
}) => {
  const removeComment = async () => {
    try {
      await commentsRequests.deleteComment(id).then(() => onAction())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex gap={28} style={{ flexDirection: isYou ? 'row-reverse' : 'row' }}>
      <Flex gap={5} style={{ flexDirection: 'column' }}>
        <Avatar
          size={72}
          style={{ backgroundColor: isYou ? '#F9A64A' : '#F48014' }}
        />
        <Button
          type="default"
          shape="round"
          size="large"
          className={classes.actionButton}
          onClick={removeComment}>
          <DeleteOutlined />
        </Button>
      </Flex>
      <Flex
        className={classes.messageContainer}
        justify={isYou ? 'flex-end' : 'flex-start'}>
        <div className={classes.message}>
          <Flex vertical>
            <h3 className={classes.author}>{author}</h3>
            <p className={classes.text}>{message}</p>
            <Flex justify="space-between" align="center">
              <Reaction />
            </Flex>

            <Flex justify="flex-end" className={classes.sendTime}>
              {new Date(time).toLocaleDateString()}
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
  )
}
