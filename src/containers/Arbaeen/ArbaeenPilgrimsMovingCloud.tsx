import React from 'react';
import Irancell from 'src/assets/images/logos/irancell-logo.svg';
import Vasl from 'src/assets/images/logos/vasl-logo.svg';
import GeneralLookAtTheLocationOfProcessions from '../../components/Arbaeen/movingClouds/GeneralLookAtTheLocationOfProcessions';
import DensityOfPassengersMap from '../../components/Arbaeen/movingClouds/DensityOfPassengersMap';
import TimelineMap from '../../components/Arbaeen/movingClouds/TimelineMap';

const ArbaeenPilgrimsMovingCloud = () => {
  return (
    <div className="space-y-16 mb-8">
      <DensityOfPassengersMap />
      <TimelineMap />
      <GeneralLookAtTheLocationOfProcessions />
      <fieldset className=" rounded-xl border py-2 px-4 text-center">
        <div className=" flex justify-between">
          <div className="flex items-center justify-start">
            <img src={Irancell} className="inline" alt="irancell-logo" />
            <span className="px-2">باهمکاری ایرانسل</span>
          </div>
          <div>
            <img src={Vasl} className="inline " alt="vasl-logo" />
          </div>
        </div>
      </fieldset>
    </div>
  );
};
export default ArbaeenPilgrimsMovingCloud;
