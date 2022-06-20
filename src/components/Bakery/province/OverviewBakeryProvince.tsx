import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
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
import posSubmittedIcon from '../../../assets/images/icons/pos-submitted.svg';
import unnormalTransactionIcon from '../../../assets/images/icons/unnormal-transaction.svg';
import withoutTransactionIcon from '../../../assets/images/icons/without-transaction.svg';
import wheatGardIcon from '../../../assets/images/icons/wheat-gard.svg';
import wheatGrayIcon from '../../../assets/images/icons/wheat-gray.svg';
import withPosIcon from '../../../assets/images/icons/with-pos.svg';
import {sideCities} from '../../../helpers/utils';
import bakeryService from '../../../services/bakery.service';

interface OverviewBakeryProvinceProps {
  cityTitle: any;
}

const initialNumberOf = {
  numberOfTotalBakery: 0,
  numberOfEnableBakery: 0,
  numberOfDisableBakery: 0,
  numberOfBakeryBanned: 0,
  numberOfSamt: 0,
  numberOfValidLicence: 0,
  numberOfInvalidLicence: 0,
  numberOfWithDead: 0,
  numberOfAvgSupplyFlour: 732.0,
  numberOfActivePos: 0,
  numberOfSubmittedPos: 0,
  numberOfBakeryWithoutPos: 0,
  numberOfBakeryWithPos: 0,
  numberOfIncludeAudit: 0,
  numberOfAudit: 0,
  numberOfTransactionPerDay: 0,
  numberOfTransaction: 0,
  numberOfPosActiveTime: 0,
  numberOfPosUnnormal: 0,
  numberOfPosWithoutTransaction: 0,
};

const OverviewBakeryProvince: React.FC<OverviewBakeryProvinceProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);

  const location = useLocation();
  const history = useHistory();

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getNumberOf = async (province: any) => {
    setLoading(true);
    try {
      const {data} = await bakeryService.bakeryGeneral(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      setNumberOf({...data});
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
    } else {
      history.push('/dashboard/transport/province');
    }
  }, [location.search]);

  return (
    <>
      <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16" id="bakery-overview">
        <legend className="text-black mx-auto px-3">
          نگاه کلی بر واحد‌های خبازی در استان &nbsp;
          {cityTitle}
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={breadIcon}
              text={`مجموع نانوایی‌های ${cityTitle}`}
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
              icon={frenchBreadIcon}
              text="مجموع واحدهای نانوایی صمت"
              count={numberOf.numberOfSamt || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={wheatIcon}
              text="مجموع پروانه کسب‌های معتبر در اصناف"
              count={numberOf.numberOfValidLicence || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <Statistic
              icon={wheatGrayIcon}
              text="مجموع پروانه کسب‌های نامعتبر در اصناف"
              count={numberOf.numberOfInvalidLicence || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <Statistic
              icon={bakeryBannedIcon}
              text="مجموع نانوایی‌های سیما با مالک فوتی"
              count={numberOf.numberOfWithDead || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />

            <Statistic
              icon={flourIcon}
              text="مجموع سهمیه دریافتی در ماه"
              count={numberOf.numberOfAvgSupplyFlour || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={posSubmittedIcon}
              text="تعداد کارتخوان های ثبت شده"
              count={numberOf.numberOfSubmittedPos || 0}
              loading={loading}
            />
            <Statistic
              icon={posIcon}
              text="مجموع تعداد کارت خوانهای فعال"
              count={numberOf.numberOfActivePos || 0}
              loading={loading}
            />
            <Statistic
              icon={withPosIcon}
              text="مجموع نانوایی‌های با کارتخوان"
              count={numberOf.numberOfBakeryWithPos || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
            <Statistic
              icon={posDeactiveIcon}
              text="مجموع نانوایی‌های بدون کارتخوان"
              count={numberOf.numberOfBakeryWithoutPos || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={wheatGardIcon}
              text="مجموع واحد‌های مشمول بازرسی"
              count={numberOf.numberOfIncludeAudit || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
            <Statistic
              icon={thermometerIcon}
              text="مجموع بازرسی‌های صورت گرفته"
              count={numberOf.numberOfAudit || 0}
              loading={loading}
            />

            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          تعداد واحدهایی که نیاز به بازرسی دارند در استان {cityTitle} بر اساس
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
            <Statistic
              icon={unnormalTransactionIcon}
              text="تراکنش‌های غیر عادی"
              count={numberOf.numberOfPosUnnormal || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر افرادی است که هیچگونه واکسنی دریافت نکرده اند "
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={withoutTransactionIcon}
              text="واحدهای بدون تراکنش"
              count={numberOf.numberOfPosWithoutTransaction || 0}
              loading={loading}
              // hasInfo
              // infoText="این عدد مشتمل بر مجموع تعداد افراد واکسینه در دوزهای اول و دوم سوم است"
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewBakeryProvince;
