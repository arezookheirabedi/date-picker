/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import styled from 'styled-components';
import Empty from '../Empty';

const Icon = styled.span``;

interface IOption {
  label: string | number | any;
  value: any;
  id: any;
}

interface IProps extends React.HTMLProps<HTMLSelectElement> {
  options?: IOption[];
  clearable?: boolean;
  loading?: boolean;
  control?: any;
  error?: any;
  disabledText?: any;
  defaultSelected?: any;
  icons?: any;
  placeholder?: string;
  // ref?: RefObject<HTMLSelectElement>;
}

const Select: React.FC<IProps> = props => {
  const {
    options,
    clearable,
    defaultSelected,
    selected,
    icons = {
      default: '',
      selected: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    loading = false,
    placeholder,
    error,
    ...rest
  } = props;
  const ref = useRef<HTMLSelectElement>(null);
  const [selectedObject, setSelectedObject] = useState<IOption | undefined | null>(undefined);

  useEffect(() => {
    // eslint-disable-next-line no-var
    var ev2 = new Event('change', {bubbles: selectedObject?.value || null});
    ref?.current?.dispatchEvent(ev2);
  }, [selectedObject]);

  useEffect(() => {
    setSelectedObject(options?.find(x => x.value === defaultSelected));
  }, [defaultSelected]);

  useEffect(() => {
    if (selected === null) setSelectedObject(null);
  }, [selected]);

  return (
    <>
      <select className="hidden" value={selectedObject?.value || ''} ref={ref} {...rest}>
        {options?.map(option => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <option key={option.id} value={option.value} />
        ))}
      </select>
      <Listbox value={selectedObject} onChange={setSelectedObject} disabled={rest.disabled}>
        <div className="relative">
          {/* <Listbox.Button className="relative w-full py-2 pr-3 pl-10 text-xs bg-white text-gray-400 border border-gray-200 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500"> */}
          {/* // focus:ring-1 focus:ring-sky-500 focus:border-sky-500  */}
          <Listbox.Button
            className={`
          relative block w-full rounded-full bg-white 
          px-3 py-2 shadow-lg 
          focus:outline-none disabled:bg-gray-50 sm:text-sm
          ${error! ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500' : ''}
           `}
          >
            <span
              className={`block truncate text-left rtl:text-right ${
                selectedObject ? '' : 'text-gray-400'
              }`}
            >
              {rest.disabled && rest.disabledText
                ? rest.disabledText
                : selectedObject
                ? selectedObject.label
                : placeholder || 'انتخاب کنید'}
            </span>
            <Icon className="pointer-events-none absolute inset-y-0 right-0 left-auto flex items-center pl-0 pr-2 rtl:left-0 rtl:right-auto rtl:pl-2 rtl:pr-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Icon>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {loading ? (
                'در حال بارگذاری'
              ) : (
                <>
                  {options && options.length ? (
                    options.map((option, i) => (
                      <Listbox.Option
                        key={i}
                        value={option}
                        className={({active}) =>
                          `${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } relative cursor-default select-none py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10`
                        }
                      >
                        {({selected, active}) => (
                          <>
                            <span
                              className={`${
                                selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                            >
                              {option.label}
                            </span>
                            <span className="absolute inset-y-0 left-0 right-auto flex items-center pr-0 pl-3 text-gray-600 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3">
                              {selected ? icons.default : icons.selected}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  ) : (
                    <div className="pb-3">
                      <Empty />
                    </div>
                  )}
                </>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default Select;
