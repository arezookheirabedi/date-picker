import {useEffect, useState} from 'react';
import inspectionService from 'src/services/inspection.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';

export default function useGetOverviewOfInspectionsDone(query: any) {
    const [error, setError] = useState(null) as any;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const cancelToken = cancelTokenSource();

    function cancelRequest() {
        cancelToken.cancel(msgRequestCanceled);
    }

    const getColumnChartTestResult = async (params: any) => {
        setLoading(true);
        setError(null);
        try {
          const response = await inspectionService.inspectionDone(params, {
            cancelToken: cancelToken.token,
          });
          
          const date: any[] = [];
          const inspectionDone: any[] = [];
          response.data.forEach((item: any) => {
            date.push(item.date);
            inspectionDone.push(item.inspectionDone);
          });
          const newData = [
            {
              name: 'بازرسی‌های انجام شده',
              data: [...inspectionDone],
              color: {
                linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                stops: [
                  [0, '#041E39'],
                  [1, '#57687A'],
                ],
              },
            }
          ];
          setData({categories: [...date], series: [...newData]});
        } catch (err: any) {
            setError(err.message);
            console.log(err);
        } finally {
          setLoading(false);
        }
      };

        
  useEffect(() => {
    const idSetTimeOut = setTimeout(() => {
      getColumnChartTestResult(query);
    }, 500);

    return () => {
      setData([]);
      cancelRequest();
      clearTimeout(idSetTimeOut);
    };
  }, [query]);

    return {loading, error, data};
}