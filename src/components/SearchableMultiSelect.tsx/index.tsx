/* eslint-disable @typescript-eslint/no-shadow */

import React, {Fragment, useEffect, useState} from 'react';
import {Combobox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
// import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
interface ITag {
  key: number | string | null;
  value: string;
}
const SearchableMultiSelect: React.FC<{endPoint: any}> = ({endPoint}) => {
  const [selected, setSelected] = useState<Array<ITag>>([]);
  const [query, setQuery] = useState('');

  const [tags, setTags] = useState<any[]>([]);

  const cancelTokenTag = cancelTokenSource();
  const cancelTokenendPoint = cancelTokenSource();

  function cancelRequestTag() {
    cancelTokenTag.cancel(msgRequestCanceled);
  }
  function cancelRequestEndPoint() {
    cancelTokenendPoint.cancel(msgRequestCanceled);
  }
  const fetcher = async () => {
    try {
      const res = await endPoint(
        {pageNumber: 0, pageSize: 1000},
        {cancelToken: cancelTokenendPoint.token}
      );
      const newData = res.data.content.map((roule: any) => ({key: roule.id, value: roule.name}));
      setTags([...newData]);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcher();
    return () => {
      cancelRequestTag();
      cancelRequestEndPoint();
      setTags([]);
    };
  }, []);
  const filteredTags =
    query === ''
      ? tags
      : tags.filter(tag => {
          return tag.value.toLowerCase().includes(query.toLowerCase());
        });

  const handleDeselectItem = (tag: ITag) => {
    const personIndex = selected.findIndex(i => i.key === tag.key);
    const newList: Array<ITag> = selected.filter(p => {
      return p.key !== selected[personIndex].key;
    });
    setSelected([...newList]);
  };
  return (
    <div className="flex  flex-col items-center justify-center space-y-3">
      <div className="relative w-72">
        <Combobox value={selected} onChange={setSelected} multiple>
          <div className=" single-select">
            <div
              className="focus:outline-none relative flex w-full cursor-default items-center overflow-hidden rounded-lg bg-white py-2 pl-2 pr-10 text-left
             shadow focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 rtl:flex-row-reverse rtl:pl-10 rtl:pr-2 sm:text-sm"
            >
              {selected && selected.length ? (
                <ul>
                  {selected.map(tag => {
                    return (
                      <li
                        className="bg-gray-200 text-gray-500 rounded text-xs border border-gray-300 flex items-center space-x-1 divide-x divide-gray-300"
                        key={tag.key}
                      >
                        <span className="py-0.5 px-1">{tag.key}</span>
                        <button
                          className="p-0.5 hover:bg-red-100"
                          type="button"
                          onClick={() => handleDeselectItem(tag)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transform rotate-45"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
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
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              <Combobox.Input
                placeholder={selected && selected.length > 0 ? '' : 'انتخاب کنید'}
                className="focus:outline-none inline-block border-none pr-1 text-sm leading-5 text-gray-900 focus:ring-0"
                // displayValue={(tag: any) => (tag ? tag.value : '')}
                onChange={event => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 left-auto flex items-center pr-2 rtl:left-0 rtl:right-auto rtl:pl-2 rtl:pr-0">
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
              <Combobox.Options className=" focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
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
                          `relative cursor-default select-none py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 rtl:text-right ${
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
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 rtl:right-0 rtl:left-auto rtl:pr-3 rtl:pl-0 ${
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
export default SearchableMultiSelect;
