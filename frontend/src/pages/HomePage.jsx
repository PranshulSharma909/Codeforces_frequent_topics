import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberOfContests from "../components/NumberOfContests";
import DivisionsSelector from "../components/DivisionsSelector";
import IndexesSelector from "../components/IndexesSelector";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [numContests, setNumContests] = useState(10);
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numContests <= 0) {
      alert("Number of contests must be a positive number");
      return;
    }
    const params = new URLSearchParams({
      x: numContests,
      divs: selectedDivs.join(","),
      indexes: selectedIndexes.join(","),
    });
    
    navigate(`/tags/frequency?${params.toString()}`);
  };

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };

  return (
    <div 
      className="min-vh-100 d-flex flex-column" 
      style={{ 
        background: "linear-gradient(130deg, rgb(119, 162, 215), rgb(83, 163, 83))",
        minHeight: "100vh"
      }}
    >
      <Header />
      
      <div className="flex-grow-1 d-flex align-items-center">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-xl-7">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold text-white mb-3" style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                }}>
                  Codeforces: Frequent Topics
                </h1>
                <p className="lead text-white opacity-90" style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
                }}>
                  Find the most frequent topics in recent Codeforces contests
                </p>
              </div>

              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header text-white text-center py-4 rounded-top-4" style={{ 
                  background: "linear-gradient(135deg, #495057 0%, #343a40 100%)" 
                }}>
                  <h4 className="card-title mb-0 fw-bold">
                    <i className="fas fa-sliders-h me-2"></i>
                    Apply Filters
                  </h4>
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
                        className="btn btn-lg w-100 py-3 fw-bold rounded-pill shadow-sm text-white"
                        style={{ 
                          background: "linear-gradient(135deg, #495057 0%, #343a40 100%)",
                          border: "none",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 8px 25px rgba(52, 58, 64, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "0 4px 15px rgba(52, 58, 64, 0.2)";
                        }}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}