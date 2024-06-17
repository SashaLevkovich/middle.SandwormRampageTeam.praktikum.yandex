import { FormEventHandler, useState } from 'react'

interface UseFormParams<Values> {
  initialValues: Values
  validateSchema?: {
    [K in keyof Values]: (value: Pick<Values, K>[K]) => string | null
  }
  validateOnChange?: boolean
  onSubmit?: (value: Values) => void
}

export const useForm = <Values extends object>({
  initialValues,
  validateSchema,
  onSubmit,
  validateOnChange = true,
}: UseFormParams<Values>) => {
  const [values, setValues] = useState(initialValues)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [errors, setErrors] = useState<{ [K in keyof Values]?: string } | null>(
    null
  )

  const setFieldValue = <K extends keyof Values>(
    field: K,
    value: Pick<Values, K>[K]
  ) => {
    setValues(prevValues => {
      return { ...prevValues, [field]: value }
    })

    const validationSchemeExistForField =
      !!validateSchema && !!validateSchema[field]

    if (!validationSchemeExistForField || !validateOnChange) return

    const error = validateSchema[field](value)

    setErrors(prevError => ({ ...prevError, [field]: error }))
  }

  const setFieldsError = <K extends keyof Values>(
    field: K,
    error: Pick<Values, K>[K]
  ) => {
    setErrors({ ...errors, [field]: error })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    setIsSubmiting(true)

    return !!onSubmit && onSubmit(values)
  }

  const resetForm = (values?: Values) => {
    if (values) {
      setValues(values)
    }
    setValues(initialValues)
  }

  return {
    values,
    setFieldValue,
    errors,
    setFieldsError,
    handleSubmit,
    isSubmiting,
    setIsSubmiting,
    resetForm,
  }
}
