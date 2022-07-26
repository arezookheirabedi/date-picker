import React from 'react';
// import {useHistory, useLocation} from 'react-router-dom';
// import {sideCities} from 'src/helpers/utils';
import passengerPositiveTest from 'src/assets/images/icons/passenger-positive-test.svg';
import GreyVaccine from 'src/assets/images/icons/big-gray-vaccine.svg';
import totalVacsinateStart from 'src/assets/images/icons/total-vaccinate-start-work-panel.svg';
import noneVacsinateStart from 'src/assets/images/icons/none-vaccinate-start-wok-panel.svg';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalRecritment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';
// import hcsService from '../../../services/hcs.service';

interface OverviewSchoolEmployeProps {
  cityTitle: any;
}

const OverviewSchoolEmploye: React.FC<OverviewSchoolEmployeProps> = ({cityTitle}) => {
  // const [numberOf, setNumberOf] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const [numberOfPositive, setNumberOfPositive] = useState(null);
  // const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  // const [numberOfTestResults, setNumberOfTestResults] = useState(null);
  // const [numberOfVaccination, setNumberOfVaccination] = useState(null);

  // const location = useLocation();
  // const history = useHistory();

  // const getNumberOf = async (province: string) => {
  //   setLoading(true);
  //   try {
  //     const {data} = await hcsService.membersGeneral({
  //       organization: 'education',
  //       tags: ['student'].join(','),
  //       testResultCount: true,
  //       vaccinationCount: true,
  //       total: true,
  //       province,
  //     });
  //     setNumberOf(data.total || 0);
  //     setNumberOfPositive(data.numberOfPositive || 0);
  //     setNumberOfRecovered(data.numberOfRecovered || 0);
  //     setNumberOfVaccination(data.numberOfVaccinated || 0);
  //     setNumberOfTestResults(data.numberOfNegatives + data.numberOfPositives || 0);
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.log(error);

  //     // @ts-ignore
  //     setNumberOf(0);
  //     // @ts-ignore
  //     setNumberOfPositive(0);
  //     // @ts-ignore
  //     setNumberOfRecovered(0);
  //     // @ts-ignore
  //     setNumberOfTestResults(0);
  //     // @ts-ignore
  //     setNumberOfVaccination(0);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const provinceName = params.get('provinceName') || ('تهران' as any);

  //   const existsCity = sideCities.some((item: any) => {
  //     return item.name === provinceName;
  //   });

  //   if (existsCity) {
  //     getNumberOf(provinceName);
  //   } else {
  //     history.go(-1);
  //   }
  // }, []);

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به پرسنل اداری آموزش و پرورش در استان &nbsp; {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع کارمندان اداری که در آموزش و پرورش فعالیت دارند."
            icon={totalRecritment}
            text="مجموع کارمندان اداری "
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افراد مبتلا شده به بیماری کوید"
            icon={sufferingIcon}
            text="مجموع مبتلایان"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که پس از ابتلا به بیماری کرونا بهبود یافتند."
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در اثر ابتلا به بیماری کرونا فوت کرده اند."
            icon={deadIcon}
            text="مجموع فوت‌ شدگان"
            count="-"
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            hasInfo
            infoText="مجموع افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="مجموع افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="مجموع افراد واکسینه نشده"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که بعد از شروع به کار سامانه دوز اول را دریافت کرده اند."
            icon={totalVacsinateStart}
            text="تعداد مراجعات واکسیناسیون بعد از شروع سامانه"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="تعداد افرادی که در زمان شروع به کار سامانه در طرح واکسیناسیون شرکت نکرده بودند."
            icon={noneVacsinateStart}
            text="مجموع افراد واکسینه نشده در زمان شروع سامانه"
            count="-"
            loading={false}
          />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          {/* <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={guildInquiry.total}  loading={inquiryLoading}/>
          <Statistic icon={scanDangerIcon} text="تعداد استعلامهای نتیجه مثبت" count={guildInquiry.disqualified}  loading={inquiryLoading}/> */}
          <Statistic
            hasInfo
            infoText="تعداد کل تست های pcr که  کارمندان انجام داده اند."
            icon={testIcon}
            text="تعداد آزمایش های کارمندان"
            count="-"
            loading={false}
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که در طرح ملی واکسیناسیون شرکت نکرده اند."
            icon={GreyVaccine}
            text="درصد افراد واکسینه نشده"
            count="-"
            loading={false}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن زده اند."
            icon={vaccineIcon}
            text="درصد افراد واکسینه شده"
            count="-"
            loading={false}
            isPercentage
          />
          <Statistic
            hasInfo
            infoText="نسبت مبتلایان کارمندان اداری به بیماری کرونا به کل جمعیت  کارمندان اداری"
            icon={passengerPositiveTest}
            text="درصد ابتلا به کل"
            count="-"
            loading={false}
            isPercentage
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSchoolEmploye;
