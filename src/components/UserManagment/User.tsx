/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {EERRORS} from 'src/constants/errors.enum';
import {cancelTokenSource, msgRequestCanceled, toPersianDigit} from 'src/helpers/utils';
import authenticationService from 'src/services/authentication.service';
import guildService from 'src/services/guild.service';
import RetryButton from '../RetryButton';
import SearchableMultiSelect from '../SearchableMultiSelect.tsx';
import Table from '../TableXHR';
import CreateButton from './CreateButton';
import EditButton from './EditButton';
import Options from './Options';
import Action from "./Actions"

const pageSize = 10;

export default function index() {
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refresh, shouldRefresh] = useState<boolean>(false);
  const wrapperRef = useRef(null);
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
        <legend className="text-black mx-auto px-3">لیست کاربران</legend>
        <div className="mb-8 flex items-center justify-between">
          <div className="inline-flex">
            <CreateButton />
            <SearchableMultiSelect endPoint={authenticationService.rolePermision} />
          </div>
        </div>
        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          {errorMessage && !loading ? (
            <div className="p-40">
              <div className="text-red-500">{errorMessage}</div>
              <RetryButton setQuery={setQuery} />
            </div>
          ) : (
            <div
            ref={wrapperRef}
          >
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
                },
                {
                  name: 'آخرین به‌روزرسانی',
                  key: 'lastModifiedDate',
                },
                {
                  name: 'وضعیت',
                  key: 'reportStatus',
                  render: (v: any, record: any) => (
                    <div className="flex items-center justify-end">
                    <Action item={record} wrapperRef={wrapperRef} />
                  </div>
                  ),
                },
              ]}
            />
            </div>
          )}
        </div>
      </fieldset>
    </>
  );
}
