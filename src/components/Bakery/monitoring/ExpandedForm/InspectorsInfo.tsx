import dayjs from 'dayjs';
import React from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import {v4 as uuidv4} from 'uuid';
import {getInseptorType, getMozoeGozaresh} from '../constant';

const InspectorsInfo: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-2 text-center lg:p-1">
      <legend className="mx-auto px-3 text-black">مشخصات بازرسین </legend>
      {record.allData.inspectors.length === 0 ? (
        <div>{}</div>
      ) : (
        <>
          {record.allData.inspectors.map((item: any) => {
            return (
              <div key={uuidv4()} className="flex">
                <div className="flex w-1/2 justify-start px-4 py-1">
                  <span className="text-sm font-bold">نام و نام خانوادگی:</span>
                  <span className="pr-1">
                    {item.inspectorFirstName} {item.inspectorLastName}
                  </span>
                </div>
                <div className="flex w-1/2 justify-start px-4 py-1">
                  <span className="text-sm font-bold">نماینده سازمان/اداره/اتحادیه:</span>{' '}
                  <span className="pr-1">{item.agentFrom}</span>
                </div>
              </div>
            );
          })}

          <div className="flex">
            <div className="flex w-1/2 justify-start px-4 py-1">
              <span className="text-sm font-bold">شماره مجوز:</span>
              <span className="pr-1">{record.allData.permissionNumber}</span>
            </div>
            <div className="flex w-1/2 justify-start px-4 py-1">
              <span className="text-sm font-bold"> تاریخ:</span>
              <span className="pr-1">
                {record.allData.inspectionDateTime ? (
                  toPersianDigit(
                    dayjs(record.allData.inspectionDateTime).calendar('jalali').format('YYYY/MM/DD')
                  )
                ) : (
                  <>-</>
                )}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="flex w-1/2 justify-start px-4 py-1">
              {' '}
              <span className="text-sm font-bold"> نوع گزارش:</span>
              <span className="pr-1">{getInseptorType(record.allData.inspectionType || '-')}</span>
            </div>
            <div className="flex w-1/2 justify-start px-4 py-1">
              <span className="text-sm font-bold">موضوع گزارش :</span>
              <span className="pr-1">
                {getMozoeGozaresh(record.allData.parameters.mozoueGozaresh || '-')}
              </span>
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
};
export default InspectorsInfo;
