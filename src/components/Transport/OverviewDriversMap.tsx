import React from "react";
import Charts from "../Charts";

const {Map} = Charts;

interface OverviewDriversMapProps {
  sideCityStatus?: any;
  cityTitle: string
}

const OverviewDriversMap: React.FC<OverviewDriversMapProps> = ({sideCityStatus, cityTitle}) => {

  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت حمل و نقل عمومی استان‌
        &nbsp;
        {cityTitle}
      </legend>
      <div className="flex w-full rounded-xl bg-white pb-8 pt-8  shadow">
        <ul className="w-5/6">
          <Map/>
        </ul>
        <ul className="w-1/6">
          {
            sideCityStatus.map((item: any, index: any) => {
              return (
                <li key={index} className="flex justify-start items-center mb-2.5">
                  <span style={{width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '2px'}}/>
                  <span className="text-xs mr-2">{item.name}</span>

                </li>
              )
            })
          }
        </ul>
      </div>
    </fieldset>
  )
}

export default OverviewDriversMap;