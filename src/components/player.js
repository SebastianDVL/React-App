import { useEffect,useRef } from "react";

function Player(props){
    const audio = useRef(null)
    const timeline = useRef(null)

    function timelineJourney(){
        let percentage = (100*audio.current.currentTime) / audio.current.duration
        timeline.current.style.backgroundSize = `${percentage}% 100%`;
        timeline.current.value = percentage;
    }

    function changeTimeline(){
        let tiempo = (timeline.current.value * audio.current.duration) / 100;
        audio.current.currentTime = tiempo;
    }

    useEffect(() =>{
        timeline.current.value = 0
    },[])

    useEffect(()=>{
        if(props.isPlaying){
            audio.current.play()
        }else{
            audio.current.pause()
        }
    },[props.isPlaying,props.audio])
    

    return (
        <div className="player">
            <div className="current-song-container">
                <img src={props.song.img} width="64em" height="64em"></img>
                <div>
                    <p>{props.song.name}</p>
                    <p>{props.song.artists}</p>
                </div>
               
            </div>
            <div className="controls">
                <div>
                    <audio src={props.audio} controls ref={audio} onTimeUpdate={()=>timelineJourney()}></audio>
                    <img src="https://cdn-icons-png.flaticon.com/512/254/254437.png" className="control-button player-button"></img>
                    <img src={props.isPlaying ? "https://cdn-icons-png.flaticon.com/512/2088/2088562.png":"https://cdn-icons-png.flaticon.com/512/527/527995.png"} className="control-button player-button" onClick={()=>{props.isPlaying ?props.setPlaying(false) : props.setPlaying(true) }}></img>
                    <img src="https://cdn-icons-png.flaticon.com/512/254/254428.png" className="control-button player-button"></img>
                </div>
                <div>
                    <input type="range" className="timeline" ref={timeline} onChange={()=>changeTimeline()}></input>
                </div>
             
            </div>
            <div className="volume">
                {/* <input type="range"></input> */}
            </div>
            
        </div>
    )

}

export default Player
