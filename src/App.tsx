/* eslint-disable no-console */
import './styles/style.scss';
import React, { useState } from 'react';
import "src/helpers/prototypes"
import { utils } from 'react-modern-calendar-datepicker';
import DatepickerQuery from './shared/DatepickerQuery';


const App: React.FC<any> = () => {
  const [query, setQuery] = useState({
    from: null,
    to: null,
   
  });
  const minimumDate = {
    year: 2025,
    month: 1,
    day: 1
  };

  const maximumDate = {
    year: 2025,
    month: 1,
    day: 21
  }
  console.log(query,"the query object is here")
  return(
    <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-32">
      <div >
   {JSON.stringify(query, null, 2)
   }
     <div >
              <DatepickerQuery query={query} setQuery={setQuery} minDate={utils("fa").getToday()}
     // maxDate={maximumDate}
      />
            </div>
  </div>
  </div>
  </div>
 
);
}

export default App;
