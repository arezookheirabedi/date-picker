import React from 'react';
import Overview from "../../components/ServicePort/Overview";
import CountUpTimer from "../../components/ServicePort/CountUpTimer";
import ListOfServices from "../../components/ServicePort/ListOfServices";
import CallChart from "../../components/ServicePort/CallChart";


const ServicePort: React.FC<any> = () => {
  return (
    <div className="space-y-16 mb-8">
      <Overview/>
      <CountUpTimer/>
      <ListOfServices/>
      <CallChart/>
    </div>
  )
}

export default ServicePort;