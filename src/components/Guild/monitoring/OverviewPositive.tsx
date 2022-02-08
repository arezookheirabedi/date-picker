import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
// @ts-ignore
import moment from 'moment-jalaali';
import {useLocation, useHistory} from 'react-router-dom';
import qs from 'qs';
import {Menu} from '@headlessui/react';
import transportService from 'src/services/transport.service';
import Table from '../../Table';
import ExportButton from '../../Export/ExportButton';
import DatePickerModal from '../../DatePickerModal';
import {toPersianDigit, getServiceTypeName} from '../../../helpers/utils';
import calendar from '../../../assets/images/icons/calendar.svg';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
import {ReactComponent as FolderIcon} from '../../../assets/images/icons/folder.svg';
import Spinner from '../../Spinner';

interface OverviewPositiveProps {
  cityTitle?: string;
}

const OverviewPositive: React.FC<OverviewPositiveProps> = ({cityTitle}) => {
  const {search} = useLocation();
  // const location = useLocation();
  const queryStringParams = new URLSearchParams(search);
  const history = useHistory();

  const [exportType, setExportType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

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

  const getOverviewTransportReport = async (params: any) => {
    // setErrorMessage(null);
    try {
      const response: any = await transportService.overviewReport(params, {
        cancelToken: source.token,
      });
      setDataSet([...response.data.content]);
      setTotalItems(response.data.totalElements);
    } catch (error: any) {
      // setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const qst = new URLSearchParams(search);
  //   setLoading(true);
  //   getOverviewTransportReport({
  //     healthStatusSet: 'POSITIVE',
  //     pageNumber: qst.get('page') || 1,
  //     pageSize: 20,
  //     sort: 'ASC',
  //     from: qst.get('from'),
  //     to: qst.get('to'),
  //   });
  //   // return () => {
  //   //   source.cancel('Operation canceled by the user.');
  //   // }
  // }, []);

  const location = useLocation();
  useEffect(() => {
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataSet([]);
      setTotalItems(0);
      setLoading(false);
    };
  }, [location.search]);

  useEffect(() => {
    let latestQuery: any = {};

    if (search && search.length > 1) {
      latestQuery = JSON.parse(
        // eslint-disable-next-line
        '{"' +
          decodeURI((search || ' ').substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
    }

    if (!loading && selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      history.push(
        `/dashboard/transport/monitoring?${qs.stringify({
          ...latestQuery,
          page: 1,
          from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
          to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        })}`
      );
    }
  }, [selectedDayRange]);

  useEffect(() => {
    const qst = new URLSearchParams(search);

    let query: any = {
      healthStatusSet: 'POSITIVE',
      pageNumber: Number(qst.get('page') || '1') - 1,
      pageSize: 20,
      sort: 'ASC',
      from: qst.get('from'),
      to: qst.get('to'),
    };

    if (qst.has('provinceName')) query = {...query, province: qst.get('provinceName')};

    // if (qst.get('from') && qst.get('to')) {
    //   let from: any = qst.get('from');
    //   let to: any = qst.get('from');

    //   from = moment(from, 'YYYY-MM-DD').format('jYYYY-jM-jD').split('-');
    //   to = moment(to, 'YYYY-MM-DD').format('jYYYY-jM-jD').split('-');

    //   setSelectedDayRange({
    //     from: {year: from[0], month: from[1], day: from[2]},
    //     to: {year: to[0], month: to[1], day: to[2]},
    //   });
    // }

    setLoading(true);
    getOverviewTransportReport(query);
  }, [search]);

  useEffect(() => {
    setSelectedDayRange({
      from: null,
      to: null,
    });
  }, [cityTitle]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="drivers-overview">
      <legend className="text-black mx-auto px-3">
        واحد‌های صنفی با زنجیره مثبت کوید {cityTitle ? `استان ${cityTitle}` : ''}
      </legend>

      <div className="flex justify-between items-center mb-8">
        <div className="inline-flex">
          <ExportButton
            params={{
              from: selectedDayRange.from
                ? moment(
                    `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`,
                    'jYYYY/jM/jD'
                  ).format('YYYY-MM-DD')
                : null,
              to: selectedDayRange.to
                ? moment(
                    `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`,
                    'jYYYY/jM/jD'
                  ).format('YYYY-MM-DD')
                : null,
              healthStatusSet: ['POSITIVE'],
              reportName: `نگاه کلی به وضعیت رانندگان حمل و نقل عمومی ${
                cityTitle ? `استان ${cityTitle}` : ''
              }`,
            }}
          />
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
                    // eslint-disable-next-line
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

      {loading ? (
        <div className="p-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Table
              dataSet={dataSet}
              pagination={{pageSize: 20, maxPages: 3}}
              columns={[
                {
                  name: 'رسته',
                  key: 'serviceType',
                  render: (v: any, record: any, index: number) => (
                    <span className="flex justify-center w-full">
                      {`${(
                        (Number(queryStringParams.get('page') || 1) - 1) * 20 +
                        index +
                        1
                      ).toLocaleString('fa')}. ${getServiceTypeName(v)}`}
                    </span>
                  ),
                },
                {
                  name: 'پلاک',
                  key: '',
                  render: (v: any, record: any) =>
                    // eslint-disable-next-line
                    record.plaque ? (
                      <div className="flex items-center">
                        <div
                          className={`license-plate ${
                            record.serviceType === 'TAXI_T' || record.serviceType === 'PUBLIC'
                              ? 'taxi'
                              : ''
                          }`}
                        >
                          <div className="blue-column">
                            <div className="flag">
                              <div />
                              <div />
                              <div />
                            </div>
                            <div className="text">
                              <div>I.R.</div>
                              <div>IRAN</div>
                            </div>
                          </div>
                          <span>{record.plaque.firstNumber}</span>
                          <span className="alphabet-column">{record.plaque.letter}</span>
                          <span>{record.plaque.secondNumber}</span>
                          <div className="iran-column">
                            <span>ایــران</span>
                            <strong>{record.plaque.iranNumber}</strong>
                          </div>
                        </div>
                      </div>
                    ) : record.motorCyclePlaque ? (
                      <div className="flex items-center">
                        <div className="license-plate-motor">
                          <div className="flex w-full justify-between">
                            <div className="flex flex-grow justify-center">
                              <span>{record.motorCyclePlaque.threeDigitNumber}</span>
                            </div>

                            <div className="blue-column">
                              <div className="flag">
                                <div />
                                <div />
                                <div />
                              </div>
                              <div className="text">
                                <div>I.R.</div>
                                <div>IRAN</div>
                              </div>
                            </div>
                          </div>
                          <span className="alphabet-column">
                            {record.motorCyclePlaque.fiveDigitNumber}
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    ),
                },
                {
                  name: 'کدملی راننده',
                  key: 'nationalId',
                  render: (v: any) => (
                    <span className="text-gray-500">{toPersianDigit(v || '')}</span>
                  ),
                },
                {
                  name: 'استان',
                  key: 'province',
                  render: (v: any) => <span>{v || '-'}</span>,
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
                      {v ? toPersianDigit(dayjs(v).calendar('jalali').format('YYYY/MM/DD')) : '-'}
                    </span>
                  ),
                },
                {
                  name: 'آزمایش',
                  key: 'personHealthStatus',
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
                  key: 'numberOfReceivedDoses',
                  render: (v: any) => (
                    <span>
                      {/* eslint-disable-next-line */}
                      {v || v === 0
                        ? // eslint-disable-next-line no-nested-ternary
                          v > 2
                          ? 'دوز سوم و بیشتر'
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
              totalItems={totalItems}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewPositive;
