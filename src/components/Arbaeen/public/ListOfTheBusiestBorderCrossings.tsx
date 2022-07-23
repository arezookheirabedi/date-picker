import React, {useState} from "react";
import Spinner from "../../Spinner";
import RetryButton from "../../RetryButton";
import Table from "../../Table";
import useGetOverviewOfCategories from "../../../hooks/apis/useGetOverviewOfCategories";


const ListOfTheBusiestBorderCrossings = () => {

  const [query, setQuery] = useState({
    tag: 'transport',
    category: 'serviceType',
    from: null,
    to: null,
    retry: false
  }) as any;

// eslint-disable-next-line
  const {data: dataset, loading, error} = useGetOverviewOfCategories(query);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">لیست پرترددترین گذرگاه مرزی</legend>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">

        {loading && (<div className="p-40"><Spinner/></div>)}
        {error && !loading && (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}

        {!error && !loading && (
          <Table
            dataSet={[...dataset]}
            pagination={{pageSize: 20, maxPages: 3}}
            columns={[
              {
                name: 'نام گذرگاه',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              {
                name: 'جمع ورودی',
                key: 'employeesCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'جمع خروجی',
                key: 'infectedPercent',
                render: (v: any) => (
                  <span>
                    {Number(v).toLocaleString('fa', {
                      minimumFractionDigits: 4,
                    })}
                    %
                  </span>
                ),
              },
              {
                name: 'در انتظار بررسی گذرنامه',
                key: 'infectedCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'متوسط نرخ روزانه ورودی',
                key: 'saveCount',
                render: (v: any) => (
                  <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                ),
              },
              {
                name: 'متوسط نرخ روزانه خروجی',
                key: 'infectedCount',
                render: (v: any) => (
                  <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                ),
              },
              {
                name: 'درصد سهم هر گذرنامه مرزی از زائرین',
                key: 'infectedCount',
                render: (v: any) => (
                  <span>{v || v === 0 ? (v as number).toLocaleString('fa') : '-'}</span>
                ),
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  )
}

export default ListOfTheBusiestBorderCrossings;