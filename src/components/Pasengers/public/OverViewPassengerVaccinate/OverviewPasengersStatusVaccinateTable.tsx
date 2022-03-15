import React, {useEffect, useState} from 'react';
// import vaccineService from 'src/services/vaccine.service';
// @ts-ignore
import moment from 'moment-jalaali';

import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
// import { toPersianDigit } from 'src/helpers/utils';
import { cancelTokenSource, msgRequestCanceled } from 'src/helpers/utils';
import passengerService from 'src/services/passenger.service';
import Table from '../../../TableScope';
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
      thirdDosePercentage: 0,
      allDosesPercentage: 0,
      allDoses: 0,
      noDose: 0,
      noData:"-",
      otherDosePercentage:0
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const cancelToken = cancelTokenSource();
  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }


  // eslint-disable-next-line
  async function getOverviewByVaccineCount(params: any) {
    setLoading(true);
    try {
      const {data} =await passengerService.dosesTagBased(params, {cancelToken: cancelToken.token})

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        let firstDose = 0;

        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.dosesToMembersCountPercentage)) {
          if (Number(key) === 1) {
            firstDose = Number(value);
          }
        }

        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue || 'نامشخص',
          firstDosePercentage: firstDose,
          secondDosePercentage: Number(item.dosesToMembersCountPercentage[2] || 0),
          allDosesPercentage: 100 - Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
          allDoses: Number(item.gtDoses['0'] || 0),
          noDose: Number(item.totalNonVaccinesCountToMembersCountPercentage || 0),
        });
      });

      setDataset([...normalizedData]);
     
   
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }




  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      getOverviewByVaccineCount({
      
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      getOverviewByVaccineCount({
      
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);
  useEffect(() => {
    return () => {
      cancelRequest();
      setDataset([]);
    };
  }, []);





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
          loading={loading}
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
                      name: 'noDose',
                      title: 'واکسن زده',
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
              key: 'otherDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
          
            {
              name: 'واکسن نزده',
              key: 'noDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'اطلاعات مخدوش',
              key: 'noData',
              render: (v: any) => <span>{v}</span>,
              // render: (v: any) => <span>-</span>,
            },
            {
              name: 'کل دوزها',
              key: 'allDoses',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
            },
          ]}
          totalItems={dataset.length || 0}
        />
      </div>
    </div>
  );
};

export default OverviewPasengersStatusVacsinateTable;
