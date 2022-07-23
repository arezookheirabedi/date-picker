import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

import Charts from '../../Charts';
import map from '../../Charts/ir-all.geo.json';
import mapData from '../../Charts/mapData.json';
import {sideCities} from '../../../helpers/utils';
import useHasProvinceResource from '../../../hooks/useHasProvinceResource';

const {Map} = Charts;

interface OverviewMapProps {
  sideCityStatus?: any;
  cityTitle: any;
  selectDefault?: boolean;
  destinationId: any;
}

const OverviewMap: React.FC<OverviewMapProps> = ({
  sideCityStatus,
  selectDefault,
  destinationId,
  cityTitle,
}) => {
  const chartRef = useRef<any>(null);
  const {search, ...location} = useLocation();
  const history = useHistory();
  const [detectResource, setDetectResource] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      map,
      height: '70%',
      className: 'guild-map-chart',
      margin: [0, 0, 50, 0],
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click(e: any) {
              document.getElementById(destinationId)!.scrollIntoView({behavior: 'smooth'});
              history.push({
                search: `?provinceName=${e.point.properties['fa-name']}`,
              });
              // setQueryParams({provinceName: e.point.properties['fa-name']})

              // console.log(e.point.name);
              // history.push({
              //   pathname: '/dresses',
              //   search: '?color=blue'
              // })
            },
          },
        },
      },
    },
    subtitle: {
      text: '',
      floating: true,
      align: 'right',
      y: 50,
      style: {
        fontSize: '16px',
      },
    },
    legend: {
      itemStyle: {
        fontSize: '10px',
        fontWeight: '400',
        color: '#707070',
        transform: 'translate(-10px,20px)',
        direction: 'rtl',
        textAlign: 'right',
      },
      align: 'center',
      verticalAlign: 'bottom',
      squareSymbol: false,
      valueDecimals: 0,
      symbolRadius: 4,
      symbolHeight: 6,
      symbolWidth: 55,
      itemDistance: -40,
    },
    colorAxis: {
      dataClasses: [
        {
          from: 500,
          to: 1000,
          color: '#9e9e9e',
          name: 'بیشتر از ۵۰٪',
        },
        {
          from: 400,
          to: 500,
          color: '#9e9e9e',
          name: '%۲۰ الی ۵۰%',
        },
        {
          from: 300,
          to: 400,
          color: '#9e9e9e',
          name: '%۱۰ الی ۲۰%',
        },
        {
          from: 200,
          to: 300,
          color: '#9e9e9e',
          name: '%۵ الی ۱۰%',
        },
        {
          from: 100,
          to: 200,
          color: '#9e9e9e',
          name: '%۲ الی ۵%',
        },
        {
          from: 1,
          to: 100,
          color: '#9e9e9e',
          name: 'کمتر از ۲%',
        },
      ],
    },

    mapNavigation: {
      enableButtons: false,
      enabled: true,
      enableMouseWheelZoom: false,
      enableDoubleClickZoomTo: false,
      enableDoubleClickZoom: false,
      enableTouchZoom: false,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    tooltip: {
      borderRadius: 16,
      borderWidth: 0,
      valueDecimals: 0,
      style: {
        color: '#fff',
        fontFamily: 'inherit',
      },
      headerFormat: '',
      pointFormat: '<div>{point.properties.fa-name}</div>',
      backgroundColor: {
        linearGradient: [0, 0, 0, 60],
        stops: [
          [0, '#374151'],
          [1, '#6B7280'],
        ],
      },
    },
    series: [
      {
        data: mapData,
        id: 'covid',
        keys: ['hasc', 'value'],
        joinBy: 'hasc',
        name: 'کوید',
        borderColor: '#ffffff',
        borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.properties.fa-name}',
          style: {
            fontWeight: '400',
            color: '#ffffff',
            fontFamily: 'inherit',
            backgroundColor: 'transparent',
          },
        },
        states: {
          select: {
            color: '#3b3b3b',
          },
        },
        allowPointSelect: true,
      },
    ],
  });

  // const query = new URLSearchParams(search);

  useEffect(() => {
    //
    // try {
    //   const selectedPoints = chartRef?.current?.chart.getSelectedPoints();
    //
    //   selectedPoints.forEach((item: any) => {
    //     item.select();
    //   });
    // } catch (error) {
    //   // eslint-disable-next-line
    //   console.log(error);
    // }

    if (detectResource) {
      const data = chartRef?.current?.chart.get('covid').data;
      const params = new URLSearchParams(search);
      const provinceName = params.get('provinceName') || '';
      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });
      if (existsCity) {
        const city = data.find((x: any) => x.properties['fa-name'] === provinceName);
        if (!city.selected) {
          city?.select();
        }
      } else if (selectDefault) {
        const city = data.find((x: any) => x.properties['fa-name'] === 'تهران');
        if (!city.selected) {
          city?.select();
        }
      }
    } else {
      const data = chartRef?.current?.chart.get('covid').data;
      const params = new URLSearchParams(search);
      const provinceName = params.get('provinceName') || '';
      const existsCity = sideCities.some((item: any) => {
        return item.name === provinceName;
      });
      if (existsCity) {
        const city = data.find((x: any) => x.properties['fa-name'] === provinceName);
        if (!city.selected) {
          city?.select();
        }
      } else if (selectDefault) {
        const city = data.find((x: any) => x.properties['fa-name'] === 'تهران');
        if (!city.selected) {
          city?.select();
        }
      }
    }
  }, [search, detectResource]);

  const [hasProvinceResources, resources, provinceResource] = useHasProvinceResource() as any;

  useEffect(() => {
    const provincesThatHaveResources: any = [];
    if (hasProvinceResources) {
      const checkProvinceResources = resources?.find((item: any) => item.name === 'province');
      if (checkProvinceResources) {
        checkProvinceResources.value.forEach((item: any) => {
          sideCities.forEach((province: any) => {
            if (item === province.name) {
              provincesThatHaveResources.push(province.mapId);
            }
          });
        });
        if (provincesThatHaveResources.length) {
          setOptions((prev: any) => {
            return {
              ...prev,
              series: [
                {
                  data: [...provincesThatHaveResources],
                  id: 'covid',
                  keys: ['hasc', 'value'],
                  joinBy: 'hasc',
                  name: 'کوید',
                  borderColor: '#fff',
                  borderWidth: 1,
                  dataLabels: {
                    enabled: true,
                    format: '{point.properties.fa-name}',
                    style: {
                      fontWeight: '400',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                      backgroundColor: 'transparent',
                    },
                  },
                  states: {
                    select: {
                      color: '#3b3b3b',
                    },
                  },
                  allowPointSelect: true,
                },
              ],
            };
          });
          setDetectResource(true);
        }
      }
    }
  }, [hasProvinceResources]);

  return (
    <fieldset className="text-center border rounded-xl p-4">
      <legend className="text-black mx-auto px-3">
        نگاه کلی به لیست زائران {cityTitle ? ` استان‌ ${cityTitle}` : ''}
      </legend>
      <div className="flex w-full rounded-xl bg-white pb-8 pt-8 shadow relative">
        {!!provinceResource.length && provinceResource[0] === '*' && (
          <Link to={location.pathname} className="absolute right-20 top-8 z-40">
            <div className="button button--primary px-5">نمایش وضعیت کل کشور</div>
          </Link>
        )}

        <div className="w-5/6 map-wrapper">
          <Map options={options} ref={chartRef} />
        </div>
        <ul className="w-1/6">
          {sideCityStatus.map((item: any, index: any) => {
            return (
              // eslint-disable-next-line
              <li key={index} className="flex justify-start items-center mb-2.5">
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    borderRadius: '2px',
                  }}
                />
                <span className="text-xs mr-2">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
};

export default OverviewMap;
