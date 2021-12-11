import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis } from 'recharts';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);
    const data = [];
    const columns = [];
    const durations = [];
    var _ = require('lodash');

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    for (let i = 0; i < trainings.length; i++) {
        columns.push(trainings[i].activity);
    };

    const columnsFiltered = [...new Set(columns)];

    for (let i = 0; i < columnsFiltered.length; i++) {
        for (let index = 0; index < trainings.length; index++) {
            if(columnsFiltered[i] === trainings[index].activity) {
                durations.push({duration: trainings[index].duration});
            }       
        }
        data.push({activity: columnsFiltered[i], duration: _.sumBy(durations, 'duration')});
        durations.length = 0;
    }

    return(
        <React.Fragment>
            <ResponsiveContainer width="97%" height={600}>
                <BarChart data={data}>
                    <YAxis datakey="duration" />
                    <Bar dataKey="duration" fill="#1978CE" />
                    <XAxis dataKey="activity" width={20} />
                </BarChart>
            </ResponsiveContainer>
            <div><p>Durations of training sessions summed up for each activity</p></div>
        </React.Fragment>
    )
}