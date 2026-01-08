import { useState, useMemo} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Searchbar from './components/searchbar/searchbar'
import destinations from './data/destination'

function App() {
  const [budget,setBudget] = useState();
  const [tripType,setTripType] = useState("one-way")


  const priceKey = tripType === "return" ? "returnPrice" : "oneWayPrice";
  const filtered = useMemo(() => {
    if (budget === "") return [];
    return destinations
    .filter(d => d[priceKey] <= budget)
    .sort((a,b) => a[priceKey] - b[priceKey])
  }, [budget,tripType])
  
  return (
    <>
    <div className='page'>
    
    <h1>Budget Trip Finder</h1>
    
    <Searchbar
    budget = {budget}
    setBudget = {setBudget}
    tripType = {tripType}
    setTripType = {setTripType}
    />
    
    <h2 className='results'>Results</h2>

    {filtered.length === 0 ? (
      <p>No destinations within the provided budget</p>
    ) : (
    <ul>
     {filtered.map((d) => {
      const price = d[priceKey];
      return (<li key ={d.id}>
       {d.city}, {d.country} - £{price}
      </li>
      );
     })}
    </ul>)}

    </div>
    </>
  )
}

export default App
