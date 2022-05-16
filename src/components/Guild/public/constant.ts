export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

export const initialVacinatelInfo = {
  totalPopulation: 0,
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  gtDoses: {...initialDoses},
  totalNonVaccinesCountBeforeStartOfSystem: 0,

  totalVaccinesCountAfterStartOfSystem: 0,
};
export interface IInitialVacinatelInfo {
  totalPopulation: number;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  gtDoses: any;
  totalNonVaccinesCountBeforeStartOfSystem: number;
  totalVaccinesCountAfterStartOfSystem: number;
}
export const initialPcrInfo = {
  positiveMembersCount: 0,
  recoveredMembersCount: 0,
  testResultsCount: 0,
  recoveredMembersCountToTotalPopulationPercentage: 0,
  positiveMembersCountToTotalPopulationPercentage: 0,
};
export interface IInitialPcrInfo {
  positiveMembersCount: number;
  recoveredMembersCount: number;
  testResultsCount: number;
  positiveMembersCountToTotalPopulationPercentage: number;
  recoveredMembersCountToTotalPopulationPercentage: number;
}
export interface IInitialInquiry {
  total: number;
  qualified: number;
  disqualified: number;
}
export const initialInquiry = {
  total: 0,
  qualified: 0,
  disqualified: 0,
};
export interface IInitialNumberOfDoses {
  doses: any;
  dosesToTotalPopulationPercentage: any;
  gtDoses: any;
  gtDosesToTotalDosesPercentage: any;
  totalNonVaccinesCount: number;
  totalNonVaccinesCountToTotalPopulationPercentage: number;
  totalPopulation: number;
  totalUnknownVaccinesCount: number;
  totalVaccinesCount: number;
  totalVaccinesCountToTotalPopulationPercentage: number;
  // totalVaccinesPercentage: number,
}
export const initialNumberOfDoses = {
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage: {...initialDoses},
  totalNonVaccinesCount: 0,
  totalNonVaccinesCountToTotalPopulationPercentage: 0,
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  // totalVaccinesPercentage: 0,
};
