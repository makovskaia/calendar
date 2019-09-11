import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import Event from './Event'
import { addEvent, deleteEvent } from './actions/actions'
import { validateEvent } from './utils/utils'
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
  }
  onSelectSlot(e) {
    this.setState({ anchor: e, tmpEvent: Object.assign(this.state.tmpEvent, { start: e.start, end: e.end })})
  }
  onCancel() {
    this.setState({ anchor: null, tmpEvent: {} })
  }
  onDelete() {
    this.state.tmpEvent.id && this.props.runDeleteEvent(this.state.tmpEvent.id)
    this.setState({ anchor: null, tmpEvent: {} })
  }
  onSave() {
    const valid = validateEvent(this.state.tmpEvent)
    if(valid === true) {
      this.props.runAddEvent(this.state.tmpEvent)
      this.setState({ anchor: null, tmpEvent: {} })
    } else {
      alert(valid)
    }
  }
  onChange(e) {
    let newState = this.state
    newState.tmpEvent[e.target.name] = e.target.value
    this.setState(newState)
  }
  onSelectEvent(obj, e) {
    e.persist()
    const box = { clientX: e.screenX, clientY: e.screenY }
    this.setState({ anchor: { box }, tmpEvent: obj })
  }
  onMoveEvent(e) {
    console.log({ ...e.event, id: undefined, start: e.start, end: e.end }, e.event.id)
    this.props.runMoveEvent({ ...e.event, id: undefined, start: e.start, end: e.end },
      e.event.id)
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          calendar
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
  runMoveEvent: (e, id) => {
    let p = new Promise((res,rej) => res(dispatch(addEvent(e))))
    return p.then(() => dispatch(deleteEvent(id)))
    .catch(x => 'sowwy')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
