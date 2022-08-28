/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableScopeSort';
import arbaeenService from 'src/services/arbaeen.service';
import {redHelalList} from './constant';

const RedHalalBasesList: React.FC<{}> = () => {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    retry: false,
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
      const {data} = await arbaeenService.arbaeenGetAll(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      redHelalList.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.name || 'نامشخص',
          location: item.location || 'نامشخص',
          baseCode: item.baseCode,
          managerName: item.managerName || 'نامشخص',
          capacity: item.capacity,
          providedServicesCount: item.providedServicesCount,
        });
      });
      setDataSet([...normalizedData]);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcher();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">لیست پایگاه های هلال احمر</legend>
      <div className="p-40 text-red-500"> اطلاعات مورد نیاز دریافت نمی شود.</div>

      {/* <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        {error && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        ) : (
          <Table
            totalItems={(dataset || []).length}
            loading={loading}
            dataSet={[...dataset]}
            pagination={{pageSize: 10, maxPages: 3}}
            columns={[
              {
                name: 'اسم پایگاه',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'کد پایگاه',
                key: 'baseCode',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.baseCode || 0).toPersianDigits()}</span>
                ),
              },
              {
                name: 'ظرفیت پایگاه',
                key: 'capacity',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.capacity || 0).toPersianDigits()}</span>
                ),
              },
              {
                name: 'تعداد خدمات ارائه شده',
                key: 'providedServicesCount',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.providedServicesCount || 0).toPersianDigits()}
                  </span>
                ),
              },
              {
                name: 'موقعیت پایگاه',
                key: 'location',
              },
              {
                name: 'مسئول پایگاه',
                key: 'managerName',
              },
            ]}
          />
        )}
      </div> */}
    </fieldset>
  );
};
export default RedHalalBasesList;
