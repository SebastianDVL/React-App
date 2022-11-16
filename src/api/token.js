import { CLIENT_ID,CLIENT_SECRET,GRANT_TYPE } from "./credentials.js"

export async function getToken(){
    let params ={
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=${GRANT_TYPE}`
    }

    let res = await fetch("https://accounts.spotify.com/api/token",params)
    let token = res.json()
    return token
}