import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import transportService from 'src/services/transport.service';
import DatePickerModal from '../../components/DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import Table from '../../components/Table';
import {toPersianDigit} from '../../helpers/utils';
import Spinner from '../../components/Spinner';

const Requested: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  // eslint-disable-next-line
  const [totalItems, setTotalItems] = useState(0);
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
      setTotalItems(response.data.totalElements);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
      setTotalItems(0);
      setLoading(false);
    };
  }, [history]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchReports({pageNumber: Number(params.get('page') || 1) - 1, sort: 'DESC', pageSize: 20});
  }, [location.search]);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست درخواست دانلود گزارش</legend>

        <div className="flex align-center justify-start mb-8">
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
                  key: '',
                  render: (v, record, index: number) => (
                    <span>گزارش شماره{(index + 1).toLocaleString('fa')}</span>
                  ),
                },
                {
                  name: 'دسته‌بندی',
                  key: '',
                  render: (v, record, index: number) => (
                    <span>گزارش شماره{(index + 1).toLocaleString('fa')}</span>
                  ),
                },
                {
                  name: 'تاریخ گزارش',
                  key: '',
                  render: (v, record: any) => (
                    <div className="flex flex-col text-gray-500">
                      <span>{record.from}</span>
                      <span>{record.to}</span>
                    </div>
                  ),
                },
                {
                  name: 'شماره شناسه',
                  key: '',
                  render: (v, record, index: number) => (
                    <span>گزارش شماره{(index + 1).toLocaleString('fa')}</span>
                  ),
                },
                {
                  name: 'تاریخ درخواست',
                  key: '',
                  render: (v, record, index: number) => (
                    <span>گزارش شماره{(index + 1).toLocaleString('fa')}</span>
                  ),
                },
                {
                  name: 'آخرین به روز رسانی',
                  key: '',
                  render: (v, record, index: number) => (
                    <span>گزارش شماره{(index + 1).toLocaleString('fa')}</span>
                  ),
                },
                {
                  name: 'وضعیت',
                  key: 'reportStatus',
                  render: (v, record) => <a href={record.filePreparationLink}>{v}</a>,
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

export default Requested;
