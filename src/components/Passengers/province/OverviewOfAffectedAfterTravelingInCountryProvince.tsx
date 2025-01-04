import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import axios from 'axios';
// @ts-ignore
import moment from 'moment-jalaali';
// import {Menu} from '@headlessui/react';
// import {ReactComponent as DownIcon} from '../../../assets/images/icons/down.svg';
import DatePickerModal from '../../DatePickerModal';
// import calendar from '../../../assets/images/icons/calendar.svg';
import RangeDateSliderFilter from '../../RangeDateSliderFilter';
import Charts from '../../Charts';
// import {transportationTypes} from '../../../helpers/utils';
import Spinner from '../../Spinner';
import Calendar from '../../Calendar';
import {sideCities} from "../../../helpers/utils";
import {EERRORS} from "../../../constants/errors.enum";
import RetryButton from "../../RetryButton";


const {Line} = Charts;

interface OverviewOfAffectedAfterTravelingInCountryProvinceProps {
  cityTitle: any
}

const OverviewOfAffectedAfterTravelingInCountryProvince: React.FC<OverviewOfAffectedAfterTravelingInCountryProvinceProps> = ({cityTitle}) => {
  const [data, setData] = useState([]);
  // const [serviceType, setServiceType] = useState(null) as any;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  }) as any;

  const {CancelToken} = axios;
  const source = CancelToken.source();

  const focusFromDate = () => {
    setShowDatePicker(true);
  };

  const [query, setQuery] = useState({
    // status: 'POSITIVE',
    timeBoxType: 'DAILY',
    from: null,
    to: null,
    retry : false
  });

  

  // const getLinearOverviewPublicTransport = async (params: any) => {
  //   setLoading(true);
  //   setErrorMessage(null);
  //   try {
  //     const response = await transportService.linearOverviewPublicTransport(params, {
  //       cancelToken: source.token,
  //     });
  //     setData(response.data);
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //     // eslint-disable-next-line
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
      const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
      // const m = moment(finalFromDate, 'jYYYY/jM/jD'); // Parse a Jalaali date
      // console.log(moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-M-DTHH:mm:ss'));
      setQuery({
        ...query,
        from: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
        to: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
      });
    }
    if (selectedDayRange.clear) {
      setQuery({
        ...query,
        from: null,
        to: null,
      });
    }
  }, [selectedDayRange]);

  // useEffect(() => {
  //   if (selectedDayRange.from && selectedDayRange.to) {
  //     const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
  //     const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;

  //     const tmp: any[] = [];
  //     let lastState = 'ANNUAL';

  //     const start = moment(finalFromDate, 'jYYYY/jM/jD');
  //     const end = moment(finalToDate, 'jYYYY/jM/jD');

  //     const duration = moment.duration(end.diff(start));

  //     if (!duration.years()) {
  //       tmp.push(3);
  //       lastState = 'MONTHLY';
  //     }

  //     if (!duration.months() && !duration.years()) {
  //       tmp.push(2);
  //       lastState = 'WEEKLY';
  //     }

  //     if (!duration.weeks() && !duration.months() && !duration.years()) {
  //       tmp.push(1);
  //       lastState = 'DAILY';
  //     }

  //     setQueryParams({
  //       ...queryParams,
  //       type: lastState,
  //       fromDate: moment(finalFromDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //       toDate: moment(finalToDate, 'jYYYY/jM/jD').format('YYYY-MM-DD'),
  //     });
  //   } else {
  //     setQueryParams({
  //       ...queryParams,
  //       type: 'MONTHLY',
  //       fromDate: null,
  //       toDate: null,
  //     });
  //   }
  // }, [selectedDayRange]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به مبتلا شدگان بعد از سفر در استان &nbsp;
        {cityTitle}
      </legend>
      <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex align-center justify-start flex-grow px-8">
            {/* <Menu */}
            {/*  as="div" */}
            {/*  className="relative z-20 inline-block text-left shadow-custom rounded-lg px-5 py-1 " */}
            {/* > */}
            {/*  <div> */}
            {/*    <Menu.Button className="inline-flex justify-between items-center w-full py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"> */}
            {/*      /!* <div className="flex items-center flex-row-reverse xl:flex-row"> *!/ */}
            {/*      /!* <img src={avatar} alt="z" className="w-5 h-5" /> *!/ */}
            {/*      <span className="ml-10 whitespace-nowrap truncate"> */}
            {/*        {serviceType?.name || 'کل حمل و نقل'} */}
            {/*      </span> */}
            {/*      <DownIcon className="h-2 w-2.5 mr-2" /> */}
            {/*    </Menu.Button> */}
            {/*  </div> */}
            {/*  <Menu.Items className="z-40 absolute left-0 xl:right-0 w-52 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
            {/*    <div className="px-1 py-1 "> */}
            {/*      {transportationTypes.map((value: any, index: any) => { */}
            {/*        return ( */}
            {/*          // eslint-disable-next-line */}
            {/*          <Menu.Item key={index}> */}
            {/*            {({active}) => ( */}
            {/*              <button */}
            {/*                type="button" */}
            {/*                className={`${ */}
            {/*                  active ? 'bg-gray-100' : '' */}
            {/*                } text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm whitespace-nowrap`} */}
            {/*                onClick={() => { */}
            {/*                  setServiceType(value); */}
            {/*                  setQuery({ */}
            {/*                    ...query, */}
            {/*                    categoryValue: value.enName, */}
            {/*                  }); */}
            {/*                }} */}
            {/*              > */}
            {/*                /!* <IconWrapper className="w-4 h-4 ml-3" name="exit" /> *!/ */}
            {/*                {value.name} */}
            {/*              </button> */}
            {/*            )} */}
            {/*          </Menu.Item> */}
            {/*        ); */}
            {/*      })} */}
            {/*    </div> */}
            {/*  </Menu.Items> */}
            {/* </Menu> */}
            <div className="flex align-center justify-between">
              {showDatePicker ? (
                <DatePickerModal
                  setSelectedDayRange={setSelectedDayRange}
                  selectedDayRange={selectedDayRange}
                  setShowDatePicker={setShowDatePicker}
                  showDatePicker
                />
              ) : null}
              <Calendar
                action={focusFromDate}
                from={selectedDayRange.from}
                to={selectedDayRange.to}
                setSelectedDayRange={setSelectedDayRange}
              />
            </div>
          </div>

          <RangeDateSliderFilter
            changeType={v =>
              setQuery({
                ...query,
                timeBoxType: v,
              })
            }
            selectedType={query.timeBoxType}
            dates={selectedDayRange}
            wrapperClassName="w-1/4"
          />
        </div>

        {loading && (
          <div className="p-40">
            <Spinner/>
          </div>
        )}
        {errorMessage && !loading &&(
          <div className="p-40">
            <div className="text-red-500">{errorMessage}</div>
            <RetryButton setQuery={setQuery}/>
          </div>
        )}
        {!loading && data.length > 0 && !errorMessage && <Line data={data}/>}
        {data.length === 0 && !loading && !errorMessage && (
          <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
        )}
      </div>
    </fieldset>
  );
};

export default OverviewOfAffectedAfterTravelingInCountryProvince;

