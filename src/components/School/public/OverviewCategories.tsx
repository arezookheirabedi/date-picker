import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import Table from 'src/components/TableScopeSort';
import DatePickerModal from '../../DatePickerModal';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const OverviewCategories: React.FC<{}> = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
    clear: false,
  }) as any;
  const [query, setQuery] = useState({
    resultReceiptDateFrom: null,
    resultReceiptDateTo: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const overviewTestResults = async (from: any = null, to: any = null) => {
    try {
      setLoading(true);
      const {data} = await hcsService.tableOverviewTestResults('edu', 'grade', {
        lang: 'fa',
        from,
        to,
      });
      // console.log(data);
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue,
          employeesCount: item.membersCount || 0,
          infectedCount: item.positiveMembersCount || 0,
          infectedPercent: item.positiveMembersCountToMembersCountPercentage || 0,
          saveCount: item.recoveredMembersCount || 0,
          // deadCount: 120,
        });
        // }
      });
      setDataset([...normalizedData]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // async function getOverviewByCategory(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await hcsService.membersTagBased(params, {cancelToken: source.token});
  //     const sortData: any = [];

  //     schoolTypes.forEach(item => {
  //       const tm = data.find((i: any) => i.tag === item);
  //       sortData.push(tm);
  //     });

  //     // console.log(sortData);
  //     // console.log(schoolTypes);

  //     const normalizedData: any[] = [];
  //     sortData.forEach((item: any, index: number) => {
  //       if (item.total !== 0) {
  //         normalizedData.push({
  //           id: `ovca_${index}`,
  //           name: item.tag || 'نامشخص',
  //           employeesCount: item.total || 0,
  //           infectedCount: item.positiveCount || 0,
  //           infectedPercent: (((item.positiveCount || 0) * 100) / (item.total || 0)).toFixed(4),
  //           saveCount: item.recoveredCount || 0,
  //           // deadCount: 120,
  //         });
  //       }
  //     });
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    // getOverviewByCategory(query);
    overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
    };
  }, [query]);

  // useEffect(() => {
  //   getOverviewByCategory({
  //     organization: 'education',
  //     from: '',
  //     to: '',
  //     tagPattern: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
  //     tags: ['^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$'].join(','),
  //   });

  //   return () => {
  //     setDataset([]);
  //     source.cancel('Operation canceled by the user.');
  //   };
  // }, []);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQuery({
        ...query,
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        resultReceiptDateFrom: null,
        resultReceiptDateTo: null,
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به آموزش و پرورش کشور</legend>

      <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center justify-start">
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
              name: 'دسته',
              key: 'name',
              render: (v: any, record, index: number) => (
                <span>
                  {(index + 1).toLocaleString('fa')}.{v}
                </span>
              ),
            },
            {
              sortable: true,
              name: 'تعداد ',
              key: 'employeesCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              sortable: true,
              name: 'درصد ابتلا',
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
              sortable: true,
              name: 'تعداد مبتلایان',
              key: 'infectedCount',
              render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
            },
            {
              sortable: true,
              name: 'تعداد بهبودیافتگان',
              key: 'saveCount',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
            {
              name: 'تعداد فوت‌شدگان',
              key: 'deadCount',
              render: (v: any) => (
                <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
              ),
            },
          ]}
          totalItems={(dataset || []).length}
        />
      </div>
    </fieldset>
  );
};

export default OverviewCategories;
