import axios from 'axios';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableScopeSort';
import {EERRORS} from 'src/constants/errors.enum';
import arbaeenService from 'src/services/arbaeen.service';

const ThPilgrimsProvinceList: React.FC<{}> = () => {
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
      const {data} = await arbaeenService.getPiligrimOriginProvince(
        {},
        {cancelToken: source.token}
      );
      const normalizedData: any[] = [];
      data.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          city: item.province || 'نامشخص',
          pilgrimsCount: item.totalCount || 0,
          womenPercentage: item.femaleCountPercentage || 0,
          menPercentage: item.maleCountPercentage || 0,
          vaccinePercentage: item.vaccinesCountPercentage || 0,
          firstDosesPercentage: item.firstDosePercentage || 0,
          secondDosesPercentage: item.secondDosePercentage || 0,
          thirdDosesPercentage: item.thirdDosePercentage || 0,
          fifthDosesPercentage: item.fifthDosePercentage || 0,
          forthDosesPercentage: item.fourthDosePercentage || 0,
        });
      });
      setDataSet([...normalizedData]);
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

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">لیست استان های مبدا زائرین </legend>

      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
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
                name: 'استان',
                key: 'city',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-start">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد زائرین',
                sortable: true,
                key: 'pilgrimsCount',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.pilgrimsCount || 0).toPersianDigits()}</span>
                ),
              },
              {
                name: 'درصد زنان زائر',
                key: 'womenPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.womenPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },

              {
                name: 'درصد مردان زائر',
                key: 'menPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">{Number(record.menPercentage || 0).toPersianDigits()}٪</span>
                ),
              },
              {
                name: 'درصد واکسیناسون',
                key: 'vaccinePercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.vaccinePercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز اول',
                key: 'firstDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.firstDosesPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز دوم',
                key: 'secondDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.secondDosesPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز سوم',
                key: 'thirdDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.thirdDosesPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز چهارم',
                key: 'thirdDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.forthDosesPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز پنجم',
                key: 'thirdDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.fifthDosesPercentage || 0).toPersianDigits()}٪
                  </span>
                ),
              },
            ]}
          />
        )}
      </div>
    </fieldset>
  );
};
export default ThPilgrimsProvinceList;
