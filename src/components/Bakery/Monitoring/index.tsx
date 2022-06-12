import React, {useEffect, useState} from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import Table from 'src/components/TableXHR';
import dayjs from 'dayjs';
// import DatePickerModal from 'src/components/DatePickerModal';
// import Calendar from 'src/components/Calendar';
import {toPersianDigit} from 'src/helpers/utils';
import Spinner from 'src/components/Spinner';
import {isEmpty} from 'lodash';
// import guildService from 'src/services/guild.service';
import {mock} from './constant';
import {ExpandedForm} from './ExpandedForm';
// import FilterInterceptors from './FilterInterceptors';

const BakeryMonitoringList: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(2);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const [query, setQuery] = useState({
    fromReportDate: null,
    toReportDate: null,
    currentPage: 1,
    inspectorNationalId: null,
    inspectorId: null,
    qrCode: null,
  });
  // const cancelToken = cancelTokenSource();

  // function cancelRequest() {
  //   cancelToken.cancel(msgRequestCanceled);
  // }
  const pageSize = 1;

  // async function fetcher(params: any) {
  //   setLoading(true);
  //   try {
  //     const {data} = await guildService.bakeryInspections(params, {
  //       cancelToken: cancelToken.token,
  //     });
  //     const normalizedData: any[] = [];
  //     data.content.forEach((item: any, index: number) => {
  //       normalizedData.push({
  //         id: `bakery${index}`,
  //         inspectionDateTime: item.inspectionDateTime,
  //         lastInspectionDateTime: item.lastInspectionDateTime,
  //         inspectorId: item.inspectors ? item.inspectors[0].inspectorId : '-',
  //         qrCode: item.qrCode,
  //         unitNumber: item.unitNumber,
  //         allData: item,
  //       });
  //     });

  //     setDataSet([...normalizedData]);
  //     setTotalItems(data.totalElements);
  //   } catch (error: any) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
  //     setQuery({
  //       ...query,
  //       currentPage: 1,
  //       fromReportDate: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       toReportDate: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   }
  //   if (selectedDayRange.clear) {
  //     setQuery({
  //       ...query,
  //       fromReportDate: null,
  //       toReportDate: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  const normalizer = () => {
    const normalizedData: any[] = [];

    mock.forEach((item: any, index: number) => {
      normalizedData.push({
        id: `bakery${index}`,
        inspectionDateTime: item.inspectionDateTime,
        lastInspectionDateTime: item.lastInspectionDateTime,
        inspectorId: item.inspectors ? item.inspectors[0].inspectorId : '-',
        qrCode: item.qrCode,
        unitNumber: item.unitNumber,
        allData: item,
      });
    });

    setDataSet([...normalizedData]);
  };

  useEffect(() => {
    normalizer();

    // fetcher({
    //   sort: 'DESC',
    //   //   sortKey: ['reportStatus'].join(','),
    //   fromReportDate: query.fromReportDate,
    //   toReportDate: query.toReportDate,
    //   pageNumber: query.currentPage - 1,
    //   pageSize,
    // });
    // return () => {
    //   setDataSet([]);
    //   cancelRequest();
    // };
  }, [query]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }

  return (
    <>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        {/* <div className="mb-8 flex flex-col items-center justify-center space-y-6">
          <FilterInterceptors handleSetFilters={setQuery} />
        </div> */}
        <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
          {loading ? (
            <div className="p-20">
              <Spinner />
            </div>
          ) : (
            <Table
              expandable={{
                rowExpandable: (record: any) => record && !isEmpty(record),
                expandedRowRender: ({...record}) => <ExpandedForm {...record} />,
              }}
              handlePageChange={handlePageChange}
              dataSet={[...dataSet]}
              pagination={{pageSize, currentPage: query.currentPage}}
              totalItems={totalItems}
              columns={[
                {
                  name: 'ردیف',
                  key: '',
                  render: (v: any, record, index: number) => (
                    <div className="flex w-full justify-center">
                      {toPersianDigit(
                        ((query.currentPage - 1) * pageSize + (index + 1)).toString()
                      )}
                      .
                    </div>
                  ),
                },
                {
                  name: 'کد بازرس',
                  key: 'inspectorId',
                  render: (v: any, record: any) => <span> {record.inspectorId}</span>,
                },
                {
                  name: ' QR-Code',
                  key: 'qrCode',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">
                      {record.qrCode}
                      {/* {toPersianDigit(record.inspectorId)} */}
                    </span>
                  ),
                },
                {
                  name: 'شماره واحد',
                  key: 'unitNumber',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">
                      {record.unitNumber}
                      {/* {toPersianDigit(record.unitNumber)} */}
                    </span>
                  ),
                },
                {
                  name: 'تاریخ بازرسی',
                  key: 'inspectionDateTime',
                  render: (v: any, record: any) => (
                    <div className="flex w-full justify-center">
                      <span className="whitespace-normal text-gray-500 ">
                        {toPersianDigit(
                          dayjs(record.inspectionDateTime).calendar('jalali').format('YYYY/MM/DD')
                        )}
                      </span>
                    </div>
                  ),
                },

                {
                  name: 'تاریخ آخرین بازرسی',
                  key: 'inspectionDateTime',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="whitespace-normal text-gray-500 ">
                          {toPersianDigit(
                            dayjs(record.inspectionDateTime).calendar('jalali').format('YYYY/MM/DD')
                          )}
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className="whitespace-normal text-gray-500">
                          {toPersianDigit(
                            dayjs(record.requestDateTime).calendar('jalali').format('HH:mm')
                          )}
                        </span>
                      </div>
                    </>
                  ),
                },
              ]}
            />
          )}
        </div>
      </fieldset>
    </>
  );
};

export default BakeryMonitoringList;
