import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTotalMembersAc} from 'src/store/action_creators';
import vaccineServices from 'src/services/vaccine.service';
import recruitmentServices from 'src/services/recruitment.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalRecritment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-lg.svg';
import prescriptionIcon from '../../../assets/images/icons/prescription.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';

const OverviewRecruitment: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfNanVaccinated, setNumberOfNanVaccinated] = useState(null);
  const [numberOfEmployeeTests, setNumberOfEmployeeTests] = useState(null);

  const dispatch = useDispatch();

  const getNumberOf = async () => {
    setLoading(true);
    try {
      const {data: generalData} = await recruitmentServices.membersGeneral({
        tag: 'employee',
        category: 'heName',
      });

      dispatch(addTotalMembersAc(generalData.totalPopulation || 0));
      setNumberOf(generalData.totalPopulation || 0);
      setNumberOfPositive(generalData.positiveMembersCount || 0);
      setNumberOfRecovered(generalData.recoveredMembersCount || 0);
      setNumberOfEmployeeTests(generalData.testResultsCount || 0);

      const {data: vaccineData} = await vaccineServices.membersGeneral({
        tag: 'employee',
        category: 'heName',
      });
      setNumberOfVaccination(vaccineData.totalVaccinesCount || 0);
      setNumberOfNanVaccinated(vaccineData.totalNonVaccinesCount || 0);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNumberOf();
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت کارکنان دولت در کل کشور</legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارکنان دولت"
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
            // loading={loading}
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
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOfNanVaccinated}
            loading={loading}
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            count={numberOfEmployeeTests}
            loading={loading}
          />
          <Statistic
            icon={prescriptionIcon}
            text="مجموع استعلام از مراجعین دولتی"
            count="-"
            loading={false}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewRecruitment;
