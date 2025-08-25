import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext.jsx";
import Header from "../components/Header.jsx"; 
import Footer from "../components/Footer.jsx"; 

export default function RecentProblemsPage() {
  const navigate = useNavigate();
  const { analysisData } = useDataContext();
  const problems = analysisData?.result?.problems || [];

  const sortedProblems = [...problems].sort((a, b) => {
    if (a.contestId !== b.contestId) {
      return b.contestId - a.contestId;
    }
    return a.index.localeCompare(b.index);
  });

  const formatTags = (tags) => {
    return tags.map((tag, index) => (
      <span key={index} className="badge bg-light text-dark me-1 mb-1" style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.75rem"
      }}>
        {tag}
      </span>
    ));
  };

  if (!analysisData) {
    return (
      <div className="min-vh-100" style={{ background: "linear-gradient(130deg, rgb(119, 162, 215), rgb(83, 163, 83))" }}>
        <Header />
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px" }}>
              <div className="card-body p-5">
                <h4 className="card-title text-dark mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "600" }}>
                  No Analysis Data
                </h4>
                <button 
                  onClick={() => navigate("/")} 
                  className="btn btn-dark px-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: "500" }}
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
              <div className="card-header bg-dark text-white py-4 rounded-top-4">
                <div className="text-center">
                  <h1 className="h2 fw-bold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Recent Problems
                  </h1>
                </div>
              </div>
              
              <div className="card-body p-4">
                <div className="text-center">
                  <h4 className="mb-0 fw-bold text-dark" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {problems.length}
                  </h4>
                  <small className="text-muted" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Total Problems
                  </small>
                </div>
              </div>
            </div>

            {problems.length === 0 ? (
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body text-center py-5">
                  <h4 className="text-dark mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "600" }}>
                    No Problems Found
                  </h4>
                  <button 
                    onClick={() => navigate("/")} 
                    className="btn btn-dark px-4"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: "500" }}
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {sortedProblems.map((problem, index) => (
                  <div key={`${problem.contestId}-${problem.index}`} className="col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3 h-100">
                      <div className="card-body p-4">
                        
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="badge bg-dark text-white px-2 py-1.5" style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontWeight: "600",
                            fontSize: "0.9rem"
                          }}>
                            #{index + 1}
                          </span>
                        </div>
                        
                        <h5 className="card-title fw-bold text-dark mb-2" style={{ 
                          lineHeight: '1.4',
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: "700"
                        }}>
                          {problem.name}
                        </h5>
                        
                        {problem.tags && problem.tags.length > 0 && (
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "600" }}>
                              Tags:
                            </small>
                            <div className="d-flex flex-wrap">
                              {formatTags(problem.tags)}
                            </div>
                          </div>
                        )}
                        
                        <div className="problem-details">
                          <div className="row g-3">
                            <div className="col-12">
                              <div className="d-flex align-items-center text-muted">
                                <strong className="me-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: "600" }}>
                                  Index:
                                </strong>
                                <span className="badge bg-primary text-white px-2 py-1.5" style={{ 
                                  fontFamily: "'Inter', sans-serif",
                                  fontWeight: "600",
                                  fontSize: "0.9rem"
                                }}>
                                  {problem.index}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                        <button
                          className="btn btn-outline-secondary btn-sm w-100"
                          onClick={() => window.open(`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`, '_blank')}
                          style={{ 
                            fontFamily: "'Inter', sans-serif", 
                            fontWeight: "500",
                            transition: "all 0.2s ease-in-out"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#5171b4ff";
                            e.target.style.borderColor = "#5171b4ff";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "";
                            e.target.style.borderColor = "";
                            e.target.style.color = "";
                          }}
                        >
                          View on Codeforces
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}