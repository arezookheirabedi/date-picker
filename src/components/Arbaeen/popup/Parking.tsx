/* eslint-disable */

import React, {useEffect, useState} from "react";
import Loading from "../../Loading";

import arbaeenService from "../../../services/arbaeen.service";
import {
  convertGregorianDateToJalaliDateWithHourAndMinute
} from "../../../helpers/utils";


const Parking: React.FC<any> = ({params}: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    description: null,
  })


  const fetchPopupData = async (param: any) => {
    setLoading(true);
    try {
      const {data} = await arbaeenService.getParking(param);
      setData(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPopupData(params.id);
  }, [params]);

  return (
    <>
      {loading ? (
        <div className="flex items-center text-xs">
          <Loading/>
          <span>درحال دریافت اطلاعات</span>
        </div>
      ) : (
        <>
          <div className="hidden">{JSON.stringify(params, null, 2)}</div>
          <div className="w-full max-h-60 overflow-y-auto px-2 custom-scrollbar-gray ">

            <div className="flex item-center justify-start items-center border-b border-gray-300 pb-2 pt-1">
              <span className="text-xs ml-2 text-gray-500">نام : </span>
              <span className="text-xs ">{params.name}</span>
            </div>

            {
              data.description && (
                <div className="flex justify-start items-center  pb-2 pt-2">
                  <span className="text-xs ml-2 text-gray-500">توضیحات : </span>
                  <span className="text-xs ">{data.description || '-'}</span>
                </div>
              )
            }
          </div>
        </>
      )}
    </>
  );
}

export default Parking;