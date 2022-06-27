import React, {useState} from 'react';

// import {Menu} from '@headlessui/react';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
// import calendar from '../../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import {transportationTypes} from '../../../helpers/utils';
// import transportService from '../../../services/transport.service';
import Spinner from '../../Spinner';
import SearchableSingleSelect from "../../SearchableSingleSelect";
import DatepickerQuery from "../../DatepickerQuery";
import useGetOverviewOfPatients from "../../../hooks/apis/useGetOverviewOfPatients";

const {Line} = Charts;

const OverviewPublicPatients = () => {
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false
  }) as any;

  const [query, setQuery] = useState({
    // status: 'POSITIVE',
    timeBoxType: 'DAILY',
    from: null,
    to: null,
    category: 'serviceType',
    categoryValue: null,
    tag: 'transport',
  });

  const {data, loading, error: errorMessage} = useGetOverviewOfPatients(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی مبتلایان در حمل و نقل عمومی</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            <SearchableSingleSelect
              objectKey="serviceType"
              placeholder="کل حمل و نقل"
              tag="transport"
              category="serviceType"
              setQueryParams={setQuery}
              queryParams={query}
            />
            {/* <Menu */}
            {/*  as="div" */}
            {/*  className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 " */}
            {/* > */}
            {/*  <div> */}
            {/*    <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"> */}
            {/*      /!* <div className="flex items-center flex-row-reverse xl:flex-row"> *!/ */}
            {/*      /!* <img src={avatar} alt="z" className="w-5 h-5" /> *!/ */}
            {/*      <span className="ml-10 whitespace-nowrap truncate"> */}
            {/*        {serviceType?.name || 'کل حمل و نقل'} */}
            {/*      </span> */}
            {/*      <DownIcon className="h-2 w-2.5 mr-2" /> */}
            {/*    </Menu.Button> */}
            {/*  </div> */}
            {/*  <Menu.Items className="z-40 absolute left-0 xl:right-0 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
            {/*    <div className="px-1 py-1 "> */}
            {/*      {transportationTypes.map((value: any, index: any) => { */}
            {/*        return ( */}
            {/*          // eslint-disable-next-line */}
            {/*          <Menu.Item key={index}> */}
            {/*            {({active}) => ( */}
            {/*              <button */}
            {/*                type="button" */}
            {/*                className={`${ */}
            {/*                  active ? 'bg-gray-100' : '' */}
            {/*                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm whitespace-nowrap`} */}
            {/*                onClick={() => { */}
            {/*                  setServiceType(value); */}
            {/*                  setQuery({ */}
            {/*                    ...query, */}
            {/*                    categoryValue: value.enName, */}
            {/*                  }); */}
            {/*                }} */}
            {/*              > */}
            {/*                /!* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> *!/ */}
            {/*                {value.name} */}
            {/*              </button> */}
            {/*            )} */}
            {/*          </Menu.Item> */}
            {/*        ); */}
            {/*      })} */}
            {/*    </div> */}
            {/*  </Menu.Items> */}
            {/* </Menu> */}
            <div className="flex align-center justify-between mr-8">
              <DatepickerQuery query={query} setQuery={setQuery}/>
            </div>
          </div>

          <RangeDateSliderFilter
            changeType={v =>
              setQuery({
                ...query,
                timeBoxType: v,
              })
            }
            selectedType={query.timeBoxType}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />
        </div>
        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && data.length > 0 && !errorMessage && <Line data={data} showInLegends={false}/>}
        {data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPublicPatients;
