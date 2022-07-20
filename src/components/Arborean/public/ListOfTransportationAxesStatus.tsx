import React, {useState} from "react";
import useGetOverviewOfCategories from "../../../hooks/apis/useGetOverviewOfCategories";
import Spinner from "../../Spinner";
import RetryButton from "../../RetryButton";
import Table from "../../Table";
// icons
import moderateRainy from "../../../assets/images/icons/moderate-rainy.svg";
import partlyCloudy from "../../../assets/images/icons/partly-cloudy.svg";
import rainy from "../../../assets/images/icons/rainy.svg";
import sunny from "../../../assets/images/icons/sunny.svg";
import thunder from "../../../assets/images/icons/thunder.svg";
import windy from "../../../assets/images/icons/windy.svg";

const ListOfTransportationAxesStatus = () => {
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
      <legend className="text-black mx-auto px-3">لیست وضعیت محورهای مواصلاتی</legend>

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
                name: 'اسم محور',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                    {(index + 1).toLocaleString('fa')}.{v}
                  </span>
                ),
              },
              {
                name: 'وضعیت آب و هوا',
                key: 'employeesCount',
                render: () => {
                  const icons = [moderateRainy, partlyCloudy, rainy, sunny, thunder, windy]
                  return (
                    <img src={icons[Math.floor(Math.random() * 6)]} alt="" className="mx-auto"/>
                  )
                },
              },
              {
                name: 'متوسط زائران در محور',
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
                name: 'وضعیت ترافیک',
                key: 'infectedCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'وضعیت محور',
                key: 'saveCount',
                render: () => {
                  let status;
                  const checkStatus = Math.floor(Math.random() * 2)
                  if (!checkStatus) {
                    status = 'مسدود'
                  } else {
                    status = 'غیر مسدود'
                  }
                  return (
                    <span className={`${checkStatus ? 'text-green-600' : 'text-red-600'} font-semibold`}>{status}</span>
                  )
                },
              }
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  )
}

export default ListOfTransportationAxesStatus;