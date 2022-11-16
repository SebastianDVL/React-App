import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";
import Player from "./player.js";

function Songs() {
    const [songs,setSongs] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [audio,setAudio] = useState("")

    async function getSongs(){
        try {
            setLoading(true)
            const data = await consumeAPI(`https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI/top-tracks?market=CO`)
            setSongs(data.tracks)
            setAudio(data.tracks[0].preview_url)
        }catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getSongs()
    },[])
    
    return (
        <>
             <div>
                {isLoading ? <p>Loading...</p> : 
                    songs.map((song,index) =>
                        (<div key={index} className="song-item">
                            <button className="play-button" onClick={()=>setAudio(song.preview_url)}>
                                <img src="https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png"  width={song.album.images[2].width} height={song.album.images[2].height}></img>
                            </button>
                            <img src={song.album.images[0].url} width={song.album.images[2].width} height={song.album.images[2].height}></img>
                            <p>{song.name}</p>
                        </div>)
                    )
                }
            </div>
            <Player audio={audio}></Player>
        </>
     
    )
  }
  
  export default Songs;