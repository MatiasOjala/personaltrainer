import React, { useState } from'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function TabApp() {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {  setValue(value);};
    return (<div>
            <Tabs value={value} onChange={handleTabChange}>
            <Tab value="one" label="Customers" />
            <Tab value="two" label="Trainings" />
            <Tab value="three" label="Calendar" />
            <Tab value="four" label="Home" />
          </Tabs>
          {value === 'one' && <Customers />}
          {value === 'two' && <Trainings />}
          {value === 'three' && <Calendar />}
          {value === 'four' && <Home />}

    </div>);


}

export default TabApp;