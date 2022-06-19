import React from 'react';
import {getBooleanValue, getQuality} from '../constant';

const WorkersStatus: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت کارگران</legend>

      <div className="flex">
        <div className="flex w-full justify-start px-4 py-1">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-sm font-bold">تعداد کارگران:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.jameTedadeKargaran || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">شاطر:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.tedadeShater || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">خمیرگیر:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.tedadeKhamirGir || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">نان درآر:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.tedadeNanDarar || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">چانه گیر:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.tedadeChaneGir || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-sm font-bold">فروشنده:</span>
              <span className="pr-1">
                {Number(record.allData.parameters.tedadeForoushandeh || 0).toPersianDigits()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">مشتری مداری :</span>
          <span className="pr-1">{getQuality(record.allData.parameters.moshtariMadari)}</span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">نظافت کارگران:</span>
          <span className="pr-1">{getQuality(record.allData.parameters.nezafateKargaran)}</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">استعمال دخانیات:</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.estemaleDokhaniat)}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">کارت بهداشت:</span>
          <span className="pr-1">{getBooleanValue(record.allData.parameters.karteBehdasht)}</span>
        </div>
      </div>
    </fieldset>
  );
};
export default WorkersStatus;
