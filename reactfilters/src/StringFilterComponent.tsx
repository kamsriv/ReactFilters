import { FormatBold} from '@mui/icons-material';
import { FormControl, Select, SelectChangeEvent, InputLabel, MenuItem, TextField} from '@mui/material';
import React, { useState } from 'react';

function StringFilterComponent(props: any) {
    const [filter, setFilter] = useState('');
    const [expression, setExpression] = useState('');

    const handleChange = (event: SelectChangeEvent) => {

        setFilter(
            // On autofill we get a stringified value.
            event.target.value
        );
    };


    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }} size="small">
                <InputLabel id="demo-select-small" sx={{ fontSize: 12 }}><b>{props.colName}</b></InputLabel>
                <Select sx={{ fontSize: 11, height: 20 }}
                    labelId="demo-select-small"
                    name={`drp_${props.colName.replace(' ','')}`}
                    label={props.colName}
                    value={filter}
                    onChange={handleChange}
                >
                    <MenuItem value=''>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 11}} value={'contain'}>Contains</MenuItem>
                    <MenuItem sx={{ fontSize: 11}} value={'equal'}>Equals</MenuItem>
                    <MenuItem sx={{ fontSize: 11}} value={'nequal'}>Not Equals</MenuItem>
                    <MenuItem sx={{ fontSize: 11}} value={'starts'}>Starts with</MenuItem>
                    <MenuItem sx={{ fontSize: 11}} value={'ends'}>Ends with</MenuItem>
                </Select>
                <TextField type={props.expressionType} id={`txt_${props.colName.replace(' ', '')}`} size="small" inputRef={()=>expression} variant="outlined" placeholder="Expression" />

                {/* value={expression} onChange={(event) => { setExpression(event.target.value); console.log(expression); }  }  */ }
            </FormControl>
        </div>
    );
}

export default StringFilterComponent;