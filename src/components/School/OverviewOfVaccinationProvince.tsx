import React, {useEffect, useState} from 'react';
import hcsService from 'src/services/hcs.service';
import {useHistory, useLocation} from 'react-router-dom';
import {sideCities} from 'src/helpers/utils';
import Statistic from '../../containers/Guild/components/Statistic';
import totalEmploye1 from '../../assets/images/icons/people-dark-green.svg';
import totalEmploye2 from '../../assets/images/icons/people-navy.svg';
import totalStudent from '../../assets/images/icons/graduation.svg';
import YellowVaccine from '../../assets/images/icons/yellow-vaccine-lg.svg';
import GreenVaccine from '../../assets/images/icons/green-vaccine-lg.svg';
import BlueVaccine from '../../assets/images/icons/blue-vaccine.svg';
import PurppleVaccine from '../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccine from '../../assets/images/icons/navy-vaccine-lg.svg';
import GrayVaccine1 from '../../assets/images/icons/gray-vaccine-lg.svg';
import GrayVaccine2 from '../../assets/images/icons/gray-vaccine-2.svg';
import Table from '../TableScope';
import CategoryDonut from '../../containers/Guild/components/CategoryDonut';
import Spinner from '../Spinner';

interface OverviewOfVaccinationProvinceProps {
  cityTitle: any;
}

const OverviewOfVaccinationProvince: React.FC<OverviewOfVaccinationProvinceProps> = ({
  cityTitle,
}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [countsLoading, setCountsLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [counts, setCounts] = useState<any>({
    numberOfEmployees: 0,
    numberOfStudents: 0,
    numberOfTeachers: 0,
    numberOfFirstDose: 0,
    numberOfSecondDose: 0,
    numberOfThirdDose: 0,
    numberOfMoreThreeDose: 0,
    numberOfAllDose: 0,
    numberOfUnknownDose: 0,
    numberOfUnvaccinated: 0,
  });

  const location = useLocation();
  const history = useHistory();

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await hcsService.doses(params);
      let tmp = {...counts};

      // eslint-disable-next-line no-plusplus
      for (let j: number = 0; j < data.length; j++) {
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(data[j])) {
          if (Number(key) === 0) {
            tmp = {...tmp, numberOfUnvaccinated: Number(value)};
          }

          if (Number(key) === 1) {
            tmp = {...tmp, numberOfFirstDose: Number(value)};
          }

          if (Number(key) === 2) {
            tmp = {...tmp, numberOfSecondDose: Number(value)};
          }

          if (Number(key) === 3) {
            tmp = {...tmp, numberOfThirdDose: Number(value)};
          }

          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            tmp = {...tmp, numberOfMoreThreeDose: Number(value)};
          }

          if (Number(key) !== 0 && key !== 'null') {
            tmp = {...tmp, numberOfAllDose: Number(value)};
          }

          if (key === 'null') {
            tmp = {...tmp, numberOfUnknownDose: Number(value)};
          }
        }
      }

      setCounts({...tmp});
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
      const {data} = await hcsService.dosesTagBased(params);

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

        if (item.dosesCountMap) {
          // eslint-disable-next-line
          for (let i = 0; i < item.dosesCountMap.length; i++) {
            // eslint-disable-next-line
            for (const [key, value] of Object.entries(item.dosesCountMap[i])) {
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
          }
        }

        normalizedDate.push({
          id: `ovvac_${index}`,
          name: item.tag || 'نامشخص',
          total: total || 0,
          firstDose: firstDose || 0,
          secondDose: secondDose || 0,
          thirdDose: thirdDose || 0,
          otherDose: moreThanThreeDose || 0,
          unknownInformation: unknownInformation || 0,
          allDoses: firstDose + secondDose + thirdDose + moreThanThreeDose || 0,
          noDose: (noDose * 100) / total || 0,
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
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);

    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getOverviewByVaccine({
        organization: 'education',
        tags: `#province# استان ${provinceName}`,
      });
      getOverviewByVaccinePercent({
        organization: 'education',
        tags: `^(((?=.*#grade#)(?=.*استان ${provinceName})((^[^_]*_[^_]*$)))|((?=.*#type#)(?=.*استان ${provinceName})((^[^_]*_[^_]*$)))).*$`,
      });
    } else {
      history.push('/dashboard/school/province');
    }
  }, [location.search]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی واکسیناسیون در آموزش و پرورش در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmploye1}
            text="مجموع کارمندان آموزشی"
            count={counts.numberOfTeachers || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={totalEmploye2}
            text="مجموع کارمندان اداری"
            count={counts.numberOfEmployees || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={counts.numberOfStudents || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={YellowVaccine}
            text="تعداد واکسیناسیون دوز اول"
            count={counts.numberOfFirstDose || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
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
          <Statistic
            icon={BlueVaccine}
            text="بیش از ۳ دوز"
            count={counts.numberOfMoreThreeDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={counts.numberOfAllDose || 0}
            loading={countsLoading}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GrayVaccine1}
            text="تعداد اطلاعات مخدوش"
            count={counts.numberOfUnknownDose || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={counts.numberOfUnvaccinated || 0}
            loading={countsLoading}
          />
          <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
          <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" />
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
                          name: 'unknownInformation',
                          title: 'مخدوش',
                          y: record.unknownInformation || 0,
                          color: {
                            linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            stops: [
                              [0, '#6E6E6E'], // start
                              [1, '#393939'], // end
                            ],
                          },
                        },
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
                  name: 'دسته',
                  key: 'name',
                  render: (v: any, record, index: number, page: number) => (
                    <div className="flex">
                      {((page - 1) * 20 + (index + 1)).toPersianDigits()}.{v}
                    </div>
                  ),
                },
                {
                  name: 'دوز اول',
                  key: 'firstDose',
                  render: (v: any, record) => (
                    <span>
                      {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                        .toFixed(4)
                        .toPersianDigits()}
                      %
                    </span>
                  ),
                },
                {
                  name: 'دوز دوم',
                  key: 'secondDose',
                  render: (v: any, record) => (
                    <span>
                      {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                        .toFixed(4)
                        .toPersianDigits()}
                      %
                    </span>
                  ),
                },
                {
                  name: 'دوز سوم',
                  key: 'thirdDose',
                  render: (v: any, record) => (
                    <span>
                      {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                        .toFixed(4)
                        .toPersianDigits()}
                      %
                    </span>
                  ),
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  render: (v: any, record) => (
                    <span>
                      {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                        .toFixed(4)
                        .toPersianDigits()}
                      %
                    </span>
                  ),
                },
                {
                  name: 'واکسن نزده',
                  key: 'noDose',
                  render: (v: any, record) => (
                    <span>
                      {((Number(v || 0) * 100) / Number(record.total || 0) || 0)
                        .toFixed(4)
                        .toPersianDigits()}
                      %
                    </span>
                  ),
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
              totalItems={(dataset || []).length || 0}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default OverviewOfVaccinationProvince;
