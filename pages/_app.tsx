import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import ThemeProvider from '../hoc/ThemeProvider'
import '../styles/globals.scss'
import '../styles/pages/home.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navbar from '../components/Navbar'
config.autoAddCss = false

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div>
      <ThemeProvider>
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </div>
  )
}
export default App
