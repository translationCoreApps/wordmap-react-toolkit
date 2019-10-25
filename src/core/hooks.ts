import {useEffect, useState} from "react";
import Lexer from "wordmap-lexer";
import WordMap from "wordmap";
import Suggestion from "wordmap/dist/structures/Suggestion";
import Token from "wordmap-lexer/dist/Token";

/**
 * Returns tokenized version of the text
 * @param text
 * @returns {Array}
 */
export function useTokens(text: string): Token[] {
    const [tokens, setTokens] = useState([] as Token[]);
    useEffect(() => {
        setTokens(Lexer.tokenize(text));
    }, [text]);
    return tokens;
}

/**
 * Returns a wordMAP instance
 * @param memory - alignment memory to use
 * @param corpus
 * @returns {{}}
 */
export function useWordMAP(memory: string[][] = [], corpus: string[] = []): WordMap | null {
    const [map, setMap] = useState(null as unknown);

    // create wordMAP
    useEffect(() => {
        setMap(new WordMap());
    }, []);

    // rebuild engine with corpus
    useEffect(() => {
        if(corpus.length === 2) {
            const newMap = new WordMap();
            newMap.appendCorpusString(corpus[0], corpus[1]);
            setMap(newMap);
        }
    }, [corpus]);

    // update memory
    useEffect(() => {
        if (map !== null) {
            (map as WordMap).clearAlignmentMemory();
            memory.map(alignment => (map as WordMap).appendAlignmentMemoryString(alignment[0], alignment[1]));
        }
    }, [map, memory]);

    return map as WordMap | null;
}

/**
 * Returns a suggested alignment between two sentences.
 * @param source
 * @param target
 * @param memory
 * @param corpus
 * @returns {{}}
 */
export function useSuggestion(source: string, target: string, memory: string[][] = [], corpus: string[] = []): Suggestion | null {
    const map = useWordMAP(memory, corpus);
    const [suggestion, setSuggestion] = useState(null as Suggestion | null);

    // predict
    useEffect(() => {
        if (map !== null) {
            const suggestions = map.predict(source, target, 1);
            setSuggestion(suggestions[0]);
        }
    }, [map, memory, source, target]);

    return suggestion as Suggestion | null;
}
