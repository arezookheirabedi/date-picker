/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import RetryButton from "src/components/RetryButton";
import Table from "src/components/TableScopeSort";
import { toPersianDigit } from "src/helpers/utils";
import { pilgrimsCity} from "./constant";


const TheLargestNumberOfOriginPilgrimsCitiesList: React.FC<{}>=()=>{
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [queryParams, setQueryParams] = useState({
    retry: false,
  });
useEffect(() => {
  const normalizedData: any[] = [];
  pilgrimsCity.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          city: item.city||'نامشخص',
          pilgrimsCount:item.pilgrimsCount,
          womenPercentage:item.womenPercentage,
          menPercentage:item.menPercentage,
          visasIssuedCount:item.visasIssuedCount,
          vaccinePercentage:item.vaccinePercentage,
          firestDosesPercentage:item.firestDosesPercentage,
      


        
        });
      });
      setDataset([...normalizedData]);


},[])
  return(   <fieldset className="mb-16 rounded-xl border p-4 text-center">
  <legend className="mx-auto px-3 text-black">لیست بیشترین شهرهای مبدا زائرین </legend>

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
                name: 'شهر',
                key: 'city',
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
                  <span className=" ">
                    {toPersianDigit(record.pilgrimsCount) || ''}
                  </span>
                ),
              },
              {
                name: 'درصد زنان زائر',
                key: 'womenPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.womenPercentage) || ''}٪
                  </span>
                ),
              },
              {
                name: 'درصد مردان زائر',
                key: 'menPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.menPercentage) || ''}٪
                  </span>
                ),
              },
           
              {
                name: 'تعداد روادید صادر شده',
                key: 'visasIssuedCount',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.visasIssuedCount) || ''}
                  </span>
                ),
              },
              {
                name: 'درصد واکسیناسون',
                key: 'vaccinePercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.vaccinePercentage) || ''}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز اول',
                key: 'firestDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.firestDosesPercentage) || ''}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز دوم',
                key: 'firestDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.firestDosesPercentage) || ''}٪
                  </span>
                ),
              },
              {
                name: 'درصد دوز سوم',
                key: 'firestDosesPercentage',
                render: (v: any, record: any) => (
                  <span className=" ">
                    {toPersianDigit(record.firestDosesPercentage) || ''}٪
                  </span>
                ),
              },
            
            ]}
           
          />
        )}
      </div>


  </fieldset>)
}
export default TheLargestNumberOfOriginPilgrimsCitiesList



