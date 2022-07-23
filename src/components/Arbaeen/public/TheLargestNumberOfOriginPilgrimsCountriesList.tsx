/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableScopeSort';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
import {pilgrimsCountries} from './constant';

const TheLargestNumberOfOriginPilgrimsCountriesList: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [queryParams, setQueryParams] = useState({
    retry: false,
  });
  useEffect(() => {
    const normalizedData: any[] = [];
    pilgrimsCountries.forEach((item: any, index: number) => {
      normalizedData.push({
        id: `ovca_${index}`,
        country: item.country || 'نامشخص',
        pilgrimsCount: item.pilgrimsCount,
        pilgrimsTototalPercentage: item.pilgrimsTototalPercentage,
        womenPercentage: item.womenPercentage,
        menPercentage: item.menPercentage,
      });
    });
    setDataset([...normalizedData]);
  }, []);
  return (
    <>
      {' '}
      <fieldset className="mb-2 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">
          لیست بیشترین کشور های مبدا اتباع خارجی زائرین
        </legend>

        <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
          {error && !loading ? (
            <div className="p-40">
              <div className="text-red-500">{error}</div>
              <RetryButton setQuery={setQueryParams} />
            </div>
          ) : (
            <Table
              totalItems={(dataset || []).length}
              loading={loading}
              dataSet={[...dataset]}
              pagination={{pageSize: 10, maxPages: 3}}
              columns={[
                {
                  name: 'کشور',
                  key: 'country',
                  render: (v: any, record, index: number, page: number) => (
                    <div className="flex justify-center">
                      {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                    </div>
                  ),
                },
                {
                  name: 'تعداد زائرین',
                  key: 'pilgrimsCount',
                  render: (v: any, record: any) => (
                    <span className="">{Number(record.pilgrimsCount || 0).toPersianDigits()}</span>
                  ),
                },
                {
                  name: 'درصد زنان زائر',
                  key: 'womenPercentage',
                  render: (v: any, record: any) => (
                    <span className="">
                      {Number(record.womenPercentage || 0).toPersianDigits()}٪
                    </span>
                  ),
                },
                {
                  name: 'درصد مردان زائر',
                  key: 'menPercentage',
                  render: (v: any, record: any) => (
                    <span className="">{Number(record.menPercentage || 0).toPersianDigits()}٪</span>
                  ),
                },

                {
                  name: 'درصد از کل زائرین',
                  key: 'pilgrimsTototalPercentage',
                  render: (v: any, record: any) => (
                    <span className="">
                      {Number(record.pilgrimsTototalPercentage || 0).toPersianDigits()}٪
                    </span>
                  ),
                },
              ]}
            />
          )}
        </div>
      </fieldset>
      <fieldset className=" rounded-xl border py-2 px-4 text-center">
        <div className=" flex justify-between">
          <div className="flex items-center justify-start">
            <img src={Irancell} className="inline" alt="irancell-logo" />
            <span className="px-2">باهمکاری ایرانسل</span>
          </div>
          <div>
            <img src={Vasl} className="inline " alt="vasl-logo" />
          </div>
        </div>
      </fieldset>
    </>
  );
};
export default TheLargestNumberOfOriginPilgrimsCountriesList;
