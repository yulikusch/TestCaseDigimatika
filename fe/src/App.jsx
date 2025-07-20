import "./App.css";
import React, { lazy, Suspense } from "react";

const RouterComponent = lazy(() => import("./Root"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterComponent />
      </Suspense>
    </div>
  );
}

export default App;
