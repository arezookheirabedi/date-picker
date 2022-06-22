import React, {useEffect, useState} from 'react';


// @ts-ignore
import moment from 'moment-jalaali';
// import {schoolTypes} from 'src/helpers/sortingModels';
import { cancelTokenSource, msgRequestCanceled } from 'src/helpers/utils';
import Table from 'src/components/TableScopeSort';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';

import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import {toPersianDigit} from '../../../helpers/utils';

import Calendar from '../../Calendar';
import hcsService from '../../../services/hcs.service';


const PageSize=10
const TestStatus: React.FC<{}> = () => {

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

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const overviewTestResults = async (from: any = null, to: any = null) => {
    try {
      setLoading(true);
      const {data} = await hcsService.testResultsCategory('edu', 'grade', {
        lang: 'fa',
        from,
        to,
      },{cancelRequest:cancelToken.token});
      // console.log(data);

      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.categoryValue || 'نامشخص',
          total: item.testResultsCount || 0,
          positiveCount: item.positiveTestResultsCount || 0,
          positivePercentage: item.positiveTestResultsCountToTestResultsCountPercentage || 0,
          negativeCountPercentage: item.negativeTestResultsCountToTestResultsCountPercentage || 0,
        });
      });
      setDataset([...normalizedData]);
      
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    // getTestInTransport({count: true, total: true, testResultStatusList: 'POSITIVE,NEGATIVE'});
    overviewTestResults(query.resultReceiptDateFrom, query.resultReceiptDateTo);
    return () => {
    cancelRequest();
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
      <legend className="text-black mx-auto px-3">آزمایش در آموزش و پرورش</legend>
      <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
     

        <div className="flex items-center">
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
    
          <Table
          loading ={loading }
            dataSet={[...dataset]}
            pagination={{pageSize: PageSize, maxPages: 3}}
            columns={[
              {
                name: 'وضعیت',
                key: '',
                render: (v: any, record) => (
                  <CategoryDonut
                    data={[
                      {
                        name: 'unknownCount',
                        title: 'درصد تست‌های نامشخص',
                        y: record.unknownCount || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#6E6E6E'], // start
                            [1, '#393939'], // end
                          ],
                        },
                      },
                      {
                        name: 'negativeCountPercentage',
                        title: 'درصد تست‌های منفی',
                        y: record.negativeCountPercentage || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#05D8A4'], // start
                            [1, '#039572'], // end
                          ],
                        },
                      },
                      {
                        name: 'positiveCount',
                        title: 'درصد تست‌های مثبت',
                        y: record.positivePercentage || 0,
                        color: {
                          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                          stops: [
                            [0, '#FE2D2F'], // start
                            [1, '#CC0002'], // end
                          ],
                        },
                      },
                    ]}
                  />
                ),
                className: 'flex justify-center w-full',
              },
              {
                name: 'سازمان',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex">
                    {((page - 1) * PageSize + (index + 1)).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد آزمایش‌های انجام شده',
                key: 'total',
                sortable:true,
                render: (v: any) => (
                  <span>
                    {Number(v || 0)
                      .commaSeprator()
                      .toPersianDigits()}
                  </span>
                ),
              },
              {sortable:true,
                
                name: 'درصد تست‌های مثبت',
                key: 'positivePercentage',
                render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
              },
              {sortable:true,
                name: 'درصد تست‌های منفی',
                key: 'negativeCountPercentage',
                render: (v: any) => <span>{Number(v || 0).toPersianDigits()}%</span>,
              },
              // {
              //   name: 'درصد تست‌های نامشخص',
              //   key: 'unknownCount',
              //   render: (v: any, record: any) => (
              //     <span>
              //       {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
              //         .toFixed(4)
              //         .toPersianDigits()}
              //       %
              //     </span>
              //   ),
              // },
            ]}
            totalItems={(dataset || []).length || 0}
          />
       
      </div>
    </fieldset>
  );
};

export default TestStatus;
