import React from 'react';
import StringFilterComponent from './StringFilterComponent';
import FiltersModel from './FiltersModal';
import { Button, Box, Modal, Typography, Checkbox, Card, Grid, CardActionArea, CardContent, CardActions, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, Switch, Link } from '@mui/material';
import { Anchor, ArrowCircleRightOutlined, Iso, Label } from '@mui/icons-material';
import { type } from '@testing-library/user-event/dist/type';
import IntegerFilterComponent from './IntegerFilterComponent';

function Filters(props: any) {

    type IFilterCols = {
        name: string,
        isSelected: boolean,
        group: string
    }

    let colNames: [] = props.colNames;

    //Modal state hook call
    const [isOpen, showModel] = React.useState(false);
    const showClicked = () => { showModel(true); }
    const handleClose = () => {showModel(false);}

    //Checkbox state hook call
    const [checkboxes, setCheckBox] = React.useState(new Array()); /*(() => {
        let checkboxObj: IFilterCols[] = [];

        colNames.forEach((col) => {
            checkboxObj.push(col);
        });
        
        return checkboxObj;
    });*/
    //Whenever the component state changes then the component will re render on the screen.
    const handleChange = (event:React.ChangeEvent, checked:boolean) => {
        let cols: IFilterCols[] = [];
        //getting the event related data and capturing the same kind of array which we passed as Props.
        let chkIndex: number = parseInt(event.target.id);
        let selectedObj: IFilterCols = colNames[chkIndex];
        selectedObj.isSelected = checked;
        cols.push(selectedObj);
        //we have to set the new state using the method used at the time of useState hook.
        setCheckBox(()=>{return cols;});
    }

    const handleFiltersSelect = () => {
        console.log(colNames);
        handleClose();
    }

    return (
        <div>
            <Box>
                <Link onClick={showClicked} >Show All Filters</Link>
            </Box>
            <Dialog 
                id="modal_filter" open={isOpen} onClose={handleClose}>
                <DialogTitle>Select appropriate option(s) to filter</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex' }}>
                        {/******************************TO-DO create a component for each group card*/}
                        <Card sx={{ width: 1 / 2 }} >
                            <CardActionArea>
                                <CardContent>
                                    <Typography id="modal-modal-title" variant="h6" component="div">
                                        Personal Info
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.secondary">
                                {colNames.map(({name, isSelected, group}, idx: number) => {
                                    return group == "personal" ? <Box key={`box_${idx}`}>
                                        <Checkbox id={`${idx}`} checked={isSelected} key={`cbx_${idx}`} value={name}
                                            onChange={(event,checked) => handleChange(event,checked)}></Checkbox>
                                        <label htmlFor={`${idx}`}>{name}</label></Box>
                                        : ""
                                })}
                            </Typography>
                        </Card>

                        <Card sx={{ width: 1 / 2 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography id="modal-modal-title" variant="h6" component="div">
                                        Education
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.secondary">
                                {colNames.map(({ name, isSelected, group }, idx: number) => {
                                    return group == "education" ? <Box key={`box_${idx}`}>
                                        <Checkbox id={`${idx}`} checked={isSelected} key={`cbx_${idx}`} value={name}
                                            onChange={(event, checked) => handleChange(event, checked)}></Checkbox>
                                        <label htmlFor={`${idx}`}>{name}</label></Box> : ""
                                })}
                            </Typography>
                        </Card>
                        {/******************************TO-DO create a component for each group card*/}
                    </div>
                </DialogContent>
                <DialogActions>
                   {/* <Button onClick={handleFiltersSelect}>Add</Button>*/}
                </DialogActions>
            </Dialog>

            {/*Based on the columns selected we have to display appropriate filter conditions*/}
            {colNames.map(({ name, isSelected, group, datatype }, idx: number) => {
                return (isSelected && datatype == "str") ?
                    <StringFilterComponent expressionType="text" key={`exp_${idx}`} colName={name}></StringFilterComponent>
                    : (isSelected && datatype == "int") ?
                        <IntegerFilterComponent expressionType="number" key={`exp_${idx}`} colName={name}></IntegerFilterComponent>
                        : ""
            })}
        </div>
    );
}

export default Filters;