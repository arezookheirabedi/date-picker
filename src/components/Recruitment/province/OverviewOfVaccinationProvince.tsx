import React, {useState} from 'react';

import Statistic from '../../../containers/Guild/components/Statistic';
import totalEmployee from '../../../assets/images/icons/people-dark-green.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import Table from '../../TableScopeSort';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
import YellowVaccineMd from "../../../assets/images/icons/yellow-vaccine-lg.svg";
import OrangeVaccine from "../../../assets/images/icons/orange-vaccine.svg";
import PurppleVaccineMd from "../../../assets/images/icons/purpple-vaccine-lg.svg";
import DarkgreenVaccine from "../../../assets/images/icons/darkgreen-vaccine.svg";
import NavyVaccineMd from "../../../assets/images/icons/navy-vaccine-lg.svg";
import GrayVaccine2 from "../../../assets/images/icons/gray-vaccine-2.svg";
import useGetNumberOf from "../../../hooks/apis/useGetNumberOf";
import useGetOverviewOfVaccinationTable from "../../../hooks/apis/useGetOverviewOfVaccinationTable";
import SingleDatepickerQuery from "../../SingleDatepickerQuery";
import LocalTableSearch from "../../LocalTableSearch";


interface OverviewOfVaccinationProvinceProps {
  cityTitle: any
}

const OverviewOfVaccinationProvince: React.FC<OverviewOfVaccinationProvinceProps> = ({cityTitle}) => {

  const [query, setQuery] = useState({
    tag: 'employee',
    category: 'heName',
    from: null,
    to: null,
  });

  const {
    data: numberOf,
    loading,
    // eslint-disable-next-line
    error,
  } = useGetNumberOf({
    tag: 'employee',
    category: 'heName',
  },true);
  // eslint-disable-next-line
  const {
    data: dataset,
    loading: datasetLoading,
    // eslint-disable-next-line
    error: errorMessage,
    orgDataset,
    setData,
  } = useGetOverviewOfVaccinationTable(query,true);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به واکسیناسیون کارکنان دولت در استان &nbsp;
        {cityTitle}
      </legend>

      <div className="flex flex-col justify-between space-y-8 mb-8 mt-12">
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={totalEmployee}
            text="مجموع کارکنان دولت"
            count={numberOf.totalPopulation}
            loading={loading}
            hasInfo
            infoText="مجموع رانندگانی که در حمل ‌و نقل عمومی فعالیت دارند."
          />
          <Statistic
            icon={GreenVaccine}
            text="تعداد واکسیناسیون کل دوز"
            count={numberOf.totalVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="تعداد کل دوز های تزریق شده در حمل‌ونقل عمومی"
          />
          <Statistic
            icon={YellowVaccineMd}
            text="تعداد واکسیناسیون دوز اول"
            count={numberOf.doses[1] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={OrangeVaccine}
            text="تعداد واکسیناسیون دوز دوم"
            count={numberOf.doses[2] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12 border-b-2 border-slate-400 pb-8">
          <Statistic
            icon={PurppleVaccineMd}
            text="تعداد واکسیناسیون دوز سوم"
            count={numberOf.doses[3] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={DarkgreenVaccine}
            text="تعداد واکسیناسیون دوز چهارم"
            count={numberOf.doses[4] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={NavyVaccineMd}
            text="تعداد واکسیناسیون دوز پنجم"
            count={numberOf.doses[5] || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={GrayVaccine2}
            text="تعداد واکسیناسیون انجام نشده"
            count={numberOf.totalNonVaccinesCount || 0}
            loading={loading}
            hasInfo
            infoText="تعداد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
          />
        </div>
        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={GreenVaccine}
            text="درصد واکسیناسیون"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={YellowVaccineMd}
            text="درصد واکسیناسیون دوز اول"
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={OrangeVaccine}
            text="درصد واکسیناسیون دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2]}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
            isPercentage
          />
          <Statistic
            icon={PurppleVaccineMd}
            text="درصد واکسیناسیون دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
            hasInfo
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
            isPercentage
          />

        </div>
        <div
          className="flex flex-col md:flex-row justify-start space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <div className="w-1/4">
            <Statistic
              icon={DarkgreenVaccine}
              text="درصد واکسیناسیون دوز چهارم"
              count={numberOf.dosesToTotalPopulationPercentage[4] || 0}
              loading={loading}
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
              loading={loading}
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
              loading={loading}
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
              isPercentage
            />
          </div>
        </div>
      </div>

      <div className="flex align-center justify-between space-x-5 rtl:space-x-reverse mb-8">
        <div className="flex align-center justify-between">
          <SingleDatepickerQuery query={query} setQuery={setQuery} />
        </div>
        <div className="flex align-center">
          <div className="align-center relative inline-flex leading-3">
            <LocalTableSearch orgDataset={orgDataset} setData={setData} query={query} />
          </div>
        </div>
      </div>

      <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
        <Table
          loading={datasetLoading}
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
          totalItems={dataset.length || 0}
        />
      </div>
    </fieldset>
  );
};

export default OverviewOfVaccinationProvince;
