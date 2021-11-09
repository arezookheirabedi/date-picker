import Charts from "../../components/Charts";
import Table from "../../components/Table";
import CategoryDonut from "../Guild/components/CategoryDonut";
import Statistic from "../Guild/components/Statistic";
import totalDriver from "../../assets/images/icons/transport-color.svg";

import sufferingIcon from "../../assets/images/icons/suffering-color.svg";
import saveIcon from "../../assets/images/icons/save-color.svg";
import deadIcon from "../../assets/images/icons/dead-color.svg";
import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import scanIcon from "../../assets/images/icons/scan-color.svg";
import scanDangerIcon from "../../assets/images/icons/scan-danger-color.svg";
import testIcon from "../../assets/images/icons/test-color.svg";


const Transport = () => {
  const {Column, Gauge , Map} = Charts;
  return (
    <div className="space-y-16 mb-8">
      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت سرویس‌ها</legend>

        {/* <div>head</div> */}
        <div className="md:flex  justify-between space-y-5 lg:space-y-0">
          <div className="w-full lg:w-7/12">
            <Column/>
          </div>
          <div className="w-full lg:w-5/12">
            <Gauge/>
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به وضعیت سرویس‌ها
        </legend>
        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          <Table
            dataSet={[
              {
                id: '617d54a39d4b1f0efd2d5904',
                name: 'اسنپ',
                employeesCount: 60,
                infectedCount: 2253,
                saveCount: 2279,
                deadCount: 91,
                infectedPercent: 24,
              },
              {
                id: '617d54a3e34765550c16dce3',
                name: 'تپسی',
                employeesCount: 840,
                infectedCount: 605,
                saveCount: 2930,
                deadCount: 1294,
                infectedPercent: 93,
              },
              {
                id: '617d54a341381bf85e5b6eca',
                name: 'سرویس مدارس',
                employeesCount: 3565,
                infectedCount: 3727,
                saveCount: 3089,
                deadCount: 741,
                infectedPercent: 92,
              },
              {
                id: '617d54a3b02e2e7d71ca9d12',
                name: 'تاکسی فرودگاهی',
                employeesCount: 1998,
                infectedCount: 2748,
                saveCount: 628,
                deadCount: 2815,
                infectedPercent: 35,
              },
              {
                id: '617d54a35649c264fcd29dc7',
                name: 'اتوبوس رانی',
                employeesCount: 3384,
                infectedCount: 2138,
                saveCount: 3535,
                deadCount: 2525,
                infectedPercent: 74,
              },
              {
                id: '617d54a3feaea113cefef758',
                name: 'تاکسی تلفنی',
                employeesCount: 134,
                infectedCount: 647,
                saveCount: 807,
                deadCount: 1156,
                infectedPercent: 72,
              },
            ]}
            pagination={{pageSize: 20, maxPages: 3}}
            columns={[
              {
                name: 'وضعیت کلی',
                key: '',
                render: () => <CategoryDonut/>,
                className: 'flex justify-center w-full',
              },
              {
                name: 'نام سرویس',
                key: 'name',
                render: (v: any, record, index: number) => (
                  <span>
                  {(index + 1).toLocaleString('fa')}.{v}
                </span>
                ),
              },
              {
                name: 'تعداد رانندگان',
                key: 'employeesCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'درصد ابتلا',
                key: 'infectedPercent',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}%</span>,
              },
              {
                name: 'تعداد مبتلایان',
                key: 'infectedCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد بهبودیافتگان',
                key: 'saveCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
              {
                name: 'تعداد فوت‌شدگان',
                key: 'deadCount',
                render: (v: any) => <span>{(v as number).toLocaleString('fa')}</span>,
              },
            ]}
            totalItems={0}
          />
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          وضعیت کلی رانندگان کشور
        </legend>

        <div className="flex flex-col justify-between space-y-8">
          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={totalDriver} text="مجموع رانندگان" count={1257}/>
            <Statistic icon={sufferingIcon} text="مجموع مبتلایان" count={2800}/>
            <Statistic icon={saveIcon} text="مجموع بهبود یافتگان" count={1450}/>
            <Statistic icon={deadIcon} text="مجموع فوت‌ شدگان" count={1200}/>
          </div>
          <div
            className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={vaccineIcon} text="مجموع واکسیناسیون" count={654}/>
            <Statistic icon={scanIcon} text="تعداد استعلام شهروندان" count={654}/>
            <Statistic icon={scanDangerIcon} text="تعداد استعلام های نتیجه مثبت" count={428}/>
            <Statistic icon={testIcon} text="تعداد آزمایش های کاربران" count={864}/>
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت رانندگان استان‌ تهران</legend>
        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          <Map/>
        </div>
      </fieldset>
    </div>
  )
}

export default Transport;