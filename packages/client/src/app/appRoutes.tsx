import { createBrowserRouter } from 'react-router-dom'

import { Navbar } from 'components/Navbar'

import { Layout } from 'features/Layout'

import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute'
import { NotFound, UnexpectedCondition } from 'pages/errors'
import { Forum } from 'pages/forum'
import { Game } from 'pages/game'
import { GameStart } from 'pages/gameStart'
import { Landing } from 'pages/landing'
import { Leaderboard } from 'pages/leaderboard'
import { Profile } from 'pages/profile'
import { SignIn } from 'pages/signIn'
import { SignUp } from 'pages/signUp'
import { AppDispatch, RootState } from 'app/redux/store'
import { initNotFoundPage } from 'pages/errors/NotFound'
import { initSignInPage } from 'pages/signIn/SignIn'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

export const routes = [
  {
    path: '/*',
    Component: NotFound,
    fetchData: initNotFoundPage,
  },
  {
    path: '/serverError',
    element: <UnexpectedCondition />,
  },
  {
    path: '/login',
    Component: SignIn,
    fetchData: initSignInPage,
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
      },
    ],
  },
]

export const appRouter = () => createBrowserRouter(routes)
