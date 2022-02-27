import React from 'react';

import TransportReport from './TransportReport';

const Requested: React.FC<{}> = () => {


  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">لیست درخواست دانلود گزارش</legend>

     <TransportReport/>
      </fieldset>
    </>
  );
};

export default Requested;
