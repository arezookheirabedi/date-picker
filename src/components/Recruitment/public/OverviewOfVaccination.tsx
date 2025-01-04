import React, {useState} from 'react';
import Statistic from '../../../containers/Guild/components/Statistic';
import totalEmployee from '../../../assets/images/icons/people-dark-green.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import Table from '../../TableScopeSort';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import OrangeVaccine from '../../../assets/images/icons/orange-vaccine.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import DarkgreenVaccine from '../../../assets/images/icons/darkgreen-vaccine.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import useGetNumberOf from '../../../hooks/apis/useGetNumberOf';
import useGetOverviewOfVaccinationTable from '../../../hooks/apis/useGetOverviewOfVaccinationTable';
import LocalTableSearch from '../../LocalTableSearch';
import SingleDatepickerQuery from '../../SingleDatepickerQuery';
import RetryButton from "../../RetryButton";
import Spinner from "../../Spinner";

const OverviewOfVaccination: React.FC<{}> = () => {
  const [query, setQuery] = useState({
    tag: 'employee',
    category: 'heName',
    from: null,
    to: null,
    retry: false
  });

  const {
    data: numberOf,
    loading,
    // eslint-disable-next-line
    error,
  } = useGetNumberOf({
    tag: 'employee',
    category: 'heName',
  });
  // eslint-disable-next-line
 

  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">نگاه کلی به واکسیناسیون کارکنان دولت</legend>

      <div className="mb-8 mt-12 flex flex-col justify-between space-y-8">
        <div
          className="flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={totalEmployee}
            text="مجموع کارکنان دولت"
            count={numberOf.totalPopulation}
           
            hasInfo
            infoText="مجموع رانندگانی که در حمل ‌و نقل عمومی فعالیت دارند."
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.gtDoses[0] || 0}
           
            hasInfo
            infoText="تعداد کل دوز های تزریق شده در حمل‌ونقل عمومی"
          />
          <Statistic
            icon={YellowVaccineMd}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
           
            hasInfo
            infoText="تعداد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
           
            hasInfo
            infoText="تعداد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          />
        </div>
        <div
          className="border-slate-400 mb-8 mt-12 flex flex-col justify-between space-y-5 space-x-0 border-b-2 pb-8 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={PurppleVaccineMd}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[3] || 0}
           
            hasInfo
            infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.doses[4] || 0}
           
            hasInfo
            infoText="تعداد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={NavyVaccineMd}
            text="تعداد واکسیناسیون دوز پنجم و بیشتر"
            count={numberOf.gtDoses[4] || 0}
           
            hasInfo
            infoText="تعداد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCount || 0}
           
            hasInfo
            infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        <div
          className="mb-8 mt-12 flex flex-col justify-between space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون کل کشور"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
           
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={YellowVaccineMd}
            text="درصد واکسیناسیون دوز اول"
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
           
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={OrangeVaccine}
            text="درصد واکسیناسیون دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2]}
           
            hasInfo
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={PurppleVaccineMd}
            text="درصد واکسیناسیون دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
           
            hasInfo
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            isPercentage
          />
        </div>
        <div
          className="mb-8 mt-12 flex flex-col justify-start space-y-5 space-x-0 rtl:space-x-reverse md:flex-row md:space-y-0 md:space-x-5">
          <div className="w-1/4">
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد واکسیناسیون دوز چهارم"
              count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
             
              hasInfo
              infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
              isPercentage
            />
          </div>
          <div className="w-1/4">
            <Statistic
              icon={NavyVaccineMd}
              text="درصد واکسیناسیون دوز پنجم"
              count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
             
              hasInfo
              infoText="درصد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
              isPercentage
            />
          </div>

          <div className="w-1/4">
            <Statistic
              icon={GrayVaccine2}
              text="درصد واکسیناسیون انجام نشده"
              count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
             
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              isPercentage
            />
          </div>
        </div>
      </div>

      <div className="align-center mb-8 flex justify-between space-x-5 rtl:space-x-reverse">
        <div className="align-center flex justify-between">
          <SingleDatepickerQuery query={query} setQuery={setQuery}/>
        </div>
        <div className="align-center flex">
          <div className="align-center relative inline-flex leading-3">
            <LocalTableSearch orgDataset={[]} setData={[]} query={query}/>
          </div>
        </div>
      </div>

      
      
        <>
          <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
            <Table
              loading={false}
              dataSet={[]}
              pagination={{pageSize: 10, maxPages: 3}}
              columns={[
                {
                  name: 'وضعیت کلی',
                  key: '',
                  render: (v: any, record) => (
                    <CategoryDonut
                      data={[
                        {
                          name: 'allDosesPercentage',
                          title: 'دوز کل',
                          y: record.allDosesPercentage || 0,
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
                  name: 'تعداد کارکنان',
                  key: 'employeesCount',
                  render: () => <span>-</span>,
                },
                {
                  name: 'دوز اول',
                  key: 'firstDosePercentage',
                  sortable: true,
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز دوم',
                  key: 'secondDosePercentage',
                  sortable: true,
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'دوز سوم',
                  key: 'thirdDosePercentage',
                  sortable: true,
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'سایر دوزها',
                  key: 'otherDose',
                  sortable: true,
                  render: (v: any) => <span>{Number(v).toLocaleString('fa')}%</span>,
                },
                {
                  name: 'واکسن نزده',
                  key: 'noDose',
                  sortable: true,
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
                  sortable: true,
                  render: (v: any) => <span>{Number(v).commaSeprator().toPersianDigits()}</span>,
                },
              ]}
              totalItems={10}
            />
          </div>
        </>
    </fieldset>
  );
};

export default OverviewOfVaccination;
