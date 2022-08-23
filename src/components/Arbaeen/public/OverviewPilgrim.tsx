import React, {useState, useEffect} from 'react';
import axios from 'axios';
import arbaeenService from '../../../services/arbaeen.service';
import Statistic from '../../../containers/Guild/components/Statistic';
import groupIcon from '../../../assets/images/icons/all-group.svg';
import greenGroupIcon from '../../../assets/images/icons/green-group-icon.svg';
import groupWithMapIcon from '../../../assets/images/icons/group-with-map.svg';
import greenPersons from '../../../assets/images/icons/persons-green-icon.svg';
import greenwemen from '../../../assets/images/icons/green-wemen.svg';
import earthPersons from '../../../assets/images/icons/earth-persons.svg';
import menEarth from '../../../assets/images/icons/men-earth.svg';
import wemenEarth from '../../../assets/images/icons/wemen-earth.svg';

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
  const [totla, setTotal] = useState<number>(0);
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
    getIt({pageNumber: 0, pageSize: 1});
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
              text="تعداد کل پیش ثبت نام شدگان نهایی"
              count={totla || 0}
              loading={totalLoading}
            />
            <Statistic
              icon={greenGroupIcon}
              text="تعداد کل ثبت نام شدگان نهایی"
              count={pilgrims.totlaVizaRequest || 0}
              loading={loading}
            />
            <Statistic
              icon={greenPersons}
              text=" تعداد کل ثبت نام شدگان نهایی مرد"
              count={pilgrims.totalPublishedVisa || 0}
              loading={loading}
            />
            <Statistic
              icon={greenwemen}
              text="تعداد کل ثبت نام شدگان نهایی زن"
              count={pilgrims.totalNumberOfPilgrims || 0}
              loading={loading}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={groupWithMapIcon}
              text="تعداد کل پیش ثبت نام شدگان نهایی اتباع خارجی"
              count={pilgrims.numberOfForeignPilgrims || 0}
              loading={loading}
            />
            <Statistic
              icon={earthPersons}
              text=" تعداد کل ثبت نام شدگان نهایی اتباع خارجی"
              count={pilgrims.percentOfForeignPilgrims || 0}
              isPercentage
              loading={loading}
            />
            <Statistic
              icon={menEarth}
              text=" تعداد کل ثبت نام شدگان نهایی مرد اتباع خارجی"
              count={pilgrims.numberOfRequestRejections || 0}
              loading={loading}
            />
            <Statistic
              icon={wemenEarth}
              text=" تعداد کل ثبت نام شدگان نهایی زن اتباع خارجی"
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
