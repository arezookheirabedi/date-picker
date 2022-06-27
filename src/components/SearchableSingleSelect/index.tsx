/* eslint-disable @typescript-eslint/no-shadow */

import React, {Fragment, useEffect, useState} from 'react';
import {Combobox, Transition} from '@headlessui/react';
import recruitmentServices from 'src/services/recruitment.service';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import { cancelTokenSource, msgRequestCanceled } from 'src/helpers/utils';
// import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';

interface IProps {
  tag?: string;
  category?: string;
  endPoint?: any;
  queryParams: any;
  placeholder?: any;
  setQueryParams: (v: any) => void;
  objectKey: string;
}

const SearchableSingleSelect: React.FC<IProps> = ({
  placeholder,
  tag,
  category,
  endPoint,
  setQueryParams,
  queryParams,
  objectKey,
}) => {
  const [selected, setSelected] = useState<{key: number | string | null; value: string}>();
  const [query, setQuery] = useState('');

  const [tags, setTags] = useState<any[]>([{key: null, value: placeholder}]);

  const cancelTokenTag = cancelTokenSource();
  const cancelTokenendPoint = cancelTokenSource();

  function cancelRequestTag() {
    cancelTokenTag.cancel(msgRequestCanceled);
  }
  function cancelRequestEndPoint() {
    cancelTokenendPoint.cancel(msgRequestCanceled);
  }
  const enpointFetcher = async () => {
    try {
      const res = await endPoint({},{cancelToken:cancelTokenendPoint.token});
      const newData = [...tags, ...res.data];
      setTags([...newData]);
    } catch (error: any) {
      console.log(error);
    }
  };
  const otherFetcher = async () => {
    try {
      const res = await recruitmentServices.tags({tag, category},{cancelToken:cancelTokenTag.token});
      const newData = [...tags, ...res.data];
      setTags([...newData]);
    } catch (error: any) {
      console.log(error);
    }
  };
  const fetcher = () => {
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      if (endPoint)
        enpointFetcher()
          .then(response => resolve(response))
          .catch(error => reject(error));
      else
        otherFetcher()
          .then(response => resolve(response))
          .catch(error => reject(error));
    });
  };

  useEffect(() => {
    fetcher();
    return () => {
      cancelRequestTag();
      cancelRequestEndPoint()
      setTags([]);
    };
  }, []);
  const filteredTags =
    query === ''
      ? tags
      : tags.filter(tag => {
          return tag.value.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    let params = {...queryParams};
    if (selected) {
      params = {...queryParams, [`${objectKey}`]: selected.key};
      setQueryParams(params);
    }

  }, [selected]);

  return (
    <div className="flex  flex-col space-y-3 items-center justify-center">
      <div className="w-72 relative">
        <Combobox value={selected} onChange={setSelected}>
          <div className=" single-select">
            <div className="flex items-center rtl:flex-row-reverse py-2 pl-2 pr-10 rtl:pl-10 rtl:pr-2 relative w-full shadow cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                placeholder={selected ? '' : `${placeholder}`}
                className="inline-block border-none text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
                displayValue={(tag: any) => (tag ? tag.value : '')}
                onChange={event => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 left-auto rtl:left-0 rtl:right-auto flex items-center pr-2 rtl:pl-2 rtl:pr-0">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className=" absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredTags.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    موردی یافت نشد
                  </div>
                ) : (
                  filteredTags
                    .slice(0, filteredTags.length > 20 ? 20 : filteredTags.length)
                    ?.map(tag => (
                      <Combobox.Option
                        key={tag.key}
                        className={({active}) =>
                          `relative cursor-default select-none rtl:text-right py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 ${
                            active ? 'active-bg-color text-white' : 'text-gray-900'
                          }`
                        }
                        value={tag}
                      >
                        {({selected, active}) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {tag.value}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3 rtl:pl-0 ${
                                  active ? 'text-white' : 'chek-color'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};
export default SearchableSingleSelect;
