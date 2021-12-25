import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewDriversMap from 'src/components/Transport/OverviewDriversMap';
import OverviewDriverStatus from 'src/components/Transport/OverviewDriversStatus';

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

// eslint-disable-next-line
const mockDate = [
  {
    count: 50,
    data: 'اسفند',
  },
  {
    count: 550,
    data: 'بهمن',
  },
  {
    count: 330,
    data: 'دی',
  },
  {
    count: 100,
    data: 'آذر',
  },
  {
    count: 400,
    data: 'آبان',
  },
  {
    count: 210,
    data: 'مهر',
  },
  {
    count: 270,
    data: 'شهریور',
  },
  {
    count: 400,
    data: 'مرداد',
  },
  {
    count: 300,
    data: 'تیر',
  },
  {
    count: 350,
    data: 'خرداد',
  },
  {
    count: 200,
    data: 'اردیبهشت',
  },
  {
    count: 150,
    data: 'فروردین',
  },
];

const TransportProvince = () => {
  const location = useLocation();

  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewDriversMap cityTitle={cityTitle} sideCityStatus={sideCities} destinationId="drivers-overview"  />
      <OverviewDriverStatus />
    </div>
  );
};

export default TransportProvince;
