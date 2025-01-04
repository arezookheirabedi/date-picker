import React from 'react';
import Statistic from '../../../containers/Guild/components/Statistic';
import driverInfectedIcon from '../../../assets/images/icons/driver-infected.svg';
import deactiveFuelCardIcon from '../../../assets/images/icons/deactive-fuel-card.svg';
import informationUpdatedIcon from '../../../assets/images/icons/information-updated.svg';
import deactivateInquiryIcon from '../../../assets/images/icons/deactivate-inquiry.svg';


interface OverviewSamasProvinceProps {
  cityTitle: any;
}

const OverviewSamasProvince: React.FC<OverviewSamasProvinceProps> = ({cityTitle}) => {
  // eslint-disable-next-line

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        سامانه ملی اطلاعات سفر (سماس) استان {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={driverInfectedIcon}
            text="موارد مثبت اعلامی به سماس"
            // count={numberOfDrivers}
            count={0}
            loading={false}
            hasInfo
            infoText="مجموع موارد مبتلایان مثبت و اعلام شده به سماس در رسته‌های مختلف."
          />
          <Statistic
            icon={deactivateInquiryIcon}
            text="غیر فعالسازی‌های انجام شده"
            // count={numberOfPositiveDrivers}
         
            loading={false}
            hasInfo
            infoText="غیرفعال‌سازی انجام شده رانندگان مبتلا توسط سماس."
          />
          <Statistic
            icon={informationUpdatedIcon}
            text="اطلاعات به روز رسانی شده"
            // count={numberOfPlaqueVisited}
         
            loading={false}
            hasInfo
            infoText="مجموع اطلاعات به روزرسانی شده توسط سماس."
          />
          <Statistic
            icon={deactiveFuelCardIcon}
            text="مجموع تعلیق‌های کارت سوخت"
         
            loading={false}
            hasInfo
            infoText="مجموع کارت سوخت تعیلق شده افراد مختلف توسط سماس."
          />
        </div>
      </div>
    </fieldset>
  );
};
export default OverviewSamasProvince;
