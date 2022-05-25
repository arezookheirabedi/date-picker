import React, {useEffect, useState} from "react";
import Statistic from "../../../containers/Guild/components/Statistic";
import YellowVaccine from "../../../assets/images/icons/big-yellow-vaccine.svg";
import OrangeVaccine from "../../../assets/images/icons/orange-vaccine.svg";
import PurpleVaccine from "../../../assets/images/icons/big-purpule-vaccine.svg";
import DarkgreenVaccine from "../../../assets/images/icons/darkgreen-vaccine.svg";
import VaccineIcon from "../../../assets/images/icons/vaccine-color.svg";
import GreyVaccine from "../../../assets/images/icons/big-gray-vaccine.svg";
import {IInitialNumberOfDoses, initialNumberOfDoses} from "../../Passengers/public/constant";
import {cancelTokenSource, msgRequestCanceled} from "../../../helpers/utils";
import passengerService from "../../../services/passenger.service";

const OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numberOf, setNumberOf] = useState<IInitialNumberOfDoses>(initialNumberOfDoses);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

  const getPassengerVaccinateInfo = async () => {
    setLoading(true);
    try {
      const res = await passengerService.getDoses({}, {cancelToken: cancelToken.token});
      if (res.status === 200) {
        const newData = {...initialNumberOfDoses, ...res.data};
        setNumberOf(newData);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPassengerVaccinateInfo();
    // getPcrResult();
    return () => {
      cancelRequest();
      setNumberOf(initialNumberOfDoses);
      // setGuildPcrInfo(initialPcrInfo);
    };
  }, []);
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
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="تعداد افراد با دوز دوم"
            count="-"
            // loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها سه دوز واکسن است."
            icon={PurpleVaccine}
            text="تعداد افراد با دوز سوم"
            count={numberOf.doses[1] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که آخرین وضعیت واکسیناسیون آنها چهار دوز واکسن است."
            icon={DarkgreenVaccine}
            text="تعداد افراد با دوز چهارم"
            count={numberOf.doses[2] || 0}
            loading={loading}
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
              count={numberOf.doses[3] || 0}
              loading={loading}
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="تعداد افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
              icon={VaccineIcon}
              text="مجموع افراد واکسینه شده"
              count={numberOf.doses[4] || 0}
              loading={loading}
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              icon={GreyVaccine}
              text="مجموع افراد واکسینه نشده"
              count={numberOf.doses[5] || 0}
              loading={loading}
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
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها دو دوز واکسن است."
            icon={OrangeVaccine}
            text="درصد افراد با دوز دوم"
            count="-"
            // loading={loading}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها سه دوز واکسن است."
            icon={PurpleVaccine}
            text="درصد افراد با دوز سوم"
            count={numberOf.doses[1] || 0}
            loading={loading}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که آخرین وضعیت واکسیناسیون آنها چهار دوز واکسن است."
            icon={DarkgreenVaccine}
            text="درصد افراد با دوز چهارم"
            count={numberOf.doses[2] || 0}
            loading={loading}
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
              count={numberOf.doses[3] || 0}
              loading={loading}
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="درصد  افرادی که حداقل یک دوز واکسن دریافت کرده‌اند."
              icon={VaccineIcon}
              text="درصد افراد واکسینه شده"
              count={numberOf.doses[4] || 0}
              loading={loading}
            />
          </div>
          <div className="w-1/4">
            <Statistic
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              icon={GreyVaccine}
              text="درصد افراد واکسینه نشده"
              count={numberOf.doses[5] || 0}
              loading={loading}
            />
          </div>
        </div>
      </div>

    </fieldset>
  )
}

export default OverviewOfTheLatestGovernmentEmployeesVaccinationStatusCard;