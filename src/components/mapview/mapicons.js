import L from "leaflet"

const baseIcon = {
    iconSize : [25, 41],
    shadowSize : [50,64],
    iconAnchor:[1, -34],
    shadowSize: [41,41]
}
// Default (not saved)
export const defaultIcon = new L.Icon({
  ...baseIcon,
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Saved destination icon
export const savedIcon = new L.Icon({
  ...baseIcon,
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});