import React, { useState } from 'react';
import { MenuItem, Select, Button, TextField, Dialog, 
    DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AddTrainingForCustomer(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining ] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: props.customer.links[1].href,
    });
    const [acitvity] = useState([
        'Jogging',
        'Sprints',
        'Boxing',
        'Cycling',
        'Gym training',
        'Balance training',
        'Spinning',
        'Zumba',
    ]);
    //MenuItemeille taulukko, jotta ne voidaan tulostaa return-lausekkeessa
    const menuItems = [];
    //for-loop MUin MenuItem komponentille, jotta vähennetään koodin määrää
    for (let i = 0; i < acitvity.length; i++) {
        menuItems.push(<MenuItem key={i} value={acitvity[i]}>{acitvity[i]}</MenuItem>);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTrainingForCustomer(training);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button 
                onClick={handleClickOpen}
                size="small"
                variant="outlined"
                style={{
                    background: 'linear-gradient(45deg, #181D1F 30%, #222628 90%)',
                    boxShadow: '0 3px 5px 2px #000000',
                    border: 0,
                    minWidth: '20px',
                    minHeight: '20px',
                    maxWidth: '20px',
                    maxHeight: '20px',
                    marginLeft: '-8px',
                }}
            >
                +
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New training session for customer</DialogTitle>
            <DialogContent>
                <Select
                    label="Activity"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    variant="standard"
                    margin="dense"
                    fullWidth
                >
                    {menuItems}
                    {/* Nämä MenuItem komponentit voitaisiin luultavasti supistaa pienemmäksi koodiksi, 
                    jollain for-loopilla, jossa loopattaisiin luotu activity taulukko lävitse ja annettaisiin arvot
                    valuelle ja näkyvälle tekstille? Samalla päästäisiin kovakoodaamisesta, kun luodaan uusi tieto 
                    taulukkoon tai poistetaan eli vähemmän työmäärää ja koodia */}
                    {/*<MenuItem value={acitvity[0]}>{acitvity[0]}</MenuItem>
                    <MenuItem value={acitvity[1]}>{acitvity[1]}</MenuItem>
                    <MenuItem value={acitvity[2]}>{acitvity[2]}</MenuItem>
                    <MenuItem value={acitvity[3]}>{acitvity[3]}</MenuItem>
                    <MenuItem value={acitvity[4]}>{acitvity[4]}</MenuItem>
                    <MenuItem value={acitvity[5]}>{acitvity[5]}</MenuItem>
                    <MenuItem value={acitvity[6]}>{acitvity[6]}</MenuItem>
                    <MenuItem value={acitvity[7]}>{acitvity[7]}</MenuItem>*/}
                </Select>
                <TextField
                    name="date"
                    value={training.date}
                    type="datetime-local"
                    onChange={inputChanged}
                    variant="standard"
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Duration (minutes)"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    variant="standard"
                    margin="dense"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}