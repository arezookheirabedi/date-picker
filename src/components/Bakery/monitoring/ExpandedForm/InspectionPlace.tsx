import dayjs from 'dayjs';
import React from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import {getAcctivationStatus, getNerkhname, getOwnerType} from '../constant';

const InspectionPlace: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">محل بازرسی </legend>
      <>
        <div className="flex">
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold"> شماره واحد:</span>
            <span className="pr-1">{record.allData.unitNumber}</span>
          </div>
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold"> نام و نام خانوادگی متصدی:</span>
            <span className="pr-1">
              {record.allData.operatorFirstName || '-'} {record.allData.operatorLastName || '-'}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold"> تاریخ بازرسی:</span>
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
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold">تاریخ آخرین بازرسی:</span>
            <span className="pr-1">
              {record.allData.lastInspectionDateTime ? (
                toPersianDigit(
                  dayjs(record.allData.lastInspectionDateTime)
                    .calendar('jalali')
                    .format('YYYY/MM/DD')
                )
              ) : (
                <>-</>
              )}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold">وضعیت فعالیت:</span>
            <span className="pr-1">{getAcctivationStatus(record.allData.activationStatus)}</span>
          </div>
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold">اداره نانوایی توسط:</span>
            <span className="pr-1">{getOwnerType(record.allData.guildManagementType)}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold">نرخ نامه:</span>
            <span className="pr-1">{getNerkhname(record.allData.parameters.nerkhName)}</span>
          </div>
          <div className="flex w-1/2 justify-start px-4 py-1">{/* kkkkkk */}</div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 justify-start px-4 py-1">
            <span className="text-sm font-bold">آدرس:</span>
            <span className="pr-1">{record.allData.address}</span>
          </div>
          <div className="flex w-1/2 justify-start px-4 py-1">{/* kkkkkk */}</div>
        </div>
      </>
    </fieldset>
  );
};
export default InspectionPlace;
