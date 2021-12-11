import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { BarChart, EventNote, FitnessCenter, Group } from '@mui/icons-material';
import Customers from './Customers';
import Trainings from './Trainings';
import Calendar from './Calendar';
import Statistics from './Statistics';

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
                        background: 'linear-gradient(45deg, #000000 1%, #181D1F 50%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
                    }}         
                />
                <Tab 
                    className="hover"
                    label="Trainings" 
                    value="trainings"
                    icon={<FitnessCenter/>}
                    iconPosition="start"
                    style={{ 
                        background: 'linear-gradient(45deg, #000000 1%, #181D1F 50%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
                    }}
                />
                <Tab 
                    className="hover"
                    label="Calendar" 
                    value="calendar"
                    icon={<EventNote/>}
                    iconPosition="start"
                    style={{ 
                        background: 'linear-gradient(45deg, #000000 1%, #181D1F 50%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
                    }}
                />
                <Tab 
                    className="hover"
                    label="Statistics" 
                    value="statistics"
                    icon={<BarChart/>}
                    iconPosition="start"
                    style={{ 
                        background: 'linear-gradient(45deg, #000000 1%, #181D1F 50%, #222628 100%)',
                        boxShadow: '0 3px 5px 2px #000000',
                        marginBottom: 10,
                        marginRight: 5,
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
                ><Customers/>
                </TabPanel>     
                <TabPanel 
                    value="trainings" 
                    style={{ 
                        width: "90%", 
                        marginTop: -25, 
                        marginLeft: "0%", 
                        marginRight: "0%" 
                    }}
                ><Trainings/> 
                </TabPanel>
                <TabPanel 
                    value="calendar" 
                    style={{ 
                        width: "90%", 
                        marginTop: -25, 
                        marginLeft: "0%", 
                        marginRight: "0%" 
                    }}
                ><Calendar/>
                </TabPanel>
                <TabPanel 
                    value="statistics" 
                    style={{ 
                        width: "90%", 
                        marginTop: -25, 
                        marginLeft: "0%", 
                        marginRight: "0%" 
                    }}
                ><Statistics/>
                </TabPanel>
                {/* Oivallus: Asettamalla 2 tai useamman TabPaneelin value samaksi kuin TabListin Tabin value. 
                Voidaan sijoittaa 2 tai useampi TabPanel yhdelle sivulle. Parempi/oikea tapa on kuitenkin sijoittaa 
                TabPanel tagien sisään 2 tai useampi eri komponentti, jos haluaa ne samalle sivulle.*/}
            </TabContext>
        </Box>
        </React.Fragment>
    );
}