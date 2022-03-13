import React, {useState} from 'react';
// import vaccineService from 'src/services/vaccine.service';

import axios from 'axios';
import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
// import { toPersianDigit } from 'src/helpers/utils';
import Table from '../../../TableScope';
// @ts-ignore
// import moment from 'moment-jalaali';

import DatePickerModal from '../../../DatePickerModal';
import Calendar from '../../../Calendar';

const OverviewPasengersStatusVacsinateTable: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [dataset, setDataset] = useState<any>([
    {
      id: `1`,
      name: 'نامشخص',
      firstDosePercentage: 0,
      secondDosePercentage: 0,
      allDosesPercentage: 0,
      allDoses: 0,
      noDose: 0,
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // eslint-disable-next-line
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const {CancelToken} = axios;
  // eslint-disable-next-line
  const source = CancelToken.source();
  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  return (
    <div className="mt-5">
      <div className="flex align-center justify-spacebetween space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            {showDatePicker ? (
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
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
          loading={tableLoading}
          dataSet={[...dataset]}
          pagination={{pageSize: 10, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت کلی',
              key: '',
              render: (v: any, record) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'noDose',
                      title: 'نزده‌ها',
                      y: record.noDose || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#6E6E6E'], // start
                          [1, '#393939'], // end
                        ],
                      },
                    },
                    {
                      name: 'allDosesPercentage',
                      title: 'دوز کل',
                      y: record.allDosesPercentage || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#05D8A4'], // start
                          [1, '#039572'], // end
                        ],
                      },
                    },
                    {
                      name: 'firstDosePercentage',
                      title: 'واکسن اول',
                      y: record.firstDosePercentage || 0,
                      color: {
                        linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                        stops: [
                          [0, '#F5DF34'], // start
                          [1, '#d4c12d'], // end
                        ],
                      },
                    },
                  ]}
                />
              ),
              className: 'flex justify-center w-full',
            },
            {
              name: 'دسته بندی',
              key: 'name',
              render: (v: any, record, index: number, page: number) => (
                <div className="flex">
                  {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                </div>
              ),
            },
            {
              name: 'دوز اول',
              key: 'firstDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز دوم',
              key: 'secondDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز سوم',
              key: 'thirdDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'سایر دوزها',
              key: 'otherDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'واکسن نزده',
              key: 'noVaccine',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
            },
            {
              name: 'اطلاعات مخدوش',
              key: 'unknowDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'کل دوزها',
              key: 'allDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
          ]}
          totalItems={dataset.length || 0}
        />
      </div>
    </div>
  );
};

export default OverviewPasengersStatusVacsinateTable;
