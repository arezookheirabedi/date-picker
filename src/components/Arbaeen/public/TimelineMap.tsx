import React, {useEffect, useMemo, useRef, useState} from 'react';
import {setRTLTextPlugin, StaticMap} from 'react-map-gl';
import {MapView} from '@deck.gl/core/typed';
import {ScatterplotLayer} from '@deck.gl/layers/typed';
import {DataFilterExtension} from '@deck.gl/extensions/typed';
import DeckGL from '@deck.gl/react/typed';
import JSZip from 'jszip';
import csvtojson from 'csvtojson';
import arbaeenService from 'src/services/arbaeen.service';
import MapRange from 'src/components/MapRange';

try {
  setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    () => {},
    true
  );
} catch (e) {
  console.error(e);
}

// This is only needed for this particular dataset - the default view assumes
// that the furthest geometries are on the ground. Because we are drawing the
// circles at the depth of the earthquakes, i.e. below sea level, we need to
// push the far plane away to avoid clipping them.
const MAP_VIEW = new MapView({
  // 1 is the distance between the camera and the ground
  //   @ts-ignore
  farZMultiplier: 100,
});

const INITIAL_VIEW_STATE = {
  latitude: 32.4279,
  longitude: 53.688,
  zoom: 4.5,
  pitch: 0,
  bearing: 0,
};

const MS_PER_DAY = 1000 * 60 * 10;

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  // Enable for higher precision, e.g. 1 second granularity
  // See DataFilterExtension documentation for how to pick precision
  fp64: false,
});

function formatLabel(t: any) {
  const date = new Date(t);
  return `${date.getUTCFullYear()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
}

function getTimeRange(data: any) {
  if (!data) {
    return null;
  }
  return data.reduce(
    (range: any[], d: any) => {
      const t = d.timestamp;
      //  eslint-disable-next-line
      range[0] = Math.min(range[0], t);
      //  eslint-disable-next-line
      range[1] = Math.max(range[1], t);
      return range;
    },
    [Infinity, -Infinity]
  );
}

function getTooltip({object}: any) {
  return (
    object &&
    `\
      Time: ${new Date(object.timestamp).toUTCString()}
      سافران: ${object.magnitude}
      `
  );
}

const FILE_NAME = 'ar_location_ptrue_tmp_loc';

const TimelineMap: React.FC<{}> = () => {
  const [data, setData] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [layers, setLayers] = useState<any[]>([]);
  const [filter, setFilter] = useState(null);
  const timeRange = useMemo(() => getTimeRange(data), [data]);

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const filterValue = filter || timeRange;

  const fetcher = async () => {
    setSubmitted(true);
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
        .filter(x => x.isPassenger === 'true')
        .map(row => {
          const coordinates = JSON.parse(row.location.coordinates);
          return {
            timestamp: new Date(row.Submittime).getTime(),
            longitude: Number(coordinates[0]),
            latitude: Number(coordinates[1]),
            // depth: Number(row.CountOfSamah),
            depth: 1,
            magnitude: Number(row.CountOfSamah),
          };
        });

      console.log('Finish');

      setData([...res]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setLayers([
        new ScatterplotLayer({
          id: 'earthquakes',
          data,
          opacity: 0.8,
          radiusScale: 100,
          radiusMinPixels: 1,
          wrapLongitude: true,
          getPosition: d => [d.longitude, d.latitude, -d.depth * 1000],
          // getRadius: (d) => Math.pow(2, d.magnitude),
          getRadius: d => d.magnitude,
          getFillColor: d => {
            const r = Math.sqrt(Math.max(d.depth, 0));
            return [255 - r * 15, r * 5, r * 10];
          },

          getFilterValue: (d: any) => d.timestamp,
          filterRange: [filterValue[0], filterValue[1]],
          filterSoftRange: [
            filterValue[0] * 0.9 + filterValue[1] * 0.1,
            filterValue[0] * 0.1 + filterValue[1] * 0.9,
          ],
          extensions: [dataFilter],

          pickable: true,
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
          views={MAP_VIEW}
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

        {timeRange && (
          <MapRange
            min={timeRange[0]}
            max={timeRange[1]}
            value={filterValue}
            animationSpeed={MS_PER_DAY}
            formatLabel={formatLabel}
            onChange={setFilter}
          />
        )}
      </div>
    </fieldset>
  );
};

export default TimelineMap;
