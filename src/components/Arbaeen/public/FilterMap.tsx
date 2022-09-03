import React, {useEffect, useRef, useState} from 'react';
import {setRTLTextPlugin, StaticMap} from 'react-map-gl';
// import {HexagonLayer} from '@deck.gl/aggregation-layers/typed';
import DeckGL from '@deck.gl/react/typed';

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
  pitch: 40.5,
  // bearing: -27,
};


function getTooltip({object}: any) {
  if (!object) {
    return null;
  }
  const lat = object.position[1];
  const lng = object.position[0];
  const count = object.points.length;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    ${count} مسافر`;
}

const FilterMap: React.FC<{}> = () => {
  const [data, setData] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [layers, setLayers] = useState<any[]>([]);

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const fetcher = async () => {
    setSubmitted(true);
    try {

      // setData([...res]);
      setData([]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLayers([]);
  //       // @ts-ignore
  //       new HexagonLayer({
  //         id: 'heatmap',
  //         // @ts-ignore
  //         colorRange,
  //         coverage: 1,
  //         data,
  //         elevationRange: [0, 3000],
  //         elevationScale: data && data.length ? 50 : 0,
  //         extruded: true,
  //         getPosition: (d: any) => d,
  //         pickable: true,
  //         radius: 1000,
  //         upperPercentile: 100,
  //         // @ts-ignore
  //         material,

  //         transitions: {
  //           elevationScale: 3000,
  //         },
  //       }),
  //     ]);
    }
  }, [data, submitted]);

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">ابر حرکتی زائران کربلا</legend>
      <div className="relative" style={{height: '500px'}}>
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
          layers={layers}
          initialViewState={INITIAL_VIEW_STATE}
          controller
          height={500}
          getTooltip={getTooltip}
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
        </DeckGL>
      </div>
    </fieldset>
  );
};

export default FilterMap;
