import React, { useState } from 'react';
import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import TrainingsCalendar from './components/TrainingsCalendar'
import Home from './components/Home';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';



function App() {

  const [value, setValue] = useState('home');

  const handleTabChange = (event, value) => {
    setValue(value);
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Personal Trainer App</h1>
      </header>
      <div>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value="home" label="Home" />
        <Tab value="customers" label="Customers" />
        <Tab value="trainings" label="Trainings" />
        <Tab value="trainingscalendar" label="Calendar" />
      </Tabs>
      {value === 'home' && <Home />}
      {value === 'customers' && <Customers />}
      {value === 'trainings' && <Trainings />}
      {value === 'trainingscalendar' && <TrainingsCalendar />}
    </div>
    </div>


  );
}

export default App;