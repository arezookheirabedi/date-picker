
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import orangePattern from 'src/assets/images/patterns/pie-orange.svg';
import Pie from '../../../../containers/Overview/components/Pie'

const OverviewStatusOfBreadSupplyPrice: React.FC<{}> = () => {
    
    const dataset = [
        {title: 'واحد‌های به قیمت مصوب', count : 23, color: '#07816C', image: greenPattern},
        {title: 'واحد‌های به قیمت غیر مصوب', count: 74, color: '#F38C06', image: orangePattern}
    ]

    //     // legend: {
    //     // 	layout: 'vertical',
    //     // 	verticlalAlign: 'bottom',
    //     //     enabled: true,
    //     //     padding: 3,
    //     //     itemMarginTop: 10,
    //     //     itemMarginBottom: 5,
    //     //     rtl: true,
    //     //     style: {
    //     //         fontFamily: 'IRANSans',
    //     //     },
    //     //     labelFormat: '<div style="font-family: IRANSans">{name} &nbsp &nbsp &nbsp %{y}</div>'
    //     // }
    // }

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            وضعیت قیمت عرضه نان در واحدهای بازرسی شده کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <Pie data={dataset} name='وضعیت قیمت عرضه نان' sign='واحد' />
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