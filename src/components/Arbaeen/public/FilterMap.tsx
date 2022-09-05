/* eslint-disable */

import React, {useEffect, useRef, useState} from 'react';
import {setRTLTextPlugin, _MapContext as MapContext, StaticMap, Popup} from 'react-map-gl';
// import {HexagonLayer} from '@deck.gl/aggregation-layers/typed';
import DeckGL from '@deck.gl/react/typed';
// @ts-ignore
import {PolygonLayer, PathLayer, IconLayer, GeoJsonLayer} from '@deck.gl/layers';
// import {colorRange} from "./DensityOfPassengersMap";
import {borders} from '../geos/borders';
import {roads} from '../geos/roads';
import {PickingInfo} from '@deck.gl/core/typed';
import {TooltipContent} from '@deck.gl/core/typed/lib/tooltip';
import Loading from 'src/components/Loading';
import {ScatterplotLayer} from '@deck.gl/layers/typed';
import JSZip from 'jszip';
import csvtojson from 'csvtojson';
import arbaeenService from 'src/services/arbaeen.service';
import {useSelector} from 'src/hooks/useTypedSelector';

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

const getTooltip: (info: PickingInfo) => TooltipContent = ({object}: PickingInfo) => {
  if (!object) {
    return null;
  }
  // const lat = object.position[1];
  // const lng = object.position[0];
  // const count = object.points.length;

  return {
    html: `<span>${object.name}</span>`,
    className: 'font-base shadow-lg text-sm',
    style: {
      background: '#ffffff',
      borderRadius: '0.5rem',
      color: '#424242',
    },
  };
};

const FILE_NAME = 'ar_location_ptrue_tmp_loc';

