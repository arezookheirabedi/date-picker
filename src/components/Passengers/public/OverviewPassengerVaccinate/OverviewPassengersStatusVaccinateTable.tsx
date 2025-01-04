import React, {useEffect, useState} from 'react';
import Spinner from 'src/components/Spinner';

import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
// import { toPersianDigit } from 'src/helpers/utils';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
// import moment from 'moment-jalaali';
import Table from '../../../TableScopeSort';
// import DatePickerModal from '../../../DatePickerModal';
// import Calendar from '../../../Calendar';


const OverviewPassengersStatusVacsinateTable: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [dataset, setDataset] = useState<any>([]);
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });
  const [orgDataset, setOrgDataset] = useState<any>([]);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  // }) as any;

  const cancelToken = cancelTokenSource();
  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  // eslint-disable-next-line


  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     getOverviewByVaccineCount({
  //       lang: 'fa',
  //       from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   } else {
  //     getOverviewByVaccineCount({
  //       lang: 'fa',
  //       from: null,
  //       to: null,
  //     });
  //   }
  // }, [selectedDayRange]);



  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 0;

      if (a.allDosesPercentage < b.allDosesPercentage) {
        return reverse * 1;
      }

      if (a.allDosesPercentage > b.allDosesPercentage) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="p-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Table
             
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
                          name: 'allDosesPercentage',
                          title: 'واکسن نزده',
                          y: record.noDose || 0,
                          color: {
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            stops: [
                              [0, '#FE2D2F'], // start
                              [1, '#CC0002'], // end
                            ],
                          },
                        },
                        {
                          name: 'noDose',
                          title: 'واکسن زده',
                          y: record.allDosesPercentage || 0,
                          color: {
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            stops: [
                              [0, '#05D8A4'], // start
                              [1, '#039572'], // end
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
                  sortable : true,
                  key: 'firstDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز دوم',
                  sortable : true,
                  key: 'secondDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز سوم',
                  sortable : true,
                  key: 'thirdDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'سایر دوزها',
                  sortable : true,
                  key: 'otherDoses',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },

                {
                  name: 'واکسن نزده',
                  sortable : true,
                  key: 'noDose',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'اطلاعات مخدوش',
                  key: 'noData',
                  sortable : true,
                  render: (v: any) => <span>{v}</span>,
                  // render: (v: any) => <span>-</span>,
                },
                {
                  name: 'کل دوزها',
                  sortable : true,
                  key: 'allDoses',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
                },
              ]}
              totalItems={dataset.length || 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewPassengersStatusVacsinateTable;
