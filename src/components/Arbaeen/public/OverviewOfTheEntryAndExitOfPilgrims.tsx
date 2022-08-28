import React, {useEffect, useState} from 'react';
import arbaeenService from 'src/services/arbaeen.service';
import axios from 'axios';
import Statistic from '../../../containers/Guild/components/Statistic';
import greenPeopleIcon from '../../../assets/images/icons/green-people.svg';
import redPeopleIcon from '../../../assets/images/icons/red-people.svg';

const initialValue = {
  totalNumberOfPassengerLeftTheCountry: 0,
  totalNumberOfPassengerInterTheCountry: 0,
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
      const {data} = await arbaeenService.arbaeenGetAll(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      const newData = {
        totalNumberOfPassengerLeftTheCountry: 10000,
        totalNumberOfPassengerInterTheCountry: 10000,
      };
      setPilgrims(newData);
      // setPilgrims(data);
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
      <legend className="text-black mx-auto px-3">نگاه کلی به ورود و خروج زائران</legend>
      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={redPeopleIcon}
            text="تعداد  زائران خارج شده از کشور"
            count={0}
            loading={loading}
          />
          <Statistic
            icon={greenPeopleIcon}
            text="تعداد زائران وارد شده به کشور"
            count={0}
            loading={loading}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default OverviewOfTheEntryAndExitOfPilgrims;
