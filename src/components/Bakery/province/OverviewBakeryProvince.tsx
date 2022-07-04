import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

// components
import Statistic from '../../../containers/Guild/components/Statistic';
import {sideCities} from '../../../helpers/utils';

// hooks
import useOverviewOfBakeryProvince from "../../../hooks/apis/bakery/useOverviewOfBakeryProvince";

// images
import breadIcon from '../../../assets/images/icons/bread.svg';
import ovenIcon from '../../../assets/images/icons/oven.svg';
import flourIcon from '../../../assets/images/icons/flour.svg';
import thermometerIcon from '../../../assets/images/icons/thermometer.svg';
import posIcon from '../../../assets/images/icons/pos.svg';
import wheatIcon from '../../../assets/images/icons/wheat.svg';
import frenchBreadIcon from '../../../assets/images/icons/french-bread.svg';
import posDeactiveIcon from '../../../assets/images/icons/pos-deactive.svg';
import ovenDeactiveIcon from '../../../assets/images/icons/oven-deactive.svg';
import activePosIcon from '../../../assets/images/icons/activePos.svg';
import cinderIcon from '../../../assets/images/icons/cinder.svg';
import whiteWheatIocn from '../../../assets/images/icons/whitewheat.svg';
import redWheatIcon from '../../../assets/images/icons/redwheat.svg';
import flourWhiteIcon from '../../../assets/images/icons/flourWhite.svg';
import registeredPos from '../../../assets/images/icons/registeredPos.svg';

interface OverviewBakeryProvinceProps {
  cityTitle: any;
}

const OverviewBakeryProvince: React.FC<OverviewBakeryProvinceProps> = ({cityTitle}) => {

  const location = useLocation();
  const history = useHistory();

  // call bakery hook
  const {loading, list: bakeries, count, setProvinceName} = useOverviewOfBakeryProvince(cityTitle);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      setProvinceName(provinceName);
    } else {
      history.push('/dashboard/bakery/province');
    }
  }, [cityTitle]);

  return (
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
              count={bakeries.numberOfTotalBakery || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل خبازی های ثبت شده در سامانه سیما"
            />
            <Statistic
             icon={ovenIcon}
             text="مجموع نانوایی‌های فعال"
             count={bakeries.numberOfEnableBakery || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی های فعال در سامانه سیما"
           />
           <Statistic
             icon={ovenDeactiveIcon}
             text="مجموع نانوایی‌های غیر فعال"
             count={bakeries.numberOfDisableBakery || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی های غیر فعال در سامانه سیما"
           />
            <Statistic
             icon={flourIcon}
             text="مجموع سهمیه دریافتی در ماه (واحد هزار تن)"
             count={Math.floor(bakeries.numberOfShareFlour) || 0}
             loading={loading}
             hasInfo
             infoText="مجموع سهمیه دریافتی خبازی ها در ماه (واحد هزار تن)"
           />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
             icon={frenchBreadIcon}
             text="تعداد نانوایی های دارای مجوز معتبر در صمت"
             count={bakeries.numberOfSamt || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی های ثبت شده در سامانه وزارت صمت"
           />
          <Statistic
             icon={wheatIcon}
             text="مجموع پروانه کسب‌ های منطبق در صمت و سیما"
             count={bakeries.numberOfConformityGuildCode || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما  دارای پروانه کسب معتبر صادر شده از وزارت صمت"
           />
           <Statistic
             icon={redWheatIcon}
             text="مجموع پروانه کسب‌ های نامنطبق در صمت و سیما"
             count={bakeries.numberOfNonConformityGuildCode || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما که کدملی خبازان آن در دو سامانه منطبق است و  فاقد پروانه کسب معتبر صادر شده از وزارت صمت است."
           />
           <Statistic
             icon={whiteWheatIocn}
             text="مجموع پروانه کسب‌ های ناموجود در صمت و سیما"
             count={bakeries.numberOfGuildCodeDoesNotExit || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما که کدملی خبازان آن در دو سامانه نامنطبق و  فاقد پروانه کسب معتبر صادر شده از وزارت صمت است."
           />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
              icon={registeredPos}
              text="مجموع کارتخوان‌های ثبت شده"
              count={bakeries.numberOfRegisterPos || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل کارت خوان های مربوط به نانوایی ها ثبت شده در بانک مرکزی"
          />
            <Statistic
             icon={posIcon}
             text="مجموع تعداد کارتخوان‌های فعال"
             count={bakeries.numberOfActivePos || 0}
             loading={loading}
             hasInfo
             infoText="تعداد کارت خوان های فعال مربوط به نانوایی ها ثبت شده در بانک مرکزی"
           />
            <Statistic
             icon={activePosIcon}
             text="مجموع نانوایی‌های با کارتخوان"
             count={bakeries.numberOfBakeryWithtPos || 0}
             loading={loading}
             hasInfo
             infoText="تعداد نانوایی هایی که شماره کارتخوان آنها در سامانه سیما ثبت شده است."
           />
           <Statistic
             icon={posDeactiveIcon}
             text="مجموع نانوایی‌های بدون کارتخوان"
             count={bakeries.numberOfBakeryWithoutPos || 0}
             loading={loading}
             hasInfo
             infoText="تعداد نانوایی هایی که شماره کارتخوان آنها در سامانه سیما ثبت نشده است و یا فاقد کارت خوان است."
           />
         </div>
         <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
           <Statistic
             icon={cinderIcon}
             text="مجموع واحدهای مشمول بازرسی"
             count={bakeries.numberOfInspectionNeed || 0}
             loading={loading}
             hasInfo
             infoText="مجموع واحد هایی که نیاز به بازرسی دارند"
           />
           <Statistic
             icon={thermometerIcon}
             text="مجموع بازرسی‌های صورت گرفته"
             count={count}
             loading={loading}
             hasInfo
             infoText="مجموع تعداد بازرسی های صورت گرفته."
           /> 
           <Statistic
             icon={flourWhiteIcon}
             text="مجموع نانوایی‌های سیما با مالک فوتی"
             count={bakeries.numberOfDeadOwnerBakery || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی ها موجود در سامانه سیما که مالک واحد فوت کرده است."
           />
           <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
         </div>
        </div>
      </fieldset>
  );
};

export default OverviewBakeryProvince;
