import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import groupIcon from '../../../assets/images/icons/all-group.svg';
// import pilgrimList from '../../../assets/images/icons/pilgrim-list.svg';
// import greenGroupIcon from '../../../assets/images/icons/green-group-icon.svg';
import passport from '../../../assets/images/icons/passport.svg';
// import greenPersons from '../../../assets/images/icons/persons-green-icon.svg';
import greenwemen from '../../../assets/images/icons/woman-pilgrim.svg';
// import greenwemen from '../../../assets/images/icons/green-wemen.svg';
// import earthPersons from '../../../assets/images/icons/earth-persons.svg';
import menEarth from '../../../assets/images/icons/foreigner-man.svg';
import wemenEarth from '../../../assets/images/icons/foreigener-woman.svg';
import manPilgrim from '../../../assets/images/icons/man-pilgrim.svg';
import earthPersons from '../../../assets/images/icons/pilgrim-foreigner.svg';

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
              icon={pilgrimList}
              text="  درصد کل پیش ثبت نام شدگان نهایی ایرانی"
              count={935271}
              loading={loading}
              isPercentage
            /> */}

            <Statistic
              icon={groupIcon}
              text=" درصد کل ثبت نام شدگان نهایی ایرانی"
              count={pilgrims.countIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={manPilgrim}
              text=" درصد کل ثبت نام شدگان نهایی ایرانی مرد"
              count={pilgrims.countMaleIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={greenwemen}
              text="درصد کل ثبت نام شدگان نهایی ایرانی زن"
              count={pilgrims.countFemaleIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={earthPersons}
              text=" درصد کل ثبت نام شدگان نهایی اتباع خارجی"
              count={pilgrims.countNonIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={menEarth}
              text="درصد کل ثبت نام شدگان نهایی اتباع خارجی مرد"
              count={pilgrims.countMaleNonIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={wemenEarth}
              text=" درصد کل ثبت نام شدگان نهایی اتباع خارجی زن"
              count={pilgrims.countFemaleNonIranianPercentage || 0}
              loading={loading}
              isPercentage
            />
            <Statistic
              icon={passport}
              text="درصد کل روادیدهای صادر شده"
              count={pilgrims.countTotalPercentage || 0}
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
