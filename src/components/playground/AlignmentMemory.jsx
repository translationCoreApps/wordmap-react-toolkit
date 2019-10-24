import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import {MemoryButton} from "./MemoryButton";
import {Link} from "@material-ui/icons";
import {MemoryLabel} from "./MemoryLabel";

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



export function AlignmentMemory({onAdd, onDelete, memory}) {
    const classes = useStyles();

    function handleDelete(index) {
        return () => {
            if (typeof onDelete === 'function') {
                onDelete(index);
            }
        };
    }

    return (
        <div style={{margin: 10, display: "block"}}>
            <MemoryButton onClick={onAdd}/>
            {memory.map((data, i) => {
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

AlignmentMemory.propTypes = {
    memory: PropTypes.array.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func
};
