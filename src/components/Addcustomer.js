import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function Addcustomer(props) {

    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
      });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    };

    const addCustomer = () => {
        props.addCustomer(customer);
        handleClose();
    };
  
    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add new customers
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>

                <DialogContent>
                            <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customer.firstname}
                            label="First name"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            label="Last name"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            label="Street address"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            label="Postcode"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            label="City"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            label="Email"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            label="Phone"
                            fullWidth
                            onChange={e => handleInputChange(e)}
                        />
                </DialogContent>

                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}