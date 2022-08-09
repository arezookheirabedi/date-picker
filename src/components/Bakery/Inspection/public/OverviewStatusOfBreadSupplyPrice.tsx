

import HeadlessChart from '../HeadlessChart';

const OverviewStatusOfBreadSupplyPrice: React.FC<{}> = () => {
    
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
            valueSuffix: ' واحد',
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
        categories: ['واحد‌های به قیمت مصوب', 'واحد‌های به قیمت غیر مصوب'],
        series: [
          {
            name: 'وضعیت قیمت عرضه نان',
            data: [
              {name: 'واحد‌های به قیمت مصوب', y: 23, color: '#07816C', selected: true},
              {name: 'واحد‌های به قیمت غیر مصوب', y: 74, color: '#F38C06', selected: true}
            ],
          },
        ]
      } as any;

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            وضعیت قیمت عرضه نان در واحدهای بازرسی شده کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <HeadlessChart data={dataset} optionsProp={optionChart} />

                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#07816C'}}/>
                        <span className="font-normal mr-2">واحد‌های به قیمت مصوب</span>
                    </div>
                    <span className='text-left'>۲۳ واحد</span>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pt-2 pb-2 mb-10" style={{borderColor: 'rgb(244 244 245)'}}>
                    <div className='flex flex-grow items-center justify-start'>
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#F38C06'}}/>
                        <span className="font-normal mr-2">واحد‌های به قیمت غیر مصوب</span>
                    </div>
                    <span className='text-left'>۷۴ واحد</span>
                </div>
            </div>
        </fieldset>
    )
}

export default OverviewStatusOfBreadSupplyPrice;