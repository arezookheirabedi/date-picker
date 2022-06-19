import dayjs from 'dayjs';
import React from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import {v4 as uuidv4} from 'uuid';

const FlourDischargeStatus: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت تخلیه آرد</legend>
      <>
        {record.allData.parameters.tarikheTakhlieArd ? (
          <>
            {' '}
            {record.allData.parameters.tarikheTakhlieArd.length === 0 ? (
              <div>{}</div>
            ) : (
              <>
                {record.allData.parameters.tarikheTakhlieArd.map((item: any) => {
                  return (
                    <div key={uuidv4()} className="flex">
                      <div className="flex w-1/3 justify-start px-4 py-1">
                        <span className="text-sm font-bold"> تاریخ تخلیه:</span>
                        <span className="pr-1">
                          {toPersianDigit(
                            dayjs(item.emptyingDate).calendar('jalali').format('YYYY/MM/DD')
                          )}
                        </span>
                      </div>
                      <div className="flex w-1/3 justify-start px-4 py-1">
                        <span className="text-sm font-bold"> تعداد کیسه:</span>
                        <span className="pr-1">{Number(item.count || 0).toPersianDigits()}</span>
                      </div>
                      <div className="flex w-1/3 justify-start px-4 py-1">
                        <span className="text-sm font-bold"> نام کارخانه:</span>
                        <span className="pr-1">{item.fromCompany || ''}</span>
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
export default FlourDischargeStatus;
