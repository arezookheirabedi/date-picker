import React, {useState} from 'react';
// import VaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import GreenVaccine from 'src/assets/images/icons/big-green-vaccine.svg';
// import GrayVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import totalDepartmentRecritment from 'src/assets/images/icons/people-navy.svg';
import totalEducationalRecritment from 'src/assets/images/icons/people-green.svg';
import totalStudent from 'src/assets/images/icons/graduation.svg';
import YellowVaccine from 'src/assets/images/icons/big-yellow-vaccine.svg';
import DarkgreenVaccine from 'src/assets/images/icons/darkgreen-vaccine.svg';
import PurppleVaccine from 'src/assets/images/icons/big-purpule-vaccine.svg';
import BlueVaccine from 'src/assets/images/icons/blue_white_vaccinate.svg';
import OrangeVaccine from 'src/assets/images/icons/orange-vaccine.svg';
import {useSelector} from 'src/hooks/useTypedSelector';
import useGetNumberOf from 'src/hooks/apis/useGetNumberOf';
import Statistic from '../../../../containers/Guild/components/Statistic';

const OverviewOfStatusCard: React.FC<{}> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState<any>({tag: 'edu'});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data: numberOf, loading, error} = useGetNumberOf(query);
  const {total: totalMembers, employe: totalEmploye} = useSelector(state => state.studentMembers);

  return (
    <>
      <div className="mt-7 flex flex-col justify-between space-y-8 border-gray-100 py-5">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع کارمندان آموزشی که در  آموزش و پرورش فعالیت دارند."
            icon={totalEducationalRecritment}
            text="مجموع کارمندان آموزشی"
            count={totalEmploye || 0}
           
          />
          <Statistic
            hasInfo
            infoText="مجموع  کارمندان اداری که در آموزش و پرورش فعالیت دارند."
            icon={totalDepartmentRecritment}
            text="مجموع کارمندان اداری"
            count={totalEmploye || 0}
           
          />
          <Statistic
            hasInfo
            infoText="مجموع کل دانش آموزان مشغول به تحصیل در کل کشور"
            icon={totalStudent}
            text="مجموع  دانش آموزان"
            count={totalMembers || 0}
           
          />
          <Statistic
            hasInfo
            infoText="تعداد کل دوز های تزریقی"
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.gtDoses[0]}
           
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="تعداد افرادی  که دوز اول واکسن را دریافت کرده‌اند."
            hasInfo
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1]}
           
          />

          <Statistic
            infoText="تعداد افرادی  که دوز دوم واکسن را دریافت کرده‌اند."
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2]}
            hasInfo
           
          />
          <Statistic
            text="تعداد واکسیناسیون دوز سوم"
            hasInfo
            infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            icon={PurppleVaccine}
            count={numberOf.doses[3]}
           
          />

          <Statistic
            infoText="تعداد افرادی  که دوز چهارم  واکسن را دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.doses[4]}
            hasInfo
           
          />
        </div>
      </div>
      <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
        <Statistic
          infoText="تعداد افرادی  که دوز پنجم واکسن را دریافت کرده‌اند "
          hasInfo
          icon={BlueVaccine}
          text="تعداد واکسیناسیون دوز پنجم و بیشتر"
          count={numberOf.gtDoses[4]}
         
        />

        <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
          {/* cvxdvcv */}
        </div>
        <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
          {/* cvxdvcv */}
        </div>
        <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
          {/* cvxdvcv */}
        </div>
        <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
          {/* cvxdvcv */}
        </div>
      </div>
      <div className="mt-7 flex flex-col justify-between space-y-8 border-t-4 border-solid border-gray-100 py-5">
        {/* first card row */}
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            text="درصد واکسیناسیون کل کشور"
            hasInfo
            infoText=" درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
            icon={GreenVaccine}
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage}
           
            isPercentage
          />

          <Statistic
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
            icon={YellowVaccine}
            text="درصد افراد با دوز یک "
            count={numberOf.dosesToTotalPopulationPercentage[1]}
           
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
            hasInfo
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم "
            count={numberOf.dosesToTotalPopulationPercentage[2]}
           
            isPercentage
          />
          <Statistic
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            icon={PurppleVaccine}
            text="درصد افراد با دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[3]}
            hasInfo
           
            isPercentage
          />
        </div>

        {/* second card row */}

        <div className="flex  flex-col  justify-start space-y-5  space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={numberOf.dosesToTotalPopulationPercentage[4]}
            hasInfo
           
            isPercentage
          />

          <Statistic
            infoText=" درصد  افرادی که دوز پنجم واکسن را دریافت کرده‌اند ."
            hasInfo
            icon={BlueVaccine}
            text="درصد افراد با دوز پنجم"
            count={numberOf.dosesToTotalPopulationPercentage[5]}
           
            isPercentage
          />

          {/* <Statistic
            infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            hasInfo
            icon={GrayVaccine}
            text="درصد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage}
           
            isPercentage
          /> */}

          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
          <div className="align-center relative hidden w-full flex-col justify-center  p-4 md:flex">
            {/* cvxdvcv */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewOfStatusCard;
