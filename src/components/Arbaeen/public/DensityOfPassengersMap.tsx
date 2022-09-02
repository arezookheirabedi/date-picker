import React, {useEffect, useRef, useState} from 'react';
import {setRTLTextPlugin, StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core/typed';
import {HexagonLayer} from '@deck.gl/aggregation-layers/typed';
import DeckGL from '@deck.gl/react/typed';
import arbaeenService from 'src/services/arbaeen.service';

try {
  setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    () => {},
    true
  );
} catch (e) {
  console.error(e);
}

// Source data CSV
const DATA_URL = '${process.env.PUBLIC_URL}/assets/ff.csv'; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const INITIAL_VIEW_STATE = {
  longitude: 54.3347,
  latitude: 32.7219,
  zoom: 4.5,
  minZoom: 3,
  maxZoom: 15,
  pitch: 40.5,
  // bearing: -27,
};

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

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

const DensityOfPassengersMap: React.FC<{}> = () => {
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [layers, setLayers] = useState([]);

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const fetcher = async () => {
    setSubmitted(true);
    try {
      const {data: response} = await arbaeenService.getPiligrimReportAsFile({
        fileName: 'ar_location_ptrue_tmp_loc.zip',
      });

      console.log(response);

      setData([]);
    } catch (err: any) {
      console.log(err);
    } finally {
      setSubmitted(false);
    }

    // const data = response
    //     .filter((x) => x.Submittime === "8/28/2022 11:00:00 AM")
    //     .reduce((result, d) => {
    //       [...Array(d.CountOfSamah)].forEach((v) => {
    //         result.push([Number(d.Lon), Number(d.Lat)]);
    //       });

    //       return result;
    //     }, []);
  };

  useEffect(() => {
    if (data && data.length > 0 && !submitted) {
      setLayers([
        // @ts-ignore
        new HexagonLayer({
          id: 'heatmap',
          // @ts-ignore
          colorRange,
          coverage: 1,
          data,
          elevationRange: [0, 3000],
          elevationScale: data && data.length ? 50 : 0,
          extruded: true,
          getPosition: d => d,
          pickable: true,
          radius: 1000,
          upperPercentile: 100,
          // @ts-ignore
          material,

          transitions: {
            elevationScale: 3000,
          },
        }),
      ]);
    }
  }, [data]);

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">ابر حرکتی زائران کربلا</legend>
      <div className="relative " style={{height: '500px'}}>
        <DeckGL
          ref={deckRef}
          layers={layers}
          effects={[lightingEffect]}
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
            mapStyle="mapbox://styles/mapbox/streets-v11"
            className="map-container"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    </fieldset>
  );
};

export default DensityOfPassengersMap;
