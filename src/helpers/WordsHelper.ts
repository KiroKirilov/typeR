import words from '../data/words';

class WordsHelper {
    private static formattedWords: any[] = []

    constructor() {
    }

    private static generateRandomWordsArray(): string[] {
        let selectedWords: string[] = [];

        for (let i = 0; i < 300; i++) {
            const randomNumber = Math.floor(Math.random() * 300) + 1;
            const currentWord: string = words[randomNumber];
            
            selectedWords.push(currentWord)
        }

        return selectedWords;
    }

    private static formatWords(wordsArray: string[]): any[] {
        let result = [];
        for (let i = 0; i < wordsArray.length; i++) {
            const currentWord: string = wordsArray[i];
            const currentWordLetters: any[] = currentWord.split("").map((l:string) => {
                return {key: l, value: "gray"}
            });

            result.push(currentWordLetters);
        }

        return result;
    }

    public static getRandomWords(): any[] {
        const selectedWords: string[] = this.generateRandomWordsArray();
        const formattedWords: string[] = this.formatWords(selectedWords);
        
        return formattedWords;
    }
}

export default WordsHelper;