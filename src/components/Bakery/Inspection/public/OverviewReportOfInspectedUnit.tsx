import React from 'react';
import Charts from '../../../Charts';
import useGetOverviewReportOfInspectedUnit from "../../../../hooks/apis/inspection/useGetOverviewReportOfInspectedUnit";

const {HeadlessChart} = Charts;

const OverviewReportOfInspectedUnit = () => {

    const {list: dataset, optionChart : options} = useGetOverviewReportOfInspectedUnit();
    
    return (
        <fieldset className="text-center border rounded-xl p-4 mb-16">
            <legend className="text-black mx-auto px-3">
            نگاه کلی به گزارش واحد‌های بازرسی شده در کل کشور
            </legend>
            <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
                <div className="flex items-center justify-between mb-10 mt-6">
                    <div className='w-full'>
                        <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                            <div
                                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}}/>
                                    <span>بازرسی های دستوری</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}}/>
                                    <span>بازرسی های مردمی</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                    <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}}/>
                                    <span>بازرسی های ادواری</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ‍   {loading && (
                <div className="p-40">
                <Spinner />
                </div>
                )}
                {!loading && !isEmpty(dataset) && !errorMessage && ( */}
                    <HeadlessChart data={dataset} optionsProp={options} />
                {/* )}
                {isEmpty(dataset) && !loading && !errorMessage && (
                <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
                )} */}

            </div>
        </fieldset>
  )
}

export default OverviewReportOfInspectedUnit;