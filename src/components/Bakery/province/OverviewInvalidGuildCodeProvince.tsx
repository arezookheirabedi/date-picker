import React, { useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
// import moment from 'moment-jalaali';
// import DatePickerModal from '../../DatePickerModal';
import {isEmpty} from 'lodash';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';
import {sidesCities} from '../../../helpers/utils';
import ExportFile from '../ExportFile'

// hooks
import useOverviewOfInvalidGuildCodeDetailProvince from "../../../hooks/apis/bakery/useOverviewOfInvalidGuildCodeDetailProvince";

interface OverviewCategoriesProvinceProps {
    cityTitle?: any;
}

const OverviewInvalidGuildCodeProvince: React.FC<OverviewCategoriesProvinceProps> = ({cityTitle}) => {

  const location = useLocation();
  const history = useHistory();
  const [isOnPrint, setIsOnPrint] = useState<boolean>(false);

  // call bakery hook
  const {
    loading, 
    list: dataset, 
    count,
    setProvinceName
  } = useOverviewOfInvalidGuildCodeDetailProvince();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sidesCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      // overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo, provinceName);
      setProvinceName(provinceName);
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
  }, [cityTitle]);

  useEffect(()=> {
    if(isEmpty(dataset)) setIsOnPrint(false)
    else setIsOnPrint(true)
  },[dataset])

  const mapFilteredData = () => {
    return dataset.map((data:any, index:any) => {
      return {
        "شناسه": index + 1,
        "استان": data.province,
        "شهر": data.city === "NULL" ? "" : data.city,
        "شناسه پروانه سیما": data.simaId,
        "شناسه پروانه کسبی صمت": data.guildCode,
        "وضعیت عدم انطباق": data.buyerAsnafStatus,
        "شماره ملی": data.nationalId,
        "آدرس": data.address,
      };
    });
  };

  const finalData = mapFilteredData();

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      لیست واحدهای ثبت شده در سیما که پروانه کسبی معتبر ندارند در استان {cityTitle}
      </legend>

      {/* <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8"> */}
      <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
          <ExportFile 
              fileName="invalid-guildcode-province-list"
              data={finalData}
              loading={loading}
              isDisabled={isOnPrint}
          />
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
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
              {/* <div className='inline-flex justify-center'> */}
            <div className='relative z-20 inline-block text-left px-5 py-1 shadow rounded'>
              <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                <span className="mx-3 whitespace-nowrap truncate">
                  <span className="text-gray-500">
                    تعداد ردیف :
                  </span> {count}
                </span>
              </div>
            </div>
            <div className='relative z-20 inline-block text-left shadow rounded px-5 py-1'>
              <div className="inline-flex justify-center items-center w-full text-sm font-medium">
                <span className="mx-3 whitespace-nowrap truncate">
                  <span className="text-gray-500">
                    منبع :
                  </span> سامانه سیما
                </span>
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
                name: 'شهر',
                key: 'city',
                render: (v: any) => <span>{v === "NULL" ? '-' : v}</span>,
              },
              {
                name: 'شناسه پروانه سیما',
                key: 'simaId',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شناسه پروانه کسبی صمت',
                key: 'guildCode',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'وضعیت عدم انطباق',
                key: 'buyerAsnafStatus',
                render: (v: any) => <span>{v}</span>,
              },
              {
                name: 'شماره ملی',
                key: 'nationalId',
                render: (v: any) => <span>{v}</span>,
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

export default OverviewInvalidGuildCodeProvince;
