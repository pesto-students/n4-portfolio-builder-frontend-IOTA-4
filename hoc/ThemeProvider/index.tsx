import { createContext, useContext, useState } from 'react'

const defaultTheme = 'dark'

type validThemeNames = 'light' | 'dark'

type ThemeContextType = {
  theme: validThemeNames
  setTheme: (value: validThemeNames) => void
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
  const [theme, setTheme] = useState<validThemeNames>(defaultTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`__themed-${theme}__`}>{children}</div>
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
