import React from 'react';

// components
import Statistic from '../../../../containers/Guild/components/Statistic';

// images
import flourInspectionIcon from '../../../../assets/images/icons/flour-inspection.svg';
import groupIcon from '../../../../assets/images/icons/all-group.svg';
import ovenIcon from '../../../../assets/images/icons/oven.svg';
import ovenDeactiveIcon from '../../../../assets/images/icons/oven-deactive.svg';
import bakeryWorkerIcon from '../../../../assets/images/icons/bakery-worker.svg';
import wheatIcon from '../../../../assets/images/icons/wheat.svg';
import breadIcon from '../../../../assets/images/icons/bread.svg';
import ovenInspectionIcon from '../../../../assets/images/icons/oven-inspection.svg';
import useGetOverviewInspectionStatus from '../../../../hooks/apis/inspection/useGetOverviewInspectionStatus'

const OverviewInspectionStatus = () => {

  const {data: inspection, loading} = useGetOverviewInspectionStatus();

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت بازرسی‌های انجام شده در کل کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={flourInspectionIcon}
              text="تعداد کل بازرسی‌های انجام شده"
              count={inspection.totalNumberOfInspectionsPerformed || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={groupIcon}
              text="تعداد کل بازرسان"
              count={inspection.totalNumberOfInspectors || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenIcon}
              text="تعداد واحدهای بازرسی شده دارای پروانه کسب"
              count={inspection.numberOfInspectedUnitsWithBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenDeactiveIcon}
              text="تعداد واحدهای بازرسی شده فاقد پروانه کسب"
              count={inspection.numberOfInspectedUnitsWithoutBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={bakeryWorkerIcon}
              text="تعداد کل کارگران خبازی‌های بازرسی شده"
              count={inspection.totalNumberOfInspectedWorkers || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={wheatIcon}
              text="میانگین آرد مشاهده شده در واحدهای بازرسی شده"
              count={inspection.averageObservedFlourOfInspectedUnits || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={breadIcon}
              text="مجموع نانهای پخت شده در واحدهای بازرسی شده"
              count={inspection.totalNumberOfBakedBreadsOfInspectedUnits || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenInspectionIcon}
              text="مجموع واحد‌هایی که نیاز به بازرسی دارند"
              count={inspection.totalUnitsSubjectToInspection || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
        </div>
      </fieldset>
  );
};

export default OverviewInspectionStatus;