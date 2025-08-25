import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext.jsx";
import Header from "../components/Header.jsx"; 
import Footer from "../components/Footer.jsx"; 

export default function FrequencyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    analysisData: data, 
    loading, 
    error, 
    lastQuery ,
    fetchAnalysisData, 
  } = useDataContext();

  const queryParams = new URLSearchParams(location.search);
  const x = queryParams.get("x") || 10;
  const divs = queryParams.get("divs") || "";
  const indexes = queryParams.get("indexes") || "";

  useEffect(() => {
      const currentQuery = location.search;
      if ((!data || lastQuery !== currentQuery)) {
        fetchAnalysisData(currentQuery);       
      }
    }, [location.search, data, lastQuery, fetchAnalysisData]);
  
  const handleNavigation = (path) => {
    if (path === "/recent-contests") {
      navigate("/recent-contests");
    } else if (path === "/recent-problems") {
      navigate("/recent-problems");
    } else {
      navigate(path);
    }
  };

  const getRankStyling = () => {
    return {
      badgeClass: 'bg-black text-white',
      progressClass: 'bg-secondary'
    };
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-dark">Please Wait</h4>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <Header />
        <div className="text-center">
          <div className="card shadow-lg border-0" style={{ maxWidth: "400px" }}>
            <div className="card-body p-4">
              <i className="fas fa-exclamation-circle text-danger fs-2 mb-3"></i>
              <h4 className="text-dark mb-3">Error Loading Data</h4>
              <p className="text-muted mb-4">{error}</p>
              <div className="d-flex gap-2 justify-content-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-outline-primary"
                >
                  <i className="fas fa-redo me-1"></i>
                  Retry
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-primary"
                >
                  <i className="fas fa-arrow-left me-1"></i>
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-vh-100 bg-light">
        <Header />
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body p-5">
                <i className="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                <h4 className="card-title text-dark mb-3">No Results Found</h4>
                <p className="card-text text-muted mb-4">
                  Unable to find any problems based on your filters.
                </p>
                <button 
                  onClick={() => navigate("/")} 
                  className="btn btn-primary px-4"
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(130deg, rgb(119, 162, 215), rgb(83, 163, 83))" }}>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            <div className="card shadow-lg border-0 rounded-4 mb-4">
              <div className="card-header bg-gradient bg-black text-white py-4 rounded-top-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h1 className="h2 fw-bold mb-1">
                      <i className="fas fa-code me-2"></i>
                      Search Completed
                    </h1>
                    <p className="mb-0 opacity-75">Parameters used for search:</p>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card border-0 bg-black bg-opacity-10 h-100">
                      <div className="card-body text-center py-3">
                        <div className="text-primary mb-2">
                          <i className="fas fa-calendar-alt fs-4"></i>
                        </div>
                        <small className="text-muted d-block">Number of Contests</small>
                        <span className="fw-bold h4 mb-0 text-primary">{x}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 bg-success bg-opacity-10 h-100">
                      <div className="card-body text-center py-3">
                        <div className="text-success mb-2">
                          <i className="fas fa-layer-group fs-4"></i>
                        </div>
                        <small className="text-muted d-block">Divisions</small>
                        <span className="fw-bold h4 mb-0 text-success">{divs || "All"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 bg-info bg-opacity-10 h-100">
                      <div className="card-body text-center py-3">
                        <div className="text-info mb-2">
                          <i className="fas fa-list-ol fs-4"></i>
                        </div>
                        <small className="text-muted d-block">Problem Indexes</small>
                        <span className="fw-bold h4 mb-0 text-info">{indexes || "All"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-white border-0 py-4 rounded-top-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="h4 fw-bold mb-0 text-dark">
                    Distribution of Topics:
                  </h3>
                  <span className="badge bg-black fs-6">
                    {data.result.arrayTagCounts?.length || 0} Tags Found
                  </span>
                </div>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" className="py-3 ps-4">
                          Rank
                        </th>
                        <th scope="col" className="py-3">
                          Tag
                        </th>
                        <th scope="col" className="py-3">
                          Frequency
                        </th>
                        <th scope="col" className="py-3">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.result.arrayTagCounts?.map(([tag, freq], index) => {
                        const totalProblems = data.result.problems.length;
                        const percentage = ((freq / totalProblems) * 100).toFixed(1);
                        const styling = getRankStyling();
                        
                        return (
                          <tr key={tag} className={styling.rowClass}>
                            <td className="py-3 ps-4">
                              <span className={`badge ${styling.badgeClass}`}>
                                #{index + 1}
                              </span>
                            </td>
                            <td className="py-3">
                              <code className="bold text-gray bg-white px-2 py-1 rounded">
                                {tag}
                              </code>
                            </td>
                            <td className="py-3">
                              <div className="d-flex align-items-center">
                                <span className="fw-bold me-3 text-dark">{freq}</span>
                                <div className="progress flex-grow-1" style={{ height: '10px', maxWidth: '150px' }}>
                                  <div 
                                    className="progress-bar bg-gray"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={`badge ${styling.badgeClass}`}>
                                {percentage}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <button 
                  onClick={() => handleNavigation("/recent-contests")}
                  className="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center bg-white"
                >
                  <i className="fas fa-trophy me-2"></i>
                  View Recent Contests ({data.result.filteredContests?.length || 0})
                </button>
              </div>
              <div className="col-md-6">
                <button 
                  onClick={() => handleNavigation("/recent-problems")}
                  className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center bg-white"
                >
                  <i className="fas fa-puzzle-piece me-2"></i>
                  View All Problems ({data.result.problems?.length || 0})
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}