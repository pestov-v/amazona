import {inputFilters} from "./filters";
import {inputValidators} from "./validators";

/**
 * Filter fn for input type
 */
export type tInputFilter = (v: string) => string;

/**
 * Input validation obj
 */
export interface iValidatorObj {
  checkFn: (val: string) => boolean;
  /** error message */
  error: string;
}

export interface iBaseInputHookProps {
  value?: string;
  /** filters to be applied to input value before setting state */
  filters?: Array<tInputFilter | keyof typeof inputFilters>;

  /** validators with error messages for input value to be applied after value filtration */
  validators?: Array<iValidatorObj | keyof typeof inputValidators>;

  errors?: string[];

  isValid?: boolean;
  isRequired?: boolean;

  equalTo?: string;

  emptyErrText?: string;
  notEqualErrText?: string;

  validateOnChange?: boolean;

  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
  onChangeCallback?: () => void;

  // todo ?
  onChangeValue?: (val: string) => void;
}

/**
 * Free Typing Input State Controller React hook params
 */
export interface iUseTextInputProps extends iBaseInputHookProps {}
