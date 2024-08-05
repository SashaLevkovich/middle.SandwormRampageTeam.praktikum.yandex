import { FormRule } from 'antd'

export type ValidatorSchema<T extends string> = Record<T, FormRule[]>

export type SignInFieldType = {
  login: string
  password: string
}

export type SignUpFieldType = {
  login: string
  email: string
  first_name: string
  second_name: string
  password: string
  confirm: string
  phone: string
}

export const SignInFieldValidationRules: ValidatorSchema<
  keyof SignInFieldType
> = {
  login: [
    { required: true, message: 'Please input your login!' },
    {
      type: 'string',
      min: 3,
      max: 20,
      message: 'Login must contain from 3 to 20 characters!',
    },
  ],
  password: [
    { required: true, message: 'Please input your password!' },
    {
      type: 'string',
      min: 8,
      max: 40,
      message: 'Password must contain from 8 to 40 characters!',
    },
  ],
}

export const SignUpFieldValidationRules: ValidatorSchema<
  keyof SignUpFieldType
> = {
  login: [
    { required: true, message: 'Please input your login!' },
    {
      type: 'string',
      min: 3,
      max: 20,
      message: 'Login must contain from 3 to 20 characters!',
    },
    {
      pattern: /^(?=.*[a-z])[a-z0-9_-]*$/i,
      message: 'Wrong login format',
    },
  ],
  phone: [
    { required: true, message: 'Please input your phone number!' },
    {
      type: 'string',
      min: 3,
      max: 20,
      message: 'Login must contain from 3 to 20 characters!',
    },
    {
      pattern: /^[0-9]+$/i,
      message: 'Wrong phone format',
    },
  ],
  email: [
    { required: true, message: 'Please input your E-mail!' },
    {
      type: 'email',
      message: 'E-mail must be correct!',
    },
  ],
  first_name: [
    { required: true, message: 'Please input your first name!' },
    {
      type: 'string',
      min: 3,
      max: 20,
      message: 'Name must contain from 2 to 20 characters!',
    },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё-]{1,19}$/,
      message: 'Name must starts from upper letter',
    },
  ],
  second_name: [
    { required: true, message: 'Please input your second name!' },
    {
      type: 'string',
      min: 3,
      max: 20,
      message: 'Name must contain from 2 to 20 characters!',
    },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё-]{1,19}$/,
      message: 'Name must starts from upper letter',
    },
  ],
  password: [
    { required: true, message: 'Please input your password!' },
    {
      type: 'string',
      min: 8,
      max: 40,
      message: 'Password must contain from 8 to 40 characters!',
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/i,
      message: 'Password must contain upper letter and number',
    },
  ],
  confirm: [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject(
          new Error('The new password that you entered do not match!')
        )
      },
    }),
  ],
}
