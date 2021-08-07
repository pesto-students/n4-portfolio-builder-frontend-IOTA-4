import parsedResumeResponses from '../mockData/mockData'

interface experience {
  dates?: string[]
  date_end?: string
  date_start?: string
}

const parseResume = (url: string) => {
  return mockParseResume(url)
  // apiParseResume(url)
}

const mockParseResume = (url: string) => {
  console.log('parsing ', url)
  return new Promise<void>((resolve) => {
    localStorage.setItem(
      'parsedResume',
      JSON.stringify(parsedResumeResponses[0])
    )
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

// const apiParseResume = (url: string) => {
//   const headers = new Headers()
//   // headers.append('apikey', 'KsIH0DSK8ME96oTi0Z2RP2q9tC85BA41')
//   // headers.append('apikey', 'xRsyPTQ8EymGsxhY93hse0snJ6MNk5HD')
//   headers.append('apikey', '9hXULnXUUs8niGx8FpnRtjXl6PNiYNH0')

//   const requestOptions = {
//     method: 'GET',
//     headers: headers,
//   }

//   return fetch(
//     `https://api.promptapi.com/resume_parser/url?url=${url}`,
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log('error', error))
// }

const getSortedExperiences = (experience: experience[]) => {
  return experience.sort((firstExperience, secondExperience) => {
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
  })
}

const getLatestExperience = (experience: experience[]): any => {
  return getSortedExperiences(experience)[0]
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

const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const objectsAreSame = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) => {
  const obj1Copy = { ...obj1 }
  const obj2Copy = { ...obj2 }
  return JSON.stringify(obj1Copy) === JSON.stringify(obj2Copy)
}

export {
  parseResume,
  getLatestExperience,
  getLatestExperienceTitle,
  getLargestAreaFromAddress,
  formatDate,
  objectsAreSame,
}
