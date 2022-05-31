export const initialGtDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialDoses = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};
export const initialDosesToTotalPopulationPercentage = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  null: 0,
};

export const initialVacinatelInfo = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDosesToTotalPopulationPercentage},
  gtDoses: {...initialGtDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: 0,
  totalVaccinesPercentage: 0,
  totalUnknownVaccinesCount: 0,
  totalNonVaccinesCountBeforeStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystem: 0,
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: 0,
};
export interface IInitialVacinatelInfo {
  totalVaccinesPercentage: number;
  totalUnknownVaccinesCount: number;
  gtDosesToTotalDosesPercentage: any;
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: any;
  doses: any;
  dosesToTotalPopulationPercentage: any;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
  totalVaccinesCount: number;
  totalNonVaccinesCountBeforeStartOfSystemToTotalPopulationPercentage: number;
  totalVaccinesCountAfterStartOfSystemToTotalPopulationPercentage: number;
}
