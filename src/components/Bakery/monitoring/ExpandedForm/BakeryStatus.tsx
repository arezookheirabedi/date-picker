import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {
  getBooleanValue,
  getKhamirgir,
  getNoeDar,
  getPousheshDivarha,
  getQuality,
  getTajhizatBehdashti,
  getٰRaayateVazneChane,
} from '../constant';

const BakeryStatus: React.FC<any> = ({...record}) => {
  return (
    <fieldset className="m-8 rounded-xl border  p-4 text-center">
      <legend className="mx-auto px-3 text-black">وضعیت نانوایی </legend>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">مساحت:</span>
          <span className="pr-1">
            {Number(record.allData.parameters.masahat || 0).toPersianDigits()} متر مربع
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">ارتفاع:</span>
          <span className="pr-1">
            {Number(record.allData.parameters.ertefa || 0).toPersianDigits()} متر
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">زیرزمین:</span>
          <span className="pr-1">{getBooleanValue(record.allData.parameters.zirZaminDarad)}</span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">بالکن:</span>
          <span className="pr-1">{getBooleanValue(record.allData.parameters.balkonDarad)}</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">پروانه کسب:</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.parvaneKasbDarad)}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">پروانه کسب روئت گردید:</span>
          <span className="pr-1">
            {getٰRaayateVazneChane(record.allData.parameters.parvaneKasbRoyatGardid)}
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">وضعیت ظاهری:</span>
          <span className="pr-1">{getQuality(record.allData.parameters.vazeiateZaheri)}</span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">محل استراحت:</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.mahaleEsterahatDarad)}
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">پوشش دیوارها:</span>
          </div>
          <div>
            {record.allData.parameters.poushesheDivarha ? (
              <>
                {record.allData.parameters.poushesheDivarha.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.poushesheDivarha.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getPousheshDivarha(item)}</span>
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
            <span className="text-sm font-bold">پوشش کف:</span>
          </div>
          <div>
            {record.allData.parameters.poushesheKaf ? (
              <>
                {record.allData.parameters.poushesheKaf.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.poushesheKaf.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getPousheshDivarha(item)}</span>
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
      </div>
      <div className="flex">
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">تجهیزات بهداشتی:</span>
          </div>
          <div>
            {record.allData.parameters.tajhizateBehdashti ? (
              <>
                {record.allData.parameters.tajhizateBehdashti.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.tajhizateBehdashti.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getTajhizatBehdashti(item)}</span>
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
            <span className="text-sm font-bold">نوع درب و پنجره:</span>
          </div>
          <div>
            {record.allData.parameters.noeDarbVaPanjareh ? (
              <>
                {record.allData.parameters.noeDarbVaPanjareh.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.noeDarbVaPanjareh.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getNoeDar(item)}</span>
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
      </div>
      <div className="flex">
        <div className="w-1/2 flex-row justify-start px-4 py-1">
          <div className="mb-1 flex">
            <span className="text-sm font-bold">نوع خمیرگیر:</span>
          </div>
          <div>
            {record.allData.parameters.khmirgir ? (
              <>
                {record.allData.parameters.khmirgir.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.khmirgir.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span className=" ">{getKhamirgir(item)}</span>
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
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">بهداشت عمومی:</span>
          <span className="pr-1">{getQuality(record.allData.parameters.behdashtOmoumi)}</span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">محل نگهداری آرد:</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.mahaleNegahdariArdDarad)}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">میز نان سرد کن:</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.mizeNansardkonDarad)}
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-start px-4 py-1">
          <span className="text-sm font-bold">سرویس بهداشتی :</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.serviceBehdashtiDarad)}
          </span>
        </div>
        <div className="flex w-1/2 justify-start px-4 py-1">
          {' '}
          <span className="text-sm font-bold">محل انتظار مشتری :</span>
          <span className="pr-1">
            {getBooleanValue(record.allData.parameters.mahaleEntezareMoshtariDarad)}
          </span>
        </div>
      </div>
    </fieldset>
  );
};
export default BakeryStatus;