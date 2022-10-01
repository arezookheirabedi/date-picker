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

interface OverviewInspectionStatusProvinceProps {
  cityTitle: any;
  data: any;
  loading: any
}

const OverviewInspectionStatusProvince: React.FC<OverviewInspectionStatusProvinceProps> = ({cityTitle,data, loading}) => {

 
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" id="bakery-inspection-overview">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت بازرسی‌های انجام شده در استان {cityTitle}</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={flourInspectionIcon}
              text="تعداد کل بازرسی‌های انجام شده"
              count={data.inspectionCount || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={groupIcon}
              text="تعداد کل بازرسان"
              count={data.inspectorCount || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenIcon}
              text="تعداد واحدهای بازرسی شده دارای پروانه کسب"
              count={data.unitsHavingBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenDeactiveIcon}
              text="تعداد واحدهای بازرسی شده فاقد پروانه کسب"
              count={data.unitsNotHavingBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={bakeryWorkerIcon}
              text="تعداد کل کارگران خبازی‌های بازرسی شده"
              count={data.workersCount || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={wheatIcon}
              text="میانگین آرد مشاهده شده در واحدهای بازرسی شده"
              count={Math.floor(data.averageOfFlour) || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={breadIcon}
              text="مجموع نانهای پخت شده در واحدهای بازرسی شده"
              count={data.bakedBreadsCount || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenInspectionIcon}
              text="مجموع واحد‌هایی که نیاز به بازرسی دارند"
              count={data.neededToInspectionCount || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
        </div>
      </fieldset>
  );
};

export default OverviewInspectionStatusProvince;