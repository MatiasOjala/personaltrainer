import React, { useState, useEffect } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";


export default function Trainings() {

    const [trainings, setTrainings] = useState([]);

	useEffect(() => fetchData(), []);


	const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    const dateFormat = (params) => {
        console.log(params.value);
        if (params.value != "") {
            return dayjs(params.value).format('DD.MM.YYYY - HH:mm');
        }
    }

    const columns = [
        {headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: dateFormat},
    
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},

        {headerName: 'First name', field: 'customer.firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'customer.lastname', sortable: true, filter: true},

      ] 
return (
    <div>
    <div>
        <h1>Trainings</h1>
    </div>

    <div className="ag-theme-material"style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
            columnDefs={columns}
            rowData={trainings}>
            
        </AgGridReact>
    </div>
    </div>
)


    
}