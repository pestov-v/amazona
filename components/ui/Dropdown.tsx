import { FC, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

type TOption = number | string;
interface IProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  data?: T[];
}
export const Dropdown: FC<IProps<TOption>> = (props) => {
  const { data, value, onChange } = props;

  const [selectedItem, setSelectedItem] = useState(value ?? data[0]);

  const setValue = (option: any) => {
    setSelectedItem(option);
    onChange?.(option);
  };

  const buttonClass = `
    relative w-full rounded-lg
    py-2 pl-3 pr-10 text-center shadow-md dark:shadow-sm dark:shadow-gray-600
    focus:outline-none focus-visible:border-indigo-500
    focus-visible:ring-2 focus-visible:ring-white
    focus-visible:ring-opacity-75 focus-visible:ring-offset-2
    focus-visible:ring-offset-orange-300 sm:text-sm`;
  const optionClass = `
    absolute mt-1 w-full max-h-60 overflow-auto z-10
    rounded-md bg-white py-1 text-base shadow-lg dark:shadow-neutral-900
    ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm
    dark:bg-black   
  `;

  return (
    <Listbox value={selectedItem} onChange={setValue}>
      <div className='relative mt-1 shadow'>
        <Listbox.Button className={buttonClass}>
          <span className='block truncate'>{selectedItem}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className={optionClass}>
            {data.map((item, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative select-none p-2 ${
                    active
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-600 dark:text-amber-100'
                      : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-center dark:text-white ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
