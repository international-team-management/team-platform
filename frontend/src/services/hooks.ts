import { ChangeEvent, useState } from "react"

const initValue = {
  email: undefined,
  password: undefined
}

export const useFormValidation = (
  initialValues = initValue,
  initialErrors = initValue,
  initialIsValid = false
) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [isValid, setIsValid] = useState<any>(initialIsValid);

  console.log(values)

  // TODO: add types for event.target
  const handleChange = (event: ChangeEvent<any>) => {
    const {name, value, validationMessage} = event.target;
    console.log(name, [...value].length, !!validationMessage);

    const isValidValue = () => {
      if ([...value].length > 0 && validationMessage) {
        return true;
      }  else if ([...value].length > 0 && !validationMessage) {
        return false;
      }
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: isValidValue()});
    setIsValid(event.target.closest('form').checkValidity());
  }


  return {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
    handleChange
  }
}
