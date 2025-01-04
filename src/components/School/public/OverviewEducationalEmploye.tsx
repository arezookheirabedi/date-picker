import React from 'react';
// import axios from 'axios';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
// import {useDispatch} from 'react-redux';
// import {addTotalEmployeMembersAc} from 'src/store/action_creators';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import totalRecritment from 'src/assets/images/icons/people-navy.svg';
import sufferingIcon from 'src/assets/images/icons/suffering-color.svg';
import saveIcon from 'src/assets/images/icons/save-color.svg';
import deadIcon from 'src/assets/images/icons/dead-color.svg';
import vaccineIcon from 'src/assets/images/icons/vaccine-color.svg';
import passengerPositiveTest from 'src/assets/images/icons/passenger-positive-test.svg';
import testIcon from 'src/assets/images/icons/test-color.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import Statistic from '../../../containers/Guild/components/Statistic';

const OverviewEducationalEmploye = () => {
  // const [loading, setLoading] = useState(false);
  // // eslint-disable-next-line
  // const [numberOf, setNumberOf] = useState(null);
  // const [numberOfPositives, setNumberOfPositives] = useState(null);
  // // eslint-disable-next-line
  // const [numberOfNegatives, setNumberOfNegatives] = useState(null);
  // // eslint-disable-next-line
  // const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  // // eslint-disable-next-line
  // const [numberOfNanVaccinated, setNumberOfNanVaccinated] = useState(null);
  // const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  // const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  // const dispatch = useDispatch();

  // const {CancelToken} = axios;
  // const source = CancelToken.source();

  // const getNumberOf = async () => {
  //   setLoading(true);
  //   try {
  //     const {data} = await hcsService.membersGeneral(
  //       {
  //         organization: 'education',
  //         tags: ['#type# پرسنل اداری'].join(','),
  //         testResultCount: true,
  //         vaccinationCount: true,
  //         total: true,
  //       },
  //       {cancelToken: source.token}
  //     );

  //     dispatch(addTotalEmployeMembersAc(data.total || 0));
  //     setNumberOf(data.total || 0);
  //     setNumberOfPositives(data.numberOfPositives || 0);
  //     setNumberOfVaccination(data.numberOfVaccinated || 0);
  //     setNumberOfNanVaccinated(data.numberOfNonVaccinated || 0);
  //     setNumberOfRecovered(data.numberOfRecovered || 0);
  //     setNumberOfTestResults(data.numberOfNegatives + data.numberOfPositives || 0);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getNumberOf();
  //   return () => {
  //     setNumberOf(null);
  //     setNumberOfPositives(null);
  //     setNumberOfVaccination(null);
  //     setNumberOfNanVaccinated(null);
  //     setNumberOfRecovered(null);
  //     setNumberOfTestResults(null);
  //     source.cancel('Operation canceled by the user.');
  //   };
  // }, []);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به پرسنل آموزشی آموزش و پرورش کل کشور
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع کارمندان آموزشی که در آموزش و پرورش فعالیت دارند."
            icon={totalRecritment}
            text="مجموع کارمندان آموزشی "
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید"
            icon={sufferingIcon}
            text="مجموع مبتلایان"
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."
            icon={deadIcon}
            text="مجموع فوت‌ شدگان"
             
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
             
            loading={false}
          />{' '}
          <Statistic
            hasInfo
            infoText="تعداد افرادی که در زمان شروع به کار سامانه در طرح واکسیناسیون شرکت نکرده بودند."
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
             
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="تعداد کل تست های pcr که  کارمندان انجام داده اند."
            icon={testIcon}
            text="تعداد آزمایش های کارمندان"
             
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
             
            loading={false}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
             
            loading={false}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="نسبت مبتلایان کارمندان آموزشی به بیماری کرونا به کل جمعیت  کارمندان آموزشی"
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
             
            loading={false}
            isPercentage
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewEducationalEmploye;
