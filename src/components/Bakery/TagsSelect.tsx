import React from 'react';
import axios from 'axios';
import {Menu} from '@headlessui/react';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';

interface ITagsSelect {
  // tag?: string;
  // category?: string;
  queryParams: any;
  // eslint-disable-next-line
  placeholder?: any;
  setQueryParams: (v: any) => void;
}

const TagsSelect = ({
  // tag = '',
  // category = '',
  placeholder = '',
  setQueryParams,
  queryParams,
}: ITagsSelect) => {
  const [serviceType, setServiceType] = React.useState<any>();
  const [tags, setTags] = React.useState<any[]>([
    {key: 'بربری', value: 'بربری'},
    {key: 'سنگک', value: 'سنگک'},
    {key: 'لواش', value: 'لواش'},
    {key: 'تافتون', value: 'تافتون'},
    {key: 'نان روغنی', value: 'نان روغنی'},
    {key: 'شیرینی پزی و قنادی', value: 'شیرینی پزی و قنادی'},
  ]);

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const fetcher = async () => {
    try {
      // const res = await recruitmentServices.tags({tag, category}, {cancelToken: source.token});
      // setTags([...res.data]);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetcher();

    return () => {
      source.cancel('Operation canceled by the user.');
      setTags([]);
    };
  }, []);

  React.useEffect(() => {
    let params = {...queryParams};

    if (serviceType) {
      params = {...queryParams, categoryValue: serviceType};
    } else {
      params = {...queryParams, categoryValue: null};
    }

    setQueryParams(params);
  }, [serviceType]);

  return (
    <>
      <Menu
        as="div"
        className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
      >
        <div>
          <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="ml-10 whitespace-nowrap truncate">
              {serviceType ? serviceType.replace(/#grade#/g, '') : placeholder}
            </span>
            <DownIcon className="h-2 w-2.5 mr-2" />
          </Menu.Button>
        </div>

        <Menu.Items
          style={{width: '320px'}}
          className="z-40 max-h-60 overflow-y-auto absolute left-0 xl:right-0 max-w-lg mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({active}) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-xs text-left rtl:text-right truncate`}
                  onClick={() => {
                    setServiceType('');
                  }}
                >
                  <span className="truncate">{placeholder}</span>
                </button>
              )}
            </Menu.Item>
            {tags.map((value: any, index: any) => {
              return (
                // eslint-disable-next-line
                <Menu.Item key={index}>
                  {({active}) => (
                    <button
                      type="button"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-xs text-left rtl:text-right truncate`}
                      onClick={() => {
                        setServiceType(value.key);
                      }}
                    >
                      <span className="truncate">{value.value}</span>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
};

export default TagsSelect;
