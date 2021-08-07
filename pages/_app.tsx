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
  const isPortfolioShowPage = routeArr[1] == '[portfolioKey]'

  const setupLogRocket = () => {
    if (typeof window !== 'undefined') {
      LogRocket.init('w6qedx/portfolio-builder')
      setupLogRocketReact(LogRocket)
      LogRocket.identify('TEST USER', {
        name: 'TEST LOGROCKET',
        email: 'Test@example.com',
      })
    }
  }

  // const setupFirebase = () => {
  //   const config = {
  //     apiKey: 'AIzaSyCJMek5loyD8rvqxjUDjHA_oVNj3Wvm6z0',
  //     authDomain: 'portfolio-builder-8b172.firebaseapp.com',
  //     projectId: 'portfolio-builder-8b172',
  //     storageBucket: 'portfolio-builder-8b172.appspot.com',
  //     messagingSenderId: '548045024115',
  //     appId: '1:548045024115:web:5bf97eb2907de3d0d7b306',
  //     measurementId: 'G-H0NFPK6HX2',
  //     databaseName: 'portfolio-builder-8b172',
  //   }
  //   firebase.initializeApp(config)
  // }

  useEffect(() => {
    setupLogRocket()
    // setupFirebase()
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
