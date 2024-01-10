import './App.css';
import NavBar from './NavBar';
import NoLocationView from './NoLocationView';
// import { DataProvider } from './DataContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDetailView from './WeatherDetailView';

function App() {
  return (
    // <DataProvider>
    <Router>
      <div className="App">
        <div className='nav-bar'><NavBar /></div>
        <Routes>
          <Route path="/" element={<NoLocationView />} />
          <Route path='/details' element={<WeatherDetailView />} />
        </Routes>
      </div>
    </Router>
    // </DataProvider>
  );
}

export default App;
