import React from 'react';
import {IInitialCount} from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import Statistic from 'src/containers/Guild/components/Statistic';
import airplanIcon from 'src/assets/images/icons/airplan.svg';
import groupWithFlagIcon from 'src/assets/images/icons/group-with-flag.svg';
import carIcon from 'src/assets/images/icons/car.svg';
import railIcon from 'src/assets/images/icons/rail.svg';

interface IProps {
  loading: boolean;
  pilgrims: IInitialCount;
}

const OverviewPligrimTripTypeCount: React.FC<IProps> = ({pilgrims, loading}) => {
  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به تعداد زائران اربعین براساس نوع سفر
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.countTotal || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائران ثبت نام شده نهایی ایرانی و غیر ایرانی"
            />
            <Statistic
              icon={airplanIcon}
              text="تعداد کل زائران هوایی"
              count={pilgrims.countZaerinAir || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را هوایی انتخاب کرده‌اند."
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران زمینی"
              count={pilgrims.countZaerinGround || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را زمینی انتخاب کرده‌اند."
            />
            <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.countZaerinRail || 0}
              loading={loading}
              hasInfo
              infoText="تعداد کل زائرانی که نوع سفر خود را ریلی انتخاب کرده‌اند."
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimTripTypeCount;
