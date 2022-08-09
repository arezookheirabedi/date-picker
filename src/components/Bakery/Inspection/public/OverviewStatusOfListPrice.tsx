

import HeadlessChart from '../HeadlessChart';

const OverviewStatusOfListPrice: React.FC<{}> = () => {
    
    const optionChart = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: '70%'
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
              valueSuffix: '%'
            }
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              size: '70%'
            //   showInLegend: true
            }
        },
        tooltip: {
            shared: true,
            useHTML: true,
            valueSuffix: ' درصد',
            style: {
                textAlign: 'right',
                fontSize: 10,
                fontFamily: 'inherit',
                direction: 'rtl'
            }
        },
        // legend: {
        // 	layout: 'vertical',
        // 	verticlalAlign: 'bottom',
        //     enabled: true,
        //     padding: 3,
        //     itemMarginTop: 10,
        //     itemMarginBottom: 5,
        //     rtl: true,
        //     style: {
        //         fontFamily: 'IRANSans',
        //     },
        //     labelFormat: '<div style="font-family: IRANSans">{name} &nbsp &nbsp &nbsp %{y}</div>'
        // }
    }

    const dataset = {
        categories: ['واحد‌های بازرسی نصب شده', 'واحد‌های بازرسی نصب نشده'],
        series: [
          {
            name: 'وضعیت نرخ نامه',
            data: [
              {name: 'واحد‌های بازرسی نصب شده', y: 54, color: '#175A76', selected: true},
              {name: 'واحد‌های بازرسی نصب نشده', y: 32, color: '#C20A0C', selected: true}
            ],
          },
        ]
      } as any;

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            وضعیت نرخ نامه واحد‌های بازرسی شده در کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <HeadlessChart data={dataset} optionsProp={optionChart} />

                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#175A76'}}/>
                        <span className="font-normal mr-2">واحد‌های بازرسی نصب شده</span>
                    </div>
                    <span className='text-left'>٪۵۴</span>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pt-2 pb-2 mb-10" style={{borderColor: 'rgb(244 244 245)'}}>
                    <div className='flex flex-grow items-center justify-start'>
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#C20A0C'}}/>
                        <span className="font-normal mr-2">واحد‌های بازرسی نصب نشده</span>
                    </div>
                    <span className='text-left'>٪۳۲</span>
                </div>
            </div>
        </fieldset>
    )
}

export default OverviewStatusOfListPrice;