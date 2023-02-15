import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import proj4 from "proj4";

import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "./features/favourites";

import hyvinvointikeskukset from "./Hyvinvointikeskukset_ja_pisteet.json";

import "./Map.css";
import "leaflet/dist/leaflet.css";

function Map() {
  // ETRS-TM35FIN
  const etrsProjection = "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs";
  // WGS84
  const wgsProjection =
    "+proj=longlat +ellps=WGS84 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +datum=WGS84 +no_defs";

  function convertCoordinates(x, y) {
    var coordinates = proj4(etrsProjection, wgsProjection, [x, y]);
    return [coordinates[1], coordinates[0]];
  }

  // Favourites
  const arrayOfFavourites = useSelector(state => state);
  function CheckFavourites(id) {
    if (arrayOfFavourites.favourites.includes(id)) {
      return (
        <span className="material-symbols-outlined heart active" onClick={() => dispatch(toggleFavourite(id))}>favorite</span>
      )
    } else {
      return (
        <span className="material-symbols-outlined heart" onClick={() => dispatch(toggleFavourite(id))}>favorite</span>
      )
    }
  }
  function FavouriteMarker(id) {
    if (arrayOfFavourites.favourites.includes(id)) {
      return (
        "material-symbols-outlined location-favourite"
      )
    } else {
      return (
        "material-symbols-outlined location"
      )
    }
  }
  const dispatch = useDispatch()

  return (
    <div className="Map">
      <MapContainer
        id="Container"
        center={[65.05301543320479, 25.639410341616053]}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hyvinvointikeskukset.features.map((feature) => {
          return (
            <Marker
              key={feature.properties.ID}
              position={convertCoordinates(
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1]
              )}
              icon={
                new divIcon({
                  className: FavouriteMarker(feature.properties.ID),
                  html: `<span>location_on</span>`,
                  iconSize: [35, 35],
                  iconAnchor: [18, 24],
                })
              }
            >
              <Popup>
                <div className="PopupContent">
                  <div className="row">
                    {CheckFavourites(feature.properties.ID)}
                    <h2>{feature.properties.Nimi}</h2>
                  </div>
                  <p>
                    <b>Osoite: </b>
                    {feature.properties.Osoite}, {feature.properties.Postinro}
                  </p>
                  <a href={feature.properties.Url}>{feature.properties.Url}</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
