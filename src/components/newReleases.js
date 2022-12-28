import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";

function NewReleases(props) {
    const [newReleases,setNewReleases] = useState([])
    const [isLoading,setLoading] = useState(false)
    
    async function getNewReleases(){
        try {
            setLoading(true)
            const data = await consumeAPI("https://api.spotify.com/v1/browse/new-releases?country=CO&limit=8")
            setNewReleases(data.albums.items)
        } catch (error) {
            throw error
        }finally {
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        getNewReleases()
    },[])

    return (
        isLoading?<p>Loading...</p>:
        <div className="playlists-container"> 
            {newReleases.map((newRelease,index) => 
            <div className="subcontainer" key={index} onClick={()=>{
                props.setType(newRelease.type)
                props.setId(newRelease.id)
            }}>
                <img src={newRelease.images[0].url} className="playlist-img"></img>
                <p className="subcontainer-name">{newRelease.name}</p>
                <p className="subcontainer-artist">{newRelease.artists.map(artist => artist.name).join(', ')}</p>
            </div>  
            )}
        </div>
    );
}

export default NewReleases;