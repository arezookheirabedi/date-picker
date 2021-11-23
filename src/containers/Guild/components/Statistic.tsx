import React from 'react';
import Information from "../../../assets/images/icons/information.svg";

const Statistic: React.FC<{icon: any; text: string; count: number ; hasInfo? : boolean}> = ({icon, text, count,hasInfo}) => (
  <fieldset className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow relative">
    {hasInfo ? <span className="tooltip absolute -top-4 right-4 cursor-pointer">
      <img src={Information} className="inline " width="18" height="18" alt="" />
      <span className="tooltip__tooltiptext">
        لورم اپیسوم یک متن ساختگی و تخیلی است .
      </span>
    </span>   : null}
    <legend className="text-black mx-auto px-3 transform transition duration-500 hover:scale-150">
      <img src={icon} alt="" />
    </legend>
    <div className="flex text-black text-lg mx-auto">{(count || 0).toLocaleString('fa')}</div>
    <div className="flex text-gray-500 text-sm  mx-auto">{text || ''}</div>
  </fieldset>
);

export default Statistic;
