import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
    const [trainings, setTrainings] = useState([]);
    const trainingsCustom = [];
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    for (let i = 0; i < trainings.length; i++) {
        if(trainings[i].customer.firstname || trainings[i].customer.firstname) {
            trainingsCustom.push({start: trainings[i].date, title: trainings[i].activity+' / '+trainings[i].customer.firstname+' '+trainings[i].customer.lastname});
        }
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <React.Fragment>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                timeZone="America/New_York"
                events={trainingsCustom}
            />
        </React.Fragment>
    )
}