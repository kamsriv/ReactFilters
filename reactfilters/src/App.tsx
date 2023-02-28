import React from 'react';
import logo from './Logo.svg';
import './App.css';
import Filters from './Filters';
import styledEngine from '@mui/styled-engine';
import { useTheme } from '@mui/material/styles';
import { Grid3x3, GridViewOutlined } from '@mui/icons-material';
import { Button, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/* Adjusting the Material UI Grid based on the device
 * https://stackoverflow.com/questions/54726871/changing-the-order-of-grid-item-stacking-in-material-ui
 */ 

function App() {

    type column =
        {
            name: string,
            isSelected: boolean,
            group: string,
            datatype: string
        };

    let availableColumns: column[] = [{ name: "First Name", isSelected: true, group: "personal", datatype: "str" },
    { name: "Last Name", isSelected: false, group: "personal", datatype: "str" },
    { name: "Email Address", isSelected: false, group: "personal", datatype: "str" },
    { name: "Age", isSelected: false, group: "personal", datatype: "int" },
    { name: "Qualification", isSelected: false, group: "education", datatype: "str" },
    { name: "Intersted In", isSelected: false, group: "education", datatype: "str" },
    { name: "Year", isSelected: false, group: "education", datatype: "int" }];

    /* Loop through all the available columns and build the expression based on the values given in the filter select and text boxes. */
    const applyFilters = () => {
        let expression: string[] = new Array();
        let exp: string = "";
        for (let col of availableColumns) {
            exp = "";
            if (!col.isSelected) continue;

            let operator: any = (document.getElementsByName('drp_' + col.name.replace(' ', ''))[0] as HTMLInputElement)?.value;
            let operand: any = (document.getElementById('txt_' + col.name.replace(' ', '')) as HTMLInputElement)?.value;

            switch (col.datatype) {
                case "str":
                    exp = getOpeatorExp(operator, operand); //check the expression is being formed then only consider the column
                    break;
                case "int":
                    exp = getOpeatorExp(operator, operand, ""); //check the expression is being formed then only consider the column
                    break;
            }
            if (exp !== "") {
                expression.push(`[${col.name}] ${exp}`);
            }

        }
        console.log("expression is " + expression.toString().replaceAll(",", " || "));
    }

    function getOpeatorExp(opr: string, operand: string, isChar: string = "'"): string {
        switch (opr) {
            case "equal":
                return ` = ${isChar + operand + isChar}`;
            case "nequal":
                return `!= ${isChar + operand + isChar}`;
            case "contain":
                return `'%${operand}%'`;
            case "starts":
                return `'%${operand}'`;
            case "ends":
                return `'${operand}%'`;
            case "greater":
                return ` > ${operand}`;
            case "lesser":
                return ` < ${operand}`;
            case "greatereq":
                return ` >= ${operand}`;
            case "lessereq":
                return ` <= ${operand}`;
            default:
                return '';
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxHeight: window.innerHeight - 110,
        overflow: 'auto'
    }));

    const Stylesp = {
        position: "absolute",
        bottom: 5,
        left: 120,
        backgroundColor: "#c0c0c0"

    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };
    return (
        <div className="App">
            <Box sx={{ width: '99%' }}>
                <Grid container direction="row" rowSpacing={1} columns={12}
                    columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    justifyContent="flex-start" alignItems="flex-start">
                    <Grid item xs={12}>
                        <header className="appheader">
                            <img src='NeevLogo.png' alt="This is logo" width="100" />
                            {/*<img src={logo} className="App-logo" alt="logo" />*/}
                            {/*<p>*/}
                            {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
                            {/*</p>*/}
                            {/*<a*/}
                            {/*    className="App-link"*/}
                            {/*    href="https://reactjs.org"*/}
                            {/*    target="_blank"*/}
                            {/*    rel="noopener noreferrer"*/}
                            {/*>*/}
                            {/*    Learn React*/}
                            {/*</a>*/}
                        </header>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} order={{ xs: 2, sm: 12 }}  height={window.innerHeight - 50}><br /><br />
                        <Item><Filters colNames={availableColumns}></Filters></Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} order={{ xs: 10, sm: 12 }} ><br /><br />
                        <Item>Content items will display here</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" sx={Stylesp} onClick={applyFilters}>Apply</Button>
                    </Grid>
                </Grid>
            </Box>
            {/*<div className="leftPanel">
                <div className="leftPanelContent">
                    <Filters colNames={availableColumns}></Filters>
                </div>
                <div className="leftPanelFooter">
                    <Button type="submit" onClick={applyFilters}>Apply</Button>
                </div>
            </div>
            */}
        </div>

    );
}

export default App;
