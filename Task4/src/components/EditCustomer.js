import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone,
    });

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    };

    const handleClickOpen = () => {
        console.log(customer);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editCustomer(customer, props.customer.links[1].href);
        handleClose();
    };
    
    return (
        <div>
            <Button 
                onClick={handleClickOpen}
                size="small"
                variant="outlined" 
                style={{
                    background: 'linear-gradient(45deg, #181D1F 30%, #222628 90%)',
                    boxShadow: '0 3px 5px 2px #000000',
                    border: 0,
                }}
            >
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer</DialogTitle>
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
        </div>
    );
}