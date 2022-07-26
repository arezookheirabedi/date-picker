import React, {useState, useEffect} from 'react';

// api services
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';

// components
import Statistic from '../../../containers/Guild/components/Statistic';

// images
import groupIcon from '../../../assets/images/icons/all-group.svg';
import blueEventIcon from '../../../assets/images/icons/blue-event.svg';
import greenEventIcon from '../../../assets/images/icons/green-event.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import groupWithMapIcon from '../../../assets/images/icons/group-with-map.svg';
import redEventIcon from '../../../assets/images/icons/red-event.svg';
import redCrescentIcon from '../../../assets/images/icons/red-crescent.svg';
import airplanIcon from '../../../assets/images/icons/airplan.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import passengerNegativeTestIcon from '../../../assets/images/icons/passenger-negative-test.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import carIcon from '../../../assets/images/icons/car.svg';
import railIcon from '../../../assets/images/icons/rail.svg';
import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import personGrayVaccine from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';
import YellowVaccine from '../../../assets/images/icons/big-yellow-vaccine.svg';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/big-purpule-vaccine.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import informationUpdatedIcon from '../../../assets/images/icons/information-updated.svg';

const initialPilgrimss = {
  totalNumberOfRegistrants: 0,
  totalOfRequestForEvent: 0,
  totalNumberOfEvent: 0,
  totalNumberOfPilgrims: 0,
  numberOfForeignPilgrims: 0,
  percentOfForeignPilgrims: 0,
  numberOfRequestRejections: 0,
  totalServicesProvided: 0,
  totalNumberOfAirPilgrims: 0,
  totalNumberOfEarthlyPilgrims: 0,
  totalNumberOfRailPilgrims: 0,
  numberOfPositiveThings: 0,
  numberOfInfectionPercent: 0,
  numberOfPositiveTests: 0,
  numberOfQueries: 0,
  numberOfVaccinatedPilgrims: 0,
  numberOfPilgrimsNotVaccinated: 0,
  totalNumberOfPeoplewithFirstDose: 0,
  totalNumberOfPeoplewithSecondDose: 0,
  totalNumberOfPeoplewithThirdDose: 0,
  totalNumberOfPeoplewithFourthDose: 0,
  totalNumberOfPeoplewithFifthDose: 0,
};

const OverviewArbaeen = () => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<any>(initialPilgrimss);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.arbaeenGetAll(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      setPilgrims(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPilgrims();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به زائران اربعین در کل کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupIcon}
              text="تعداد کل ثبت نام شدگان"
              count={pilgrims.totalNumberOfRegistrants || 0}
              loading={loading}
            />
            <Statistic
              icon={blueEventIcon}
              text="مجموع درخواست برای رویداد"
              count={pilgrims.totalOfRequestForEvent || 0}
              loading={loading}
            />
            <Statistic
              icon={greenEventIcon}
              text="تعداد کل رویداد صادر شده"
              count={pilgrims.totalNumberOfEvent || 0}
              loading={loading}
            />
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.totalNumberOfPilgrims || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithMapIcon}
              text="تعداد زائران اتباع خارجی"
              count={pilgrims.numberOfForeignPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={groupWithMapIcon}
              text="درصد زائران اتباع خارجی"
              count={pilgrims.percentOfForeignPilgrims || 0}
              isPercentage
              loading={loading}
            />
            <Statistic
              icon={redEventIcon}
              text="تعداد رد درخواست رویداد به دلیل عدم واکسیناسیون"
              count={pilgrims.numberOfRequestRejections || 0}
              loading={loading}
            />
            <Statistic
              icon={redCrescentIcon}
              text="مجموع خدمات ارائه شده توسط هلال احمر"
              count={pilgrims.totalServicesProvided || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به زائران اربعین براساس نوع سفر
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.totalNumberOfPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={airplanIcon}
              text="تعداد کل زائران هوایی"
              count={pilgrims.totalNumberOfAirPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران زمینی"
              count={pilgrims.totalNumberOfEarthlyPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.totalNumberOfRailPilgrims || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت سلامت زائران</legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={informationUpdatedIcon}
              text="تعداد استعلام های انجام شده"
              count={pilgrims.numberOfQueries || 0}
              loading={loading}
            />
            <Statistic
              icon={testIcon}
              text="تعداد تست های مثبت"
              count={pilgrims.numberOfPositiveTests || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerNegativeTestIcon}
              text="موارد مثبت بعد از سفر"
              count={pilgrims.numberOfPositiveThings || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerPositiveTest}
              text="درصد ابتلا بعد از سفر"
              count={pilgrims.numberOfInfectionPercent || 0}
              isPercentage
              loading={loading}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت واکسیناسیون زائران</legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={totalVacsinateStart}
              text="تعداد زائران واکسن زده"
              count={pilgrims.numberOfVaccinatedPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={personGrayVaccine}
              text="تعداد زائران واکسن نزده"
              count={pilgrims.numberOfPilgrimsNotVaccinated || 0}
              loading={loading}
            />
            <Statistic
              icon={YellowVaccine}
              text="تعداد کل افراد با دوز اول"
              count={pilgrims.totalNumberOfPeoplewithFirstDose || 0}
              loading={loading}
            />
            <Statistic
              icon={OrangeVaccine}
              text="تعداد کل افراد با دوز دوم"
              count={pilgrims.totalNumberOfPeoplewithSecondDose || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={PurppleVaccine}
              text="تعداد کل افراد با دوز سوم"
              count={pilgrims.totalNumberOfPeoplewithThirdDose || 0}
              loading={loading}
            />
            <Statistic
              icon={DarkgreenVaccine}
              text="تعداد کل افراد با دوز چهارم"
              count={pilgrims.totalNumberOfPeoplewithFourthDose || 0}
              loading={loading}
            />
            <Statistic
              icon={NavyVaccine}
              text="تعداد کل افراد با دوز پنجم"
              count={pilgrims.totalNumberOfPeoplewithFifthDose || 0}
              loading={loading}
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewArbaeen;
