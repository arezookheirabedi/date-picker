export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

export const initialVacinatelInfo = {
  totalPopulation: 0,
  gtDoses: {...initialDoses},

};
export interface IInitialVacinatelInfo {
  totalPopulation: number;
  gtDoses:any,
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
