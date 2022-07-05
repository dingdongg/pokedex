import './App.css';
import Overview from './components/Overview';
import PokemonEntries from './components/PokemonEntries';

function App() {
  return (
    <div className="App">
      <h1>HELLO REACT</h1>
      <Overview></Overview>
      <PokemonEntries></PokemonEntries>
    </div>
  );
}

export default App;
