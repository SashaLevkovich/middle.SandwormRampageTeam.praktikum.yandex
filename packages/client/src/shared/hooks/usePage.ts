import { PageInitArgs, PageInitContext } from 'app/appRoutes'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useEffect } from 'react'
import { UserState } from 'app/redux/slice/user'
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
  SsrState,
} from 'app/redux/slice/ssr'

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
  const pageHasBeenInitializedOnServer = useSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }

    initPage({
      dispatch,
      state: store.getState() as { user: UserState; ssr: SsrState },
      ctx: createContext(),
    })
  }, [])
}
