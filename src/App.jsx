import React from "react";
import Client from "./routes/client";
import Admin from "./routes/admin";

const App = () => {
  const isAdmin = false;

  return <>{isAdmin ? <Admin /> : <Client />}</>;
};

export default App;
