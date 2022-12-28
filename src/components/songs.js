import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";
import Player from "./player.js";

function Songs(props) {
    const [songs,setSongs] = useState([])
    const [unaveilableSongs,setUnaveilable] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isPlaying,setPlaying] = useState(false)
    const [audio,setAudio]= useState('')
    const [currentSong,setCurrentSong] = useState({})
   
    async function getSongs(){
        try {
            setLoading(true)
            setSongs([])
            setUnaveilable([])

            const data = await consumeAPI(`https://api.spotify.com/v1/${props.type}s/${props.id}`)
            console.log(data)
            if(props.type === 'album') {
                data.tracks.items.forEach(element => {
                    element.preview_url ? setSongs(songs =>songs.concat({img:data.images[0].url,song_url:element.preview_url,name:element.name})): setUnaveilable(unaveilableSongs =>unaveilableSongs.concat({img:data.images[0].url,name:element.name}))
                });
            }else{
                data.tracks.items.forEach(element => {
                    element.track.preview_url ? setSongs(songs =>songs.concat({img:element.track.album.images[0].url,song_url:element.track.preview_url,name:element.track.name,artists:element.track.artists.map(artist => artist.name ).join(", ")})): setUnaveilable(unaveilableSongs =>unaveilableSongs.concat({img:element.track.album.images[0].url,name:element.track.name}))
                });
            }
        }catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getSongs()
    },[props.type,props.id])

    function pauseOrPlay(song){
        if(song.audio === audio){
            !isPlaying? setPlaying(true) : setPlaying(false) 
        }else{
            setCurrentSong(song)
            setAudio(song.audio)
            setPlaying(true)
        }
    }

    return (
        <>
            <div className="songs-container">
                {isLoading ? <p>Loading...</p> :
                        songs.map((song,index) =>
                            (<div key={index} className="song-item">
                                <button className="play-button" onClick={()=>pauseOrPlay({audio:song.song_url,img:song.img,name:song.name,artists:song.artists})}>
                                    <img src={isPlaying && audio === song.song_url?"https://cdn-icons-png.flaticon.com/512/2920/2920686.png":"https://cdn-icons-png.flaticon.com/512/27/27223.png"} className="control-button"  width='32rem' alt="play-button"></img>
                                </button>
                                <img src={song.img} height='64em' alt="song-cover"></img>
                                <div>
                                    <p className={audio === song.song_url? "current-song":  "song-name"}>{song.name}</p>
                                    <p className="song-name">{song.artists}</p>
                                </div>
                             

                            </div>)
                        )
                }
                {isLoading ? <></> :
                         unaveilableSongs.map((song,index) =>
                            (<div key={index} className="song-item unaveilable">
                                <button className="play-button">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3359/3359531.png" className="control-button"  width='32rem' alt="forbitten"></img>
                                </button>
                                <img src={song.img} height='64em' alt="song-cover"></img>
                                <div>
                                    <p className="song-name">{song.name}</p>
                               
                                </div>
                            </div>)
                        )
                }
            </div>
            {audio? <Player audio={audio} isPlaying={isPlaying} setPlaying={setPlaying} song={currentSong}></Player>:<></>}
        </>
     
    )
  }

  export default Songs;

