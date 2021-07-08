import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import ThemeProvider from '../hoc/ThemeProvider'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}
export default App
