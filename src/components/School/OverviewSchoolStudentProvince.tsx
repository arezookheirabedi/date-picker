import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addTotalStudentMembersAc} from 'src/store/action_creators';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../containers/Guild/components/Statistic';
import totalStudent from '../../assets/images/icons/graduation.svg';
import sufferingIcon from '../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../assets/images/icons/save-color.svg';
import deadIcon from '../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../assets/images/icons/prescription.svg';
import testIcon from '../../assets/images/icons/test-color.svg';
import hcsService from '../../services/hcs.service';

interface OverviewSchoolStudentsProps {
  cityTitle: any;
}

const OverviewSchoolStudents: React.FC<OverviewSchoolStudentsProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfPositives, setNumberOfPositives] = useState(null);
  // eslint-disable-next-line
  const [numberOfNegatives, setNumberOfNegatives] = useState(null);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfNanVaccinated, setNumberOfNanVaccinated] = useState(null);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const getNumberOf = async (province: string) => {
    setLoading(true);
    try {
      const {data} = await hcsService.membersGeneral({
        organization: 'education',
        tags: ['#type# دانش آموز', `#province# استان ${province}`].join(','),
        testResultCount: true,
        vaccinationCount: true,
        total: true,
      });

      dispatch(addTotalStudentMembersAc(data.total || 0));
      setNumberOf(data.total || 0);
      setNumberOfPositives(data.numberOfPositives || 0);
      setNumberOfVaccination(data.numberOfVaccinated || 0);
      setNumberOfNanVaccinated(data.numberOfNonVaccinated || 0);
      setNumberOfRecovered(data.numberOfRecovered || 0);
      setNumberOfTestResults(data.numberOfNegatives + data.numberOfPositives || 0);
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
      history.push('/dashboard/school/province');
    }
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="school-overview">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به دانش آموزان در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={numberOf}
            loading={loading}
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count={numberOfPositives}
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
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
            count={numberOfNanVaccinated}
            loading={loading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های دانش آموزان"
            count={numberOfTestResults}
            loading={loading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSchoolStudents;
