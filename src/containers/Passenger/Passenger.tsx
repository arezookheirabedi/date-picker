import OverviewPasengersStatusCard from 'src/components/Pasengers/public/OverviewPasengersStatusCard';

import OverviewPasengersVaccinateComponent from 'src/components/Pasengers/public/OverViewPassengerVaccinate';
import OverviewPassengerPatients from 'src/components/Pasengers/public/OverviewPatients';
import OverViewPassengerTypeStatusCardComponent from 'src/components/Pasengers/public/OverViewPassengerTypeStatusCard'
import OverViowPassengerStatusVaccinateChart from '../../components/Pasengers/public/OverViewPassengerStatusVaccinateChart';

const Pasenger = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPasengersStatusCard />
      <OverViewPassengerTypeStatusCardComponent/>
      <OverviewPasengersVaccinateComponent />
      <OverViowPassengerStatusVaccinateChart />
      <OverviewPassengerPatients />
    </div>
  );
};

export default Pasenger;
