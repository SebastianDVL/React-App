import { getToken } from "./token.js"

export async function getParams(){
    let obj = await getToken()

    let TOKEN = `${obj.token_type} ${obj.access_token}`
    
    const REQUEST_PARAMETERS = {
        method:"GET",
        headers:{
            Authorization:TOKEN
        }  
    }
    
    return REQUEST_PARAMETERS
}