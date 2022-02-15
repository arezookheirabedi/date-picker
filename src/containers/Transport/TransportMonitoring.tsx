import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import OverviewDriversMap from 'src/components/Transport/province/OverviewDriversMap';
import OverviewDriverStatus from 'src/components/Transport/monitoring/OverviewDriversStatus';
import {sideCities} from '../../helpers/utils';

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

  const [cityTitle, setCityTitle] = useState<string | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    if (existsCity) {
      setCityTitle(provinceName);
    } else {
      setCityTitle(undefined);
    }
  }, [location.search]);

  return (
    <div className="space-y-16 mb-8">
      <OverviewDriversMap
        cityTitle={cityTitle}
        sideCityStatus={sideCities}
        destinationId="drivers-overview"
      />
      <OverviewDriverStatus cityTitle={cityTitle} />
    </div>
  );
};

export default TransportProvince;
