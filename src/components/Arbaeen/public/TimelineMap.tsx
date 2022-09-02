import React, {useEffect, useMemo, useRef, useState} from 'react';
import {setRTLTextPlugin, StaticMap} from 'react-map-gl';
import {MapView} from '@deck.gl/core/typed';
import {ScatterplotLayer} from '@deck.gl/layers/typed';
import {DataFilterExtension} from '@deck.gl/extensions/typed';
import DeckGL from '@deck.gl/react/typed';
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

// Source data GeoJSON
const DATA_URL = `${process.env.PUBLIC_URL}/ff.csv`; // eslint-disable-line

// This is only needed for this particular dataset - the default view assumes
// that the furthest geometries are on the ground. Because we are drawing the
// circles at the depth of the earthquakes, i.e. below sea level, we need to
// push the far plane away to avoid clipping them.
const MAP_VIEW = new MapView({
  // 1 is the distance between the camera and the ground
  farZMultiplier: true,
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

const TimelineMap: React.FC<{}> = () => {
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [layers, setLayers] = useState([]);
  const [filter, setFilter] = useState(null);
  const timeRange = useMemo(() => getTimeRange(data), [data]);

  const mapRef = useRef(null);
  const deckRef = useRef(null);

  const filterValue = filter || timeRange;

  const fetcher = async () => {
    setSubmitted(true);
    try {
      // const res = await

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
        new ScatterplotLayer({
          id: 'earthquakes',
          data,
          opacity: 0.8,
          radiusScale: 100,
          radiusMinPixels: 1,
          wrapLongitude: true,

          getPosition: (d: any) => [d.longitude, d.latitude, -d.depth * 1000],
          // getRadius: (d) => Math.pow(2, d.magnitude),
          getRadius: (d: any) => d.magnitude,
          getFillColor: (d: any) => {
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
      <div className="relative " style={{height: '500px'}}>
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
            mapStyle="mapbox://styles/mapbox/streets-v11"
            className="map-container"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        </DeckGL>

        {timeRange && (
          <MapRange
            min={timeRange[0]}
            max={timeRange[1]}
            value={filterValue}
            animationSpeed={MS_PER_DAY * 30}
            formatLabel={formatLabel}
            onChange={setFilter}
          />
        )}
      </div>
    </fieldset>
  );
};

export default TimelineMap;
