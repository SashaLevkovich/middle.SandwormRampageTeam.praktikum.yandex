import { FC, PropsWithChildren } from 'react'

import { Button, ConfigProvider, ThemeConfig } from 'antd'
import { ButtonType } from 'antd/es/button'

import classes from './ForumButton.module.scss'

type Props = {
  type: ButtonType
  onClick?: () => void
}

const theme: ThemeConfig = {
  components: {
    Button: {
      defaultBg: '#fff',
      defaultColor: '#272B2A',
      borderRadius: 15,
      fontWeight: 'normal',
      paddingInline: 25,
      fontSize: 24,
      defaultHoverBg: '#fff',
      defaultHoverBorderColor: '#F48014',
      defaultHoverColor: '#F48014',
    },
  },
}

export const ForumButton: FC<PropsWithChildren<Props>> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <ConfigProvider theme={theme}>
      <Button
        type={type}
        value="large"
        block
        className={classes.forumButton}
        onClick={onClick}>
        {children}
      </Button>
    </ConfigProvider>
  )
}
