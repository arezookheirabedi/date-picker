import {IInitialCount} from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from 'src/containers/Guild/components/Statistic';
import groupIcon from 'src/assets/images/icons/all-group.svg';
import pilgrimList from 'src/assets/images/icons/pilgrim-list.svg';
import passport from 'src/assets/images/icons/passport.svg';
import greenwemen from 'src/assets/images/icons/woman-pilgrim.svg';
import menEarth from 'src/assets/images/icons/foreigner-man.svg';
import wemenEarth from 'src/assets/images/icons/foreigener-woman.svg';
import manPilgrim from 'src/assets/images/icons/man-pilgrim.svg';
import earthPersons from 'src/assets/images/icons/pilgrim-foreigner.svg';

interface IProps {
  loading: boolean;
  pilgrims: IInitialCount;
}

const OverviewPilgrimCount: React.FC<IProps> = ({pilgrims, loading}) => {
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به تعداد زائران اربعین در کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={pilgrimList}
              text="تعداد کل پیش ثبت نام شدگان نهایی"
              count={935271}
              loading={loading}
            />
            <Statistic
              icon={groupIcon}
              text=" تعداد کل ثبت نام شدگان نهایی ایرانی"
              count={pilgrims.countIranian || 0}
              loading={loading}
            />
            <Statistic
              icon={manPilgrim}
              text=" تعداد کل ثبت نام شدگان نهایی ایرانی مرد"
              count={pilgrims.countMaleIranian || 0}
              loading={loading}
            />
            <Statistic
              icon={greenwemen}
              text="تعداد کل ثبت نام شدگان نهایی ایرانی زن"
              count={pilgrims.countFemaleIranian || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={earthPersons}
              text=" تعداد کل ثبت نام شدگان نهایی اتباع خارجی"
              count={pilgrims.countNonIranian || 0}
              loading={loading}
            />
            <Statistic
              icon={menEarth}
              text="  تعداد کل ثبت نام شدگان نهایی اتباع خارجی مرد"
              count={pilgrims.countMaleNonIranian || 0}
              loading={loading}
            />
            <Statistic
              icon={wemenEarth}
              text=" تعداد کل ثبت نام شدگان نهایی اتباع خارجی زن"
              count={pilgrims.countFemaleNonIranian || 0}
              loading={loading}
            />
            <Statistic
              icon={passport}
              text="تعداد کل روادیدهای صادر شده"
              count={pilgrims.countTotal || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrimCount;
