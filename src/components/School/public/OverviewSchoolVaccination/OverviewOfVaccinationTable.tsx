import React, {useEffect, useState} from 'react';
import CategoryDonut from 'src/containers/Guild/components/CategoryDonut';
import hcsService from 'src/services/hcs.service';
import Table from 'src/components/TableScopeSort';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import Calendar from 'src/components/Calendar';
import DatePickerModal from 'src/components/DatePickerModal';
// @ts-ignore
import moment from 'moment-jalaali';

const OverviewOfVaccination: React.FC<{}> = () => {
  const [dataset, setDataset] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getOverviewByVaccine = async ({tag, category, ...params}: any = {}) => {
    setLoading(true);
    try {
      const {data} = await hcsService.vaccinationOverview(tag, category, params, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // eslint-disable-next-line
        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.categoryValue || 'نامشخص',
          firstDosePercentage: item.dosesToMembersCountPercentage[1] || 0,
          secondDosePercentage: item.dosesToMembersCountPercentage[2] || 0,
          thirdDosePercentage: item.dosesToMembersCountPercentage[3] || 0,
          otherDose: item.gtDosesToTotalDosesPercentage[3] || 0,
          unknownInformation: 0,
          allDoses: item.gtDoses['0'] || 0,
          allDosesPercentage:
            item.gtDosesToTotalDosesPercentage[0] -
              item.totalNonVaccinesCountToMembersCountPercentage || 0,
          noDose: item.totalNonVaccinesCountToMembersCountPercentage || 0,
        });
      });
      setDataset([...normalizedData]);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      getOverviewByVaccine({
        tag: 'edu',
        category: 'grade',
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    } else {
      getOverviewByVaccine({
        tag: 'edu',
        category: 'grade',
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
    <fieldset className="mb-16  p-4 text-center">
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
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

      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        <Table
          totalItems={dataset.length || 0}
          loading={loading}
          dataSet={[...dataset]}
          pagination={{pageSize: 10, maxPages: 3}}
          columns={[
            {
              name: 'وضعیت کلی',
              key: '',
              render: (v: any, record: any) => (
                <CategoryDonut
                  data={[
                    {
                      name: 'unknownInformation',
                      title: 'مخدوش',
                      y: record.unknownInformation || 0,
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
                      name: 'noDose',
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
                  ]}
                />
              ),
              className: 'flex justify-center w-full',
            },
            {
              name: 'دسته',
              key: 'name',

              render: (v: any, record, index: number, page: number) => (
                <div className="flex">
                  {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                </div>
              ),
            },
            {
              name: 'دوز اول',
              key: 'firstDosePercentage',
              sortable: true,
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز دوم',
              sortable: true,

              key: 'secondDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'دوز سوم',
              sortable: true,

              key: 'thirdDosePercentage',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'سایر دوزها',
              key: 'otherDose',
              render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
            },
            {
              name: 'کل دوزها',
              sortable: true,
              key: 'allDoses',
              render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
            },
          ]}
        />
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccination;
