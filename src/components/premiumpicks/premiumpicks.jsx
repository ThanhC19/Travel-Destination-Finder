import "./premiumpicks.css"

export default function PremiumPicks({ trips, onSelect, priceKey, checkIsSaved, toggleSave }) {
  if (!trips || trips.length === 0) return null;

  return (
    <section className="premium-section">
      <h2 className="section-title">✨ Top Destinations</h2>
      <div className="premium-grid">
        {trips.map((d) => (
          <div key={d.id} className="premium-card" onClick={() => onSelect(d)}>
            <div className="premium-img-wrap">
              <img src={d.image} alt={d.city} className="premium-img" />
            </div>

            <div className="premium-content">
              <div className="premium-header">
                <div>
                  <h3>{d.city}</h3>
                  <p className="premium-country">{d.country}</p>
                </div>
                <button 
                  className={`premium-star ${checkIsSaved(d.id) ? 'saved' : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    toggleSave(d); 
                  }}
                >
                  {checkIsSaved(d.id) ? "★" : "☆"}
                </button>
              </div>

              {/* Price moved above tags */}
              <div className="premium-footer">
                <p className="premium-price">From £{d[priceKey]}</p>
              </div>

              {/* Tags at the bottom */}
              <div className="tag-container">
                {d.tags && d.tags.map(tag => (
                  <span key={tag} className="tag-text">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}