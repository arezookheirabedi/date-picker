import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalRecritment from '../../../assets/images/icons/people-navy.svg';
import sufferingIcon from '../../../assets/images/icons/suffering-color.svg';
import saveIcon from '../../../assets/images/icons/save-color.svg';
import deadIcon from '../../../assets/images/icons/dead-color.svg';
import vaccineIcon from '../../../assets/images/icons/vaccine-color.svg';
import grayVaccineIcon from '../../../assets/images/icons/gray-vaccine-1.svg';
import prescriptionIcon from '../../../assets/images/icons/prescription.svg';
import testIcon from '../../../assets/images/icons/test-color.svg';

interface OverviewProvinceProps {
  cityTitle: any;
}

const OverviewProvince: React.FC<OverviewProvinceProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState(null);
  const [numberOfPositive, setNumberOfPositive] = useState(null);
  const [numberOfRecovered, setNumberOfRecovered] = useState(null);
  const [numberOfVaccination, setNumberOfVaccination] = useState(null);
  const [numberOfPlaqueVisited, setNumberOfPlaqueVisited] = useState(null);
  const [numberOfTestResults, setNumberOfTestResults] = useState(null);

  const location = useLocation();
  const history = useHistory();


  return (
    <fieldset className="mb-16 rounded-xl border px-4 pt-4 pb-8 text-center">
      <legend className="mx-auto px-3 text-black">
        نگاه کلی به پرسنل آموزشی آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={totalRecritment}
            text="مجموع کارمندان آموزش پرورش"
           
          />
          <Statistic
            icon={sufferingIcon}
            text="مجموع مبتلایان"
        
          />
          <Statistic
            icon={saveIcon}
            text="مجموع بهبود یافتگان"
          
          />
          <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان"    loading={false} />
        </div>
        <div className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={vaccineIcon}
            text="مجموع افراد واکسینه شده"
         
          />
          <Statistic icon={prescriptionIcon} text="مجموع استعلام‌های آموزش و پرورش"    />
          <Statistic
            icon={grayVaccineIcon}
            text="مجموع افراد واکسینه نشده"
       
          />
          <Statistic
            icon={testIcon}
            text="تعداد آزمایش‌های کارمندان"
            
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewProvince;
