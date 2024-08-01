import { Button, Flex, Form, Input, Typography } from 'antd'
import { FC } from 'react'

import { SignInLoginParams } from 'app/api/requests/auth'
import {
  SignInFieldType,
  SignInFieldValidationRules,
} from 'shared/constants/validationRules'

import classes from 'pages/signUp/SignUp.module.scss'

import { signInThunk } from 'app/redux/thunk/user/signInUser'
import { Link } from 'react-router-dom'
import { setLocalStorageUser } from 'shared/helpers/userLocalStorage'
import { useAppDispatch } from 'shared/redux'

export const SignIn: FC = () => {
  const dispatch = useAppDispatch()

  const onFinish = async (values: SignInLoginParams) => {
    try {
      const response = await dispatch(signInThunk(values))
      const user = response.payload as User

      setLocalStorageUser(user)
    } catch (e) {
      console.log(e)
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
            <Link to="/signUp">Create</Link>
          </Button>
        </Flex>
      </div>
    </div>
  )
}
