import { FC } from 'react'
import { GeneralErrorLayout } from 'pages/errors/GeneralErrorLayout'
import { PageInitArgs } from 'app/appRoutes'

export const NotFound: FC = () => {
  return <GeneralErrorLayout name="404" description="page not found" />
}

export const initNotFoundPage = ({ dispatch, state }: PageInitArgs) =>
  Promise.resolve(() => console.log(dispatch, state))
