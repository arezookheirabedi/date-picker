import React, {useEffect, useState} from 'react';
import axios from 'axios';
import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import Statistic from '../../../containers/Guild/components/Statistic';
import GreyVaccine from '../../../assets/images/icons/big-gray-vaccine.svg';
import totalPassengers from '../../../assets/images/icons/total-passengers.svg';
import suspiciousCovid from '../../../assets/images/icons/suspicious-covid.svg';
import grayBaggage from '../../../assets/images/icons/gray-baggage.svg';
import redBaggage from '../../../assets/images/icons/red-baggage.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import negetiveTestIcon from '../../../assets/images/icons/negetive-test-icon.svg';
import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import noneVacsinateStart from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalPassengerCount: 0,
  totalPassengerCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
};
const OverviewSeaPasengersStatusCardProvince: React.FC<any> = ({cityTitle}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // const getNumberOf = async () => {
  //   setLoading(true);
  //   try {
  //     const {data} = await vaccineService.membersGeneral({}, {cancelToken: source.token});
  //     setNumberOf({...data});
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // getNumberOf();
    return () => {
      source.cancel('Operation canceled by the user.');
      setNumberOf(initialNumberOf);
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="passenger-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به وضعیت مسافران دریایی در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={totalPassengers} text="مجموع مسافران " count={0} loading={loading} />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان بعد از سفر"
            count={0}
            loading={loading}
          />
          <Statistic
            icon={suspiciousCovid}
            text="مجموع مسافران مشکوک به کوید"
            count={0}
            loading={loading}
          />
          <Statistic
            icon={deadIcon}
            text="مجموع مسافران با تست نامشخص"
            count={0}
            loading={loading}
          />
        </div>

        {/* second card row */}

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="افرادی که دو دوز واکسن دریافت نموده اند واکسینه شده تلقی می گردند.      "
            hasInfo
            icon={VaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={VaccineIcon}
            text="درصد افراد واکسینه شده"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count={0}
            loading={loading}
            isPercentage
          />
        </div>
        {/* third card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="افرادی که در هنگام صدور بلیط مجاز به خرید بلیط تشخیص داده نشده اند."
            hasInfo
            icon={redBaggage}
            text="تعداد سفر های جلوگیری شده"
            count={0}
            loading={loading}
          />
          <Statistic
            infoText="      "
            icon={grayBaggage}
            text="مجموع سفر های صورت گرفته"
            count={0}
            loading={loading}
            isPercentage
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={0}
            loading={loading}
          />
          <Statistic
            infoText="مرجع صادر کننده بلیط اجازه صدور بلیط نداشته ولی بلیط صادر شده است."
            hasInfo
            icon={redBaggage}
            text="مجموع سفر های غیر مجاز"
            count={0}
            loading={loading}
            isPercentage
          />
        </div>
        {/* fourth card row */}
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic icon={testIcon} text="تعداد آزمایش‌های مسافران" count={0} />
          <Statistic icon={negetiveTestIcon} text="تعداد تست‌های منفی" count={0} />
          <Statistic
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={0}
          />
          <Statistic
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            loading={loading}
            count={0}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewSeaPasengersStatusCardProvince;
