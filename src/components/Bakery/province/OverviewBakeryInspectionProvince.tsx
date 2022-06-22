import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

// api services
import axios from 'axios';
import bakeryService from '../../../services/bakery.service';

// components
import Statistic from '../../../containers/Guild/components/Statistic';
import {sideCities} from '../../../helpers/utils';

// images
import tpsIcon from '../../../assets/images/icons/tps.svg';
import transactionsIcon from '../../../assets/images/icons/transactions.svg';
import activeTimeIcon from '../../../assets/images/icons/active-time.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusual-Transaction.svg';
import bakeryWithoutTransactionIcon from '../../../assets/images/icons/bakery-WithoutTransaction.svg';

interface OverviewBakeryProvinceProps {
  cityTitle: any;
}

const initialNumberOf = {
  bakeryWithoutTransaction: 0,
  dailyTransactionAverage: 0,
  posActiveTime: 0,
  province: 'تهران',
  transactionAmout: 0,
  unsualTransaction: 0,
};

const OverviewBakeryInspectionProvince: React.FC<OverviewBakeryProvinceProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [bakeries, setBakeries] = useState<any>(initialNumberOf);
  const location = useLocation();
  const history = useHistory();
   
  const {CancelToken} = axios;
  const source = CancelToken.source();
  const getBakeries = async (province: any) => {
    setLoading(true);
    try {
      const {data} = await bakeryService.bakeryReport(
        {reportName: "inspectionNeedProvince", province},
        {cancelToken: source.token}
      );
      const result = data.find((x: any) => {
        return x.province === cityTitle
      })
      setBakeries({...result});
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
      getBakeries(provinceName);
    } else {
      history.push('/dashboard/bakery/province');
    }
  }, [cityTitle]);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          تعداد واحدهایی که نیاز به بازرسی دارند در استان {cityTitle} بر اساس
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={tpsIcon}
              text="میانگین تراکنش در هر روز"
              count={bakeries.dailyTransactionAverage || 0}
              loading={loading}
              hasInfo
              infoText="واحد هایی که مجموع تعداد تراکنش های تمام دستگاه های کارت خوان آنها در یک روز 40 درصد کمتر از میانگین تعداد تراکنش هایشان در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={transactionsIcon}
              text="مبلغ تراکنش"
              count={bakeries.transactionAmout || 0}
              loading={loading}
              hasInfo
              infoText="واحد هایی که  مجموع مبلغ تراکنش های تمام دستگاه های کارت خوان آنها در یک روز 40 درصد بیشتر از مجموع میانگین مبلغ تراکنش هایشان در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={activeTimeIcon}
              text="زمان فعال بودن کارتخوان‌ها"
              count={bakeries.posActiveTime || 0}
              loading={loading}
              hasInfo
              infoText="واحد هایی که ساعت کاری بر اساس زمان تراکنش های آنها در یک روز 30 درصد کمتر از میانگین ساعت کاری آنها در 3 ماه گذشته در روز مشابه است."
            />
            <Statistic
              icon={unusualTransactionIcon}
              text="تراکنش‌های غیر عادی"
              count={bakeries.unsualTransaction === "0" ? 0 : bakeries.unsualTransaction || 0}
              loading={loading}
              hasInfo
              infoText="واحد هایی که حداقل یک مبلغ تراکنش بالای 10 میلیون تومان دارند."
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={bakeryWithoutTransactionIcon}
              text="واحدهای بدون تراکنش"
              count={bakeries.bakeryWithoutTransaction || 0}
              loading={loading}
              hasInfo
              infoText="واحدهایی که در 3 ماه گذشته سهمیه آرد دریافت کرده اند و هیچ تراکنشی از هیچ کدام از کارت خوان های واحد نانوایی ثبت نشده است. "
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

export default OverviewBakeryInspectionProvince;
