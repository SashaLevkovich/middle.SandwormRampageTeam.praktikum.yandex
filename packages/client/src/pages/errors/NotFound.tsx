import { FC } from 'react'
import { GeneralErrorLayout } from 'pages/errors/GeneralErrorLayout'

export const NotFound: FC = () => {
  return <GeneralErrorLayout name="404" description="page not found" />
}
