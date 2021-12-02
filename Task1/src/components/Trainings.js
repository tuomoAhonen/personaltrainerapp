import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const columnStyle = {
        'border-right': '1px dotted',
    };

    const columns = [
        {
            field: 'activity',
            sortable: true,
            filter: true,
            width: 250,
            cellStyle: columnStyle,
        },
        {
            field: 'date',
            sortable: true,
            filter: true,
            width: 150,
            cellRendererFramework: params => 
                new Date(params.value).toLocaleDateString(),
            cellStyle: columnStyle,
        },
        {
            field: 'duration',
            sortable: true,
            filter: true,
            width: 120,
            cellStyle: columnStyle,
        },
        {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            width: 325,
            cellRendererFramework: params => 
                params.value.firstname+' '+params.value.lastname,
            //toinen ratkaisu
            //cellRendererFramework: function(params) {
            //    return params.value.firstname+' '+params.value.lastname;
            //},
            cellStyle: columnStyle,
        },
    ];

    return (
        <React.Fragment>
            <div
                className='ag-theme-alpine-dark'
                style={{ 
                    height: 520, 
                    width: "100%", 
                    margin: "auto",
                    boxShadow: '0 3px 5px 2px #000000',
                }}
            >
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
        </React.Fragment>
    );
}