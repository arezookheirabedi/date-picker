import React from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import {useSelector} from 'src/hooks/useTypedSelector';
import pattern from 'src/assets/images/patterns/wide-white.svg';

dayjs.extend(jalaliday);

interface IProps {}

const GuildInfo: React.FC<IProps> = () => {
  const {data: guildInfo} = useSelector(state => state.fetchGuildInfo);

  let issueDate = guildInfo.issueDate || '-';
  if (issueDate !== '-') {
    issueDate = dayjs(issueDate).calendar('jalali').format('YYYY/MM/DD');
  }

  let expireDate = guildInfo.expireDate || '-';
  if (expireDate !== '-') {
    expireDate = dayjs(expireDate).calendar('jalali').format('YYYY/MM/DD');
  }

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-xl font-bold">مشخصات پروانه کسب واحد صنفی</h2>
      <div
        className="bg-cyan-900 text-white rounded-xl shadow-xl relative flex items-center"
        style={{backgroundColor: '#194654'}}
      >
        <div
          className="absolute z-10 top-0 left-0 rounded-xl w-full h-full bg-cover bg-top bg-no-repeat"
          style={{backgroundImage: `url("${pattern}")`}}
        />
        <div className="w-full p-12">
          <div className="relative text-white z-20 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">رسته واحد صنفی:</span>
              <span className="text-white text-sm font-bold">
                {guildInfo.category?.name || '-'}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">شناسه واحد صنفی:</span>
              <span className="text-white text-sm font-bold">
                {(guildInfo.guildCode || '-').replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">کد ملی صاحب پروانه:</span>
              <span className="text-white text-sm font-bold">
                {(guildInfo.ownerNationalId || '-').replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">وضعیت اعتبار پروانه کسب:</span>
              <span className="text-white text-sm font-bold">
                {guildInfo.licStatus ? 'معتبر' : 'نامعتبر'}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">تاریخ صدور:</span>
              <span className="text-white text-sm font-bold">
                {issueDate.replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">تاریخ اعتبار پروانه:</span>
              <span className="text-white text-sm font-bold">
                {expireDate.replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse">
              <span className="text-gray-200 text-xs">کد پستی:</span>
              <span className="text-white text-sm font-bold">
                {(guildInfo.postalCode || '-').replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
            <div className="space-x-2 rtl:space-x-reverse truncate">
              <span className="text-gray-200 text-xs">آدرس واحد صنفی:</span>
              <span className="text-white text-sm font-bold truncate">
                {(guildInfo.address || '-').replace(/\d/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'[d])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildInfo;
