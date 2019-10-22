import {useEffect, useState} from "react";
import Lexer from "wordmap-lexer";
import WordMap from "wordmap";

/**
 * Returns tokenized version of the text
 * @param text
 * @returns {Array}
 */
export function useTokens(text) {
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        setTokens(Lexer.tokenize(text));
    }, [text]);
    return tokens;
}

/**
 * Returns a wordMAP instance
 * @param memory - alignment memory to use
 * @returns {{}}
 */
export function useWordMAP(memory) {
    const [map, setMap] = useState(null);

    // create wordMAP
    useEffect(() => {
        setMap(new WordMap());
    }, []);

    // update memory
    useEffect(() => {
        if(map !== null) {
            memory.map(alignment => map.appendAlignmentMemoryString(alignment[0], alignment[1]));
        }
    }, [map, memory]);

    return map;
}

/**
 * Returns a suggested alignment between two sentences.
 * @param source
 * @param target
 * @param memory
 * @returns {{}}
 */
export function useSuggestion(source, target, memory) {
    const map = useWordMAP(memory);
    const [suggestion, setSuggestion] = useState(null);

    // predict
    useEffect(() => {
        if(map !== null) {
            map.appendCorpusString(source, target);
            const suggestions = map.predict(source, target, 1);
            setSuggestion(suggestions[0]);
        }
    }, [map, source, target]);

    return suggestion;
}
