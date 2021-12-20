import React, {useEffect, useState} from 'react';

import {useHistory, useLocation} from 'react-router-dom';
import DatePickerModal from '../DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import Table from '../Table';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import {toPersianDigit} from '../../helpers/utils';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const sideCities = [
  {
    name: 'هرمزگان',
    color: '#ccc',
  },
  {
    name: 'بوشهر',
    color: '#ccc',
  },
  {
    name: 'کهگیلویه و بویراحمد',
    color: '#ccc',
  },
  {
    name: 'فارس',
    color: '#ccc',
  },
  {
    name: 'اصفهان',
    color: '#ccc',
  },
  {
    name: 'سمنان',
    color: '#ccc',
  },
  {
    name: 'گلستان',
    color: '#ccc',
  },
  {
    name: 'مازندران',
    color: '#ccc',
  },
  {
    name: 'تهران',
    color: '#ccc',
  },
  {
    name: 'مرکزی',
    color: '#ccc',
  },
  {
    name: 'یزد',
    color: '#ccc',
  },
  {
    name: 'چهارمحال و بختیاری',
    color: '#ccc',
  },
  {
    name: 'خوزستان',
    color: '#ccc',
  },
  {
    name: 'لرستان',
    color: '#ccc',
  },
  {
    name: 'ایلام',
    color: '#ccc',
  },
  {
    name: 'اردبیل',
    color: '#ccc',
  },
  {
    name: 'قم',
    color: '#ccc',
  },
  {
    name: 'همدان',
    color: '#ccc',
  },
  {
    name: 'زنجان',
    color: '#ccc',
  },
  {
    name: 'قزوین',
    color: '#ccc',
  },
  {
    name: 'آذربایجان غربی',
    color: '#ccc',
  },
  {
    name: 'آذربایجان شرقی',
    color: '#ccc',
  },
  {
    name: 'کرمانشاه',
    color: '#ccc',
  },
  {
    name: 'گیلان',
    color: '#ccc',
  },
  {
    name: 'کردستان',
    color: '#ccc',
  },
  {
    name: 'خراسان جنوبی',
    color: '#ccc',
  },
  {
    name: 'خراسان رضوی',
    color: '#ccc',
  },
  {
    name: 'خراسان شمالی',
    color: '#ccc',
  },
  {
    name: 'سیستان و بلوچستان',
    color: '#ccc',
  },
  {
    name: 'کرمان',
    color: '#ccc',
  },
  {
    name: 'البرز',
    color: '#ccc',
  },
];

const OverviewCategoriesProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    console.log(provinceName);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      //
    } else {
      history.push('/dashboard/transport/province');
    }
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی رسته‌های حمل و نقل در استان &nbsp;
        {cityTitle}
      </legend>
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
        <Table
          dataSet={[
            {
              id: '617d54a39d4b1f0efd2d5904',
              name: 'اسنپ',
              employeesCount: 60,
              infectedCount: 2253,
              saveCount: 2279,
              deadCount: 91,
              infectedPercent: 24,
            },
            {
              id: '617d54a3e34765550c16dce3',
              name: 'تپسی',
              employeesCount: 840,
              infectedCount: 605,
              saveCount: 2930,
              deadCount: 1294,
              infectedPercent: 93,
            },
            {
              id: '617d54a341381bf85e5b6eca',
              name: 'سرویس مدارس',
              employeesCount: 3565,
              infectedCount: 3727,
              saveCount: 3089,
              deadCount: 741,
              infectedPercent: 92,
            },
            {
              id: '617d54a3b02e2e7d71ca9d12',
              name: 'تاکسی فرودگاهی',
              employeesCount: 1998,
              infectedCount: 2748,
              saveCount: 628,
              deadCount: 2815,
              infectedPercent: 35,
            },
            {
              id: '617d54a35649c264fcd29dc7',
              name: 'اتوبوس رانی',
              employeesCount: 3384,
              infectedCount: 2138,
              saveCount: 3535,
              deadCount: 2525,
              infectedPercent: 74,
            },
            {
              id: '617d54a3feaea113cefef758',
              name: 'تاکسی تلفنی',
              employeesCount: 134,
              infectedCount: 647,
              saveCount: 807,
              deadCount: 1156,
              infectedPercent: 72,
            },
          ]}
          pagination={{pageSize: 20, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت کلی',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'deadCount',
                      title: 'تعداد فوت‌شدگان',
                      y: record.deadCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#6E6E6E'], // start
                          [1, '#393939'], // end
                        ],
                      },
                    },
                    {
                      name: 'saveCount',
                      title: 'تعداد بهبودیافتگان',
                      y: record.saveCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'infectedCount',
                      title: 'تعداد مبتلایان',
                      y: record.infectedCount || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#FE2D2F'], // start
                          [1, '#CC0002'], // end
                        ],
                      },
                    },
                  ]}
                />
              ),
              className: 'flex justify-center w-full',
            },
            {
              name: 'رسته های حمل و نقل',
              key: 'name',
              render: (v: any, record, index: number) => (
                <span>
                  {(index + 1).toLocaleString('fa')}.{v}
                </span>
              ),
            },
            {
              name: 'تعداد رانندگان',
              key: 'employeesCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'درصد ابتلا',
              key: 'infectedPercent',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}%</span>,
            },
            {
              name: 'تعداد مبتلایان',
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'تعداد بهبودیافتگان',
              key: 'saveCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'تعداد فوت‌شدگان',
              key: 'deadCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
          ]}
          totalItems={0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewCategoriesProvince;
