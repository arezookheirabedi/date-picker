import React, {useState} from 'react';
import Table from '../Table';
import DatePickerModal from '../DatePickerModal';
import {toPersianDigit} from '../../helpers/utils';
import calendar from '../../assets/images/icons/calendar.svg';
import download from '../../assets/images/icons/download.svg';

interface OverviewDriverStatusProps {
  cityTitle: any;
}

const OverviewDriverStatus: React.FC<OverviewDriverStatusProps> = ({cityTitle}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: {day: 1, month: 9, year: 1400},
    to: {day: 20, month: 9, year: 1400},
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
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی واکسیناسیون در حمل و نقل عمومی در &nbsp;
        {cityTitle}
      </legend>

      <div className="flex justify-between items-center mb-8">
        <div className="inline-flex">
          <button
            type="button"
            className="button button--primary px-5 flex space-x-2 rtl:space-x-reverse"
          >
            <img src={download} alt="" className="h-4" />
            <span>دانلود اطلاعات</span>
          </button>
        </div>

        <div className="flex items-center justify-start">
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
      </div>

      <div className="flex flex-col items-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
          dataSet={[
            {
              id: '617d54a39d4b1f0efd2d5904',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
            {
              id: '617d54a3e34765550c16dce3',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
            {
              id: '617d54a341381bf85e5b6eca',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
            {
              id: '617d54a3b02e2e7d71ca9d12',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
            {
              id: '617d54a35649c264fcd29dc7',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
            {
              id: '617d54a3feaea113cefef758',
              category: 'تاکسی تلفنی',
              plaque: 134,
              nationalId: 64,
              province: 80,
              status: 1156,
              date: 72,
              explain: 72,
              vaccine: 'دوز دوم',
            },
          ]}
          pagination={{pageSize: 20, maxPages: 3}}
          columns={[
            {
              name: 'رسته',
              key: 'category',
              render: (v: any, record, index: number) => (
                <span className='font-bold flex justify-center w-full'>
                  {(index + 1).toLocaleString('fa')}. {v}
                </span>
              ),
            },
            {
              name: 'پلاک',
              key: 'plaque',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'کدملی راننده',
              key: 'nationalId',
              render: (v: any) => <span className='text-gray-500'>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'استان',
              key: 'province',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'وضعیت',
              key: 'status',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'تاریخ ابتلا',
              key: 'date',
              render: (v: any) => <span className='text-gray-500'>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'آرمایش',
              key: 'explain',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'واکسیناسیون',
              key: 'vaccine',
              className: 'font-bold',
            },
          ]}
          totalItems={0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewDriverStatus;
