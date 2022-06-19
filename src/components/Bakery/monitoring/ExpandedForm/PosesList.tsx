import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {getPoseStatus} from '../constant';

const PosesList: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-2 text-center lg:p-1">
      <legend className="mx-auto px-3 text-black">لیست دستگاه های پرداخت </legend>

      {record.allData.poses ? (
        <>
          {record.allData.poses.length === 0 ? (
            <div>{}</div>
          ) : (
            <>
              {record.allData.poses.map((item: any) => {
                return (
                  <div key={uuidv4()} className="flex">
                    <div className="flex w-1/2 justify-start px-4 py-1">
                      <span className="text-sm font-bold">شماره دستگاه پرداخت:</span>
                      <span className="pr-1">{item.posNumber}</span>
                    </div>
                    <div className="flex w-1/2 justify-start px-4 py-1">
                      <span className="text-sm font-bold">شرکت ارائه دهنده خدمات پرداخت:</span>
                      <span className="pr-1">{getPoseStatus(item.bank)}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </fieldset>
  );
};
export default PosesList;
