import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Charts from '../Charts';
import Spinner from '../Spinner';


// import hcsService from '../../services/hcs.service';

const {Line} = Charts;

const mock: any = [
  {date: 'استعلام مسافران', positiveMembersCount: 80000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 80000},
  {date: 'امور استخدامی', positiveMembersCount: 30000},
  {date: 'استعلام مسافران', positiveMembersCount: 50000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 200000},
  {date: 'امور استخدامی', positiveMembersCount: 200100},
  {date: 'استعلام مسافران', positiveMembersCount: 80000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 20000},
  {date: 'امور استخدامی', positiveMembersCount: 30000},
  {date: 'استعلام مسافران', positiveMembersCount: 200000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 80000},
  {date: 'امور استخدامی', positiveMembersCount: 200000},
  {date: 'استعلام مسافران', positiveMembersCount: 20000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 30000},
  {date: 'امور استخدامی', positiveMembersCount: 50000},
  {date: 'استعلام مسافران', positiveMembersCount: 90000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 50000},
  {date: 'امور استخدامی', positiveMembersCount: 20000},
  {date: 'استعلام مسافران', positiveMembersCount: 30000},
  {date: 'استعلام گذرنامه', positiveMembersCount: 240000},
  {date: 'امور استخدامی', positiveMembersCount: 110000},
];

const CallChart: React.FC<any> = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  // const [query] = useState({
  //   // status: 'POSITIVE',
  //   // type: 'MONTHLY',
  //   from: null,
  //   to: null,
  //   category: 'grade',
  //   categoryValue: null,
  //   tag: 'edu',
  // });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getColumnChartTestResult = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // const response = await hcsService.columnChartTestResultService(
      //   query,
      //   {
      //     cancelToken: source.token,
      //   }
      // );
      // console.log(response.data)
      setData(mock);
    } catch (error: any) {
      setErrorMessage(error.message);
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getColumnChartTestResult();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  useEffect(() => {
    return () => {
      setData([]);
      setIsCancel(false);
    };
  }, []);

  ;

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نمودار فراخوانی
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-12 shadow">
        {(loading || isCancel) && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && !isCancel && <div className="p-40 text-red-500">{errorMessage}</div>}
        {!loading && !isCancel && data.length > 0 && !errorMessage &&
        <Line data={data} name="گروه سرویس" pointWidth="20"/>}
        {data.length === 0 && !loading && !errorMessage && !isCancel && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default CallChart;
