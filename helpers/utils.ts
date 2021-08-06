const getLatestExperience = (
  experience: { dates?: string[]; date_end?: string; date_start?: string }[]
): any => {
  const sortedExperiences = experience.sort(
    (firstExperience, secondExperience) => {
      let firstExperienceLastDate = new Date(),
        secondExperienceLastDate = new Date()
      if (firstExperience.date_end) {
        firstExperienceLastDate = new Date(firstExperience.date_end)
      } else if (firstExperience.dates) {
        firstExperienceLastDate = new Date(
          firstExperience.dates.sort(
            (firstDate, secondDate) =>
              +new Date(secondDate) - +new Date(firstDate)
          )[0]
        )
      }

      if (secondExperience.date_end) {
        secondExperienceLastDate = new Date(secondExperience.date_end)
      } else if (secondExperience.dates) {
        secondExperienceLastDate = new Date(
          secondExperience.dates.sort(
            (firstDate, secondDate) =>
              +new Date(secondDate) - +new Date(firstDate)
          )[0]
        )
      }

      return +secondExperienceLastDate - +firstExperienceLastDate
    }
  )

  return sortedExperiences[0]
}

const getLatestExperienceTitle = (
  experience: {
    dates?: string[]
    date_end?: string
    date_start?: string
    title: string
  }[]
): string => {
  const latestExperience = getLatestExperience(experience)
  return latestExperience.title
}

const getLargestAreaFromAddress = (address: string): string =>
  address.split(',').reverse()[0]

export {
  getLatestExperience,
  getLatestExperienceTitle,
  getLargestAreaFromAddress,
}
