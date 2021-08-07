import { faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { FieldInputProps } from 'react-final-form'

const FileInput = ({
  onChange,
}: {
  onChange: (props: File[]) => Promise<void>
}) => {
  const [uploadState, setUploadState] = useState<'idle' | 'busy'>('idle')
  const onDrop = (acceptedFiles: File[]) => {
    setUploadState('busy')
    onChange(acceptedFiles).then(() => {
      setUploadState('idle')
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  })

  return (
    <div {...getRootProps()} className="uploader">
      {uploadState == 'idle' && (
        <>
          <FontAwesomeIcon
            className="uploader__icon uploader__icon--upload"
            icon={faUpload}
          />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag-n-drop some files here, or click to select files</p>
          )}
        </>
      )}
      {uploadState == 'busy' && (
        <>
          <FontAwesomeIcon
            className="uploader__icon uploader__icon--wait animated spin"
            icon={faSpinner}
          />
          <input {...getInputProps()} />
          <p>Please wait for the upload to finish..</p>
        </>
      )}
    </div>
  )
}

export default FileInput
