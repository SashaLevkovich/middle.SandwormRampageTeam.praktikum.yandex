import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/signIn'
import { SignUp } from '@/pages/signUp'
import { Leaderboard } from '@/pages/leaderboard'
import { Forum } from '@/pages/forum'
import { Layout } from '@/features/Layout/Layout'
import { Profile } from '@/pages/profile'
import { Game } from '@/pages/game'
import { NotFound } from '@/pages/errors'
import { Navbar } from '@/components/Navbar'

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <Layout bottomSlot={<Navbar />} />,
      path: '/',
      children: [
        { index: true, element: <Game /> },
        {
          path: '/profile',
          element: <Profile />,
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
