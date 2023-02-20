import React from "react";
import configureStore from "./store";
import { Provider } from "react-redux";
import Route from "./route.js";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const store = configureStore();
  return (
    <>
      <Provider store={store}>
        <Router>
          <Route />
        </Router>
      </Provider>
    </>
  );
}

export default App;
