import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Menu} from '@headlessui/react';

// @ts-ignore
import moment from 'moment-jalaali';
// import {schoolTypes} from 'src/helpers/sortingModels';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import Table from '../../TableScope';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import {toPersianDigit} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';

const filterTypes = [
  {
    name: 'پیشفرض',
    enName: '',
  },
  {
    name: 'بیشترین',
    enName: 'HIGHEST',
  },
  {
    name: 'کمترین',
    enName: 'LOWEST',
  },
];

const TestStatus: React.FC<{}> = () => {
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orgDataset, setOrgDataset] = useState<any>([]);
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
      const {data} = await hcsService.testResultsCategory('edu', 'grade', {
        lang: 'fa',
        from,
        to,
      });
      console.log(data);

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue || 'نامشخص',
          total: item.testResultsCount || 0,
          positiveCount: item.positiveTestResultsCount || 0,
          positivePercentage: item.positiveTestResultsCountToTestResultsCountPercentage || 0,
          negativeCountPercentage: item.negativeTestResultsCountToTestResultsCountPercentage || 0,
        });
      });
      setDataset([...normalizedData]);
      setOrgDataset([...normalizedData]);
      setFilterType({name: 'پیشفرض', enName: ''});
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // async function getOverviewByCategory(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await hcsService.testResultTagBased(params, {cancelToken: source.token});
  //     const sortData: any = [];

  //     schoolTypes.forEach(item => {
  //       const tm = data.find((i: any) => i.tag === item);
  //       sortData.push(tm);
  //     });

  //     const normalizedData: any[] = [];
  //     sortData.forEach((item: any, index: number) => {
  //       normalizedData.push({
  //         id: `ovca_${index}`,
  //         name: item.tag || 'نامشخص',
  //         total: item.total || 0,
  //         positiveCount: item.positiveCount || 0,
  //         positivePercentage:
  //           (Number(item.positiveCount || 0) * 100) / Number(item.total || 0) || 0,
  //         negativeCount: item.negativeCount || 0,
  //         unknownCount:
  //           (item.total || 0) - ((item.positiveCount || 0) + (item.negativeCount || 0)) || 0,
  //         // deadCount: 120,
  //       });
  //     });
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //     setFilterType({name: 'پیشفرض', enName: ''});
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    // getTestInTransport({count: true, total: true, testResultStatusList: 'POSITIVE,NEGATIVE'});
    overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
      setOrgDataset([]);
      setFilterType({name: 'پیشفرض', enName: ''});
    };
  }, [query]);

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

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 0;

      if (a.positivePercentage < b.positivePercentage) {
        return reverse * 1;
      }

      if (a.positivePercentage > b.positivePercentage) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  // const clearSelectedDayRange = (e: any) => {
  //   e.stopPropagation();
  //   setSelectedDayRange({
  //     from: null,
  //     to: null,
  //   });
  // };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">آزمایش در آموزش و پرورش</legend>
      <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex items-center">
          <Menu
            as="div"
            className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
          >
            <div>
              <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                <span className="ml-10 whitespace-nowrap truncate">
                  {filterType?.name || 'پیشفرض'}
                </span>
                <DownIcon className="h-2 w-2.5 mr-2" />
              </Menu.Button>
            </div>

            <Menu.Items className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {filterTypes.map((value: any, index: any) => {
                  // console.log(value);
                  return (
                    // eslint-disable-next-line
                    <Menu.Item key={index}>
                      {({active}) => (
                        <button
                          type="button"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } text-gray-900 group flex rounded-md items-center whitespace-nowrap truncate w-full px-2 py-2 text-sm`}
                          onClick={() => {
                            setFilterType(value);
                            // setQueryParams({
                            //   ...queryParams,
                            //   tag: value.enName,
                            // });
                          }}
                        >
                          {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                          {value.name}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Menu>
        </div>

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
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {loading ? (
          <div className="p-20">
            <Spinner />
          </div>
        ) : (
          <Table
            dataSet={[...dataset]}
            pagination={{pageSize: 20, maxPages: 3}}
            columns={[
              {
                name: 'وضعیت',
                key: '',
                render: (v: any, record) => (
                  <CategoryDonut
                    data={[
                      {
                        name: 'unknownCount',
                        title: 'درصد تست‌های نامشخص',
                        y: record.unknownCount || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#6E6E6E'], // start
                            [1, '#393939'], // end
                          ],
                        },
                      },
                      {
                        name: 'negativeCountPercentage',
                        title: 'درصد تست‌های منفی',
                        y: record.negativeCountPercentage || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#05D8A4'], // start
                            [1, '#039572'], // end
                          ],
                        },
                      },
                      {
                        name: 'positiveCount',
                        title: 'درصد تست‌های مثبت',
                        y: record.positivePercentage || 0,
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
                name: 'سازمان',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex">
                    {((page - 1) * 20 + (index + 1)).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد آزمایش‌های انجام شده',
                key: 'total',
                render: (v: any) => (
                  <span>
                    {Number(v || 0)
                      .commaSeprator()
                      .toPersianDigits()}
                  </span>
                ),
              },
              {
                name: 'درصد تست‌های مثبت',
                key: 'positivePercentage',
                render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
              },
              {
                name: 'درصد تست‌های منفی',
                key: 'negativeCountPercentage',
                render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
              },
              // {
              //   name: 'درصد تست‌های نامشخص',
              //   key: 'unknownCount',
              //   render: (v: any, record: any) => (
              //     <span>
              //       {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
              //         .toFixed(4)
              //         .toPersianDigits()}
              //       %
              //     </span>
              //   ),
              // },
            ]}
            totalItems={(dataset || []).length || 0}
          />
        )}
      </div>
    </fieldset>
  );
};

export default TestStatus;
