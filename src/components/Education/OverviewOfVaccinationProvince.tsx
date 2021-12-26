import React, {useState} from 'react';

import Statistic from '../../containers/Guild/components/Statistic';
import totalDriver from '../../assets/images/icons/transport-color.svg';
import YellowVaccine from '../../assets/images/icons/yellow-vaccine.svg';
import GreenVaccine from '../../assets/images/icons/green-vaccine.svg';
import GrayVaccine from '../../assets/images/icons/gray-vaccine.svg';
import Table from '../Table';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import DatePickerModal from '../DatePickerModal';
import {toPersianDigit} from '../../helpers/utils';
import calendar from '../../assets/images/icons/calendar.svg';

interface OverviewOfVaccinationProvinceProps {
  cityTitle: any;
}

const OverviewOfVaccinationProvince: React.FC<OverviewOfVaccinationProvinceProps> = ({
  cityTitle,
}) => {
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
        نگاه کلی به واکسیناسیون کارکنان دولت در &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
        <Statistic icon={totalDriver} text="مجموع رانندگان" count={1257} />
        <Statistic icon={YellowVaccine} text="تعداد واکسیناسیون دوز اول" count={428} />
        <Statistic icon={GreenVaccine} text="تعداد واکسیناسیون دوز دوم" count={864} />
        <Statistic icon={GrayVaccine} text="تعداد واکسیناسیون انجام نشده" count={654} />
      </div>
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
              infectedCount: 22,
              saveCount: 22,
              deadCount: 91,
              infectedPercent: 24,
            },
            {
              id: '617d54a3e34765550c16dce3',
              name: 'تپسی',
              employeesCount: 840,
              infectedCount: 6,
              saveCount: 29,
              deadCount: 1294,
              infectedPercent: 93,
            },
            {
              id: '617d54a341381bf85e5b6eca',
              name: 'سرویس مدارس',
              employeesCount: 3565,
              infectedCount: 37,
              saveCount: 30,
              deadCount: 741,
              infectedPercent: 92,
            },
            {
              id: '617d54a3b02e2e7d71ca9d12',
              name: 'تاکسی فرودگاهی',
              employeesCount: 1998,
              infectedCount: 27,
              saveCount: 62,
              deadCount: 2815,
              infectedPercent: 35,
            },
            {
              id: '617d54a35649c264fcd29dc7',
              name: 'اتوبوس رانی',
              employeesCount: 3384,
              infectedCount: 21,
              saveCount: 35,
              deadCount: 2525,
              infectedPercent: 74,
            },
            {
              id: '617d54a3feaea113cefef758',
              name: 'تاکسی تلفنی',
              employeesCount: 134,
              infectedCount: 64,
              saveCount: 80,
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
                      name: 'fullDoseVaccine',
                      title: 'دوز کل',
                      y: record.fullDoseVaccine || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'notVaccine',
                      title: 'واکسن نزده',
                      y: record.notVaccine || 0,
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
              name: 'دو دوز',
              key: 'infectedPercent',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}%</span>,
            },
            {
              name: 'کل دوز',
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}%</span>,
            },
            {
              name: 'واکسن نزده',
              key: 'saveCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}%</span>,
            },
          ]}
          totalItems={0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccinationProvince;
