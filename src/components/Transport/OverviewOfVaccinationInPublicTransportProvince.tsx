import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import Statistic from "../../containers/Guild/components/Statistic";
import totalDriver from "../../assets/images/icons/transport-color.svg";
// import YellowVaccine from "../../assets/images/icons/yellow-vaccine.svg";
import GreenVaccine from "../../assets/images/icons/green-vaccine.svg";
import GrayVaccine from "../../assets/images/icons/gray-vaccine.svg";
import Table from "../Table";
import CategoryDonut from "../../containers/Guild/components/CategoryDonut";
import transportService from "../../services/transport.service";
import YellowVaccineMd from "../../assets/images/icons/yellow-vaccine-lg.svg";
import PurppleVaccineMd from "../../assets/images/icons/purpple-vaccine-lg.svg";
import NavyVaccineMd from "../../assets/images/icons/navy-vaccine-lg.svg";
import BlueVaccine from "../../assets/images/icons/blue-vaccine.svg";
import GrayVaccine2 from "../../assets/images/icons/gray-vaccine-2.svg";
import Spinner from "../Spinner";


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


interface OverviewOfVaccinationInPublicTransportProvinceProps {
  cityTitle: any
}

const getServiceTypeName = (item: any) => {
  switch (item) {
    case 'PUBLIC':
      return 'تاکسی پلاک ع';
    case 'TAXI_T':
      return 'تاکسی پلاک ت';
    case 'ONLINE':
      return 'تاکسی آنلاین';
    case 'MOTOR_PEYK':
      return 'موتور سیکلت';
    case 'SCHOOL_SERVICE':
      return 'سرویس مدارس'
    default:
      return null;
  }
};

