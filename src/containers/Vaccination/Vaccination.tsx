import Statistic from "../Overview/components/Statistic";


import vaccineIcon from "../../assets/images/icons/vaccine-color.svg";
import SinopharmIcon from "../../assets/images/icons/sinopharm.svg";
import BarekatIcon from "../../assets/images/icons/barekat-icon.svg";
import AstrazenecaIcon from "../../assets/images/icons/astrazeneca-icon.svg";
import RedYellowVaccineVirus from "../../assets/images/icons/red-yellow-vaccine-virus.svg";
import BlackYellowVaccineVirus from "../../assets/images/icons/black-yellow-vaccine-virus.svg";
import RedGreenVaccineVirus from "../../assets/images/icons/red-green-vaccine-virus.svg";
import BlackGreenVaccineVirus from "../../assets/images/icons/black-green-vaccine-virus.svg";
import GrayVaccine from "../../assets/images/icons/gray-vaccine.svg";
import YellowVaccine from "../../assets/images/icons/yellow-vaccine.svg";
import GreenVaccine from "../../assets/images/icons/green-vaccine.svg";
import Charts from "../../components/Charts";

const {Map , ColumnRectangle} = Charts;

const Vaccination = () => {
  return (
    <div className="space-y-16 mb-8">
      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">وضعیت کلی واکسیناسیون کشور</legend>

        <div className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 rtl:space-x-reverse">
          <div className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0  md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={vaccineIcon} text="تعداد کل واکسیناسیون" count={1000000} />
            <Statistic icon={SinopharmIcon} text="تعداد کل واکسیناسیون سینوفارم" count={100} />
          </div>
          <div className="flex-grow flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={AstrazenecaIcon} text="تعداد کل واکسیناسیون آسترازنکا" count={100} />
            <Statistic icon={BarekatIcon} text="تعداد کل واکسیناسیون برکت" count={1000} />
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت استان‌ تهران</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={vaccineIcon} text="تعداد واکسیناسیون در هر شهر" count={2800} />
            <Statistic icon={vaccineIcon} text="درصد واکسیناسیون در هر شهر" count={1450} />
            <Statistic icon={RedYellowVaccineVirus} text="تعداد واکسینه شده دوز اولی مبتلا به کرونا" count={1200} />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={RedGreenVaccineVirus} text="تعداد واکسینه شده دوز دومی مبتلا به کرونا" count={654} />
            <Statistic icon={BlackYellowVaccineVirus} text="تعداد واکسینه شده دوز اولی فوتی" count={428} />
            <Statistic icon={BlackGreenVaccineVirus} text="تعداد واکسینه شده دوز دومی فوتی" count={864} />
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic icon={GrayVaccine} text="تعداد واکسیناسیون انجام نشده" count={654} />
            <Statistic icon={YellowVaccine} text="تعداد واکسیناسیون دوز اول" count={428} />
            <Statistic icon={GreenVaccine} text="تعداد واکسیناسیون دوز دوم" count={864} />
          </div>

          <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
            <Map/>
          </div>
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">
          وضعیت واکسیناسیون بر مبنای گروه سنی
        </legend>
        {/* <div>head</div> */}
        <div className="md:flex  justify-between space-y-5 lg:space-y-0">
          <div className="w-full lg:w-5/6 mx-auto">
            <ColumnRectangle />
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default Vaccination;