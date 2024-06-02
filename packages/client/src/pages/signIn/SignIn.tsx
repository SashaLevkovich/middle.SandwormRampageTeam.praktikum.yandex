import { FC, useEffect } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { AxiosError } from 'axios'

import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'
import { setLocalStorageUser } from 'shared/utils/userLocalStorage'
import AuthService, { SignInParams } from 'app/api/entities/auth'

import classes from 'pages/signUp/SignUp.module.scss'
import { useNavigate } from 'react-router-dom'

const authService = new AuthService()

export const SignIn: FC = () => {
  console.log(import.meta.env.VITE_API_URL)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        const resp = await authService.getUser()
        if (resp.data.id) {
          setLocalStorageUser(resp.data)
          navigate('/')
        }
      } catch (e) {
        console.log(e)
      }
    }

    checkAuth()
  }, [])

  const onFinish = async (values: SignInParams) => {
    try {
      await authService.signIn(values)
      const getUserResp = await authService.getUser()
      setLocalStorageUser(getUserResp.data)
    } catch (e) {
      const error = e as AxiosError
      if (error.response?.status === 400) {
        authService.getUser().then(resp => {
          setLocalStorageUser(resp.data)
        })
      }
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signIn" onFinish={onFinish}>
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
