
import bluePattern from 'src/assets/images/patterns/pie-blue.svg';
import yellowPattern from 'src/assets/images/patterns/pie-yellow.svg';
import greenPattern from 'src/assets/images/patterns/pie-green.svg';
import Pie from '../../../../containers/Overview/components/Pie'

const OverviewReportOfInspectedUnitsInCountry: React.FC<{}> = () => {
    
    const dataset = [
        {title: 'میزان پخت', count: 54, color: '#175A76', image: bluePattern},
        {title: 'آرد فروشی', count: 32, color: '#F3BC06', image: yellowPattern},
        {title: 'سایر', count: 32, color: '#209F92', image: greenPattern}
    ]

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            نگاه کلی به گزارش واحد‌های بازرسی شده در کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <Pie data={dataset} name='گزارش واحد‌' sign='درصد' />
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#175A76'}}/>
                        <span className="font-normal mr-2">میزان پخت</span>
                    </div>
                    <span className='text-left'>٪۵۴</span>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#F3BC06'}}/>
                        <span className="font-normal mr-2">آرد فروشی</span>
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
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#209F92'}}/>
                        <span className="font-normal mr-2">سایر</span>
                    </div>
                    <span className='text-left'>٪۳۲</span>
                </div>
            </div>
        </fieldset>
    )
}

export default OverviewReportOfInspectedUnitsInCountry;