import React, {useState} from 'react';
import useGetNumberOf from "../../../hooks/apis/useGetNumberOf";
import useGetOverviewOfVaccinationTable from "../../../hooks/apis/useGetOverviewOfVaccinationTable";
import Statistic from '../../../containers/Guild/components/Statistic';
import totalDriver from '../../../assets/images/icons/transport-color.svg';
import GreenVaccine from '../../../assets/images/icons/green-vaccine-lg.svg';
import Table from '../../Table';
import CategoryDonut from '../../../containers/Guild/components/CategoryDonut';
// import transportService from '../../../services/transport.service';
import YellowVaccineMd from '../../../assets/images/icons/yellow-vaccine-lg.svg';
import PurppleVaccineMd from '../../../assets/images/icons/purpple-vaccine-lg.svg';
import NavyVaccineMd from '../../../assets/images/icons/navy-vaccine-lg.svg';
import GrayVaccine2 from '../../../assets/images/icons/gray-vaccine-2.svg';
import Spinner from '../../Spinner';
import OrangeVaccine from "../../../assets/images/icons/orange-vaccine.svg";
import DarkgreenVaccine from "../../../assets/images/icons/darkgreen-vaccine.svg";
import SingleDatepickerQuery from "../../SingleDatepickerQuery";

interface OverviewOfVaccinationInPublicTransportProvinceProps {
  cityTitle: any;
}

const OverviewOfVaccinationInPublicTransportProvince: React.FC<OverviewOfVaccinationInPublicTransportProvinceProps> =
  ({cityTitle}) => {
    const [query, setQuery] = useState({
      tag: 'transport',
      category: 'serviceType',
      from: null,
      to: null
    })
    // eslint-disable-next-line
    const {data: numberOf, loading, error} = useGetNumberOf({tag: 'transport'}, true);
    // eslint-disable-next-line
    const {data: dataset, loading: datasetLoading, error: errorMessage} = useGetOverviewOfVaccinationTable(query, true)

    return (
      <fieldset className="text-center border rounded-xl p-4 mb-16" id="province-overview">
        <legend className="text-black mx-auto px-3">
          نگاه کلی واکسیناسیون در حمل و نقل عمومی در استان &nbsp;
          {cityTitle}
        </legend>

        <div
          className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse mb-8 mt-12">
          <Statistic
            icon={totalDriver}
            text="مجموع رانندگان فعال"
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
            infoText="تعداد کل دوز های تزریق شده در حمل‌ونقل "
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
            text="درصد واکسیناسیون کل کشور"
            count={numberOf.totalVaccinesCountToTotalPopulationPercentage || 0}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که حداقل یک دوز واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={YellowVaccineMd}
            text="درصد واکسیناسیون دوز اول"
            count={numberOf.dosesToTotalPopulationPercentage[1] || 0}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که دوز اول واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={OrangeVaccine}
            text="درصد واکسیناسیون دوز دوم"
            count={numberOf.dosesToTotalPopulationPercentage[2]}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که دوز دوم واکسن را دریافت کرده‌اند."
          />
          <Statistic
            icon={PurppleVaccineMd}
            text="درصد واکسیناسیون دوز سوم"
            count={numberOf.dosesToTotalPopulationPercentage[3] || 0}
            loading={loading}
            isPercentage
            hasInfo
            infoText="درصد افرادی که دوز سوم واکسن را دریافت کرده‌اند."
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
              isPercentage
              hasInfo
              infoText="درصد افرادی که دوز چهارم  واکسن را دریافت کرده‌اند."
            />
          </div>
          <div className="w-1/4">
            <Statistic
              icon={NavyVaccineMd}
              text="درصد واکسیناسیون دوز پنجم"
              count={numberOf.dosesToTotalPopulationPercentage[5] || 0}
              loading={loading}
              isPercentage
              hasInfo
              infoText="درصد افرادی که دوز پنجم واکسن را دریافت کرده‌اند."
            />
          </div>

          <div className="w-1/4">
            <Statistic
              icon={GrayVaccine2}
              text="درصد واکسیناسیون انجام نشده"
              count={numberOf.totalNonVaccinesCountToTotalPopulationPercentage || 0}
              loading={loading}
              isPercentage
              hasInfo
              infoText="درصد افرادی که در طرح واکسیناسیون شرکت نکرده‌اند."
            />
          </div>
        </div>

        <div className="flex align-center justify-start space-x-5 rtl:space-x-reverse mb-8">
          <div className="flex align-center justify-between">
            <SingleDatepickerQuery query={query} setQuery={setQuery}/>
          </div>
        </div>

        {datasetLoading ? (
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
                            // {
                            //   name: 'unknownInformation',
                            //   title: 'اطلاعات مخدوش',
                            //   y: record.unknownInformation || 0,
                            //   color: {
                            //     linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                            //     stops: [
                            //       [0, '#eee'], // start
                            //       [1, '#a8a8a8'], // end
                            //     ],
                            //   },
                            // },
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
                    name: 'کل دوزها',
                    key: 'allDoses',
                    render: (v: any) => (
                      <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                    ),
                  },
                  // {
                  //   name: 'اطلاعات مخدوش',
                  //   key: 'unknownInformation',
                  //   render: (v: any) => (
                  //     <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                  //   ),
                  // },
                  // {
                  //   name: 'واکسن نزده',
                  //   key: 'noDose',
                  //   render: (v: any) => (
                  //     <span>{v ? `${Number(v).toLocaleString('fa')}%` : '۰%'}</span>
                  //   ),
                  // },
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
