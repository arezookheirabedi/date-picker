import React, {useEffect, useState} from 'react';
import hcsServices from 'src/services/hcs.service';
import Statistic from '../../containers/Guild/components/Statistic';
import totalEmploye from '../../assets/images/icons/people-dark-green.svg';
import YellowVaccine from '../../assets/images/icons/yellow-vaccine-lg.svg';
import GreenVaccine from '../../assets/images/icons/green-vaccine-lg.svg';
import Gray1Vaccine from '../../assets/images/icons/gray-vaccine-1.svg';
import Gray2Vaccine from '../../assets/images/icons/gray-vaccine-2.svg';
import PurppleVaccine from '../../assets/images/icons/purpple-vaccine-lg.svg';
import BlueVaccine from '../../assets/images/icons/blue-vaccine.svg';
import NavyVaccine from '../../assets/images/icons/navy-vaccine-lg.svg';
import Table from '../TableScope';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import Spinner from '../Spinner';

const OverviewOfVaccination: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [countsLoading, setCountsLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [counts, setCounts] = useState<any>({
    numberOfDrivers: null,
    numberOfFirstDose: null,
    numberOfSecondDose: null,
    numberOfThirdDose: null,
    numberOfMoreThirdDose: null,
    numberOfUnvaccinated: null,
  });

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await hcsServices.doses(params);
      let total = 0;
      let tmp = {...counts};

      data.forEach((item: any) => {
        const v: any = Object.entries(item);
        const [key, value] = v[0];

        switch (key) {
          case '1':
            tmp = {...tmp, numberOfFirstDose: value || 0};
            total += value || 0;
            break;
          case '2':
            tmp = {...tmp, numberOfSecondDose: value || 0};
            total += value || 0;
            break;
          case '3':
            tmp = {...tmp, numberOfThirdDose: value || 0};
            total += value || 0;
            break;
          case '5':
            tmp = {...tmp, numberOfMoreThirdDose: value || 0};
            total += value || 0;
            break;
          case 'null':
            tmp = {...tmp, numberOfUnvaccinated: value || 0};
            total += value || 0;
            break;
          default:
            tmp = {...tmp, numberOfNull: value || 0};
            total += value || 0;
            break;
        }

        setCounts({
          ...counts,
          ...tmp,
          total,
        });
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setCountsLoading(false);
    }
  }

  async function getOverviewByVaccinePercent(params: any) {
    setLoading(true);
    try {
      const {data} = await hcsServices.dosesTagBased(params);
      const normalizedData: any[] = [];

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
        for (const [key, value] of Object.entries(item.dosesCountMap)) {
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
        
        // if (total > 0)
        normalizedData.push({
          id: `ovvac_${index}`,
          name: item.tag || 'نامشخص',
          firstDosePercentage: (firstDose * 100) / total,
          secondDosePercentage: (secondDose * 100) / total,
          thirdDosePercentage: (thirdDose * 100) / total,
          otherDose: (moreThanThreeDose * 100) / total,
          allDoses: firstDose + secondDose + thirdDose + moreThanThreeDose,
          unknownInformation,
          noDose: (noDose * 100) / total,
          // eslint-disable-next-line
          // notVaccine: item.dosesCountMap
          //   ? item.dosesCountMap[0]
          //     ? (item.dosesCountMap[0] * 100) / total
          //     : 0
          //   : 0,
        });
      });
      setDataset([...normalizedData]);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOverviewByVaccine({
      organization: 'employment',
      numberOfDrivers: true,
      numberOfFirstDose: true,
      numberOfSecondDose: true,
      numberOfUnvaccinated: true,
    });
    getOverviewByVaccinePercent({organization: 'employment'});
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به واکسیناسیون کارکنان دولت</legend>

      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmploye}
            text="مجموع کارکنان دولت"
            count={counts.total || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={PurppleVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={counts.numberOfSecondDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={NavyVaccine}
            text="تعداد واکسیناسیون دوز سوم"
            count={counts.numberOfThirdDose || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={counts.numberOfMoreThirdDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={
              (counts.numberOfSecondDose || 0) +
              (counts.numberOfMoreThirdDose || 0) +
              (counts.numberOfThirdDose || 0)
            }
            loading={countsLoading}
          />
          <Statistic
            icon={Gray1Vaccine}
            text="تعداد اطلاعات مخدوش"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={Gray2Vaccine}
            text="تعداد واکسیناسیون انجام نشده"
            count={
              counts.total -
                ((counts.numberOfFirstDose || 0) +
                  (counts.numberOfSecondDose || 0) +
                  (counts.numberOfMoreThirdDose || 0) +
                  (counts.numberOfThirdDose || 0)) || 0
            }
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
              pagination={{pageSize: 10, maxPages: 3}}
              columns={[
                {
                  name: 'وضعیت کلی',
                  key: '',
                  render: (v: any, record) => (
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
                      ]}
                    />
                  ),
                  className: 'flex justify-center w-full',
                },
                {
                  name: 'سازمان',
                  key: 'name',
                  render: (v: any, record, index: number, page: number) => (
                    <div className="flex">
                      {((page - 1) * 10 + (index + 1)).toLocaleString('fa')}.{v}
                    </div>
                  ),
                },
                {
                  name: 'دوز اول',
                  key: 'firstDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز دوم',
                  key: 'secondDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز سوم',
                  key: 'thirdDosePercentage',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'واکسن نزده',
                  key: 'noDose',
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'اطلاعات مخدوش',
                  key: 'unknownInformation',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
                {
                  name: 'کل دوزها',
                  key: 'allDoses',
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
              ]}
              totalItems={dataset.length || 0}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewOfVaccination;
