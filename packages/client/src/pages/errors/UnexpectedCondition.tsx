import { FC } from 'react'
import { GeneralErrorLayout } from 'pages/errors/GeneralErrorLayout'

export const UnexpectedCondition: FC = () => {
  return <GeneralErrorLayout name="500" description="server error" />
}
