import parisImg from '../assets/paris.avif'
import berlinImg from '../assets/berlin.jpg'
import budapestImg from '../assets/budapest.jpg'
import amsterdamImg from '../assets/amsterdam.jpg'
import romeImg from '../assets/rome.jpg'
import barcelonaImg from '../assets/barcelona.webp'
import lisbonImg from '../assets/lisbon.webp'
import madridImg from '../assets/madrid.jpg'
import pragueImg from '../assets/prague.jpg'
import viennaImg from '../assets/vienna.jpg'
import athensImg from '../assets/athens.avif'
import copenhagenImg from '../assets/copenhagen.avif'
import stockholmImg from '../assets/stockholm.jpg'
import osloImg from '../assets/oslo.avif'
import zurichImg from '../assets/zurich.avif'
import dubaiImg from '../assets/dubai.jpg'
import istanbulImg from '../assets/istanbul.jpeg'
import newyorkImg from '../assets/newyork.webp'
import tokyoImg from '../assets/tokyo.webp'
import jakartaImg from '../assets/jakarta.jpg'



const destinations = [
  {
    id: "PAR",
    city: "Paris",
    country: "France",
    image: parisImg,
    lat: 48.8566,
    lng: 2.3522,
    oneWayPrice: 20,
    returnPrice: 40,
    tags: ["City", "Culture", "Romantic"]
  },
  {
    id: "BER",
    city: "Berlin",
    country: "Germany",
    image:berlinImg,
    lat: 52.52,
    lng: 13.405,
    oneWayPrice: 30,
    returnPrice: 60,
    tags: ["City", "History", "Nightlife"]
  },
  {
    id: "BUD",
    city: "Budapest",
    country: "Hungary",
    image:budapestImg,
    lat: 47.4979,
    lng: 19.0402,
    oneWayPrice: 56,
    returnPrice: 110,
    tags: ["City", "Thermal Baths", "Budget"]
  },
  {
    id: "AMS",
    city: "Amsterdam",
    country: "Netherlands",
    image:amsterdamImg,
    lat: 52.3676,
    lng: 4.9041,
    oneWayPrice: 45,
    returnPrice: 90,
    tags: ["City", "Canals", "Culture"]
  },
  {
    id: "ROM",
    city: "Rome",
    country: "Italy",
    image:romeImg,
    lat: 41.9028,
    lng: 12.4964,
    oneWayPrice: 55,
    returnPrice: 110,
    tags: ["History", "Culture", "Food"]
  },
  {
    id: "BCN",
    city: "Barcelona",
    country: "Spain",
    image:barcelonaImg,
    lat: 41.3851,
    lng: 2.1734,
    oneWayPrice: 50,
    returnPrice: 100,
    tags: ["Beach", "City", "Food"]
  },
  {
    id: "LIS",
    city: "Lisbon",
    country: "Portugal",
    image:lisbonImg,
    lat: 38.7223,
    lng: -9.1393,
    oneWayPrice: 60,
    returnPrice: 120,
    tags: ["City", "Coastal", "Food"]
  },
  {
    id: "MAD",
    city: "Madrid",
    country: "Spain",
    image:madridImg,
    lat: 40.4168,
    lng: -3.7038,
    oneWayPrice: 48,
    returnPrice: 96,
    tags: ["City", "Culture", "Nightlife"]
  },
  {
    id: "PRG",
    city: "Prague",
    country: "Czech Republic",
    image:pragueImg,
    lat: 50.0755,
    lng: 14.4378,
    oneWayPrice: 52,
    returnPrice: 104,
    tags: ["City", "Architecture", "Budget"]
  },
  {
    id: "VIE",
    city: "Vienna",
    country: "Austria",
    image:viennaImg,
    lat: 48.2082,
    lng: 16.3738,
    oneWayPrice: 58,
    returnPrice: 116,
    tags: ["City", "Culture", "Music"]
  },
  {
    id: "ATH",
    city: "Athens",
    country: "Greece",
    image:athensImg,
    lat: 37.9838,
    lng: 23.7275,
    oneWayPrice: 65,
    returnPrice: 130,
    tags: ["History", "Culture", "Sunny"]
  },
  {
    id: "CPH",
    city: "Copenhagen",
    country: "Denmark",
    image:copenhagenImg,
    lat: 55.6761,
    lng: 12.5683,
    oneWayPrice: 70,
    returnPrice: 140,
    tags: ["City", "Design", "Cycling"]
  },
  {
    id: "STO",
    city: "Stockholm",
    country: "Sweden",
    image:stockholmImg,
    lat: 59.3293,
    lng: 18.0686,
    oneWayPrice: 75,
    returnPrice: 150,
    tags: ["City", "Nature", "Scandinavian"]
  },
  {
    id: "OSL",
    city: "Oslo",
    country: "Norway",
    image: osloImg,
    lat: 59.9139,
    lng: 10.7522,  
    oneWayPrice: 85,
    returnPrice: 170,
    tags: ["Nature", "City", "Scenic"]
  },
  {
    id: "ZRH",
    city: "Zurich",
    country: "Switzerland",
    image: zurichImg,
    lat: 47.3769,
    lng: 8.5417,
    oneWayPrice: 90,
    returnPrice: 180,
    tags: ["City", "Lakes", "Mountains"]
  },
  {
    id: "DXB",
    city: "Dubai",
    country: "UAE",
    image: dubaiImg,
    lat: 25.2048,
    lng: 55.2708,
    oneWayPrice: 220,
    returnPrice: 400,
    tags: ["Luxury", "City", "Modern"]
  },
  {
    id: "IST",
    city: "Istanbul",
    country: "Turkey",
    image: istanbulImg,
    lat: 41.0082,
    lng: 28.9784,
    oneWayPrice: 80,
    returnPrice: 150,
    tags: ["Culture", "Food", "Historic"]
  },
  {
    id: "NYC",
    city: "New York",
    country: "USA",
    image: newyorkImg,
    lat: 40.7128,
    lng: -74.006,
    oneWayPrice: 300,
    returnPrice: 550,
    tags: ["City", "Culture", "Iconic"]
  },
  {
    id: "TYO",
    city: "Tokyo",
    country: "Japan",
    image: tokyoImg,
    lat: 35.6762,
    lng: 139.6503,
    oneWayPrice: 450,
    returnPrice: 800,
    tags: ["City", "Technology", "Culture"]
  },
  {
    id: "JKT",
    city: "Jakarta",
    country: "Indonesia",
    image: jakartaImg,
    lat: -6.2088,
    lng: 106.8456,
    oneWayPrice: 400,
    returnPrice: 750,
    tags: ["City", "Tropical", "Asia"]
  }
];

export default destinations;