import { FC, PropsWithChildren, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
  headerSlot?: ReactNode
  bottomSlot?: ReactNode
}

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  headerSlot,
  bottomSlot,
}) => {
  return (
    <>
      {headerSlot}
      {children ?? <Outlet />}
      {bottomSlot}
    </>
  )
}
