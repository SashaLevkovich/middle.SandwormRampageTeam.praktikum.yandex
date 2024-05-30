import { FC } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'

import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'
import AuthService, { SignInParams } from 'app/api/entities/auth'

import classes from 'pages/signUp/SignUp.module.scss'

const authService = new AuthService()

export const SignIn: FC = () => {
  const onFinish = (values: SignInParams) => {
    authService
      .signIn(values)
      .then(() => {
        authService.getUser().then(resp => {
          console.log(resp)
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signIn" autoComplete="off" onFinish={onFinish}>
          <Typography>
            <Typography.Title
              className={classes.title}
              style={{ margin: '0 0 55px', fontSize: 36, fontWeight: 400 }}>
              Authorization
            </Typography.Title>
          </Typography>

          <Form.Item<SignInFieldType>
            name="login"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignInFieldValidationRules['login']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Login *"
            />
          </Form.Item>

          <Form.Item<SignInFieldType>
            name="password"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignInFieldValidationRules['password']}>
            <Input.Password
              className={classes.input}
              size="large"
              placeholder="Password *"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              shape="round"
              size="large"
              htmlType="submit"
              style={{
                margin: '55px 0 0',
                padding: '12px 0',
                boxSizing: 'content-box',
              }}
              block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Flex justify="center" align="center">
          <Typography>
            <Typography.Text>No account?</Typography.Text>
          </Typography>
          <Button type="link" className={classes.backBtn}>
            Create
          </Button>
        </Flex>
      </div>
    </div>
  )
}
