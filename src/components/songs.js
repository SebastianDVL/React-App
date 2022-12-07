import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";
import Player from "./player.js";

function Songs(props) {
    const [songs,setSongs] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [noTrack,setNoTrack] = useState(false)
    const [isPlaying,setPlaying] = useState(false)
   
    async function getSongs(){
        try {
            setLoading(true)
            const data = await consumeAPI(`https://api.spotify.com/v1/${props.type}s/${props.id}`)
            setSongs(data)
            props.type == 'album' ? setNoTrack(true) : setNoTrack(false)
            console.log(data)
        }catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getSongs()
    },[props.type,props.id])

    return (
        <>
             <div className="songs-container">
                {isLoading ? <p>Loading...</p> : 
                    songs.tracks.items.map((song,index) =>
                         (<div key={index} className="song-item">
                            <button className="play-button" onClick={()=>{
                                //play the
                            }}>
                                <img src={"https://cdn-icons-png.flaticon.com/512/27/27223.png"} className="control-button"  width={noTrack? songs.images[2].width/2 :song.track.album.images[2].width/2 } height={noTrack ? songs.images[2].height/2: song.track.album.images[2].height/2}></img>
                            </button>
                            <img src={noTrack? songs.images[0].url:song.track.album.images[2].url} width={noTrack? songs.images[2].width:song.track.album.images[2].width} height={noTrack ? songs.images[2].height:song.track.album.images[2].height}></img>
                            <p className="song-name">{noTrack?song.name :song.track.name}</p>
                        </div>)
                    )
                }
            </div>
            <Player audio={""} icon={""}></Player>
        </>
     
    )
  }

  export default Songs;