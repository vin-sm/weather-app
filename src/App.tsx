import React from 'react';
import "./App.css";
import NavBar from "./NavBar";
import NoLocationView from "./NoLocationView";
// import { DataProvider } from './DataContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDetailView from "./WeatherDetailView";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="nav-bar">
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<NoLocationView />} />
            <Route path="/details" element={<WeatherDetailView />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
