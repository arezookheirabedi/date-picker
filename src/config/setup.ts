interface ISetup {
  endpoint: string;
  documentTitle: string;
}

const Setup: ISetup = {
  endpoint: process.env.REACT_APP_BASE_API_URL!,
  documentTitle: "unit-managment-portal",
};



export default Setup;
