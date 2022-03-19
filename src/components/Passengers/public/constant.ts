export const initialTotalVacinatelInfo = {
  totalNonVaccinesCount: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage:0,
  totalNonVaccinesCountToTotalPopulationPercentage:0,
  totalPopulation:0

};
export interface IInitialTotalVacinatelInfo {
  totalNonVaccinesCount: number,
  totalVaccinesCount: number,
  totalVaccinesCountToTotalPopulationPercentage:number,
  totalNonVaccinesCountToTotalPopulationPercentage:number, 
  totalPopulation:number
}

export interface IInitialPcrInfo {
  totalPopulation: number;
  positiveMembersCountAfterTrip: number;
  negativeTestResultsCount: number;
  testResultsCount: number;
  positiveMembersCountAfterTripToTotalPopulationPercentage: number;
}
export const initialpcrInfo={
  totalPopulation:0,
  positiveMembersCountAfterTrip: 0,
  negativeTestResultsCount: 0,
  testResultsCount:0,
  positiveMembersCountAfterTripToTotalPopulationPercentage: 0
}



export const initialDoses = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, null: 0};

export const initialNumberOfDoses={
  doses: {...initialDoses},
  dosesToTotalPopulationPercentage: {...initialDoses},
  gtDoses: {...initialDoses},
  gtDosesToTotalDosesPercentage : {...initialDoses},
  totalNonVaccinesCount:0,
  totalNonVaccinesCountToTotalPopulationPercentage:0,
  totalPopulation: 0,
  totalUnknownVaccinesCount: 0,
  totalVaccinesCount: 0,
  totalVaccinesCountToTotalPopulationPercentage: 0,
  // totalVaccinesPercentage: 0,
}
export interface IInitialNumberOfDoses{
  doses: any,
  dosesToTotalPopulationPercentage:any,
  gtDoses:any,
  gtDosesToTotalDosesPercentage :any,
  totalNonVaccinesCount:number,
  totalNonVaccinesCountToTotalPopulationPercentage:number,
  totalPopulation: number,
  totalUnknownVaccinesCount: number,
  totalVaccinesCount: number,
  totalVaccinesCountToTotalPopulationPercentage: number,
  // totalVaccinesPercentage: number,
}
