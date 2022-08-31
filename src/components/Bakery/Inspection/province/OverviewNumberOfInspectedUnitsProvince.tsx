import Pie from '../../../../containers/Overview/components/Pie'
import useGetOverviewNumberOfInspectedUnits from "../../../../hooks/apis/inspection/useGetOverviewNumberOfInspectedUnits";

interface OverviewNumberOfInspectedUnitsProvinceProps {
    cityTitle: any
}
  
const OverviewNumberOfInspectedUnitsProvince: React.FC<OverviewNumberOfInspectedUnitsProvinceProps> = ({cityTitle}) => {

    const {list: dataset} = useGetOverviewNumberOfInspectedUnits(true);

    return (
        <fieldset className="text-center border rounded-xl p-4 w-1/2">
            <legend className="text-black mx-auto px-3">
            نگاه کلی به تعداد واحد‌های بازرسی شده فعال و غیرفعال استان {cityTitle}
            </legend>
            {dataset && (
                <div className="align-center flex w-full flex-col justify-center rounded-lg bg-white p-4 shadow pb-10">
                    <Pie data={dataset} name='تعداد واحد‌های بازرسی شده' sign='واحد' />
                    {dataset.map((item: any, index: any) => {
                        return (<div key={index}>
                            <div className="flex flex-grow items-center space-x-5 rtl:space-x-reverse justify-between px-16 pb-2 w-full">
                                <div className="flex flex-grow items-center justify-start">
                                    <div className="w-2 h-2 rounded-full flex justify-center items-center" style={{backgroundColor: item.color}}/>
                                    <span className="font-normal mr-2">{item.title}</span>
                                </div>
                                <span className='text-left'>{Number(item.count).toPersianDigits()} واحد</span>
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

export default OverviewNumberOfInspectedUnitsProvince;