const OverviewOfVaccinationInPublicTransportProvince: React.FC<OverviewOfVaccinationInPublicTransportProvinceProps> = ({cityTitle}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [countsLoading, setCountsLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
// eslint-disable-next-line
  const [reportsDose, setReportsDose] = useState({}) as any;
  // eslint-disable-next-line
  const [reportsDoseLoading, setReportsDoseLoading] = useState(false) as any;

  async function getReportsDose(param: any) {
    setReportsDoseLoading(true);
    try {
      const {data} = await transportService.reportsDose(param);
      const normalizedData: any[] = [];
      let noDose = 0;
      let firstDose = 0;
      let secondDose = 0;
      let threeDose = 0;
      let allVaccination = 0;
      let moreThanThreeDose = 0;
      let unknownInformation = 0;
      data.dosesCount.forEach((item: any) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(item)) {
          if (Number(key) === 0) {
            noDose += Number(value);
          }

          if (Number(key) === 1) {
            firstDose += Number(value);
          }

          if (Number(key) === 2) {
            secondDose += Number(value);
          }

          if (Number(key) === 3) {
            threeDose += Number(value);
          }
          if (Number(key) !== 0 && key !== 'null') {
            allVaccination += Number(value);
          }

          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            moreThanThreeDose += Number(value);
          }

          if (key === 'null') {
            unknownInformation += Number(value);
          }
        }
      })
      normalizedData.push({
        threeDose,
        allVaccination,
        moreThanThreeDose,
        unknownInformation
      });


      setReportsDose({
        noDose,
        firstDose,
        secondDose,
        threeDose,
        allVaccination,
        moreThanThreeDose,
        unknownInformation,
        allDrivers: unknownInformation + noDose + allVaccination
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReportsDoseLoading(false);
    }
  }

  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await transportService.overviewVaccinePercent(params);
      const normalizedDate: any[] = [];


      data.forEach((item: any, index: number) => {
        let firstDose = 0;
        let secondDose = 0;
        let thirdDose = 0;
        let moreThanThreeDose = 0;
        let allVaccination = 0;
        let unknownInformation = 0;
        let noDose = 0;
        let total = 0;
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(item.doseCountMap)) {
          if (Number(key) === 0) {
            noDose += Number(value);
          }


          if (Number(key) === 1) {
            firstDose += Number(value);
          }

          if (Number(key) === 2) {
            secondDose += Number(value);
          }

          if (Number(key) === 3) {
            thirdDose += Number(value);
          }

          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            moreThanThreeDose += Number(value);
          }

          if (Number(key) !== 0 && key !== 'null') {
            allVaccination += Number(value);
          }

          if (key === 'null') {
            unknownInformation += Number(value);
          }

          total = allVaccination + noDose + unknownInformation;

        }


        console.log('allvaccination => ', allVaccination)
        console.log('no dose  => ', noDose)
        console.log('unknonw information  => ', unknownInformation)
        console.log('total  => ', total)


        normalizedDate.push({
          id: `ovvac_${index}`,
          name: getServiceTypeName(item.serviceType),
          firstDosePercentage: (firstDose * 100) / total,
          secondDosePercentage: (secondDose * 100) / total,
          thirdDosePercentage: (thirdDose * 100) / total,
          otherDose: (moreThanThreeDose * 100) / total,
          unknownInformation: (unknownInformation * 100) / total,
          allDoses: ((firstDose + secondDose + thirdDose + moreThanThreeDose) * 100) / total,
          noDose: (noDose * 100) / total
          // twoDoseVaccine: twoDoseVaccine ? (twoDoseVaccine * 100) / total : 0,
          // fullDoseVaccine: fullDoseVaccine ? (fullDoseVaccine * 100) / total : 0,
          // // eslint-disable-next-line
          // notVaccine: item.doseCountMap
          //   ? item.doseCountMap[0]
          //     ? (item.doseCountMap[0] * 100) / total
          //     : 0
          //   : 0,
        });

      });
      console.log('normali =>  ', normalizedDate)
      setDataset([...normalizedDate]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   getReportsDose();
  //   getOverviewByVaccinePercent({});
  // }, []);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || 'تهران' as any;

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    })

    let idSetTimeOut: any;
    if (existsCity) {
      idSetTimeOut = setTimeout(() => {
        getReportsDose({'province': provinceName});
        getOverviewByVaccinePercent({'province': provinceName});
        // getLinearOverviewPublicTransport();
      }, 500);
    } else {
      history.push('/dashboard/transport/province');
    }


    return () => {
      if (existsCity) {
        clearTimeout(idSetTimeOut)
      }
    };

  }, [location.search])

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16" >
      <legend className="text-black mx-auto px-3">
        نگاه کلی واکسیناسیون در حمل و نقل عمومی در
        &nbsp;
        {cityTitle}
      </legend>

      <div
        className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
        <Statistic
          icon={totalDriver}
          text="مجموع رانندگان"
          count={reportsDose.allDrivers || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={YellowVaccineMd}
          text="تعداد واکسیناسیون دوز اول"
          count={reportsDose.firstDose || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={PurppleVaccineMd}
          text="تعداد واکسیناسیون دوز دوم"
          count={reportsDose.secondDose || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={NavyVaccineMd}
          text="تعداد واکسیناسیون دوز سوم"
          count={reportsDose.threeDose || 0}
          loading={reportsDoseLoading}
        />
      </div>
      <div
        className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
        <Statistic
          icon={GreenVaccine}
          text="تعداد کل واکسیناسیون"
          count={reportsDose.allVaccination || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={BlueVaccine}
          text="بیش از ۳ دوز"
          count={reportsDose.moreThanThreeDose || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={GrayVaccine}
          text="تعداد اطلاعات مخدوش"
          count={reportsDose.unknownInformation || 0}
          loading={reportsDoseLoading}
        />
        <Statistic
          icon={GrayVaccine2}
          text="تعداد واکسیناسیون انجام نشده"
          count={reportsDose.noDose || 0}
          loading={reportsDoseLoading}
        />
      </div>
      {loading ? (
        <div className="p-20">
          <Spinner/>
        </div>
      ) : (
        <>
          <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Table
              dataSet={[...dataset]}
              pagination={{pageSize: 20, maxPages: 3}}
              columns={[
                {
                  name: 'وضعیت کلی',
                  key: '',
                  render: (v: any, record) => {

                    console.log('v => ', v);
                    console.log('record => ', record);
                    return (
                      (
                        <CategoryDonut
                          data={[
                            {
                              name: 'fullDoseVaccine',
                              title: 'دوز کل',
                              y: record.allDoses || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#05D8A4'], // start
                                  [1, '#039572'], // end
                                ],
                              },
                            },
                            {
                              name: 'notVaccine',
                              title: 'واکسن نزده',
                              y: record.noDose || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#FE2D2F'], // start
                                  [1, '#CC0002'], // end
                                ],
                              },
                            },
                            {
                              name: 'notVaccine',
                              title: 'اطلاعات مخدوش',
                              y: record.unknownInformation || 0,
                              color: {
                                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                                stops: [
                                  [0, '#eee'], // start
                                  [1, '#a8a8a8'], // end
                                ],
                              },
                            },
                          ]}
                        />
                      )
                    )
                  },
                  className: 'flex justify-center w-full',
                },
                {
                  name: 'رسته های حمل و نقل',
                  key: 'name',
                  render: (v: any, record, index: number) => (
                    <span>
                      {(index + 1).toLocaleString('fa')}.{v}
                    </span>
                  ),
                },
                {
                  name: 'دوز اول',
                  key: 'firstDosePercentage',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'دوز دوم',
                  key: 'secondDosePercentage',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'دوز سوم',
                  key: 'thirdDosePercentage',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'کل دوز',
                  key: 'allDoses',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'اطلاعات مخدوش',
                  key: 'unknownInformation',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                },
                {
                  name: 'واکسن نزده',
                  key: 'noDose',
                  render: (v: any) => <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>,
                }
              ]}
              totalItems={0}
            />
          </div>
        </>
      )}
    </fieldset>
  )
}

export default OverviewOfVaccinationInPublicTransportProvince;
