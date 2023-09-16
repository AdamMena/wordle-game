import React, {useContext} from "react"
import {AppContext} from "../App";

function GamerOver() {
    const { gameOver, currAttempt, correctWord } = useContext(AppContext)
    return (
        <div className="gameOver">
            <h3>
                {gameOver.guessedWord
                    ? "You correctly guessed the word"
                    : "You failed to guess the word"}</h3>
            <h1>Correct Word: {correctWord}</h1>
            {gameOver.guessedWord && (
                <h3> You guessed in {currAttempt.attempt} attempt(s) </h3>

            )}
            <h3> Refresh the page to play again!</h3>
        </div>
    );
}

export default GamerOver;