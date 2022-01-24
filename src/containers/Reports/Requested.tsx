import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import DatePickerModal from '../../components/DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import Table from '../../components/TableScope';
import {toPersianDigit} from '../../helpers/utils';
import Spinner from '../../components/Spinner';

const Requested: React.FC<{}> = () => {
  // eslint-disable-next-line
  const location = useLocation();
  // eslint-disable-next-line
  const history = useHistory();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [dataset, setDataset] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from
      ? // eslint-disable-next-line
        selectedDayRange.from.year +
          '/' +
          selectedDayRange.from.month +
          '/' +
          selectedDayRange.from.day
      : '';
  };


  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to
      ? // eslint-disable-next-line
        selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
      : '';
  };

  useEffect(() => {}, []);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست درخواست دانلود گزارش</legend>

        <div className="flex align-center justify-start mb-8">
          {showDatePicker ? (
            <DatePickerModal
              setSelectedDayRange={setSelectedDayRange}
              selectedDayRange={selectedDayRange}
              setShowDatePicker={setShowDatePicker}
              showDatePicker
            />
          ) : null}
          <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
            <div
              className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              <span className="ml-4 whitespace-nowrap truncate text-xs">
                {toPersianDigit(generateFromDate())}
              </span>
              <img src={calendar} alt="x" className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center justify-start mx-4">
            <span className="dash-separator" />
          </div>
          <div className=" shadow-custom rounded-lg px-4 py-1">
            <div
              className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              <span className="ml-4 whitespace-nowrap truncate text-xs">
                {toPersianDigit(generateToDate())}
              </span>
              <img src={calendar} alt="x" className="w-5 h-5" />
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
              dataSet={[...dataset]}
              pagination={{pageSize: 10, maxPages: 3}}
              columns={[
                {
                  name: 'نام گزارش',
                  key: 'name',
                  render: (v: any, record, index: number, page: number) => (
                    <div className="flex">
                      {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.
                      {/* eslint-disable-next-line */}
                      {v.replace(/استان\s(.*)_/, '')}
                    </div>
                  ),
                },
                {
                  name: 'دسته‌بندی',
                  key: 'employeesCount',
                  render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
                },
                {
                  name: 'تاریخ گزارش',
                  key: 'infectedPercent',
                  render: (v: any) => (
                    <span>
                      {Number(v).toLocaleString('fa', {
                        minimumFractionDigits: 4,
                      })}
                      %
                    </span>
                  ),
                },
                {
                  name: 'شماره شناسه',
                  key: 'infectedCount',
                  render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
                },
                {
                  name: 'تاریخ درخواست',
                  key: 'saveCount',
                  render: (v: any) => (
                    <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                  ),
                },
                {
                  name: 'آخرین به روز رسانی',
                  key: 'deadCount',
                  render: (v: any) => (
                    <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                  ),
                },
                {
                  name: 'وضعیت',
                  key: 'deadCount',
                  render: (v: any) => (
                    <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                  ),
                },
              ]}
              totalItems={(dataset || []).length}
            />
          )}
        </div>
      </fieldset>
    </>
  );
};

export default Requested;
