import { useState, useRef, useEffect } from 'react';

const divOptions = [
  { value: "1", label: "Codeforces Round (Div. 1)" },
  { value: "2", label: "Codeforces Round (Div. 2)" },
  { value: "3", label: "Codeforces Round (Div. 3)" },
  { value: "4", label: "Codeforces Round (Div. 4)" },
  { value: "educational", label: "Educational Codeforces Round (Div. 2)" },
  { value: "1_2", label: "Codeforces Round (Div. 1 + Div. 2)" },
  { value: "other", label: "Other Contests" },
];

export default function DivisionsSelector({ selectedDivs = [], setSelectedDivs }) {
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
    const newSelectedDivs = selectedDivs.includes(value)
      ? selectedDivs.filter((v) => v !== value)
      : [...selectedDivs, value];
    setSelectedDivs(newSelectedDivs);
  };

  const getDisplayText = () => {
    if (selectedDivs.length === 0) {
      return "Select divisions...";
    }
    if (selectedDivs.length === 1) {
      const selected = divOptions.find(d => d.value === selectedDivs[0]);
      return selected ? selected.label : "1 division selected";
    }
    return `${selectedDivs.length} divisions selected`;
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedDivs([]);
  };

  return (
    <>
      <div className="position-relative" ref={dropdownRef}>
        <label className="form-label fw-medium">Select Divisions</label>
        
        {/* Dropdown trigger */}
        <div
          className="form-control d-flex justify-content-between align-items-center"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <span className={selectedDivs.length === 0 ? "text-muted" : "text-dark"}>
            {getDisplayText()}
          </span>
          
          <div className="d-flex align-items-center">
            {selectedDivs.length > 0 && (
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
            <div className="p-2">
              {divOptions.map((option) => {
                const isSelected = selectedDivs.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className="d-flex align-items-center p-2 rounded-3"
                    onClick={() => toggleSelection(option.value)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#bcbfc2ff'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div className="d-flex align-items-center w-100" style={{ pointerEvents: 'none' }}>
                      <div 
                        className={`me-3 border rounded-circle d-flex align-items-center justify-content-center ${
                          isSelected 
                            ? 'bg-success border-success' 
                            : 'border-secondary bg-white'
                        }`}
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          flexShrink: 0 
                        }}
                      >
                        {isSelected && (
                          <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-dark user-select-none flex-grow-1">
                        {option.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Footer with select/deselect all */}
            <div className="border-top p-2" style={{ backgroundColor: 'rgba(248,249,250,0.4)' }}>
              <div className="d-flex justify-content-between">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedDivs(divOptions.map(d => d.value));
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
                    setSelectedDivs([]);
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
