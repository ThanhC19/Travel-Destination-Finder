import { MapContainer, TileLayer,Marker, Popup, useMap } from "react-leaflet";
import "./mapview.css"
import { defaultIcon,savedIcon } from "./mapicons";

function FlyTo({ destination }) {
  const map = useMap();

  if (destination) {
    map.flyTo([destination.lat, destination.lng], 6, { duration: 0.8 });
  }

  return null;
}


export default function MapView({destinations, selected, onSelect,priceKey, savedTrips, toggleSave}){
    const isSaved = (d) => savedTrips.some((t) => t.id === d.id)
    const price = destination[priceKey]
    return(
        <div className="map">
        <MapContainer center={[48.8566,2.3522]} zoom={4} scrollWheelZoom style={{height:"100%", width:"100%"}}>
        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo destination={selected}/>

        {destinations.map((d) => (
            <Marker
            key={d.id}
            position={[d.lat,d.lng]}
            icon={isSaved(d) ? savedIcon :defaultIcon}
            eventHandlers={{
                click: () => onSelect(d)
            }}>
             <Popup>
             <strong>{d.city}</strong>, {d.country}
             <p>Price: £{price}</p>
             <button
             className="save_btn" 
             type="button"
             onClick={() => toggleSave(d)}>{isSaved(d) ? "★ Saved" : "☆ Save"}</button>
             </Popup>
            </Marker>
        ))}
        </MapContainer>
        </div>
    )
}