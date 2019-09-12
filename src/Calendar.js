import React from 'react';
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
      tmpEvent: {},
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
      anchor: { x: e.box.clientX, y: e.box.clientY  },
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
    this.onCancel()
  }
  onSave() {
    const e = this.state.tmpEvent
    const valid = validateEvent(e)
    if(valid === true) { 
      this.props[!e.id ? 'runAddEvent' : 'moveEvent']({...e, start: new Date(e.start), end: new Date(e.end) })
      this.onCancel()
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
    const anchor = { x: e.clientX, y: e.clientY }
    this.setState({ anchor, tmpEvent: {...obj, start: date(obj.start), end: date(obj.end) } })
  }
  onMoveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    this.props.moveEvent({ ...event, start, end } )
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
