import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {cancelTokenSource, msgRequestCanceled, sideCities} from '../../../helpers/utils';
import {EERRORS} from '../../../constants/errors.enum';

export default function useGetOverviewListOfInspections(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const [dataSet, setDataSet] = useState<any>([]);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }


  return {loading, error, dataSet, totalItems};
}
