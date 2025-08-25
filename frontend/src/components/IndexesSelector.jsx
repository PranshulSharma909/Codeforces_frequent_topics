import { useState, useRef, useEffect } from 'react';

// Generate options A to Z
const indexOptions = Array.from({ length: 26 }, (_, i) => ({
  value: String.fromCharCode(65 + i), // A, B, C, ..., Z
  label: `Problem ${String.fromCharCode(65 + i)}`
}));

export default function IndexesSelector({ selectedIndexes = [], setSelectedIndexes }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSelection = (value) => {
    const newSelectedIndexes = selectedIndexes.includes(value)
      ? selectedIndexes.filter((v) => v !== value)
      : [...selectedIndexes, value];
    setSelectedIndexes(newSelectedIndexes);
  };

  const getDisplayText = () => {
    if (selectedIndexes.length === 0) {
      return "Select problem indexes...";
    }
    if (selectedIndexes.length === 1) {
      return `Problem ${selectedIndexes[0]}`;
    }
    if (selectedIndexes.length <= 5) {
      return `Problems ${selectedIndexes.sort().join(', ')}`;
    }
    return `${selectedIndexes.length} problems selected`;
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedIndexes([]);
  };

  return (
    <>
      <div className="position-relative" ref={dropdownRef}>
        <label className="form-label fw-medium">Select Problem Indexes</label>
        
        {/* Dropdown trigger */}
        <div
          className="form-control d-flex justify-content-between align-items-center"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <span className={selectedIndexes.length === 0 ? "text-muted" : "text-dark"}>
            {getDisplayText()}
          </span>
          
          <div className="d-flex align-items-center">
            {selectedIndexes.length > 0 && (
              <button
                onClick={clearAll}
                className="btn btn-sm p-0 me-2 text-muted"
                title="Clear all"
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  fontSize: '18px',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            )}
            <svg
              className={`transition-all ${isOpen ? 'rotate-180' : ''}`}
              width="12" 
              height="12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: '#7b8288ff' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="position-absolute w-100 mt-1 bg-white border rounded shadow-lg" 
               style={{ 
                 zIndex: 1050, 
                 maxHeight: '350px', 
                 overflowY: 'auto',
                 backgroundColor: 'rgba(255, 255, 255, 0.95)'
               }}>
            
            {/* Grid layout for A-Z */}
            <div className="p-2">
              <div className="row g-1">
                {indexOptions.map((option) => {
                  const isSelected = selectedIndexes.includes(option.value);
                  return (
                    <div key={option.value} className="col-3">
                      <div
                        className="d-flex align-items-center justify-content-center p-2 rounded-3 text-center"
                        onClick={() => toggleSelection(option.value)}
                        style={{ 
                          cursor: 'pointer',
                          minHeight: '36px',
                          backgroundColor: isSelected ? '#198754' : 'transparent',
                          color: isSelected ? 'white' : '#212529',
                          border: isSelected ? '1px solid #198754' : '1px solid #dee2e6'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.target.style.backgroundColor = '#bcbfc2ff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.target.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span className="fw-medium user-select-none">
                          {option.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Footer with select/deselect all */}
            <div className="border-top p-2" style={{ backgroundColor: 'rgba(248,249,250,0.4)' }}>
              <div className="d-flex justify-content-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIndexes(indexOptions.map(d => d.value));
                  }}
                  className="btn btn-link btn-sm p-1 text-primary text-decoration-none"
                  style={{ fontSize: '14px' }}
                >
                  Select All
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIndexes([]);
                  }}
                  className="btn btn-link btn-sm p-1 text-secondary text-decoration-none"
                  style={{ fontSize: '14px' }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .rotate-180 {
          transform: rotate(180deg);
        }
        .transition-all {
          transition: all 0.2s ease;
        }
      `}</style>
    </>
  );
}
