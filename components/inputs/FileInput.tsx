import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
// import { FieldInputProps } from 'react-final-form'

const FileInput = ({ onChange }: { onChange: (props: FileList) => void }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange(acceptedFiles)
    },
    [onChange]
  )
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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag-n-drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default FileInput
