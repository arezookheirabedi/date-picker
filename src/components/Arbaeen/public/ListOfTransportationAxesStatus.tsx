import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import Spinner from '../../Spinner';
import RetryButton from '../../RetryButton';
import Table from '../../Table';
import moderateRainy from '../../../assets/images/icons/moderate-rainy.svg';
import partlyCloudy from '../../../assets/images/icons/partly-cloudy.svg';
import rainy from '../../../assets/images/icons/rainy.svg';
import sunny from '../../../assets/images/icons/sunny.svg';
import thunder from '../../../assets/images/icons/thunder.svg';
import windy from '../../../assets/images/icons/windy.svg';
import {axisData} from './constant';

const ListOfTransportationAxesStatus = () => {
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
      setDataSet(axisData);
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
      <legend className="text-black mx-auto px-3">لیست وضعیت محورهای مواصلاتی</legend>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
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
                name: 'اسم محور',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              {
                name: 'وضعیت آب و هوا',
                key: 'climate',
                render: () => {
                  const icons = [moderateRainy, partlyCloudy, rainy, sunny, thunder, windy];
                  return (
                    <img src={icons[Math.floor(Math.random() * 6)]} alt="" className="mx-auto" />
                  );
                },
              },
              {
                name: 'متوسط زائران در محور',
                key: 'avaragePilgrim',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'وضعیت ترافیک',
                key: 'trafficStatus',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'وضعیت محور',
                key: 'axisStatus',
                render: () => {
                  let status;
                  const checkStatus = Math.floor(Math.random() * 2);
                  if (!checkStatus) {
                    status = 'مسدود';
                  } else {
                    status = 'غیر مسدود';
                  }
                  return (
                    <span
                      className={`${checkStatus ? 'text-green-600' : 'text-red-600'} font-semibold`}
                    >
                      {status}
                    </span>
                  );
                },
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default ListOfTransportationAxesStatus;
