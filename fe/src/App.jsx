import "./App.css";
import React, { lazy, Suspense } from "react";

const RouterComponent = lazy(() => import("./Root"));

function App() {
  return (
    <div className="App">
      <RouterComponent />
    </div>
  );
}

export default App;
