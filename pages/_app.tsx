import type { AppProps } from 'next/app'
import { ReactElement, useEffect } from 'react'
import ThemeProvider from '../hoc/ThemeProvider'
import '../styles/globals.scss'
import '../styles/pages/home.scss'
import 'react-tippy/dist/tippy.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/dist/client/router'
import AuthFlowLayout from '../hoc/layouts/AuthFlowLayout'
import { Provider } from 'next-auth/client'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

config.autoAddCss = false

function App({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const routeArr = router.route.split('/')
  const isAuthFlowRoute = routeArr[1] == 'users'
  const isPortfolioShowPage =
    routeArr[1] == 'portfolios' &&
    routeArr[2] != 'create' &&
    routeArr[2] != 'select-template'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      LogRocket.init('w6qedx/portfolio-builder')
      setupLogRocketReact(LogRocket)
      LogRocket.identify('TEST USER', {
        name: 'TEST LOGROCKET',
        email: 'Test@example.com',
      })
    }
  }, [])

  return (
    <div>
      <Provider session={pageProps.session}>
        <ThemeProvider>
          <>
            {!isPortfolioShowPage && <Navbar />}
            {isAuthFlowRoute && (
              <AuthFlowLayout>
                <Component {...pageProps} />
              </AuthFlowLayout>
            )}
            {!isAuthFlowRoute && <Component {...pageProps} />}
          </>
        </ThemeProvider>
      </Provider>
    </div>
  )
}
export default App
