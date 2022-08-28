/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableScopeSort';
import arbaeenService from 'src/services/arbaeen.service';
import {mokebList} from './constant';

const MokebList: React.FC<{}> = () => {
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
      mokebList.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.name || 'نامشخص',
          location: item.location || 'نامشخص',
          owner: item.owner || 'نامشخص',
          managerName: item.managerName || 'نامشخص',
          type: item.type || 'نامشخص',
          capacity: item.capacity,
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
      <legend className="mx-auto px-3 text-black">لیست موکب ها</legend>
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
                name: 'اسم موکب',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'موقعیت موکب',
                key: 'location',
              },
              {
                name: 'نوع موکب',
                key: 'type',
              },
              {
                name: 'ظرفیت موکب',
                key: 'capacity',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.capacity || 0).toPersianDigits()}</span>
                ),
              },

              {
                name: 'صاحب موکب',
                key: 'owner',
              },
              {
                name: 'نام و نام خانوادگی مسئول موکب',
                key: 'managerName',
                render: (v: any, record: any) => (
                  <span className="text-sky-500">{record.managerName}</span>
                ),
              },
            ]}
          />
        )}
      </div> */}
    </fieldset>
  );
};
export default MokebList;
