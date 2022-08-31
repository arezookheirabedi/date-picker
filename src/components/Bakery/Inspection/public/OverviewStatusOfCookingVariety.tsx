import React, {useState, useEffect} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import DatePickerModal from '../../../DatePickerModal';
import Calendar from '../../../Calendar';
import Charts from '../../../Charts';
import useGetOverviewStatusOfCookingVariety from "../../../../hooks/apis/inspection/useGetOverviewStatusOfCookingVariety";

const {HeadlessChart} = Charts;

const OverviewStatusOfCookingVariety = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    }) as any;

    const [query, setQuery] = useState({
        from: null,
        to: null,
    });

    const focusFromDate = () => {
        setShowDatePicker(true);
      };

      useEffect(() => {
        if (selectedDayRange.from && selectedDayRange.to) {
          const finalFromDate = `${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`;
          const finalToDate = `${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`;
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

    const {list: dataset, optionChart : options} = useGetOverviewStatusOfCookingVariety();

    return (
        <fieldset className="text-center border rounded-xl p-4 mb-16">
            <legend className="text-black mx-auto px-3">
            وضعیت تنوع پخت در واحد‌های بازرسی شده در کل کشور
            </legend>
            <div className="flex flex-col align-center justify-center w-full rounded-lg bg-white p-4 shadow">
                <div className="flex items-center justify-between mb-10 mt-6">
                    <div className="flex align-center justify-start space-x-6 rtl:space-x-reverse flex-grow px-8">
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
                    <div>
                        <div className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                            <div
                                className="flex flex-col justify-end md:flex-row space-y-4 md:space-y-0 md:space-x-2 rtl:space-x-reverse">
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#FF0060'}}/>
                                <span>نان لواش</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#209F92'}}/>
                                <span>نان گردان</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#7DA6B8'}}/>
                                <span>نان سنتی</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#F3BC06'}}/>
                                <span>نان خراسانی</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#004D65'}}/>
                                <span>نان تافتون</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#BFDDE7'}}/>
                                <span>نان بربری</span>
                                </div>
                                <div className="inline-flex flex-col justify-center items-center space-y-2">
                                <div className="w-20 h-2 rounded" style={{backgroundColor: '#716DE3'}}/>
                                <span>نان سنگک</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ‍   {loading && (
                <div className="p-40">
                <Spinner />
                </div>
                )}
                {!loading && !isEmpty(dataset) && !errorMessage && ( */}
                    <HeadlessChart data={dataset} optionsProp={options} />
                {/* )}
                {isEmpty(dataset) && !loading && !errorMessage && (
                <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
                )} */}

            </div>
        </fieldset>
  )
}

export default OverviewStatusOfCookingVariety;