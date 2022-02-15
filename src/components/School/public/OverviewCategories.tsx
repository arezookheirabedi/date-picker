import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {schoolTypes} from 'src/helpers/sortingModels';
import { Menu } from '@headlessui/react';
// @ts-ignore
import moment from 'moment-jalaali';
import hcsService from 'src/services/hcs.service';
import DatePickerModal from '../../DatePickerModal';
import calendar from '../../../assets/images/icons/calendar.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import {toPersianDigit} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

const filterTypes: any[] = [
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

const OverviewCategories: React.FC<{}> = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [dataset, setDataset] = useState<any>([]);
  const [filterType, setFilterType] = useState({
    name: 'پیشفرض',
    enName: '',
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  async function getOverviewByCategory(params: any) {
    setLoading(true);
    try {
      const {data} = await hcsService.membersTagBased(params, {cancelToken: source.token});
      const sortData: any = [];

      schoolTypes.forEach(item => {
        const tm = data.find((i: any) => i.tag === item);
        sortData.push(tm);
      });

      // console.log(sortData);
      // console.log(schoolTypes);

      const normalizedData: any[] = [];
      sortData.forEach((item: any, index: number) => {
        if (item.total !== 0) {
          normalizedData.push({
            id: `ovca_${index}`,
            name: item.tag || 'نامشخص',
            employeesCount: item.total || 0,
            infectedCount: item.positiveCount || 0,
            infectedPercent: (((item.positiveCount || 0) * 100) / (item.total || 0)).toFixed(4),
            saveCount: item.recoveredCount || 0,
            // deadCount: 120,
          });
        }
      });
      setDataset([...normalizedData]);
      setOrgDataset([...normalizedData]);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOverviewByCategory({
      organization: 'education',
      from: '',
      to: '',
      tagPattern: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
      tags: ['^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$'].join(','),
    });

    return () => {
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
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
        organization: 'education',
        tagPattern: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
        tags: ['^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$'].join(','),
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      getOverviewByCategory({
        organization: 'education',
        tagPattern: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
        tags: ['^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$'].join(','),
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  useEffect(() => {
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 0;

      if (Number(a.infectedPercent) < Number(b.infectedPercent)) {
        return reverse * 1;
      }

      if (Number(a.infectedPercent) > Number(b.infectedPercent)) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
    });
  };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به آموزش و پرورش کشور</legend>

      <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8">
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

            <Menu.Items
              style={{minWidth: '200px'}}
              className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                {filterTypes.map((value: any, index: any) => {
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
                          }}
                        >
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
        <div className="flex align-center justify-start">
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
              {selectedDayRange.to || selectedDayRange.from ? (
                <button type="button" onClick={clearSelectedDayRange}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              ) : (
                <img src={calendar} alt="x" className="w-5 h-5" />
              )}
            </div>
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
            {selectedDayRange.to && (
              <span className="ml-4 whitespace-nowrap truncate text-xs">
                {toPersianDigit(generateToDate())}
              </span>
            )}
            {selectedDayRange.to || selectedDayRange.from ? (
              <button type="button" onClick={clearSelectedDayRange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            ) : (
              <img src={calendar} alt="x" className="w-5 h-5" />
            )}
          </div>
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
                name: 'تعداد کارکنان',
                key: 'employeesCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
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
                name: 'تعداد مبتلایان',
                key: 'infectedCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
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
        )}
      </div>
    </fieldset>
  );
};

export default OverviewCategories;
