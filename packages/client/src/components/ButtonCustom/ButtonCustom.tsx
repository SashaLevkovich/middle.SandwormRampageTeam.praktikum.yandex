import { FC, PropsWithChildren } from 'react'
import classes from './ButtonCustom.module.scss'
import { Button, ButtonProps } from 'antd'
import { BUTTON_TYPES } from 'components/ButtonCustom/constants'

type ButtonCustomProps = {
  customType?: 'white' | 'default' | 'sand'
}

export const ButtonCustom: FC<
  PropsWithChildren<ButtonProps & ButtonCustomProps>
> = ({ children, customType, ...props }) => {
  const type = customType || 'default'
  return (
    <Button
      className={`${classes.button} ${classes[type]}`}
      shape="round"
      style={BUTTON_TYPES[type]}
      {...props}>
      {children}
    </Button>
  )
}
