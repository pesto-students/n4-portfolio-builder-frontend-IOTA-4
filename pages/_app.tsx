import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
export default App
