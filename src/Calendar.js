import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import Event from './Event'
import { addEvent, deleteEvent } from './actions/actions'
import { validateEvent, randomColor, date } from './utils/utils'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

let allViews = Object.keys(Views).map(k => Views[k])
const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(BigCalendar);

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchor: null,
      tmpEvent: {}
    }
    this.onSelectSlot = this.onSelectSlot.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSelectEvent = this.onSelectEvent.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onMoveEvent = this.onMoveEvent.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
  }
  onSelectSlot(e) {
    this.setState({
      anchor: e,
      tmpEvent: {
        ...this.state.tmpEvent,
        start: date(e.start),
        end: date(e.end)
      }
    })
  }
  onCancel() {
    this.setState({ anchor: null, tmpEvent: {} })
  }
  onDelete() {
    this.state.tmpEvent.id && this.props.runDeleteEvent(this.state.tmpEvent.id)
    this.setState({ anchor: null, tmpEvent: {} })
  }
  onSave() {
    const e = this.state.tmpEvent
    e.start = date(e.start)
    e.end = date(e.end) 
    const valid = validateEvent(e)
    if(valid === true) { 
      this.props[!e.id ? 'runAddEvent' : 'moveEvent' ](e)
      this.setState({ anchor: null, tmpEvent: {} })
    } else {
      alert(valid)
    }
  }
  onChange(e) {
    const name = e.target.name,
    val = e.target.value
    let newState = this.state
    newState.tmpEvent[name] = val
    this.setState(newState)
  }
  onSelectEvent(obj, e) {
    e.persist()
    const box = { clientX: e.clientX, clientY: e.clientY }
    this.setState({ anchor: { box }, tmpEvent: {...obj, start: date(obj.start), end: date(obj.end) } })
  }
  onMoveEvent(e) {
    this.props.moveEvent({ ...e.event, start: e.start, end: e.end },
      e.event.id)
  }

  eventPropGetter(event, start, end, isSelected) {
    return { style: { backgroundColor: event.color || '#3174ad' } }
  }
  onChangeColor() {
    this.setState({ tmpEvent: {...this.state.tmpEvent, color: randomColor() } })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Calendar</h1>
        </header>
        <main className="App-body">
          <DnDCalendar
            localizer={localizer}
            events={this.props.events}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            onSelectSlot={this.onSelectSlot}
            selectable
            onSelectEvent={this.onSelectEvent}
            onEventDrop={this.onMoveEvent}
            eventPropGetter={this.eventPropGetter}
          />
          <Event
            event={this.state.tmpEvent}
            anchor={this.state.anchor}
            className='modal'
            onX={this.onCancel}
            onCancel={this.onCancel}
            onSave={this.onSave}
            onDelete={this.onDelete}
            onChange={this.onChange}
            onChangeColor={this.onChangeColor}
          />
      </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: Object.values(state.events)
})

const mapDispatchToProps = dispatch => ({
  runAddEvent: e => {
    dispatch(addEvent(e))
  },
  runDeleteEvent: e => {
    dispatch(deleteEvent(e))
  },
  moveEvent: (e) => {
    let p = new Promise((res,rej) => res(dispatch(deleteEvent(e.id))))
    return p.then(() => dispatch(addEvent({...e, id: undefined })))
    .catch(x => alert('Oops, smth went wrong'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
