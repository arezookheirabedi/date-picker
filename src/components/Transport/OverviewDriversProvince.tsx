import React from "react";

import Statistic from "../../containers/Guild/components/Statistic";


interface OverviewDriversProvinceProps {
  cityTitle: any,
  itemStatistics: any
}

const OverviewDriversProvince: React.FC<OverviewDriversProvinceProps> = ({cityTitle, itemStatistics}) => {
  return (
    <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی رانندگان در استان
        &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {
          itemStatistics.chunk(4).map((item: any, index: any) => {
            return (
              <React.Fragment key={index} >
              <div
                className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
                {
                  item.map((it: any, ind: any) => {
                    return (
                      <React.Fragment key={ind}>
                        <Statistic icon={it.icon} text={it.title} count={it.count} loading={false}/>
                      </React.Fragment>
                    )
                  })
                }
              </div>
              </React.Fragment>
            )
          })
        }


        {/* <div */}
        {/*  className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse"> */}
        {/*  <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={numberOfVaccination} loading={false}/> */}
        {/*  <Statistic icon={inquiryPlaque} text="تعداد استعلام پلاک" count={numberOfPlaqueVisited} hasInfo */}
        {/*             loading={false}/> */}
        {/*  <Statistic icon={positiveInquiryPlaque} text="تعداد استعلام های نتیجه مثبت" */}
        {/*             count={numberOfPositivePlaqueVisited} hasInfo loading={false}/> */}
        {/*  <Statistic icon={testIcon} text="تعداد آزمایش های رانندگان" count={numberOfTestResults} */}
        {/*             loading={false}/> */}
        {/* </div> */}
      </div>
    </fieldset>
  )
}

export default OverviewDriversProvince;