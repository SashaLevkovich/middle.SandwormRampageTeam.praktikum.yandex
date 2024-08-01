import { FC, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex, Form, Input, Typography } from 'antd'

import { SignInLoginParams } from 'app/api/requests/auth'
import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'
import { PageInitArgs } from 'app/appRoutes'
import { oAuthRequests } from 'app/api'
import { selectUser } from 'app/redux/slice/user'
import { getUserThunk } from 'app/redux/thunk/user/getUser'
import { signInThunk } from 'app/redux/thunk/user/signInUser'
import { setLocalStorageUser } from 'shared/helpers/userLocalStorage'
import { useAppDispatch } from 'shared/redux'

import classes from 'pages/signUp/SignUp.module.scss'

export const SignIn: FC = () => {
  const dispatch = useAppDispatch()
  const [serviceId, setServiceId] = useState('')

  const oAuthURL = useMemo(() => {
    if (serviceId) {
      return oAuthRequests.getOAuthUrl(serviceId)
    }
    return ''
  }, [serviceId])

  const onFinish = async (values: SignInLoginParams) => {
    try {
      const response = await dispatch(signInThunk(values))
      const user = response.payload as User

      setLocalStorageUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    oAuthRequests.getServiceId().then(resp => {
      setServiceId(resp.data.service_id)
    })
  }, [])

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
            <Link to="/signUp">Create</Link>
          </Button>
        </Flex>

        <Flex justify="center" align="center">
          <Button
            type="default"
            shape="round"
            size="large"
            style={{
              background: '#555',
              marginTop: 20,
              padding: '4px 0',
              boxSizing: 'content-box',
              width: '100%',
            }}>
            <Link className={classes.link} to={oAuthURL}>
              Login with Yandex
            </Link>
          </Button>
        </Flex>
      </div>
    </div>
  )
}

export const initSignInPage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(getUserThunk())
  }
}
