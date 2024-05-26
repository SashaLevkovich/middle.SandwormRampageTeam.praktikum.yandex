import { createBrowserRouter } from 'react-router-dom'

import { Navbar } from 'components/Navbar'

import { Layout } from 'features/Layout'

import { NotFound } from 'pages/errors'
import { Forum } from 'pages/forum'
import { GameStart } from 'pages/game'
import { Leaderboard } from 'pages/leaderboard'
import { Profile } from 'pages/profile'
import { SignIn } from 'pages/signIn'
import { SignUp } from 'pages/signUp'

export const appRouter = () =>
  createBrowserRouter([
    {
      path: '/login',
      element: <SignIn />,
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
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/leaderboard',
          element: <Leaderboard />,
        },
        {
          path: '/forum',
          element: <Forum />,
        },
        {
          path: '/*',
          element: <NotFound />,
        },
      ],
    },
  ])
