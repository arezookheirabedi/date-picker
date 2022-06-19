import React from 'react';

import AllocatedFlour from './AllocatedFlour';
import BakeryStatus from './BakeryStatus';
import FlourDischargeStatus from './FlourDischargeStatus';
import FlourInventoryStatus from './FlourInventoryStatus';
import InspectionPlace from './InspectionPlace';
import InspectorsInfo from './InspectorsInfo';
import PosesList from './PosesList';
import ProducedBreadStatus from './ProducedBreadStatus';
import WorkersStatus from './WorkersStatus';

const ExpandedForm: React.FC<any> = ({...record}) => {
  return (
    <div className="rounded bg-white p-4 px-2 pb-2 shadow-lg">
      <InspectorsInfo {...record} />

      <InspectionPlace {...record} />

      <PosesList {...record} />

      <WorkersStatus {...record} />

      <AllocatedFlour {...record} />

      <FlourDischargeStatus {...record} />

      <FlourInventoryStatus {...record} />

      <ProducedBreadStatus {...record} />

      <BakeryStatus {...record} />

      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">گزارش بازرس: </legend>
        <div className="flex">
          <span>{record.allData.inspectionResult || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مسوول بازرسی:</legend>
        <div className="flex">
          <span>{record.allData.inspectorComment || '-'}</span>
        </div>
      </fieldset>
      <fieldset className="m-8 rounded-xl border  p-4 text-center">
        <legend className="mx-auto px-3 text-black">نظر مدیریت:</legend>
        <div className="flex">
          <span>{record.allData.managerComment || '-'}</span>
        </div>
      </fieldset>
    </div>
  );
};

export default ExpandedForm;
