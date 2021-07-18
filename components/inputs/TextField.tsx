import { useEffect, useState } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Tooltip } from 'react-tippy'
import { useTheme } from '../../hoc/ThemeProvider'

const TextField = ({
  input,
  placeholder,
  labelName,
  helpText,
  bottomText,
  className,
  disabled,
  inputAppendText,
  meta: { error, touched },
  errorHandlerErrors,
}: FieldRenderProps<string, HTMLElement>): JSX.Element => {
  const [visible, setVisibility] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { theme } = useTheme()!

  const showError = touched && error?.length > 0
  //  ||
  // (errorHandlerErrors?.[input.name] && !dirtySinceLastSubmit)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    if (!input.value) {
      setIsFocused(false)
    }
  }
  useEffect(() => {
    if (input.value) {
      setIsFocused(true)
    }
  }, [input.value])
  return (
    <Tooltip
      // position="left"
      // disabled={showError}
      open={showError}
      size="small"
      arrow
      theme={theme}
      html={
        <div className="error-message">
          {showError &&
            (error || errorHandlerErrors?.[input?.name]).map(
              (msg: string, index: number) => {
                return <span key={index}>{msg}</span>
              }
            )}
        </div>
      }
    >
      <div
        className={`input-group ${showError ? 'has-errors ' : ''}${
          className || ''
        }${isFocused ? 'input-group--focused' : ''}`}
      >
        <label className={`${className}__label`} htmlFor={input.name}>
          {labelName && (
            <div className={`${className}__label-text`}>
              {labelName}
              {helpText && <div className="help-text">{helpText}</div>}
            </div>
          )}
          <div className="input-group-row">
            <input
              {...input}
              disabled={disabled}
              id={input.name}
              className={`${input.type}-input ${className}__input ${
                inputAppendText ? ' with-append-text' : ''
              }`}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type={
                input.type == 'password'
                  ? visible
                    ? `text`
                    : `password`
                  : input.type
              }
            />
            {inputAppendText && (
              <div className="input-append">
                <span className="input-append-text">{inputAppendText}</span>
              </div>
            )}
            {input.type == 'password' && (
              <div
                className={`icon-eye-${
                  visible ? 'opened' : 'closed'
                } trigger-password-visibility`}
                onClick={() => setVisibility(!visible)}
              />
            )}
          </div>
          {bottomText && <div className="bottom-text">{bottomText}</div>}
        </label>
      </div>
    </Tooltip>
  )
}
export default TextField
