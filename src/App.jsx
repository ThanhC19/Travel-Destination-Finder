import { useState, useMemo, useEffect } from 'react'
import './App.css'
import Searchbar from './components/searchbar/searchbar'
import destinations from './data/destination'
import MapView from './components/mapview/mapview'


function App() {
  const [budget, setBudget] = useState("");
  const [tripType, setTripType] = useState("one-way")
  const [selected, setSelected] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(true);

  const priceKey = tripType === "return" ? "returnPrice" : "oneWayPrice";
  
  const filtered = useMemo(() => {
    if (budget === "") return [];
    return destinations
      .filter(d => d[priceKey] <= budget)
      .sort((a, b) => a[priceKey] - b[priceKey])
  }, [budget, tripType])


  const LS_KEY = "savedTrips"
  const [savedTrips, setSavedTrips] = useState(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : []
  });

  function toggleSave(destination) {
    setSavedTrips((prev) => {
      const exists = prev.some((d) => d.id === destination.id)
      return exists ? prev.filter((d) => d.id !== destination.id) : [...prev, destination]
    });
  }

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(savedTrips))
  }, [savedTrips]);


  return (
  
    <div className="app-container" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className='page'>
        
        <header className="header">
          <h1 className="title">Budget Trip Finder</h1>
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

        <section className="main-content">
          <div className="results-container">
            <h2 className='results'>Results</h2>
            {filtered.length === 0 ? (
              <p className="empty-msg">No destinations within budget</p>
            ) : (
              <div className="card-grid">
                {filtered.map((d) => {
                  const price = d[priceKey];
                  const isSaved = savedTrips.some((t) => t.id === d.id)
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
            />
          </div>
        </section>
        
        {/* Saved Trips Section */}
        {savedTrips.length > 0 && (
          <section className="saved-section">
            <h2>Saved Trips</h2>
            <div className="card-grid">
              {savedTrips.map((d) => (
                <div key={d.id} className={`card saved-card ${selected?.id === d.id ? 'active' : ''}`} onClick={() => setSelected(d)}>
                  <div className="card-info">
                    <h3>{d.city}</h3>
                    <span className="price">£{d[priceKey]}</span>
                  </div>
                  <button onClick={() => toggleSave(d)}>★</button>
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
