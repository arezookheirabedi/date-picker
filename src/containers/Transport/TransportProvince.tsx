import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
// import {useLocation} from "react-router-dom";

import OverviewDriversMap from "../../components/Transport/OverviewDriversMap";
import OverviewDriversProvince from "../../components/Transport/OverviewDriversProvince";


import OverviewPublicPatientsProvince from "../../components/Transport/OverviewPublicPatientsProvince";
import TestsInTransportProvince from "../../components/Transport/TestsInTransportProvince";
import OverviewCategoriesProvince from "../../components/Transport/OverviewCategoriesProvince";
import OverviewOfVaccinationInPublicTransportProvince
  from "../../components/Transport/OverviewOfVaccinationInPublicTransportProvince";


const sideCities = [
  {
    name: "هرمزگان",
    color: "#ccc"
  },
  {
    name: "بوشهر",
    color: "#ccc"
  },
  {
    name: "کهگیلویه و بویراحمد",
    color: "#ccc"
  },
  {
    name: "فارس",
    color: "#ccc"
  },
  {
    name: "اصفهان",
    color: "#ccc"
  },
  {
    name: "سمنان",
    color: "#ccc"
  },
  {
    name: "گلستان",
    color: "#ccc"
  },
  {
    name: "مازندران",
    color: "#ccc"
  },
  {
    name: "تهران",
    color: "#ccc"
  },
  {
    name: "مرکزی",
    color: "#ccc"
  },
  {
    name: "یزد",
    color: "#ccc"
  },
  {
    name: "چهارمحال و بختیاری",
    color: "#ccc"
  },
  {
    name: "خوزستان",
    color: "#ccc"
  },
  {
    name: "لرستان",
    color: "#ccc"
  },
  {
    name: "ایلام",
    color: "#ccc"
  },
  {
    name: "اردبیل",
    color: "#ccc"
  },
  {
    name: "قم",
    color: "#ccc"
  },
  {
    name: "همدان",
    color: "#ccc"
  },
  {
    name: "زنجان",
    color: "#ccc"
  },
  {
    name: "قزوین",
    color: "#ccc"
  },
  {
    name: "آذربایجان غربی",
    color: "#ccc"
  },
  {
    name: "آذربایجان شرقی",
    color: "#ccc"
  },
  {
    name: "کرمانشاه",
    color: "#ccc"
  },
  {
    name: "گیلان",
    color: "#ccc"
  },
  {
    name: "کردستان",
    color: "#ccc"
  },
  {
    name: "خراسان جنوبی",
    color: "#ccc"
  },
  {
    name: "خراسان رضوی",
    color: "#ccc"
  },
  {
    name: "خراسان شمالی",
    color: "#ccc"
  },
  {
    name: "سیستان و بلوچستان",
    color: "#ccc"
  },
  {
    name: "کرمان",
    color: "#ccc"
  },
  {
    name: "البرز",
    color: "#ccc"
  },
]


const TransportProvince = () => {
  const location = useLocation();


  const [cityTitle, setCityTitle] = useState('تهران');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') as any;
    // console.log(provinceName)
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    })

    if (existsCity) {
      setCityTitle(provinceName);
    }
  }, [location.search])


  return (
    <div className="space-y-16 mb-8">
      <OverviewDriversMap cityTitle={cityTitle} sideCityStatus={sideCities} destinationId="province-overview"/>
      <OverviewDriversProvince cityTitle={cityTitle}/>
      <OverviewCategoriesProvince cityTitle={cityTitle}/>
      <OverviewPublicPatientsProvince cityTitle={cityTitle}/>
      <OverviewOfVaccinationInPublicTransportProvince cityTitle={cityTitle}/>
      <TestsInTransportProvince cityTitle={cityTitle}/>
    </div>
  )
}

export default TransportProvince;