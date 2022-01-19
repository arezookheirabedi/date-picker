import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
// @ts-ignore
import moment from 'moment-jalaali';

import {Menu} from '@headlessui/react';
import {ReactComponent as DownIcon} from '../../assets/images/icons/down.svg';
import DatePickerModal from '../DatePickerModal';
import calendar from '../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../RangeDateSliderFliter';
import Charts from '../Charts';
import {sideCities, toPersianDigit} from '../../helpers/utils';
import hcsService from '../../services/hcs.service';
import Spinner from '../Spinner';

const {Line} = Charts;


interface IParams {
  status: string,
  type: string,
  from: any,
  to: any,
  tags: any,
}

const recruitmentType = [
  "کل کارکنان",
  "استان آذربایجان شرقی",
  "استان آذربایجان غربی",
  "استان اردبیل",
  "استان اصفهان",
  "استان البرز",
  "استان ایلام",
  "استان بوشهر",
  "استان تهران",
  "استان خراسان جنوبی",
  "استان خراسان رضوی",
  "استان خراسان شمالی",
  "استان خوزستان",
  "استان زنجان",
  "استان سمنان",
  "استان سیستان و بلوچستان",
  "استان فارس",
  "استان قزوین",
  "استان قم",
  "استان لرستان",
  "استان مازندران",
  "استان مرکزی",
  "استان هرمزگان",
  "استان همدان",
  "استان چهارمحال و بختیاری",
  "استان کردستان",
  "استان کرمان",
  "استان کرمانشاه",
  "استان کهگیلویه و بویراحمد",
  "استان گلستان",
  "استان گیلان",
  "استان یزد",
  "بانک توسعه تعاون",
  "بانک مرکزی جمهوری اسلامی ایران",
  "بنیاد شهید و امور ایثارگران",
  "بیمه مرکزی ایران",
  "حوزه هنری سازمان تبلیغات اسلامی",
  "دانشگاه جامع علمی، کاربردی",
  "دانشگاه علوم پزشکی و خدمات بهداشتی، درمانی تهران",
  "دانشگاه علوم پزشکی و خدمات بهداشتی، درمانی شهید بهشتی",
  "دانشگاه فرهنگیان",
  "دانشگاه پیام نور",
  "دبیرخانه شورای عالی مناطق آزاد تجاری، صنعتی و ویژه اقتصادی",
  "سازمان آموزش فنی و حرفه ای کشور",
  "سازمان اسناد و کتابخانه ملی جمهوری اسلامی ایران",
  "سازمان امور عشایر",
  "سازمان امور مالیاتی کشور",
  "سازمان انتقال خون ایران",
  "سازمان اوقاف و امور خیریه",
  "سازمان بازرسی کل کشور",
  "سازمان برنامه و بودجه کشور",
  "سازمان بنادر و دریانوردی",
  "سازمان بهزیستی کشور",
  "سازمان بیمه سلامت ایران",
  "سازمان تبلیغات اسلامی",
  "سازمان تحقیقات، آموزش و ترویج کشاورزی",
  "سازمان تعزیرات حکومتی",
  "سازمان تنظیم مقررات و ارتباطات رادیویی",
  "سازمان توسعه و نوسازی معادن و صنایع معدنی ایران (شرکت مادر تخصصی)",
  "سازمان ثبت احوال کشور",
  "سازمان ثبت اسناد و املاک کشور",
  "سازمان جنگلها، مراتع و آبخیزداری کشور",
  "سازمان حج و زیارت",
  "سازمان حسابرسی",
  "سازمان حفاظت محیط زیست",
  "سازمان خبرگزاری جمهوری اسلامی",
  "سازمان دامپزشکی کشور",
  "سازمان راهداری و حمل و نقل جاده ای",
  "سازمان زمین شناسی و اکتشافات معدنی کشور",
  "سازمان زندان ها و اقدامات تامینی و تربیتی کشور",
  "سازمان شهرداری ها و دهیاری های کشور",
  "سازمان شیلات ایران",
  "سازمان فوریت های پیش بیمارستانی اورژانس کشور",
  "سازمان قضایی نیروهای مسلح",
  "سازمان مرکزی تعاون روستایی ایران",
  "سازمان ملی استاندارد",
  "سازمان نوسازی، توسعه و تجهیز مدارس کشور",
  "سازمان هواشناسی کشور",
  "سازمان پزشکی قانونی کشور",
  "سازمان گسترش و نوسازی صنایع ایران (مادر تخصصی)",
  "سازمان‌های زیر نظر رییس جمهور",
  "ستاد قوه قضاییه",
  "شرکت ارتباطات زیرساخت",
  "شرکت دولتی پست بانک",
  "شرکت سهامی بیمه ایران",
  "شرکت سهامی راه آهن جمهوری اسلامی ایران",
  "شرکت سهامی پشتیبانی امور دام کشور",
  "شرکت شهرک های کشاورزی",
  "شرکت فرودگاه ها و ناوبری هوایی ایران (مادر تخصصی)",
  "شرکت مادر تخصصی آزمایشگاه فنی و مکانیک خاک",
  "شرکت مادر تخصصی بازرگانی دولتی ایران",
  "شرکت مادر تخصصی تولید نیروی برق حرارتی",
  "شرکت مادر تخصصی خدمات کشاورزی",
  "شرکت مادر تخصصی سازمان صنایع کوچک و شهرک های صنعتی ایران",
  "شرکت مادر تخصصی سهامی عمران شهرهای جدید",
  "شرکت مادر تخصصی مدیریت تولید، انتقال و توزیع نیروی برق ایران (توانیر)",
  "شرکت مادر تخصصی مدیریت منابع آب ایران",
  "شرکت ملی مناطق نفت خیز جنوب",
  "شرکت ملی نفت ایران",
  "شرکت ملی پخش و پالایش فراورده های نفتی ایران",
  "شرکت ملی پست جمهوری اسلامی ایران",
  "شرکت ملی گاز ایران",
  "شرکت نفت مناطق مرکزی ایران",
  "شورای نظارت بر صدا و سیمای جمهوری اسلامی ایران",
  "صندوق تامین خسارت های بدنی",
  "قوه قضاییه",
  "قوه مجریه",
  "قوه مقننه",
  "مجمع جهانی اهل بیت (ع)",
  "معاونت علمی و فناوری رییس جمهور",
  "نهادهای زیر نظر مقام معظم رهبری",
  "نهادهای فرا قوه‌ای",
  "وزارت آموزش و پرورش",
  "وزارت ارتباطات و فناوری اطلاعات",
  "وزارت امور اقتصادی و دارایی",
  "وزارت بهداشت، درمان و آموزش پزشکی",
  "وزارت تعاون، کار و رفاه اجتماعی",
  "وزارت جهاد کشاورزی",
  "وزارت دادگستری",
  "وزارت راه و شهرسازی",
  "وزارت صنعت، معدن و تجارت",
  "وزارت علوم، تحقیقات و فناوری",
  "وزارت فرهنگ و ارشاد اسلامی",
  "وزارت میراث فرهنگی، گردشگری و صنایع دستی",
  "وزارت نفت",
  "وزارت نیرو",
  "وزارت ورزش و جوانان",
  "وزارت کشور",
  "کانون پرورش فکری کودکان و نوجوانان",
  "کمیته امداد امام خمینی (ره)",
  "گمرک جمهوری اسلامی ایران"
];

