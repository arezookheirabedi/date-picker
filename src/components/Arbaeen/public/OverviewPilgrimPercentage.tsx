import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
// import groupIcon from '../../../assets/images/icons/all-group.svg';
import greenGroupIcon from '../../../assets/images/icons/green-group-icon.svg';
import groupWithMapIcon from '../../../assets/images/icons/group-with-map.svg';
import greenPersons from '../../../assets/images/icons/persons-green-icon.svg';
import greenwemen from '../../../assets/images/icons/green-wemen.svg';
import earthPersons from '../../../assets/images/icons/earth-persons.svg';
import menEarth from '../../../assets/images/icons/men-earth.svg';
import wemenEarth from '../../../assets/images/icons/wemen-earth.svg';

const OverviewPilgrimPercentage = () => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime({
    countIranian: true,
    countMaleIranian: true,
    countFemaleIranian: true,
    countNonIranian: true,
    countMaleNonIranian: true,
    countFemaleNonIranian: true,
    countTotal: true,
  });
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به درصد زائران اربعین در کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            {/* <Statistic
              icon={groupIcon}
              text="تعداد کل پیش ثبت نام شدگان نهایی"
              count={935271}
              loading={loading}

            /> */}

            <Statistic
              icon={greenGroupIcon}
              text=" درصد کل ثبت نام شدگان نهایی ایرانی"
              count={pilgrims.countIranian || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={greenPersons}
              text=" درصد کل ثبت نام شدگان نهایی ایرانی مرد"
              count={pilgrims.countMaleIranian || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={greenwemen}
              text="درصد کل ثبت نام شدگان نهایی ایرانی زن"
              count={pilgrims.countFemaleIranian || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={earthPersons}
              text=" درصد کل ثبت نام شدگان نهایی اتباع خارجی"
              count={pilgrims.countNonIranian || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={menEarth}
              text="  درصد کل ثبت نام شدگان نهایی اتباع خارجی مرد"
              count={pilgrims.countMaleNonIranian || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={wemenEarth}
              text=" درصد کل ثبت نام شدگان نهایی اتباع خارجی زن"
              count={pilgrims.countFemaleNonIranian || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={groupWithMapIcon}
              text="درصد کل روادیدهای صادر شده"
              count={pilgrims.countTotal || 0}
              loading={loading}
              isPercentage
            />
            <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrimPercentage;
