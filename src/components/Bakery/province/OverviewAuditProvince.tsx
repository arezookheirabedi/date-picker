import React, {useEffect, useState, useCallback} from 'react';

// @ts-ignore
// import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import ButtonToggle from '../../Form/ButtonToggle';
import inactivityIcon from '../../../assets/images/icons/inactivity.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusualTransaction.svg';

// import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import {sidesCities} from '../../../helpers/utils';

import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';
import chartBoxIcon from '../../../assets/images/icons/chart-box.svg';
import chartBoxActiveIcon from '../../../assets/images/icons/chart-box-active.svg';
import extortionIcon from '../../../assets/images/icons/extortion.svg';
import extortionActiveIcon from '../../../assets/images/icons/extortion-active.svg';
import clockIcon from '../../../assets/images/icons/clock.svg';
import clockActiveIcon from '../../../assets/images/icons/clock-active.svg';
import inactivityEnableIcon from '../../../assets/images/icons/inactivity-enable.svg';
import unusualTransactionEnableIcon from '../../../assets/images/icons/unusualTransaction-enable.svg';

// hooks
import useOverviewOfAuditProvince from "../../../hooks/apis/bakery/useOverviewOfAuditProvince";

interface OverviewAuditProvinceProps {
  cityTitle?: any;
}

const OverviewAuditProvince: React.FC<OverviewAuditProvinceProps> = ({cityTitle}) => {

  // call bakery hook
  const {
    loading, 
    list: dataset, 
    count, 
    setCount, 
    filteredDataset, 
    setFilteredDataset,
    setProvinceName
  } = useOverviewOfAuditProvince();

  // states
  const location = useLocation();
  const history = useHistory();
  const [flourQuota, setFlourQuota] = useState<any>(false);
  const [isExtortion, setIsExtortion] = useState<any>(false);
  const [workTime, setworkTime] = useState<any>(false);
  const [bakeryWithoutTransaction, setBakeryWithoutTransaction] = useState<any>(false);
  const [unusualTransaction, setUnusualTransaction] = useState<any>(false);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  // }) as any;
  // const [query, setQuery] = useState({
  //   resultReceiptDateFrom: null,
  //   resultReceiptDateTo: null,
  //   province: null,
  // }) as any;

  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sidesCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo, provinceName);
      setProvinceName(provinceName);
      // getOverviewByCategory({
      //   resultStatus: 'POSITIVE',
      //   recoveredCount: true,
      //   total: true,
      //   count: true,
      //   province: provinceName,
      // });
      //
    } else {
      history.push('/dashboard/bakery/province');
    }
  }, [cityTitle]);

 
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

      setFilteredDataset(temp);

      // set count of inspection need bakeries
      setCount(temp.length)

  }, 
    [isExtortion, workTime, flourQuota, 
    bakeryWithoutTransaction, unusualTransaction
    ]);

  useEffect(() => {
      filteredList();
  },[filteredList]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      نگاه کلی به لیست واحد‌هایی که نیاز به بازرسی دارند در استان {cityTitle}
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
      <div className="flex flex-grow items-center justify-end space-x-5 rtl:space-x-reverse mb-8">
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

export default OverviewAuditProvince;
