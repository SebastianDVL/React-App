import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";

function CurrentPlaylist(props) {
    const [currentPlaylist,setCurrentPlaylist] = useState([])
    const [isLoading,setLoading] = useState(false)

    async function getCurretPlaylist(){
        try {
            setLoading(true)
            const data = await consumeAPI("https://api.spotify.com/v1/users/sebas.lpcay/playlists?")
            setCurrentPlaylist(data.items)
        } catch (error) {
            throw error
        }finally {
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getCurretPlaylist()
    },[])

    return (
        isLoading?<p>Loading...</p>:
        <div className="playlists-container"> 
            {currentPlaylist.map((playlist,index) => 
            <div className="subcontainer" key={index} onClick={()=>{
                props.setType(playlist.type)
                props.setId(playlist.id)
            }}>
                <img src={playlist.images[0].url} className="playlist-img"></img>
                <p>{playlist.name}</p>

            </div>
            )}
        </div>
    );
}

export default CurrentPlaylist;
