import { useState, useCallback } from "react"
import isEmail from "validator/lib/isEmail";
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;
    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя пользователя может содержать кириллицу, латиницу, пробел и дефис.')
    } else {
      input.setCustomValidity('');
    }
    if (name === 'email') {
      if (!isEmail(value)) {
          input.setCustomValidity('Некорректый email');
      } else {
          input.setCustomValidity('');
      }
    }
    setValues({ ...values, [name]: value }); 
    setErrors({ ...errors, [name]: input.validationMessage }); 
    setIsValid(input.closest('form').checkValidity()); // 
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { 
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
}