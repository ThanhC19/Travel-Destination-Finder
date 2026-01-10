import { MapContainer, TileLayer,Marker, Popup, useMap } from "react-leaflet";
import "./mapview.css"

function Flyto ({destination}) {
    const map = useMap();

    if(destination) {
        map.flyto([destination.lat, destination.lng],6,{duration:0.8})
    }
    return null
}

export default function MapView({destinations, selected, onSelect}){
    return(
        <div className="map">
        <MapContainer center={[48.8566,2.3522]} zoom={4} scrollWheelZoom style={{height:"100%", width:"100%"}}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Flyto destination={selected}/>

        {destinations.map((d) => (
            <Marker
            key={d.id}
            position={[d.lat,d.lng]}
            eventHandlers={{
                click: () => onSelect(d)
            }}>
             <Popup>
             <strong>{d.city}</strong>, {d.country}
             </Popup>
            </Marker>
        ))}
        </MapContainer>
        </div>
    )
}