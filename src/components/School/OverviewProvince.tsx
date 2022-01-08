import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../containers/Guild/components/Statistic';
import hcsService from '../../services/hcs.service';
import totalRecritment from '../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../assets/images/icons/save-color.svg';
import deadIcon from '../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../assets/images/icons/prescription.svg';
import testIcon from '../../assets/images/icons/test-color.svg';

interface OverviewProvinceProps {
  cityTitle: any;
}

const OverviewProvince: React.FC<OverviewProvinceProps> = ({cityTitle}) => {
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfLoading, setNumberOfLoading] = useState(false);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfPositiveLoading, setNumberOfPositiveLoading] = useState(false);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfRecoveredLoading, setNumberOfRecoveredLoading] = useState(false);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfVaccinationLoading, setNumberOfVaccinationLoading] = useState(false);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfPlaqueVisitedLoading, setNumberOfPlaqueVisitedLoading] = useState(false);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  const [numberOfTestResultsLoading, setNumberOfTestResultsLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const getNumberOf = async (province: string) => {
    setNumberOfLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOf(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfLoading(false);
    }
  };

  const getNumberOfPlaqueVisited = async (province: string) => {
    setNumberOfPlaqueVisitedLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOfPlaqueVisited(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPlaqueVisitedLoading(false);
    }
  };

  const getNumberOfPositive = async (province: string) => {
    setNumberOfPositiveLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOfPositive(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfPositiveLoading(false);
    }
  };

  const getNumberOfRecovered = async (province: string) => {
    setNumberOfRecoveredLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOfRecovered(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfRecoveredLoading(false);
    }
  };

  const getNumberOfTestResults = async (province: string) => {
    setNumberOfTestResultsLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOfTestResults(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfTestResultsLoading(false);
    }
  };

  const getNumberOfVaccination = async (province: string) => {
    setNumberOfVaccinationLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'school',
        tag: 'school',
        province,
      });
      setNumberOfVaccination(data.numberOfPositive);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setNumberOfVaccinationLoading(false);
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
      getNumberOfPlaqueVisited(provinceName);
      getNumberOfPositive(provinceName);
      getNumberOfRecovered(provinceName);
      getNumberOfTestResults(provinceName);
      getNumberOfVaccination(provinceName);
    } else {
      history.push('/dashboard/school/province');
    }
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl px-4 pt-4 pb-8 mb-16" id="province-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به پرسنل آموزشی آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارمندان آموزش پرورش"
            count={numberOf}
            loading={numberOfLoading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={numberOfPositive}
            loading={numberOfPositiveLoading}
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count={numberOfRecovered}
            loading={numberOfRecoveredLoading}
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false} />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOfVaccination}
            loading={numberOfVaccinationLoading}
          />
          <Statistic icon={prescriptionIcon} text="مجموع استعلام‌های آموزش و پرورش" count="-" />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfPlaqueVisited}
            loading={numberOfPlaqueVisitedLoading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            count={numberOfTestResults}
            loading={numberOfTestResultsLoading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewProvince;
