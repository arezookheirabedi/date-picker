import React, {useEffect, useState} from 'react';
import Loading from 'src/components/Loading';
import arbaeenService from 'src/services/arbaeen.service';

const Polygon: React.FC<any> = ({params}: any) => {
  const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
  const [loadingPassenger, setLoadingPassenger] = useState<boolean>(false);
  const [dataLocal, setDataLocal] = useState<any>({
    average: null,
    maximum: null,
    minimum: null,
    sum: null,
  });
  // eslint-disable-next-line
  const [dataPassenger, setDataPassenger] = useState<any>({
    average: null,
    maximum: null,
    minimum: null,
    sum: null,
  });

  const fetchPopupDataLocal = async (param: any) => {
    setLoadingLocal(true);
    try {
      const {data: polygonData} = await arbaeenService.getPolygonData(param);
      setDataLocal(polygonData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLocal(false);
    }
  };
  const fetchPopupDataPassenger = async (param: any) => {
    setLoadingPassenger(true);
    try {
      const {data: polygonData} = await arbaeenService.getPolygonData(param);
      setDataPassenger(polygonData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPassenger(false);
    }
  };

  useEffect(() => {
    fetchPopupDataLocal({
      coordinates: [...params.geometry.coordinates[0]].map(x => ({x: x[0], y: x[1]})),
      isPassenger: false,
    });
    fetchPopupDataPassenger({
      coordinates: [...params.geometry.coordinates[0]].map(x => ({x: x[0], y: x[1]})),
      isPassenger: true,
    });
  }, [params]);

  return (
    <>
      {loadingLocal || loadingPassenger ? (
        <div className="flex items-center text-xs">
          <Loading />
          <span>درحال دریافت اطلاعات</span>
        </div>
      ) : (
        <>
          <div className="w-full max-h-60 overflow-y-auto px-2 custom-scrollbar-gray ">
            <div className="flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-1">
              <span className="text-xs ml-2 text-gray-500">مقیم : </span>
            </div>

            {!dataLocal.average && (
              <div className="pt-4 flex justify-start">
                <span className="text-xs">داده‌ای یافت نشد</span>
              </div>
            )}

            {dataLocal.average && (
              <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد متوسط : </span>
                <span className="text-xs text-lime-600">
                  {(dataLocal.average || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}
            {dataLocal.maximum && (
              <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2  text-lime-600">تعداد بیشترین : </span>
                <span className="text-xs text-lime-600">
                  {(dataLocal.maximum || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}

            {dataLocal.minimum && (
              <div className="flex justify-start items-center  pb-1 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد کمترین : </span>
                <span className="text-xs text-lime-600">
                  {(dataLocal.minimum || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}

            {dataLocal.sum && (
              <div className="flex justify-start items-center  pb-1 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد مجموع : </span>
                <span className="text-xs text-lime-600">
                  {(dataLocal.sum || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}

            <div className="mt-4 flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-1">
              <span className="text-xs ml-2 text-gray-500">زائر : </span>
            </div>

            {!dataPassenger.average && (
              <div className="pt-4 flex justify-start">
                <span className="text-xs">داده‌ای یافت نشد</span>
              </div>
            )}

            {dataPassenger.average && (
              <div className="flex justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد متوسط : </span>
                <span className="text-xs text-lime-600">
                  {(dataPassenger.average || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}
            {dataPassenger.maximum && (
              <div className="flex  justify-start items-center border-b border-gray-300 pb-2 pt-2">
                <span className="text-xs ml-2  text-lime-600">تعداد بیشترین : </span>
                <span className="text-xs text-lime-600">
                  {(dataPassenger.maximum || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}

            {dataPassenger.minimum && (
              <div className="flex justify-start items-center  pb-1 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد کمترین : </span>
                <span className="text-xs text-lime-600">
                  {(dataPassenger.minimum || '-').commaSeprator().toPersianDigits()}
                </span>
              </div>
            )}

            {dataPassenger.sum && (
              <div className="flex justify-start items-center  pb-1 pt-2">
                <span className="text-xs ml-2 text-lime-600">تعداد مجموع : </span>
                <span className="text-xs text-lime-600">
                  {(dataPassenger.sum || '-').commaSeprator().toPersianDigits()}
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
