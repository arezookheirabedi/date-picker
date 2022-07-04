

// components
import Statistic from '../../../containers/Guild/components/Statistic';

// hooks
import useOverviewOfBakery from "../../../hooks/apis/bakery/useOverviewOfBakery";

// images
import breadIcon from '../../../assets/images/icons/bread.svg';
import ovenIcon from '../../../assets/images/icons/oven.svg';
import flourIcon from '../../../assets/images/icons/flour.svg';
import thermometerIcon from '../../../assets/images/icons/thermometer.svg';
import posIcon from '../../../assets/images/icons/pos.svg';
import wheatIcon from '../../../assets/images/icons/wheat.svg';
import whitewheatIocn from '../../../assets/images/icons/whitewheat.svg';
import redwheatIcon from '../../../assets/images/icons/redwheat.svg';
import frenchBreadIcon from '../../../assets/images/icons/french-bread.svg';
import flourWhiteIcon from '../../../assets/images/icons/flourWhite.svg';
import posDeactiveIcon from '../../../assets/images/icons/pos-deactive.svg';
import ovenDeactiveIcon from '../../../assets/images/icons/oven-deactive.svg';
import registeredPos from '../../../assets/images/icons/registeredPos.svg';
import activePosIcon from '../../../assets/images/icons/activePos.svg';
import cinderIcon from '../../../assets/images/icons/cinder.svg';


const OverviewBakery = () => {

  // call bakery hook
  const {loading, list: bakeries, count} = useOverviewOfBakery();
  
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
       <legend className="text-black mx-auto px-3">نگاه کلی بر واحد‌های خبازی کشور</legend>

       <div className="flex flex-col justify-between space-y-8">
         <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
           <Statistic
             icon={breadIcon}
             text="مجموع نانوایی‌های کل کشور"
             count={bakeries.bakery[0] || 0}
             loading={loading}
             hasInfo
             infoText="تعداد کل خبازی های ثبت شده در سامانه سیما"
           />
           <Statistic
             icon={ovenIcon}
             text="مجموع نانوایی‌های فعال"
             count={bakeries.bakery[1] || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی های فعال در سامانه سیما"
           />
           <Statistic
             icon={ovenDeactiveIcon}
             text="مجموع نانوایی‌های غیر فعال"
             count={bakeries.bakery[2] || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی های غیر فعال در سامانه سیما"
           />
           <Statistic
             icon={flourIcon}
             text="مجموع سهمیه دریافتی در ماه (واحد هزار تن)"
             count={Math.floor(bakeries.bakery[3]) || 0}
             loading={loading}
             hasInfo
             infoText="مجموع سهمیه دریافتی خبازی ها در ماه (واحد هزار تن)"
           />
         </div>
         <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
                icon={frenchBreadIcon}
                text="تعداد نانوایی های دارای مجوز معتبر در صمت"
                count={bakeries.bakery[4] || 0}
                loading={loading}
                hasInfo
                infoText="مجموع نانوایی های ثبت شده در سامانه وزارت صمت"
              />
            <Statistic
             icon={wheatIcon}
             text="مجموع پروانه کسب‌ های منطبق در صمت و سیما"
             count={bakeries.bakery[5] || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما  دارای پروانه کسب معتبر صادر شده از وزارت صمت"
           />
           <Statistic
             icon={redwheatIcon}
             text="مجموع پروانه کسب‌ های نامنطبق در صمت و سیما"
             count={bakeries.bakery[6] || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما که کدملی خبازان آن در دو سامانه منطبق است و  فاقد پروانه کسب معتبر صادر شده از وزارت صمت است."
           />
           <Statistic
             icon={whitewheatIocn}
             text="مجموع پروانه کسب‌ های ناموجود در صمت و سیما"
             count={bakeries.bakery[7] || 0}
             loading={loading}
             hasInfo
             infoText="مجموع نانوایی موجود در سامانه سیما که کدملی خبازان آن در دو سامانه نامنطبق و  فاقد پروانه کسب معتبر صادر شده از وزارت صمت است."
           />
         </div>
         <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
              icon={registeredPos}
              text="مجموع کارتخوان‌های ثبت شده"
              count={bakeries.bakery[8] || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل کارت خوان های مربوط به نانوایی ها ثبت شده در بانک مرکزی"
          />
            <Statistic
             icon={posIcon}
             text="مجموع تعداد کارتخوان‌های فعال"
             count={bakeries.bakery[9] || 0}
             loading={loading}
             hasInfo
             infoText="تعداد کارت خوان های فعال مربوط به نانوایی ها ثبت شده در بانک مرکزی"
           />
            <Statistic
             icon={activePosIcon}
             text="مجموع نانوایی‌های با کارتخوان"
             count={bakeries.bakery[11] || 0}
             loading={loading}
             hasInfo
             infoText="تعداد نانوایی هایی که شماره کارتخوان آنها در سامانه سیما ثبت شده است."
           />
           <Statistic
             icon={posDeactiveIcon}
             text="مجموع نانوایی‌های بدون کارتخوان"
             count={bakeries.bakery[10] || 0}
             loading={loading}
             hasInfo
             infoText="تعداد نانوایی هایی که شماره کارتخوان آنها در سامانه سیما ثبت نشده است و یا فاقد کارت خوان است."
           />
         </div>
         <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
           <Statistic
             icon={cinderIcon}
             text="مجموع واحدهای مشمول بازرسی"
             count={bakeries.bakery[12] || 0}
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
             count={bakeries.bakery[14] || 0}
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
export default OverviewBakery;