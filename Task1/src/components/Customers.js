import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export default function Customers() {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columnStyle = {
        'border-right': '1px dotted',
    };

    const columns = [
        {
            field: 'firstname',
            sortable: true,
            filter: true,
            width: 175,
            cellStyle: columnStyle,
        },
        {
            field: 'lastname',
            sortable: true,
            filter: true,
            width: 200,
            cellStyle: columnStyle,
        },
        {
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150,
            cellRendererFramework: params => 
            '+'+params.value,
            cellStyle: columnStyle,
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
            width: 250,
            cellStyle: columnStyle,
        },
        {
            field: 'streetaddress',
            sortable: true,
            filter: true,
            width: 250,
            cellStyle: columnStyle,
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 120,
            cellStyle: columnStyle,
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            width: 200,
            cellStyle: columnStyle,
        },
    ];

    return(
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
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
        </React.Fragment>
    );
}