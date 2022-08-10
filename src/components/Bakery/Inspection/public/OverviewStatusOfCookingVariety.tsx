import React, {useState, useEffect} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';
import Highcharts from "highcharts/highstock";
import DatePickerModal from '../../../DatePickerModal';
import Calendar from '../../../Calendar';
import Charts from '../../../Charts';

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

    const converters = {
        fa(number: any) {
          return number.toString().replace(/\d/g, (d: any) => {
            return String.fromCharCode(d.charCodeAt(0) + 1728);
          });
        },
      } as any;
      
      const optionChart = {
        chart: {
          renderTo: 'container',
          type: 'column',
          numberFormatter() {
            // eslint-disable-next-line prefer-rest-params
            const ret = Highcharts.numberFormat.apply(0, arguments as any);
            return converters.fa(ret);
          },
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderRadius: 10,
          },
          column: {
            threshold: null,
            grouping: false,
            shadow: false,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '<h1 style="font-family: IRANSans">%{y}</h1>',
              style: {
                fontSize: '10px',
                fontFamily: 'IRANSans',
              },
              useHTML: true,
            }
          },
        },
        yAxis: {
          gridLineDashStyle: 'dash',
          lineDashStyle: 'dash',
          lineColor: '#000000',
          lineWidth: 1,
          opposite: true,
          title: {
            enabled: false,
          },
          labels: {
            format: '٪{text}',
          },
        },
        xAxis: {
          categories: [],
          type: 'category',
          labels: {
            rotation: 45,
          },
        },
        tooltip: {
          shared: true,
          useHTML: true,
          valueSuffix: ' درصد',
          style: {
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'inherit',
            fontSize: 10,
          },
          borderWidth: 0,
        },
        legend: {
          enabled: false,
        },
      }

      const dataset = {
        categories: [ 'نان سنتی', 'نان خراسانی', 'نان گردان', 'نان تافتون', 'نان بربری', 'نان سنگک' , 'نان لواش'],
        series: [
          {
            name: 'وضعیت تنوع پخت',
            data: [
              {name: 'نان سنتی', y: 75, color: '#7DA6B8'},
              {name: 'نان خراسانی', y: 90, color: '#F3BC06'},
              {name: 'نان گردان', y: 62, color: '#209F92'},
              {name: 'نان تافتون', y: 80, color: '#004D65'},
              {name: 'نان بربری', y: 72, color: '#BFDDE7'},
              {name: 'نان سنگک', y: 80, color: '#716DE3'},
              {name: 'نان لواش', y: 59, color: '#FF0060'},
            ],
          },
        ]
      } as any;

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
                    <HeadlessChart data={dataset} optionsProp={optionChart} />
                {/* )}
                {isEmpty(dataset) && !loading && !errorMessage && (
                <div className="p-40 text-red-500">موردی برای نمایش وجود ندارد.</div>
                )} */}

            </div>
        </fieldset>
  )
}

export default OverviewStatusOfCookingVariety;