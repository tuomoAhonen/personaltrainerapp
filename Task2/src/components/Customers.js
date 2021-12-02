import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { Button, Snackbar } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import AddCustomer from './AddCustomer';
import AddTrainingForCustomer from './AddTrainingForCustomer';
//import EditCustomer from './EditCustomer';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMessage('Customer has beed added successfully');
                setOpen(true);
            } else {
                alert('Something went terrible wrong, HALP!');
            }
        })
        .catch(err => console.error(err))
    };

    const addTrainingForCustomer = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if(response.ok) {
                setMessage('Training for customer has beed added successfully');
                setOpen(true);
            } else {
                alert('Something went terrible wrong, HALP!');
            }
        })
        .catch(err => console.error(err))
    };

    const editCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMessage('Edit was successful');
                setOpen(true);
            } else {
                alert('Something went terrible wrong');
            }
        })
        .catch(err => console.error(err))
    };

    const deleteCustomer = (url) => {
        if(window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                    setMessage('Car has been deleted successfully');
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

    const editWithCell = (params) => {
        const customer = {
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone,
        };
        editCustomer(customer, params.data.links[1].href);
    };

    const columnStyle = {
        'border-right': '1px dotted',
    };

    const columns = [
        {
            field: 'firstname',
            sortable: true,
            sort: 'asc',
            sortIndex: 1,
            filter: true,
            editable: true,
            width: 200,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.firstname = params.newValue;
                editWithCell(params);
            }, 
            //Oivallus: voi käyttää ValueGetteriä tai field tietuetta, että tieto saadaan taulukkoon.
            //valueGetter: params => params.data.firstname,
            //valueSetterillä tallennetaan ag-grid kentässä editoitu tieto kantaan/restapiin, jotta ei tarvita erillistä editkomponenttia käyttää customerin editoinnissa
            //alapuolella on vanha valueSetter toiminto, johon tein muuttujan const:lla, jotta vähennetään toistuvaa koodia ja saadaan toimivampaa/tehokkampaa koodia eli säästetään serverin yms. tehoja muuhun kuormitukseen
            //tälläiset valueSetterit oli siis jokaisen columnin kohdalla eli koodi supistui editWithCell muuttujalla paljon
            //valueSetter: params => {
            //    params.data.firstname = params.newValue; 
            //    const customer = {
            //        firstname: params.data.firstname,
            //        lastname: params.data.lastname,
            //        streetaddress: params.data.streetaddress,
            //        postcode: params.data.postcode,
            //        city: params.data.city,
            //        email: params.data.email,
            //        phone: params.data.phone,
            //    };
                //näitä consol.logeja käytetty selvittämään meneekö tietueen muodostus ja talennus oikein, sekä heataanko tietoa oikein/tuleeko mitään tietoa
                //console.log(customer);
                //console.log(params.data.links[1].href);
            //    editCustomer(customer, params.data.links[1].href);
            //},
        },
        {
            field: 'lastname',
            sortable: true,
            sort: 'asc',
            sortIndex: 0,
            filter: true,
            editable: true,
            width: 200,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.lastname = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'phone',
            sortable: true,
            filter: true,
            editable: true,
            width: 150,
            cellRendererFramework: params => 
            '+'+params.value,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.phone = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
            editable: true,
            width: 300,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.email = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'streetaddress',
            sortable: true,
            filter: true,
            editable: true,
            width: 258,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.streetaddress = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true,
            editable: true,
            width: 120,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.postcode = params.newValue; 
                editWithCell(params);
            },
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            editable: true,
            width: 200,
            cellStyle: columnStyle,
            valueSetter: params => {
                params.data.city = params.newValue; 
                editWithCell(params);
            },
        },
        {
            headerName: '',
            field: 'links.1.href',
            width: 100,
            cellStyle: columnStyle,
            cellRendererFramework: params => 
            <AddTrainingForCustomer 
                addTrainingForCustomer={addTrainingForCustomer} 
                customer={params.data}>
            </AddTrainingForCustomer>
        },
        //EditCustomer komponentti jäi ylimääräiseksi, koska sain toimimaan editoinnin suoraan Ag-Gridillä ja sen tallentumaan myös RESTApiin/kantaan
        //{
        //    headerName: '',
        //    field: 'links.1.href',
        //    width: 100,
        //    cellStyle: columnStyle,
        //    cellRendererFramework: params => 
        //    <EditCustomer 
        //        
        //        editCustomer={editCustomer} 
        //        customer={params.data}>
        //    </EditCustomer>
        //},
        {
            headerName: '',
            field: 'links.1.href',
            width: 110,
            cellRendererFramework: params => 
            <Button
                onClick={() => deleteCustomer(params.value)}
                size='small'
                color='error'
                style={{
                    background: 'linear-gradient(45deg, #181D1F 30%, #222628 90%)',
                    boxShadow: '0 3px 5px 2px #000000',
                }}
            >DELETE</Button>
        },
    ];

    return(
        <React.Fragment>
            <div
                className='ag-theme-alpine-dark'
                style={{ 
                    height: 560, 
                    width: "100%", 
                    margin: "auto",
                    boxShadow: '0 3px 5px 2px #000000',
                }}
            >
            <AgGridReact
                rowData={customers}
                rowHeight={46}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
            </div>
            <AddCustomer addCustomer={addCustomer}/>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </React.Fragment>
    );
}