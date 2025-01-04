import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

// components
import Statistic from '../../../containers/Guild/components/Statistic';
import {sideCities} from '../../../helpers/utils';

// hooks

// images
import breadIcon from '../../../assets/images/icons/bread.svg';
import ovenIcon from '../../../assets/images/icons/oven.svg';
import flourIcon from '../../../assets/images/icons/flour.svg';
import thermometerIcon from '../../../assets/images/icons/thermometer.svg';
import posIcon from '../../../assets/images/icons/pos.svg';
import wheatIcon from '../../../assets/images/icons/wheat.svg';
import frenchBreadIcon from '../../../assets/images/icons/french-bread.svg';
import posDeactiveIcon from '../../../assets/images/icons/pos-deactive.svg';
import ovenDeactiveIcon from '../../../assets/images/icons/oven-deactive.svg';
import activePosIcon from '../../../assets/images/icons/activePos.svg';
import cinderIcon from '../../../assets/images/icons/cinder.svg';
import whiteWheatIocn from '../../../assets/images/icons/whitewheat.svg';
import redWheatIcon from '../../../assets/images/icons/redwheat.svg';
import flourWhiteIcon from '../../../assets/images/icons/flourWhite.svg';
import registeredPos from '../../../assets/images/icons/registeredPos.svg';

interface OverviewBakeryProvinceProps {
  cityTitle: any;
}

const OverviewBakeryProvince: React.FC<OverviewBakeryProvinceProps> = ({cityTitle}) => {

  const location = useLocation();
  const history = useHistory();

  // call bakery hook



  return (
 <>fffff</>   
  );
};

export default OverviewBakeryProvince;
