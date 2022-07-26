import {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import {EERRORS} from 'src/constants/errors.enum';
import guildService from 'src/services/guild.service';

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
  const getIt = async ({retry, currentPage, ...params}: any = {}) => {
    const newData = {...params, pageNumber: Number(query.currentPage) - 1};

    setLoading(true);
    setError(null);
    try {
      const {data} = await guildService.guildMonitoringReport(newData, {
        cancelToken: cancelToken.token,
      });
      const normalizedData: any[] = [];
      data.content.forEach((item: any, index: number) => {
        normalizedData.push({
          id: `ovca_${index}`,
          categoryCode: item.categoryCode || 'نامشخص',
          guildCode: item.guildCode || 'نامشخص',
          ownerMobileNumber: item.ownerMobileNumber,
          ownerNationalId: item.ownerNationalId || 'نامشخص',
          categoryName: item.categoryName || 'نامشخص',
          address: item.address || 'نامشخص',
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
    getIt({...query});
    return () => {
      cancelRequest();
      setDataSet([]);
    };
  }, [query]);

  return {loading, error, dataSet, totalItems};
}
