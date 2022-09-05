import React, { useEffect } from 'react';
import { fetchZaerinAc } from 'src/store/action_creators/arbaeen/fetchZaerinAc';
import { useDispatch } from 'react-redux';
// import Irancell from 'src/assets/images/logos/irancell-logo.svg';
// import Vasl from 'src/assets/images/logos/vasl-logo.svg';
// import GeneralLookAtTheLocationOfProcessions from '../../components/Arbaeen/movingClouds/GeneralLookAtTheLocationOfProcessions';
import DensityOfPassengersMap from '../../components/Arbaeen/movingClouds/DensityOfPassengersMap';
import TimelineMap from '../../components/Arbaeen/movingClouds/TimelineMap';
import FilterMap from '../../components/Arbaeen/public/FilterMap';

const ArbaeenPilgrimsMovingCloud = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchZaerinAc());
  }, []);


  return (
    <div className="space-y-16 mb-8">
      <FilterMap />
      <DensityOfPassengersMap />
      <TimelineMap />
      {/* <GeneralLookAtTheLocationOfProcessions /> */}
      <fieldset className=" rounded-xl border py-2 px-4 text-center">
        <div className=" flex justify-center">
          <a href="https://irancell.ir" target="_blank" rel="noreferrer">
            <img src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell.png`} className="w-12 ml-1" alt="" />
          </a>
          <a href="https://irancell.ir" target="_blank" rel="noreferrer">
            <img src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell-labs.png`} className="w-8 ml-1" alt="" />
          </a>
          {/* <div className="flex items-center justify-start"> */}
          {/*  <img src={Irancell} className="inline" alt="irancell-logo" /> */}
          {/*  <span className="px-2">باهمکاری ایرانسل</span> */}
          {/* </div> */}
          {/* <div> */}
          {/*  <img src={Vasl} className="inline " alt="vasl-logo" /> */}
          {/* </div> */}
        </div>
      </fieldset>
    </div>
  );
};
export default ArbaeenPilgrimsMovingCloud;
