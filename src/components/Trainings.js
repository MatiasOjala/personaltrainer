import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import dayjs from "dayjs";


export default function Trainings() {

    const [trainings, setTrainings] = useState([]);

	useEffect(() => fetchData(), []);


	const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
    }}

    const dateFormat = (params) => {
        console.log(params.value);
        if (params.value !== "") {
            return dayjs(params.value).format('DD.MM.YYYY - HH:mm');
        }
    }
    const nameFormatter = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const columns = [
        {headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormat},
    
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},

        {headerName: 'Customer', field: 'customer', valueGetter: nameFormatter, sortable: true, filter: true},

        {headerName: "", field: 'id', width: 100, cellRenderer:(cell) => <IconButton aria-label="delete" onClick={() => deleteTraining(cell.value)}><DeleteIcon /></IconButton>}

      ] 
return (
    <div>
    <div>
        <h1>Trainings</h1>
    </div>

    <div className="ag-theme-material"style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
            columnDefs={columns}
            rowData={trainings}
            animateRows='true'
            >
        </AgGridReact>
    </div>
    </div>
)


    
}