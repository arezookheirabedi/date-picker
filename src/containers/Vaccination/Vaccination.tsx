// import OverViewVaccinationPercentageStatus from 'src/components/Vaccination/public/OverviewVaccine/OverViewVaccinationPercentageStatus';
import OverviewExistVaccinePercentage from 'src/components/Vaccination/public/OverviewExistVaccinePercentage';
// import OverviewVaccinationStatus from '../../components/Vaccination/public/OverviewVaccine/OverviewVaccinationStatus';
import OverviewVaccine from 'src/components/Vaccination/public/OverviewVaccine';
import OverviewExistVaccine from '../../components/Vaccination/public/OverviewExistVaccine';
import OverviewVaccinationStatusChart from '../../components/Vaccination/public/OverviewVaccinationStatusChart';

const Vaccination = () => {
  return (
    <div className="space-y-16 mb-8">
  
      <OverviewVaccine />
       <OverviewExistVaccine />
      <OverviewExistVaccinePercentage />
      <OverviewVaccinationStatusChart /> 
    </div>
  );
};

export default Vaccination;