const FilterMap: React.FC<{}> = () => {
  const [selected, setSelected] = useState<any>(null);
  const [borderData, setBorderData] = useState<any[]>(borders);
  const [showBorder, setShowBorder] = useState<any>(false);
  const [borderLayers, setBorderLayers] = useState<any[]>([]);
  const [pathData, setPathData] = useState<any[]>(roads);
  const [showPath, setShowPath] = useState<any>(false);
  const [pathLayers, setPathLayers] = useState<any[]>([]);
  const [zaerinData, setZaerinData] = useState<any[]>([]);
  const [showZaerin, setShowZaerin] = useState<any>(false);
  const [zaerinLayers, setZaerinLayers] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const {loading: zaerinLoading, data: zaerinDataSource} = useSelector(state => state.fetchZaerin);

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const pathRef: any = useRef(null);
  const borderRef: any = useRef(null);
  const zaerinRef: any = useRef(null);

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
      getFillColor: [255, 240, 0],
      getLineColor: [255, 240, 0],
      getLineWidth: 1,
      fillColor: '#FF0000',
      PopupTemplate: ({params}: any) => {
        return (
          <>
            <div className="hidden">{JSON.stringify(params, null, 2)}</div>
            create PopupTemplate component
          </>
        );
      },
      visible: true,
    });

    setBorderLayers([borderRef.current]);
  }, []);

  useEffect(() => {
    if (pathRef.current) return;

    pathRef.current = new PathLayer({
      id: 'path-layer',
      data: pathData,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
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
                <div className="hidden">{JSON.stringify(params, null, 2)}</div>
                create PopupTemplate component
              </>
            )}
          </>
        );
      },
      visible: true,
    });

    setPathLayers([pathRef.current]);
  }, []);

  const fetchZaerinData = async () => {
    try {
      const {data: response} = await arbaeenService.getPiligrimReportAsFile(
        {
          fileName: `${FILE_NAME}.zip`,
        },
        {responseType: 'blob'}
      );
      const zip = await JSZip.loadAsync(response);

      const file = await zip.file(`${FILE_NAME}.csv`)?.async('text');

      const json = await csvtojson().fromString(file || '');

      const res = json
        .filter((x: any) => x.Submittime === '2022-08-31T17:00:00.000Z' && x.isPassenger === 'true')
        .reduce((result: any, d: any) => {
          [...Array(Number(d.CountOfSamah))].forEach(() => {
            try {
              result.push(JSON.parse(d.location.coordinates));
            } catch (e) {
              console.error(e);
            }
          });

          return result;
        }, []);

      console.log('Finish');

      setZaerinData([...res]);

      zaerinRef.current = new ScatterplotLayer({
        id: 'zaerin-layer',
        data: [...res],
        pickable: true,
        opacity: 0.8,
        radiusScale: 100,
        radiusMinPixels: 1,
        wrapLongitude: true,
        getPosition: (d: any) => [d.longitude, d.latitude, -d.depth * 1000],
        // getRadius: (d) => Math.pow(2, d.magnitude),
        getRadius: (d: any) => d.magnitude / 3,
        getFillColor: (d: any) => {
          const r = Math.sqrt(Math.max(d.depth, 0));
          return [46 - r * 15, r * 106, r * 79];
        },
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
                  <div className="hidden">{JSON.stringify(params, null, 2)}</div>
                  create PopupTemplate component
                </>
              )}
            </>
          );
        },
        visible: true,
      });

      setZaerinLayers([zaerinRef.current]);
    } catch (err: any) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    if (zaerinRef.current) return;

    fetchZaerinData();
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;

    if (showPath) {
      setPathLayers([pathRef.current.clone({visible: true})]);
    } else {
      setPathLayers([pathRef.current.clone({visible: false})]);
    }
  }, [showPath]);

  useEffect(() => {
    if (!borderRef.current) return;

    if (showBorder) {
      setBorderLayers([borderRef.current.clone({visible: true})]);
    } else {
      setBorderLayers([borderRef.current.clone({visible: false})]);
    }
  }, [showBorder]);

  useEffect(() => {
    if (!zaerinRef.current) return;

    if (showZaerin) {
      setZaerinLayers([zaerinRef.current.clone({visible: true})]);
    } else {
      setZaerinLayers([zaerinRef.current.clone({visible: false})]);
    }
  }, [showZaerin]);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">ابر حرکتی زائران کربلا فیلتر</legend>
      <div className="relative" style={{height: '500px'}}>
        <div className="filter-map">
          {/* <div className="filter-map__search"> */}
          {/*  <input type="text" placeholder="جستجو" /> */}
          {/* </div> */}
          <h5 className="text-right  text-primary-color text-base mb-4 mt-2 mx-auto">
            فیلتر مکان‌ها
          </h5>
          <div className="select-radio mb-32">
            <div className="select-radio__group">
              <input
                type="checkbox"
                className="select-radio__input"
                id="road"
                name="road"
                onClick={() => setShowPath((prev: any) => !prev)}
              />
              <label htmlFor="road" className="select-radio__label text-right">
                <span className="select-radio__button" />
                مسیرها
              </label>
            </div>

            <div className="select-radio__group">
              <input type="checkbox" className="select-radio__input" id="parking" name="parking" />
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
                onClick={() => setShowBorder((prev: any) => !prev)}
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
              />
              <label htmlFor="procession" className="select-radio__label text-right">
                <span className="select-radio__button" />
                موکب
              </label>
            </div>

            <div className="select-radio__group">
              <input type="checkbox" className="select-radio__input" id="base" name="base" />
              <label htmlFor="base" className="select-radio__label text-right">
                <span className="select-radio__button" />
                پایگاه حلال‌احمر
              </label>
            </div>
            <div className="select-radio__group">
              <input
                type="checkbox"
                className="select-radio__input"
                id="zaerin"
                name="zaerin"
                onClick={() => setShowZaerin((prev: any) => !prev)}
              />
              <label htmlFor="zaerin" className="select-radio__label text-right">
                <span className="select-radio__button" />
                زائران
              </label>
            </div>
            <div className="select-radio__group">
              <input
                type="checkbox"
                className="select-radio__input"
                id="emergency"
                name="emergency"
              />
              <label htmlFor="emergency" className="select-radio__label text-right">
                <span className="select-radio__button" />
                اورژانس
              </label>
            </div>
          </div>
          <div className="w-11/12 mx-auto filter-map__submit text-center">
            <button type="button" className="button button--primary">
              اعمال فیلتر
            </button>
          </div>
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
          layers={[borderLayers, pathLayers]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={{
            doubleClickZoom: false,
          }}
          height={500}
          // getTooltip={getTooltip}
          // @ts-ignore
          ContextProvider={MapContext.Provider}
          onClick={({x, y, coordinate, layer, color, object, index}: PickingInfo) => {
            console.log('deck onClick', object);
            console.log('layer', layer);
            if (object) {
              setSelected({x, y, coordinate, object, layer});
            } else {
              setSelected(null);
            }
          }}
        >
          {/* <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing /> */}
          <StaticMap
            reuseMaps
            preventStyleDiffing
            height={500}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/light-v10"
            className="map-container"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
