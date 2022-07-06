import React, { useEffect, useState, useCallback } from 'react';

// @ts-ignore
// import moment from 'moment-jalaali';
import {Menu} from '@headlessui/react';
import ButtonToggle from '../../Form/ButtonToggle';
// import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';

import {sidesCities} from '../../../helpers/utils';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

// images
import chartBoxIcon from '../../../assets/images/icons/chart-box.svg';
import chartBoxActiveIcon from '../../../assets/images/icons/chart-box-active.svg';
import extortionIcon from '../../../assets/images/icons/extortion.svg';
import extortionActiveIcon from '../../../assets/images/icons/extortion-active.svg';
import clockIcon from '../../../assets/images/icons/clock.svg';
import clockActiveIcon from '../../../assets/images/icons/clock-active.svg';
import inactivityIcon from '../../../assets/images/icons/inactivity.svg';
import inactivityEnableIcon from '../../../assets/images/icons/inactivity-enable.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusualTransaction.svg';
import unusualTransactionEnableIcon from '../../../assets/images/icons/unusualTransaction-enable.svg';

// hooks
import useOverviewOfAudit from "../../../hooks/apis/bakery/useOverviewOfAudit";

const OverviewAudit: React.FC<{}> = () => {

  // call bakery hook
  const {loading, list: dataset, count, setCount, filteredDataset, setFilteredDataset} = useOverviewOfAudit();

  // states
  const [flourQuota, setFlourQuota] = useState<any>(false);
  const [isExtortion, setIsExtortion] = useState<any>(false);
  const [workTime, setworkTime] = useState<any>(false);
  const [serviceType, setServiceType] = useState(null) as any;
  const [query, setQuery] = useState<string>("");
  const [bakeryWithoutTransaction, setBakeryWithoutTransaction] = useState<any>(false);
  const [unusualTransaction, setUnusualTransaction] = useState<any>(false);
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
      
      if (isExtortion) temp = temp.filter(item => item.isExtortion === isExtortion);
      if (workTime) temp = temp.filter(item => item.workTime === workTime);
      if (flourQuota) temp = temp.filter(item => item.flourQuota === flourQuota);
      if (bakeryWithoutTransaction) temp = temp.filter(item => item.bakeryWithoutTransaction === bakeryWithoutTransaction);
      if (unusualTransaction) temp = temp.filter(item => item.unusualTransaction === unusualTransaction);
      if (query && query !== "همه") temp = temp.filter(item => item.province.trim() === query);

      setFilteredDataset(temp);

      // set count of inspection need bakeries
      setCount(temp.length)

  }, 
    [isExtortion, workTime, flourQuota, 
    bakeryWithoutTransaction, unusualTransaction, query
    ]);

  useEffect(() => {
      filteredList();
  },[filteredList]);
  
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به لیست واحد‌هایی که نیاز به بازرسی دارند
      </legend>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="overTime"
          title="مشکوک به تخلف از ساعت فعالیت"
          selected={workTime}
          disabled={loading}
          onChange={setworkTime}
          defaultIcon={clockIcon}
          activeIcon={clockActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="flourQuota"
          title="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
          selected={flourQuota}
          disabled={loading}
          onChange={setFlourQuota}
          defaultIcon={chartBoxIcon}
          activeIcon={chartBoxActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="isExtortion"
          title="مشکوک به گران فروشی"
          selected={isExtortion}
          disabled={loading}
          onChange={setIsExtortion}
          defaultIcon={extortionIcon}
          activeIcon={extortionActiveIcon}
          showCheckedIcon
        />
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
            <ButtonToggle
                name="inActivity"
                title="مشکوک به عدم فعالیت"
                selected={bakeryWithoutTransaction}
                onChange={setBakeryWithoutTransaction}
                defaultIcon={inactivityIcon}
                activeIcon={inactivityEnableIcon}
                showCheckedIcon
              />
            <ButtonToggle
              name="unusualTransaction"
              title="مشکوک به تراکنش‌های غیر عادی"
              selected={unusualTransaction}
              onChange={setUnusualTransaction}
              defaultIcon={unusualTransactionIcon}
              activeIcon={unusualTransactionEnableIcon}
              showCheckedIcon
            />
            <div className="w-1/3 flex-grow flex items-center justify-between" />
      </div>

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
                  </span> بانک مرکزی
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
                name: 'دفعات نیاز بازرسی',
                key: 'inspectionNeedCount',
                render: (v: any) => <span>{v || '-'}</span>,
              },
              {
                name: 'نوع تخلف قابل بررسی',
                key: 'types',
                render: (v: any, record: any) => (
                  <div className="flex justify-center items-center">
                    <div className="flex justify-start items-center space-x-3 rtl:space-x-reverse">
                      {record.flourQuota ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={chartBoxIcon}
                            alt="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.isExtortion ? (
                        <div className="">
                          <img className="w-4 h-4" src={extortionIcon} alt="مشکوک به گران فروشی" />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.workTime ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={clockIcon}
                            alt="مشکوک به تخلف از ساعت فعالیت"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.bakeryWithoutTransaction ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={inactivityIcon}
                            alt="مشکوک به عدم فعالیت"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.unusualTransaction ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={unusualTransactionIcon}
                            alt="مشکوک به تراکنش‌های غیر عادی"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                ),
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

export default OverviewAudit;
