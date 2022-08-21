import React, {useEffect, useState} from 'react';

import axios from 'axios';
import arbaeenService from 'src/services/arbaeen.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import openDoor from '../../../assets/images/icons/open-door.svg';
import connectDirectionPathWay from '../../../assets/images/icons/connect-direction-path-way.svg';

const initialValue = {
  TotalNumberOfAxles: 11166,
  TotalNumberOfExternalBorders: 11084,
};
const GeneralLookAtTransportationAxesAndExitBordersOfCountry = () => {
  const [loading, setLoading] = useState(false);
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
        TotalNumberOfAxles: 11166,
        TotalNumberOfExternalBorders: 11084,
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
      <legend className="text-black mx-auto px-3">
        نگاه کلی به محورهای مواصلاتی و مرزهای خروجی کشور
      </legend>
      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={connectDirectionPathWay}
            text="تعداد کل محورها"
            count={pilgrims.TotalNumberOfAxles || 0}
            loading={loading}
            hasInfo
            infoText="لورم اپیسوم"
          />
          <Statistic
            icon={openDoor}
            text="تعداد کل مرزهای خارجی"
            count={pilgrims.TotalNumberOfExternalBorders || 0}
            loading={loading}
            hasInfo
            infoText="لورم اپیسوم"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default GeneralLookAtTransportationAxesAndExitBordersOfCountry;
