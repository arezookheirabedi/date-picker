/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import {EERRORS} from 'src/constants/errors.enum';
import Table from 'src/components/TableXHR';
import {toPersianDigit} from 'src/helpers/utils';
import dayjs from 'dayjs';
import Spinner from '../../Spinner';
import RetryButton from '../../RetryButton';
import moderateRainy from '../../../assets/images/icons/moderate-rainy.svg';
import partlyCloudy from '../../../assets/images/icons/partly-cloudy.svg';
import rainy from '../../../assets/images/icons/rainy.svg';
import sunny from '../../../assets/images/icons/sunny.svg';
import thunder from '../../../assets/images/icons/thunder.svg';
import windy from '../../../assets/images/icons/windy.svg';

const pageSize = 10;
const ListOfTransportationAxesStatus = () => {
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
      const {data} = await arbaeenService.getRoadStatistics(
        {pageNumber: query.currentPage - 1},
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.roadName || 'نامشخص',
          numberOfSamah: item.numberOfSamah || 'نامشخص',
          numberOfPassengers: item.numberOfPassengers || 'نامشخص',
          submitTime: item.submitTime,
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
      <legend className="text-black mx-auto px-3">نگاه کلی به آخرین وضعیت محورهای مواصلاتی</legend>
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
            handlePageChange={handlePageChange}
            dataSet={[...dataset]}
            pagination={{pageSize, currentPage: query.currentPage}}
            totalItems={totalItems}
            columns={[
              {
                name: 'نام محور',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              // {
              //   name: 'وضعیت آب و هوا',
              //   key: 'climate',
              //   render: () => {
              //     const icons = [moderateRainy, partlyCloudy, rainy, sunny, thunder, windy];
              //     return (
              //       <img src={icons[Math.floor(Math.random() * 6)]} alt="" className="mx-auto" />
              //     );
              //   },
              // },
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
                name: 'زمان گزارش',
                key: 'submitTime',
                render: (v: any, record: any) => (
                  <>
                    <div className="flex w-full justify-center">
                      <span className="text-gray-500 whitespace-normal px-1">
                        {record.submitTime &&
                          toPersianDigit(
                            dayjs(record.submitTime).calendar('jalali').format('HH:mm')
                          )}
                      </span>
                      <span className="text-gray-500 whitespace-normal ">
                        -{' '}
                        {record.submitTime &&
                          toPersianDigit(
                            dayjs(record.submitTime).calendar('jalali').format('YYYY/MM/DD')
                          )}
                      </span>
                    </div>
                  </>
                ),
              },

              // {
              //   name: 'وضعیت ترافیک',
              //   key: 'trafficStatus',
              //   render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              // },
              // {
              //   name: 'وضعیت محور',
              //   key: 'axisStatus',
              //   render: () => {
              //     let status;
              //     const checkStatus = Math.floor(Math.random() * 2);
              //     if (!checkStatus) {
              //       status = 'مسدود';
              //     } else {
              //       status = 'غیر مسدود';
              //     }
              //     return (
              //       <span
              //         className={`${checkStatus ? 'text-green-600' : 'text-red-600'} font-semibold`}
              //       >
              //         {status}
              //       </span>
              //     );
              //   },
              // },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};

export default ListOfTransportationAxesStatus;
