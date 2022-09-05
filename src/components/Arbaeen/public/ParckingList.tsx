/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableXHR';
import {EERRORS} from 'src/constants/errors.enum';
import {toPersianDigit} from 'src/helpers/utils';
import arbaeenService from 'src/services/arbaeen.service';

const pageSize = 10;
const ParckingList: React.FC<{}> = () => {
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const [query, setQuery] = useState({
    retry: false,
    currentPage: 1,
  }) as any;

  const [loading, setLoading] = useState(false);
  const [dataset, setDataSet] = useState<any>([]);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const fetcher = async () => {
    setLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await arbaeenService.getParckingList(
        {pageNumber: query.currentPage - 1},
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.name || 'نامشخص',
          description: item.description || 'نامشخص',
          coordinatesLat: item.coordinates[0] || 0,
          coordinatesLong: item.coordinates[1] || 0,
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
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }
  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">لیست پارکینگ ها</legend>
      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        {error && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        ) : (
          <Table
            loading={loading}
            handlePageChange={handlePageChange}
            dataSet={[...dataset]}
            pagination={{pageSize, currentPage: query.currentPage}}
            totalItems={totalItems}
            columns={[
              {
                name: 'نام ',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <div className="flex w-full justify-start">
                    {toPersianDigit(((query.currentPage - 1) * pageSize + (index + 1)).toString())}.
                    {record.name}
                  </div>
                ),
              },

              {
                name: ' توضیحات',
                key: 'description',
                render: (v: any, record: any) => <span className=" ">{record.description}</span>,
              },
              {
                name: 'عرض جغرافیایی',
                key: 'coordinatesLat',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.coordinatesLat || 0).toPersianDigits()}</span>
                ),
              },
              {
                name: 'طول جغرافیایی ',
                key: 'coordinatesLong',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.coordinatesLong || 0).toPersianDigits()}</span>
                ),
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};
export default ParckingList;
