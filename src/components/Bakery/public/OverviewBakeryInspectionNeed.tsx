// components
import Statistic from '../../../containers/Guild/components/Statistic';

// hooks

// images
import tpsIcon from '../../../assets/images/icons/tps.svg';
import transactionsIcon from '../../../assets/images/icons/transactions.svg';
import activeTimeIcon from '../../../assets/images/icons/active-time.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusual-Transaction.svg';
import bakeryWithoutTransactionIcon from '../../../assets/images/icons/bakery-WithoutTransaction.svg';

const OverviewBakeryInspectionNeed = () => {
  
  // call bakery hook
  const loading = false;
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          تعداد واحدهایی که نیاز به بازرسی دارند بر اساس
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={tpsIcon}
              text="مشکوک به عدم استفاده‌ مجاز از سهمیه آرد"
              count={ 0}
             
              hasInfo
              infoText="واحد هایی که مجموع تعداد تراکنش های تمام دستگاه های کارت خوان آنها در یک روز 40 درصد کمتر از میانگین تعداد تراکنش هایشان در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={transactionsIcon}
              text="مشکوک به گران فروشی"
              count={ 0}
             
              hasInfo
              infoText="واحد هایی که  مجموع مبلغ تراکنش های تمام دستگاه های کارت خوان آنها در یک روز 40 درصد بیشتر از مجموع میانگین مبلغ تراکنش هایشان در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={activeTimeIcon}
              text="مشکوک به تخلف از ساعت فعالیت"
              count={0}
             
              hasInfo
              infoText="واحد هایی که ساعت کاری بر اساس زمان تراکنش های آنها در یک روز 30 درصد کمتر از میانگین ساعت کاری آنها در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={unusualTransactionIcon}
              text="مشکوک به تراکنش‌های غیر عادی"
              count={ 0}
             
              hasInfo
              infoText="واحد هایی که حداقل یک مبلغ تراکنش بالای 10 میلیون تومان دارند."
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={bakeryWithoutTransactionIcon}
              text="مشکوک به عدم فعالیت"
              count={ 0}
             
              hasInfo
              infoText="واحدهایی که در 3 ماه گذشته سهمیه آرد دریافت کرده اند و هیچ تراکنشی از هیچ کدام از کارت خوان های واحد نانوایی ثبت نشده است. "
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset> 
  );
};
export default OverviewBakeryInspectionNeed;

