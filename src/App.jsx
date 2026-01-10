import { useState, useMemo,  useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Searchbar from './components/searchbar/searchbar'
import destinations from './data/destination'

function App() {
  const [budget, setBudget] = useState("");
  const [tripType, setTripType] = useState("one-way")


  const priceKey = tripType === "return" ? "returnPrice" : "oneWayPrice";
  const filtered = useMemo(() => {
    if (budget === "") return [];
    return destinations
      .filter(d => d[priceKey] <= budget)
      .sort((a, b) => a[priceKey] - b[priceKey])
  }, [budget, tripType])


  const LS_KEY = "savedTrips"
  const [savedTrips,setSavedTrips] = useState(() =>{
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : []
  });

  
  function toggleSave(destination) {
    setSavedTrips((prev) => {
    const exists = prev.some((d) => d.id === destination.id)
    return exists  ? prev.filter((d) => d.id !== destination.id) : [...prev, destination]
  });
  }    

  useEffect(() => {
    localStorage.setItem(LS_KEY,JSON.stringify(savedTrips))
  },[savedTrips]);



  return (
    <>
      <div className='page'>

        <h1>Budget Trip Finder</h1>

        <Searchbar
          budget={budget}
          setBudget={setBudget}
          tripType={tripType}
          setTripType={setTripType}
        />

        <h2 className='results'>Results</h2>

        {filtered.length === 0 ? (
          <p>No destinations within the provided budget</p>
        ) : (
          <ul>
            {filtered.map((d) => {
              const price = d[priceKey];
              const isSaved = savedTrips.some((t) => t.id === d.id)
              return (
              <li key={d.id}>
                <span>
                  {d.city}, {d.country} - £{price}
                </span>
                <button 
                type ="button"
                onClick = {() => toggleSave(d)}
                 aria-label ={isSaved ? "Unsave destination" : "Save destination"}>
                 {isSaved ? "★" : "☆"}
               </button>
              </li>
              );
            })}
          </ul>)}
        
      <h2 className='Results'>Saved Trips</h2>
         
      {savedTrips.length === 0 ? (
        <p>No Saved Destinations Yet</p>
      ) : (
        <ul>
          {savedTrips.map((d) => {
           const price = d[priceKey];
           return (
            <li key = {d.id}>
            <span>
            {d.city}, {d.country} - £{price}
            </span>
            <button 
            type="button"
            onClick={() => toggleSave(d)}
            aria-label="Unsave destination">
             ★
            </button>
            </li>
           )
          })}
        </ul>
      )}
      </div>
    </>
  )
}

export default App
