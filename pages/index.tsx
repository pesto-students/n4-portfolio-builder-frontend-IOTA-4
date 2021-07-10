import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import { Collapse } from 'react-collapse'

export default function Home(): ReactElement {
  return (
    <div className="home">
      {/* hero section */}
      <div className="section hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__title">Online Portfolio Builder</div>
            <div className="hero__caption h1">
              Only 2% of portfolio websites make it past the first round. Be in
              the top 2%
            </div>
            <div className="hero__message">
              Use professional field-tested portfolio templates that follow the
              exact portfolio rules’ employers look for. Easy to use and done
              within minutes - try now for free!
            </div>
            <button className="btn btn--lg">Create My Portfolio</button>
            {/* <Image
              src="/sample-portfolio.jpg"
              alt="Sample Portfolio"
              height={350}
              width={770}
            /> */}
            <div className="hero__sample-portfolio">
              <Image
                src="/sample-portfolio.png"
                alt="sample portfolio"
                objectFit="contain"
                layout="responsive"
                width={770}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section features">
        <div className="container">
          <h2 className="h1">
            Effortlessly create a portfolio website for yourself that is as
            unique and brilliant as you are
          </h2>

          <div className="features__gallery">
            <div className="features__image">
              <Image
                src="/sample-portfolio.png"
                alt="sample portfolio"
                objectFit="contain"
                width={600}
                height={545}
              />
            </div>
            <FeaturesList />
          </div>
        </div>
      </div>
    </div>
  )
}

const FeaturesList = () => {
  const perSlideTime = 7000 // in ms
  type Feature = {
    title: string
    message: string
  }
  const features: Feature[] = [
    {
      title: 'Easily edit online',
      message:
        'Creating the perfectly formatted, custom tailored portfolio has never been easier.',
    },
    {
      title: 'Generate from resume',
      message:
        'Just upload your resume and your portfolio gets generated in a matter of seconds!',
    },
    {
      title: 'Endless customization possibilities',
      message:
        'From our selection of high quality templates to the various customization abilities, you will be able to create exactly what you want',
    },
    {
      title: 'No hosting costs',
      message: 'You can host the portfolio free of charge!',
    },
  ]
  const [currentActiveFeature, setCurrentActiveFeature] = useState<number>(-1)
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>()
  const updateCurrentActiveFeature = (index: number) => {
    setCurrentActiveFeature(index)
  }

  const incrementActiveFeature = () => {
    currentActiveFeature == features.length - 1
      ? setCurrentActiveFeature(0)
      : setCurrentActiveFeature(currentActiveFeature + 1)
  }

  useEffect(() => {
    if (timerId) {
      clearInterval(timerId)
    }
    const intervalId = setInterval(incrementActiveFeature, perSlideTime)
    setTimerId(intervalId)
  }, [currentActiveFeature])

  useEffect(() => {
    setCurrentActiveFeature(0)
  }, [])

  return (
    <>
      <div className="features__list">
        {features.map((feature, index) => (
          <div
            className={`features__list-item ${
              index == currentActiveFeature ? 'features__list-item--active' : ''
            }`}
            key={`feature-${feature.title}`}
            onClick={() => {
              updateCurrentActiveFeature(index)
            }}
          >
            <div className="features__list-item-progress-container">
              <div
                className="features__list-item-progress-bar"
                style={
                  index == currentActiveFeature
                    ? {
                        transition: `${perSlideTime}ms height linear`,
                      }
                    : {}
                }
              ></div>
            </div>
            <div className="features__list-item-content">
              <div className="features__list-item-title">{feature.title}</div>
              <Collapse isOpened={index == currentActiveFeature}>
                <div className="features__list-item-message">
                  {feature.message}
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
