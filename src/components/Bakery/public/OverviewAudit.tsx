import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import bakeryService from '../../../services/bakery.service';
import chartBoxIcon from '../../../assets/images/icons/chart-box.svg';
import extortionIcon from '../../../assets/images/icons/extortion.svg';
import clockIcon from '../../../assets/images/icons/clock.svg';

const OverviewAudit: React.FC<{}> = () => {
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
      const {data} = await bakeryService.bakeryAudit({
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
          ...item,
        });
      });
      setDataset([...normalizedData]);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataset([]);
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

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به لیست واحد‌هایی که نیاز به بازرسی دارند
      </legend>

      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-16 text-sm">
        <button type="button" className="flex-grow flex items-center justify-between">
          <div className="w-full flex items-center bg-white shadow rounded p-4 py-2 space-x-2 rtl:space-x-reverse">
            <div className="">
              <img className="w-4 h-4" src={clockIcon} alt="" />
            </div>
            <span>مشکوک به تخلف از ساعت فعالیت</span>
          </div>
          <div className="" />
        </button>
        <button type="button" className="flex-grow flex items-center justify-between">
          <div className="w-full flex items-center bg-white shadow rounded p-4 py-2 space-x-2 rtl:space-x-reverse">
            <div className="">
              <img className="w-4 h-4" src={chartBoxIcon} alt="" />
            </div>
            <span>مشکوک به عدم استفاده‌ مجاز از سهمیه آرد</span>
          </div>
          <div className="" />
        </button>
        <button type="button" className="flex-grow flex items-center justify-between">
          <div className="w-full flex items-center bg-white shadow rounded p-4 py-2 space-x-2 rtl:space-x-reverse">
            <div className="">
              <img className="w-4 h-4" src={extortionIcon} alt="" />
            </div>
            <span>مشکوک به گران فروشی</span>
          </div>
          <div className="" />
        </button>
      </div>

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
        {loading ? (
          <div className="p-20">
            <Spinner />
          </div>
        ) : (
          <Table
            dataSet={[...dataset]}
            pagination={{pageSize: 10, maxPages: 3}}
            columns={[
              {
                name: 'وضعیت',
                key: 'status',
                className: 'flex justify-start',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start items-center space-x-2 rtl:space-x-reverse">
                    <span className="w-8">
                      {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full shadow bg-gradient-to-bl ${
                        v === 'active' ? 'from-green-800 to-green-500' : 'from-red-800 to-red-500'
                      }`}
                    />
                  </div>
                ),
              },
              {
                name: 'استان',
                key: 'province',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شهر',
                key: 'city',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شناسه پروانه سیما',
                key: 'simaId',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شناسه POS بانکی',
                key: 'posId',
                render: (v: any) => <span>{v || '-'}</span>,
              },
              {
                name: 'شماره ملی',
                key: 'nationalId',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'نوع تخلف قابل بررسی',
                key: 'types',
                render: (v: any, record: any) => (
                  <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
                    {record.notUseFlour && (
                      <div className="">
                        <img
                          className="w-4 h-4"
                          src={chartBoxIcon}
                          alt="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
                        />
                      </div>
                    )}
                    {record.isExtortion && (
                      <div className="">
                        <img className="w-4 h-4" src={extortionIcon} alt="مشکوک به گران فروشی" />
                      </div>
                    )}
                    {record.overTime && (
                      <div className="">
                        <img
                          className="w-4 h-4"
                          src={clockIcon}
                          alt="مشکوک به تخلف از ساعت فعالیت"
                        />
                      </div>
                    )}
                  </div>
                ),
              },
              {
                name: 'آدرس',
                key: 'address',
                className: 'flex justify-start',
                render: (v: any) => <span>{v}</span>,
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewAudit;
