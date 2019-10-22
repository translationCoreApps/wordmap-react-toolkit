import React, {useEffect, useState} from 'react';
import WordMap from "wordmap";
import Lexer from "wordmap-lexer";
import SuggestionViewer from './SuggestionViewer';

export default function Inspector({source, target, memory}) {
    const suggestion = useWordMAP(source, target, memory);

    return (
        <SuggestionViewer suggestion={suggestion}/>
    );
}

function useTokens(text) {
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        setTokens(Lexer.tokenize(text));
    }, [text]);
    return tokens;
}

function useWordMAP(source, target, memory) {
    const [map, setMap] = useState(null);
    const [suggestion, setSuggestion] = useState(null);

    // create wordmap
    useEffect(() => {
        setMap(new WordMap());
    }, []);

    // update memory
    useEffect(() => {
        if(map !== null) {
            memory.map(alignment => map.appendAlignmentMemoryString(alignment[0], alignment[1]));
        }
    }, [map, memory]);

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