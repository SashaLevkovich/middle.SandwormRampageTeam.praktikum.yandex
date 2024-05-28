import { FC } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'

import classes from 'pages/signUp/SignUp.module.scss'

type FieldType = {
  login: string
  password: string
}

export const SignIn: FC = () => {
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
              style={{ margin: '0 0 55px', fontSize: 36, fontWeight: 400 }}>
              Authorization
            </Typography.Title>
          </Typography>

          <Form.Item<FieldType> name="login">
            <Input
              className={classes.input}
              size="large"
              placeholder="Login *"
            />
          </Form.Item>

          <Form.Item<FieldType> name="password">
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
