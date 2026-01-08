import"./searchbar.css"
export default function searchbar({budget,setBudget,tripType,setTripType}) {
    return(
       <>
       <div className="search-section">
       
       <label className="searchbar">
       <span>Budget(£)</span>
       <input 
        type="number"
        min= {0}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        placeholder="e.g 200"
       />
      </label>

      <label className="trip-type">
      <span>Trip type</span>
      <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
      <option value= "oneway"> One-way</option>
      <option value= "return">Return</option>
      </select>
      </label>
       
       </div>
       </>
 )
}