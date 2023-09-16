import { WORDS } from "../fiveLetterWords";
export const boardDefault= [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];


export const generateWordSet = async () => {
    try {
        const wordSet = WORDS;
        let todaysWord;
        todaysWord = wordSet[Math.floor(Math.random() * wordSet.length)]
        return { wordSet, todaysWord }; // Return the wordSet directly
    } catch (error) {
        console.error(`Error processing wordSet: ${error.message}`);
        return new Set(); // Return an empty set in case of an error
    }
};


