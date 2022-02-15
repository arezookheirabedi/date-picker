import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import {Menu} from '@headlessui/react';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine.svg';
import GrayVaccine from '../../../assets/images/icons/gray-vaccine.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import transportService from '../../../services/transport.service';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import BlueVaccine from '../../../assets/images/icons/blue-vaccine.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import Spinner from '../../Spinner';
import {sideCities, getServiceTypeName} from '../../../helpers/utils';
import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';

const filterTypes = [
  {
    name: 'بیشترین',
    enName: 'HIGHEST',
  },
  {
    name: 'کمترین',
    enName: 'LOWEST',
  },
];

interface OverviewOfVaccinationInPublicTransportProvinceProps {
  cityTitle: any;
}

const OverviewOfVaccinationInPublicTransportProvince: React.FC<OverviewOfVaccinationInPublicTransportProvinceProps> =
  ({cityTitle}) => {
    const [filterType, setFilterType] = useState({name: 'کمترین', enName: 'LOWEST'});
    const [loading, setLoading] = useState(false);
    const [dataset, setDataset] = useState<any>([]);
    const [orgDataset, setOrgDataset] = useState<any>([]);
    const [reportsDose, setReportsDose] = useState({}) as any;
    const [reportsDoseLoading, setReportsDoseLoading] = useState(false) as any;

    const {CancelToken} = axios;
    const source = CancelToken.source();

    async function getReportsDose(param: any) {
      setReportsDoseLoading(true);
      try {
        const {data} = await transportService.reportsDose(param, {cancelToken: source.token});
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

            // temporary code
            if (Number(key) === 3 || Number(key) > 3) {
              threeDose += Number(value);
            }

            // if (Number(key) === 3) {
            //   threeDose += Number(value);
            // }

            if (Number(key) !== 0 && key !== 'null') {
              allVaccination += Number(value);
            }

            // temporary code
            if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
              moreThanThreeDose += 0;
            }

            // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            //   moreThanThreeDose += Number(value);
            // }

            if (key === 'null') {
              unknownInformation += Number(value);
            }
          }
        });
        normalizedData.push({
          threeDose,
          allVaccination,
          moreThanThreeDose,
          unknownInformation,
        });

        setReportsDose({
          noDose,
          firstDose,
          secondDose,
          threeDose,
          allVaccination,
          moreThanThreeDose,
          unknownInformation,
          allDrivers: unknownInformation + noDose + allVaccination,
        });
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setReportsDoseLoading(false);
      }
    }

    async function getOverviewByVaccinePercent(params: any) {
      setLoading(true);
      try {
        const {data} = await transportService.overviewVaccinePercent(params, {
          cancelToken: source.token,
        });
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

            // temporary code
            if (Number(key) === 3 || Number(key) > 3) {
              thirdDose += Number(value);
            }

            // if (Number(key) === 3) {
            //   thirdDose += Number(value);
            // }

            // temporary code
            if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
              moreThanThreeDose += 0;
            }

            // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            //   moreThanThreeDose += Number(value);
            // }

            if (Number(key) !== 0 && key !== 'null') {
              allVaccination += Number(value);
            }

            if (key === 'null') {
              unknownInformation += Number(value);
            }

            total = allVaccination + noDose + unknownInformation;
          }

          normalizedDate.push({
            id: `ovvac_${index}`,
            name: getServiceTypeName(item.serviceType),
            firstDosePercentage: (firstDose * 100) / total,
            secondDosePercentage: (secondDose * 100) / total,
            thirdDosePercentage: (thirdDose * 100) / total,
            otherDose: (moreThanThreeDose * 100) / total,
            unknownInformation: (unknownInformation * 100) / total,
            allDoses: ((firstDose + secondDose + thirdDose + moreThanThreeDose) * 100) / total,
            noDose: (noDose * 100) / total,
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

        setDataset([...normalizedDate]);
        setOrgDataset([...normalizedDate]);
        setFilterType({name: 'کمترین', enName: 'LOWEST'});
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const provinceName = params.get('provinceName') || ('تهران' as any);
      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });

      let idSetTimeOut: any;
      if (existsCity) {
        idSetTimeOut = setTimeout(() => {
          getReportsDose({province: provinceName});
          getOverviewByVaccinePercent({province: provinceName});
          // getLinearOverviewPublicTransport();
        }, 500);
      } else {
        history.push('/dashboard/transport/province');
      }

      return () => {
        if (existsCity) {
          source.cancel('Operation canceled by the user.');
          setDataset([]);
          setReportsDose({});
          clearTimeout(idSetTimeOut);
        }
      };
    }, [location.search]);

    useEffect(() => {
      const tmp = [...orgDataset].sort((a: any, b: any) => {
        // eslint-disable-next-line
        const reverse =
          // eslint-disable-next-line no-nested-ternary
          filterType.enName === 'HIGHEST' ? 1 : filterType.enName === 'LOWEST' ? -1 : 1;

        if (a.allDoses < b.allDoses) {
          return reverse * 1;
        }

        if (a.allDoses > b.allDoses) {
          return reverse * -1;
        }
        // a must be equal to b
        return 0;
      });

      setDataset(tmp);
    }, [filterType]);

    return (
      <fieldset className="text-center border rounded-xl p-4 mb-16" id="province-overview">
        <legend className="text-black mx-auto px-3">
          نگاه کلی واکسیناسیون در حمل و نقل عمومی در &nbsp;
          {cityTitle}
        </legend>

        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={totalDriver}
            text="مجموع رانندگان فعال"
            count={reportsDose.allDrivers}
            loading={reportsDoseLoading}
            hasInfo
            infoText="مجموع رانندگانی که در حمل و نقل عمومی فعالیت دارند"
          />
          <Statistic
            icon={YellowVaccineMd}
            text="تعداد واکسیناسیون دوز اول"
            count={reportsDose.firstDose}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که فقط یک دوز واکسن دریافت کردند"
          />
          <Statistic
            icon={PurppleVaccineMd}
            text="تعداد واکسیناسیون دوز دوم"
            count={reportsDose.secondDose}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که دو دوز واکسن رو دریافت کردند"
          />
          <Statistic
            icon={NavyVaccineMd}
            text="تعداد واکسیناسیون دوز سوم"
            count={reportsDose.threeDose}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که سه دوز واکسن دریافت کرده‌اند"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={reportsDose.moreThanThreeDose}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که بیش از ۳ دوز واکسن دریافت کرده‌اند"
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={reportsDose.allVaccination}
            loading={reportsDoseLoading}
            hasInfo
            infoText="مجموع افرادی که واکسن دریافت کرده‌اند، ( یک دوز ،دو دوز ، سه دور)"
          />
          <Statistic
            icon={GrayVaccine}
            text="تعداد اطلاعات مخدوش"
            count={reportsDose.unknownInformation}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که اطلاعات آن‌ها در سامانه به درستی ثبت نشده است"
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={reportsDose.noDose}
            loading={reportsDoseLoading}
            hasInfo
            infoText="تعداد افرادی که برای دریافت واکسن مراجعه نکرده‌اند"
          />
        </div>

        <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
          <div className="flex items-center">
            <Menu
              as="div"
              className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 "
            >
              <div>
                <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {/* <div className="flex items-center flex-row-reverse xl:flex-row"> */}
                  {/* <img src={avatar} alt="z" className="w-5 h-5" /> */}
                  <span className="ml-10 whitespace-nowrap truncate">
                    {filterType?.name || 'کمترین'}
                  </span>
                  <DownIcon className="h-2 w-2.5 mr-2" />
                </Menu.Button>
              </div>

              <Menu.Items
                style={{width: '250px'}}
                className="z-40 absolute left-0 xl:right-0 max-w-xs mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  {filterTypes.map((value: any, index: any) => {
                    // console.log(value);
                    return (
                      // eslint-disable-next-line
                      <Menu.Item key={index}>
                        {({active}) => (
                          <button
                            type="button"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } text-gray-900 group flex rounded-md items-center whitespace-nowrap truncate w-full px-2 py-2 text-sm`}
                            onClick={() => {
                              setFilterType(value);
                              // setQueryParams({
                              //   ...queryParams,
                              //   tag: value.enName,
                              // });
                            }}
                          >
                            {/* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> */}
                            {value.name}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {loading ? (
          <div className="p-20">
            <Spinner />
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
                      return (
                        <CategoryDonut
                          data={[
                            {
                              name: 'allDoses',
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
                              name: 'noDose',
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
                              name: 'unknownInformation',
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
                      );
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
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'دوز دوم',
                    key: 'secondDosePercentage',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'دوز سوم',
                    key: 'thirdDosePercentage',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'سایر دوزها',
                    key: 'otherDose',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'کل دوز',
                    key: 'allDoses',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'اطلاعات مخدوش',
                    key: 'unknownInformation',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  {
                    name: 'واکسن نزده',
                    key: 'noDose',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                ]}
                totalItems={0}
              />
            </div>
          </>
        )}
      </fieldset>
    );
  };

export default OverviewOfVaccinationInPublicTransportProvince;
