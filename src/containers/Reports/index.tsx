import React from 'react';
import GuildReport from './GuildReport';
import TransportReport from './TransportReport';

const Requested: React.FC<{}> = () => {
  return (
    <>
      <TransportReport />
      <GuildReport />
    </>
  );
};

export default Requested;
