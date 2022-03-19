import OverviewPassengersStatusCard from 'src/components/Passengers/public/OverviewPassengersStatusCard';
import OverviewAirlinesPassengersStatusCard from 'src/components/Passengers/public/OverviewAirlinesPassengersStatusCard';
import OverviewBusPassengersStatusCard from 'src/components/Passengers/public/OverviewBusPassengersStatusCard';
import OverviewShipPassengersStatusCard from 'src/components/Passengers/public/OverviewShipPassengersStatusCard';
import OverviewTrainPassengersStatusCard from 'src/components/Passengers/public/OverviewTrainPassengersStatusCard';

import OverviewPassengersVaccinate from 'src/components/Passengers/public/OverviewPassengerVaccinate1';
import OverviewPassengerPatients from 'src/components/Passengers/public/OverviewPatients';
import OverViowPassengerStatusVaccinateChart from '../../components/Passengers/public/OverviewPassengerStatusVaccinateChart1';

const Passenger = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPassengersStatusCard />
      <OverviewAirlinesPassengersStatusCard />
      <OverviewBusPassengersStatusCard />
      <OverviewTrainPassengersStatusCard />
      <OverviewShipPassengersStatusCard />
      <OverviewPassengersVaccinate />
      <OverViowPassengerStatusVaccinateChart />
      <OverviewPassengerPatients />
    </div>
  );
};

export default Passenger;
