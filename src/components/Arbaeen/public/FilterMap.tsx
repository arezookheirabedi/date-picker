/* eslint-disable */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  setRTLTextPlugin,
  _MapContext as MapContext,
  StaticMap,
  Popup,
  FullscreenControl,
} from 'react-map-gl';
// import {HexagonLayer} from '@deck.gl/aggregation-layers/typed';
// import DeckGL from '@deck.gl/react/typed';
// @ts-ignore
import DeckGL, {FlyToInterpolator} from 'deck.gl';

// @ts-ignore
import {PolygonLayer, PathLayer, IconLayer, ScatterplotLayer} from '@deck.gl/layers';
import {borders} from '../geos/borders';
import {roads} from '../geos/roads';
import {airports} from '../geos/airport';
import {emergencies} from '../geos/emergencies';
import {mokebs} from '../geos/mokebs';
import {parkings} from '../geos/parkings';
import {redCrescent} from '../geos/red-crescent';
import {PickingInfo} from '@deck.gl/core/typed';
import Loading from 'src/components/Loading';
import {EditableGeoJsonLayer} from '@nebula.gl/layers';
import {ViewMode, DrawPolygonMode} from '@nebula.gl/edit-modes';
import {HeatmapLayer} from '@deck.gl/aggregation-layers/typed';
import {useSelector} from 'src/hooks/useTypedSelector';

import airportIcon from '../../../assets/images/markers/airport-icon.svg';
import mokebIcon from '../../../assets/images/markers/mokeb-icon.svg';
import emergencyIcon from '../../../assets/images/markers/emergency.svg';
import parkingIcon from '../../../assets/images/markers/parking-icon.svg';
import redCrescentIcon from '../../../assets/images/markers/red-crescent-icon.svg';
import mapSelectIcon from '../../../assets/images/icons/map-select.svg';
import mapDrawIcon from '../../../assets/images/icons/map-draw.svg';

import Road from '../popup/Road';
import Mokeb from '../popup/Mokeb';
import Border from '../popup/‌Border';
import Airport from '../popup/Airport';
import Emergency from '../popup/Emergency';
import Parking from '../popup/Parking';
import Polygon from '../popup/Polygon';
import RedCrescent from '../popup/RedCrescent';

const myFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    /* insert features here */
  ],
};

try {
  setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    () => {},
    true
  );
} catch (e) {
  console.error(e);
}

const INITIAL_VIEW_STATE = {
  longitude: 54.3347,
  latitude: 32.7219,
  zoom: 4.5,
  minZoom: 3,
  maxZoom: 15,
  // pitch: 40.5,
  // bearing: -27,
};

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true},
};

