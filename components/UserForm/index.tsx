import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import {
  combineValidations,
  presence,
  validEmailValidation,
} from '../../helpers/validationHelpers'
import TextField from '../inputs/TextField'
import Modal from 'react-modal'
import FileInput from '../inputs/FileInput'

const UserForm = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(true)
  const handleSubmit = (values: unknown) => {
    console.log(values)
  }

  return (
    <>
      <div className="user-form">
        <div className="user-form__title h3">User Details</div>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
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
                    validate={(value) => combineValidations(value, [presence])}
                  />

                  <Field
                    name="lastName"
                    labelName="Last Name"
                    component={TextField}
                    outerClassName="col-50"
                    validate={(value) => combineValidations(value, [presence])}
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
                    validate={(value) => combineValidations(value, [presence])}
                  />
                </section>
              </form>
            </>
          )}
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
            <FileInput
              onChange={(files: FileList) => {
                console.log('file', files)
              }}
            />
          </Modal>
        )}
      </div>
    </>
  )
}

export default UserForm
