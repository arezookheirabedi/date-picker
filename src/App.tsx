import './styles/style.scss';
import './App.css';
import React, { useState } from 'react';
import "src/helpers/prototypes"
import { utils } from 'react-modern-calendar-datepicker';
import { Form } from './components/form';
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
  console.log(query,"iiiiiiiiiiiiiiiiiiiii")
  return(
    <div className="flex space-x-3 rtl:space-x-reverse">
          <div className="w-32">
      <div >
   
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
