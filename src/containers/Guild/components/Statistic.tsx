import React from 'react';

const Statistic: React.FC<{icon: any; text: string; count: number}> = ({icon, text, count}) => (
  <fieldset className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
    <legend className="text-black mx-auto px-3 transform transition duration-500 hover:scale-150">
      <img src={icon} alt="" />
    </legend>
    <div className="flex text-black text-lg mx-auto">{(count || 0).toLocaleString('fa')}</div>
    <div className="flex text-gray-500 text-sm  mx-auto">{text || ''}</div>
  </fieldset>
);

export default Statistic;
