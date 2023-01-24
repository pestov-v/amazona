import { iValidatorObj } from './inputsInterfaces';

export const prepareValidatorsArr = (
  validators: Array<iValidatorObj | keyof typeof inputValidators>
): iValidatorObj[] => {
  const validatorsArr: iValidatorObj[] = [];
  validators.forEach((item) => {
    const validator = typeof item === 'string' ? inputValidators[item] : item;
    validatorsArr.push(validator);
  });
  return validatorsArr;
};

/**
 * Function validates string
 * @param {string} val - string to validate
 * @param {iValidatorObj[]} validators - validation fns array
 * @return {string[]} - validation errors array
 */
export const applyValidators = (
  val: string,
  validators: iValidatorObj[]
): string[] => {
  const errors: string[] = [];

  for (let i = 0; i < validators.length; i++) {
    if (!validators[i].checkFn(val)) {
      errors.push(validators[i].error);
      break;
    }
  }
  return errors;
};

export const phoneValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  // .replace(/[^\(\)\s\-\.\+\d]/g, "").replace(/\s\s+/g, " ")
  const newPhone = value.replace(/\D/g, '');
  return newPhone.length > 8;
};

export const nameValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
  const twoSpacesRx = new RegExp(/\s\s+/gm);
  return (
    !lettersRx.test(value) && !twoSpacesRx.test(value) && value.length >= 2
  );
};

export const emailValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const re = new RegExp(
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return re.test(value);
};
//
export const passwordValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const re = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/g
  );
  return re.test(value);
};

export const urlValidation = <T>(value: T) => {
  if (typeof value !== 'string') return false;
  const str = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
  );
  return str.test(value);
};

export const minLength3Validation = (val: string) => val.length >= 3;

export const errorsMessages = {
  EMAIL: 'Please enter a valid email',
  PASSWORD:
    // eslint-disable-next-line max-len
    'Password must contain at least 8 characters, one uppercase letter and at least one number or special character',
  PASSWORD_NOT_MATCH: 'Password does not match',
  NAME: 'Please enter a valid name',
  PHONE: 'Please enter a valid phone number',
  WEBSITE: 'Please enter a valid website address',
  MIN_3: 'Min length 3 characters',
};

export const inputValidators = {
  name: { checkFn: nameValidation, error: errorsMessages.NAME },
  email: { checkFn: emailValidation, error: errorsMessages.EMAIL },
  password: { checkFn: passwordValidation, error: errorsMessages.PASSWORD },
  phone: { checkFn: phoneValidation, error: errorsMessages.PHONE },
  website: { checkFn: urlValidation, error: errorsMessages.WEBSITE },
  min_3: { checkFn: minLength3Validation, error: errorsMessages.MIN_3 },
};
