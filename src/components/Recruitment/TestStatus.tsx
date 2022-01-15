import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import hcsService from 'src/services/hcs.service';
import {Menu} from "@headlessui/react";
import DatePickerModal from '../DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import Table from '../Table';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import {getRecruitmentTagName, toPersianDigit} from '../../helpers/utils';
import Spinner from '../Spinner';

import {ReactComponent as DownIcon} from "../../assets/images/icons/down.svg";

const filterTypes = [
  {
    name: 'مرتب‌سازی بر اساس پیشفرض',
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
  const [filterType, setFilterType] = useState({name: null, enName: null});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  async function getOverviewByCategory(params: any) {
    setLoading(true);
    try {
      const {data} = await hcsService.testResultTagBased(params);
      const normalizedDate: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedDate.push({
          id: `ovca_${index}`,
          name: getRecruitmentTagName[item.tag] || 'نامشخص',
          total: item.total || 0,
          positiveCount: item.positiveCount || 0,
          negativeCount: item.negativeCount || 0,
          unknownCount:
            (item.total || 0) - ((item.positiveCount || 0) + (item.negativeCount || 0)) || 0,
          // deadCount: 120,
        });
      });
      setDataset([...normalizedDate]);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOverviewByCategory({
      organization: 'recruitment',
      resultStatus: 'POSITIVE',
      recoveredCount: true,
      total: true,
      count: true,
    });
  }, []);

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
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      getOverviewByCategory({
        organization: 'recruitment',
        resultStatus: 'POSITIVE',
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">وضعیت آزمایش کارکنان دولت</legend>

      <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex items-center">
          <Menu
            as="div"
            className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
          >
            <div>
              <Menu.Button
                className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                <span className="ml-10 whitespace-nowrap truncate">
                  {filterType?.name || 'مرتب‌سازی بر اساس پیشفرض'}
                </span>
                <DownIcon className="h-2 w-2.5 mr-2"/>
              </Menu.Button>
            </div>

            <Menu.Items
              className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

          <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
            <div
              className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              {selectedDayRange.from && (
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateFromDate())}
                </span>
              )}
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
          <div className="flex items-center justify-start mx-4">
            <span className="dash-separator"/>
          </div>
          <div className=" shadow-custom rounded-lg px-4 py-1">
            <div
              className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
              onClick={focusFromDate}
            >
              {selectedDayRange.to && (
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateToDate())}
                </span>
              )}
              <img src={calendar} alt="x" className="w-5 h-5"/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {loading ? (
          <div className="p-20">
            <Spinner/>
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
                        name: 'negativeCount',
                        title: 'درصد تست‌های منفی',
                        y: record.negativeCount || 0,
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
                        y: record.positiveCount || 0,
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
                render: (v: any, record, index: number) => (
                  <div className="flex">
                    {(index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد آزمایش‌های انجام شده',
                key: 'total',
                render: (v: any) => <span>{Number(v || 0).toPersianDigits()}</span>,
              },
              {
                name: 'درصد تست‌های مثبت',
                key: 'positiveCount',
                render: (v: any, record: any) => (
                  <span>
                    {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                      .toFixed(4)
                      .toPersianDigits()}
                    %
                  </span>
                ),
              },
              {
                name: 'درصد تست‌های منفی',
                key: 'negativeCount',
                render: (v: any, record: any) => (
                  <span>
                    {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                      .toFixed(4)
                      .toPersianDigits()}
                    %
                  </span>
                ),
              },
              {
                name: 'درصد تست‌های نامشخص',
                key: 'unknownCount',
                render: (v: any, record: any) => (
                  <span>
                    {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                      .toFixed(4)
                      .toPersianDigits()}
                    %
                  </span>
                ),
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default TestStatus;
