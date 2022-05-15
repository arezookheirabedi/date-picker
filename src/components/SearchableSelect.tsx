/* eslint-disable @typescript-eslint/no-shadow */
import {Fragment, useEffect, useState} from 'react';
import {Combobox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import axios from 'axios';
import recruitmentServices from 'src/services/recruitment.service';

export interface ISelect {
  key: string | null;
  value: string;
}

// interface IProps {
//   tag: string;
//   category: string;
//   placeholder?: any;
//   // queryParams: any;
//   // eslint-disable-next-line
//   // setQueryParams: (v: any) => void;
// }
const SearchableSelect: React.FC<{
  tag: string;
  category: string;
  placeholder: string;
  setQueryParams: (v: any) => void;
  queryParams: any;
}> = ({tag, category, queryParams, placeholder, setQueryParams}) => {
  const [selected, setSelected] = useState({key: null, value: placeholder});
  const [query, setQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<any[]>([{key: null, value: placeholder}]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const fetcher = async () => {
    try {
      const res = await recruitmentServices.tags({tag, category}, {cancelToken: source.token});
      const data = [...tags, ...res.data];
      setTags([...data]);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  useEffect(() => {
    fetcher();
    return () => {
      source.cancel('Operation canceled by the user.');
      setTags([]);
    };
  }, []);
  useEffect(() => {
    let params = {...queryParams};

    // if (selected) {
    //   params = {...queryParams, categoryValue:selected};
    // } else {
    //   params = {...queryParams, categoryValue: null};
    // }
    params = {...queryParams, categoryValue: selected.key};
    setQueryParams(params);
  }, [selected]);
  const filteredTags =
    query === ''
      ? tags
      : tags.filter((tag: ISelect) =>
          tag.value
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="fixed relative z-10 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: any) => person.value}
              onChange={(event: any) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredTags.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  موردی یافت نشد.
                </div>
              ) : (
                filteredTags.map((tag: ISelect) => (
                  <Combobox.Option
                    key={tag.key}
                    className={({active}: any) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={tag}
                  >
                    {({selected, active}: any) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {tag.value}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
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
  );
};
export default SearchableSelect;
