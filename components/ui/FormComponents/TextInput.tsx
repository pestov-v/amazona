import { FC, InputHTMLAttributes } from 'react';

interface IProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  errors?: string[];
  label?: string;
  textarea?: boolean;
}
export const TextInput: FC<IProps> = (props) => {
  const { errors, label, textarea, ...rest } = props;

  const isErrors = !!errors?.length;
  const errorClass = isErrors
    ? 'border-red-600'
    : 'mb-[1.35rem] border-gray-400 focus:border-gray-700 active:border-gray-700';
  const inputClass = `w-full px-3 py-2 border-2 rounded-md
      outline-none text-black bg-white ${errorClass}`;

  return (
    <label>
      {label && <span className='text-base font-medium'>{label}</span>}

      {textarea ? (
        <textarea
          className={`${inputClass} resize-y min-h-[120px] max-h-80`}
          {...rest}
        />
      ) : (
        <input className={inputClass} type={props?.type ?? 'text'} {...rest} />
      )}

      {isErrors && (
        <p className='text-red-600 mt-[0.1rem] text-sm'>{errors.join(' ')}</p>
      )}
    </label>
  );
};
