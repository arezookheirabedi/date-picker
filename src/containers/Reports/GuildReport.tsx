import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import transportService from 'src/services/transport.service';
import DatePickerModal from '../../components/DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import download from '../../assets/images/icons/download.svg';
import Table from '../../components/Table';
import {toPersianDigit} from '../../helpers/utils';
import Spinner from '../../components/Spinner';

const GuildReport: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  // const [totalItems, setTotalItems] = useState(0);
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

  async function fetchReports(params: any) {
    setLoading(true);
    try {
      const response = await transportService.fetchRequestedReports(params, {
        cancelToken: source.token,
      });
      setDataset([...response.data.content]);
      // setTotalItems(response.data.totalElements);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
      // setTotalItems(0);
      setLoading(false);
    };
  }, [history]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchReports({pageNumber: Number(params.get('page') || 1) - 1, sort: 'DESC', pageSize: 20});
  }, [location.search]);

  async function handlePreDownload(id: string) {
    try {
      const params = new URLSearchParams(location.search);

      const response = await transportService.preDownloadReport(id, {
        cancelToken: source.token,
      });

      const newWindow = window.open(
        process.env.REACT_APP_BASE_API_URL + response.data.downloadLink,
        '_blank',
        'noopener,noreferrer'
      );
      if (newWindow) newWindow.opener = null;
      fetchReports({pageNumber: Number(params.get('page') || 1) - 1, sort: 'DESC', pageSize: 20});
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  async function handleRetry(id: string) {
    try {
      const params = new URLSearchParams(location.search);

      await transportService.retryReport(id, {
        cancelToken: source.token,
      });

      fetchReports({pageNumber: Number(params.get('page') || 1) - 1, sort: 'DESC', pageSize: 20});
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  const clearSelectedDayRange = (e: any) => {
    e.stopPropagation();
    setSelectedDayRange({
      from: null,
      to: null,
    });
  };

  return (
    <>
      <fieldset className="text-center border rounded-xl p-1 mb-16">
        <legend className="text-black mx-auto px-3">لیست گزارش اصناف</legend>

        <div className="flex align-center justify-between mb-8">
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
                <span className="ml-4 whitespace-nowrap truncate text-xs">
                  {toPersianDigit(generateFromDate())}
                </span>
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
          <div className="flex align-center">
            <div className="relative inline-flex align-center leading-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute top-1/2 transform -translate-y-1/2 right-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="جستجو"
                className="py-2 px-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
              />
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
                  name: 'نام گزارش',
                  key: 'reportName',
                  render: (v, record, index: number, page: number) => (
                    <div className="flex">
                      {v || `گزارش شماره ${((page - 1) * 20 + (index + 1)).toLocaleString('fa')}`}
                    </div>
                  ),
                },
                {
                  name: 'دسته‌بندی',
                  key: 'category',
                  render: v => <span>{v || '-'}</span>,
                },
                {
                  name: 'تاریخ گزارش',
                  key: '',
                  render: (v, record: any) => (
                    <div className="flex flex-col text-gray-500">
                      <span>
                        {record.from
                          ? toPersianDigit(
                              dayjs(record.from).calendar('jalali').format('YYYY/MM/DD')
                            )
                          : ''}
                      </span>
                      <span>-</span>
                      <span>
                        {record.to
                          ? toPersianDigit(dayjs(record.to).calendar('jalali').format('YYYY/MM/DD'))
                          : ''}
                      </span>
                    </div>
                  ),
                },
                {
                  name: 'شماره شناسه',
                  key: 'trackingCode',
                  render: v => <span>{v || '-'}</span>,
                },
                {
                  name: 'تاریخ درخواست',
                  key: 'createdDate',
                  render: v => (
                    <div className="flex justify-center">
                      <div style={{width: '64px'}}>
                        <span className="text-gray-400 whitespace-normal">
                          {v
                            ? toPersianDigit(dayjs(v).calendar('jalali').format('YYYY/MM/DD HH:mm'))
                            : ''}
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  name: 'آخرین به‌روزرسانی',
                  key: 'lastModifiedDate',
                  render: v => (
                    <div className="flex justify-center">
                      <div style={{width: '64px'}}>
                        <span className="text-gray-500 whitespace-normal">
                          {v
                            ? toPersianDigit(dayjs(v).calendar('jalali').format('YYYY/MM/DD HH:mm'))
                            : ''}
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  name: 'وضعیت',
                  key: 'reportStatus',
                  render: (v: string, record: any) =>
                    (() => {
                      switch (v) {
                        case 'PROCESSING':
                          return <span className="text-yellow-500">در حال پردازش</span>;
                        case 'READY_FOR_DOWNLOAD':
                          return (
                            <div className="inline-flex">
                              <button
                                type="button"
                                className="button button--primary px-8 inline-flex w-auto justify-center items-center space-x-2 rtl:space-x-reverse"
                                onClick={() => handlePreDownload(record.id)}
                              >
                                <img src={download} alt="download" className="w-5 h-4" />
                                <span>دانلود</span>
                              </button>
                            </div>
                          );
                        case 'DOWNLOADED':
                          return <span className="text-gray-400">دانلود شده</span>;
                        default:
                          return (
                            <div className="flex justify-center items-center">
                              <button
                                type="button"
                                onClick={() => handleRetry(record.id)}
                                className="text-red-600 flex justify-center items-center space-x-1 rtl:space-x-reverse"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                <span>خطا</span>
                              </button>
                            </div>
                          );
                      }
                    })(),
                },
              ]}
              totalItems={(dataset || []).length}
            />
          )}
        </div>
      </fieldset>
    </>
  );
};

export default GuildReport;
