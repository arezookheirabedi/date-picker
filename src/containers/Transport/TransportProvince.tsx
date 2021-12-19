import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
// import {useLocation} from "react-router-dom";

import OverviewDriversMap from "../../components/Transport/OverviewDriversMap";
import OverviewDriversProvince from "../../components/Transport/OverviewDriversProvince";

import totalDriver from "../../assets/images/icons/transport-color.svg";
import sufferingIcon from "../../assets/images/icons/suffering-color.svg";
import saveIcon from "../../assets/images/icons/save-color.svg";
import deadIcon from "../../assets/images/icons/dead-color.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import inquiryPlaque from "../../assets/images/icons/inquiry-plaque.svg";
import positiveInquiryPlaque from "../../assets/images/icons/positive-inquiry-plaque.svg";
import testIcon from "../../assets/images/icons/test-color.svg";
import OverviewPublicPatientsProvince from "../../components/Transport/OverviewPublicPatientsProvince";
import TestsInTransportProvince from "../../components/Transport/TestsInTransportProvince";
import {IDetail} from "../../components/Charts/Pyramid";
import OverviewCategoriesProvince from "../../components/Transport/OverviewCategoriesProvince";
import OverviewOfVaccinationInPublicTransportProvince
  from "../../components/Transport/OverviewOfVaccinationInPublicTransportProvince";


const sideCities = [
  {
    name: "هرمزگان",
    color: "#ccc"
  },
  {
    name: "بوشهر",
    color: "#ccc"
  },
  {
    name: "کهگیلویه و بویراحمد",
    color: "#ccc"
  },
  {
    name: "فارس",
    color: "#ccc"
  },
  {
    name: "اصفهان",
    color: "#ccc"
  },
  {
    name: "سمنان",
    color: "#ccc"
  },
  {
    name: "گلستان",
    color: "#ccc"
  },
  {
    name: "مازندران",
    color: "#ccc"
  },
  {
    name: "تهران",
    color: "#ccc"
  },
  {
    name: "مرکزی",
    color: "#ccc"
  },
  {
    name: "یزد",
    color: "#ccc"
  },
  {
    name: "چهارمحال و بختیاری",
    color: "#ccc"
  },
  {
    name: "خوزستان",
    color: "#ccc"
  },
  {
    name: "لرستان",
    color: "#ccc"
  },
  {
    name: "ایلام",
    color: "#ccc"
  },
  {
    name: "اردبیل",
    color: "#ccc"
  },
  {
    name: "قم",
    color: "#ccc"
  },
  {
    name: "همدان",
    color: "#ccc"
  },
  {
    name: "زنجان",
    color: "#ccc"
  },
  {
    name: "قزوین",
    color: "#ccc"
  },
  {
    name: "آذربایجان غربی",
    color: "#ccc"
  },
  {
    name: "آذربایجان شرقی",
    color: "#ccc"
  },
  {
    name: "کرمانشاه",
    color: "#ccc"
  },
  {
    name: "گیلان",
    color: "#ccc"
  },
  {
    name: "کردستان",
    color: "#ccc"
  },
  {
    name: "خراسان جنوبی",
    color: "#ccc"
  },
  {
    name: "خراسان رضوی",
    color: "#ccc"
  },
  {
    name: "خراسان شمالی",
    color: "#ccc"
  },
  {
    name: "سیستان و بلوچستان",
    color: "#ccc"
  },
  {
    name: "کرمان",
    color: "#ccc"
  },
  {
    name: "البرز",
    color: "#ccc"
  },
]

const itemStatistics = [
  {
    title: "مجموع رانندگان",
    count: "1257",
    icon: totalDriver,
  },
  {
    title: "مجموع مبتلایان",
    count: 1257,
    icon: sufferingIcon,
  },
  {
    title: "مجموع بهبودیافتگان",
    count: 832,
    icon: saveIcon,
  },
  {
    title: "مجموع فوت‌شدگان",
    count: 564,
    icon: deadIcon,
  },
  {
    title: "مجموع واکسیناسیون",
    count: 436,
    icon: vaccineIcon,
  },
  {
    title: "تعداد استعلام پلاک",
    count: 1257,
    icon: inquiryPlaque,
  },
  {
    title: "تعداد استعلام‌های نتیجه مثبت",
    count: 832,
    icon: positiveInquiryPlaque,
  },
  {
    title: "تعداد آزمایش‌های رانندگان",
    count: 564,
    icon: testIcon,
  }
];

const mockDate = [
  {
    count: 50,
    data: "اسفند"
  },
  {
    count: 550,
    data: "بهمن"
  },
  {
    count: 330,
    data: "دی"
  },
  {
    count: 100,
    data: "آذر"
  },
  {
    count: 400,
    data: "آبان"
  },
  {
    count: 210,
    data: "مهر"
  },
  {
    count: 270,
    data: "شهریور"
  },
  {
    count: 400,
    data: "مرداد"
  },
  {
    count: 300,
    data: "تیر"
  },
  {
    count: 350,
    data: "خرداد"
  },
  {
    count: 200,
    data: "اردیبهشت"
  },
  {
    count: 150,
    data: "فروردین"
  },
];

const pyramidData: Array<IDetail> = [
  {
    title: 'اسنپ',
    percentage: 90,
    color: '#049975'
  },
  {
    title: 'تپسی',
    percentage: 80,
    color: '#00F1E3'
  },
  {
    title: 'تاکسی پلاک ع',
    percentage: 70,
    color: '#4EC4F2'
  },
  {
    title: 'تاکسی پلاک ت',
    percentage: 60,
    color: '#9D19FA'
  },
  {
    title: 'سرویس مدارس',
    percentage: 50,
    color: '#F534DB'
  },
  {
    title: 'تاکسی فرودگاهی',
    percentage: 40,
    color: '#F5DF34'
  },
  {
    title: 'اتوبوس رانی',
    percentage: 30,
    color: '#FE8007'
  }
];

const TransportProvince = () => {

  const location = useLocation();
  const [queryParams, setQueryParams] = useState({
    provinceName: null
  }) as any;

  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    })

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    setQueryParams((pre: any) => {
      return {...pre, provinceName: queryParams.provinceName}
    })

    if (queryParams.provinceName) {
      setCityTitle(queryParams.provinceName);
    }

  }, [queryParams.provinceName])

  return (
    <div className="space-y-16 mb-8">
      <OverviewDriversMap cityTitle={cityTitle} sideCityStatus={sideCities}
                          setQueryParams={setQueryParams}/>
      <OverviewDriversProvince cityTitle={cityTitle} itemStatistics={itemStatistics}/>
      <OverviewCategoriesProvince cityTitle={cityTitle}/>
      <OverviewPublicPatientsProvince cityTitle={cityTitle} data={mockDate}/>
      <OverviewOfVaccinationInPublicTransportProvince cityTitle={cityTitle}/>
      <TestsInTransportProvince cityTitle={cityTitle} data={pyramidData}/>
    </div>
  )
}

export default TransportProvince;