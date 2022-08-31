/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import Spinner from '../../Spinner';
import RetryButton from '../../RetryButton';
import Table from '../../Table';
import {abroadData} from './constant';

const ListOfTheBusiestBorderCrossings = () => {
  const [error, setError] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState({
    tag: 'transport',
    category: 'serviceType',
    from: null,
    to: null,
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

      setDataSet(abroadData);
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
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3"> وضعیت تردد زائرین در گذرگاه مرزی</legend>
      <div className="p-40 text-red-500"> اطلاعات مورد نیاز دریافت نمی شود.</div>

      {/* <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        {loading && (
          <div className="p-40">
            <Spinner />
          </div>
        )}
        {error && !loading && (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery} />
          </div>
        )}

        {!error && !loading && (
          <Table
            dataSet={[...dataset]}
            pagination={{pageSize: 20, maxPages: 3}}
            columns={[
              {
                name: 'نام گذرگاه',
                key: 'bordearnName',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              {
                name: 'جمع ورودی',
                key: 'inportCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'جمع خروجی',
                key: 'exportCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'در انتظار بررسی گذرنامه',
                key: 'waitingVisaCheck',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'متوسط نرخ روزانه ورودی',
                key: 'AverageDailyEntryRate',
                render: (v: any) => (
                  <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                ),
              },
              {
                name: 'متوسط نرخ روزانه خروجی',
                key: 'AverageDailyOutRate',
                render: (v: any) => (
                  <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                ),
              },
              {
                name: 'درصد سهم هر گذرنامه مرزی از زائرین',
                key: 'PercentageShareEachBorderVisaFromPilgrims',
                render: (v: any) => (
                  <span>
                    {Number(v).toLocaleString('fa', {
                      minimumFractionDigits: 0,
                    })}
                    ٪
                  </span>
                ),
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div> */}
    </fieldset>
  );
};

export default ListOfTheBusiestBorderCrossings;
