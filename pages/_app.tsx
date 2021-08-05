import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
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

config.autoAddCss = false

function App({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter()
  const isAuthFlowRoute = router.route.split('/')[1] == 'users'

  return (
    <div>
      <Provider session={pageProps.session}>
      <ThemeProvider>
        <>
          <Navbar />
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
