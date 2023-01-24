import { tInputFilter } from './inputsInterfaces';

/**
 * Function executes value filtration
 * @param {string} val - string to filter
 * @param {tInputFilter[]} filters - filtering fns array
 * @return {string} - filtered value
 */
export const applyFilters = (val: string, filters: tInputFilter[]) => {
  let filteredVal = val;
  filters.forEach((filter) => (filteredVal = filter(filteredVal)));
  return filteredVal;
};

export const prepareFiltersArr = (
  filters: Array<tInputFilter | keyof typeof inputFilters>
): tInputFilter[] => {
  const filtersArr: tInputFilter[] = [];
  filters.forEach((item) => {
    const filter = typeof item === 'string' ? inputFilters[item] : [item];
    filtersArr.push(...filter);
  });
  return filtersArr;
};

export const cutAndOnlyNumbers = ({
  value,
  maxLength,
}: {
  value: string;
  maxLength: number;
}) => {
  let digitsValue = value.replace(/\D/g, '');
  if (maxLength) {
    return digitsValue.slice(0, maxLength);
  }
  return digitsValue;
};

export const nameFilter = (value: string): string => {
  return value.replace(/[^\p{L}\s'`-]/gmu, '').replace(/\s\s+/gm, ' ');
};

export const emailFilter = (value: string): string => {
  return value.replace(/[<>()[\]\\{},;:"\s]/gm, '');
};

export const phoneFilter = <T>(str: T) => {
  if (typeof str !== 'string') return false;
  let x: any = str
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})/);
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
};

export const numbersFilter = (value: string) => {
  return value.replace(/[^0-9]+/gi, '').slice(0, 6);
};

export const inputFilters = {
  name: [nameFilter],
  first_name: [nameFilter],
  last_name: [nameFilter],
  email: [emailFilter],
  phone: [phoneFilter],
  numbers: [numbersFilter],
};
