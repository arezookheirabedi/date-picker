/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import RetryButton from "src/components/RetryButton";
import Table from "src/components/TableScopeSort";
import { toPersianDigit } from "src/helpers/utils";
import { mokebList } from "./constant";


const MokebList: React.FC<{}>=()=>{
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [queryParams, setQueryParams] = useState({
    retry: false,
  });
useEffect(() => {
  const normalizedData: any[] = [];
  mokebList.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          name: item.name||'نامشخص',
          location: item.location||'نامشخص',
          owner: item.owner||'نامشخص',
          managerName: item.managerName||'نامشخص',
          type: item.type||'نامشخص',
          capacity:item.capacity,
        
        });
      });
      setDataset([...normalizedData]);


},[])
  return(   <fieldset className="mb-16 rounded-xl border p-4 text-center">
  <legend className="mx-auto px-3 text-black">لیست موکب ها</legend>

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
                name: 'اسم موکب',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-center">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'موقعیت موکب',
                key: 'location',
              },
              {
                name: 'نوع موکب',
                key: 'type',
              },
              {
                name: 'ظرفیت موکب',
                key: 'capacity',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.capacity) || ''}
                  </span>
                ),
              },
              
              {
                name: 'صاحب موکب',
                key: 'owner' },
                {
                  name: 'نام و نام خانوادگی مسئول موکب',
                  key: 'managerName' ,
                  render: (v: any, record: any) => (
                    <span className="text-sky-500">
                      {record.managerName}
                    </span>
                  ),
                
                },
            ]}
           
          />
        )}
      </div>


  </fieldset>)
}
export default MokebList



