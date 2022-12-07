

function Player(props){

    return (
        <div className="player">
            <audio src={props.audio} controls></audio>
            <img src="https://cdn-icons-png.flaticon.com/512/254/254437.png" className="control-button player-button"></img>
            <img src={props.icon} className="control-button player-button"></img>
            <img src="https://cdn-icons-png.flaticon.com/512/254/254428.png" className="control-button player-button"></img>
        </div>
    )

}

export default Player