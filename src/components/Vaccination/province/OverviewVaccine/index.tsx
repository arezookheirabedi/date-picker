import React, {useEffect, useState} from 'react';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import {useHistory, useLocation} from 'react-router-dom';
import OverViewVaccinationPercentageStatus from './OverviewVaccinePercentage';
import OverviewVaccinationStatus from './OverviewVaccineCount';


export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

export const initialVacinatelInfo = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: 0,
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCount: 0,
};

export interface IObjectOption {
  [key: number]: number;
}

export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: IObjectOption;
  doses: IObjectOption;
  dosesToTotalPopulationPercentage: IObjectOption;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: number;
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: number;
}
const OverviewVaccine: React.FC<{cityTitle: string}> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [numberOf, setNumberOf] = useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [thelatestNumberOf, setThelatestNumberOf] =
    useState<IInitialVacinatelInfo>(initialVacinatelInfo);
  const [theLatestloading, setTheLatestLoading] = useState(false);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }

 

  return (
    <div id="vaccination-overview">
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">
          نگاه کلی به وضعیت واکسیناسیون در استان {cityTitle}
        </legend>
        <OverviewVaccinationStatus numberOf={numberOf}  loading={false}/>
      </fieldset>
      <fieldset className="mb-16 rounded-xl border p-4 text-center">
        <legend className="mx-auto px-3 text-black">
          نگاه کلی به درصد واکسیناسیون در استان {cityTitle}
        </legend>
        <OverViewVaccinationPercentageStatus
        loading={false}
          theLatestloading={theLatestloading}
          thelatestNumberOf={thelatestNumberOf}
         
          numberOf={numberOf}
        />
      </fieldset>
    </div>
  );
};

export default OverviewVaccine;
