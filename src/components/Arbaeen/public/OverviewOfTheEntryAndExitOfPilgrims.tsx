import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import Statistic from '../../../containers/Guild/components/Statistic';
import greenPeopleIcon from '../../../assets/images/icons/green-map-people.svg';
import redPeopleIcon from '../../../assets/images/icons/map-red-people.svg';

const initialValue = {
  borderId: '',
  enteringCount: 0,
  exitingCount: 0,
};
const OverviewOfTheEntryAndExitOfPilgrims = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pilgrims, setPilgrims] = useState<any>(initialValue);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getAllPilgrims = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {data} = await arbaeenService.gerBorderTraffic({}, {cancelToken: source.token});

      setPilgrims({...data});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPilgrims();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به ورود و خروج مسافران از مرزهای زمینی
      </legend>
      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={redPeopleIcon}
            text="تعداد  مسافران خارج شده از کشور"
            count={pilgrims.exitingCount || 0}
            loading={loading}
          />
          <Statistic
            icon={greenPeopleIcon}
            text="تعداد مسافران وارد شده به کشور"
            count={pilgrims.enteringCount || 0}
            loading={loading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewOfTheEntryAndExitOfPilgrims;
