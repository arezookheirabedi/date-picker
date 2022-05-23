import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTotalMembersAc} from 'src/store/action_creators';
import vaccineServices from 'src/services/vaccine.service';
import recruitmentServices from 'src/services/recruitment.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalRecruitment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-lg.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
import totalVaccinateStart from "../../../assets/images/icons/total-vaccinate-start-work-panel.svg";
import noneVaccinateStart from "../../../assets/images/icons/none-vaccinate-start-wok-panel.svg";
import passengerPositiveTest from "../../../assets/images/icons/passenger-positive-test.svg";

const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
const initialNumberOf = {
  doses: {...initialDoses},
  // dosesPercentage: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  // gtDosesPercentage: {...initialDoses},
  // gtDosesToTotalPopulationPercentage: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalPassengerCount: 0,
  totalPassengerCountToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
};

const OverviewRecruitment: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<any>(initialNumberOf);
  const [totalPopulation, setTotalPopulation] = useState(null);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
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
      setTotalPopulation(generalData.totalPopulation || 0);
      setNumberOfPositive(generalData.positiveMembersCount || 0);
      setNumberOfRecovered(generalData.recoveredMembersCount || 0);
      setNumberOfEmployeeTests(generalData.testResultsCount || 0);

      const {data: vaccineData} = await vaccineServices.membersGeneral({
        tag: 'employee',
        category: 'heName',
      });
      setNumberOf({...vaccineData});
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
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalRecruitment}
            text="مجموع کارکنان دولت"
            count={totalPopulation}
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
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count="-" loading={false}/>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count={numberOf.totalVaccinesCount}
            loading={loading}
          />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCount}
            loading={loading}
          />
          <Statistic
            icon={totalVaccinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count={numberOf.totalVaccinesCountAfterStartOfSystem}
            loading={loading}
          />
          <Statistic
            icon={noneVaccinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count={numberOf.totalNonVaccinesCountBeforeStartOfSystem}
            loading={loading}
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش های کارکنان دولت"
            count={numberOfEmployeeTests}
            loading={loading}
          />
          <Statistic
            icon={grayVaccineIcon}
            text="درصد افراد واکسینه نشده"
            count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage}
            loading={loading}
          />
          <Statistic
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage}
            loading={loading}
          />
          <Statistic
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count={numberOf.positiveMembersCountToTotalPopulationPercentage}
            loading={loading}
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewRecruitment;
