import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {schoolTypes} from 'src/helpers/sortingModels';

import hcsService from 'src/services/hcs.service';
import {useSelector} from 'src/hooks/useTypedSelector';
import Statistic from '../../containers/Guild/components/Statistic';
// import totalEmploye1 from '../../assets/images/icons/people-dark-green.svg';
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

const OverviewOfVaccination: React.FC<{}> = () => {
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
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const {total: totalMembers, employe: totalEmploye} = useSelector(state => state.studentMembers);

  async function getOverviewByVaccine(params: any) {
    setCountsLoading(true);
    try {
      const {data} = await hcsService.doses(params, {cancelToken: source.token});
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

          if (Number(key) === 3 || Number(key) > 3) {
            tmp = {...tmp, numberOfThirdDose: tmp.numberOfThirdDose + Number(value)};
          }

          // if (Number(key) === 3) {
          //   tmp = {...tmp, numberOfThirdDose: Number(value)};
          // }

          // temporary code
          if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
            tmp = {...tmp, numberOfMoreThreeDose: 0};
          }

          // if (Number(key) !== 0 && key !== 'null' && Number(key) > 3) {
          //   tmp = {...tmp, numberOfMoreThreeDose: tmp.numberOfMoreThreeDose + Number(value)};
          // }

          if (Number(key) !== 0 && key !== 'null') {
            tmp = {...tmp, numberOfAllDose: tmp.numberOfAllDose + Number(value)};
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
      const {data} = await hcsService.dosesTagBased(params, {cancelToken: source.token});
      const sortData: any = [];

      schoolTypes.forEach(item => {
        const tm = data.find((i: any) => i.tag === item);
        if (tm) sortData.push(tm);
      });

      const normalizedData: any[] = [];

      sortData.forEach((item: any, index: number) => {
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
      organization: 'education',
    });
    getOverviewByVaccinePercent({
      organization: 'education',
      tags: '^(((?=.*#grade#)(^(?!.*(_)).*$))|((?=.*#type#)(^(?!.*(_)).*$))).*$',
    });

    return () => {
      setCounts({});
      setDataset([]);
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی واکسیناسیون در آموزش و پرورش</legend>

      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          {/* <Statistic
            icon={totalEmploye1}
            text="مجموع کارمندان آموزشی"
            count={counts.numberOfTeachers || 0}
            loading={countsLoading}
          /> */}
          <Statistic
            icon={totalEmploye2}
            text="مجموع کارمندان اداری"
            count={totalEmploye || 0}
            // count={counts.numberOfEmployees || 0}
            loading={countsLoading}
          />
          <Statistic
            icon={totalStudent}
            text="مجموع دانش آموزان"
            count={totalMembers || 0}
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
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={counts.numberOfAllDose || 0}
            loading={countsLoading}
          />
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
          {/* <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
          {/* <fieldset className="flex flex-col align-center justify-center w-full rounded-xl p-4 relative" /> */}
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
