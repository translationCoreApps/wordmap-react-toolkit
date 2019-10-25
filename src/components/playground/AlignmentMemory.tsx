import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {MemoryButton} from "./MemoryButton";
import {MemoryLabel} from "./MemoryLabel";

interface AlignmentMemoryProps {
    /**
     * Called when an alignment memory is added.
     */
    onAdd: (source: string, target: string) => void;
    /**
     * Called when an alignment memory is deleted
     */
    onDelete: (index: number) => void;
    /**
     * The alignment memory already collected
     */
    memory: string[][];
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


export function AlignmentMemory({onAdd, onDelete, memory}: AlignmentMemoryProps) {
    const classes = useStyles();

    function handleDelete(index: number) {
        return () => {
            if (typeof onDelete === 'function') {
                onDelete(index);
            }
        };
    }

    return (
        <div style={{margin: 10, display: "block"}}>
            <MemoryButton onClick={onAdd}/>
            {memory.map((data: string[], i: number) => {
                return (
                    <Chip
                        key={i}
                        size="small"
                        variant="outlined"
                        color="primary"
                        label={<MemoryLabel source={data[0]} target={data[1]}/>}
                        onDelete={handleDelete(i)}
                        className={classes.chip}
                    />
                );
            })}
        </div>
    );
}