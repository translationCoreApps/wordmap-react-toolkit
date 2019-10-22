import React, {useEffect, useState} from 'react';
import WordMap from "wordmap";
import Lexer from "wordmap-lexer";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

function PredictionViewer({prediction}) {
    return (
        <Paper>
            {
                prediction.source.getTokens().map(t => {
                    return (
                        <Chip
                            key={t.key}
                            label={t.text}
                        />
                    );
                })
            }
            {
                prediction.target.getTokens().map(t => {
                    return (
                        <Chip
                            key={t.key}
                            label={t.text}
                            color="primary"
                        />
                    );
                })
            }
            {prediction.confidence.toFixed(2)}
        </Paper>
    );
}

function SuggestionViewer({source, target, suggestion}) {
    const sourceTokens = useTokens(source);
    const targetTokens = useTokens(target);

    if(suggestion) {
        return (
            <div>
                {
                    suggestion.getPredictions().map(p =>
                        <PredictionViewer prediction={p}/>
                    )
                }
            </div>
        );
    } else {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default function Inspector({source, target, memory}) {
    const suggestion = useWordMAP(source, target, memory);

    return (
        <SuggestionViewer source={source} target={target} suggestion={suggestion}/>
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