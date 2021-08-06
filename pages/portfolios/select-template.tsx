import TestTemplate from '../../components/templates/testTemplate'
import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import { Fade, Arrow } from '@egjs/flicking-plugins'
import { useEffect, useState } from 'react'
import { usePalette } from 'react-palette'
import { themes, useTheme } from '../../hoc/ThemeProvider'
import '@egjs/flicking-plugins/dist/arrow.css'
import templates from '../../templates'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/client'

const SelectTemplate = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const { theme } = useTheme()!
  const plugins = [new Fade('', 1.7), new Arrow()]

  const { data } = usePalette(Object.values(templates)[currentImageIndex].image)
  const [primaryColor, setPrimaryColor] = useState<string>()

  useEffect(() => {
    if (theme == themes.dark && data?.darkVibrant) {
      setPrimaryColor(`${data?.darkVibrant}`)
    } else if (theme == themes.light && data?.lightVibrant) {
      setPrimaryColor(`${data?.lightVibrant}`)
    }
  }, [data, theme])

  return (
    <>
      <div className="section hero" style={{ position: 'relative' }}>
        {primaryColor && (
          <div
            className="hero__vibrant-color"
            style={{
              backgroundImage: `linear-gradient(${primaryColor} 0%, ${
                theme == themes.dark ? '#000' : '#f2f5fa'
              } 80%)`,
            }}
          ></div>
        )}
        <div className="container">
          <div className="hero__content">
            <div className="hero__caption h1">
              Expertly crafted portfolio templates
            </div>
            <div className="hero__message">
              Use professional field-tested portfolio templates that follow the
              exact portfolio rules’ employers look for.
            </div>
          </div>
        </div>
      </div>
      <Flicking
        align="center"
        circular={true}
        onChanged={(event) => {
          // document
          //   .querySelector('.active-template')
          //   ?.classList.remove('active-template')
          // event.currentTarget.currentPanel.element.classList.add(
          //   'active-template'
          // )
          setCurrentImageIndex(event.currentTarget.index)
        }}
        // onMove={(event) => {
        //   const flicking = event.currentTarget
        //   if (!flicking) return

        // const panels = flicking.visiblePanels

        // panels.forEach((panel) => {
        // const progress = panel.outsetProgress
        // const el = panel.element
        // const dimensionFactor = Math.min(1, 1 / (1 + Math.abs(progress)))
        // el.style.height = `${700 * dimensionFactor}px`
        // el.style.width = `${500 * dimensionFactor}px`
        // })
        // }}
        // style={{ minHeight: '100vh' }}
        plugins={plugins}
        preventClickOnDrag
      >
        {Object.values(templates).map((template) => (
          <div className="initial" key={template.key}>
            <TestTemplate template={template} showDetails={false} />
          </div>
        ))}

        <ViewportSlot>
          <span className="flicking-arrow-prev"></span>
          <span className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
      <div className="container">
        <div className="template-grid">
          <div className="template-grid__title h3 h3--accented">
            Select A Template
          </div>
          <div className="template-grid__templates fluid-grid">
            {Object.values(templates).map((template) => (
              <TestTemplate
                key={template.key}
                template={template}
                showDetails
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default SelectTemplate
