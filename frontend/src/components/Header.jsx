import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.includes(path)) return true;
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: "#495057" }}>
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold fs-4">
          <i className="fas fa-code me-2"></i>
          Codeforces: Frequent Topics
        </span>
        
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
                className={`nav-link btn btn-link text-white fw-semibold ${isActive("/") ? "active" : ""}`}
                onClick={() => handleNavigation("/")}
              >
                <i className="fas fa-home me-1"></i>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white fw-semibold ${isActive("/tags/frequency") ? "active" : ""}`}
                onClick={() => handleNavigation("/tags/frequency")}
              >
                <i className="fas fa-tags me-1"></i>
                Frequent Tags
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white fw-semibold ${isActive("/recent-contests") ? "active" : ""}`}
                onClick={() => handleNavigation("/recent-contests")}
              >
                <i className="fas fa-trophy me-1"></i>
                Recent Contests
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white fw-semibold ${isActive("/recent-problems") ? "active" : ""}`}
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
  );
}