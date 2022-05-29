import React, {useEffect, useState} from 'react';
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
import {useHistory, useLocation} from 'react-router-dom';
import DatePickerModal from '../../DatePickerModal';
import Table from '../../Table';
import {sideCities} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import bakeryService from '../../../services/bakery.service';

interface OverviewCategoriesProvinceProps {
  cityTitle?: any;
}

const OverviewCategoriesProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [filterType, setFilterType] = useState({name: 'بیشترین', enName: 'HIGHEST'});
  const [loading, setLoading] = useState(false);
  // const [isCancel, setIsCancel] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);
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
      const {data} = await bakeryService.bakeryPerCategory({
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
      setOrgDataset([...normalizedData]);
      setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // async function getOverviewByCategory(params: any) {
  //   try {
  //     setLoading(true);
  //     setIsCancel(false);
  //     const {data} = await transportService.overviewCategory(params, {cancelToken: source.token});
  //     const normalizedData: any[] = [];
  //     data.forEach((item: any, index: number) => {
  //       // if (item.total !== 0) {
  //       normalizedData.push({
  //         id: `ovca_${index}`,
  //         name: getServiceTypeName(item.serviceType),
  //         employeesCount: item.total || 0,
  //         infectedCount: item.count || 0,
  //         infectedPercent: ((item.count || 0) * 100) / (item.total || 0),
  //         saveCount: item.recoveredCount || 0,
  //         // deadCount: 120,
  //       });
  //       // }
  //     });
  //     setDataset([...normalizedData]);
  //     setOrgDataset([...normalizedData]);
  //     setFilterType({name: 'بیشترین', enName: 'HIGHEST'});
  //     setIsCancel(false);
  //   } catch (error: any) {
  //     // eslint-disable-next-line
  //     if (error && error.message === 'cancel') {
  //       setIsCancel(true);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
    const tmp = [...orgDataset].sort((a: any, b: any) => {
      // eslint-disable-next-line
      const reverse = filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

      if (a.infectedPercent < b.infectedPercent) {
        return reverse * 1;
      }

      if (a.infectedPercent > b.infectedPercent) {
        return reverse * -1;
      }
      // a must be equal to b
      return 0;
    });

    setDataset(tmp);
  }, [filterType]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی بر واحد‌های خبازی در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
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
            pagination={{pageSize: 20, maxPages: 3}}
            columns={[
              {
                name: 'رسته‌های نانوایی',
                key: 'name',
                className: 'flex justify-start',
                render: (v: any, record, index: number) => (
                  <div className="flex justify-start items-center">
                    {(index + 1).toLocaleString('fa')}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد کل',
                key: 'total',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'مجوز صمت',
                key: 'samt',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'مجوز سامانه سیما',
                key: 'sima',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
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
