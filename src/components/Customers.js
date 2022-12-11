import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcustomer from "./Addcustomer";
import Addtraining from "./Addtraining";
import Editcustomer from "./Editcustomer";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material"

export default function Customers() {

    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    const [customers, setCustomers] = useState([]);


	useEffect(() => fetchData(), []);

	const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        })
        .then((response) => {
            fetchData()
        })
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(training)
        })
        .then(res => {
          fetchData()
          setOpen(true)
        })
        .catch(err => console.error(err))
      }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
        fetch(link, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
    }}

    const editCustomer = (customer, link) => {
        fetch(link, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        })
        .then(res => {
          fetchData()
          setOpen(true)
        })
        .catch(err => console.error(err))
      } 
      const csvParams = {
        columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'],
        allColumns: false,
        skipColumnGroupHeaders: true
    }

    const exportCsv = useCallback(() => {
        gridRef.current.api.exportDataAsCsv(csvParams);
    }, []);

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
    
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},

        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},

        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},

        {headerName: 'City', field: 'city', sortable: true, filter: true},

        {headerName: 'Email', field: 'email', sortable: true, filter: true},

        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},

        {headerName: "", field: 'links.0.href', width: 220, cellRenderer:(cell) => <Addtraining addTraining={addTraining} customerId={cell.value} />},

        {headerName: "", field: 'links.0.href', width: 60, cellRenderer:(cell) => <IconButton aria-label="delete" onClick={() => deleteCustomer(cell.value)}><DeleteIcon /></IconButton>},

        {headerName: "", field: 'links.0.href', width: 100, cellRenderer:(row) => <Editcustomer editCustomer={editCustomer} customer={row.data} />}
      ] 

return (
    <div>
    <div>
        <h1>Customers</h1>
    </div>
    <div>
    <Button color="secondary" variant="contained" onClick={() => exportCsv()}>Export</Button>
    
    </div>
    <Addcustomer addCustomer={addCustomer} />

    <div className="ag-theme-material"style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
            ref={gridRef}
            columnDefs={columns}
            rowData={customers}
            animateRows='true'

            >
                
        </AgGridReact>
    </div>
    </div>
)



}