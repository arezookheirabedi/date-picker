import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import arbaeenService from 'src/services/arbaeen.service';
import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalVacsinateStart from '../../../assets/images/icons/total-vaccinate-start-work-panel.svg';
import personGrayVaccine from '../../../assets/images/icons/none-vaccinate-start-wok-panel.svg';
import YellowVaccine from '../../../assets/images/icons/big-yellow-vaccine.svg';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import PurppleVaccine from '../../../assets/images/icons/big-purpule-vaccine.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccine from '../../../assets/images/icons/navy-vaccine-lg.svg';
import redVaccine from '../../../assets/images/icons/red-vaccine.svg';
import {initialVaccineValue} from '../public/constant';

const TheLatestOverviewPilgrimVaccineStatusProvine: React.FC<{cityTitle: string}> = ({
  cityTitle,
}) => {
  const [loading, setLoading] = useState(false);
  const [pilgrims, setPilgrims] = useState<any>(initialVaccineValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {data: totalInfo, loading: loadingPositiveTest} = useGetArbaeenCountDataOnRegisterTime(
    {
      countLastPositiveTestResult: true,
    },
    true
  );
  const getAllPilgrims = async (params: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getTheLatestVaccineInfo(params, {
        cancelToken: source.token,
      });

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

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      getAllPilgrims({province: provinceName});
    } else {
      history.go(-1);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      setPilgrims({...initialVaccineValue});

      source.cancel('Operation canceled by the user.');
    };
  }, [location.search]);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به آخرین وضعیت واکسیناسیون زائران استان&nbsp;
          {cityTitle}
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={totalVacsinateStart}
              text="تعداد زائران واکسن زده"
              count={pilgrims.totalVaccines || 0}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر حداقل یک دوز واکسن کوید را دریافت کرده‌اند."
            />
            <Statistic
              icon={sufferingIcon}
              text=" تعداد زائران با کوید مثبت"
              count={totalInfo.countLastPositiveTestResult || 0}
              loading={loadingPositiveTest}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر به بیماری کوید مبتلا هستند."
            />
            <Statistic
              icon={personGrayVaccine}
              text="تعداد زائران واکسن نزده"
              count={pilgrims.totalNonVaccines || 0}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر هیچ واکسن کویدی دریافت نکرده‌اند."
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={YellowVaccine}
              text="تعداد کل زائران  با دوز اول"
              count={getValue(1)}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر یک دوز واکسن کوید را دریافت کرده‌اند."
            />
            <Statistic
              icon={OrangeVaccine}
              text="تعداد کل زائران  با دوز دوم"
              count={getValue(2)}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر دو دوز واکسن کوید را دریافت کرده‌اند."
            />
            <Statistic
              icon={PurppleVaccine}
              text="تعداد کل زائران  با دوز سوم"
              count={getValue(3)}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر سه دوز واکسن کوید را دریافت کرده‌اند."
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={DarkgreenVaccine}
              text="تعداد کل زائران  با دوز چهارم"
              count={getValue(4)}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر چهار دوز واکسن کوید را دریافت کرده‌اند."
            />
            <Statistic
              icon={NavyVaccine}
              text="تعداد کل زائران  با دوز پنجم"
              count={getValue(5)}
              loading={loading}
              hasInfo
              infoText="تعداد زائرانی که در حال حاضر پنج دوز واکسن کوید را دریافت کرده‌اند."
            />
            <Statistic
              icon={redVaccine}
              infoText="تعداد زائران ۱۸ سال به بالا كه در حال حاضر  واكسن  کوید دریافت نکرده اند یا از دوز يك يا دو آنها بيشتر از ۶ ماه گذشته است."
              hasInfo
              text=" تعداد زائران فاقد شرایط واکسیناسیون"
              count={pilgrims.pass6MonthFromLastVaccines || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default TheLatestOverviewPilgrimVaccineStatusProvine;
