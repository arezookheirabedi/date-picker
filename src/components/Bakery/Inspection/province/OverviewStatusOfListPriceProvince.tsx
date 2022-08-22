import Pie from '../../../../containers/Overview/components/Pie'
import useGetOverviewStatusOfListPrice from "../../../../hooks/apis/inspection/useGetOverviewStatusOfListPrice";

interface OverviewStatusOfListPriceProvinceProps {
    cityTitle: any;
}
  
const OverviewStatusOfListPriceProvince: React.FC<OverviewStatusOfListPriceProvinceProps> = ({cityTitle}) => {

    const {list: dataset} = useGetOverviewStatusOfListPrice(true);
 
    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            وضعیت نرخ نامه واحد‌های بازرسی شده در استان {cityTitle}
            </legend>
            {dataset && (
                <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow pb-8">
                    <Pie data={dataset} name='وضعیت نرخ نامه' sign='درصد' />
                    {dataset.map((item: any, index: any) => {
                        return (<div key={index}>
                            <div className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                                <div className="flex flex-grow items-center justify-start">
                                    <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: item.color}}/>
                                    <span className="font-normal mr-2">{item.title}</span>
                                </div>
                                <span className='text-left'>{Number(item.count).toPersianDigits()}٪</span>
                            </div>
                            {index === 0 && (
                                <div className="flex flex-grow relative space-x-5 my-3">
                                    <span className="h-px bottom-0 absolute inset-x-28"
                                        style={{background: 'linear-gradient(90deg, #ffffff 0%, #D5D5D5 50%, #ffffff 100%) 0% 0%'}}/>
                                </div>
                            )}
                        </div>)
                    })}
                </div>
            )}
        </fieldset>
    )
}

export default OverviewStatusOfListPriceProvince;