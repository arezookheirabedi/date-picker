import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import arbaeenService from 'src/services/arbaeen.service';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import personGrayVaccine from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';
import YellowVaccine from '../../../assets/images/icons/big-yellow-vaccine.svg';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/big-purpule-vaccine.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import redVaccine from '../../../assets/images/icons/red-vaccine.svg';

const initialValue = {
  pass6MonthFromLastVaccines: 0,
  totalNonVaccines: 0,
  totalVaccines: 0,
  totalZaerin: 0,
  zaerinGroupByDoses: [
    {dose: 2, count: 0},
    {dose: 5, count: 0},
    {dose: 4, count: 0},
    {dose: 1, count: 0},
    {dose: 3, count: 0},
  ],
};

const OverviewPilgrimVaccineStatusPercentage = () => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<any>(initialValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {data: totalInfo, loading: loadingPositiveTest} = useGetArbaeenCountDataOnRegisterTime({
    countLastPositiveTestResultWhileRegistered: true,
  });
  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getVaccineInfo({}, {cancelToken: source.token});

      setPilgrims({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (i: number) => {
    const data = pilgrims?.zaerinGroupByDoses?.find((item: any) => item.dose === i);
    return data?.count || 0;
  };
  useEffect(() => {
    getAllPilgrims();
    return () => {
      setPilgrims({...initialValue});

      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به درصد واکسیناسیون زائران در هنگام ثبت نام
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={totalVacsinateStart}
              text="درصد زائران واکسن زده"
              count={pilgrims.totalVaccines || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={sufferingIcon}
              text=" درصد زائران ثبت نامی با کوید مثبت"
              count={totalInfo.countLastPositiveTestResultWhileRegistered || 0}
              loading={loadingPositiveTest}
              isPercentage
            />
            <Statistic
              icon={personGrayVaccine}
              text="درصد زائران واکسن نزده"
              count={pilgrims.totalNonVaccines || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={YellowVaccine}
              text="درصد کل زائران  با دوز اول"
              count={getValue(1)}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={OrangeVaccine}
              text="درصد کل زائران  با دوز دوم"
              count={getValue(2)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={PurppleVaccine}
              text="درصد کل زائران  با دوز سوم"
              count={getValue(3)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد کل زائران  با دوز چهارم"
              count={getValue(4)}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={NavyVaccine}
              text="درصد کل زائران  با دوز پنجم"
              count={getValue(5)}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={redVaccine}
              text=" درصد زائران فاقد شرایط واکسیناسیون"
              count={pilgrims.pass6MonthFromLastVaccines || 0}
              loading={loading}
              isPercentage
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

export default OverviewPilgrimVaccineStatusPercentage;