interface OverviewPatientsProvinceProps {
  cityTitle: any;
}

const OverviewPatientsProvince: React.FC<OverviewPatientsProvinceProps> = ({cityTitle}) => {
  const [data, setData] = useState([]);
  const [serviceType, setServiceType] = useState(null) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const location = useLocation();
  const history = useHistory();

  const [queryParams, setQueryParams] = useState<IParams>({
    status: 'POSITIVE',
    type: 'ANNUAL',
    from: '',
    to: '',
    tags: '',
  });

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const generateFromDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.from
      ? // eslint-disable-next-line
      selectedDayRange.from.year +
      '/' +
      selectedDayRange.from.month +
      '/' +
      selectedDayRange.from.day
      : '';
  };

  const generateToDate: any = () => {
    // eslint-disable-next-line
    return selectedDayRange.to
      ? // eslint-disable-next-line
      selectedDayRange.to.year + '/' + selectedDayRange.to.month + '/' + selectedDayRange.to.day
      : '';
  };

  const getLinearOverview = async (params: any) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await hcsService.testResultTimeBased(params);
      setData(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });

    let idSetTimeOut: any;
    if (existsCity) {
      idSetTimeOut = setTimeout(() => {
        getLinearOverview({
          ...queryParams,
          organization: 'employment',
          tags: `${queryParams.tags !== '' ? `${queryParams.tags},` : ''}${'استان '.concat(provinceName)}`
        });
      }, 500);
    } else {
      history.push('/dashboard/recruitment/province');
    }

    return () => {
      if (existsCity) {
        clearTimeout(idSetTimeOut);
      }
    };
  }, [queryParams, location.search]);

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      from: '',
      to: '',
      tags: ''
    });
    setServiceType('کل کارکنان')
    setSelectedDayRange({
      from: null,
      to: null,
    })
  }, [location.search])

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQueryParams({
        ...queryParams,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DDTHH:mm:ss'),
      });
    }
  }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی مبتلایان کارکنان دولت در &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-between w-3/4 px-8">
            <Menu
              as="div"
              className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
            >
              <div>
                <Menu.Button
                  className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 whitespace-nowrap truncate">
                    {serviceType || 'کل کارکنان'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2"/>
                </Menu.Button>
              </div>

              <Menu.Items
                className="z-40 max-h-60 overflow-y-auto absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {recruitmentType.map((value: any, index: any) => {
                    // console.log(value);
                    return (
                      // eslint-disable-next-line
                      <Menu.Item key={index}>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setServiceType(value);
                              setQueryParams({
                                ...queryParams,
                                tags: index !== 0 ? [value].join(',') : '',
                              });
                            }}
                          >
                            {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                            {value}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Menu>
            <div className="flex align-center justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <div className="relative z-20 inline-block text-left shadow-custom rounded-lg px-4 py-1">
                <div
                  className="inline-flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.from && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateFromDate())}
                    </span>
                  )}
                  <img src={calendar} alt="x" className="w-5 h-5"/>
                </div>
              </div>
              <div className="flex items-center justify-start mx-4">
                <span className="dash-separator"/>
              </div>
              <div className=" shadow-custom rounded-lg px-4 py-1">
                <div
                  className="flex justify-center items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 cursor-pointer"
                  onClick={focusFromDate}
                >
                  {selectedDayRange.to && (
                    <span className="ml-4 whitespace-nowrap truncate text-xs">
                      {toPersianDigit(generateToDate())}
                    </span>
                  )}
                  <img src={calendar} alt="x" className="w-5 h-5"/>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4">
            <RangeDateSliderFilter setQueryParams={setQueryParams}/>
          </div>
        </div>

        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && data.length > 0 && !errorMessage && <Line data={data}/>}
        {data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewPatientsProvince;
