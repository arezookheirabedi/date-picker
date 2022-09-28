import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import inspectionService from '../../../services/inspection.service';
import {sideCities} from '../../../helpers/utils';
import {EERRORS} from "../../../constants/errors.enum";
import bluePattern from "../../../assets/images/patterns/pie-blue.svg";
import redPattern from "../../../assets/images/patterns/pie-red.svg";
import greenPattern from "../../../assets/images/patterns/pie-green.svg";
import orangePattern from "../../../assets/images/patterns/pie-orange.svg";
import yellowPattern from "../../../assets/images/patterns/pie-yellow.svg";

export default function useGetOverviewInspectionStatus(query: any, hasProvince: boolean = false) {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const [overviewOfTheReportOfInspectedUnitsInTheWholeCountry, setOverviewOfTheReportOfInspectedUnitsInTheWholeCountry] = useState<any>([]);
  const [overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry, setOverviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry] = useState<any>([]);
  const [overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart, setOverviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart] = useState<any>(null);
  const [statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry, setStatusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry] = useState<any>([]);
  const [statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry, setStatusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry] = useState<any>(null);
  const [overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry, setOverviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry] = useState<any>([]);

  const {CancelToken} = axios;
  const source = CancelToken.source();


  const getInspectionStatus = async (province: any = null) => {
    setLoading(true);
    setError(false);
    try {
      const {data: result} = await inspectionService.reports(
        {tag: 'transport', province},
        {cancelToken: source.token}
      );
      setData(result);

      setOverviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry([
        {title: 'خوب', count: result.highQualityGeneralHygienePercentage, color: '#07816C', image: greenPattern, health: true},
        {title: 'متوسط', count: result.mediumQualityGeneralHygienePercentage, color: '#F3BC06', image: yellowPattern, health: true},
        {title: 'ضعیف', count: result.lowQualityGeneralHygienePercentage, color: '#C20A0C', image: redPattern, health: true},
        {title: 'خوب', count: result.highQualityBreadPercentage, color: '#07816C', image: greenPattern, quality: true},
        {title: 'متوسط', count: result.mediumQualityBreadPercentage, color: '#F3BC06', image: yellowPattern, quality: true},
        {title: 'ضعیف', count: result.lowQualityBreadPercentage, color: '#C20A0C', image: redPattern, quality: true},
      ]);

      setStatusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry({
        categories: ['نان فانتزی', 'نان خراسانی', 'نان گردان', 'نان تافتون', 'نان بربری', 'نان سنگک', 'نان لواش'],
        series: [
          {
            name: 'وضعیت تنوع پخت',
            data: [
              {name: 'نان فانتزی', y: result.fanteziBreadTypePercentage, color: '#7DA6B8'},
              {name: 'نان خراسانی', y: result.khorasaniBreadTypePercentage, color: '#F3BC06'},
              {name: 'نان گردان', y: result.gardanBreadTypePercentage, color: '#209F92'},
              {name: 'نان تافتون', y: result.taftounBreadTypePercentage, color: '#004D65'},
              {name: 'نان بربری', y: result.barbariBreadTypePercentage, color: '#BFDDE7'},
              {name: 'نان سنگک', y: result.sangakBreadTypePercentage, color: '#716DE3'},
              {name: 'نان لواش', y: result.lavashBreadTypePercentage, color: '#FF0060'},
            ],
          },
        ]
      })
      setOverviewOfTheReportOfInspectedUnitsInTheWholeCountry([
        {
          title: 'میزان پخت',
          count: result.bakeryReportSubjectMizanePokhtPercentage,
          color: '#175A76',
          image: '/static/media/pie-blue.98112834.svg'
        },
        {
          title: 'آرد فروشی',
          count: result.bakeryReportSubjectArdForoushiPercentage,
          color: '#F3BC06',
          image: '/static/media/pie-yellow.41245a0f.svg'
        },
        {
          title: 'سایر',
          count: result.bakeryReportSubjectSayerPercentage,
          color: '#209F92',
          image: '/static/media/pie-green.e9cab3af.svg'
        },
      ])

      setOverviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry([
        {
          title: "واحد‌های بازرسی شده فعال",
          count: result.activeUnitsPercentage,
          color: "#07816C",
          image: "/static/media/pie-green.e9cab3af.svg"
        },
        {
          title: "واحد‌های بازرسی شده غیرفعال",
          count: result.inactiveUnitsPercentage,
          color: "#8A8A8A",
          image: "/static/media/pie-gray.e30581b2.svg"
        }
      ]);

      setStatusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry([
        {
          title: 'واحد‌های بازرسی نصب شده',
          count: result.unitsThatInstalledPriceListPercentage,
          color: '#175A76',
          image: bluePattern,
          priceLetter: true
        },
        {
          title: 'واحد‌های بازرسی نصب نشده',
          count: result.unitsThatNotInstalledPriceListPercentage,
          color: '#C20A0C',
          image: redPattern,
          priceLetter: true
        },
        {
          title: 'واحد‌های به قیمت مصوب',
          count: result.unitsHaveApprovedPricePercentage,
          color: '#07816C',
          image: greenPattern
        },
        {
          title: 'واحد‌های به قیمت غیر مصوب',
          count: result.unitsHaveUnapprovedPricePercentage,
          color: '#F38C06',
          image: orangePattern
        }
      ])

      setOverviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart({
        categories: ['بازرسی های ادواری', 'بازرسی های مردمی', 'بازرسی های دستوری'],
        series: [
          {
            name: 'گزارش',
            data: [
              {name: 'بازرسی های ادواری', y: result.periodicInspectionTypePercentage, color: '#F3BC06'},
              {name: 'بازرسی های مردمی', y: result.peopleInspectionTypePercentage, color: '#209F92'},
              {name: 'بازرسی های دستوری', y: result.orderInspectionTypePercentage, color: '#004D65'},
            ]
          }
        ],
      })
      setError(false);
      setLoading(false);
    } catch (err: any) {
      if (err.message === 'cancel') {
        setLoading(true);
        return;
      }
      setError(err.message || EERRORS.ERROR_500);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasProvince) return;
    getInspectionStatus();
    // eslint-disable-next-line consistent-return
    return () => {
      setData([]);
      source.cancel('Operation canceled by the user.');
    };
  }, [query]);

  const location = useLocation();

  useEffect(() => {
    if (!hasProvince) return;
    const params = new URLSearchParams(location.search);
    const provinceName = params.get('provinceName') || ('تهران' as any);
    const existsCity = sideCities.some((item: any) => {
      return item.name === provinceName;
    });
    if (existsCity) {
      getInspectionStatus(provinceName);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      source.cancel('Operation canceled by the user.');
      setData([]);
    };
  }, [location.search, query]);

  return {
    loading,
    error,
    data,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountry,
    overviewOfTheNumberOfActiveAndInactiveInspectedUnitsOfTheEntireCountry,
    overviewOfTheReportOfInspectedUnitsInTheWholeCountryColumnChart,
    statusOfThePriceLetterAndTheSupplyPriceOfBreadOfTheInspectedUnitsInTheWholeCountry,
    statusOfBakingVarietyInTheInspectedUnitsInTheWholeCountry,
    overviewOfTheQualityAndHealthInTheInspectedUnitsInTheWholeCountry
  };
}
