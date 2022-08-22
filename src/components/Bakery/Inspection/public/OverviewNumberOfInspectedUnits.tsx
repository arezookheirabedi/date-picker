
import greenPattern from 'src/assets/images/patterns/pie-dark-green.svg';
import grayPattern from 'src/assets/images/patterns/pie-gray.svg';
import Pie from '../../../../containers/Overview/components/Pie'

const OverviewNumberOfInspectedUnits: React.FC<{}> = () => {
    
    const dataset = [
        {title: 'واحد‌های بازرسی شده فعال', count : 54, color: '#07816C', image: greenPattern},
        {title: 'واحد‌های بازرسی شده غیرفعال', count: 32, color: '#8A8A8A', image: grayPattern}
    ]
    
    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            نگاه کلی به تعداد واحد‌های بازرسی شده فعال و غیرفعال کل کشور
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-8 shadow">
                <Pie data={dataset} name='تعداد واحد‌های بازرسی شده' sign='واحد' />
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#07816C'}}/>
                        <span className="font-normal mr-2">واحد‌های بازرسی شده فعال</span>
                    </div>
                    <span className='text-left'>۵۴ واحد</span>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pt-2 pb-2 mb-10" style={{borderColor: 'rgb(244 244 245)'}}>
                    <div className='flex flex-grow items-center justify-start'>
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#8A8A8A'}}/>
                        <span className="font-normal mr-2">واحد‌های بازرسی شده غیرفعال</span>
                    </div>
                    <span className='text-left'>۳۲ واحد</span>
                </div>
            </div>
        </fieldset>
    )
}

export default OverviewNumberOfInspectedUnits;