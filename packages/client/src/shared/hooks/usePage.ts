import { PageInitArgs, PageInitContext } from 'app/appRoutes'
import { useDispatch, useStore } from 'react-redux'
import { useEffect } from 'react'
import { UserState } from 'app/redux/slice/user'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
})

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    initPage({
      dispatch,
      state: store.getState() as { user: UserState },
      ctx: createContext(),
    })
  }, [])
}
