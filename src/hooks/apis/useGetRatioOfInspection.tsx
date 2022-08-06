import {useEffect, useState} from 'react';
import inspectionService from 'src/services/inspection.service';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';

export default function useGetRatioOfInspection(query: any) {
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
          const response = await inspectionService.RatioOfInspection(params, {
            cancelToken: cancelToken.token,
          });
          
          const NeedToInspection: any[] = [];
          const InspectionsDone: any[] = [];
          const grade: any[] = [];
          response.data.forEach((item: any) => {
            NeedToInspection.push(item.NeedToInspection);
            InspectionsDone.push(item.InspectionsDone);

            grade.push(item.province);
          });
          const newData = [
            {
              name: 'بازرسی‌های انجام شده',
              data: [...InspectionsDone],
              color: '#07816C',
            },
            {
              name: 'نیاز به بازرسی',
              data: [...NeedToInspection],
              color: '#F3BC06',
            },
          ];
          setData({categories: [...grade], series: [...newData]});
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