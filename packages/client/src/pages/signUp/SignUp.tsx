import { Flex, Form, Input, Typography } from 'antd'
import { FC } from 'react'

import { ButtonCustom } from 'components/ButtonCustom'
import {
  SignUpFieldType,
  SignUpFieldValidationRules,
} from 'shared/constants/validationRules'

import { Link } from 'react-router-dom'
import { useForm } from 'shared/hooks/useForm'
import classes from './SignUp.module.scss'

interface LoginFormValues {
  login: string
  email: string
  firstName: string
  secondName: string
  password: string
  repeatPassword: string
  phone: string
}

const initialValues: LoginFormValues = {
  login: '',
  email: '',
  firstName: '',
  secondName: '',
  password: '',
  repeatPassword: '',
  phone: '',
}

export const SignUp: FC = () => {
  const { values, setFieldValue, handleSubmit } = useForm<LoginFormValues>({
    initialValues,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(1, values)
    },
  })

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Form name="signUp" autoComplete="off" onSubmitCapture={handleSubmit}>
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
              value={values.login}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const login = event.target.value
                setFieldValue('login', login)
              }}
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
              value={values.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const email = event.target.value
                setFieldValue('email', email)
              }}
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
              value={values.firstName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const firstName = event.target.value
                setFieldValue('firstName', firstName)
              }}
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
              value={values.secondName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const secondName = event.target.value
                setFieldValue('secondName', secondName)
              }}
            />
          </Form.Item>

          <Form.Item<SignUpFieldType>
            name="phone"
            validateTrigger={['onBlur', 'onFocus']}
            rules={SignUpFieldValidationRules['phone']}>
            <Input
              className={classes.input}
              size="large"
              placeholder="Phone *"
              value={values.secondName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const phone = event.target.value
                setFieldValue('phone', phone)
              }}
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
              value={values.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value
                setFieldValue('password', password)
              }}
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
              value={values.repeatPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const repeatPassword = event.target.value
                setFieldValue('repeatPassword', repeatPassword)
              }}
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
            <Link to="/login">Back</Link>
          </ButtonCustom>
        </Flex>
      </div>
    </div>
  )
}
