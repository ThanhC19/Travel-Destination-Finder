import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./mapview.css";
import { defaultIcon, savedIcon } from "./mapicons";
import "leaflet/dist/leaflet.css";


function FlyTo({ destination }) {
  const map = useMap();
  useEffect(() => {
    if (destination) {
      map.flyTo([destination.lat, destination.lng], 6, { duration: 0.8 });
    }
  }, [destination, map]);
  return null;
}

export default function MapView({ destinations, selected, onSelect, priceKey, savedTrips, toggleSave }) {
  const isSaved = (d) => savedTrips.some((t) => t.id === d.id);
  
  
  const markerRefs = useRef({});

  useEffect(() => {
    if (selected && markerRefs.current[selected.id]) {
      markerRefs.current[selected.id].openPopup();
    }
  }, [selected]);

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={[48.8566, 2.3522]} 
        zoom={4} 
        scrollWheelZoom 
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <FlyTo destination={selected} />

        {destinations.map((d) => {
         
          const currentPrice = d[priceKey];
          return (
            <Marker
              key={d.id}
              position={[d.lat, d.lng]}
              icon={isSaved(d) ? savedIcon : defaultIcon}
              ref={(el) => {
                if (el) markerRefs.current[d.id] = el;
              }}
              eventHandlers={{
                click: () => onSelect(d)
              }}
            >
              <Popup className="custom-popup">
                <div className="popup-content">
                  <h3>{d.city}</h3>
                  <p className="popup-country">{d.country}</p>
                  <p className="popup-price">Price: <strong>£{currentPrice}</strong></p>
                  <button
                    className={`save_btn ${isSaved(d) ? 'saved' : ''}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleSave(d);
                    }}
                  >
                    {isSaved(d) ? "★ Saved" : "☆ Save Trip"}
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}