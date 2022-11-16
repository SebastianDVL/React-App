import { getParams } from "./parameters.js"

export async function consumeAPI(URI){
    let res  = await fetch(URI,await getParams())
    let data = res.json()
    return data
}