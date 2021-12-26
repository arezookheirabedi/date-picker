import React, {useState} from 'react';
import dayjs from 'dayjs';
import {useLocation} from 'react-router-dom';
import {Menu} from '@headlessui/react';
import Table from '../Table';
import ExportButton from '../Export/ExportButton';
import DatePickerModal from '../DatePickerModal';
import {toPersianDigit} from '../../helpers/utils';
import calendar from '../../assets/images/icons/calendar.svg';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';
import {ReactComponent as FolderIcon} from '../../assets/images/icons/folder.svg';

interface OverviewDriverStatusProps {}

const OverviewDriverStatus: React.FC<OverviewDriverStatusProps> = () => {
  const {search} = useLocation();
  const queryStringParams = new URLSearchParams(search);
  const [exportType, setExportType] = useState(null);
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
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="drivers-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت رانندگان حمل و نقل عمومی
      </legend>

      <div className="flex justify-between items-center mb-8">
        <div className="inline-flex">
          <ExportButton />
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <Menu
            as="div"
            className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
          >
            <div>
              <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <div className="flex items-center">
                  <FolderIcon className="h-5 w-5 ml-2 text-gray-500" />
                  <span className="ml-10 whitespace-nowrap truncate">{exportType || 'PDF'}</span>
                </div>
                <DownIcon className="h-2 w-2.5 mr-2 text-gray-500" />
              </Menu.Button>
            </div>

            <Menu.Items className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {['PDF', 'CSV'].map((value: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <Menu.Item>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => setExportType(value)}
                          >
                            {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                            {value}
                          </button>
                        )}
                      </Menu.Item>
                    </React.Fragment>
                  );
                })}
              </div>
            </Menu.Items>
          </Menu>
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
      </div>

      <div className="flex flex-col items-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
          dataSet={[
            {
              id: '617d54a39d4b1f0efd2d5904',
              category: 'تاکسی آنلاین',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'کهگیلویه و بویراحمد',
              status: 'DISQUALIFIED',
              date: 1588291200000,
              explain: 'POSITIVE',
              vaccine: 1,
            },
            {
              id: '617d54a3e34765550c16dce3',
              category: 'تاکسی عمومی',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'البرز',
              status: 'QUALIFIED',
              date: 1588291200000,
              explain: 'NEGATIVE',
              vaccine: 2,
            },
            {
              id: '617d54a341381bf85e5b6eca',
              category: 'تاکسی آنلاین',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'یزد',
              status: 'CONDITIONAL_QUALIFIED',
              date: 1588291200000,
              explain: 'UNKNOWN',
              vaccine: null,
            },
            {
              id: '617d54a3b02e2e7d71ca9d12',
              category: 'تاکسی پلاک ت',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'آذربایجان غربی',
              status: 'UNKNOWN',
              date: 1588291200000,
              explain: 'UNKNOWN',
              vaccine: 0,
            },
            {
              id: '617d54a35649c264fcd29dc7',
              category: 'تاکسی آنلاین',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'فارس',
              status: 'UNKNOWN',
              date: 1588291200000,
              explain: 'NEGATIVE',
              vaccine: 2,
            },
            {
              id: '617d54a3feaea113cefef758',
              category: 'تاکسی عمومی',
              plaque: '۳۴۸۳۹۲۰۰۳',
              nationalId: '0016619609',
              province: 'قزوین',
              status: 'UNKNOWN',
              date: 1588291200000,
              explain: 'POSITIVE',
              vaccine: 2,
            },
          ]}
          pagination={{pageSize: 20, maxPages: 3}}
          columns={[
            {
              name: 'رسته',
              key: 'category',
              render: (v: any, record, index: number) => (
                <span className="flex justify-center w-full">
                  {`${(
                    (Number(queryStringParams.get('page') || 1) - 1) * 20 +
                    index +
                    1
                  ).toLocaleString('fa')}. ${v}`}
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
              render: (v: any) => <span className="text-gray-500">{toPersianDigit(v)}</span>,
            },
            {
              name: 'استان',
              key: 'province',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              name: 'وضعیت',
              key: 'status',
              render: (v: string, record: any) => {
                let colors = 'from-gray-400 to-gray-300';
                if (record.status) {
                  if (record.status === 'CONDITIONAL_QUALIFIED') {
                    colors = 'from-orange-600 to-orange-400';
                  } else if (record.status === 'DISQUALIFIED') {
                    colors = 'from-red-700 to-red-500';
                  } else if (record.status === 'QUALIFIED') {
                    colors = 'from-green-600 to-green-500';
                  }
                }

                return (
                  <div className="flex justify-center">
                    <div
                      className={`bg-gradient-to-l ${colors} w-4 h-4 rounded-full shadow-2xl`}
                      style={{boxShadow: '-3px 4px 8px -3px rgba(0,0,0,.5)'}}
                    />
                  </div>
                );
              },
            },
            {
              name: 'تاریخ ابتلا',
              key: 'date',
              render: (v: any) => (
                <span className="text-gray-500">
                  {toPersianDigit(dayjs(v).calendar('jalali').format('YYYY/MM/DD'))}
                </span>
              ),
            },
            {
              name: 'آزمایش',
              key: 'explain',
              render: (v: any) => (
                <span
                  // eslint-disable-next-line
                  className={`${
                    // eslint-disable-next-line
                    v === 'POSITIVE'
                      ? 'text-red-700'
                      : v === 'NEGATIVE'
                      ? 'text-green-700'
                      : 'text-gray-400'
                  }`}
                >
                  {/* eslint-disable-next-line */}
                  {v === 'POSITIVE' ? 'مثبت' : v === 'NEGATIVE' ? 'منفی' : 'نامشخص'}
                </span>
              ),
            },
            {
              name: 'واکسیناسیون',
              key: 'vaccine',
              render: (v: any) => (
                <span>
                  {/* eslint-disable-next-line */}
                  {v || v === 0
                    ? // eslint-disable-next-line no-nested-ternary
                      v > 2
                      ? 'دوز سوم'
                      : // eslint-disable-next-line no-nested-ternary
                      v > 1
                      ? 'دوز دوم'
                      : v > 0
                      ? 'دوز اول'
                      : 'انجام نشده'
                    : 'نامشخص'}
                </span>
              ),
            },
          ]}
          totalItems={6}
        />
      </div>
    </fieldset>
  );
};

export default OverviewDriverStatus;
