import React, {useEffect, useState} from 'react';
import guildService from 'src/services/guild.service';
import Table from 'src/components/TableXHR';
import dayjs from 'dayjs';
import DatepickerQuery from 'src/components/DatepickerQuery';
import {EERRORS} from 'src/constants/errors.enum';
import RetryButton from 'src/components/RetryButton';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from '../../helpers/utils';
import ExportButton from './ExportButton';

const pageSize = 10;
const GuildReport: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const [query, setQuery] = useState({
    from: null,
    to: null,
    currentPage: 1,
    retry: false,
    sort: 'DESC',
    sortKey: ['reportStatus'].join(','),
    pageSize,
  });
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  async function fetchReports({retry, from, to, ...params}: any) {
    const newData = {
      ...params,
      pageNumber: Number(query.currentPage) - 1,
      fromReportDate: query.from,
      toReportDate: query.to,
    };
    setLoading(true);
    try {
      const {data} = await guildService.guildReportoverviewStatus(newData, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any) => {
        normalizedData.push({
          id: item.id,
          reportName: item.reportName,
          requestDateTime: item.requestDateTime,
          lastModifiedDate: item.lastModifiedDate,
          trackingCode: item.trackingCode,
          reportStatus: item.reportStatus,
        });
      });

      setDataSet([...normalizedData]);
      setTotalItems(data.totalElements);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setErrorMessage(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports({...query});
    return () => {
      setDataSet([]);
      cancelRequest();
    };
  }, [query, refresh]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست گزارش اصناف</legend>

        <div className="flex align-center justify-between mb-8">
          <div className="flex items-center justify-between">
            <div className="flex align-center justify-between flex-grow">
              <div className="flex align-center justify-between">
                <DatepickerQuery query={query} setQuery={setQuery} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          {errorMessage && !loading ? (
            <div className="p-40">
              <div className="text-red-500">{errorMessage}</div>
              <RetryButton setQuery={setQuery} />
            </div>
          ) : (
            <Table
              handlePageChange={handlePageChange}
              loading={loading}
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
                  name: 'نام گزارش',
                  key: 'reportName',
                  render: (v: any, record: any) => <span> {record.reportName}</span>,
                },
                {
                  name: 'تاریخ گزارش',
                  key: '',
                  render: (v: any, record: any) => (
                    <div className="flex w-full justify-center">
                      <span className="text-gray-500 whitespace-normal ">
                        {toPersianDigit(
                          dayjs(record.requestDateTime).calendar('jalali').format('YYYY/MM/DD')
                        )}
                      </span>
                    </div>
                  ),
                },
                {
                  name: 'شماره شناسه',
                  key: 'trackingCode',
                  render: (v: any, record: any) => (
                    <span className="text-gray-500">{toPersianDigit(record.trackingCode)}</span>
                  ),
                },
                {
                  name: 'تاریخ درخواست',
                  key: 'requestDateTime',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="text-gray-500 whitespace-normal ">
                          {toPersianDigit(
                            dayjs(record.requestDateTime).calendar('jalali').format('YYYY/MM/DD')
                          )}
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className="text-gray-500 whitespace-normal">
                          {toPersianDigit(
                            dayjs(record.requestDateTime).calendar('jalali').format('HH:mm')
                          )}
                        </span>
                      </div>
                    </>
                  ),
                },
                {
                  name: 'آخرین به‌روزرسانی',
                  key: 'lastModifiedDate',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="text-gray-500 whitespace-normal ">
                          {toPersianDigit(
                            dayjs(record.lastModifiedDate).calendar('jalali').format('YYYY/MM/DD')
                          )}
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className="text-gray-500 whitespace-normal">
                          {toPersianDigit(
                            dayjs(record.lastModifiedDate).calendar('jalali').format('HH:mm')
                          )}
                        </span>
                      </div>
                    </>
                  ),
                },
                {
                  name: 'وضعیت',
                  key: 'reportStatus',
                  render: (v: any, record: any) => (
                    <div className="flex w-full justify-center">
                      <ExportButton
                        reportType="guilds"
                        item={record}
                        shouldRefresh={shouldRefresh}
                        refresh={refresh}
                      />
                    </div>
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

export default GuildReport;
