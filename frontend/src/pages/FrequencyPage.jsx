import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext.jsx"; // Adjust path as needed

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

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const x = queryParams.get("x") || 10;
  const divs = queryParams.get("divs") || "";
  const indexes = queryParams.get("indexes") || "";

  useEffect(() => {
      const currentQuery = location.search;
      
      // Only fetch if we don't have data or query changed
      
      if ((!data || lastQuery !== currentQuery)) {
        fetchAnalysisData(currentQuery);       
      }

    }, [location.search, data, lastQuery, fetchAnalysisData]);
  
  const handleNavigation = (path) => {
    if (path === "/recent-contests") {
      // Pass contests data to Recent Contests page
      navigate("/recent-contests");
    } else if (path === "/recent-problems") {
      // Pass problems data to Recent Problems page  
      navigate("/recent-problems");
    } else {
      navigate(path);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        {/* Dashboard Header */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid px-4">
            <a className="navbar-brand fw-bold fs-4" href="#">
              <i className="fas fa-code me-2"></i>
              Codeforces Analytics
            </a>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home me-1"></i>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold active"
                  >
                    <i className="fas fa-tags me-1"></i>
                    Frequent Tags
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => handleNavigation("/recent-contests")}
                  >
                    <i className="fas fa-trophy me-1"></i>
                    Recent Contests
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => handleNavigation("/recent-problems")}
                  >
                    <i className="fas fa-puzzle-piece me-1"></i>
                    Recent Problems
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-dark">Analyzing Tag Frequencies...</h4>
            <p className="text-muted">Please wait while we process the data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light">
        {/* Dashboard Header */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid px-4">
            <a className="navbar-brand fw-bold fs-4" href="#">
              <i className="fas fa-code me-2"></i>
              Codeforces Analytics
            </a>
            
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home me-1"></i>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white fw-semibold active">
                    <i className="fas fa-tags me-1"></i>
                    Frequent Tags
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body p-5">
                <i className="fas fa-exclamation-circle text-danger fs-1 mb-3"></i>
                <h4 className="card-title text-dark mb-3">Error Loading Data</h4>
                <p className="card-text text-muted mb-4">
                  {error}
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-outline-primary px-4"
                  >
                    <i className="fas fa-redo me-2"></i>
                    Retry
                  </button>
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
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-vh-100 bg-light">
        {/* Dashboard Header */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid px-4">
            <a className="navbar-brand fw-bold fs-4" href="#">
              <i className="fas fa-code me-2"></i>
              Codeforces Analytics
            </a>
            
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home me-1"></i>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white fw-semibold active">
                    <i className="fas fa-tags me-1"></i>
                    Frequent Tags
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body p-5">
                <i className="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                <h4 className="card-title text-dark mb-3">No Results Found</h4>
                <p className="card-text text-muted mb-4">
                  Unable to find any problems based on your filters. Please try adjusting your search criteria.
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
    <div className="min-vh-100 bg-light">
      {/* Dashboard Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold fs-4" href="#">
            <i className="fas fa-code me-2"></i>
            Codeforces Analytics
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-home me-1"></i>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white fw-semibold active">
                  <i className="fas fa-tags me-1"></i>
                  Frequent Tags
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => handleNavigation("/recent-contests")}
                >
                  <i className="fas fa-trophy me-1"></i>
                  Recent Contests
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => handleNavigation("/recent-problems")}
                >
                  <i className="fas fa-puzzle-piece me-1"></i>
                  Recent Problems
                </button>
              </li>
            </ul>
          </div>
          </div>
        </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Header Section */}
            <div className="card shadow-lg border-0 rounded-4 mb-4">
              <div className="card-header bg-gradient bg-primary text-white py-4 rounded-top-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h1 className="h2 fw-bold mb-1">
                      <i className="fas fa-chart-bar me-2"></i>
                      Tag Frequency Analysis
                    </h1>
                    <p className="mb-0 opacity-75">Analysis results from recent Codeforces contests</p>
                  </div>
                  <button 
                    onClick={() => navigate("/")} 
                    className="btn btn-light btn-sm"
                  >
                    <i className="fas fa-arrow-left me-1"></i>
                    New Analysis
                  </button>
                </div>
              </div>
              
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card border-0 bg-primary bg-opacity-10 h-100">
                      <div className="card-body text-center py-3">
                        <div className="text-primary mb-2">
                          <i className="fas fa-calendar-alt fs-4"></i>
                        </div>
                        <small className="text-muted d-block">Contests Analyzed</small>
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

            {/* Frequency Table */}
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-white border-0 py-4 rounded-top-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="h4 fw-bold mb-0 text-dark">
                    <i className="fas fa-tags me-2 text-primary"></i>
                    Tag Frequency Distribution
                  </h3>
                  <span className="badge bg-primary fs-6">
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
                          <i className="fas fa-hashtag me-2"></i>Rank
                        </th>
                        <th scope="col" className="py-3">
                          <i className="fas fa-tag me-2"></i>Tag
                        </th>
                        <th scope="col" className="py-3">
                          <i className="fas fa-chart-bar me-2"></i>Frequency
                        </th>
                        <th scope="col" className="py-3">
                          <i className="fas fa-percentage me-2"></i>Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.result.arrayTagCounts?.map(([tag, freq], index) => {
                        const totalProblems = data.result.problems.length;
                        const percentage = ((freq / totalProblems) * 100).toFixed(1);
                        const isTopThree = index < 3;
                        
                        return (
                          <tr key={tag} className={isTopThree ? 'table-warning' : ''}>
                            <td className="py-3 ps-4">
                              <div className="d-flex align-items-center">
                                {isTopThree && <i className="fas fa-trophy text-warning me-2"></i>}
                                <span className={`badge ${isTopThree ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                  #{index + 1}
                                </span>
                              </div>
                            </td>
                            <td className="py-3">
                              <code className="text-primary bg-light px-2 py-1 rounded">
                                {tag}
                              </code>
                            </td>
                            <td className="py-3">
                              <div className="d-flex align-items-center">
                                <span className="fw-bold me-3 text-dark">{freq}</span>
                                <div className="progress flex-grow-1" style={{ height: '10px', maxWidth: '150px' }}>
                                  <div 
                                    className={`progress-bar ${isTopThree ? 'bg-warning' : 'bg-primary'}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={`badge ${isTopThree ? 'bg-warning text-dark' : 'bg-primary'}`}>
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

            {/* Quick Actions */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <button 
                  onClick={() => handleNavigation("/recent-contests")}
                  className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                >
                  <i className="fas fa-trophy me-2"></i>
                  View Recent Contests ({data.result.contests?.length || 0})
                </button>
              </div>
              <div className="col-md-6">
                <button 
                  onClick={() => handleNavigation("/recent-problems")}
                  className="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center"
                >
                  <i className="fas fa-puzzle-piece me-2"></i>
                  View All Problems ({data.result.problems?.length || 0})
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">
            <i className="fas fa-heart text-danger me-1"></i>
            Made for Codeforces enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
}