import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Statistic from '../../../containers/Guild/components/Statistic';
import breadIcon from '../../../assets/images/icons/bread.svg';
import ovenIcon from '../../../assets/images/icons/oven.svg';
import flourIcon from '../../../assets/images/icons/flour.svg';
import thermometerIcon from '../../../assets/images/icons/thermometer.svg';
import posIcon from '../../../assets/images/icons/pos.svg';
import wheatIcon from '../../../assets/images/icons/wheat.svg';
import frenchBreadIcon from '../../../assets/images/icons/french-bread.svg';
import tpsIcon from '../../../assets/images/icons/tps.svg';
import transactionsIcon from '../../../assets/images/icons/transactions.svg';
import activeTimeIcon from '../../../assets/images/icons/active-time.svg';
import posDeactiveIcon from '../../../assets/images/icons/pos-deactive.svg';
import ovenDeactiveIcon from '../../../assets/images/icons/oven-deactive.svg';
import bakeryBannedIcon from '../../../assets/images/icons/bakery-banned.svg';
import bakeryService from '../../../services/bakery.service';

const initialNumberOf = {
  numberOfTotalBakery: 0,
  numberOfEnableBakery: 0,
  numberOfDisableBakery: 0,
  numberOfAudit: 0,
  numberOfSamt: 0,
  numberOfSima: 0,
  numberOfActivePos: 0,
  numberOfAvgSupplyFlour: 0,
  numberOfBakeryWithoutPos: 0,
  numberOfBakeryBanned: 0,
  numberOfTransactionPerDay: 0,
  numberOfTransaction: 0,
  numberOfPosActiveTime: 0,
};

const OverviewBakery = () => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);

  // console.log(testResultInfo);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data} = await bakeryService.bakeryGeneral(
        {tag: 'transport'},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی بر واحد‌های خبازی کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={breadIcon}
              text="مجموع نانوایی‌های کل کشور"
              count={numberOf.numberOfTotalBakery || 0}
              loading={loading}
              // hasInfo
              // infoText="مجموع رانندگانی که در حمل و نقل عمومی فعالیت دارند"
            />
            <Statistic
              icon={ovenIcon}
              text="مجموع نانوایی‌های فعال"
              count={numberOf.numberOfEnableBakery || 0}
              loading={loading}
            />
            <Statistic
              icon={ovenDeactiveIcon}
              text="مجموع نانوایی‌های غیر فعال"
              count={numberOf.numberOfDisableBakery || 0}
              loading={loading}
            />
            <Statistic
              icon={thermometerIcon}
              text="مجموع بازرسی‌های صورت گرفته"
              count={numberOf.numberOfAudit || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={frenchBreadIcon}
              text="مجموع واحدهای نانوایی صمت"
              count={numberOf.numberOfSamt || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
            <Statistic
              icon={wheatIcon}
              text="مجموع مجوز‌های سیما"
              count={numberOf.numberOfSima || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <Statistic
              icon={posIcon}
              text="مجموع تعداد کارت خوانهای فعال"
              count={numberOf.numberOfActivePos || 0}
              loading={loading}
            />
            <Statistic
              icon={flourIcon}
              text="متوسط تامین آرد در هر استان"
              count={numberOf.numberOfAvgSupplyFlour || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={posDeactiveIcon}
              text="مجموع نانوایی‌های بدون کارتخوان"
              count={numberOf.numberOfBakeryWithoutPos || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
            <Statistic
              icon={bakeryBannedIcon}
              text="مجموع نانوایی‌های مسدود شده"
              count={numberOf.numberOfBakeryBanned || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          تعداد واحدهایی که نیاز به بازرسی دارند بر اساس
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={tpsIcon}
              text="میانگین تراکنش در هر روز"
              count={numberOf.numberOfTransactionPerDay || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
            <Statistic
              icon={transactionsIcon}
              text="مبلغ تراکنش"
              count={numberOf.numberOfTransaction || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <Statistic
              icon={activeTimeIcon}
              text="زمان فعال بودن کارتخوان‌ها"
              count={numberOf.numberOfPosActiveTime || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>
    </>
  );
};
export default OverviewBakery;
