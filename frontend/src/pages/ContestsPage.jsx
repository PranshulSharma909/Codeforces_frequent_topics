import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDataContext } from "../context/dataContext.jsx";

export default function RecentContestsPage() {
  const navigate = useNavigate();
  const { analysisData } = useDataContext();
  const contests = analysisData?.result?.filteredContests || [];

  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleNavigation = (path) => {
    if (path === "/recent-problems") {
      navigate("/recent-problems");
    } else {
      navigate(path);
    }
  };

  // Sort contests based on selected criteria
  const sortedContests = [...contests].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.startTimeSeconds * 1000) - new Date(b.startTimeSeconds * 1000);
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'division':
        const divA = a.name.match(/Div\.\s*(\d+)/)?.[1] || '0';
        const divB = b.name.match(/Div\.\s*(\d+)/)?.[1] || '0';
        comparison = parseInt(divA) - parseInt(divB);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDivisionBadge = (contestName) => {
    const divMatch = contestName.match(/Div\.\s*(\d+)/);
    if (divMatch) {
      const div = divMatch[1];
      const colors = {
        '1': 'bg-danger',
        '2': 'bg-primary',
        '3': 'bg-success',
        '4': 'bg-secondary'
      };
      return (
        <span className={`badge ${colors[div] || 'bg-secondary'} me-2`}>
          Div. {div}
        </span>
      );
    }
    return null;
  };

  const getContestType = (contestName) => {
    if (contestName.includes('Educational')) return { text: 'Educational', class: 'bg-info' };
    if (contestName.includes('Global')) return { text: 'Global', class: 'bg-warning text-dark' };
    if (contestName.includes('Round')) return { text: 'Round', class: 'bg-primary' };
    return { text: 'Contest', class: 'bg-secondary' };
  };

  // Show message if no data available
  if (!analysisData) {
    return (
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid px-4">
            <a className="navbar-brand fw-bold fs-4" href="#">
              Codeforces Analytics
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white fw-semibold"
                    onClick={() => navigate("/")}
                  >
                    Home
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
                <h4 className="card-title text-dark mb-3">No Analysis Data</h4>
                <p className="card-text text-muted mb-4">
                  Please run an analysis from the home page first to view contest data.
                </p>
                <button 
                  onClick={() => navigate("/")} 
                  className="btn btn-primary px-4"
                >
                  Go to Home
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
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => navigate("/tags/frequency")}
                >
                  Frequent Tags
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white fw-semibold active">
                  Recent Contests
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => handleNavigation("/recent-problems")}
                >
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
                      Recent Contests
                    </h1>
                    <p className="mb-0 opacity-75">Latest Codeforces contests from your analysis</p>
                  </div>
                  <button 
                    onClick={() => navigate("/tags/frequency")} 
                    className="btn btn-light btn-sm"
                  >
                    Back
                  </button>
                </div>
              </div>
              
              <div className="card-body p-4">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <div>
                        <h4 className="mb-0 fw-bold text-primary">{contests.length}</h4>
                        <small className="text-muted">Total Contests</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sort Controls */}
                  <div className="col-md-6">
                    <div className="d-flex gap-2 align-items-center justify-content-md-end">
                      <label className="form-label mb-0 text-muted small">Sort by:</label>
                      <select 
                        className="form-select form-select-sm" 
                        style={{ width: 'auto' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                        <option value="division">Division</option>
                      </select>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contests List */}
            {contests.length === 0 ? (
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body text-center py-5">
                  <h4 className="text-dark mb-3">No Contests Found</h4>
                  <p className="text-muted mb-4">
                    No contest data is available. Please run a new analysis from the home page.
                  </p>
                  <button 
                    onClick={() => navigate("/")} 
                    className="btn btn-primary px-4"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {sortedContests.map((contest, index) => {
                  const contestType = getContestType(contest.name);
                  
                  return (
                    <div key={contest.id} className="col-lg-6">
                      <div className="card shadow-sm border-0 rounded-3 h-100 contest-card">
                        <div className="card-body p-4">

                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <small className="text-muted">#{index + 1}</small>
                          </div>
                          
                          <h5 className="card-title fw-bold text-dark mb-3" style={{ lineHeight: '1.4' }}>
                            {contest.name}
                          </h5>
                          
                          <div className="contest-details">
                            <div className="row g-2 text-sm">
                              <div className="col-12">
                                <div className="d-flex align-items-center text-muted">
                                  <strong className="me-2">Date:</strong>
                                  <span>{formatDate(contest.startTimeSeconds)}</span>
                                </div>
                              </div>
                              
                              <div className="col-12">
                                <div className="d-flex align-items-center text-muted">
                                  <strong className="me-2">Contest ID:</strong>
                                  <code className="bg-light px-2 py-1 rounded text-black">
                                    {contest.id}
                                  </code>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        
                        <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                          <button
                            className="btn btn-outline-primary btn-sm w-100"
                            onClick={() => window.open(`https://codeforces.com/contest/${contest.id}`, '_blank')}
                          >
                            View on Codeforces
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">
            Made for Codeforces enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
}