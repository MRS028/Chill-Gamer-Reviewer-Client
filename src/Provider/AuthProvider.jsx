import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    name: "Rifat",
    id:"2020"
  });
  const authInfo = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={authInfo} >{children}</AuthContext.Provider>;
};

export default AuthProvider;
