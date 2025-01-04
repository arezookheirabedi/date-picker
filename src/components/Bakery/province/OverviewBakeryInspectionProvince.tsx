import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

// hooks

// components
import Statistic from '../../../containers/Guild/components/Statistic';
import {sideCities} from '../../../helpers/utils';

// images
import tpsIcon from '../../../assets/images/icons/tps.svg';
import transactionsIcon from '../../../assets/images/icons/transactions.svg';
import activeTimeIcon from '../../../assets/images/icons/active-time.svg';
import unusualTransactionIcon from '../../../assets/images/icons/unusual-Transaction.svg';
import bakeryWithoutTransactionIcon from '../../../assets/images/icons/bakery-WithoutTransaction.svg';

interface OverviewBakeryProvinceProps {
  cityTitle: any;
}

const OverviewBakeryInspectionProvince: React.FC<OverviewBakeryProvinceProps> = ({cityTitle}) => {
  
  // call bakery hook

  const location = useLocation();
  const history = useHistory();


  return (
    <>
    dddd
    </>
  );
};

export default OverviewBakeryInspectionProvince;
