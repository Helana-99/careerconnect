import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [individuals, setIndividuals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch individuals
        const individualsResponse = await axios.get('http://127.0.0.1:8000/api/individual/search/', {
          params: { username: query, specialization: '' } // Adjust params as needed
        });
        setIndividuals(individualsResponse.data);

        // Fetch companies
        const companiesResponse = await axios.get('http://127.0.0.1:8000/api/company/search/', {
          params: { company_name: query, location: '', industry: '' } // Adjust params as needed
        });
        setCompanies(companiesResponse.data);

      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Search Results</h2>

      {/* Individuals Section */}
      <section className="card-section py-5">
        <div className="container">
          <h2>Individuals</h2>
          <div className="row">
            {individuals.length > 0 ? (
              individuals.map((individual) => (
                <div key={individual.id} className="col-md-4">
                  <div className="card cards bg-light mb-4">
                    <div className="card-body">
                      <h6 className="card-title text-secondary">{individual.specialization || 'N/A'}</h6>
                      <h5 className="card-title fs-6">
                        <Link to={`/individual/profile/${individual.user.id}`} className="text-decoration-none text-dark">
                          {individual.user.username}
                        </Link>
                      </h5>
                      <p className="card-text text-muted">{individual.location || 'N/A'}</p>
                      <Link to={`/individual/profile/${individual.user.id}`} className="btn btn-outline-info">
                        View Profile &gt;
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No individuals found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="card-section py-5">
        <div className="container">
          <h2>Companies</h2>
          <div className="row">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div key={company.id} className="col-md-4">
                  <div className="card cards bg-light mb-4">
                    <div className="card-body">
                      <h6 className="card-title text-secondary">{company.industry || 'N/A'}</h6>
                      <h5 className="card-title fs-6">
                        <Link to={`/company/profile/${company.user.username}`} className="text-decoration-none text-dark">
                          {company.user.username}
                        </Link>
                      </h5>

                      <p className="card-text text-muted">{company.location || 'N/A'}</p>
                      <Link to={`/company/authorprofile/${company.user.username}`} className="btn btn-outline-info">
                        View Company &gt;
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No companies found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
