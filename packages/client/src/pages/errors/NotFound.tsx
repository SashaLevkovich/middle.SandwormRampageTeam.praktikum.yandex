import { GeneralErrorLayout } from 'pages/errors/GeneralErrorLayout'
import { FC } from 'react'

export const NotFound: FC = () => {
  return <GeneralErrorLayout name="404" description="page not found" />
}
