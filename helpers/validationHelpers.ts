const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

type errorMessage = string | undefined

export const presence = (value: unknown): errorMessage => {
  if (!value) return 'cannot be blank'
}

export const validEmailValidation = (value: unknown): errorMessage => {
  if (typeof value == 'string' && !validateEmail(value))
    return 'must be a valid email'
}

export const validPhoneValidation = (value: unknown) => {
  if (value && typeof value == 'string') {
    import('libphonenumber-js').then(({ parsePhoneNumberFromString }) => {
      const parsedPhoneNumber = parsePhoneNumberFromString(value)
      if (!parsedPhoneNumber?.isPossible() || !parsedPhoneNumber.isValid()) {
        return 'must be a valid phone number'
      }
    })
  }
}

export const firstAndLastNameValidation = (value: unknown): errorMessage => {
  if (typeof value == 'string' && value?.split(' ')?.length < 2)
    return 'must contain first and last name'
}

export const validSlug = (value: any): errorMessage => {
  if (value && typeof value == 'string') {
    const validSlugRegex = new RegExp('^[a-zA-Z0-9-_]*$')
    const valueMatchesRegex = value.match(validSlugRegex)

    if (!!!valueMatchesRegex)
      return 'can only contain alphabets, numbers, dashes (-) and underscores(_)'

    const invalidSequences = ['--', '-_', '_-', '__']
    const invalidSequenceErrors: string[] = []

    invalidSequences.forEach((sequence) => {
      if (value.includes(sequence))
        invalidSequenceErrors.push(`invalid character sequence ${sequence}`)
    })

    if (invalidSequenceErrors.length > 0) return invalidSequenceErrors[0]
  }
}

export const combineValidations = (
  value: unknown,
  validationFns: Array<(value: unknown) => string | void>
): string[] | undefined => {
  const errors: string[] | void = []
  validationFns.forEach((fn) => {
    const validationResult = fn(value)
    if (validationResult) {
      errors.push(validationResult)
    }
  })

  return errors
}
