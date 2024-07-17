import { FC } from 'react'

import { Avatar, Flex } from 'antd'

import classes from './Message.module.scss'

type Props = {
  isYou: boolean
  author: number
  message: string
  time: string
}

export const Message: FC<Props> = ({ author, isYou, message, time }) => {
  return (
    <Flex gap={28} style={{ flexDirection: isYou ? 'row-reverse' : 'row' }}>
      <Avatar
        size={72}
        style={{ backgroundColor: isYou ? '#F9A64A' : '#F48014' }}
      />
      <Flex
        className={classes.messageContainer}
        justify={isYou ? 'flex-end' : 'flex-start'}>
        <div className={classes.message}>
          <Flex vertical>
            <h3 className={classes.author}>{author}</h3>
            <p className={classes.text}>{message}</p>
            <Flex justify="flex-end" className={classes.sendTime}>
              {time}
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
  )
}
