import React, {useState} from "react";
import Statistic from "../../../containers/Guild/components/Statistic";
import YellowVaccine from "../../../assets/images/icons/big-yellow-vaccine.svg";
import OrangeVaccine from "../../../assets/images/icons/orange-vaccine.svg";
import PurpleVaccine from "../../../assets/images/icons/big-purpule-vaccine.svg";
import DarkgreenVaccine from "../../../assets/images/icons/darkgreen-vaccine.svg";
import VaccineIcon from "../../../assets/images/icons/vaccine-color.svg";
import GreyVaccine from "../../../assets/images/icons/big-gray-vaccine.svg";

const OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard = () => {

  const [query] = useState({
    tag: 'employee',
  })
  // eslint-disable-next-line

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به آخرین وضعیت واکسیناسیون کارکنان دولت</legend>
      <div className="flex flex-col justify-between space-y-8">
        {/* first card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها یک دوز واکسن است."
            hasInfo
            icon={YellowVaccine}
            text="تعداد افراد با دوز اول"
    
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="تعداد افراد با دوز دوم"
      
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها سه دوز واکسن است."
            icon={PurpleVaccine}
            text="تعداد افراد با دوز سوم"
       
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها چهار دوز واکسن است."
            icon={DarkgreenVaccine}
            text="تعداد افراد با دوز چهارم"
      
          />
        </div>

        {/* second card row */}

        <div
          className="flex  flex-col md:flex-row justify-start space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها پنج دوز واکسن است."
              icon={VaccineIcon}
              text="تعداد افراد با دوز پنجم"
         
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="تعداد افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
              icon={VaccineIcon}
              text="مجموع افراد واکسینه شده"
         
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              icon={GreyVaccine}
              text="مجموع افراد واکسینه نشده"
     
            />
          </div>
        </div>

      </div>

      <div className="flex border-t-4 border-solid mt-7 py-5 border-gray-100 flex-col justify-between space-y-8">
        {/* first card row */}
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            infoText="درصد  افرادی که اخرین وضعیت واکسیناسیون آنها یک دوز واکسن است."
            hasInfo
            icon={YellowVaccine}
            text="درصد افراد با دوز اول"
          
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم"
     
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها سه دوز واکسن است."
            icon={PurpleVaccine}
            text="درصد افراد با دوز سوم"
            
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها چهار دوز واکسن است."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
          
            isPercentage
          />
        </div>

        {/* second card row */}

        <div
          className="flex  flex-col md:flex-row justify-start space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها پنج دوز واکسن است."
              icon={VaccineIcon}
              text="درصد افراد با دوز پنجم"
          
              isPercentage
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="درصد  افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
              icon={VaccineIcon}
              text="درصد افراد واکسینه شده"
            
              isPercentage
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              icon={GreyVaccine}
              text="درصد افراد واکسینه نشده"
            
              isPercentage
            />
          </div>
        </div>
      </div>

    </fieldset>
  )
}

export default OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard;