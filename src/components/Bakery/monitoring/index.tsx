import React, { useEffect,  useState} from 'react';
// @ts-ignore
// import moment from 'moment-jalaali';
import Table from 'src/components/TableXHR';
import dayjs from 'dayjs';
import {
   cancelTokenSource,
   msgRequestCanceled,
   toPersianDigit,
} from 'src/helpers/utils';
import Spinner from 'src/components/Spinner';
import { isEmpty} from 'lodash';
import guildService from 'src/services/guild.service';
import { ExpandedForm} from './ExpandedForm';
import FilterInterceptors from './FilterInterceptors';
// import FilterInterceptors from './FilterInterceptors';

// import FilterInterceptors from './FilterInterceptors';

const BakeryMonitoringList: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // const [dataSet, setDataSet] = useState<any[]>(initialValue);
  const [dataSet, setDataSet] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;
  const [query, setQuery] = useState({
    from: null,
    to: null,
    currentPage: 1,
    inspectorId: null,
    inspectorNationalId: null,
    qrCode: null,
  });
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const pageSize = 5;

  async function fetcher(params: any) {
    setLoading(true);
    try {
      const {data} = await guildService.bakeryInspections(params, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
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
      setTotalItems(data.totalElements);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetcher({
      sort: 'DESC',
      //   sortKey: ['reportStatus'].join(','),
      from: query.from,
      to: query.to,
      pageNumber: query.currentPage - 1,
      pageSize,
      inspectorId: query.inspectorId,
      inspectorNationalId: query.inspectorNationalId,
      qrCode: query.qrCode,
    });
    return () => {
      setDataSet([]);
      cancelRequest();
    };
  }, [query]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }

  return (
    <>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <div className="mb-8 flex flex-col items-center justify-center space-y-6">
          <FilterInterceptors handleSetFilters={setQuery} />
        </div>
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
                  render: (v: any, record: any) => <span>{record.inspectorId}</span>,
                },
                {
                  name: ' QR-Code',
                  key: 'qrCode',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">
                      {record.qrCode}
                      {/* {record.qrCode||" "} */}
                    </span>
                  ),
                },
                {
                  name: 'شماره واحد',
                  key: 'unitNumber',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{record.unitNumber}</span>
                  ),
                },
                {
                  name: 'تاریخ بازرسی',
                  key: 'inspectionDateTime',
                  render: (v: any, record: any) => (
                    <div className="flex w-full justify-center">
                      <span className="whitespace-normal text-gray-500 ">
                        {record.inspectionDateTime ? (
                          toPersianDigit(
                            dayjs(record.inspectionDateTime).calendar('jalali').format('YYYY/MM/DD')
                          )
                        ) : (
                          <>-</>
                        )}
                      </span>
                    </div>
                  ),
                },

                {
                  name: 'تاریخ آخرین بازرسی',
                  key: 'lastInspectionDateTime',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="whitespace-normal text-gray-500 ">


                        {record.lastInspectionDateTime ? (
                          toPersianDigit(
                            dayjs(record.lastInspectionDateTime).calendar('jalali').format('YYYY/MM/DD')
                          )
                        ) : (
                          <>-</>
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