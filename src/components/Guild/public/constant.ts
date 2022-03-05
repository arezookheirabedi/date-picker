export const initialVacinatelInfo = {
  totalVaccinesCount: 0,
  totalPopulation: 0,
};
export interface IInitialVacinatelInfo {
  totalVaccinesCount: number;
  totalPopulation: number;
}
export const initialPcrInfo = {
  positiveMembersCount:0,
  recoveredMembersCount:0,
  testResultsCount:0,
  recoveredMembersCountToTotalPopulationPercentage:0
};
export interface IInitialPcrInfo {
  positiveMembersCount: number;
  recoveredMembersCount: number;
  testResultsCount: number;
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
