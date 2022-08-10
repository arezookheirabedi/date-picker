

import redPattern from 'src/assets/images/patterns/pie-red.svg';
import bluePattern from 'src/assets/images/patterns/pie-blue.svg';
import Pie from '../../../../containers/Overview/components/Pie'

const OverviewStatusOfListPrice: React.FC<{}> = () => {
    

      const dataset = [
        {title: 'واحد‌های بازرسی نصب شده', count: 54, color: '#175A76', image: bluePattern},
        {title: 'واحد‌های بازرسی نصب نشده', count: 32, color: '#C20A0C', image: redPattern}
    ]

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            وضعیت نرخ نامه واحد‌های بازرسی شده در کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <Pie data={dataset} name='وضعیت نرخ نامه' sign='درصد' />
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