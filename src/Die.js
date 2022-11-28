import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const mode = {
        color: props.changeMode ? "black" : "grey"
    }

    
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
            
        >
            <h2 style={mode} className="die-num">{props.value}</h2>
        </div>
    )
}