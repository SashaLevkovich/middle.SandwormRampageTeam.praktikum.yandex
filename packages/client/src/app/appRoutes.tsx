import { createBrowserRouter, redirect } from 'react-router-dom'

import { Navbar } from 'components/Navbar'
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute'

import { Layout } from 'features/Layout'

import { NotFound, UnexpectedCondition } from 'pages/errors'
import { Forum } from 'pages/forum'
import { Game } from 'pages/game'
import { GameStart } from 'pages/gameStart'
import { Landing } from 'pages/landing'
import { Leaderboard } from 'pages/leaderboard'
import { Profile } from 'pages/profile'
import { SignIn } from 'pages/signIn'
import { SignUp } from 'pages/signUp'

import { AppDispatch } from 'shared/redux'

import { RootState, store } from './redux/store'
import { getUserThunk } from './redux/thunk/user/getUser'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

const loadStore = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(store), 0)
  })

export const routes = [
  {
    path: '/*',
    Component: NotFound,
  },
  {
    path: '/serverError',
    element: <UnexpectedCondition />,
  },
  {
    path: '/login',
    Component: SignIn,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    element: <Layout bottomSlot={<Navbar />} />,
    path: '/',
    children: [
      { index: true, element: <GameStart /> },
      {
        path: '/landing',
        element: <Landing />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/game',
        element: (
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        ),
      },
      {
        path: '/leaderboard',
        element: (
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/forum',
        element: (
          <PrivateRoute>
            <Forum />
          </PrivateRoute>
        ),
        loader: async () => {
          await loadStore()
          const response = await store.dispatch(getUserThunk())
          const user = response.payload

          if (!user) {
            return redirect('/login')
          }

          return { success: true }
        },
      },
    ],
  },
]

export const appRouter = () => createBrowserRouter(routes)
