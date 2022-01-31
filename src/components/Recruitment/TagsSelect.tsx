import React from 'react';
import {Menu} from '@headlessui/react';
import hcsService from 'src/services/hcs.service';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';

interface ITagsSelect {
  organization: string;
  queryParams: any;
  setQueryParams: (v: any) => void;
}

const TagsSelect = ({organization, setQueryParams, queryParams}: ITagsSelect) => {
  const [serviceType, setServiceType] = React.useState<any>();
  const [tags, setTags] = React.useState<any[]>([]);

  const fetcher = async () => {
    try {
      const res = await hcsService.tags({organization});
      console.log(res);
      setTags([...res.data]);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetcher();
  }, []);

  React.useEffect(() => {
    let params = {...queryParams};

    // eslint-disable-next-line
    if (serviceType) {
      params = {...queryParams, tags: [`${serviceType}`]};
    } else {
      params = {...queryParams, tags: []};
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
            {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
            {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
            <span className="ml-10 whitespace-nowrap truncate">{serviceType || 'کل کارکنان'}</span>
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
                  <span className="truncate">کل کارکنان</span>
                </button>
              )}
            </Menu.Item>
            {tags.map((value: any, index: any) => {
              // console.log(value);
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
                        setServiceType(value);
                        //   setQueryParams({
                        //     ...queryParams,
                        //     tags: index !== 0 ? [value].join(',') : '',
                        //   });
                      }}
                    >
                      <span className="truncate">
                        {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                        {value}
                      </span>
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
