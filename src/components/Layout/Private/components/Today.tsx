import React from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import event from 'src/assets/images/icons/event.svg';

dayjs.extend(jalaliday);

const Today: React.FC<{}> = () => {
  const today = new Date().getTime();
  return (
    <div className="relative z-20 inline-block text-left shadow-xl rounded-full px-5 py-1">
      <div className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <img src={event} alt={today.toString()} className="w-5 h-5" />
        <span className="mx-3 whitespace-nowrap truncate">
          {(dayjs(today)
            .calendar('jalali')
            .locale('fa')
            .format('dddd - DD MMMM'))}
        </span>
      </div>
    </div>
  );
};

export default Today;
