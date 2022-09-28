/* eslint-disable */

import React, {useState} from 'react';

import OverviewInspectionStatus from 'src/components/Bakery/Inspection/public/OverviewInspectionStatus';
// import OverviewListOfInspections from 'src/components/Bakery/Inspection/public/OverviewListOfInspections';
import OverviewReportOfInspectedUnit from 'src/components/Bakery/Inspection/public/OverviewReportOfInspectedUnit';
import OverviewReportOfInspectedUnitsInCountry
  from 'src/components/Bakery/Inspection/public/OverviewReportOfInspectedUnitsInCountry';
import OverviewNumberOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewNumberOfInspectedUnits';
import OverviewInspectionsDone from 'src/components/Bakery/Inspection/public/OverviewInspectionsDone';
// import OverviewRatioOfInspection from 'src/components/Bakery/Inspection/public/OverviewRatioOfInspection';
import OverviewStatusOfListPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfListPrice';
import OverviewStatusOfBreadSupplyPrice from 'src/components/Bakery/Inspection/public/OverviewStatusOfBreadSupplyPrice';
// import OverviewAverageFlourOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewAverageFlourOfInspectedUnits';
import OverviewStatusOfCookingVariety from 'src/components/Bakery/Inspection/public/OverviewStatusOfCookingVariety';
import OverviewBreadQualityInInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewBreadQualityInInspectedUnits';
import OverviewPublicHealthOfInspectedUnits from 'src/components/Bakery/Inspection/public/OverviewPublicHealthOfInspectedUnits';

import useGetOverviewInspectionStatus from "../../../hooks/apis/inspection/useGetOverviewInspectionStatus";


const Inspection = () => {

  const [query, setQuery] = useState({
    retry: false
  })

  const {
    loading,
    error: errorMessage,
    data: inspection,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountry,
    overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart,
    statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry,
    statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry,
    overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry
  } = useGetOverviewInspectionStatus(query);

  return (
    <div className="space-y-16 mb-8">
      <OverviewInspectionStatus data={inspection} loading={loading}/>
      {/*
      <OverviewListOfInspections />
       */}


      <div className='flex w-full gap-x-6'>
        <OverviewReportOfInspectedUnitsInCountry data={overviewOfTheReportOfInspectedUnitsInTheWholeCountry}
                                                 loading={loading}
                                                 error={errorMessage}
                                                 setQuery={setQuery}
        />

        <OverviewNumberOfInspectedUnits data={overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry}
                                        loading={loading}
                                        error={errorMessage}
                                        setQuery={setQuery}
        />
      </div>

      <OverviewReportOfInspectedUnit data={overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart}
                                     loading={loading}
                                     error={errorMessage}
                                     setQuery={setQuery}
      />



      <OverviewInspectionsDone />


      {/* <OverviewRatioOfInspection /> */}

      <div className='flex w-full gap-x-6'>
        <OverviewStatusOfListPrice data={statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry}
                                   loading={loading}
                                   error={errorMessage}
                                   setQuery={setQuery} />
        <OverviewStatusOfBreadSupplyPrice data={statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry}
                                          loading={loading}
                                          error={errorMessage}
                                          setQuery={setQuery} />
      </div>

      {/* <OverviewAverageFlourOfInspectedUnits /> */}

      <OverviewStatusOfCookingVariety  data={statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry}
                                       loading={loading}
                                       error={errorMessage}
                                       setQuery={setQuery}  />


      <div className='flex w-full gap-x-6'>
        <OverviewBreadQualityInInspectedUnits data={overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry}
                                              loading={loading}
                                              error={errorMessage}
                                              setQuery={setQuery} />
        <OverviewPublicHealthOfInspectedUnits data={overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry}
                                              loading={loading}
                                              error={errorMessage}
                                              setQuery={setQuery} />
      </div>

    </div>
  );
};

export default Inspection;
