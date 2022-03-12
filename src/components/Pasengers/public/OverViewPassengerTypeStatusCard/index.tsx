import React, { useState} from 'react';

import testIcon from 'src/assets/images/icons/test-color.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import totalPassengers from 'src/assets/images/icons/total-passengers.svg';
import suspiciousCovid from 'src/assets/images/icons/suspicious-covid.svg';
import grayBaggage from 'src/assets/images/icons/gray-baggage.svg';
import redBaggage from 'src/assets/images/icons/red-baggage.svg';
import passengerPositiveTest from 'src/assets/images/icons/passenger-positive-test.svg';
import negetiveTestIcon from 'src/assets/images/icons/negetive-test-icon.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
// import passengerService from 'src/services/passenger.service';
import Statistic from '../../../../containers/Guild/components/Statistic';
 

interface IDataCard{
  title:string;
  tag:string;
  data:{}

}
const OverViewPassengerTypeStatusCard: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [passengerType, setPassengerType] = useState<Array<IDataCard>>([
    {tag: 'airlines', data: {totalPassengers:0}, title: 'هوایی'},
    {tag: 'errthRoad', data: {}, title: 'زمینی'},
    {tag: 'marine', data:{}, title: 'ریلی'},
    {tag: 'railRoad', data: {}, title: 'دریایی'},
  ]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);


// const normalizeData=(data:any)=>{
//  return(data)
// }




  // const fetcher = () => {
  //   setLoading(true);
  //   const requests = passengerType.map(
  //     (i:IDataCard) =>
  //       new Promise((resolve, reject) => {
  //         passengerService
  //           .passengerTestResult({tag:i.tag})
  //           .then(response => resolve(response))
  //           .catch(error => reject(error));
  //       })
  //   );

  //   Promise.allSettled(requests).then(results => {
  //     const succesData: any[] = [];
  //     results.forEach(result => {
  //       if (result.status === 'fulfilled') {
  //         succesData.push((result as any).value.data.data);
  //       }
  //     });
  //     setPassengerType(normalizeData(succesData));
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   fetcher();
  // }, [passengerType]);



  return (
    <>
      {passengerType.map((data: any) => {
        return (
          <fieldset className="text-center border rounded-xl p-4 mb-16">
            <legend className="text-black mx-auto px-3">
               نگاه کلی به وضعیت مسافران {data.title} کل کشور
            </legend>

            <div className="flex flex-col justify-between space-y-8">
              {/* first card row */}
              <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
                <Statistic
                  icon={totalPassengers}
                  text="مجموع مسافران "
                  count={0}
                  loading={loading}
                />
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
                  text="تعداد سفرهای جلوگیری شده"
                  count={0}
                  loading={loading}
                />
                <Statistic
                  infoText="      "
                  icon={grayBaggage}
                  text="مجموع سفرهای صورت گرفته"
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
      })}
    </>
  );
};

export default OverViewPassengerTypeStatusCard;
