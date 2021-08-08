import { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import {
  combineValidations,
  presence,
  validEmailValidation,
  validSlug,
} from '../../helpers/validationHelpers'
import TextField from '../inputs/TextField'
import Modal from 'react-modal'
import { parseResume } from '../../helpers/utils'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import ParsedResume from '../../types/ParsedResume'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import FileInput from '../inputs/FileInput'
import { useRouter } from 'next/dist/client/router'

interface propTypes {
  onDataUpdate: (data: ParsedResume) => void
}

const UserForm = ({}: propTypes) => {
  const router = useRouter()
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
  const [formValues] = useState<Record<string, unknown>>({})
  const [parsedResumeData, setParsedResumeData] =
    useState<ParsedResume | void>()
  const [resumeUrl, setResumeUrl] = useState('')
  // const [, setResumeUploadData] = useState<any>({
  //   resume: '',
  //   progress: 0,
  //   isUploading: false,
  //   uploadedFileUrl: '',
  // })

  useEffect(() => {
    const existingParsedResume = localStorage.getItem('parsedResume')

    if (!existingParsedResume) {
      setUploadModalOpen(true)
    } else {
      setParsedResumeData(JSON.parse(existingParsedResume))
    }
  }, [])

  useEffect(() => {
    console.log('something changed', formValues)
  }, [formValues])

  const readParsedResumeFromLocalStorage = () => {
    const existingParsedResume = localStorage.getItem('parsedResume')
    if (existingParsedResume)
      setParsedResumeData(JSON.parse(existingParsedResume))
  }

  const handleSubmit = (values: Record<string, unknown>) => {
    localStorage.setItem(
      'inputResume',
      JSON.stringify(formDataToApiResponseFormat(values))
    )
    router.push(`/${values.portfolioUrlSlug}`)
  }

  const handleUpload = async (files: File[]) => {
    const body = new FormData()
    body.append('file', files[0])
    fetch('/api/file', {
      method: 'POST',
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        const { fileUrl } = data
        setResumeUrl(fileUrl)
        parseResume(fileUrl).then(() => {
          setUploadModalOpen(false)
          readParsedResumeFromLocalStorage()
        })
      })
      .catch(() => {
        parseResume('').then(() => {
          setUploadModalOpen(false)
          readParsedResumeFromLocalStorage()
        })
      })
  }

  const formDataToApiResponseFormat = (values: any) => {
    return {
      ...values,
      name: [values.firstName, values.lastName].join(' '),
      skills: values.skills.map((skill: { name: string }) => skill.name),
      resumeUrl,
    }
  }

  return (
    <>
      <div className="user-form">
        <div className="user-form__title h3">User Details</div>
        <Form
          onSubmit={handleSubmit}
          mutators={{
            ...arrayMutators,
          }}
          initialValues={
            parsedResumeData
              ? {
                  ...parsedResumeData,
                  firstName: parsedResumeData.name.split(' ')[0],
                  lastName: parsedResumeData.name.split(' ').reverse()[0],
                  education: parsedResumeData.education.map((education) => {
                    return {
                      ...education,
                      startDate: education.date_start
                        ? new Date(education.date_start)
                        : education.dates
                        ? new Date(
                            education.dates
                              .map((date) => new Date(date))
                              .sort()[0]
                          )
                        : '',
                      endDate: education.date_end
                        ? new Date(education.date_end)
                        : education.dates
                        ? new Date(
                            education.dates
                              .map((date) => new Date(date))
                              .sort()
                              .reverse()[0]
                          )
                        : '',
                    }
                  }),
                  experience: parsedResumeData.experience.map((experience) => {
                    return {
                      ...experience,
                      startDate: experience.date_start
                        ? experience.date_start
                        : experience.dates
                        ? experience.dates
                            .map((date) => new Date(date))
                            .sort()[0]
                        : '',
                      endDate: experience.date_end
                        ? experience.date_end
                        : experience.dates
                        ? experience.dates
                            .map((date) => new Date(date))
                            .sort()
                            .reverse()[0]
                        : '',
                    }
                  }),
                  skills: parsedResumeData.skills.map((skill) => {
                    return { name: skill }
                  }),
                }
              : {}
          }
          render={({ handleSubmit }) => {
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <section className="user-form__section fluid-grid">
                    <div className="user-form__section-title h4 h4--accented">
                      Personal Details
                    </div>
                    <Field
                      name="firstName"
                      labelName="First Name"
                      component={TextField}
                      outerClassName="col-50"
                      validate={(value) =>
                        combineValidations(value, [presence])
                      }
                    />

                    <Field
                      name="lastName"
                      labelName="Last Name"
                      component={TextField}
                      outerClassName="col-50"
                      validate={(value) =>
                        combineValidations(value, [presence])
                      }
                    />

                    <Field
                      name="email"
                      labelName="Email Address"
                      component={TextField}
                      outerClassName="col-50"
                      validate={(value) =>
                        combineValidations(value, [
                          presence,
                          validEmailValidation,
                        ])
                      }
                    />

                    <Field
                      name="phone"
                      labelName="Phone Number"
                      component={TextField}
                      outerClassName="col-50"
                      validate={(value) =>
                        combineValidations(value, [presence])
                      }
                    />

                    <Field
                      name="address"
                      labelName="Address"
                      component={TextField}
                      outerClassName="col-100"
                      validate={(value) =>
                        combineValidations(value, [presence])
                      }
                    />

                    <Field
                      name="aboutMe"
                      labelName="About Me"
                      component={TextField}
                      outerClassName="col-100"
                      validate={(value) =>
                        combineValidations(value, [presence])
                      }
                      type="textarea"
                    />
                  </section>
                  <section className="user-form__section fluid-grid">
                    <div className="user-form__section-title h4 h4--accented">
                      Education
                    </div>
                    <FieldArray name="education">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <>
                              <button
                                className="user-form__actionable user-form__actionable--negative"
                                onClick={() => {
                                  fields.remove(index)
                                }}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                              <Field
                                name={`${name}.name`}
                                labelName="Name"
                                component={TextField}
                                outerClassName="col-100"
                                validate={(value) =>
                                  combineValidations(value, [presence])
                                }
                              />
                              <Field
                                name={`${name}.startDate`}
                                labelName="Date Started"
                                component={TextField}
                                outerClassName="col-50"
                                type="date"
                              />
                              <Field
                                name={`${name}.endDate`}
                                labelName="Date Ended"
                                component={TextField}
                                outerClassName="col-50"
                                type="date"
                              />
                            </>
                          ))}
                          {
                            <button
                              className="user-form__actionable"
                              onClick={() => {
                                fields.push({})
                              }}
                            >
                              Add more education
                            </button>
                          }
                        </>
                      )}
                    </FieldArray>
                  </section>
                  <section className="user-form__section fluid-grid">
                    <div className="user-form__section-title h4 h4--accented">
                      Experience
                    </div>
                    <FieldArray name="experience">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <>
                              <button
                                className="user-form__actionable user-form__actionable--negative"
                                onClick={() => {
                                  fields.remove(index)
                                }}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                              <Field
                                name={`${name}.title`}
                                labelName="Title"
                                component={TextField}
                                outerClassName="col-100"
                                validate={(value) =>
                                  combineValidations(value, [presence])
                                }
                              />
                              <Field
                                name={`${name}.organization`}
                                labelName="Company Name"
                                component={TextField}
                                outerClassName="col-100"
                                validate={(value) =>
                                  combineValidations(value, [presence])
                                }
                              />
                              <Field
                                name={`${name}.location`}
                                labelName="Location"
                                component={TextField}
                                outerClassName="col-100"
                              />
                              <Field
                                name={`${name}.startDate`}
                                labelName="Date Started"
                                component={TextField}
                                outerClassName="col-50"
                                type="date"
                              />
                              <Field
                                name={`${name}.endDate`}
                                labelName="Date Ended"
                                component={TextField}
                                outerClassName="col-50"
                                type="date"
                                placeholder=""
                              />
                            </>
                          ))}
                          {
                            <button
                              className="user-form__actionable"
                              onClick={() => {
                                fields.push({})
                              }}
                            >
                              Add more experience
                            </button>
                          }
                        </>
                      )}
                    </FieldArray>
                  </section>
                  <section className="user-form__section fluid-grid">
                    <div className="user-form__section-title h4 h4--accented">
                      Skills
                    </div>
                    <FieldArray name="skills">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <div
                              className="col-50 fluid-grid"
                              key={`skill-${name}`}
                            >
                              <button
                                className="user-form__actionable user-form__actionable--negative"
                                onClick={() => {
                                  fields.remove(index)
                                }}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </button>
                              <Field
                                name={`${name}.name`}
                                labelName="Name"
                                component={TextField}
                                outerClassName="col-100"
                                validate={(value) =>
                                  combineValidations(value, [presence])
                                }
                              />
                            </div>
                          ))}
                          {
                            <button
                              className="user-form__actionable"
                              onClick={() => {
                                fields.push({})
                              }}
                            >
                              Add another skill
                            </button>
                          }
                        </>
                      )}
                    </FieldArray>
                  </section>
                  <section className="user-form__section fluid-grid">
                    <div className="user-form__section-title h4 h4--accented">
                      URL
                    </div>
                    <div className="fluid-grid col-100 user-form__url-input">
                      <div className="col-60 user-form__url-input-title">
                        https://portfolio-builder-rho.vercel.app/
                      </div>
                      <Field
                        name="portfolioUrlSlug"
                        labelName="URL Identifier"
                        component={TextField}
                        outerClassName="col-40"
                        validate={(value) =>
                          combineValidations(value, [presence, validSlug])
                        }
                      />
                    </div>
                  </section>
                  <section className="user-form__section fluid-grid">
                    <button className="btn btn--accented btn--lg col-100">
                      Create my portfolio!
                    </button>
                  </section>
                </form>
              </>
            )
          }}
        />
        {uploadModalOpen && (
          <Modal
            isOpen={uploadModalOpen}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
            onRequestClose={() => {
              setUploadModalOpen(false)
            }}
            className="upload-resume-modal"
          >
            <FileInput onChange={handleUpload} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default UserForm