const FilterMap: React.FC<{}> = () => {
  const [selected, setSelected] = useState<any>(null);
  const [mapState, setMapState] = useState<any>(INITIAL_VIEW_STATE);
  const [feature, setFeature] = useState(myFeatureCollection);
  const [editMode, setEditMode] = useState(() => ViewMode);
  const [selectedPoint, setSelectedPoint] = useState<any[]>([]);

  // airports
  const [airportData, setAirportData] = useState<any[]>(airports);
  const [showAirport, setShowAirport] = useState<any>(true);
  const [airportLayers, setAirportLayers] = useState<any[]>([]);

  // Red Crescent
  const [redCrescentData, setRedCrescentData] = useState<any[]>(redCrescent);
  const [showRedCrescent, setShowRedCrescent] = useState<any>(false);
  const [redCrescentLayers, setRedCrescentLayers] = useState<any[]>([]);

  // emergency
  const [emergencyData, setEmergencyData] = useState<any[]>(emergencies);
  const [showEmergency, setShowEmergency] = useState<any>(false);
  const [emergencyLayers, setEmergencyLayers] = useState<any[]>([]);

  // parking
  const [parkingData, setParkingData] = useState<any[]>(parkings);
  const [showParking, setShowParking] = useState<any>(false);
  const [parkingLayers, setParkingLayers] = useState<any[]>([]);

  // mokeb
  const [mokebData, setMokebData] = useState<any[]>(mokebs);
  const [showMokeb, setShowMokeb] = useState<any>(false);
  const [mokebLayers, setMokebLayers] = useState<any[]>([]);

  // borders
  const [borderData, setBorderData] = useState<any[]>(borders);
  const [showBorder, setShowBorder] = useState<any>(false);
  const [borderLayers, setBorderLayers] = useState<any[]>([]);

  // roads
  const [pathData, setPathData] = useState<any[]>(roads);
  const [showPath, setShowPath] = useState<any>(false);
  const [pathLayers, setPathLayers] = useState<any[]>([]);

  // radar
  const [radatData, setRadarData] = useState<any[]>([]);
  const [showRadar, setShowRadar] = useState<any>(false);
  const [radarLayers, setRadarLayers] = useState<any[]>([]);

  // native zaerin
  const [showNativeZaerin, setShowNativeZaerin] = useState<any>(false);
  const [nativeZaerinLayers, setNativeZaerinLayers] = useState<any>(null);

  // moving zaerin
  const [showMovingZaerin, setShowMovingZaerin] = useState<any>(false);
  const [movingZaerinLayers, setMovingZaerinLayers] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const {loadingHourly: zaerinLoading, dataHourly: zaerinDataSource} = useSelector(
    state => state.fetchZaerin
  );

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const pathRef: any = useRef(null);
  const borderRef: any = useRef(null);
  const airportRef: any = useRef(null);
  const zaerinMovingRef: any = useRef(null);
  const zaerinNativeRef: any = useRef(null);
  const mokebRef: any = useRef(null);
  const emergencyRef: any = useRef(null);
  const parkingRef: any = useRef(null);
  const redCrescentRef: any = useRef(null);
  const radarRef: any = useRef(null);

  useEffect(() => {
    if (radarRef.current) return;

    radarRef.current = new ScatterplotLayer({
      id: 'radar-layer',
      data: [
        {
          name: '1',
          code: 'ra-1',
          exits: 100000000000,
          coordinates: [44.0197, 32.6027],
        },
        {
          name: '2',
          code: 'ra-2',
          exits: 250000000000,
          coordinates: [44.0197, 32.6027],
        },
        {
          name: '3',
          code: 'ra-3',
          exits: 500000000000,
          coordinates: [44.0197, 32.6027],
        },
      ],
      pickable: true,
      opacity: 1,
      stroked: true,
      filled: true,
      visible: false,
      radiusScale: 1,
      // radiusMinPixels: 1,
      // radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d: any) => d.coordinates,
      getRadius: (d: any) => Math.sqrt(d.exits),
      getFillColor: (d: any) => [255, 140, 0, 0],
      getLineColor: (d: any) => [23, 90, 118, 200],
      PopupTemplate: () => <></>,
    });

    setRadarLayers([radarRef.current]);
  }, []);

  useEffect(() => {
    if (parkingRef.current) return;

    parkingRef.current = new IconLayer({
      id: 'icon-layer-parking',
      data: parkingData,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: svgToDataURL(airportIcon),
      getIcon: () => ({
        url: parkingIcon,
        width: 700,
        height: 700,
      }),
      iconMapping: ICON_MAPPING,
      // // @ts-ignore
      // // getIcon: d => 'marker',
      sizeScale: 10,
      // @ts-ignore
      getPosition: d => d.coordinates,
      // @ts-ignore
      getSize: d => 4,
      // @ts-ignore
      // getColor: d => [Math.sqrt(d.exits), 140, 0],
      PopupTemplate: Parking,
    });

    setParkingLayers([parkingRef.current]);
  }, []);

  useEffect(() => {
    if (redCrescentRef.current) return;

    redCrescentRef.current = new IconLayer({
      id: 'icon-layer-red',
      data: redCrescentData,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: svgToDataURL(airportIcon),
      getIcon: () => ({
        url: redCrescentIcon,
        width: 700,
        height: 700,
      }),
      iconMapping: ICON_MAPPING,
      // // @ts-ignore
      // // getIcon: d => 'marker',
      sizeScale: 10,
      // @ts-ignore
      getPosition: d => d.coordinates,
      // @ts-ignore
      getSize: d => 4,
      // @ts-ignore
      // getColor: d => [Math.sqrt(d.exits), 140, 0],
      PopupTemplate: RedCrescent,
    });

    setRedCrescentLayers([redCrescentRef.current]);
  }, []);

  useEffect(() => {
    if (emergencyRef.current) return;

    setMokebLayers([emergencyRef.current]);
  }, []);

  useEffect(() => {
    if (mokebRef.current) return;

    mokebRef.current = new IconLayer({
      id: 'icon-layer-mokeb',
      data: mokebData,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: svgToDataURL(airportIcon),
      getIcon: () => ({
        url: mokebIcon,
        width: 500,
        height: 500,
      }),
      iconMapping: ICON_MAPPING,
      // // @ts-ignore
      // // getIcon: d => 'marker',
      sizeScale: 10,
      // @ts-ignore
      getPosition: d => d.coordinates,
      // @ts-ignore
      getSize: d => 4,
      // @ts-ignore
      // getColor: d => [Math.sqrt(d.exits), 140, 0],
      PopupTemplate: Mokeb,
    });

    setMokebLayers([mokebRef.current]);
  }, []);

  useEffect(() => {
    if (airportRef.current) return;

    airportRef.current = new IconLayer({
      id: 'icon-layer-airport',
      data: airportData,
      pickable: true,
      visible: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: svgToDataURL(airportIcon),
      getIcon: () => ({
        url: airportIcon,
        width: 500,
        height: 500,
      }),
      iconMapping: ICON_MAPPING,
      // // @ts-ignore
      // // getIcon: d => 'marker',
      sizeScale: 10,
      // @ts-ignore
      getPosition: d => d.coordinates,
      // @ts-ignore
      getSize: d => 4,
      // @ts-ignore
      // getColor: d => [Math.sqrt(d.exits), 140, 0],
      PopupTemplate: Airport,
    });

    setAirportLayers([airportRef.current]);
  }, []);

  useEffect(() => {
    if (emergencyRef.current) return;

    emergencyRef.current = new IconLayer({
      id: 'icon-layer-emergency',
      data: emergencyData,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      // iconAtlas: svgToDataURL(airportIcon),
      getIcon: () => ({
        url: emergencyIcon,
        width: 500,
        height: 500,
      }),
      iconMapping: ICON_MAPPING,
      // // @ts-ignore
      // // getIcon: d => 'marker',
      sizeScale: 10,
      // @ts-ignore
      getPosition: d => d.coordinates,
      // @ts-ignore
      getSize: d => 4,
      // @ts-ignore
      // getColor: d => [Math.sqrt(d.exits), 140, 0],
      PopupTemplate: Emergency,
    });

    setEmergencyLayers([emergencyRef.current]);
  }, []);

  useEffect(() => {
    if (borderRef.current) return;

    borderRef.current = new PolygonLayer({
      id: 'polygon-layer',
      data: borderData,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      // @ts-ignore
      getPolygon: d => d.contour,
      // @ts-ignore
      getElevation: d => d.population / d.area / 10,
      // @ts-ignore
      getFillColor: [0, 0, 0, 150],
      getLineColor: [0, 0, 0],
      getLineWidth: 1,
      fillColor: '#FF0000',
      PopupTemplate: Border,
      visible: true,
    });

    setBorderLayers([borderRef.current]);
  }, []);

  const [hoverInfo, setHoverInfo] = useState(false);

  useEffect(() => {
    if (pathRef.current) return;

    pathRef.current = new PathLayer({
      id: 'path-layer',
      data: pathData,
      pickable: true,
      widthScale: 30,
      widthMinPixels: 4,
      // @ts-ignore
      getPath: d => d.path,
      // @ts-ignore
      getColor: d => {
        const hex = d.color;
        // convert to RGB
        return hex.match(/[0-9a-f]{2}/g).map((x: any) => {
          return parseInt(x, 16);
        });
      },
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getWidth: d => 5,
      // @ts-ignore
      PopupTemplate: Road,
      visible: true,
    });

    setPathLayers([pathRef.current]);
  }, []);

  const [zaerinMovingData, setZaerinMovingData] = useState([]);
  const [zaerinNativeData, setZaerinNativeData] = useState([]);

  const fetchZaerinData = async () => {
    try {
      const movingZaerin = zaerinDataSource
        .filter((x: any) => x.isPassenger === 'true')
        .reduce((result: any, d: any) => {
          try {
            result.push([...JSON.parse(d.location.coordinates), Number(d.CountOfSamah)]);
          } catch (e) {
            console.error(e);
          }

          return result;
        }, []);

      const nativeZaerin = zaerinDataSource
        .filter((x: any) => x.isPassenger !== 'true')
        .reduce((result: any, d: any) => {
          try {
            result.push([...JSON.parse(d.location.coordinates), Number(d.CountOfSamah)]);
          } catch (e) {
            console.error(e);
          }

          return result;
        }, []);

      setZaerinMovingData(movingZaerin);
      setZaerinNativeData(nativeZaerin);
    } catch (err: any) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    if (zaerinMovingRef.current) return;
    if (zaerinMovingData.length) {
      zaerinMovingRef.current = new HeatmapLayer({
        id: 'zaerin-layer-moving',
        // @ts-ignore
        data: zaerinMovingData,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2] * 3,
        colorRange: [
          [23, 90, 118, 130],
          [23, 90, 118, 190],
          [23, 90, 118, 255],
        ],
        radiusPixels: 60,
        intensity: 1,
        threshold: 0.03,
        visible: false,
        PopupTemplate: ({params}: any) => {
          const [loading, setLoading] = useState<boolean>(false);

          const fetchPopupData = async (param: any) => {
            setLoading(true);
            try {
              setTimeout(() => {
                console.log('first');
                setLoading(false);
              }, 2000);
            } catch (err) {
            } finally {
            }
          };

          useEffect(() => {
            fetchPopupData({});
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
                  {/* <div className="hidden">{JSON.stringify(params, null, 2)}</div>
                  create PopupTemplate component */}
                </>
              )}
            </>
          );
        },
      });

      setMovingZaerinLayers([zaerinMovingRef.current]);
    }
  }, [zaerinMovingData]);

  useEffect(() => {
    if (zaerinNativeRef.current) return;
    if (zaerinNativeData.length) {
      zaerinNativeRef.current = new HeatmapLayer({
        id: 'zaerin-layer-native',
        // @ts-ignore
        data: zaerinNativeData,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2] * 3,
        colorRange: [
          [0, 190, 0, 130],
          [0, 190, 0, 190],
          [0, 190, 0, 255],
        ],
        radiusPixels: 60,
        intensity: 1,
        threshold: 0.03,
        visible: false,
        PopupTemplate: ({params}: any) => {
          const [loading, setLoading] = useState<boolean>(false);

          const fetchPopupData = async (param: any) => {
            setLoading(true);
            try {
              setTimeout(() => {
                console.log('first');
                setLoading(false);
              }, 2000);
            } catch (err) {
            } finally {
            }
          };

          useEffect(() => {
            fetchPopupData({});
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
                  {/* <div className="hidden">{JSON.stringify(params, null, 2)}</div>
                  create PopupTemplate component */}
                </>
              )}
            </>
          );
        },
      });

      setNativeZaerinLayers([zaerinNativeRef.current]);
    }
  }, [zaerinNativeData]);

  useEffect(() => {
    if (zaerinLoading) setSubmitted(true);
    if (!zaerinLoading) {
      setSubmitted(false);
      if (zaerinDataSource && zaerinDataSource.length > 0) fetchZaerinData();
    }
  }, [zaerinLoading]);

  useEffect(() => {
    if (!pathRef.current) return;

    if (showPath) {
      setPathLayers([pathRef.current.clone({visible: true})]);
    } else {
      setPathLayers([pathRef.current.clone({visible: false})]);
    }
  }, [showPath]);

  useEffect(() => {
    if (!redCrescentRef.current) return;

    if (showRedCrescent) {
      setRedCrescentLayers([redCrescentRef.current.clone({visible: true})]);
    } else {
      setRedCrescentLayers([redCrescentRef.current.clone({visible: false})]);
    }
  }, [showRedCrescent]);

  useEffect(() => {
    if (!borderRef.current) return;

    if (showBorder) {
      setBorderLayers([borderRef.current.clone({visible: true})]);
    } else {
      setBorderLayers([borderRef.current.clone({visible: false})]);
    }
  }, [showBorder]);

  useEffect(() => {
    if (!zaerinMovingRef.current) return;

    if (showMovingZaerin) {
      setMovingZaerinLayers([zaerinMovingRef.current.clone({visible: true})]);
    } else {
      setMovingZaerinLayers([zaerinMovingRef.current.clone({visible: false})]);
    }
  }, [showMovingZaerin]);

  useEffect(() => {
    if (!zaerinNativeRef.current) return;

    if (showNativeZaerin) {
      setNativeZaerinLayers([zaerinNativeRef.current.clone({visible: true})]);
    } else {
      setNativeZaerinLayers([zaerinNativeRef.current.clone({visible: false})]);
    }
  }, [showNativeZaerin]);

  useEffect(() => {
    if (!airportRef.current) return;

    if (showAirport) {
      setAirportLayers([airportRef.current.clone({visible: true})]);
    } else {
      setAirportLayers([airportRef.current.clone({visible: false})]);
    }
  }, [showAirport]);

  useEffect(() => {
    if (!mokebRef.current) return;

    if (showMokeb) {
      setMokebLayers([mokebRef.current.clone({visible: true})]);
    } else {
      setMokebLayers([mokebRef.current.clone({visible: false})]);
    }
  }, [showMokeb]);

  useEffect(() => {
    if (!emergencyRef.current) return;

    if (showEmergency) {
      setEmergencyLayers([emergencyRef.current.clone({visible: true})]);
    } else {
      setEmergencyLayers([emergencyRef.current.clone({visible: false})]);
    }
  }, [showEmergency]);

  useEffect(() => {
    if (!parkingRef.current) return;

    if (showParking) {
      setParkingLayers([parkingRef.current.clone({visible: true})]);
    } else {
      setParkingLayers([parkingRef.current.clone({visible: false})]);
    }
  }, [showParking]);

  useEffect(() => {
    if (!radarRef.current) return;

    if (showRadar) {
      setRadarLayers([radarRef.current.clone({visible: true})]);
    } else {
      setRadarLayers([radarRef.current.clone({visible: false})]);
    }
  }, [showRadar]);

  const goToBorder = useCallback(() => {
    setShowBorder((prev: any) => !prev);
    if (!showBorder) {
      setMapState((prev: any) => {
        return {
          ...prev,
          zoom: 5.7,
          transitionDuration: 800,
          longitude: 47.3347,
          latitude: 33.7219,
          transitionInterpolator: new FlyToInterpolator(),
        };
      });
    } else {
      setMapState(() => {
        return {
          ...INITIAL_VIEW_STATE,
          transitionDuration: 800,
          transitionInterpolator: new FlyToInterpolator(),
        };
      });
    }
  }, [showBorder]);

  // @ts-ignore
  const editorLayer = new EditableGeoJsonLayer({
    id: 'editor-layer',
    data: feature,
    mode: editMode,
    selectedFeatureIndexes: selectedPoint,
    onEdit: ({updatedData}: any) => {
      setFeature(updatedData);
    },
    // @ts-ignore
    PopupTemplate: Polygon,
  });

  useEffect(() => {
    setSelectedPoint([]);
  }, [editMode]);

  const removePolygon = () => {
    const f = {...feature};
    f.features.splice(selectedPoint[0], 1);
    setFeature(f);
  };

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">ابر حرکتی زائران کربلا در یک ساعت اخیر</legend>
      <div className="relative rounded-xl overflow-hidden" style={{height: '650px'}}>
        <div className="absolute left-4 top-16 z-10 flex flex-col space-y-4">
          <button
            className="bg-white shadow-2xl rounded-md flex justify-center items-center p-1.5 w-6 h-6 text-xs"
            onClick={() => setEditMode(() => ViewMode)}
          >
            <img src={mapSelectIcon} className="w-6 h-6" alt="Map Select Polygon" />
          </button>
          <button
            className="bg-white shadow-2xl rounded-md flex justify-center items-center p-1.5 w-6 h-6 text-xs"
            onClick={() => setEditMode(() => DrawPolygonMode)}
          >
            <img src={mapDrawIcon} className="w-6 h-6" alt="Map Draw Polygon" />
          </button>
          <button
            className="bg-white shadow-2xl rounded-md flex justify-center items-center p-1.5 w-6 h-6 text-xs"
            onClick={removePolygon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#175A76"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`absolute left-0 top-0 bg-white z-10 opacity-70 w-full h-full ${
            submitted ? '' : 'hidden'
          }`}
        />
        <div
          className={` absolute left-1/2 top-1/2  z-20 -translate-x-1/2 -translate-y-1/2 ${
            submitted ? '' : 'hidden'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <DeckGL
          ref={deckRef}
          layers={[
            radarLayers,
            movingZaerinLayers,
            nativeZaerinLayers,
            borderLayers,
            pathLayers,
            airportLayers,
            mokebLayers,
            emergencyLayers,
            parkingLayers,
            editorLayer,
            redCrescentLayers,
          ]}
          initialViewState={mapState}
          controller={{
            doubleClickZoom: false,
          }}
          height={650}
          // getTooltip={getTooltip}
          // @ts-ignore
          ContextProvider={MapContext.Provider}
          getCursor={() => {
            return hoverInfo ? 'pointer' : 'grab';
          }}
          // @ts-ignore
          onHover={({x, y, coordinate, layer, color, object, index}: PickingInfo) => {
            if (object) {
              if (!hoverInfo) {
                setHoverInfo(true);
              }
            } else {
              if (hoverInfo) {
                setHoverInfo(false);
              }
            }
          }}
          // @ts-ignore
          onClick={({x, y, coordinate, layer, color, object, index}: PickingInfo) => {
            if (editMode !== ViewMode) {
              // don't change selection while editing
              return;
            } else {
              // console.log('deck onClick', object);
              // console.log('layer', layer);
              if (object) {
                setSelected({x, y, coordinate, object, layer});
              } else {
                setSelected(null);
              }
            }

            setSelectedPoint(object ? [index] : []);
          }}
        >
          {/* <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing /> */}
          <div className="filter-map">
            {/* <div className="filter-map__search"> */}
            {/*  <input type="text" placeholder="جستجو" /> */}
            {/* </div> */}
            <h5 className="text-right  text-primary-color text-base mb-4 mt-2 mx-auto">
              فیلتر مکان‌ها
            </h5>
            <div className="select-radio mb-32">
              {/* <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="radar"
                  name="radar"
                  onClick={() => {
                    setShowRadar((prev: any) => !prev);
                  }}
                />
                <label htmlFor="radar" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  شعاع
                </label>
              </div> */}
              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="road"
                  name="road"
                  onClick={() => {
                    setShowPath((prev: any) => !prev);
                    if (showBorder) {
                      setMapState(() => {
                        return {
                          ...INITIAL_VIEW_STATE,
                          transitionDuration: 1000,
                        };
                      });
                    }
                  }}
                />
                <label htmlFor="road" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  مسیرها
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="airports"
                  checked={showAirport}
                  name="airports"
                  onClick={() => {
                    setShowAirport((prev: any) => !prev);
                    if (showBorder) {
                      setMapState(() => {
                        return {
                          ...INITIAL_VIEW_STATE,
                          transitionDuration: 1000,
                        };
                      });
                    }
                  }}
                />
                <label htmlFor="airports" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  فرودگاه ها
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="parking"
                  name="parking"
                  onClick={() => {
                    setShowParking((prev: any) => !prev);
                    if (showBorder) {
                      setMapState(() => {
                        return {
                          ...INITIAL_VIEW_STATE,
                          transitionDuration: 1000,
                        };
                      });
                    }
                  }}
                />
                <label htmlFor="parking" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  پارکینگ
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="border-crossing"
                  name="border-crossing"
                  onClick={goToBorder}
                />
                <label htmlFor="border-crossing" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  گذرگاه‌های مرزی
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="procession"
                  name="procession"
                  onClick={() => {
                    setShowMokeb((prev: any) => !prev);
                    if (showBorder) {
                      setMapState(() => {
                        return {
                          ...INITIAL_VIEW_STATE,
                          transitionDuration: 1000,
                        };
                      });
                    }
                  }}
                />
                <label htmlFor="procession" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  موکب
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="helal_ahmar"
                  name="helal_ahmar"
                  onClick={() => setShowRedCrescent((prev: any) => !prev)}
                />
                <label htmlFor="helal_ahmar" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  پایگاه هلال احمر
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="zaerin-native"
                  name="zaerin-native"
                  onClick={() => setShowNativeZaerin((prev: any) => !prev)}
                />
                <label htmlFor="zaerin-native" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  زائران مقیم
                </label>
              </div>

              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="zaerin-moving"
                  name="zaerin-moving"
                  onClick={() => setShowMovingZaerin((prev: any) => !prev)}
                />
                <label htmlFor="zaerin-moving" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  زائران در حال حرکت
                </label>
              </div>
              <div className="select-radio__group">
                <input
                  type="checkbox"
                  className="select-radio__input"
                  id="emergency"
                  name="emergency"
                  onClick={() => setShowEmergency((prev: any) => !prev)}
                />
                <label htmlFor="emergency" className="select-radio__label text-right">
                  <span className="select-radio__button" />
                  اورژانس
                </label>
              </div>
            </div>
            {/* <div className="w-10/12 mx-auto filter-map__submit text-center"> */}
            {/*  <button type="button" className="button button--primary"> */}
            {/*    اعمال فیلتر */}
            {/*  </button> */}
            {/* </div> */}
          </div>
          <StaticMap
            reuseMaps
            preventStyleDiffing
            height={500}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/light-v10"
            className="map-container"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
          <FullscreenControl
            style={{marginTop: '20px', marginRight: '20px', left: '13px', top: '0px'}}
          />
          {selected && (
            <Popup
              longitude={selected.coordinate[0]}
              latitude={selected.coordinate[1]}
              closeButton={false}
              offsetLeft={10}
            >
              <selected.layer.props.PopupTemplate params={selected.object} />
            </Popup>
          )}
        </DeckGL>
      </div>
    </fieldset>
  );
};

export default FilterMap;
