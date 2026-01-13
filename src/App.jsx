import { useState, useMemo, useEffect } from 'react'
import './App.css'
import Searchbar from './components/searchbar/searchbar'
import destinations from './data/destination'
import MapView from './components/mapview/mapview'
import PremiumPicks from './components/premiumpicks/premiumpicks'

function App() {
  const [budget, setBudget] = useState(0);
  const [tripType, setTripType] = useState("one-way")
  const [selected, setSelected] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const priceKey = tripType === "return" ? "returnPrice" : "oneWayPrice";
  
  const filtered = useMemo(() => {
    if (budget === "") return [];
    return destinations
      .filter(d => d[priceKey] <= budget)
      .sort((a, b) => a[priceKey] - b[priceKey])
  }, [budget, priceKey])

  const premiumPicks = useMemo(() => {
  if (filtered.length === 0) return [];
  return [...filtered].sort((a, b) => b[priceKey] - a[priceKey]).slice(0, 5);
}, [filtered, priceKey]);

const checkIsSaved = (id) => savedTrips.some((t) => t.id === id && t.type === tripType);


  const LS_KEY = "savedTrips"
  const LS_VERSION_KEY = "savedTripsVersion"
  const CURRENT_VERSION = "2"
  
  const [savedTrips, setSavedTrips] = useState(() => {
    const version = localStorage.getItem(LS_VERSION_KEY);
    const raw = localStorage.getItem(LS_KEY);
    

    if (version !== CURRENT_VERSION) {
      localStorage.setItem(LS_VERSION_KEY, CURRENT_VERSION);
      localStorage.removeItem(LS_KEY);
      return [];
    }
    
    if (!raw) return [];
    return JSON.parse(raw);
  });

 function toggleSave(destination) {
  setSavedTrips((prev) => {
    const exists = prev.some((t) => t.id === destination.id && t.type === tripType);
    let newTrips;
    if (exists) {
      newTrips = prev.filter((t) => !(t.id === destination.id && t.type === tripType));
    } else {
      newTrips = [...prev, { ...destination, type: tripType, savedPrice: destination[priceKey] }];
    }
    return newTrips;
  });
}

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(savedTrips))
  }, [savedTrips]);


  return (
  
    <div className="app-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className='page'>
        
        <header className="header">
          <h1>Budget Trip Finder</h1>
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <Searchbar
          budget={budget}
          setBudget={setBudget}
          tripType={tripType}
          setTripType={setTripType}
        />

        <PremiumPicks 
        trips={premiumPicks} 
        onSelect={setSelected} 
        priceKey={priceKey}
        checkIsSaved={checkIsSaved}
        toggleSave={toggleSave}
      />

        <section className="main-content">
          <div className="results-container">
            <h2 className='results'>Results</h2>
            {filtered.length === 0 ? (
              <p className="empty-msg">No destinations within budget</p>
            ) : (
              <div className="card-grid">
                {filtered.map((d) => {
                  const price = d[priceKey];
                  const isSaved = savedTrips.some((t) => t.id === d.id && t.type === tripType);
                  return (
                    <div key={d.id} className={`card ${selected?.id === d.id ? 'active' : ''}`} onClick={() => setSelected(d)}>
                      <div className="card-info">
                        <h3>{d.city}</h3>
                        <p>{d.country}</p>
                        <span className="price">£{price}</span>
                      </div>
                      <button 
                        className={`save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleSave(d); }}
                        aria-label={isSaved ? "Unsave" : "Save"}>
                        {isSaved ? "★" : "☆"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="map-container">
            <h2>Live Map</h2>
            <MapView 
              destinations={filtered} 
              selected={selected} 
              onSelect={setSelected} 
              savedTrips={savedTrips}
              toggleSave={toggleSave}
              priceKey={priceKey}
              tripType={tripType}
            />
          </div>
        </section>
        
        {/* Saved Trips Section */}
        {savedTrips.length > 0 && (
          <section className="saved-section">
            <h2>Saved Trips</h2>
            <div className="card-grid">
              {savedTrips.map((d) => (
                <div key={`${d.id}-${d.type}`} className={`card saved-card ${selected?.id === d.id ? 'active' : ''}`} onClick={() => setSelected(d)}>
                  <div className="card-info">
                    <h3>{d.city} ({d.type})</h3>
                    <span className="price">£{d.savedPrice}</span>
                  </div>
                  <button 
            className="save-btn saved"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSavedTrips(prev => prev.filter(t => !(t.id === d.id && t.type === d.type))); 
            }}>★</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App;
