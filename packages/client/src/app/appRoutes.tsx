import { createBrowserRouter } from 'react-router-dom'

import { Navbar } from 'components/Navbar'

import { Layout } from 'features/Layout'

import { NotFound } from 'pages/errors'
import { Forum } from 'pages/forum'
import { GameStart } from 'pages/gameStart'
import { Leaderboard } from 'pages/leaderboard'
import { Profile } from 'pages/profile'
import { SignIn } from 'pages/signIn'
import { SignUp } from 'pages/signUp'
import { Game } from 'pages/game'

export const appRouter = () =>
  createBrowserRouter([
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
          path: '/game',
          element: <Game />,
        },
        {
          path: '/login',
          element: <SignIn />,
        },
        {
          path: '/signUp',
          element: <SignUp />,
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
