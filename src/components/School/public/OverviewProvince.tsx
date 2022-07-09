import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../../containers/Guild/components/Statistic';
import hcsService from '../../../services/hcs.service';
import totalRecritment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../../assets/images/icons/prescription.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';

interface OverviewProvinceProps {
  cityTitle: any;
}

const OverviewProvince: React.FC<OverviewProvinceProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'education',
        tags: ['student'].join(','),
        testResultCount: true,
        vaccinationCount: true,
        total: true,
        province,
      });
      setNumberOf(data.total || 0);
      setNumberOfPlaqueVisited(data.numberOfPositive || 0);
      setNumberOfPositive(data.numberOfPositive || 0);
      setNumberOfRecovered(data.numberOfRecovered || 0);
      setNumberOfTestResults(data.testResultCount || 0);
      setNumberOfVaccination(data.numberOfVaccinated || 0);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);

      // @ts-ignore
      setNumberOf(0);
      // @ts-ignore
      setNumberOfPlaqueVisited(0);
      // @ts-ignore
      setNumberOfPositive(0);
      // @ts-ignore
      setNumberOfRecovered(0);
      // @ts-ignore
      setNumberOfTestResults(0);
      // @ts-ignore
      setNumberOfVaccination(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getNumberOf(provinceName);
    } else {
      history.push('/dashboard/health/school/province');
    }
  }, [location.search]);

  return (
    <fieldset className="mb-16 rounded-xl border px-4 pt-4 pb-8 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به پرسنل آموزشی آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارمندان آموزش پرورش"
            count={numberOf}
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={numberOfPositive}
            loading={loading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={numberOfRecovered}
            loading={loading}
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false} />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOfVaccination}
            loading={loading}
          />
          <Statistic icon={prescriptionIcon} text="مجموع استعلام‌های آموزش و پرورش" count="-" />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfPlaqueVisited}
            loading={loading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            count={numberOfTestResults}
            loading={loading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewProvince;
