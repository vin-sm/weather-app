import './App.css';
import NavBar from './NavBar';
import NoLocationView from './NoLocationView';

function App() {
  return (
    <div className="App">
      <div className='nav-bar'><NavBar /></div>
      <NoLocationView />
    </div>
  );
}

export default App;
