import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { Button, Snackbar } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const deleteTraining = (url) => {
        console.log(url);
        if(window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setMessage('Training session has been deleted successfully from the customer');
                    setOpen(true);
                } else {
                    //Onko tämä edes tarpeellinen else?
                    //Kun tätä ei käytetä mihinkään vai 
                    //onko tämä sitä varten, että tiedon 
                    //käsittelyssä tapahtuu virhe tai tieto katoaa?
                    //Esim. joku kerinnyt poistaa tiedon ennen sinua?
                    alert('Something went terrible wrong')
                }
            })
            .catch(err => console.error(err))
        }
    };

    const editTraining = (training, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if(response.ok) {
                fetchTrainings();
                setMessage('Edit was successful');
                setOpen(true);
            } else {
                alert('Something went terrible wrong');
            }
        })
        .catch(err => console.error(err))
    };

    const editWithCell = (params) => {
        const training = {
            activity: params.data.activity,
            date: params.data.date,
            duration: params.data.duration,
            customer: params.data.customer,
        };
        editTraining(training, 'https://customerrest.herokuapp.com/api/trainings/'+params.data.id);
    };

    const columnStyle = {
        'border-right': '1px dotted',
    };

    const columns = [
        {
            headerName: '',
            field: 'id',
            width: 40,
            cellRendererFramework: params => 
            <Button
                onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/'+params.value)}
                size='small'
                color='error'
                style={{
                    background: 'linear-gradient(45deg, #181D1F 30%, #222628 90%)',
                    boxShadow: '0 3px 5px 2px #000000',
                    minWidth: '20px',
                    minHeight: '20px',
                    maxWidth: '20px',
                    maxHeight: '20px',
                    marginLeft: '-8px',
                    textTransform: 'lowercase',
                }}
            >x</Button>,
            cellStyle: columnStyle,
        },
        {
            field: 'activity',
            sortable: true,
            filter: true,
            editable: true,
            width: 250,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.activity = params.newValue;
                editWithCell(params);
            },
            //tein myös muokkauksen trainings osioon, vaikka sitä ei vaadittu
            //valueSetter: params => {
            //    params.data.activity = params.newValue; 
            //    const training = {
            //        activity: params.data.activity,
            //        date: params.data.date,
            //        duration: params.data.duration,
            //        customer: params.data.customer,
            //    };
                //näitä consol.logeja käytetty selvittämään meneekö tietueen muodostus ja talennus oikein, sekä heataanko tietoa oikein/tuleeko mitään tietoa
                //console.log(training);
                //console.log('https://customerrest.herokuapp.com/api/trainings/'+params.data.id);
            //    editTraining(training, 'https://customerrest.herokuapp.com/api/trainings/'+params.data.id);
            //},
        },
        {
            field: 'date',
            sortable: true,
            sort: 'asc',
            filter: true,
            editable: true,
            width: 150,
            cellRendererFramework: params => 
                new Date(params.value).toLocaleDateString(),
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.date = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'duration',
            sortable: true,
            filter: true,
            editable: true,
            width: 120,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.duration = params.newValue; 
                editWithCell(params);
            },
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
            //kolmas vaihtoehto on laittaa parametrit MUin komponentin value kenttän kautta
            cellStyle: columnStyle,
        },
    ];

    return (
        <React.Fragment>
            <div
                className='ag-theme-alpine-dark'
                style={{ 
                    height: 560, 
                    width: '100%', 
                    margin: 'auto',
                    boxShadow: '0 3px 5px 2px #000000',
                }}
            >
            <AgGridReact
                rowData={trainings}
                rowHeight={46}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
            <div className="inline">
                <p>x = Delete row / Delete training session of customer</p>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </React.Fragment>
    );
}