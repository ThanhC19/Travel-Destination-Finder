import "./searchbar.css"

export default function Searchbar({ budget, setBudget, tripType, setTripType }) {
  return (
    <div className="search-section">
      <div className="search-container">
        {/* Budget Input Group */}
        <div className="input-group">
          <span className="input-icon">💷</span>
          <div className="input-stack">
            <label>Max Budget</label>
            <input
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 200"
            />
          </div>
        </div>

        <div className="divider"></div>

        {/* Trip Type Group */}
        <div className="input-group">
          <span className="input-icon">✈️</span>
          <div className="input-stack">
            <label>Trip Type</label>
            <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
              <option value="oneway">One-way</option>
              <option value="return">Return</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}