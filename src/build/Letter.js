import React, {useContext, useEffect} from "react";
import {AppContext} from "../App";

function Letter ({letterPos, attemptVal}){
    const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

    const letterState = currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");


    // if the letter is not correct and is not almost correct disabled that letter
    useEffect(() => {
        if(letter !=="" && !correct && !almost){
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAttempt.attempt]);

    return <div className={`letter ${letterState} ${letter && "bounce"}`} id={letterState} style={{animationDelay: `${letterPos*0.3}s`}}>{letter}</div>;
}

export default Letter;
