import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from '../../../containers/Guild/components/Statistic';
import greenGroupIcon from '../../../assets/images/icons/green-group-icon.svg';
import greenPersons from '../../../assets/images/icons/persons-green-icon.svg';
import greenwemen from '../../../assets/images/icons/green-wemen.svg';

const OverviewPilgrim: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const {data: pilgrims, loading} = useGetArbaeenCountDataOnRegisterTime(
    {
      countFemale: true,
      countMale: true,
      countTotal: true,
    },
    true
  );

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16 " id="arborean-overview">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به زائران اربعین استان&nbsp;
          {cityTitle}
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={greenGroupIcon}
              text="تعداد کل ثبت نام شدگان نهایی"
              count={pilgrims.countTotal}
              loading={loading}
            />
            <Statistic
              icon={greenPersons}
              text=" تعداد کل ثبت نام شدگان نهایی مرد"
              count={pilgrims.countMale || 0}
              loading={loading}
            />
            <Statistic
              icon={greenwemen}
              text="تعداد کل ثبت نام شدگان نهایی زن"
              count={pilgrims.countFemale || 0}
              loading={loading}
            />
            {/* <div className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrim;
