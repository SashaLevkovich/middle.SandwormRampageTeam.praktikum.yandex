import { ConfigProvider, ThemeConfig } from 'antd'
import { Provider, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'
import { appRouter } from './appRoutes'
import { store } from './redux/store'
import { selectUser } from 'app/redux/slice/user'

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Kumbh Sans Regular',
  },
  components: {
    Button: {
      defaultBg: '#f48014',
      defaultColor: '#fff',
      fontWeight: 'bold',
      defaultHoverBg: '#d46b09',
      defaultHoverColor: '#fff',
      defaultActiveBg: '#d46b09',
      defaultActiveBorderColor: 'transparent',
      defaultActiveColor: '#fff',
      contentFontSizeLG: 24,
      defaultHoverBorderColor: 'transparent',
    },
    Form: {
      itemMarginBottom: 15,
    },
  },
}

function AppProviders() {
  const user = useSelector(selectUser)
  return (
    // // <ErrorBoundary>
    // <Provider store={store}>
    //   <ConfigProvider theme={theme}>
    //     <RouterProvider router={appRouter()} />
    //   </ConfigProvider>
    // </Provider>
    // // </ErrorBoundary>
    <div>
      {user ? (
        <div>
          <p>{user.first_name}</p>
          <p>{user.second_name}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  )
}

export default AppProviders
