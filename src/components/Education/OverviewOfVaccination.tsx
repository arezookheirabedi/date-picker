import React, {useEffect, useState} from 'react';
import transportService from 'src/services/transport.service';
import Statistic from '../../containers/Guild/components/Statistic';
import totalEmploye from '../../assets/images/icons/people-dark-green.svg';
import YellowVaccine from '../../assets/images/icons/yellow-vaccine.svg';
import GreenVaccine from '../../assets/images/icons/green-vaccine.svg';
import GrayVaccine from '../../assets/images/icons/gray-vaccine.svg';
import Table from '../Table';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import Spinner from '../Spinner';

const getServiceTypeName = (item: any) => {
  switch (item) {
    case 'PUBLIC':
      return 'تاکسی پلاک ع';
    case 'TAXI_T':
      return 'تاکسی پلاک ت';
    case 'ONLINE':
      return 'تاکسی آنلاین';
    default:
      return null;
  }
};

const OverviewOfVaccination: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [countsLoading, setCountsLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [counts, setCounts] = useState<any>({
    numberOfDrivers: 0,
    numberOfFirstDose: 0,
    numberOfSecondDose: 0,
    numberOfUnvaccinated: 0,
  });

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await transportService.overviewVaccine(params);
      setCounts({
        numberOfDrivers: data.numberOfDrivers || 0,
        numberOfFirstDose: data.numberOfFirstDose || 0,
        numberOfSecondDose: data.numberOfSecondDose || 0,
        numberOfUnvaccinated: data.numberOfUnvaccinated || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCountsLoading(false);
    }
  }

  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await transportService.overviewVaccinePercent(params);
      const normalizedDate: any[] = [];
      data.forEach((item: any, index: number) => {
        let total = 0;
        let twoDoseVaccine = 0;
        let fullDoseVaccine = 0;

        if (item.doseCountMap) {
          // eslint-disable-next-line
          for (const [key, value] of Object.entries(item.doseCountMap)) {
            total += Number(value);

            if (Number(key) !== 0) {
              fullDoseVaccine += Number(value);
            }

            if (Number(key) === 2) {
              twoDoseVaccine += Number(value);
            }
          }
        }

        if (total !== 0) {
          normalizedDate.push({
            id: `ovvac_${index}`,
            name: getServiceTypeName(item.serviceType),
            twoDoseVaccine: twoDoseVaccine ? (twoDoseVaccine * 100) / total : 0,
            fullDoseVaccine: fullDoseVaccine ? (fullDoseVaccine * 100) / total : 0,
            // eslint-disable-next-line
            notVaccine: item.doseCountMap
              ? item.doseCountMap[0]
                ? (item.doseCountMap[0] * 100) / total
                : 0
              : 0,
          });
        }
      });
      setDataset([...normalizedDate]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOverviewByVaccine({
      numberOfDrivers: true,
      numberOfFirstDose: true,
      numberOfSecondDose: true,
      numberOfUnvaccinated: true,
    });
    getOverviewByVaccinePercent({});
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به واکسیناسیون کارکنان دولت</legend>

      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmploye}
            text="مجموع کارکنان دولت"
            count={counts.numberOfDrivers || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={counts.numberOfSecondDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GrayVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmploye}
            text="بیش از ۳ دوز"
            count={counts.numberOfDrivers || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={counts.numberOfSecondDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GrayVaccine}
            text="تعداد اطلاعات مخدوش"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون انجام نشده"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
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
                  render: (v: any, record) => (
                    <CategoryDonut
                      data={[
                        {
                          name: 'fullDoseVaccine',
                          title: 'دوز کل',
                          y: record.fullDoseVaccine || 0,
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
                          y: record.notVaccine || 0,
                          color: {
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            stops: [
                              [0, '#FE2D2F'], // start
                              [1, '#CC0002'], // end
                            ],
                          },
                        },
                      ]}
                    />
                  ),
                  className: 'flex justify-center w-full',
                },
                {
                  name: 'سازمان',
                  key: 'name',
                  render: (v: any, record, index: number) => (
                    <span>
                      {(index + 1).toLocaleString('fa')}.{v}
                    </span>
                  ),
                },
                {
                  name: 'دوز اول',
                  key: 'twoDoseVaccine',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز دوم',
                  key: 'twoDoseVaccine',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز سوم',
                  key: 'twoDoseVaccine',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'fullDoseVaccine',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'واکسن نزده',
                  key: 'notVaccine',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'اطلاعات مخدوش',
                  key: 'notVaccine',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
                {
                  name: 'کل دوزها',
                  key: 'notVaccine',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
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

export default OverviewOfVaccination;
