import React, { useEffect, useState, useCallback } from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import {Menu} from '@headlessui/react';
// import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';

import {sidesCities} from '../../../helpers/utils';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

// hooks
import useOverviewOfRegistered from "../../../hooks/apis/bakery/useOverviewOfRegistered";

const OverviewInvalidGuildCode: React.FC<{}> = () => {

  // states
  const [serviceType, setServiceType] = useState(null) as any;
  const [query, setQuery] = useState<string>("");
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  //   clear: false,
  // }) as any;

  // const [query, setQuery] = useState({
  //   resultReceiptDateFrom: null,
  //   resultReceiptDateTo: null,
  // }) as any;

   // const [showDatePicker, setShowDatePicker] = useState(false);

  // call bakery hook
  const {
    loading, 
    list: dataset, 
    count,
    setCount,
    filteredDataset,
    setFilteredDataset
  } = useOverviewOfRegistered({reportName: "invalidGuildCodeDetail"});

  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
  //     // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
  //     setQuery({
  //       ...query,
  //       resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   }
  //   if (selectedDayRange.clear) {
  //     setQuery({
  //       ...query,
  //       resultReceiptDateFrom: null,
  //       resultReceiptDateTo: null,
  //     });
  //   }
  // }, [selectedDayRange]);


  const filteredList = useCallback(() => {
    let temp = [...dataset];

      if (query && query !== "همه") temp = temp.filter(item => item.province.trim() === query);

      setFilteredDataset(temp);

      // set count of inspection need bakeries
      setCount(temp.length)

  }, 
    [query]);

  useEffect(() => {
      filteredList();
  },[filteredList]);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      لیست واحدهای ثبت شده در سیما که پروانه کسبی معتبر ندارند
      </legend>

      {/* <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8"> */}
      <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
            <Menu
                as="div"
                className="relative z-20 inline-block text-left shadow rounded px-5 py-1 "
              >
                <div>
                  <Menu.Button className="inline-flex justify-between items-center w-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                    {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                    <span className="ml-10 whitespace-nowrap truncate">
                      {serviceType?.name || 'همه'}
                    </span>
                    <DownIcon className="h-2 w-2.5 mr-2" />
                  </Menu.Button>
                </div>
                <Menu.Items className="overflow-y-auto h-40 z-40 absolute left-0 xl:right-0 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {sidesCities.map((value: any, index: any) => {
                      return (
                        // eslint-disable-next-line
                        <Menu.Item key={index}>
                          {({active}) => (
                            <button
                              type="button"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm whitespace-nowrap`}
                              onClick={() => {
                                setServiceType(value);
                                setQuery(value.name);
                              }}
                            >
                              {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                              {value.name}
                            </button>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Menu>
        </div>
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
          {/* {showDatePicker ? (
            <DatePickerModal
              setSelectedDayRange={setSelectedDayRange}
              selectedDayRange={selectedDayRange}
              setShowDatePicker={setShowDatePicker}
              showDatePicker
            />
          ) : null}
          <Calendar
            action={focusFromDate}
            from={selectedDayRange.from}
            to={selectedDayRange.to}
            setSelectedDayRange={setSelectedDayRange}
          /> */}
          
          {/* <div className='inline-flex justify-center'> */}
            <div className='relative z-20 inline-block text-left px-5 py-1 shadow rounded'>
              <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                <span className="mx-3 whitespace-nowrap truncate">
                  <span className="text-gray-500">
                    تعداد ردیف :
                  </span> {count}
                </span>
              </div>
            </div>
            <div className='relative z-20 inline-block text-left shadow rounded px-5 py-1'>
              <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                <span className="mx-3 whitespace-nowrap truncate">
                  <span className="text-gray-500">
                    منبع :
                  </span> سامانه سیما
                </span>
              </div>
            </div>
          </div>
      </div>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {loading ? (
          <div className="p-20">
            <Spinner />
          </div>
        ) : (
          <Table
            dataSet={[...filteredDataset]}
            pagination={{ pageSize: 10, maxPages: 3 }}
            columns={[
              {
                name: 'استان',
                key: 'province',
                className: 'flex justify-start',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start items-center space-x-2 rtl:space-x-reverse">
                    <span className="w-8">
                      {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.
                    </span>
                    <span>{v}</span>
                  </div>
                ),
              },
              {
                name: 'شهر',
                key: 'city',
                render: (v: any) => <span>{v === "NULL" ? '-' : v}</span>,
              },
              {
                name: 'شناسه پروانه سیما',
                key: 'simaId',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شماره ملی',
                key: 'nationalId',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'آدرس',
                key: 'address',
                className: 'flex justify-start',
                render: (v: any) => <span>{v}</span>,
              },
            ]}
            totalItems={(filteredDataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewInvalidGuildCode;
