import './App.css';
import Songs from './components/songs.js';

function App() {
  return (
    <div className="App"> 
      <div className="searcher">
        <input type="search" className="input"></input>
      </div> 
      <Songs></Songs>
    </div>
  );
}

export default App;
