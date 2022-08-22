import React, {useState, useEffect} from 'react';

// api services
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';

// components
import Statistic from '../../../containers/Guild/components/Statistic';

// images
import airplanIcon from '../../../assets/images/icons/airplan.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import carIcon from '../../../assets/images/icons/car.svg';
import railIcon from '../../../assets/images/icons/rail.svg';

const initialValue = {
  totalNumberOfPilgrims: 400202,
  totalNumberOfAirPilgrims: 3422120,
  totalNumberOfEarthlyPilgrims: 87997,
  totalNumberOfRailPilgrims: 6421,
};
const OverviewPligrimTripType = () => {
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
        totalNumberOfPilgrims: 10000,
        totalNumberOfAirPilgrims: 4000,
        totalNumberOfEarthlyPilgrims: 5000,
        totalNumberOfRailPilgrims: 1000,
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
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">
          نگاه کلی به زائران اربعین براساس نوع سفر
        </legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.totalNumberOfPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={airplanIcon}
              text="تعداد کل زائران هوایی"
              count={pilgrims.totalNumberOfAirPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={carIcon}
              text="تعداد کل زائران زمینی"
              count={pilgrims.totalNumberOfEarthlyPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={railIcon}
              text="تعداد کل زائران ریلی"
              count={pilgrims.totalNumberOfRailPilgrims || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPligrimTripType;
