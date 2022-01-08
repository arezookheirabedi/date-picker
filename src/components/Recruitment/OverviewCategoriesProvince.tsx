import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import transportService from 'src/services/transport.service';
import DatePickerModal from '../DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import Table from '../Table';
// import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import {getRecruitmentTagName, sideCities, toPersianDigit} from '../../helpers/utils';
import Spinner from '../Spinner';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}


const OverviewCategoriesProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  async function getOverviewByCategory(params: any) {
    setLoading(true);
    try {
      const {data} = await transportService.overviewCategory(params);

      const normalizedDate: any[] = [];
      data.forEach((item: any, index: number) => {
        if (item.total !== 0) {
          normalizedDate.push({
            id: `ovca_${index}`,
            name: getRecruitmentTagName[item.serviceType] || 'نامشخص',
            employeesCount: item.total || 0,
            infectedCount: item.count || 0,
            infectedPercent: (((item.count || 0) * 100) / (item.total || 0)).toFixed(4),
            saveCount: item.recoveredCount || 0,
            // deadCount: 120,
          });
        }
      });
      setDataset([...normalizedDate]);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getOverviewByCategory({
        resultStatus: 'POSITIVE',
        recoveredCount: true,
        total: true,
        count: true,
        province: provinceName,
      });
      //
    } else {
      history.push('/dashboard/recruitment/province');
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      getOverviewByCategory({
        resultStatus: 'POSITIVE',
        recoveredCount: true,
        total: true,
        count: true,
        resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="recruitment-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به کارکنان دولت کشور در استان &nbsp;
        {cityTitle}
      </legend>
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
                name: 'سازمان',
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

export default OverviewCategoriesProvince;
