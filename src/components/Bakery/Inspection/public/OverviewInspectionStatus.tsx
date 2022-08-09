import React, {useState, useEffect} from 'react';

// api services
import axios from 'axios';
import inspectionService from '../../../../services/inspection.service';

// components
import Statistic from '../../../../containers/Guild/components/Statistic';

// images
import flourInspectionIcon from '../../../../assets/images/icons/flour-inspection.svg';
import groupIcon from '../../../../assets/images/icons/all-group.svg';
import ovenIcon from '../../../../assets/images/icons/oven.svg';
import ovenDeactiveIcon from '../../../../assets/images/icons/oven-deactive.svg';
import bakeryWorkerIcon from '../../../../assets/images/icons/bakery-worker.svg';
import wheatIcon from '../../../../assets/images/icons/wheat.svg';
import breadIcon from '../../../../assets/images/icons/bread.svg';
import ovenInspectionIcon from '../../../../assets/images/icons/oven-inspection.svg';

const initialinspections = {
  totalNumberOfInspectionsPerformed : 0,
  totalNumberOfInspectors : 0,
  numberOfInspectedUnitsWithBusinessLicense : 0,
  numberOfInspectedUnitsWithoutBusinessLicense: 0,
  totalNumberOfInspectedWorkers : 0,
  averageObservedFlourOfInspectedUnits : 0,
  totalNumberOfBakedBreadsOfInspectedUnits : 0,
  totalUnitsSubjectToInspection : 0
};

const OverviewBakeryInspections = () => {
  const [loading, setLoading] = useState(false);
  const [inspections, setInspections] = useState<any>(initialinspections);
  const {CancelToken} = axios;
  const source = CancelToken.source();

  const getInspectionsStatus = async () => {
    setLoading(true);
    try {
      const {data} = await inspectionService.inspectionStatus(
        {tag: 'transparent'},
        {cancelToken: source.token}
      );
      setInspections(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInspectionsStatus();
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت بازرسی‌های انجام شده در کل کشور</legend>

        <div className="flex flex-col justify-between space-y-8">
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={flourInspectionIcon}
              text="تعداد کل بازرسی‌های انجام شده"
              count={inspections.totalNumberOfInspectionsPerformed || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={groupIcon}
              text="تعداد کل بازرسان"
              count={inspections.totalNumberOfInspectors || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenIcon}
              text="تعداد واحدهای بازرسی شده دارای پروانه کسب"
              count={inspections.numberOfInspectedUnitsWithBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenDeactiveIcon}
              text="تعداد واحدهای بازرسی شده فاقد پروانه کسب"
              count={inspections.numberOfInspectedUnitsWithoutBusinessLicense || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
            <Statistic
              icon={bakeryWorkerIcon}
              text="تعداد کل کارگران خبازی‌های بازرسی شده"
              count={inspections.totalNumberOfInspectedWorkers || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={wheatIcon}
              text="میانگین آرد مشاهده شده در واحدهای بازرسی شده"
              count={inspections.averageObservedFlourOfInspectedUnits || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={breadIcon}
              text="مجموع نانهای پخت شده در واحدهای بازرسی شده"
              count={inspections.totalNumberOfBakedBreadsOfInspectedUnits || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
            <Statistic
              icon={ovenInspectionIcon}
              text="مجموع واحد‌هایی که نیاز به بازرسی دارند"
              count={inspections.totalUnitsSubjectToInspection || 0}
              loading={loading}
              hasInfo
              infoText="لورم اپیسوم"
            />
          </div>
        </div>
      </fieldset>
  );
};

export default OverviewBakeryInspections;