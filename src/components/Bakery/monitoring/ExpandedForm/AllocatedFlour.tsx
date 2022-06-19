import React from 'react';
import {v4 as uuidv4} from 'uuid';

const AllocatedFlour: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت آرد تخصیصی</legend>
      <>
        {record.allData.parameters.mizaneTakhsis ? (
          <>
            {' '}
            {record.allData.parameters.mizaneTakhsis.length === 0 ? (
              <div>{}</div>
            ) : (
              <>
                {record.allData.parameters.mizaneTakhsis.map((item: any) => {
                  return (
                    <div key={uuidv4()} className="flex">
                      <div className="flex w-1/4 justify-start px-4 py-1">
                        <span className="text-sm font-bold"> تعداد کیسه:</span>
                        <span className="pr-1">{Number(item.count || 0).toPersianDigits()}</span>
                      </div>
                      <div className="flex w-1/4 justify-start px-4 py-1">
                        <span className="text-sm font-bold">وزن هر کیسه:</span>
                        <span className="pr-1">{Number(item.value || 0).toPersianDigits()}</span>
                      </div>
                      <div className="flex w-1/4 justify-start px-4 py-1">
                        <span className="text-sm font-bold">نوع آرد:</span>
                        <span className="pr-1">{item.flourType}</span>
                      </div>
                      <div className="flex w-1/4 justify-start px-4 py-1">
                        <span className="text-sm font-bold">درصد سبوسگیری:</span>
                        <span className="pr-1">
                          {Number(item.branPercentage || 0).toPersianDigits()}٪
                        </span>
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
      </>
    </fieldset>
  );
};
export default AllocatedFlour;