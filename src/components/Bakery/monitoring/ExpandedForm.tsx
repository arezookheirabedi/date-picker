import dayjs from 'dayjs';
import React from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import {v4 as uuidv4} from 'uuid';
import {
  getAcctivationStatus,
  getAfzodani,
  getBooleanValue,
  getInseptorType,
  getQuality,
  getMozoeGozaresh,
  getNameNan,
  getOwnerType,
  getPoseStatus,
  getٰRaayateVazneChane,
  getPousheshDivarha,
  getTajhizatBehdashti,
  getNoeDar,
  getKhamirgir,
  getNerkhname,
} from './constant';

export const ExpandedForm: React.FC<any> = ({...record}) => {
  return (
    <div className="rounded bg-white p-4 px-2 pb-2 shadow-lg">
      <fieldset className="m-8 rounded-xl border  p-2 text-center lg:p-1">
        <legend className="mx-auto px-3 text-black">مشخصات بازرسین</legend>
        <>
        {record.allData.inspectors===null ? (
          <div>{}</div>
        ) : (
          <>
            {record.allData.inspectors.map((item: any) => {
              return (
                <div key={uuidv4()} className="flex">
                  <div className="flex justify-start w-1/2 px-4 py-1">
                    <span className="text-xs font-bold text-sm ">نام و نام خانوادگی:</span>
                    <span className="pr-1">
                      {item.inspectorFirstName} {item.inspectorLastName}
                    </span>
                  </div>
                  <div className="flex justify-start w-1/2 px-4 py-1">
                    <span className="text-xs font-bold text-sm">
                      نماینده سازمان/اداره/اتحادیه:
                    </span>{' '}
                    <span className="pr-1">{item.agentFrom}</span>
                  </div>
                </div>
              );
            })}

         
          </>
        )}
           <div className="flex">
              <div className="flex justify-start w-1/2 px-4 py-1">
                <span className="text-xs font-bold text-sm ">شماره مجوز:</span>
                <span className="pr-1">{record.allData.permissionNumber}</span>
              </div>
              <div className="flex justify-start w-1/2 px-4 py-1">
                <span className="text-xs font-bold text-sm "> تاریخ:</span>
                <span className="pr-1">
                  {record.allData.inspectionDateTime ? (
                    toPersianDigit(
                      dayjs(record.allData.inspectionDateTime)
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
              <div className="flex justify-start w-1/2 px-4 py-1">
                {' '}
                <span className="text-xs font-bold text-sm"> نوع گزارش:</span>
                <span className="pr-1">
                  {getInseptorType(record.allData.inspectionType || '-')}
                </span>
              </div>
              <div className="flex justify-start w-1/2 px-4 py-1">
                <span className="text-xs font-bold text-sm">موضوع گزارش :</span>
                <span className="pr-1">
                  {getMozoeGozaresh(record.allData.parameters&&record.allData.parameters.mozoueGozaresh || '-')}
                </span>
              </div>
            </div>
        </>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">محل بازرسی </legend>
        <>
          <div className="flex">
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm "> شماره واحد:</span>
              <span className="pr-1">{record.allData.unitNumber}</span>
            </div>
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm "> نام و نام خانوادگی متصدی:</span>
              <span className="pr-1">
                {record.allData.operatorFirstName || '-'} {record.allData.operatorLastName || '-'}
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm "> تاریخ بازرسی:</span>
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
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm ">تاریخ آخرین بازرسی:</span>
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
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm ">وضعیت فعالیت:</span>
              <span className="pr-1">{getAcctivationStatus(record.allData.activationStatus)}</span>
            </div>
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm ">اداره نانوایی توسط:</span>
              <span className="pr-1">{getOwnerType(record.allData.guildManagementType)}</span>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm ">نرخ نامه:</span>
              <span className="pr-1">{getNerkhname(record.allData.parameters?record.allData.parameters.nerkhName||"":"")}</span>
            </div>
            <div className="flex justify-start w-1/2 px-4 py-1">{/* kkkkkk */}</div>
          </div>
          <div className="flex">
            <div className="flex justify-start w-1/2 px-4 py-1">
              <span className="text-xs font-bold text-sm ">آدرس:</span>
              <span className="pr-1">{record.allData.address}</span>
            </div>
            <div className="flex justify-start w-1/2 px-4 py-1">{/* kkkkkk */}</div>
          </div>
        </>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-2 text-center lg:p-1">
        <legend className="mx-auto px-3 text-black">لیست دستگاه های پرداخت </legend>
        <div className="flex">
          {record.allData.poses ? (
            <>
              {record.allData.poses.length === 0 ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.poses.map((item: any) => {
                    return (
                      <>
                        <div className="flex justify-start w-1/2 px-4 py-1">
                          <span key={item.posNumber} className="text-xs font-bold text-sm ">
                            شماره دستگاه پرداخت:
                          </span>
                          <span className="pr-1">{item.posNumber}</span>
                        </div>
                        <div className="flex justify-start w-1/2 px-4 py-1">
                          <span key={item.posNumber} className="text-xs font-bold text-sm ">
                            شرکت ارائه دهنده خدمات پرداخت:
                          </span>
                          <span className="pr-1">{getPoseStatus(item.bank)}</span>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت کارگران</legend>

        <div className="flex">
          <div className="flex justify-start w-full px-4 py-1">
            <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
              <div>
                <span className="text-xs font-bold text-sm ">تعداد کارگران:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameters.jameTedadeKargaran||0 ).toPersianDigits()}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-sm ">شاطر:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameterstedadeShater||0).toPersianDigits()}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-sm ">خمیرگیر:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameters.tedadeKhamirGir||0 ).toPersianDigits()}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-sm ">نان درآر:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameters.tedadeNanDarar || 0).toPersianDigits()}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-sm ">چانه گیر:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameters.tedadeChaneGir || 0).toPersianDigits()}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-sm ">فروشنده:</span>
                <span className="pr-1">
                  {Number(record.allData.parameters&&record.allData.parameters.tedadeForoushandeh || 0).toPersianDigits()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">مشتری مداری :</span>
            <span className="pr-1">{getQuality(record.allData.parameters&&record.allData.parameters.moshtariMadari||"")}</span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">نظافت کارگران:</span>
            <span className="pr-1">{getQuality(record.allData.parameters&&record.allData.parameters.nezafateKargaran||"")}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">استعمال دخانیات:</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.estemaleDokhaniat||"")}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">کارت بهداشت:</span>
            <span className="pr-1">{getBooleanValue(record.allData.parameters&&record.allData.parameters.karteBehdasht||"")}</span>
          </div>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت آرد تخصیصی</legend>
        <>
          {record.allData.parameters ? (
            <>
              {' '}
              {record.allData.parameters.mizaneTakhsis===null? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.mizaneTakhsis.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="flex">
                        <div className="flex justify-start w-1/4 px-4 py-1">
                          <span className="text-xs font-bold text-sm "> تعداد کیسه:</span>
                          <span className="pr-1">{Number(item.count || 0).toPersianDigits()}</span>
                        </div>
                        <div className="flex justify-start w-1/4 px-4 py-1">
                          <span className="text-xs font-bold text-sm ">وزن هر کیسه:</span>
                          <span className="pr-1">{Number(item.value || 0).toPersianDigits()}</span>
                        </div>
                        <div className="flex justify-start w-1/4 px-4 py-1">
                          <span className="text-xs font-bold text-sm ">نوع آرد:</span>
                          <span className="pr-1">{item.flourType}</span>
                        </div>
                        <div className="flex justify-start w-1/4 px-4 py-1">
                          <span className="text-xs font-bold text-sm ">درصد سبوسگیری:</span>
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
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت تخلیه آرد</legend>
        <>
          {record.allData.parameters ? (
            <>
              {' '}
              {record.allData.parameters.tarikheTakhlieArd===null ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.tarikheTakhlieArd.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="flex">
                        <div className="flex justify-start w-1/3 px-4 py-1">
                          <span className="text-xs font-bold text-sm "> تاریخ تخلیه:</span>
                          <span className="pr-1">
                            {toPersianDigit(
                              dayjs(item.emptyingDate).calendar('jalali').format('YYYY/MM/DD')
                            )}
                          </span>
                        </div>
                        <div className="flex justify-start w-1/3 px-4 py-1">
                          <span className="text-xs font-bold text-sm "> تعداد کیسه:</span>
                          <span className="pr-1">{Number(item.count || 0).toPersianDigits()}</span>
                        </div>
                        <div className="flex justify-start w-1/3 px-4 py-1">
                          <span className="text-xs font-bold text-sm "> نام کارخانه:</span>
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
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت موجودی آرد در زمان بازرسی</legend>
        <>
          {record.allData.parameters ? (
            <>
              {' '}
              {record.allData.parameters.mojoudiDarZamaneBazresi===null ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.mojoudiDarZamaneBazresi.map((item: any) => {
                    return (
                      <div key={uuidv4()} className="flex">
                        <div className="flex justify-start w-1/2 px-4 py-1">
                          <span className="text-xs font-bold text-sm ">تعداد کیسه:</span>
                          <span className="">{Number(item.count || 0).toPersianDigits()}</span>
                        </div>
                        <div className="flex justify-start w-1/2 px-4 py-1">
                          <span className="text-xs font-bold text-sm ">نام کارخانه:</span>
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
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نان تولیدی</legend>

        <div className="flex">
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">نوع پخت:</span>
            </div>
            <div>
            {record.allData.parameters&&record.allData.parameters.noePokht ? (
                <>
                  {' '}
                  {record.allData.parameters.noePokht.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.noePokht.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">تعداد پخت:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.tedadePokht ? (
                Object.entries(record.allData.parameters.tedadePokht).map((item: any) => (
                  <div key={uuidv4()} className="mb-1 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">افزودنی ها:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.afzoudaniha ? (
                <>
                  {' '}
                  {record.allData.parameters.afzoudaniha.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.afzoudaniha.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">تنوع پخت در شعاع:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.tanavoePokhtDarShoa ? (
                Object.entries(record.allData.parameters.tanavoePokhtDarShoa).map((item: any) => (
                  <div key={uuidv4()} className="mb-1 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm "> مجموع واحد ها در شعاع:</span>
            <span className="pr-1">
              {Number(record.allData.parameters&&record.allData.parameters.majmoueVahedhaDarShoa || 0).toPersianDigits()}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm "> کیفیت نان تولیدی:</span>
            <span className="pr-1">{getQuality(record.allData.parameters&&record.allData.parameters.keyfiat||"")}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            {' '}
            <span className="text-xs font-bold text-sm "> نان منطقه تامین است:</span>
            <span className="pr-1">
              {getٰRaayateVazneChane(record.allData.parameters&&record.allData.parameters.naneMantagheTaminAst||"")}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">عرضه نان به قیمت مصوب:</span>
            <span className="pr-1">
              {getٰRaayateVazneChane(record.allData.parameters&&record.allData.parameters.arzeNanBeGheymateMosavab||"")}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">وزن چانه به گرم:</span>
            <span className="pr-1">
              {Number(record.allData.parameters&&record.allData.parameters.vazneChaneh || 0).toPersianDigits()}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">رعایت وزن چانه:</span>
            <span className="pr-1">
              {getٰRaayateVazneChane(record.allData.parameters&&record.allData.parameters.reayateVazneChaneVaNan||"")}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نانوایی </legend>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">مساحت:</span>
            <span className="pr-1">
              {Number(record.allData.parameters&&record.allData.parameters.masahat || 0).toPersianDigits()} متر مربع
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">ارتفاع:</span>
            <span className="pr-1">
              {Number(record.allData.parameters&&record.allData.parameters.ertefa || 0).toPersianDigits()} متر
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">زیرزمین:</span>
            <span className="pr-1">{getBooleanValue(record.allData.parameters&&record.allData.parameters.zirZaminDarad||"")}</span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">بالکن:</span>
            <span className="pr-1">{getBooleanValue(record.allData.parameters&&record.allData.parameters.balkonDarad||"")}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">پروانه کسب:</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.parvaneKasbDarad||"")}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">پروانه کسب روئت گردید:</span>
            <span className="pr-1">
              {getٰRaayateVazneChane(record.allData.parameters&&record.allData.parameters.parvaneKasbRoyatGardid||"")}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">وضعیت ظاهری:</span>
            <span className="pr-1">{getQuality(record.allData.parameters&&record.allData.parameters.vazeiateZaheri||"")}</span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">محل استراحت:</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.mahaleEsterahatDarad||"")}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">پوشش دیوارها:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.poushesheDivarha ? (
                <>
                  {record.allData.parameters.poushesheDivarha.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.poushesheDivarha.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">پوشش کف:</span>
            </div>
            <div>
            {record.allData.parameters&&record.allData.parameters.poushesheKaf ? (
                <>
                  {record.allData.parameters.poushesheKaf.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.poushesheKaf.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">تجهیزات بهداشتی:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.tajhizateBehdashti ? (
                <>
                  {record.allData.parameters.tajhizateBehdashti.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.tajhizateBehdashti.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">نوع درب و پنجره:</span>
            </div>
            <div>
            {record.allData.parameters&&record.allData.parameters.noeDarbVaPanjareh ? (
                <>
                  {record.allData.parameters.noeDarbVaPanjareh.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.noeDarbVaPanjareh.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex-row justify-start w-1/2 px-4 py-1">
            <div className="mb-1 flex">
              <span className="text-xs font-bold text-sm ">نوع خمیرگیر:</span>
            </div>
            <div>
              {record.allData.parameters&&record.allData.parameters.khmirgir ? (
                <>
                  {record.allData.parameters.khmirgir.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.khmirgir.map((item: any) => {
                      return (
                        <div key={uuidv4()} className="mb-1 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
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
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">بهداشت عمومی:</span>
            <span className="pr-1">{getQuality(record.allData.parameters&&record.allData.parameters.behdashtOmoumi)}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">محل نگهداری آرد:</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.mahaleNegahdariArdDarad)}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">میز نان سرد کن:</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.mizeNansardkonDarad)}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start w-1/2 px-4 py-1">
            <span className="text-xs font-bold text-sm ">سرویس بهداشتی :</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.serviceBehdashtiDarad)}
            </span>
          </div>
          <div className="flex justify-start w-1/2 px-4 py-1">
            {' '}
            <span className="text-xs font-bold text-sm ">محل انتظار مشتری :</span>
            <span className="pr-1">
              {getBooleanValue(record.allData.parameters&&record.allData.parameters.mahaleEntezareMoshtariDarad)}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">گزارش بازرس: </legend>
        <div className="flex">
          <span>{record.allData.inspectionResult || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مسوول بازرسی:</legend>
        <div className="flex">
          <span>{record.allData.inspectorComment || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مدیریت:</legend>
        <div className="flex">
          <span>{record.allData.managerComment || '-'}</span>
        </div>
      </fieldset>
    </div>
  );
};
export default ExpandedForm;