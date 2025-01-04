import {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';

interface IMonitoringReport {}
export default function useGetGuildMonitoring(query: any) {
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const [dataSet, setDataSet] = useState<Array<IMonitoringReport>>([]);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }


  return {loading, error, dataSet, totalItems};
}
