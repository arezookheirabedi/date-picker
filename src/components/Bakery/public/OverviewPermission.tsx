import React, {useEffect, useState} from 'react';

// @ts-ignore
// import moment from 'moment-jalaali';
// import DatePickerModal from '../../DatePickerModal';
import {isEmpty} from 'lodash';
import Table from '../../TableScope';
import Spinner from '../../Spinner';
// import Calendar from '../../Calendar';
import ExportFile from '../ExportFile'

// hooks
import useOverviewOfPermission from "../../../hooks/apis/bakery/useOverviewOfPermission";


const OverviewPermission: React.FC<{}> = () => {

  // call bakery hook
  const { loading, list: dataset } = useOverviewOfPermission();
  const [isOnPrint, setIsOnPrint] = useState<boolean>(false);

  // const tableRef = useRef<any>();
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

  useEffect(()=> {
    if(isEmpty(dataset)) setIsOnPrint(false)
    else setIsOnPrint(true)
  },[dataset])

  const mapData = () => {
    return dataset.map((data:any, index:any) => {
      return {
        "شناسه": index + 1,
        "استان": data.province,
        "خریداران مشترک سیما و صمت": data.joint,
        "خریداران فعال صمت": data.samt,
        "خریداران فعال سیما" : data.sima
      };
    });
  };
  
  const finalData = mapData();
 
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
      نگاه کلی به مجوز‌های کشور
      </legend>

      {/* <div className="flex flex-grow items-center justify-start space-x-5 rtl:space-x-reverse mb-8"> */}
      <div className="flex flex-grow items-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center space-x-4 rtl:space-x-reverse">
           <ExportFile 
              fileName="licenses-country-list"
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
                key: 'joint',
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

export default OverviewPermission;
