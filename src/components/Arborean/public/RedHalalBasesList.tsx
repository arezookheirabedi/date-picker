/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import RetryButton from "src/components/RetryButton";
import Table from "src/components/TableScopeSort";
import { toPersianDigit } from "src/helpers/utils";
import { redHelalList } from "./constant";


const RedHalalBasesList: React.FC<{}>=()=>{
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [queryParams, setQueryParams] = useState({
    retry: false,
  });
useEffect(() => {
  const normalizedData: any[] = [];
  redHelalList.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.name||'نامشخص',
          location: item.location||'نامشخص',
          baseCode:item.baseCode,
          managerName: item.managerName||'نامشخص',
          capacity:item.capacity,
          providedServicesCount:item.providedServicesCount,


        
        });
      });
      setDataset([...normalizedData]);


},[])
  return(   <fieldset className="mb-16 rounded-xl border p-4 text-center">
  <legend className="mx-auto px-3 text-black">لیست پایگاه های حلال احمر</legend>

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
                name: 'اسم پایگاه',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-center">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'کد پایگاه',
                key: 'baseCode',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">
                    {toPersianDigit(record.baseCode) || ''}
                  </span>
                ),
              },
              {
                name: 'ظرفیت پایگاه',
                key: 'capacity',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">
                    {toPersianDigit(record.capacity) || ''}
                  </span>
                ),
              },
              {
                name: 'تعداد خدمات ارائه شده',
                key: 'providedServicesCount',
                render: (v: any, record: any) => (
                  <span className="text-gray-500">
                    {toPersianDigit(record.providedServicesCount) || ''}
                  </span>
                ),
              },
              {
                name: 'موقعیت پایگاه',
                key: 'location',
              },
                {
                  name: 'مسئول پایگاه',
                  key: 'managerName' },
            ]}
           
          />
        )}
      </div>


  </fieldset>)
}
export default RedHalalBasesList



