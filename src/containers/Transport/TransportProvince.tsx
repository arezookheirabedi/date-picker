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
    color: "#FBE186"
  },
  {
    name: "بوشهر",
    color: "#FBE186"
  },
  {
    name: "کهگیلویه و بویراحمد",
    color: "#FBE186"
  },
  {
    name: "فارس",
    color: "#FBE186"
  },
  {
    name: "اصفهان",
    color: "#FBE186"
  },
  {
    name: "سمنان",
    color: "#FBE186"
  },
  {
    name: "گلستان",
    color: "#FBE186"
  },
  {
    name: "مازندران",
    color: "#FBE186"
  },
  {
    name: "تهران",
    color: "#FBE186"
  },
  {
    name: "مرکزی",
    color: "#FBE186"
  },
  {
    name: "یزد",
    color: "#FBE186"
  },
  {
    name: "چهارمحال و بختیاری",
    color: "#FBE186"
  },
  {
    name: "خوزستان",
    color: "#FBE186"
  },
  {
    name: "لرستان",
    color: "#F8D354"
  },
  {
    name: "ایلام",
    color: "#F8D354"
  },
  {
    name: "اردبیل",
    color: "#F8D354"
  },
  {
    name: "قم",
    color: "#F8D354"
  },
  {
    name: "همدان",
    color: "#F8D354"
  },
  {
    name: "زنجان",
    color: "#F8D354"
  },
  {
    name: "قزوین",
    color: "#FFC700"
  },
  {
    name: "آذربایجان غربی",
    color: "#FFC700"
  },
  {
    name: "آذربایجان شرقی",
    color: "#FFC700"
  },
  {
    name: "کرمانشاه",
    color: "#FFC700"
  },
  {
    name: "گیلان",
    color: "#FF9114"
  },
  {
    name: "کردستان",
    color: "#FF9114"
  },
  {
    name: "خراسان جنوبی",
    color: "#FF9114"
  },
  {
    name: "خراسان رضوی",
    color: "#FF9114"
  },
  {
    name: "خراسان شمالی",
    color: "#FF9114"
  },
  {
    name: "سیستان و بلوچستان",
    color: "#CF0D0D"
  },
  {
    name: "کرمان",
    color: "#CF0D0D"
  },
  {
    name: "البرز",
    color: "#AB0A0A"
  },
]

const itemStatistics = [
  [
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
  ],
  [
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
  ]
];

const mockDate = [
  {
    count : 50,
    data : "اسفند"
  },
  {
    count : 550,
    data : "بهمن"
  },
  {
    count : 330,
    data : "دی"
  },
  {
    count : 100,
    data : "آذر"
  },
  {
    count : 400,
    data : "آبان"
  },
  {
    count : 210,
    data : "مهر"
  },
  {
    count : 270,
    data : "شهریور"
  },
  {
    count : 400,
    data : "مرداد"
  },
  {
    count : 300,
    data : "تیر"
  },
  {
    count : 350,
    data : "خرداد"
  },
  {
    count : 200,
    data : "اردیبهشت"
  },
  {
    count : 150,
    data : "فروردین"
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
  return (
    <div className="space-y-16 mb-8">
      <OverviewDriversMap cityTitle="تهران" sideCityStatus={sideCities}/>
      <OverviewDriversProvince cityTitle="تهران" itemStatistics={itemStatistics}/>
      <OverviewCategoriesProvince cityTitle="تهران" />
      <OverviewPublicPatientsProvince cityTitle="تهران" data={mockDate} />
      <OverviewOfVaccinationInPublicTransportProvince cityTitle="تهران" />
      <TestsInTransportProvince cityTitle="تهران" data={pyramidData} />
    </div>
  )
}

export default TransportProvince;