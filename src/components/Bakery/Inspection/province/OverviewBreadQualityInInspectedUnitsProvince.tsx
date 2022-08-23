import Pie from '../../../../containers/Overview/components/Pie'
import useGetOverviewBreadQualityInInspectedUnits from "../../../../hooks/apis/inspection/useGetOverviewBreadQualityInInspectedUnits";

interface OverviewBreadQualityInInspectedUnitsProvinceProps {
    cityTitle: any;
  }
  
  const OverviewBreadQualityInInspectedUnitsProvince: React.FC<OverviewBreadQualityInInspectedUnitsProvinceProps> = ({cityTitle}) => {

    const {list: dataset} = useGetOverviewBreadQualityInInspectedUnits(true);

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            نگاه کلی به کیفیت نان در واحدهای بازرسی شده استان {cityTitle}
            </legend>
            <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow">
                <Pie data={dataset} name='کیفیت نان' sign='درصد' />
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#07816C'}}/>
                            <span className="font-normal mr-2">خوب</span>
                    </div>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                    <div className="flex flex-grow items-center justify-start">
                            <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#F3BC06'}}/>
                            <span className="font-normal mr-2">متوسط</span>
                    </div>
                </div>
                <div className="flex flex-grow relative space-x-5">
                    <span className="h-px bottom-0 absolute inset-x-28"
                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                </div>
                <div 
                    className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pt-2 pb-2 mb-10" style={{borderColor: 'rgb(244 244 245)'}}>
                    <div className='flex flex-grow items-center justify-start'>
                        <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: '#C20A0C'}}/>
                            <span className="font-normal mr-2">ضعیف</span>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export default OverviewBreadQualityInInspectedUnitsProvince;