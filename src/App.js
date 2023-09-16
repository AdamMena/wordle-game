import './App.css';
import Board from "./build/Board";
import Keyboard from "./build/Keyboard";
import React, {createContext, useEffect, useState} from "react";
import { boardDefault, generateWordSet } from "./build/Words";
import GameOver from "./build/GameOver";
import TopBanner from "./build/TopBanner";
import StatisticsScreen from "./build/StatisticsScreen";

export const AppContext = createContext();

function App() {

    // Create a use-state to hold the board and to set the new board
  const [board, setBoard] = useState(boardDefault);

  // Create a use-state to move down the board based on a rows current attempt and letter position value
    // We use this to update the rows of the board
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});

  // Create a use-state that sets up the wordSet for the project
  const [wordSet, setWordSet] = useState(new Set());

  // Create a use-state that disables letters that are not found in the word
  const [disabledLetters, setDisabledLetters] = useState([]);

  // Create a use-state that sets a correct word for the game
  const [correctWord, setCorrectWord] = useState("");

  // Create a use state handles the game over function to end the game
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord : false});


  // Use effect generates the wordSet for Wordle to pick from
    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord);
            console.log(words.todaysWord);
        });
    }, []);

    const onSelectLetter = (keyVal) => {
      if (currAttempt.letterPos > 4) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
      if(currAttempt.letterPos === 0) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1 });
  };

  const onEnter = () => {
      if(currAttempt.letterPos !== 5) return;

      let currentWord = "";
      for (let i = 0; i < 5; i++) {
          currentWord +=board[currAttempt.attempt][i];
      }

      if(wordSet.includes(currentWord.toLowerCase())){
          setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
      } else {
          alert("Please enter a valid word!");
      }

      if(currentWord.toLowerCase() === correctWord){
          setGameOver({gameOver: true, guessedWord: true});
          return;
      }
      if (currAttempt.attempt === 5 && wordSet.includes(currentWord.toLowerCase())){
          setGameOver({gameOver: true, guessedWord: false});
      }

  };

  return(
      <div className="App">
          <TopBanner/>
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt,
            onDelete, onEnter, onSelectLetter, correctWord, disabledLetters, setDisabledLetters, setGameOver, gameOver }}>
            <div className="game">
                <Board />
                {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
            </div>

        </AppContext.Provider>
      </div>
  );
}

export default App;
