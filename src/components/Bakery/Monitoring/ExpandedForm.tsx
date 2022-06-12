import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {
  getAcctivationStatus,
  getBooleanValue,
  getInseptorType,
  getMoshtariMadari,
  getMozoeGozaresh,
  getOwnerType,
  getPoseStatus,
} from './constant';

export const ExpandedForm: React.FC<any> = ({...record}) => {
  return (
    <div className="w-full rounded bg-white p-4 px-2 pb-2 shadow-lg">
      <fieldset className="mb-16 rounded-xl border  p-2 text-center lg:p-1">
        <legend className="mx-auto px-3 text-black">مشخصات بازرسین</legend>
        {record.allData.inspectors.length === 0 ? (
          <div>{}</div>
        ) : (
          <>
            <div className="grid grid-cols-1  gap-2  lg:grid-cols-2 lg:gap-2">
              {record.allData.inspectors.map((item: any, index: number) => {
                return (
                  <div key={item.inspectorId} className="align-center flex p-1  lg:p-2">
                    <div className="pl-4 lg:pl-2">
                      <span>{(index + 1).toPersianDigits()}-</span>{' '}
                      <span className="text-xs font-bold lg:text-sm ">نام و نام خانوادگی:</span>
                      <span>
                        {item.inspectorFirstName} {item.inspectorLastName}
                      </span>
                    </div>
                    <div className="pl-4">
                      <span>نماینده سازمان/اداره/اتحادیه:</span> <span>{item.agentFrom}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="align-center flex p-1  lg:p-2">
              <div className="pl-4 lg:pl-2">
                <span className="text-xs font-bold lg:text-sm ">شماره مجوز:</span>
                <span className="pr-1">{record.allData.permissionNumber || '-'}</span>
              </div>
              <div className="pl-4 lg:pl-2">
                <span className="text-xs font-bold lg:text-sm "> تاریخ:</span>
                <span className="pr-1">{record.allData.inspectionDateTime || '-'}</span>
              </div>
              <div className="pl-4 lg:pl-2">
                <span className="text-xs font-bold lg:text-sm "> نوع گزارش:</span>
                <span className="pr-1">
                  {getInseptorType(record.allData.inspectionType || '-')}
                </span>
              </div>
              <div className="pl-4 lg:pl-2">
                <span className="text-xs font-bold lg:text-sm ">موضوع گزارش :</span>
                <span className="pr-1">
                  {getMozoeGozaresh(record.allData.parameters.mozoueGozaresh || '-')}
                </span>
              </div>
            </div>
          </>
        )}
      </fieldset>

      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">محل بازرسی </legend>
        <>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm "> ۱-شماره واحد:</span>
              <span className="pr-1">
                {(record.allData.permissionNumber || 0).toPersianDigits()}
              </span>
            </div>
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm "> ۲-نام و نام خانوادگی متصدی:</span>
              <span className="pr-1">
                {record.allData.operatorFirstName || '-'} {record.allData.operatorLastName || '-'}
              </span>
            </div>
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm "> ۳-تاریخ بازرسی:</span>
              <span className="pr-1">{record.allData.inspectionDateTime || '-'}</span>
            </div>
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۴-تاریخ آخرین بازرسی:</span>
              <span className="pr-1">{record.allData.lastInspectionDateTime || '-'}</span>
            </div>
          </div>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۵-وضعیت فعالیت:</span>
              <span className="pr-1">{getAcctivationStatus(record.allData.activationStatus)}</span>
            </div>
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۶-اداره نانوایی توسط:</span>
              <span className="pr-1">{getOwnerType(record.allData.guildManagementType)}</span>
            </div>
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۷-نرخ نامه:</span>
              <span className="pr-1">{getInseptorType(record.allData.inspectionType || '-')}</span>
            </div>
          </div>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <div className="flex pl-1 text-xs font-bold lg:text-sm">۸-وضعیت پوز</div>
              {record.allData.poses.length === 0 ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.poses.map((item: any) => {
                    return (
                      <div className="mb-1 flex items-center">
                        <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                        <span key={item.posNumber} className="pl-2 text-xs font-bold  lg:text-sm">
                          شماره پوز:
                        </span>
                        <span>{(item.posNumber || '').toPersianDigits()}</span>
                        <span key={item.posNumber} className="pl-2 text-xs font-bold  lg:text-sm">
                          عنوان پوز:
                        </span>
                        <span>{getPoseStatus(item.bank)}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۹-آدرس:</span>
              <span className="pr-1">{record.allData.address}</span>
            </div>
          </div>
        </>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت کارگران</legend>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۱-تعداد کارگران:</span>
              <span className="">
                {(record.allData.parameters.jameTedadeKargaran || '').toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">شاطر</span>
              <span>({(record.allData.parameters.tedadeShater || '').toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">خمیرگیر</span>
              <span>({(record.allData.parameters.tedadeKhamirGir || '').toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">نان درآر</span>
              <span>({(record.allData.parameters.tedadeNanDarar || '').toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">چانه گیر</span>
              <span>({(record.allData.parameters.tedadeChaneGir || '').toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">فروشنده</span>
              <span>
                ({(record.allData.parameters.tedadeForoushandeh || '').toPersianDigits()})
              </span>
            </div>
          </div>
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۲-مشتری مداری :</span>
              <span className="">
                {getMoshtariMadari(record.allData.parameters.moshtariMadari)}
              </span>
            </div>
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۳-نظافت کارگران:</span>
              <span className="">
                {getMoshtariMadari(record.allData.parameters.nezafateKargaran)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۴-استعمال دخانیات:</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.estemaleDokhaniat)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۵-کارت بهداشت:</span>
              <span className="">{getBooleanValue(record.allData.parameters.karteBehdasht)}</span>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت آرد تخصیصی</legend>

        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۱-میزان تخصیص</div>
          {record.allData.parameters.mizaneTakhsis.length === 0 ? (
            <div>{}</div>
          ) : (
            <>
              {record.allData.parameters.mizaneTakhsis.map((item: any) => {
                return (
                  <div key={uuidv4()} className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
                    <div>
                      <span className="p-1">({(item.count || '').toPersianDigits()})</span>
                      <span className="text-xs font-bold lg:text-sm "> کیسه</span>
                    </div>
                    <div>
                      <span className="p-1">({(item.value || '').toPersianDigits()})</span>
                      <span className="text-xs font-bold lg:text-sm ">کیلوگرم</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۲-تاریخ تخلیه آرد</div>
          {record.allData.parameters.tarikheTakhlieArd.length === 0 ? (
            <div>{}</div>
          ) : (
            <>
              {record.allData.parameters.tarikheTakhlieArd.map((item: any, index: any) => {
                return (
                  <div key={uuidv4()} className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
                    <div>
                      <span className="text-xs font-bold lg:text-sm ">
                        مرحله {(index + 1).toPersianDigits()}:
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold lg:text-sm "> تعداد</span>
                      <span className="p-1">({(item.count || '').toPersianDigits()})</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold lg:text-sm ">از کارخانه</span>
                      <span className="p-1">({item.fromCompany || ''})</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۳-موجودی در زمان بازرسی</div>
          {record.allData.parameters.mojoudiDarZamaneBazresi.length === 0 ? (
            <div>{}</div>
          ) : (
            <>
              {record.allData.parameters.mojoudiDarZamaneBazresi.map((item: any, index: any) => {
                return (
                  <div key={uuidv4()} className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
                    <div>
                      <span className="text-xs font-bold lg:text-sm ">
                        مرحله{(index + 1).toPersianDigits()}:
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold lg:text-sm "> تعداد</span>
                      <span className="">({(item.count || '').toPersianDigits()})</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold lg:text-sm ">از کارخانه</span>
                      <span className="">({item.fromCompany || ''})</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نان </legend>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نانوایی </legend>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">گزارش بازرسین </legend>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مسئول بازرسی </legend>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black"> مدیریت</legend>
      </fieldset>
    </div>
  );
};
export default ExpandedForm;
