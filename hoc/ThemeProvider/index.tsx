import React from 'react'
import { createContext, useContext, useState } from 'react'

export enum themes {
  light = 'light',
  dark = 'dark',
}

const defaultTheme = themes.dark

type ThemeContextType = {
  theme: themes
  setTheme: (value: themes) => void
}
type ThemeProviderProps = {
  children: JSX.Element
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  /* 
    -> [x] Set css variables scoped for its children
    -> [x] Allow children to read and set current theme
  */
  const [theme, setTheme] = useState<themes>(defaultTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`__themed-${theme}__`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const withTheme = <P extends Record<string, unknown>>(
  Component: any
  // not sure how to type this
): any =>
  class WithLoading extends React.Component<P> {
    render() {
      return (
        <ThemeProvider>
          <Component {...(this.props as P)} />
        </ThemeProvider>
      )
    }
  }

export default ThemeProvider
