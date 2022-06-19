import React from 'react';
import {v4 as uuidv4} from 'uuid';

const FlourInventoryStatus: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت موجودی آرد در زمان بازرسی</legend>
      <>
        {record.allData.parameters.mojoudiDarZamaneBazresi ? (
          <>
            {' '}
            {record.allData.parameters.mojoudiDarZamaneBazresi.length === 0 ? (
              <div>{}</div>
            ) : (
              <>
                {record.allData.parameters.mojoudiDarZamaneBazresi.map((item: any) => {
                  return (
                    <div key={uuidv4()} className="flex">
                      <div className="flex w-1/2 justify-start px-4 py-1">
                        <span className="text-sm font-bold">تعداد کیسه:</span>
                        <span className="">{Number(item.count || 0).toPersianDigits()}</span>
                      </div>
                      <div className="flex w-1/2 justify-start px-4 py-1">
                        <span className="text-sm font-bold">نام کارخانه:</span>
                        <span className="">{item.fromCompany || ''}</span>
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
export default FlourInventoryStatus;