import React from "react";
import Client from "./routes/client";
import Admin from "./routes/admin";
import { useSelector } from "react-redux";

const App = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return <>{isAdmin ? <Admin /> : <Client />}</>;
};

export default App;
