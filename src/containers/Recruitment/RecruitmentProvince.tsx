import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
// import {useLocation} from "react-router-dom";
import OverviewMap from '../../components/Recruitment/OverviewMap';
import OverviewPatientsProvince from '../../components/Recruitment/OverviewPatientsProvince';
import TestsStatusProvince from '../../components/Recruitment/TestStatusProvince';
import {IDetail} from '../../components/Charts/Pyramid';
import OverviewCategoriesProvince from '../../components/Recruitment/OverviewCategoriesProvince';
import OverviewOfVaccinationProvince from '../../components/Recruitment/OverviewOfVaccinationProvince';

const sideCities = [
  {
    name: 'هرمزگان',
    color: '#ccc',
  },
  {
    name: 'بوشهر',
    color: '#ccc',
  },
  {
    name: 'کهگیلویه و بویراحمد',
    color: '#ccc',
  },
  {
    name: 'فارس',
    color: '#ccc',
  },
  {
    name: 'اصفهان',
    color: '#ccc',
  },
  {
    name: 'سمنان',
    color: '#ccc',
  },
  {
    name: 'گلستان',
    color: '#ccc',
  },
  {
    name: 'مازندران',
    color: '#ccc',
  },
  {
    name: 'تهران',
    color: '#ccc',
  },
  {
    name: 'مرکزی',
    color: '#ccc',
  },
  {
    name: 'یزد',
    color: '#ccc',
  },
  {
    name: 'چهارمحال و بختیاری',
    color: '#ccc',
  },
  {
    name: 'خوزستان',
    color: '#ccc',
  },
  {
    name: 'لرستان',
    color: '#ccc',
  },
  {
    name: 'ایلام',
    color: '#ccc',
  },
  {
    name: 'اردبیل',
    color: '#ccc',
  },
  {
    name: 'قم',
    color: '#ccc',
  },
  {
    name: 'همدان',
    color: '#ccc',
  },
  {
    name: 'زنجان',
    color: '#ccc',
  },
  {
    name: 'قزوین',
    color: '#ccc',
  },
  {
    name: 'آذربایجان غربی',
    color: '#ccc',
  },
  {
    name: 'آذربایجان شرقی',
    color: '#ccc',
  },
  {
    name: 'کرمانشاه',
    color: '#ccc',
  },
  {
    name: 'گیلان',
    color: '#ccc',
  },
  {
    name: 'کردستان',
    color: '#ccc',
  },
  {
    name: 'خراسان جنوبی',
    color: '#ccc',
  },
  {
    name: 'خراسان رضوی',
    color: '#ccc',
  },
  {
    name: 'خراسان شمالی',
    color: '#ccc',
  },
  {
    name: 'سیستان و بلوچستان',
    color: '#ccc',
  },
  {
    name: 'کرمان',
    color: '#ccc',
  },
  {
    name: 'البرز',
    color: '#ccc',
  },
];

const pyramidData: Array<IDetail> = [
  {
    title: 'اسنپ',
    percentage: 90,
    color: '#049975',
  },
  {
    title: 'تپسی',
    percentage: 80,
    color: '#00F1E3',
  },
  {
    title: 'تاکسی پلاک ع',
    percentage: 70,
    color: '#4EC4F2',
  },
  {
    title: 'تاکسی پلاک ت',
    percentage: 60,
    color: '#9D19FA',
  },
  {
    title: 'سرویس مدارس',
    percentage: 50,
    color: '#F534DB',
  },
  {
    title: 'تاکسی فرودگاهی',
    percentage: 40,
    color: '#F5DF34',
  },
  {
    title: 'اتوبوس رانی',
    percentage: 30,
    color: '#FE8007',
  },
];

const RecruitmentProvince = () => {
  const location = useLocation();

  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    console.log(provinceName);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="province-overview"
      />

      <OverviewCategoriesProvince cityTitle={cityTitle} />
      <OverviewPatientsProvince cityTitle={cityTitle} />
      <OverviewOfVaccinationProvince cityTitle={cityTitle} />
      <TestsStatusProvince cityTitle={cityTitle} data={pyramidData} />
    </div>
  );
};

export default RecruitmentProvince;
