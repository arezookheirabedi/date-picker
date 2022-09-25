import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import inspectionService from '../../../services/inspection.service';
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
  const getIt = async ({retry, currentPage, ...params}: any = {}) => {
    const newData = {...params, pageNumber: Number(query.currentPage) - 1};

    Object.keys(newData).forEach(key => {
      if (newData[key] === false) {
        // delete newData[key];
        newData[key] = null;
      }
    });
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await inspectionService.inspectionAll(newData, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `incpection_List_${index}`,
          typeViolation: item.typeViolation || [],
          address: item.address || 'نامشخص',
          province: item.province || 'نامشخص',
          unitNumber: item.unitNumber || 'نامشخص',
          ownerName: `${item.operatorFirstName || '-'} ${item.operatorLastName || '-'}`,
        });
      });
      setDataSet([...normalizedData]);
      setTotalItems(data.totalElements);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasProvince) {
      return;
    }
    getIt({...query});
    // eslint-disable-next-line consistent-return
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [query]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity && hasProvince) {
      getIt(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [location.search]);

  return {loading, error, dataSet, totalItems};
}
