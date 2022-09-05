import React, {useEffect, useState} from 'react';
import Loading from 'src/components/Loading';
import arbaeenService from 'src/services/arbaeen.service';
import qs from 'qs';

const Polygon: React.FC<any> = ({params}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    location: null,
    numberOfAvailableAmbulances: null,
    numberOfAvailableAutolances: null,
    numberOfAvailableMotolances: null,
  });

  const fetchPopupData = async (param: any) => {
    setLoading(true);
    try {
      const {data: polygonData} = await arbaeenService.getPolygonData(encodeURI(param));
      setData(polygonData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopupData(
      qs.stringify(
        {
          coordinates: [...params.geometry.coordinates[0]].map(x => ({x: x[0], y: x[1]})),
        },
        {arrayFormat: 'indices', allowDots: true}
      )
    );
  }, [params]);

  return (
    <>
      {loading ? (
        <div className="flex items-center text-xs">
          <Loading />
          <span>درحال دریافت اطلاعات</span>
        </div>
      ) : (
        <>
          <div className="hidden">{JSON.stringify(params, null, 2)}</div>
          <div className="w-full max-h-60 overflow-y-auto px-2 custom-scrollbar-gray ">
            <div className="flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-1">
              <span className="text-xs ml-2 text-gray-500">موقعیت : </span>
              <span className="text-xs text-gray-500">{params.location}</span>
            </div>

            {!data.numberOfAvailableAmbulances && (
              <div className="pt-4 flex justify-start">
                <span className="text-xs">داده‌ای یافت نشد</span>
              </div>
            )}

            {data.numberOfAvailableAmbulances && (
              <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد آمبولانس : </span>
                <span className="text-xs text-lime-600">
                  {data.numberOfAvailableAmbulances || '-'}
                </span>
              </div>
            )}

            {data.numberOfAvailableAutolances && (
              <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2  text-lime-600">تعداد اتولانس : </span>
                <span className="text-xs text-lime-600">
                  {data.numberOfAvailableAutolances || '-'}
                </span>
              </div>
            )}

            {data.numberOfAvailableMotolances && (
              <div className="flex justify-start items-center  pb-1 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد موتولانس : </span>
                <span className="text-xs text-lime-600">
                  {data.numberOfAvailableMotolances || '-'}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Polygon;
