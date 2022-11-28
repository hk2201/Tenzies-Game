import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Switch from 'react-js-switch';

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [dark, setDark] = React.useState(false)
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [text,setText] = React.useState("LIGHT MODE")



    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    function darkMode() {
        setDark(prev => !prev)
        setIsSwitchOn(prev => !prev)
    }

    function modeText(){
        setText({})
        
    }



    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            changeMode={dark}

        />
    ))
    const mode = {
        backgroundColor: dark ? "blacK" : "White",
        color: dark ? "white" : "black"
    }

    return (
        <>
            <div className="sw">

                <Switch size={50} value={isSwitchOn} onChange={darkMode} />
                <span style={{paddingTop : 6, color:"white"}}>

                {dark  ? "DARK MODE" : "LIGHT MODE"}
                </span>
                

            </div>

            <main style={mode}>




                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button
                    className="roll-dice"
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </main>
        </>
    )
}