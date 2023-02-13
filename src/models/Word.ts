import LetterColor from "../enums/LetterColor";
import Letter from "./Letter";

class Word {
    letters: Letter[];

    constructor(letters: Letter[]) {
        this.letters = letters;
    }
}

export default Word;