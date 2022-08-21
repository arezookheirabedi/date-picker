import React, {useState, useEffect} from 'react';
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import groupIcon from '../../../assets/images/icons/all-group.svg';
import blueEventIcon from '../../../assets/images/icons/blue-event.svg';
import greenEventIcon from '../../../assets/images/icons/green-event.svg';
import groupWithFlagIcon from '../../../assets/images/icons/group-with-flag.svg';
import groupWithMapIcon from '../../../assets/images/icons/group-with-map.svg';
import redEventIcon from '../../../assets/images/icons/red-event.svg';
import redCrescentIcon from '../../../assets/images/icons/red-crescent.svg';

const initialValue = {
  totalNumberOfRegistrants: 3732000,
  totlaVizaRequest: 3422120,
  totalPublishedVisa: 3002240,
  totalNumberOfPilgrims: 3422120,
  numberOfForeignPilgrims: 12097,
  percentOfForeignPilgrims: 35,
  numberOfRequestRejections: 200152,
  totalServicesProvided: 12452,
};
const OverviewPilgrim = () => {
  const [totalLoading, setTotalLoding] = useState<boolean>(false);
  const [totla, setTotal] = useState<number>(12000);
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
        totalNumberOfRegistrants: 12000,
        totlaVizaRequest: 11500,
        totalPublishedVisa: 11000,
        totalNumberOfPilgrims: 10000,
        numberOfForeignPilgrims: 1000,
        percentOfForeignPilgrims: 10,
        numberOfRequestRejections: 500,
        totalServicesProvided: 750,
      };
      setPilgrims(newData);
      // setPilgrims(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getIt = async (params: any) => {
    setTotalLoding(true);
    try {
      const {data} = await arbaeenService.getPiligrimList(params, {cancelToken: source.token});
      setTotal(data.totalElements);
    } catch (error) {
      console.log(error);
    } finally {
      setTotalLoding(false);
    }
  };
  useEffect(() => {
    getAllPilgrims();
    getIt({pageNumber: 0});
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <>
      <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به زائران اربعین در کل کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupIcon}
              text="تعداد کل ثبت نام شدگان"
              count={totla || 0}
              loading={totalLoading}
            />
            <Statistic
              icon={blueEventIcon}
              text="مجموع درخواست برای روادید"
              count={pilgrims.totlaVizaRequest || 0}
              loading={loading}
            />
            <Statistic
              icon={greenEventIcon}
              text="تعداد کل روادید صادر شده"
              count={pilgrims.totalPublishedVisa || 0}
              loading={loading}
            />
            <Statistic
              icon={groupWithFlagIcon}
              text="تعداد کل زائران"
              count={pilgrims.totalNumberOfPilgrims || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithMapIcon}
              text="تعداد زائران اتباع خارجی"
              count={pilgrims.numberOfForeignPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={groupWithMapIcon}
              text="درصد زائران اتباع خارجی"
              count={pilgrims.percentOfForeignPilgrims || 0}
              isPercentage
              loading={loading}
            />
            <Statistic
              icon={redEventIcon}
              text="تعداد رد درخواست روادید به دلیل عدم واکسیناسیون"
              count={pilgrims.numberOfRequestRejections || 0}
              loading={loading}
            />
            <Statistic
              icon={redCrescentIcon}
              text="مجموع خدمات ارائه شده توسط هلال احمر"
              count={pilgrims.totalServicesProvided || 0}
              loading={loading}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default OverviewPilgrim;
