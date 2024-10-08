import { createContext, useContext, useState, useEffect } from "react";

const AllContext = createContext();

export function Context({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "dark");
  const [openNav, setOpenNav] = useState(false);

  const [userLog, setUserLog] = useState(localStorage.token);

  useEffect(() => {
    document.body.className = mode;
    localStorage.setItem("theme", mode);
  }, [mode]);

  // shop Filter

  const [selectedCat, setSelectedCat] = useState('');

  return (
    <AllContext.Provider value={{ mode, setMode, openNav, setOpenNav , userLog, selectedCat ,setSelectedCat }}>
      {children}
    </AllContext.Provider>
  );
}

export function useAllContext() {
  return useContext(AllContext);
}