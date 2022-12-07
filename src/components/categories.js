import { useEffect, useState } from "react";
import { consumeAPI } from "../api/service.js";

function Categories() {
    const [categories,setCategories] = useState([])
    const [isLoading,setLoading] = useState(false)
    async function getCategories(){
        try {
            setLoading(true)
            const data = await consumeAPI("	https://api.spotify.com/v1/browse/categories")
            setCategories(data.categories.items)
        } catch (error) {
            throw error
        }finally {
            setLoading(false)
        }
    }
    console.log(categories)
    useEffect(()=>{
        getCategories()
    },[])

    return (
        isLoading?<p>Loading...</p>:
        <div className="playlists-container"> 
            {categories.map((category,index) => 
            <div className="subcontainer" key={index}>
                <img src={category.icons[0].url} className="playlist-img"></img>
                <p className="subcontainer-name">{category.name}</p>
            </div>
            )}
        </div>
    );
}

export default Categories;
