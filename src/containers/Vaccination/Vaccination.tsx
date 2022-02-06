import OverviewVaccinationStatus from "../../components/Vaccination/public/OverviewVaccinationStatus";
import OverviewExistVaccine from "../../components/Vaccination/public/OverviewExistVaccine";
import OverviewVaccinationStatusChart from "../../components/Vaccination/public/OverviewVaccinationStatusChart";


const Vaccination = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewVaccinationStatus/>
      <OverviewExistVaccine/>
      <OverviewVaccinationStatusChart/>
    </div>
  )
}

export default Vaccination;