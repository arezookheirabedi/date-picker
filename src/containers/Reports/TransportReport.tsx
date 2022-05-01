import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import dayjs from 'dayjs';
import transportService from 'src/services/transport.service';
// @ts-ignore
import moment from 'moment-jalaali';
import DatePickerModal from '../../components/DatePickerModal';
import Calendar from '../../components/Calendar';

import download from '../../assets/images/icons/download.svg';
import Table from '../../components/Table';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from '../../helpers/utils';
import Spinner from '../../components/Spinner';

const TransportReport: React.FC<{}> = () => {
  const location = useLocation();
  // const history = useHistory();
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
  const [query, setQuery] = useState({
    from: null,
    to: null,
  });
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function fetchReports(params: any) {
    setLoading(true);
    try {
      const response = await transportService.fetchRequestedReports(params, {
        cancelToken: cancelToken.token,
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
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      setQuery({
        ...query,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  useEffect(() => {
    fetchReports(query);

    return () => {
      setDataset([]);
      cancelRequest();
    };
  }, [query]);

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  async function handlePreDownload(id: string) {
    try {
      const params = new URLSearchParams(location.search);

      const response = await transportService.preDownloadReport(id, {
        cancelToken: cancelToken.token,
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
        cancelToken: cancelToken.token,
      });

      fetchReports({pageNumber: Number(params.get('page') || 1) - 1, sort: 'DESC', pageSize: 20});
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  return (
    <>
      <fieldset className="text-center border rounded-xl p-1 mb-16">
        <legend className="text-black mx-auto px-3"> لیست گزارش حمل و نقل</legend>

        <div className="flex align-center justify-between mb-8">
          <div className="flex items-center justify-between mb-10 mt-6">
            <div className="flex align-center justify-between flex-grow px-8">
              <div className="flex align-center justify-between">
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

export default TransportReport;
