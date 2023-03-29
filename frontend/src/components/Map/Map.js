import { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import api from "../../utils/api";
import { PlotForm } from "../PlotForm/PlotForm";

const getData = (plots) => {
  if (!plots) {
    return;
  }
  const polygons = plots.map((plot) => {
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [plot.points],
      },
    };
  });

  return {
    type: "FeatureCollection",
    features: polygons,
  };
};

export function ReactMap() {
  const [viewState, setViewState] = useState({
    latitude: 55,
    longitude: 50,
    zoom: 3,
  });
  console.log(1);
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    api
      .getPlots()
      .then(({ data }) => {
        const initPlots = data.map((item) => {
          return {
            level: item.attributes.level,
            points: JSON.parse(item.attributes.points),
          };
        });
        setPlots(initPlots);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddPlot = (level, points) => {
    api
      .addPlots({
        level: level,
        points: points,
      })
      .then(() => {
        setPlots([
          ...plots,
          { level: Number(level), points: JSON.parse(points) },
        ]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(plots);
  }, [plots]);

  return (
    <>
      <Map
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        style={{ width: "100%", height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={
          "pk.eyJ1IjoiYW4za290IiwiYSI6ImNsZnBmbWpzNjBhdWkzcG9ibmpidmhyZXMifQ.9vlP_47nqzgu2pn9jmijrA"
        }
      >
        {plots && (
          <Source type="geojson" data={getData(plots)}>
            <Layer
              id="polygon"
              type="fill"
              paint={{
                "fill-color": "#00ff00",
                "fill-opacity": 0.5,
              }}
            />
          </Source>
        )}
      </Map>
      <PlotForm handleAddPlot={handleAddPlot} />
    </>
  );
}
