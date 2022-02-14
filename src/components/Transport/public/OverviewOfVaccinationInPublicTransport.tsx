import React, {useEffect, useState} from 'react';
import axios from 'axios';

import transportService from 'src/services/transport.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import GrayVaccine from '../../../assets/images/icons/gray-vaccine-1.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import BlueVaccine from '../../../assets/images/icons/blue-vaccine.svg';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import Spinner from '../../Spinner';
import {getServiceTypeName} from '../../../helpers/utils';

const OverviewOfVaccinationInPublicTransport: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [countsLoading, setCountsLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [counts, setCounts] = useState<any>({
    numberOfDrivers: null,
    numberOfFirstDose: null,
    numberOfSecondDose: null,
    numberOfUnvaccinated: null,
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const [reportsDose, setReportsDose] = useState({}) as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reportsDoseLoading, setReportsDoseLoading] = useState(false) as any;

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await transportService.overviewVaccine(params, {cancelToken: source.token});
      setCounts({
        numberOfDrivers: data.numberOfDrivers || 0,
        numberOfFirstDose: data.numberOfFirstDose || 0,
        numberOfSecondDose: data.numberOfSecondDose || 0,
        numberOfUnvaccinated: data.numberOfUnvaccinated || 0,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setCountsLoading(false);
    }
  }

  async function getReportsDose() {

    setReportsDoseLoading(true);
    try {
      const {data} = await transportService.reportsDose({}, {cancelToken: source.token});

      const normalizedData: any[] = [];
      let threeDose = 0;
      let allVaccination = 0;
      let moreThanThreeDose = 0;
      let unknownInformation = 0;
      data.dosesCount.forEach((item: any) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(item)) {

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
        threeDose,
        allVaccination,
        moreThanThreeDose,
        unknownInformation,
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
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReportsDose();
    getOverviewByVaccine({
      numberOfDrivers: true,
      numberOfFirstDose: true,
      numberOfSecondDose: true,
      numberOfUnvaccinated: true,
    });
    getOverviewByVaccinePercent({});

    return () => {
      setReportsDose({});
      setCounts({
        numberOfDrivers: 0,
        numberOfFirstDose: 0,
        numberOfSecondDose: 0,
        numberOfUnvaccinated: 0,
      });
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی واکسیناسیون در حمل و نقل عمومی</legend>

      <div
        className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
        <Statistic
          icon={totalDriver}
          text="مجموع رانندگان فعال"
          count={counts.numberOfDrivers}
          loading={countsLoading}
          hasInfo
          infoText="مجموع رانندگانی که در حمل و نقل عمومی فعالیت دارند"
        />
        <Statistic
          icon={YellowVaccineMd}
          text="تعداد واکسیناسیون دوز اول"
          count={counts.numberOfFirstDose}
          loading={countsLoading}
          hasInfo
          infoText="تعداد افرادی که فقط یک دوز واکسن دریافت کردند"
        />
        <Statistic
          icon={PurppleVaccineMd}
          text="تعداد واکسیناسیون دوز دوم"
          count={counts.numberOfSecondDose}
          loading={countsLoading}
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
      <div
        className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
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
          count={counts.numberOfUnvaccinated}
          loading={countsLoading}
          hasInfo
          infoText="تعداد افرادی که برای دریافت واکسن مراجعه نکرده‌اند"
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
                    return (
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

export default OverviewOfVaccinationInPublicTransport;
