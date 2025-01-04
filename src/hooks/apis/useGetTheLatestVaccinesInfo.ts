import {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import {isEmpty} from 'lodash';
import {useHistory, useLocation} from 'react-router-dom';
import {EERRORS} from 'src/constants/errors.enum';
import {IInitialVacinatelInfo, initialVacinatelInfo} from './useGetNumberOf';

export default function useGetTheLatestVaccinesInfo(query?: any, hasProvince: boolean = false) {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState(null);
  const [chartData, setChartData] = useState<any>();
  const [cartData, setCartData] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }



  return {loading, error, chartData, cartData};
}
