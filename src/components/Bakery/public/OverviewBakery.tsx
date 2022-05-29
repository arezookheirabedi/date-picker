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
            icon={flourIcon}
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
      </div>
    </fieldset>
  );
};
export default OverviewBakery;
