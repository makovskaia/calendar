import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'

let allViews = Object.keys(Views).map(k => Views[k])
const localizer = momentLocalizer(moment)

const Calendar = () => (
  <div className="App">
    <header className="App-header">
      calendar
    </header>
    <body className="App-body">
      <BigCalendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        views={allViews}
      />
  </body>
  </div>
);

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  addEvent: e => {
    dispatch(e)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
