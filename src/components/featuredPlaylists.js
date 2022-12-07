import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";

function FeaturedPlaylist(props) {
    const [featuredPlaylist,setFeaturedPlaylist] = useState([])
    const [isLoading,setLoading] = useState(false)

    async function getFeaturedPlaylist(){
        try {
            setLoading(true)
            const data = await consumeAPI("https://api.spotify.com/v1/browse/featured-playlists")
            setFeaturedPlaylist(data.playlists.items)
        } catch (error) {
            throw error
        }finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        getFeaturedPlaylist()
    },[])

    return (
        isLoading?<p>Loading...</p>:
        <div className="playlists-container"> 
            {featuredPlaylist.map(playlist => 
            <div className="subcontainer" key={playlist.id} onClick={()=>{
                props.setType(playlist.type)
                props.setId(playlist.id)
            }}>
                <img src={playlist.images[0].url} className="playlist-img"></img>
                <p className="subcontainer-name">{playlist.name}</p>

            </div>
            )}
        </div>
    );
}

export default FeaturedPlaylist;
