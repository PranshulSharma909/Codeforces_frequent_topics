import { createContext, useContext, useState } from 'react';

const DataContext = createContext();
// .
export const DataProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState(null);

  const fetchAnalysisData = async (queryString) => {
    setLoading(true);
    setError(null);
     
    
    try {
      // Extract params from query string
      const queryParams = new URLSearchParams(queryString);
      const x = queryParams.get("x") || 10;
      const divs = queryParams.get("divs") || "";
      const indexes = queryParams.get("indexes") || "";
      
      const response = await fetch(
        `https://codeforces-frequent-topics.onrender.com/tags/frequency?x=${x}&divs=${divs}&indexes=${indexes}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalysisData(data);
      setLastQuery(queryString);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      console.error("An error occured!!", err);
    } finally {
      setLoading(false);

    }
  };

  const clearData = () => {
    setAnalysisData(null);
    setError(null);
    setLastQuery(null);
  };

  return (
    <DataContext.Provider value={{
      analysisData,
      loading,
      error,
      lastQuery,
      fetchAnalysisData,
      clearData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};