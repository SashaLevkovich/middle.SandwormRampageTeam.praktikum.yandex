import { FC } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'

import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'

import classes from 'pages/signUp/SignUp.module.scss'

export const SignIn: FC = () => {
  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signIn" autoComplete="off">
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
