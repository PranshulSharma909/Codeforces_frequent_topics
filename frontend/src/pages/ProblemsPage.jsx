import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext.jsx";

export default function RecentProblemsPage() {
  const navigate = useNavigate();
  const { analysisData } = useDataContext();
  const problems = analysisData?.result?.problems || [];

  // Helper function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Sort problems by contest date (newest first)
  const sortedProblems = [...problems].sort((a, b) => {
    const contestA = analysisData.result.filteredContests.find(c => c.id === a.contestId);
    const contestB = analysisData.result.filteredContests.find(c => c.id === b.contestId);
    return (contestB?.startTimeSeconds || 0) - (contestA?.startTimeSeconds || 0);
  });

  // Show message if no data is available
  if (!analysisData) {
    return (
      <div className="min-vh-100 bg-light">
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
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body p-5">
                <i className="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                <h4 className="card-title text-dark mb-3">No Analysis Data</h4>
                <p className="card-text text-muted mb-4">
                  Please run an analysis from the home page first to view problem data.
                </p>
                <button 
                  onClick={() => navigate("/")} 
                  className="btn btn-primary px-4"
                >
                  <i className="fas fa-arrow-left me-2"></i>
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
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => navigate("/tags/frequency")}
                >
                  <i className="fas fa-tags me-1"></i>
                  Frequent Tags
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => navigate("/recent-contests")}
                >
                  <i className="fas fa-trophy me-1"></i>
                  Recent Contests
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white fw-semibold active">
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
                      <i className="fas fa-puzzle-piece me-2"></i>
                      Recent Problems
                    </h1>
                    <p className="mb-0 opacity-75">All problems from your analysis (newest first)</p>
                  </div>
                  <button 
                    onClick={() => navigate("/tags/frequency")} 
                    className="btn btn-light btn-sm"
                  >
                    <i className="fas fa-arrow-left me-1"></i>
                    Back
                  </button>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <i className="fas fa-list-ol text-primary me-2 fs-4"></i>
                  <div>
                    <h4 className="mb-0 fw-bold text-primary">{problems.length}</h4>
                    <small className="text-muted">Total Problems</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Problems List */}
            {problems.length === 0 ? (
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body text-center py-5">
                  <i className="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                  <h4 className="text-dark mb-3">No Problems Found</h4>
                  <p className="text-muted mb-4">
                    No problem data is available. Please run a new analysis from the home page.
                  </p>
                  <button 
                    onClick={() => navigate("/")} 
                    className="btn btn-primary px-4"
                  >
                    <i className="fas fa-home me-2"></i>
                    Go to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="list-group shadow-sm rounded-3">
                {sortedProblems.map((problem) => (
                  <div key={`${problem.contestId}-${problem.index}`} className="list-group-item list-group-item-action p-4">
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <h5 className="mb-1 fw-bold text-primary">{problem.index}. {problem.name}</h5>
                      <small className="text-muted">{formatDate(analysisData.result.filteredContests.find(c => c.id === problem.contestId).startTimeSeconds)}</small>
                    </div>
                    <p className="mb-2 text-muted">{problem.contestName}</p>
                    <div className="d-flex flex-wrap gap-2">
                      {problem.tags.map(tag => (
                        <span key={tag} className="badge bg-secondary bg-opacity-10 text-dark-emphasis fw-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
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