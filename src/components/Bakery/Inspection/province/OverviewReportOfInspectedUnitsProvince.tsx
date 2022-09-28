import React from 'react';
import Pie from '../../../../containers/Overview/components/Pie'
import Spinner from "../../../Spinner";
import RetryButton from "../../../RetryButton";

interface OverviewReportOfInspectedUnitsProvinceProps {
  cityTitle: any;
  data: any;
  loading: any;
  error: any;
  setQuery: any
}

const OverviewReportOfInspectedUnitsProvince: React.FC<OverviewReportOfInspectedUnitsProvinceProps> = ({
                                                                                                         cityTitle,
                                                                                                         data,
                                                                                                         loading,
                                                                                                         error,
                                                                                                         setQuery
                                                                                                       }) => {

  return (
    <fieldset className="text-center border rounded-xl p-4 w-1/2">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به گزارش واحد‌های بازرسی شده در استان {cityTitle}
      </legend>
      {loading && (<div className="p-40"><Spinner/></div>)}

      {error && !loading && (
        <div className="p-40">
          <div className="text-red-500">{error}</div>
          <RetryButton setQuery={setQuery}/>
        </div>
      )}

      {!loading && !!data.length && !error && (
        <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow pb-3">
          <Pie data={data} name='گزارش واحد‌' sign='درصد'/>
          {data.map((item: any, index: any) => {
            return (<div key={index}>
              <div
                className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-1 w-full">
                <div className="flex flex-grow items-center justify-start">
                  <div className="w-2 h-2 rounded-full flex justify-center items-center"
                       style={{backgroundColor: item.color}}/>
                  <span className="font-normal mr-2">{item.title}</span>
                </div>
                <span className='text-left'>{Number(item.count).toPersianDigits()}٪</span>
              </div>


              {index < data.length - 1 && (
                <div className="flex flex-grow relative space-x-5 my-2">
                                    <span className="h-px bottom-0 absolute inset-x-28"
                                          style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
              )}


            </div>)
          })}
        </div>
      )}
    </fieldset>
  )
}

export default OverviewReportOfInspectedUnitsProvince;