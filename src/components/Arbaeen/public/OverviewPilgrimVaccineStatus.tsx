import React, {useState, useEffect} from 'react';
// api services
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';
// components
import Statistic from '../../../containers/Guild/components/Statistic';
// images

import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import personGrayVaccine from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';
import YellowVaccine from '../../../assets/images/icons/big-yellow-vaccine.svg';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/big-purpule-vaccine.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import redVaccine from '../../../assets/images/icons/red-vaccine.svg';

const initialValue = {
  numberOfVaccinatedPilgrims: 0,
  numberOfPilgrimsNotVaccinated: 0,
  totalNumberOfPeoplewithFirstDose: 0,
  totalNumberOfPeoplewithSecondDose: 0,
  totalNumberOfPeoplewithThirdDose: 0,
  totalNumberOfPeoplewithFourthDose: 0,
  totalNumberOfPeoplewithFifthDose: 0,
};
const OverviewPilgrimVaccineStatus = () => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<any>(initialValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await arbaeenService.arbaeenGetAll(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      const newData = {
        numberOfVaccinatedPilgrims: 9500,
        numberOfPilgrimsNotVaccinated: 500,
        totalNumberOfPeoplewithFirstDose: 1000,
        totalNumberOfPeoplewithSecondDose: 1200,
        totalNumberOfPeoplewithThirdDose: 6000,
        totalNumberOfPeoplewithFourthDose: 800,
        totalNumberOfPeoplewithFifthDose: 500,
      };
      setPilgrims(newData);
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
              icon={redVaccine}
              text=" تعداد زائران فاقد شرایط واکسیناسیون"
              count={pilgrims.numberOfPilgrimsNotVaccinated || 0}
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
              text="تعداد کل زائران  با دوز اول"
              count={pilgrims.totalNumberOfPeoplewithFirstDose || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={OrangeVaccine}
              text="تعداد کل زائران  با دوز دوم"
              count={pilgrims.totalNumberOfPeoplewithSecondDose || 0}
              loading={loading}
            />
            <Statistic
              icon={PurppleVaccine}
              text="تعداد کل زائران  با دوز سوم"
              count={pilgrims.totalNumberOfPeoplewithThirdDose || 0}
              loading={loading}
            />
            <Statistic
              icon={DarkgreenVaccine}
              text="تعداد کل زائران  با دوز چهارم"
              count={pilgrims.totalNumberOfPeoplewithFourthDose || 0}
              loading={loading}
            />
            <Statistic
              icon={NavyVaccine}
              text="تعداد کل زائران  با دوز پنجم"
              count={pilgrims.totalNumberOfPeoplewithFifthDose || 0}
              loading={loading}
            />
            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrimVaccineStatus;
