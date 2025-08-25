import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberOfContests from "../components/NumberOfContests";
import DivisionsSelector from "../components/DivisionsSelector";
import IndexesSelector from "../components/IndexesSelector";

export default function HomePage() {
  const navigate = useNavigate();
  const [numContests, setNumContests] = useState(10);
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numContests <= 0) {
      alert("Number of contests must be positive");
      return;
    }
    const params = new URLSearchParams({
      x: numContests,
      divs: selectedDivs.join(","),
      indexes: selectedIndexes.join(","),
    });
    navigate(`/tags/frequency?${params.toString()}`);
  };

  const handleNavigation = (path) => {
    if (path === "/recent-contests" || path === "/recent-problems") {
      alert("This feature is coming soon!");
    } else {
      navigate(path);
    }
  };

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
                  className="nav-link btn btn-link text-white fw-semibold active"
                  onClick={() => handleNavigation("/")}
                >
                  <i className="fas fa-home me-1"></i>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white fw-semibold"
                  onClick={() => handleNavigation("/tags/frequency")}
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

      {/* Main Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            {/* Hero Section */}
            <div className="text-center mb-5">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: "80px", height: "80px" }}>
                <i className="fas fa-chart-bar fs-2"></i>
              </div>
              <h1 className="display-5 fw-bold text-dark mb-3">
                Codeforces Tag Frequency
              </h1>
              <p className="lead text-muted">
                Analyze and discover the most frequent tags from recent Codeforces contests
              </p>
            </div>

            {/* Form Card */}
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-gradient bg-primary text-white text-center py-4 rounded-top-4">
                <h2 className="card-title mb-0 fw-bold">
                  <i className="fas fa-sliders-h me-2"></i>
                  Configure Analysis
                </h2>
              </div>
              
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                  {/* Number of Contests */}
                  <div className="form-section">
                    <NumberOfContests 
                      numContests={numContests} 
                      setNumContests={setNumContests} 
                    />
                  </div>

                  {/* Divisions Selector */}
                  <div className="form-section">
                    <DivisionsSelector 
                      selectedDivs={selectedDivs} 
                      setSelectedDivs={setSelectedDivs} 
                    />
                  </div>

                  {/* Indexes Selector */}
                  <div className="form-section">
                    <IndexesSelector 
                      selectedIndexes={selectedIndexes} 
                      setSelectedIndexes={setSelectedIndexes} 
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill shadow-sm"
                      style={{ 
                        background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                        border: "none",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(0, 123, 255, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(0, 123, 255, 0.2)";
                      }}
                    >
                      <i className="fas fa-rocket me-2"></i>
                      Analyze Tag Frequency
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Cards */}
            <div className="row mt-5 g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="text-primary mb-3">
                      <i className="fas fa-tags fs-1"></i>
                    </div>
                    <h5 className="card-title fw-bold">Tag Analysis</h5>
                    <p className="card-text text-muted small">
                      Discover trending problem tags from recent contests
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="text-success mb-3">
                      <i className="fas fa-filter fs-1"></i>
                    </div>
                    <h5 className="card-title fw-bold">Smart Filtering</h5>
                    <p className="card-text text-muted small">
                      Filter by divisions and problem indexes for precise results
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="text-warning mb-3">
                      <i className="fas fa-chart-line fs-1"></i>
                    </div>
                    <h5 className="card-title fw-bold">Insights</h5>
                    <p className="card-text text-muted small">
                      Get valuable insights to improve your problem-solving
                    </p>
                  </div>
                </div>
              </div>
            </div>
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