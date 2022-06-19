import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {getAfzodani, getNameNan, getQuality, getٰRaayateVazneChane} from '../constant';

const ProducedBreadStatus: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت نان تولیدی</legend>

      <div className="flex">
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">نوع پخت:</span>
          </div>
          <div>
            {record.allData.parameters.noePokht ? (
              <>
                {' '}
                {record.allData.parameters.noePokht.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.noePokht.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className="">{getNameNan(item)}</span>
                      </div>
                    );
                  })
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">تعداد پخت:</span>
          </div>
          <div>
            {record.allData.parameters.tedadePokht ? (
              Object.entries(record.allData.parameters.tedadePokht).map((item: any) => (
                <div key={uuidv4()} className="mb-1 flex items-center">
                  <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                  <span>{getNameNan(item[0])}:</span>
                  <span className="pl-2">{Number(item[1] || 0).toPersianDigits()}</span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>{' '}
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">افزودنی ها:</span>
          </div>
          <div>
            {record.allData.parameters.afzoudaniha ? (
              <>
                {' '}
                {record.allData.parameters.afzoudaniha.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.afzoudaniha.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getAfzodani(item)}</span>
                      </div>
                    );
                  })
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">تنوع پخت در شعاع:</span>
          </div>
          <div>
            {record.allData.parameters.tanavoePokhtDarShoa ? (
              Object.entries(record.allData.parameters.tanavoePokhtDarShoa).map((item: any) => (
                <div key={uuidv4()} className="mb-1 flex items-center">
                  <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                  <span>{getNameNan(item[0])}:</span>
                  <span className="pl-2">{(item[1] || 0).toPersianDigits()}</span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold"> مجموع واحد ها در شعاع:</span>
          <span className="pr-1">
            {Number(record.allData.parameters.majmoueVahedhaDarShoa || 0).toPersianDigits()}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold"> کیفیت نان تولیدی:</span>
          <span className="pr-1">{getQuality(record.allData.parameters.keyfiat)}</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          {' '}
          <span className="text-sm font-bold"> نان منطقه تامین است:</span>
          <span className="pr-1">
            {getٰRaayateVazneChane(record.allData.parameters.naneMantagheTaminAst)}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">عرضه نان به قیمت مصوب:</span>
          <span className="pr-1">
            {getٰRaayateVazneChane(record.allData.parameters.arzeNanBeGheymateMosavab)}
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">وزن چانه به گرم:</span>
          <span className="pr-1">
            {Number(record.allData.parameters.vazneChaneh || 0).toPersianDigits()}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">رعایت وزن چانه:</span>
          <span className="pr-1">
            {getٰRaayateVazneChane(record.allData.parameters.reayateVazneChaneVaNan)}
          </span>
        </div>
      </div>
    </fieldset>
  );
};
export default ProducedBreadStatus;
