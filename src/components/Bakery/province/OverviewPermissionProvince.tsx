import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
// import moment from 'moment-jalaali';
// import DatePickerModal from '../../DatePickerModal';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';
import bakeryService from '../../../services/bakery.service';
import {sidesCities} from '../../../helpers/utils';

interface OverviewCategoriesProvinceProps {
    cityTitle?: any;
}

const OverviewPermissionProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {

  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const { CancelToken } = axios;
  const source = CancelToken.source();
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: null,
  //   to: null,
  //   clear: false,
  // }) as any;

  // const [query, setQuery] = useState({
  //   resultReceiptDateFrom: null,
  //   resultReceiptDateTo: null,
  // }) as any;

   // const [showDatePicker, setShowDatePicker] = useState(false);


  // const overviewTestResults = async (from: any = null, to: any = null) => {
  const overviewTestResults = async (province:any) => {
    try {
      setLoading(true);
      const { data } = await bakeryService.bakeryReport(
        { reportName: "permission" },
        { cancelToken: source.token }
      );
      // const {data} = await bakeryService.bakeryAudit({
      //   lang: 'fa',
      //   // from,
      //   // to,
      // });
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        // if (item.total !== 0) {
        normalizedData.push({
          id: `ovca_${index}`,
          ...item
        });
      });
      const sortData = normalizedData.filter(item => {
        return item.province.trim() === province
      })
      setDataset([...sortData]);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sidesCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo, provinceName);
      overviewTestResults(provinceName);
      // getOverviewByCategory({
      //   resultStatus: 'POSITIVE',
      //   recoveredCount: true,
      //   total: true,
      //   count: true,
      //   province: provinceName,
      // });
      //
    } else {
      history.push('/dashboard/bakery/province');
    }
    return () => {
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  // const focusFromDate = () => {
  //   setShowDatePicker(true);
  // };

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
  //     // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
  //     setQuery({
  //       ...query,
  //       resultReceiptDateFrom: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       resultReceiptDateTo: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   }
  //   if (selectedDayRange.clear) {
  //     setQuery({
  //       ...query,
  //       resultReceiptDateFrom: null,
  //       resultReceiptDateTo: null,
  //     });
  //   }
  // }, [selectedDayRange]);


  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      نگاه کلی به مجوز‌های کشور در استان {cityTitle}
      </legend>

      {/* <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8"> */}
      <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
          {/* {showDatePicker ? (
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
          /> */}
        
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
            pagination={{ pageSize: 10, maxPages: 3 }}
            columns={[
              {
                name: 'استان',
                key: 'province',
                className: 'flex justify-start',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start items-center space-x-2 rtl:space-x-reverse">
                    <span className="w-8">
                      {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.
                    </span>
                    <span>{v}</span>
                  </div>
                ),
              },
              {
                name: 'خریداران مشترک سیما و صمت',
                key: 'share',
                render: (v: any) => <span>{v || '-'}</span>,
              },
              {
                name: 'خریداران فعال صمت',
                key: 'samt',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'خریداران فعال سیما',
                key: 'sima',
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

export default OverviewPermissionProvince;
