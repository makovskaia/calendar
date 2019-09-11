import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

let allViews = Object.keys(Views).map(k => Views[k])

const localizer = momentLocalizer(moment)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        calendar
      </header>
      <body className="App-body">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          views={allViews}
        />
    </body>
    </div>
  );
}

export default App;
