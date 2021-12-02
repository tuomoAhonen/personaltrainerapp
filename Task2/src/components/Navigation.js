import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FitnessCenter, Group } from '@mui/icons-material';
import Customers from './Customers';
import Trainings from './Trainings';

export default function Navigation() {
    const [value, setValue] = useState("customers");

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <React.Fragment>
        <Box 
            sx={{ 
                flexGrow: 1, 
                display: 'flex' 
            }}>
            <TabContext value={value}>
                <TabList
                    className="tablist"
                    onChange={handleChange} 
                    orientation="vertical" 
                    style={{ width: "13%", marginRight: -5 }}
                    textColor="primary"
                    indicatorColor="primary"
                >
                <Tab 
                    className="hover"
                    label="Customers"
                    value="customers" 
                    icon={<Group/>}
                    iconPosition="start"
                    style={{ 
                        background: 'linear-gradient(45deg, #000000 10%, #181D1F 90%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
                        color: '#ffffff',
                    }}         
                />
                <Tab 
                    className="hover"
                    label="Trainings" 
                    value="trainings"
                    icon={<FitnessCenter/>}
                    iconPosition="start"
                    style={{ 
                        background: 'linear-gradient(45deg, #000000 10%, #181D1F 90%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
                        color: '#ffffff',
                    }}
                />
                </TabList>
                <TabPanel 
                    value="customers" 
                    style={{ 
                        width: "90%", 
                        marginTop: -25, 
                        marginLeft: "0%", 
                        marginRight: "0%" 
                    }}
                >
                    <Customers/>
                </TabPanel>
                <TabPanel 
                    value="trainings" 
                    style={{ 
                        width: "90%", 
                        marginTop: -25, 
                        marginLeft: "0%", 
                        marginRight: "0%" 
                    }}>
                    <Trainings/>
                </TabPanel>
            </TabContext>
        </Box>
        </React.Fragment>
    );
}