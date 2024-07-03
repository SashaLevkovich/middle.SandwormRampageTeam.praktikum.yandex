import { PageInitArgs } from 'app/appRoutes'
import { useDispatch, useStore } from 'react-redux'
import { useEffect } from 'react'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    initPage({ dispatch, state: store.getState() })
  }, [])
}
