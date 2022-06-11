import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import ButtonToggle from '../../Form/ButtonToggle';
import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import {sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import bakeryService from '../../../services/bakery.service';
import chartBoxIcon from '../../../assets/images/icons/chart-box.svg';
import chartBoxActiveIcon from '../../../assets/images/icons/chart-box-active.svg';
import extortionIcon from '../../../assets/images/icons/extortion.svg';
import extortionActiveIcon from '../../../assets/images/icons/extortion-active.svg';
import clockIcon from '../../../assets/images/icons/clock.svg';
import clockActiveIcon from '../../../assets/images/icons/clock-active.svg';

interface OverviewAuditProvinceProps {
  cityTitle?: any;
}

const OverviewAuditProvince: React.FC<OverviewAuditProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<any>(false);
  const [notUseFlour, setNotUseFlour] = useState<any>(false);
  const [isExtortion, setIsExtortion] = useState<any>(false);
  const [overTime, setOverTime] = useState<any>(false);

  const [dataset, setDataset] = useState<any>([]);
  const [filteredDataset, setFilteredDataset] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const [query, setQuery] = useState({
    resultReceiptDateFrom: null,
    resultReceiptDateTo: null,
    province: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const overviewTestResults = async (from: any = null, to: any = null, province: any) => {
    try {
      setLoading(true);
      const {data} = await bakeryService.bakeryAudit({
        lang: 'fa',
        from,
        to,
        province,
      });
      // console.log(data);
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue,
          total: item.total || 0,
          samt: item.samt || 0,
          sima: item.sima || 0,
          // deadCount: 120,
        });
        // }
      });
      setDataset([...normalizedData]);
      setFilteredDataset([...normalizedData]);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo, provinceName);
      // getOverviewByCategory({
      //   resultStatus: 'POSITIVE',
      //   recoveredCount: true,
      //   total: true,
      //   count: true,
      //   province: provinceName,
      // });
      //
    } else {
      history.push('/dashboard/transport/province');
    }
    return () => {
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search, query]);

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
    let d = [...dataset];
    if (isExtortion) d = d.filter(item => item.isExtortion === true);
    if (overTime) d = d.filter(item => item.overTime === true);
    if (notUseFlour) d = d.filter(item => item.notUseFlour === true);

    setFilteredDataset(d);
  }, [isExtortion, overTime, notUseFlour]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به لیست واحد‌هایی که نیاز به بازرسی دارند در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex items-center space-x-4 rtl:space-x-reverse my-8 mt-4 text-sm">
        <ButtonToggle
          name="overTime"
          title="مشکوک به تخلف از ساعت فعالیت"
          selected={overTime}
          onChange={setOverTime}
          defaultIcon={clockIcon}
          activeIcon={clockActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="notUseFlour"
          title="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
          selected={notUseFlour}
          onChange={setNotUseFlour}
          defaultIcon={chartBoxIcon}
          activeIcon={chartBoxActiveIcon}
          showCheckedIcon
        />
        <ButtonToggle
          name="isExtortion"
          title="مشکوک به گران فروشی"
          selected={isExtortion}
          onChange={setIsExtortion}
          defaultIcon={extortionIcon}
          activeIcon={extortionActiveIcon}
          showCheckedIcon
        />
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
            dataSet={[...filteredDataset]}
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
                  <div className="flex justify-center items-center">
                    <div className="flex justify-start items-center space-x-3 rtl:space-x-reverse">
                      {record.notUseFlour ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={chartBoxIcon}
                            alt="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.isExtortion ? (
                        <div className="">
                          <img className="w-4 h-4" src={extortionIcon} alt="مشکوک به گران فروشی" />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      {record.overTime ? (
                        <div className="">
                          <img
                            className="w-4 h-4"
                            src={clockIcon}
                            alt="مشکوک به تخلف از ساعت فعالیت"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </div>
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
            totalItems={(filteredDataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewAuditProvince;
