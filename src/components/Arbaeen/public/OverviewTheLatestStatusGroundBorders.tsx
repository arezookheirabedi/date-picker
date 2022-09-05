/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import Table from 'src/components/TableXHR';
import {EERRORS} from 'src/constants/errors.enum';
import {toPersianDigit} from 'src/helpers/utils';
import Spinner from '../../Spinner';
import RetryButton from '../../RetryButton';

const pageSize = 10;
const OverviewTheLatestStatusGroundBorders = () => {
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
      const {data} = await arbaeenService.getTheLatestBordersStatus(
        {
          pageNumber: query.currentPage - 1,
        },
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.regionName || 'نامشخص',
          numberOfPassengers: item.numberOfPassengers || 'نامشخص',
          numberOfSamah: item.numberOfSamah || 'نامشخص',
          numberOfPassengersIn50KM: item.numberOfPassengersIn50KM || 0,
          numberOfPassengersIn100KM: item.numberOfPassengersIn100KM || 0,
          numberOfPassengersIn150KM: item.numberOfPassengersIn150KM || 0,
          numberOfPassengersIn200KM: item.numberOfPassengersIn200KM || 0,
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
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به آخرین وضعیت مرزهای زمینی</legend>
      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
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
                name: 'نام مرز',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <div className="flex w-full justify-start">
                    {toPersianDigit(((query.currentPage - 1) * pageSize + (index + 1)).toString())}.
                    {record.name}
                  </div>
                ),
              },

              {
                name: ' تعداد مسافران ',
                key: 'numberOfPassengers',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد زائران ',
                key: 'numberOfSamah',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد زائران در شعاع ۵۰ کیلومتری ',
                key: 'numberOfPassengersIn50KM',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد زائران در شعاع ۱۰۰ کیلومتری ',

                key: 'numberOfPassengersIn100KM',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد زائران در شعاع ۱۵۰ کیلومتری ',

                key: 'numberOfPassengersIn150KM',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد زائران در شعاع ۲۰۰ کیلومتری ',
                key: 'numberOfPassengersIn200KM',
                render: (v: any) => <span>{Number(v).toLocaleString('fa')}</span>,
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};

export default OverviewTheLatestStatusGroundBorders;
