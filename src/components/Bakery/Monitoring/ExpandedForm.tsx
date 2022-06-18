import dayjs from 'dayjs';
import React from 'react';
import {toPersianDigit} from 'src/helpers/utils';
import {v4 as uuidv4} from 'uuid';
import {
  getAcctivationStatus,
  getAfzodani,
  getArzenan,
  getBooleanValue,
  getInseptorType,
  getQuality,
  getMozoeGozaresh,
  getNameNan,
  getNaneMantaghe,
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

            <div className="align-center flex p-1 lg:p-2">
              <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
                <div>
                  <span className="text-xs font-bold lg:text-sm ">شماره مجوز:</span>
                  <span className="pr-1">{record.allData.permissionNumber}</span>
                </div>
                <div>
                  <span className="text-xs font-bold lg:text-sm "> تاریخ:</span>
                  <span className="whitespace-normal text-gray-500 ">
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
                <div>
                  <span className="text-xs font-bold lg:text-sm "> نوع گزارش:</span>
                  <span className="pr-1">
                    {getInseptorType(record.allData.inspectionType || '-')}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold lg:text-sm ">موضوع گزارش :</span>
                  <span className="pr-1">
                    {getMozoeGozaresh(record.allData.parameters.mozoueGozaresh || '-')}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </fieldset>

      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">محل بازرسی </legend>
        <>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm "> ۱-شماره واحد:</span>
              <span className="pr-1">
                {record.allData.permissionNumber }
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
            <div className="pl-4 lg:pl-2">
              <span className="text-xs font-bold lg:text-sm ">۴-تاریخ آخرین بازرسی:</span>
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
              <span className="pr-1">{getNerkhname(record.allData.parameters.nerkhName)}</span>
            </div>
          </div>
          <div className="align-center flex p-1 lg:p-2">
            <div className="pl-4 lg:pl-2">
              <div className="flex pl-1 text-xs font-bold lg:text-sm">۸-وضعیت POS</div>
              {record.allData.poses ? (
                <>
                  {record.allData.poses.length === 0 ? (
                    <div>{}</div>
                  ) : (
                    <>
                      {record.allData.poses.map((item: any) => {
                        return (
                          <div className="mb-1 flex items-center">
                            <div className="ml-2 h-2 w-2 rounded-full bg-gray-400" />
                            <span
                              key={item.posNumber}
                              className="pl-2 text-xs font-bold  lg:text-sm"
                            >
                              شماره POS:
                            </span>
                            <span className="pl-2">{item.posNumber }</span>
                            <span
                              key={item.posNumber}
                              className="pl-2 text-xs font-bold  lg:text-sm"
                            >
                              عنوان POS:
                            </span>
                            <span className="pl-2">{getPoseStatus(item.bank)}</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <></>
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
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت کارگران</legend>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۱-تعداد کارگران:</span>
              <span className="">
                {Number(record.allData.parameters.jameTedadeKargaran|| 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">شاطر</span>
              <span>({Number(record.allData.parameters.tedadeShater || 0).toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">خمیرگیر</span>
              <span>({Number(record.allData.parameters.tedadeKhamirGir || 0).toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">نان درآر</span>
              <span>({Number(record.allData.parameters.tedadeNanDarar || 0).toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">چانه گیر</span>
              <span>({Number(record.allData.parameters.tedadeChaneGir || 0).toPersianDigits()})</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">فروشنده</span>
              <span>({Number(record.allData.parameters.tedadeForoushandeh || 0).toPersianDigits()})</span>
            </div>
          </div>
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۲-مشتری مداری :</span>
              <span className="">{getQuality(record.allData.parameters.moshtariMadari)}</span>
            </div>
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۳-نظافت کارگران:</span>
              <span className="">{getQuality(record.allData.parameters.nezafateKargaran)}</span>
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
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت آرد تخصیصی</legend>

        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۱-میزان تخصیص</div>
          {record.allData.parameters.mizaneTakhsis ? (
            <>
              {' '}
              {record.allData.parameters.mizaneTakhsis.length === 0 ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.mizaneTakhsis.map((item: any) => {
                    return (
                      <div
                        key={uuidv4()}
                        className="mb-1 flex items-center space-x-2 pl-4 rtl:space-x-reverse lg:pl-2"
                      >
                        <div className=" h-2 w-2 rounded-full bg-gray-400" />
                        <div className="">
                          <span className="p-1">({Number(item.count || 0).toPersianDigits()})</span>
                          <span className="text-xs font-bold lg:text-sm "> کیسه</span>
                        </div>
                        <div>
                          <span className="p-1">({Number(item.value || 0).toPersianDigits()})</span>
                          <span className="text-xs font-bold lg:text-sm ">کیلوگرم</span>
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
        </div>
        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۲-تاریخ تخلیه آرد</div>
          {record.allData.parameters.tarikheTakhlieArd ? (
            <>
              {' '}
              {record.allData.parameters.tarikheTakhlieArd.length === 0 ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.tarikheTakhlieArd.map((item: any, index: any) => {
                    return (
                      <div
                        key={uuidv4()}
                        className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2"
                      >
                        <div>
                          <span className="text-xs font-bold lg:text-sm ">
                            مرحله {(index + 1).toPersianDigits()}:
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-bold lg:text-sm "> تعداد</span>
                          <span className="p-1">({Number(item.count || 0).toPersianDigits()})</span>
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
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="pl-4 pb-1 lg:pl-2">
          <div className="flex pl-1 text-xs font-bold lg:text-sm">۳-موجودی در زمان بازرسی</div>
          {record.allData.parameters.mojoudiDarZamaneBazresi ? (
            <>
              {' '}
              {record.allData.parameters.mojoudiDarZamaneBazresi.length === 0 ? (
                <div>{}</div>
              ) : (
                <>
                  {record.allData.parameters.mojoudiDarZamaneBazresi.map(
                    (item: any, index: any) => {
                      return (
                        <div
                          key={uuidv4()}
                          className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2"
                        >
                          <div>
                            <span className="text-xs font-bold lg:text-sm ">
                              مرحله{(index + 1).toPersianDigits()}:
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-bold lg:text-sm "> تعداد</span>
                            <span className="">({Number(item.count || 0).toPersianDigits()})</span>
                          </div>
                          <div>
                            <span className="text-xs font-bold lg:text-sm ">از کارخانه</span>
                            <span className="">({item.fromCompany || ''})</span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نان </legend>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۱- نان منطقه:</span>
              <span className="">
                {getNaneMantaghe(record.allData.parameters.naneMantagheTaminAst)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۲-تنوع پخت در شعاع:</span>
            </div>

            {record.allData.parameters.tanavoePokhtDarShoa ? (
              <div>
                {Object.entries(record.allData.parameters.tanavoePokhtDarShoa).map((item: any) => (
                  <>
                    <span>{getNameNan(item[0])}:</span>
                    <span className="pl-2">{(item[1] || 0).toPersianDigits()}</span>
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div>
              <span className="text-xs font-bold lg:text-sm ">مجموع واحد ها:</span>
              <span>
                ({Number(record.allData.parameters.majmoueVahedhaDarShoa || 0).toPersianDigits()})
              </span>
            </div>
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۳-نوع پخت :</span>
            </div>

            {record.allData.parameters.noePokht ? (
              <>
                {' '}
                {record.allData.parameters.noePokht.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.noePokht.map((item: any) => {
                    return (
                      <div key={uuidv4()}>
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
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۴-کیفت:</span>
              <span className="">{getQuality(record.allData.parameters.keyfiat)}</span>
            </div>
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۵-تعداد پخت :</span>
            </div>
            {record.allData.parameters.tedadePokht ? (
              <div>
                {Object.entries(record.allData.parameters.tedadePokht).map((item: any) => (
                  <>
                    <span>{getNameNan(item[0])}:</span>
                    <span className="pl-2">{Number(item[1] || 0).toPersianDigits()}</span>
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm "> ۶-افزودنی ها:</span>
            </div>

            {record.allData.parameters.afzoudaniha ? (
              <>
                {' '}
                {record.allData.parameters.afzoudaniha.length === 0 ? (
                  <></>
                ) : (
                  record.allData.parameters.afzoudaniha.map((item: any) => {
                    return (
                      <div key={uuidv4()}>
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

        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۷-عرضه نان به قیمت مصوب:</span>
              <span className="">
                {getArzenan(record.allData.parameters.arzeNanBeGheymateMosavab)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۸-وزن چانه به گرم:</span>
              <span className="">
                {Number(record.allData.parameters.vazneChaneh || 0).toPersianDigits()}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۹-رعایت وزنه چانه زدن :</span>
              <span className="">
                {getٰRaayateVazneChane(record.allData.parameters.reayateVazneChaneVaNan)}
              </span>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">وضعیت نانوایی </legend>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱-مساحت:</span>
              <span className="">
                ( {Number(record.allData.parameters.masahat || 0).toPersianDigits()}) متر
              </span>
              <span className="text-xs font-bold lg:text-sm ">, ارتفاع </span>

              <span className="">
                ( {Number(record.allData.parameters.ertefa || 0).toPersianDigits()}) متر
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۲-زیر زمین </span>
              <span className="">{getBooleanValue(record.allData.parameters.zirZaminDarad)}</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۳-بالکن :</span>
              <span className="">{getBooleanValue(record.allData.parameters.balkonDarad)}</span>
            </div>
          </div>
        </div>{' '}
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۴-بهداشت عمومی:</span>
              <span className="">{getQuality(record.allData.parameters.behdashtOmoumi)}</span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۵-پروانه کسب:</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.parvaneKasbDarad)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۶-وضعیت ظاهری:</span>
              <span className="">{getQuality(record.allData.parameters.vazeiateZaheri)}</span>
            </div>
          </div>
        </div>{' '}
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۷-پوشش دیوارها:</span>
              {record.allData.parameters.poushesheDivarha ? (
                <>
                  {' '}
                  {record.allData.parameters.poushesheDivarha.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.poushesheDivarha.map((item: any) => {
                      return (
                        <span key={uuidv4()} className=" ">
                          {' '}
                          ({getPousheshDivarha(item)})
                        </span>
                      );
                    })
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۸-پوشش کف:</span>
              {record.allData.parameters.poushesheKaf ? (
                <>
                  {' '}
                  {record.allData.parameters.poushesheKaf.length === 0 ? (
                    <></>
                  ) : (
                    record.allData.parameters.poushesheKaf.map((item: any) => {
                      return (
                        <span key={uuidv4()} className="">
                          {' '}
                          ({getPousheshDivarha(item)})
                        </span>
                      );
                    })
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۹-تجهیزات بهداشتی :</span>
              {!record.allData.parameters.tajhizateBehdashti ? (
                <></>
              ) : (
                record.allData.parameters.tajhizateBehdashti.map((item: any) => {
                  return (
                    <span key={uuidv4()} className="">
                      {' '}
                      ({getTajhizatBehdashti(item)})
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </div>{' '}
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۰-نوع درب و پنجره:</span>
              {!record.allData.parameters.noeDarbVaPanjareh ? (
                <></>
              ) : (
                record.allData.parameters.noeDarbVaPanjareh.map((item: any) => {
                  return (
                    <span key={uuidv4()} className="">
                      {' '}
                      ({getNoeDar(item)})
                    </span>
                  );
                })
              )}
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۱-محل استراحت:</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.mahaleEsterahatDarad)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۲-خمیر گیر :</span>
              {!record.allData.parameters.khmirgir ? (
                <></>
              ) : (
                record.allData.parameters.khmirgir.map((item: any) => {
                  return (
                    <span key={uuidv4()} className="">
                      {' '}
                      ({getKhamirgir(item)})
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="align-center flex p-1 lg:p-2">
          <div className="flex space-x-2 pl-4 rtl:space-x-reverse lg:pl-2">
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۳-محل نگهداری آرد:</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.mahaleNegahdariArdDarad)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۴-میز نان سرد کن:</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.mizeNansardkonDarad)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۵-سرویس بهداشتی :</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.serviceBehdashtiDarad)}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold lg:text-sm ">۱۶-محل انتظار مشتری :</span>
              <span className="">
                {getBooleanValue(record.allData.parameters.mahaleEntezareMoshtariDarad)}
              </span>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">گزارش بازرسین </legend>
        <div className="flex">
          <span>{record.allData.inspectionResult || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مسئول بازرسی </legend>
        <div className="flex">
          <span>{record.allData.inspectorComment || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black"> مدیریت</legend>
        <div className="flex">
          <span>{record.allData.managerComment || '-'}</span>
        </div>
      </fieldset>
    </div>
  );
};
export default ExpandedForm;
