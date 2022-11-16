

function Player(props){

    return (
        <div className="player">
            <audio src={props.audio} controls></audio>
            <img src="https://cdn-icons-png.flaticon.com/128/254/254437.png" className="control-button"></img>
            <img src="https://cdn-icons-png.flaticon.com/128/527/527995.png" className="control-button"></img>
            <img src="https://cdn-icons-png.flaticon.com/128/254/254428.png" className="control-button"></img>
        </div>
    )

}

export default Player