import axios from 'axios';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import Table from 'src/components/TableXHR';
import {EERRORS} from 'src/constants/errors.enum';
import {toPersianDigit} from 'src/helpers/utils';
import arbaeenService from 'src/services/arbaeen.service';

const pageSize = 10;
const RedHalalBasesList: React.FC<{}> = () => {
  const [totalItems, setTotalItems] = useState(0);

  const [error, setError] = useState(null);
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
      const {data} = await arbaeenService.getHelelList({}, {cancelToken: source.token});
      const normalizedData: any[] = [];
      data.content.forEach((item: any) => {
        normalizedData.push({
          id: item.id,
          name: item.name || 'نامشخص',
          location: item.location || 'نامشخص',
          baseCode: item.id || 'نامشخص',
          managerName: item.managerName || 'نامشخص',
          capacity: item.capacity || 'نامشخص',
          numberOfPersonnel: item.numberOfPersonnel || 'نامشخص',
          hoursOfServices: item.hoursOfServices || 0,
          numberOfAvailableAmbulances: item.numberOfAvailableAmbulances || 0,
          numberOfAvailableAutolances: item.nnumberOfAvailableAutolances || 0,
          numberOfAvailableMotolances: item.numberOfAvailableMotolances || 0,
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
      <legend className="mx-auto px-3 text-black">لیست پایگاه های هلال احمر</legend>

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
                name: 'اسم پایگاه',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <div className="flex w-full justify-start">
                    {toPersianDigit(((query.currentPage - 1) * pageSize + (index + 1)).toString())}.
                    {record.name}
                  </div>
                ),
              },
              {
                name: 'موقعیت پایگاه',
                key: 'location',
              },
              {
                name: 'کد پایگاه',
                key: 'baseCode',
                render: (v: any, record: any) => <span className=" ">{record.baseCode}</span>,
              },
              {
                name: 'ظرفیت پایگاه',
                key: 'capacity',
                render: (v: any, record: any) => <span className=" ">{record.capacity}</span>,
              },
              {
                name: 'تعداد پرسنل',
                key: 'numberOfPersonnel',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.numberOfPersonnel || 0).toPersianDigits()}
                  </span>
                ),
              },

              {
                name: 'ساعات سرویس',
                key: 'hoursOfServices',
              },
              {
                name: 'تعداد آمبولانس',
                key: 'numberOfAvailableAmbulances',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.numberOfAvailableAmbulances || 0).toPersianDigits()}
                  </span>
                ),
              },
              {
                name: 'تعداد اتولانس',
                key: 'numberOfAvailableAutolances',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.numberOfAvailableAutolances || 0).toPersianDigits()}
                  </span>
                ),
              },
              {
                name: 'تعداد موتولانس ',
                key: 'numberOfAvailableMotolances',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {Number(record.numberOfAvailableMotolances || 0).toPersianDigits()}
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
export default RedHalalBasesList;
