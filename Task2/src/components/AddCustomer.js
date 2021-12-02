import React, { useState } from 'react';
import { Button, TextField, Dialog, 
    DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
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
                    marginTop: 10,
                    marginBottom: 10,
                    display: 'flex',
                }}
            >
                Add new customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New customer</DialogTitle>
            <DialogContent>
                <TextField
                label="Firstname"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="Lastname"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="Address"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="Postcode"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="City"
                name="city"
                value={customer.city}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="Email"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                variant="standard"
                margin="dense"
                fullWidth
                />
                <TextField
                label="Phone"
                name="phone"
                value={customer.phone}
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