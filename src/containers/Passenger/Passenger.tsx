import OverviewPasengersStatusCard from 'src/components/Pasengers/public/OverviewPasengersStatusCard';
import OverviewAirlinesPasengersStatusCard from 'src/components/Pasengers/public/OverviewAirlinesPasengersStatusCard';
import OverviewBusPasengersStatusCard from 'src/components/Pasengers/public/OverviewBusPasengersStatusCard';
import OverviewShipPasengersStatusCard from 'src/components/Pasengers/public/OverviewShipPasengersStatusCard';
import OverviewTrainPasengersStatusCard from 'src/components/Pasengers/public/OverviewTrainPasengersStatusCard';

import OverviewPasengersVaccinateComponent from 'src/components/Pasengers/public/OverViewPassengerVaccinate';
import OverviewPassengerPatients from 'src/components/Pasengers/public/OverviewPatients';
import OverViowPassengerStatusVaccinateChart from '../../components/Pasengers/public/OverViewPassengerStatusVaccinateChart';

const Pasenger = () => {
  return (
    <div className="space-y-16 mb-8">
      <OverviewPasengersStatusCard />
      <OverviewAirlinesPasengersStatusCard/>
       <OverviewBusPasengersStatusCard/>
     <OverviewTrainPasengersStatusCard/>
      <OverviewShipPasengersStatusCard/> 
       <OverviewPasengersVaccinateComponent /> 
       <OverViowPassengerStatusVaccinateChart /> 
       <OverviewPassengerPatients /> 
    </div>
  );
};

export default Pasenger;
