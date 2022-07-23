/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import LocalTableSearch from 'src/components/LocalTableSearch';
import RetryButton from 'src/components/RetryButton';
import SearchableSingleSelect from 'src/components/SearchableSingleSelect';
import Table from 'src/components/TableScopeSort';
import {toPersianDigit} from 'src/helpers/utils';
import guildService from 'src/services/guild.service';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
import {pilgrimsList} from '../public/constant';


const PilgrimsList: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [query, setQuery] = useState({
    retry: false,
    categoryValue: null,
  });
  useEffect(() => {
    const normalizedData: any[] = [];
    pilgrimsList.forEach((item: any, index: number) => {
      normalizedData.push({
        id: `ovca_${index}`,
        pilgrimName: item.pilgrimName || 'نامشخص',
        pilgrimNationalId: item.pilgrimNationalId,
        exitBorder: item.exitBorder || 'نامشخص',
        dateOfDispatch: item.dateOfDispatch,
        returnDate: item.returnDate,
        SendingProvince: item.SendingProvince || 'نامشخص',
        pilgrimMobileNumber: item.pilgrimMobileNumber,
      });
    });
    setDataset([...normalizedData]);
    setOrgDataset([...normalizedData]);
  }, []);
  return (
  <>  <fieldset className="mb-2 rounded-xl border p-4 text-center" id="arborean-overview">
      <legend className="mx-auto px-3 text-black">لیست زائران</legend>
      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <SearchableSingleSelect
              endPoint={guildService.getRegisterList}
              placeholder="مرز خروج "
              objectKey="categoryValue"
              setQueryParams={setQuery}
              queryParams={query}
            />
          </div>
        </div>

        <div className="align-center flex flex-grow justify-end">
          <div className="align-center relative inline-flex leading-3">
            <LocalTableSearch
              orgDataset={orgDataset}
              setData={setDataset}
              query={query}
              placeholder="جستجوی سازمان"
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
            totalItems={(dataset || []).length}
            loading={loading}
            dataSet={[...dataset]}
            pagination={{pageSize: 10, maxPages: 3}}
            columns={[
              {
                name: 'نام و نام خانوادگی زائر',
                key: 'pilgrimName',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-center">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'کدملی زائر',
                key: 'pilgrimNationalId',
                render: (v: any, record: any) => (
                  <span className="">
                    {Number(record.pilgrimNationalId || 0).toPersianDigits()}
                  </span>
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
                  <span className="">
                    {Number(record.pilgrimMobileNumber || 0).toPersianDigits()}
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
          <div className="flex items-center justify-start"><img src={Irancell} className="inline"alt="irancell-logo"/><span className="px-2">باهمکاری ایرانسل</span></div>
          <div><img src={Vasl} className="inline "  alt="vasl-logo"/></div>
        </div>
      </fieldset>
    
    </>
  );
};
export default PilgrimsList;
