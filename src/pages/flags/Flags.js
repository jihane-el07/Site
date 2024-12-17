import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flags.css';

const Flags = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5); // Display 5 flags at a time
  const [selectedCountry, setSelectedCountry] = useState(null); // Selected country details
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://restcountries.com/v3.1/all');
        // Filter out Israel
        const filteredCountries = response.data.filter(
          (country) => country.name.common !== 'Israel'
        );
        setCountries(filteredCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Search filtering
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the flags to display based on the current page
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Navigate to the next or previous page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCountries.length / countriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Show details of a selected country
  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>WorldQuest</h1>
      <input
        type="text"
        placeholder="Rechercher un pays..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="the">
          {selectedCountry ? (
            <div className="country-details">
              
              <img
                src={selectedCountry.flags?.svg || 'https://via.placeholder.com/150'}
                alt={`${selectedCountry.name.common} flag`}
              />
              <h2>{selectedCountry.name.common}</h2>
              <p>Capital: {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
              <p>Region: {selectedCountry.region}</p>
              <p>Subregion: {selectedCountry.subregion}</p>
              <p>Population: {selectedCountry.population.toLocaleString()}</p>
              <button onClick={() => setSelectedCountry(null)} className="back-button">
                Retour
              </button>
            </div>
          ) : (
            <>
              <div className="flag-grid">
                {currentCountries.map((country) => (
                  <div
                    key={country.cca3}
                    className="flag-card"
                    onClick={() => showCountryDetails(country)}
                  >
                    <img
                      src={country.flags?.svg || 'https://via.placeholder.com/150'}
                      alt={`${country.name.common} flag`}
                    />
                    <h2>{country.name.common}</h2>
                  </div>
                ))}
              </div>

              <div className="pagination-buttons">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Précédent
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredCountries.length / countriesPerPage)}
                >
                  Suivant
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Flags;
