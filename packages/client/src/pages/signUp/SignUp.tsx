import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Form, Input, Typography } from 'antd'

import {
  SignUpFieldType,
  SignUpFieldValidationRules,
} from 'shared/constants/validationRules'
import { ButtonCustom } from 'components/ButtonCustom'
import { userIsAuth } from 'shared/utils/userLocalStorage'

import classes from './SignUp.module.scss'

export const SignUp: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [localStorage])

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signUp" autoComplete="off">
          <Typography>
            <Typography.Title
              className={classes.title}
              style={{ margin: '0 0 25px', fontSize: 36, fontWeight: 400 }}>
              Registration
            </Typography.Title>
          </Typography>

          <Form.Item<SignUpFieldType>
            name="login"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignUpFieldValidationRules['login']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Login *"
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="email"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignUpFieldValidationRules['email']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Email *"
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="first_name"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignUpFieldValidationRules['first_name']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="First name *"
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="second_name"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignUpFieldValidationRules['second_name']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Second name *"
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="password"
            validateTrigger={['onBlur', 'onFocus']}
            hasFeedback
            rules={SignUpFieldValidationRules['password']}>
            <Input.Password
              className={classes.input}
              size="large"
              placeholder="Password *"
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={SignUpFieldValidationRules['confirm']}>
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
                margin: '45px 0 0',
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
