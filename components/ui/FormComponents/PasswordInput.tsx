import { FC, InputHTMLAttributes, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface IProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  errors?: string[];
  label?: string;
  textarea?: boolean;
}
export const PasswordInput: FC<IProps> = (props) => {
  const { errors, label, ...rest } = props;

  const [showPaswword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const isErrors = !!errors?.length;
  const errorClass = isErrors
    ? 'border-red-600'
    : 'mb-[2.1rem] border-gray-400 focus:border-gray-700 active:border-gray-700';
  const inputClass = `w-full py-2 pl-3 pr-10 border-2 rounded-md
      outline-none text-black bg-white ${errorClass}`;

  return (
    <label className='relative block'>
      {label && <span className='text-base font-medium'>{label}</span>}

      <input
        className={inputClass}
        type={showPaswword ? 'text' : 'password'}
        {...rest}
      />

      {
        <button
          className={`absolute right-2 p-1 ${
            label ? 'top-[1.9rem]' : 'top-[0.5rem]'
          }`}
          onClick={togglePassword}
          type='button'
        >
          {showPaswword ? (
            <EyeSlashIcon className='h-6 w-6' color='#1f1e1c' />
          ) : (
            <EyeIcon className='h-6 w-6' color='#1f1e1c' />
          )}
        </button>
      }

      {isErrors && (
        <p className='text-red-600 mt-[0.1rem] text-sm leading-4'>
          {errors.join(' ')}
        </p>
      )}
    </label>
  );
};
