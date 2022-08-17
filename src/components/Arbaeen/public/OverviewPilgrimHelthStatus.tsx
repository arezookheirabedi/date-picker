import React, {useState, useEffect} from 'react';

// api services
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';

// components
import Statistic from '../../../containers/Guild/components/Statistic';

// images
import testIcon from '../../../assets/images/icons/test-color.svg';
import passengerNegativeTestIcon from '../../../assets/images/icons/passenger-negative-test.svg';
import passengerPositiveTest from '../../../assets/images/icons/passenger-positive-test.svg';
import informationUpdatedIcon from '../../../assets/images/icons/information-updated.svg';

const initialValue = {
  numberOfQueries: 0,
  numberOfPositiveTests: 0,
  numberOfPositiveThings: 0,
  numberOfInfectionPercent: 0,
};
const OverviewPilgrimHelthStatus = () => {
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
        numberOfQueries: 5000,
        numberOfPositiveTests: 1000,
        numberOfPositiveThings: 1000,
        numberOfInfectionPercent: 10,
      };
      setPilgrims(newData);
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
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت سلامت زائران</legend>
        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={informationUpdatedIcon}
              text="تعداد استعلام های انجام شده"
              count={pilgrims.numberOfQueries || 0}
              loading={loading}
            />
            <Statistic
              icon={testIcon}
              text="تعداد تست های مثبت"
              count={pilgrims.numberOfPositiveTests || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerNegativeTestIcon}
              text="موارد مثبت بعد از سفر"
              count={pilgrims.numberOfPositiveThings || 0}
              loading={loading}
            />
            <Statistic
              icon={passengerPositiveTest}
              text="درصد ابتلا بعد از سفر"
              count={pilgrims.numberOfInfectionPercent || 0}
              isPercentage
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrimHelthStatus;
