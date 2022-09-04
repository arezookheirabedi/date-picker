import React, {Fragment, useEffect, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import styled from 'styled-components';

const Icon = styled.span``;
interface IOption {
  label: string;
  value: any;
}
interface IProps {
  options: IOption[];
  queryParams: any;
  placeholder?: any;
  setQueryParams: (v: any) => void;
  objectKey: string;
}

const Select: React.FC<IProps> = props => {
  const {options, setQueryParams, objectKey, queryParams} = props;

  const [selectedObject, setSelectedObject] = useState<IOption>(options[0]);
  useEffect(() => {
    let params = {...queryParams};

    params = {...queryParams, [`${objectKey}`]: selectedObject.value};

    setQueryParams(params);
  }, [selectedObject]);

  return (
    <Listbox value={selectedObject} onChange={setSelectedObject}>
      <div className="relative">
        <Listbox.Button className="relative w-full py-2 pr-3 pl-10 text-xs bg-white text-gray-400 border border-gray-200 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
          <span className="block truncate">
            {selectedObject ? selectedObject.label : 'انتخاب کنید'}
          </span>
          <Icon className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
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
          <Listbox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-xs bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options
              ? options.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    value={option}
                    className={({active}) =>
                      `${
                        active ? 'text-gray-900 bg-gray-100' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-5 pr-4`
                    }
                  >
                    {({selected, active}) => (
                      <>
                        {selected ? (
                          <span
                            className={`${active ? 'text-gray-600' : 'text-gray-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        ) : null}
                        <span
                          className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                        >
                          {option.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))
              : ''}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
