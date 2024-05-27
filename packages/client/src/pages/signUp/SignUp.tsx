import { FC } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'

import classes from './SignUp.module.scss'
import { ButtonCustom } from 'components/Button'

type FieldType = {
  login: string
  email: string
  fullName: string
  password: string
  passwordConfirm: string
}

export const SignUp: FC = () => {
  const finishHandler = () => {
    console.log('finishHandler')
  }

  const failedFinishHandler = () => {
    console.log('failedFinishHandler')
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={finishHandler}
          onFinishFailed={failedFinishHandler}
          autoComplete="off">
          <Typography>
            <Typography.Title
              className={classes.title}
              style={{ margin: '0 0 85px' }}>
              Registration
            </Typography.Title>
          </Typography>

          <Form.Item<FieldType> name="login">
            <Input
              className={classes.input}
              size="large"
              placeholder="Login *"
            />
          </Form.Item>

          <Form.Item<FieldType> name="email">
            <Input
              className={classes.input}
              size="large"
              placeholder="Email *"
            />
          </Form.Item>

          <Form.Item<FieldType> name="fullName">
            <Input
              className={classes.input}
              size="large"
              placeholder="Full name"
            />
          </Form.Item>

          <Form.Item<FieldType> name="password">
            <Input.Password
              className={classes.input}
              size="large"
              placeholder="Password *"
            />
          </Form.Item>

          <Form.Item<FieldType> name="password">
            <Input.Password
              className={classes.input}
              size="large"
              placeholder="Repeat password *"
            />
          </Form.Item>

          <Form.Item>
            <ButtonCustom
              htmlType="submit"
              size="large"
              style={{
                margin: '85px 0 0',
                padding: '12px 0',
                boxSizing: 'content-box',
              }}
              block>
              Sign up
            </ButtonCustom>
          </Form.Item>
        </Form>

        <Flex justify="center" align="center">
          <Typography>
            <Typography.Text>Have account?</Typography.Text>
          </Typography>
          <ButtonCustom
            style={{ paddingLeft: '9px' }}
            type="link"
            className={classes.backBtn}>
            Back
          </ButtonCustom>
        </Flex>
      </div>
    </div>
  )
}
