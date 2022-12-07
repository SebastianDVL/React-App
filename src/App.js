import './App.css';
import NewReleases from './components/newReleases';
import CurrentPlaylist from './components/currentPlaylists';
import Songs from './components/songs.js';
import Categories from './components/categories';
import FeaturedPlaylist from './components/featuredPlaylists';
import {  useState } from "react"

function App() {
  const [id,setId] = useState('')
  const [type,setType] = useState('')
  return (
    <div className="App"> 
      <div className='groups-view personalized-scroll'>
        <h2>New releases</h2>
        <NewReleases setType={setType} setId={setId}></NewReleases>
        <h2>Featured playlists</h2>
        <FeaturedPlaylist setType={setType} setId={setId}></FeaturedPlaylist>
        <h2>Playlist</h2>
        <CurrentPlaylist setType={setType} setId={setId}></CurrentPlaylist>
        {/* <h2>Categories</h2>
        <Categories setType={setType} setId={setId}></Categories> */}
      </div>
      <div className='songs-view customized-scroll'>
        {id && type?<Songs type={type} id={id}></Songs>:<p>Pick a playlist</p>}
      </div>
      
    </div>
  );
}

export default App;
