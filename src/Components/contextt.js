import React, { createContext, useState, useContext } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [qualification, setQualification] = useState("");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  return (
    <StateContext.Provider
      value={{
        name,
        setName,
        summary,
        setSummary,
        qualification,
        setQualification,
        title,
        setTitle,
        project,
        setProject,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
