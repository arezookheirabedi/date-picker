import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import RetryButton from 'src/components/RetryButton';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import Table from 'src/components/TableXHR';
import {sideCities, toPersianDigit} from 'src/helpers/utils';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {EERRORS} from 'src/constants/errors.enum';

const pageSize = 10;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PilgrimsList: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(0);
  const [borderQueryNull, setBorderQueryNull] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [query, setQuery] = useState({
    retry: false,
    departureDestinationBorder: null,
    currentPage: 1,
    departureOriginProvince: 'تهران',
  });
  const {CancelToken} = axios;
  const source = CancelToken.source();
  const getIt = async ({retry, currentPage, ...params}: any) => {
    const newData = {
      ...params,
      pageNumber: Number(query.currentPage) - 1,
    };
    setLoading(true);
    setError(null);
    try {
      const {data} = await arbaeenService.getPiligrimList(newData, {cancelToken: source.token});
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          pilgrimName: `${item.firstName || '-'} ${item.lastName || '-'}`,
          nationalId: item.nationalId || '',
          exitBorder: item.departureDestinationBorder || 'نامشخص',
          dateOfDispatch: item.departureDate,
          returnDate: item.returnDate,
          SendingProvince: item.departureOriginProvince || 'نامشخص',
          pilgrimMobileNumber: item.mobileNumber || '',
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
    getIt({...query});
    return () => {
      source.cancel('Operation canceled by the user.');
      setDataSet([]);
    };
  }, [query]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      setBorderQueryNull(!borderQueryNull);
      setQuery({
        retry: false,
        departureDestinationBorder: null,
        currentPage: 1,
        departureOriginProvince: provinceName,
      });
    }
  }, [location.search]);

  function handlePageChange(page: number = 1) {
    setQuery({...query, currentPage: page});
  }
  return (
    <>
      <fieldset className="mb-2 rounded-xl border p-4 text-center">
        <legend className="text-black mx-auto px-3">
          لیست زائران استان&nbsp;
          {cityTitle}
        </legend>
        <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
          <div className="align-center flex space-x-5 rtl:space-x-reverse">
            <div className="flex items-center">
              <SearchableSingleSelect
                endPoint={arbaeenService.abroadList}
                placeholder="همه مرزهای خروج "
                objectKey="departureDestinationBorder"
                setQueryParams={setQuery}
                queryParams={query}
                hasPaginateTableXhr
                borderQueryNull={borderQueryNull}
              />
            </div>
          </div>
        </div>
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
              dataSet={[...dataSet]}
              pagination={{pageSize, currentPage: query.currentPage}}
              totalItems={totalItems}
              columns={[
                {
                  name: 'نام و نام خانوادگی زائر',
                  key: 'pilgrimName',
                  render: (v: any, record, index: number) => (
                    <div className="flex w-full justify-start">
                      {toPersianDigit(
                        ((query.currentPage - 1) * pageSize + (index + 1)).toString()
                      )}
                      .{record.pilgrimName}
                    </div>
                  ),
                },
                {
                  name: 'کدملی زائر',
                  key: 'nationalId',
                  render: (v: any, record: any) => (
                    <span className="">{Number(record.nationalId || 0).toPersianDigits()}</span>
                  ),
                },
                {
                  name: 'مرز خروج',
                  key: 'exitBorder',
                },
                {
                  name: 'تاریخ اعزام',
                  key: 'dateOfDispatch',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="text-gray-500 whitespace-normal ">
                          {record.dateOfDispatch ? (
                            toPersianDigit(
                              dayjs(record.dateOfDispatch).calendar('jalali').format('YYYY/MM/DD')
                            )
                          ) : (
                            <>-</>
                          )}
                        </span>
                      </div>
                    </>
                  ),
                },
                {
                  name: 'تاریخ بازگشت',
                  key: 'returnDate',
                  render: (v: any, record: any) => (
                    <>
                      <div className="flex w-full justify-center">
                        <span className="text-gray-500 whitespace-normal ">
                          {record.returnDate ? (
                            toPersianDigit(
                              dayjs(record.returnDate).calendar('jalali').format('YYYY/MM/DD')
                            )
                          ) : (
                            <>-</>
                          )}
                        </span>
                      </div>
                    </>
                  ),
                },

                {
                  name: 'استان اعزام',
                  key: 'SendingProvince',
                },
                {
                  name: 'شماره موبایل زائر',
                  key: 'pilgrimMobileNumber',
                  render: (v: any, record: any) => (
                    <span className="text-cyan-400">
                      {toPersianDigit(record.pilgrimMobileNumber) || ''}
                    </span>
                  ),
                },
              ]}
            />
          )}
        </div>
      </fieldset>
    </>
  );
};
export default PilgrimsList;
